import { store } from '../data/store.js';

export async function chatWithGemini(req, res) {
  const { message, history } = req.body;
  
  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // If API Key is missing, let the client know to fall back to the local responder
    return res.status(200).json({ 
      success: true, 
      text: "", 
      fallback: true,
      message: 'GEMINI_API_KEY is not configured in the server environment. Falling back to local responder.' 
    });
  }

  try {
    // Format history for Gemini API
    const formattedContents = [];
    
    // Format doctors from database dynamically
    const doctorListText = store.doctors.map(d => 
      `- Dr. ${d.name} (${d.specialty}, ${d.experience} experience, Location: ${d.location}, Fee: $${d.fee}, Status: ${d.available ? 'Available' : 'Busy'})`
    ).join('\n');

    // System instruction prompt with database content injected
    const systemPrompt = `You are Sanjivani, the helpful virtual medical and navigation assistant for the Doctor Appoints portal.
Doctor Appoints is a clinical appointment booking application.

Information about the clinic & portal:
- Clinic Timings: Monday to Saturday, 8:00 AM – 8:00 PM. Closed on Sundays (Emergency on-call only).
- Navigation links:
  * Patient Portal Login: /login (for patients to log in and book appointments)
  * Patient Registration: /register (to sign up as a patient)
  * Doctor Portal Login: /doctor/login (for doctors to access schedules)
  * Admin Portal Login: /admin/login (for admins to register doctors and audit activity)
  * All Doctors Directory: /doctors (for browsing doctors, filtering by specialty, and reserving slots)
  * Contact Page: /contact (for user suggestions and support emails)

Doctors registered in the clinic database:
${doctorListText}

Your Guidelines:
1. Always be warm, professional, and supportive.
2. Keep responses brief, clear, and formatted using bold markdown and paragraphs.
3. Link to portal pages using markdown format like [Patient Portal](/login) or [All Doctors](/doctors). Make sure these paths match the navigation links above.
4. If a user asks about booking a slot or finding a doctor, guide them to browse the [Doctors Directory](/doctors) and name the specific doctors available in the database list above that match their request.
5. If the user presents severe symptoms (e.g. chest pain, breathing difficulty, severe bleeding), urge them to immediately call emergency services or visit the nearest Emergency Room. DO NOT diagnose or provide treatment plans.`;

    if (history && Array.isArray(history)) {
      // Filter out the initial greeting and format history for Gemini:
      // Roles must alternate between user and model.
      const conversationHistory = history.filter(msg => msg.id !== 1);
      
      conversationHistory.forEach(msg => {
        formattedContents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current user message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Gemini API Error details:', errData);
      throw new Error(errData.error?.message || 'Failed to generate response from Gemini');
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error('Empty response from Gemini API');
    }

    return res.status(200).json({ 
      success: true, 
      text: replyText.trim(),
      fallback: false
    });

  } catch (error) {
    console.error('AI chat controller error:', error);
    return res.status(200).json({ 
      success: true, 
      error: error.message,
      text: "",
      fallback: true
    });
  }
}

export async function suggestPrescription(req, res) {
  const { diagnosis } = req.body;
  if (!diagnosis) {
    return res.status(400).json({ success: false, error: 'Diagnosis is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  const fallbackPrescriptions = {
    cough: {
      medicines: "1. Dextromethorphan Syrup (10ml) - 3 times daily - 5 days\n2. Paracetamol (500mg) - 1 tablet every 6 hours if fever > 100 F - 3 days\n3. Vitamin C (500mg) - 1 tablet daily - 10 days",
      notes: "Drink warm water and herbal tea. Do steam inhalations twice daily. Rest and avoid cold beverages."
    },
    cold: {
      medicines: "1. Cetirizine (10mg) - 1 tablet at bedtime - 5 days\n2. Phenylephrine nasal drops - 2 drops in each nostril twice daily - 3 days",
      notes: "Stay hydrated. Avoid direct exposure to cold air or dust. Use warm saline gargles."
    },
    fever: {
      medicines: "1. Paracetamol (650mg) - 1 tablet every 6 hours after meals - 4 days\n2. Oral Rehydration Salts (ORS) - 1 liter daily - 3 days",
      notes: "Monitor body temperature every 4 hours. Keep room well-ventilated. Sponge with lukewarm water if temperature is high."
    },
    allergy: {
      medicines: "1. Fexofenadine (120mg) - 1 tablet daily in the morning - 10 days\n2. Fluticasone Furoate Nasal Spray - 2 sprays each nostril once daily - 2 weeks",
      notes: "Identify and avoid allergen triggers. Keep windows closed during high pollen count hours. Wash beddings weekly in hot water."
    },
    acne: {
      medicines: "1. Clindamycin Phosphate Gel (1%) - Apply thinly to affected areas twice daily - 4 weeks\n2. Benzoyl Peroxide Cleanser - Wash face gently once daily - 4 weeks",
      notes: "Use non-comedogenic cosmetics. Do not squeeze or pop acne lesions. Limit sugary and high-glycemic index foods."
    },
    headache: {
      medicines: "1. Ibuprofen (400mg) - 1 tablet after food as needed (Max 3 daily) - 3 days\n2. Magnesium Citrate (250mg) - 1 capsule daily - 30 days",
      notes: "Keep in a dark, quiet room during acute phases. Maintain a regular sleep schedule. Limit caffeine intake."
    },
    migraine: {
      medicines: "1. Naproxen (500mg) - 1 tablet at onset of headache - 3 days\n2. Domperidone (10mg) - 1 tablet 30 mins before Naproxen if nauseous - 3 days",
      notes: "Avoid known triggers (aged cheese, chocolate, bright lights, stress). Keep a headache diary. Maintain consistent hydration."
    },
    bronchitis: {
      medicines: "1. Guaifenesin (600mg ER) - 1 tablet twice daily - 7 days\n2. Levosalbutamol Inhaler - 2 puffs every 6 hours as needed for wheezing",
      notes: "Avoid exposure to cigarette smoke, dust, and chemical fumes. Sleep with head elevated. Follow up if breathing difficulty worsens."
    },
    tonsillitis: {
      medicines: "1. Amoxicillin (500mg) - 1 tablet three times daily - 7 days (Complete full course)\n2. Ibuprofen (400mg) - 1 tablet three times daily after food - 4 days",
      notes: "Do warm water salt gargles 4-5 times a day. Eat soft, cool foods. Avoid dry air; use a humidifier."
    }
  };

  let matchedFallback = null;
  const lowerDiag = diagnosis.toLowerCase();
  for (const [key, value] of Object.entries(fallbackPrescriptions)) {
    if (lowerDiag.includes(key)) {
      matchedFallback = value;
      break;
    }
  }

  if (!apiKey) {
    const fallbackData = matchedFallback || {
      medicines: "1. [Specify medication name, strength, frequency, and duration]\n2. [Specify auxiliary medication]",
      notes: "Observe patient symptoms. Recommend bed rest, hydration, and clinical follow-up in 3-5 days if symptoms persist."
    };
    return res.status(200).json({
      success: true,
      medicines: fallbackData.medicines,
      notes: fallbackData.notes,
      fallback: true,
      message: 'GEMINI_API_KEY is not configured in the server environment. Returning local template.'
    });
  }

  try {
    const prompt = `You are a clinical assistant helping a doctor write a prescription.
For the following patient diagnosis, suggest standard, widely-accepted non-binding medical recommendations.

Diagnosis: "${diagnosis}"

Your response must be returned in raw JSON format with exactly these two keys:
1. "medicines": A numbered list of recommended medicines, strengths, frequencies, and durations. (Example: "1. Medication A 500mg - 1 tab twice daily after food - 5 days")
2. "notes": Special advice, diet, hydration, and follow-up guidance. (Example: "Stay hydrated, rest for 3 days, follow-up if symptoms worsen.")

Do not include any markdown fences (like \`\`\`json) or additional conversational text outside of the JSON object. Return only valid JSON.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 400,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Gemini API Error details:', errData);
      throw new Error(errData.error?.message || 'Failed to generate suggestion from Gemini');
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error('Empty response from Gemini API');
    }

    const result = JSON.parse(replyText.trim());
    return res.status(200).json({
      success: true,
      medicines: result.medicines,
      notes: result.notes,
      fallback: false
    });

  } catch (error) {
    console.error('AI suggest prescription controller error:', error);
    const fallbackData = matchedFallback || {
      medicines: "1. [Specify medication name, strength, frequency, and duration]\n2. [Specify auxiliary medication]",
      notes: "Observe patient symptoms. Recommend bed rest, hydration, and clinical follow-up in 3-5 days if symptoms persist."
    };
    return res.status(200).json({
      success: true,
      medicines: fallbackData.medicines,
      notes: fallbackData.notes,
      fallback: true,
      error: error.message
    });
  }
}
