import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles, Bot, User, HelpCircle } from 'lucide-react';
import api from '../services/api';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am **Sanjivani**, your clinic assistant. 🩺 How can I help you today?\n\nYou can ask me custom questions, or click one of the quick suggestions below to guide you!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'live', 'fallback'
  const messagesEndRef = useRef(null);

  // Check connection to the Gemini API via server
  useEffect(() => {
    if (isOpen && apiStatus === 'checking') {
      api.post('/ai/chat', { message: 'hello', history: [] })
        .then((res) => {
          if (res.data && res.data.success && !res.data.fallback) {
            setApiStatus('live');
          } else {
            setApiStatus('fallback');
          }
        })
        .catch(() => {
          setApiStatus('fallback');
        });
    }
  }, [isOpen, apiStatus]);

  const suggestions = [
    { label: '📅 How to book appointment', query: 'how to book appointment' },
    { label: '🩺 Find a Doctor / Specialist', query: 'find a doctor' },
    { label: '🕒 Clinic Timings & Hours', query: 'clinic hours' },
    { label: '🔑 Portal Login Links', query: 'portal login' },
    { label: '💰 Check Consultation Fees', query: 'consultation fees' },
    { label: '📞 Contact Support Team', query: 'contact clinic' }
  ];

  // Auto Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Formats text into bold and link elements
  const renderMessageText = (text) => {
    if (text === undefined || text === null) return '';
    const textStr = String(text);
    if (!textStr.trim()) return '';

    try {
      const parts = [];
      let currentIndex = 0;
      
      // Match bold text **bold** and markdown links [text](path)
      const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
      let match;
      
      while ((match = regex.exec(textStr)) !== null) {
        const matchIndex = match.index;
        
        // Push normal text preceding the match
        if (matchIndex > currentIndex) {
          parts.push(textStr.slice(currentIndex, matchIndex));
        }
        
        const token = match[0];
        if (token.startsWith('**') && token.endsWith('**')) {
          const boldText = token.slice(2, -2);
          
          // Nesting Link Check: If bold text contains a link [linkText](url)
          if (boldText.startsWith('[') && boldText.includes('](')) {
            const closeBracket = boldText.indexOf(']');
            const linkText = boldText.slice(1, closeBracket);
            const url = boldText.slice(closeBracket + 2, -1);
            const isInternal = url.startsWith('/') || url.startsWith('file:///');
            const cleanUrl = url.replace('file://', '');
            
            parts.push(
              <strong key={matchIndex} className="font-extrabold text-slate-800">
                {isInternal ? (
                  <Link 
                    to={cleanUrl} 
                    onClick={() => setIsOpen(false)} 
                    className="text-teal-600 hover:text-teal-700 font-extrabold underline underline-offset-2 decoration-2 transition-colors"
                  >
                    {linkText}
                  </Link>
                ) : (
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-teal-650 hover:text-teal-700 font-extrabold underline underline-offset-2 decoration-2 transition-colors"
                  >
                    {linkText}
                  </a>
                )}
              </strong>
            );
          } else {
            parts.push(
              <strong key={matchIndex} className="font-extrabold text-slate-800">
                {boldText}
              </strong>
            );
          }
        } else if (token.startsWith('[') && token.includes('](')) {
          const closeBracket = token.indexOf(']');
          const linkText = token.slice(1, closeBracket);
          const url = token.slice(closeBracket + 2, -1);
          
          const isInternal = url.startsWith('/') || url.startsWith('file:///');
          const cleanUrl = url.replace('file://', '');
          
          if (isInternal) {
            parts.push(
              <Link 
                key={matchIndex} 
                to={cleanUrl} 
                onClick={() => setIsOpen(false)} 
                className="text-teal-600 hover:text-teal-700 font-extrabold underline underline-offset-2 decoration-2 transition-colors"
              >
                {linkText}
              </Link>
            );
          } else {
            parts.push(
              <a 
                key={matchIndex} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-teal-605 hover:text-teal-700 font-extrabold underline underline-offset-2 decoration-2 transition-colors"
              >
                {linkText}
              </a>
            );
          }
        }
        
        currentIndex = regex.lastIndex;
      }
      
      if (currentIndex < textStr.length) {
        parts.push(textStr.slice(currentIndex));
      }
      
      return parts.length > 0 ? parts : textStr;
    } catch (err) {
      console.warn('Error formatting chatbot message content:', err);
      return textStr;
    }
  };

  // Get AI Response logic
  const getAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    if (q.includes('book') || q.includes('appointment') || q.includes('slot') || q.includes('schedule') || q.includes('meeting')) {
      return 'To book a consultation: \n\n1. Go to the **[All Doctors Directory](/doctors)**.\n2. Browse doctors by specialty, then click on the **Book Appointment** button of your selected practitioner.\n3. Choose an available date and time slot from their schedule.\n4. Click **Confirm Booking** to reserve. \n\n*Note: You must be logged in to your **[Patient Portal](/login)** to submit bookings.*';
    }
    
    if (q.includes('doctor') || q.includes('specialist') || q.includes('cardiologist') || q.includes('dermatologist') || q.includes('pediatrician') || q.includes('neurologist') || q.includes('gastroenterologist') || q.includes('physician') || q.includes('list')) {
      return 'We have specialized medical practitioners available for you: \n\n- **General Physicians** (Primary care & wellness audits)\n- **Cardiologists** (Heart, cardiovascular & blood pressure)\n- **Dermatologists** (Skin disorders, hair & acne control)\n- **Pediatricians** (Newborn care & children health checkups)\n- **Neurologists** (Brain, spinal cord & nervous system)\n- **Gastroenterologists** (Digestive tract & stomach health)\n\nYou can see all listed profiles, filter by these specialties, and check their schedules on our **[All Doctors Directory](/doctors)** page.';
    }

    if (q.includes('login') || q.includes('register') || q.includes('signup') || q.includes('account') || q.includes('portal') || q.includes('sign in')) {
      return 'This platform has three custom interfaces:\n\n- **[Patient Login Portal](/login)**: Access your patient hub, browse specialists, and track visits.\n- **[Doctor Console](/doctor/login)**: Dedicated doctor panel to manage daily schedules and write consultations.\n- **[Admin Console](/admin/login)**: Administrator dashboard to verify user logs and register doctors.\n\nNew to our clinic? **[Create a Patient Account](/register)** to start booking appointments.';
    }

    if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('timing') || q.includes('schedule') || q.includes('sunday') || q.includes('saturday')) {
      return 'Our clinic operates under the following hours:\n\n- **Monday to Saturday**: 8:00 AM – 8:00 PM\n- **Sunday**: Closed (Emergency practitioner is on-call)\n\nYou can request bookings online 24/7 through our patient portal, and slots will be reserved instantly.';
    }

    if (q.includes('fee') || q.includes('cost') || q.includes('payment') || q.includes('price') || q.includes('charge')) {
      return 'Consultation fees depend on the doctor\'s specialization and clinical experience. \n\nStandard fees typically range from **$50 to $150 per session**. You can find the exact consultation charges clearly listed on each doctor\'s detail page under the **[Doctors List](/doctors)** before booking.';
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('support') || q.includes('number') || q.includes('address') || q.includes('location')) {
      return 'You can easily connect with our clinic operations team:\n\n- 📞 **Phone Support**: +0-000-000-000\n- ✉️ **Email Address**: hello@doctorappoints.dev\n- 📍 **Address**: 123 Health Ave, Medical Suite C, New York, NY\n\nFor general suggestions or support tickets, you can also write to us on our **[Contact Page](/contact)**.';
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings') || q.includes('namaste')) {
      return 'Hello there! Hope you are doing well today. 😊 How can I assist you with our doctor appointment portal?';
    }

    if (q.includes('thank') || q.includes('thanks') || q.includes('helpful') || q.includes('good')) {
      return 'You are very welcome! I am always here to help. Let me know if there is anything else you need guidance with! 🩺';
    }

    if (q.includes('admin') || q.includes('dashboard') || q.includes('panel')) {
      return 'The **[Admin Console](/admin/login)** allows our management team to view logs, add active doctors, and manage global database tables. If you are an administrator, use your registered credentials to log in. Patients should use the **[Patient Portal](/login)** instead.';
    }

    // Default Fallback Response
    return 'I hear you! I am a specialized navigation AI for this clinic portal.\n\nI can best assist you with:\n- **Booking appointments** and managing consultation dates.\n- Finding specific **doctors** or filtering by **medical specialties**.\n- Accessing the correct **login portals** (Patient, Doctor, Admin).\n- Providing **timings, fees, and contact details**.\n\nPlease try asking about any of these subjects, or choose a quick suggestion below!';
  };

  const handleSend = async (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Fetch AI response from the Gemini server endpoint
      const response = await api.post('/ai/chat', {
        message: textToSend,
        history: messages
      });

      if (response.data && response.data.success && !response.data.fallback) {
        setApiStatus('live');
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: response.data.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setApiStatus('fallback');
        // Fallback to local rule-based response
        const responseText = getAIResponse(textToSend);
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      setApiStatus('fallback');
      console.warn('AI service failed, falling back to local clinic knowledge base:', error);
      const responseText = getAIResponse(textToSend);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-tr from-teal-500 via-blue-500 to-indigo-650 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(20,184,166,0.35)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.45)] hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-slow group"
        aria-label="Ask AI Assistant"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300 rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare size={24} className="group-hover:scale-105 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-ping"></span>
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9998] w-[360px] sm:w-[400px] h-[540px] max-h-[calc(100vh-120px)] flex flex-col bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(15,23,42,0.15)] rounded-[28px] overflow-hidden transition-all duration-300 animate-slide-up">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 relative shadow-inner">
                <Bot size={22} className="text-white animate-pulse" />
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${apiStatus === 'live' ? 'bg-emerald-400' : apiStatus === 'fallback' ? 'bg-amber-400' : 'bg-slate-350'}`}></span>
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                  Sanjivani AI Guide
                  <Sparkles size={12} className="text-teal-200 fill-teal-200 animate-bounce-slow" />
                </h3>
                <span className="text-[9px] text-teal-100 font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5">
                  <span className={`w-1 h-1 rounded-full ${apiStatus === 'live' ? 'bg-emerald-400 animate-ping' : ''}`}></span>
                  {apiStatus === 'live' ? 'Live Gemini AI' : apiStatus === 'fallback' ? 'Local Fallback Mode' : 'Connecting...'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white/80 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Log Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin bg-gradient-to-b from-slate-50/50 to-white/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-550 to-indigo-605 text-white'
                      : 'bg-teal-50 text-teal-600 border border-teal-100'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Bubble Container */}
                <div className="flex flex-col">
                  <div
                    className={`px-4 py-3 rounded-2xl text-xs text-left leading-relaxed shadow-sm border ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white border-slate-900 rounded-tr-none'
                        : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {renderMessageText(msg.text)}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] text-slate-400 mt-1 font-medium ${
                      msg.sender === 'user' ? 'self-end' : 'self-start'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Bouncing Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 max-w-[80%] self-start">
                <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                  <Bot size={14} />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white text-slate-700 border border-slate-100 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips Row */}
          <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100/50">
            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block text-left mb-1.5 flex items-center gap-1">
              <HelpCircle size={10} /> Quick Help Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[92px] overflow-y-auto pb-1">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug.query)}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 text-[11px] text-slate-650 hover:text-teal-600 hover:border-teal-300 font-semibold shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  {sug.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Footer */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white border-t border-slate-100 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask Sanjivani something..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 bg-slate-50/50 focus:bg-white text-xs text-slate-800 font-medium transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                inputText.trim() && !isTyping
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20 hover:bg-teal-600 hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
