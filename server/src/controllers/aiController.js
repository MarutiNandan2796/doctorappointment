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
    
    // System instruction prompt
    const systemPrompt = `You are Sanjivani, the helpful virtual medical and navigation assistant for the Doctor Appoints portal.
Doctor Appoints is a clinical appointment booking application.

Information about the clinic & portal:
- Clinic Timings: Monday to Saturday, 8:00 AM – 8:00 PM. Closed on Sundays (Emergency on-call only).
- Consultation Fees: Typically ranges between $50 to $150 per session, shown on each doctor's detail profile.
- Navigation links:
  * Patient Portal Login: /login (for patients to log in and book appointments)
  * Patient Registration: /register (to sign up as a patient)
  * Doctor Portal Login: /doctor/login (for doctors to access schedules)
  * Admin Portal Login: /admin/login (for admins to register doctors and audit activity)
  * All Doctors Directory: /doctors (for browsing doctors, filtering by specialty, and reserving slots)
  * Contact Page: /contact (for user suggestions and support emails)

Your Guidelines:
1. Always be warm, professional, and supportive.
2. Keep responses brief, clear, and formatted using bold markdown and paragraphs.
3. Link to portal pages using markdown format like [Patient Portal](/login) or [All Doctors](/doctors). Make sure these paths match the navigation links above.
4. If a user asks about booking a slot, guide them clearly to browse the [Doctors Directory](/doctors), select a doctor, and choose an available time slot.
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
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      text: "",
      fallback: true
    });
  }
}
