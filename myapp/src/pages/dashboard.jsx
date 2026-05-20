import React, { useState, useEffect, useRef, useCallback } from 'react';
import './dashboard.css';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

const AVAILABLE_MODELS = [
  // OpenAI
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', apiModel: 'gpt-4o' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', apiModel: 'gpt-4-turbo' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', apiModel: 'gpt-3.5-turbo' },
  // Anthropic
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', apiModel: 'claude-3-5-sonnet-20240620' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', apiModel: 'claude-3-opus-20240229' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', apiModel: 'claude-3-haiku-20240307' },
  // Google Gemini (static fallback — replaced dynamically once key is loaded)
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google Gemini', apiModel: 'gemini-2.5-pro' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google Gemini', apiModel: 'gemini-2.5-flash' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google Gemini', apiModel: 'gemini-2.0-flash' },
  { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash Lite', provider: 'Google Gemini', apiModel: 'gemini-2.0-flash-lite' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google Gemini', apiModel: 'gemini-1.5-pro' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google Gemini', apiModel: 'gemini-1.5-flash' },
  { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash 8B', provider: 'Google Gemini', apiModel: 'gemini-1.5-flash-8b' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [showKeyboardInput, setShowKeyboardInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [userApiKeys, setUserApiKeys] = useState([]);
  const [activeModelId, setActiveModelId] = useState('gpt-3.5-turbo');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [allModels, setAllModels] = useState(AVAILABLE_MODELS);
  const [micError, setMicError] = useState('');
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError('Speech recognition is not supported in this browser. Use Chrome or Edge.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(r => r[0].transcript)
        .join('');
      setInputText(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-send whatever was transcribed
      setInputText(prev => {
        if (prev.trim()) {
          handleSendMessage(prev);
        }
        return '';
      });
    };

    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      setMicError(e.error === 'not-allowed' ? 'Microphone access was denied. Please allow it in your browser settings.' : `Mic error: ${e.error}`);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setMicError('');
    setInputText('');
    setShowKeyboardInput(true); // Show the input to display live transcription
    recognitionRef.current.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  }, []);

  // Fetch user profile and chat history on load
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // 1. Get current logged in user
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserProfile(user);
        }

        // 2. Fetch chat history (Fallback to empty array if table missing)
        const { data: chatHistory, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(50);
          
        if (chatHistory && chatHistory.length > 0) {
          setMessages(chatHistory);
        } else {
          // Add default fallback message for demo purposes if no data
          setMessages([
            { id: 1, role: 'user', content: 'Could you analyze the latest quarterly metrics and summarize the key growth areas? Focus specifically on user retention in the EMEA region.', timestamp: '0:14' },
            { id: 2, role: 'ai', content: "I've reviewed the Q3 metrics. The most significant growth area is indeed user retention within the EMEA region, which saw a 14.2% increase quarter-over-quarter. \n\nThis improvement correlates strongly with the rollout of localized ambient intelligence features in late August. Specifically, German and French markets adopted the new voice-to-text workflows at a rate 3x higher than initial projections.", timestamp: '0:15', model: 'GPT-4o', latency: '1.2s' }
          ]);
        }

        // 3. Fetch API Keys and User Settings
        if (user) {
          const { data: keys } = await supabase.from('api_keys').select('*').eq('user_id', user.id);
          if (keys && keys.length > 0) {
            setUserApiKeys(keys);

            // Dynamically load Gemini models for the user's Gemini key
            let dynamicModels = [...AVAILABLE_MODELS];
            const geminiKey = keys.find(k => k.provider.toLowerCase().includes('gemini') || k.provider.toLowerCase() === 'google gemini');
            if (geminiKey) {
              try {
                const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey.secret_key}`);
                const listData = await listRes.json();
                if (listData.models) {
                  const geminiModels = listData.models
                    .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                    .map(m => {
                      const rawId = m.name.replace('models/', '');
                      return {
                        id: rawId,
                        name: m.displayName || rawId,
                        provider: 'Google Gemini',
                        apiModel: rawId
                      };
                    });
                  // Replace any existing Gemini models with the real dynamic list
                  dynamicModels = [...AVAILABLE_MODELS.filter(m => m.provider !== 'Google Gemini'), ...geminiModels];
                }
              } catch(err) {
                console.warn('Could not fetch Gemini model list, using static fallback.');
              }
            }
            setAllModels(dynamicModels);

            // Auto-select a model the user has a key for
            const firstKey = keys[0];
            const matchingModel = dynamicModels.find(m => m.provider.toLowerCase() === firstKey.provider.toLowerCase() || (m.provider === 'Google Gemini' && firstKey.provider.toLowerCase() === 'gemini'));
            if (matchingModel) setActiveModelId(matchingModel.id);
          }

          // Fetch user preference to override default
          try {
            const { data: settings } = await supabase.from('user_settings').select('active_model').eq('user_id', user.id).single();
            if (settings && settings.active_model) {
              setActiveModelId(settings.active_model);
            }
          } catch(err) { /* No settings found */ }
        }
      } catch (err) {
        console.error("Supabase tables might not be set up yet.", err);
      }
      
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleModelChange = async (e) => {
    const newId = e.target.value;
    setActiveModelId(newId);
    
    // Sync preference to database
    if (userProfile) {
      const selectedModelDef = allModels.find(m => m.id === newId);
      if (selectedModelDef) {
        try {
          await supabase.from('user_settings').upsert({
            user_id: userProfile.id,
            active_model: selectedModelDef.id
          });
        } catch(err) {}
      }
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add User Message
    const userMsg = { id: Date.now(), role: 'user', content: text, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsAiTyping(true);

    // Save to Supabase (optional)
    try {
      if (userProfile) {
        await supabase.from('messages').insert([{ user_id: userProfile.id, role: 'user', content: text }]);
      }
    } catch(e) {}

    // Identify active model from the dynamic list
    const selectedModelDef = allModels.find(m => m.id === activeModelId) || AVAILABLE_MODELS[0];
    
    // Auto-select key for the provider
    const selectedKeyObj = userApiKeys.find(k => {
      const p = k.provider.toLowerCase();
      const targetP = selectedModelDef.provider.toLowerCase();
      return p === targetP || (targetP === 'google gemini' && p === 'gemini');
    });
    
    if (!selectedKeyObj) {
      setTimeout(() => {
        const aiMsg = { id: Date.now() + 1, role: 'ai', content: `Please add a valid API key for ${selectedModelDef.provider} in the 'API Keys' tab to use ${selectedModelDef.name}!`, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), model: 'System', latency: '-' };
        setMessages([...newMessages, aiMsg]);
        setIsAiTyping(false);
      }, 500);
      return;
    }

    const apiKey = selectedKeyObj.secret_key;

    // Call Real AI (Dynamic Provider)
    try {
      const startTime = Date.now();
      let aiText = '';

      if (selectedModelDef.provider === 'OpenAI') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
          body: JSON.stringify({ model: selectedModelDef.apiModel, messages: [{ role: 'user', content: text }], max_tokens: 500 })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        aiText = data.choices[0].message.content;
      } 
      else if (selectedModelDef.provider === 'Anthropic') {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerously-allow-browser': 'true'
          },
          body: JSON.stringify({
            model: selectedModelDef.apiModel,
            max_tokens: 500,
            messages: [{ role: 'user', content: text }]
          })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        aiText = data.content[0].text;
      }
      else if (selectedModelDef.provider === 'Google Gemini') {
        // Fallback chain: if quota exceeded, retry with lighter models
        const geminiModelFallbacks = [
          selectedModelDef.apiModel,
          'gemini-1.5-flash',
          'gemini-2.0-flash-lite',
        ];
        
        let lastError = null;
        let usedModel = selectedModelDef.apiModel;
        
        for (const modelId of [...new Set(geminiModelFallbacks)]) {
          try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
              },
              body: JSON.stringify({ contents: [{ parts: [{ text: text }] }] })
            });
            const data = await response.json();
            
            // Quota exceeded — try next fallback
            if (data.error && (data.error.code === 429 || data.error.status === 'RESOURCE_EXHAUSTED')) {
              lastError = data.error;
              continue;
            }
            
            if (data.error) throw new Error(data.error.message);
            aiText = data.candidates[0].content.parts[0].text;
            usedModel = modelId;
            break;
          } catch(err) {
            lastError = err;
          }
        }
        
        if (!aiText) {
          const suggestion = 'Tip: Try switching to Gemini 1.5 Flash or upgrade your Google AI plan at ai.dev/rate-limit.';
          throw new Error(`Quota exceeded for ${selectedModelDef.name}. ${suggestion}`);
        }
        
        // Update model name in chat bubble to reflect actual model used
        if (usedModel !== selectedModelDef.apiModel) {
          selectedModelDef.name = `${usedModel} (auto-fallback)`;
        }
      }
      else {
        throw new Error(`Integration for ${selectedKeyObj.provider} is not supported yet.`);
      }

      const latency = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
      const aiMsg = { id: Date.now() + 1, role: 'ai', content: aiText, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), model: selectedModelDef.name, latency: latency };
      
      setMessages([...newMessages, aiMsg]);
      
      if (userProfile) {
        await supabase.from('messages').insert([{ user_id: userProfile.id, role: 'ai', content: aiText, model: 'GPT Live', latency: latency }]);
      }
    } catch (error) {
      const errorMsg = { id: Date.now() + 1, role: 'ai', content: `API Error: ${error.message}`, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), model: 'Error', latency: '-' };
      setMessages([...newMessages, errorMsg]);
    }
    setIsAiTyping(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper h-screen flex overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar (Shared Component) */}
      <aside className="hidden md:flex h-screen w-72 flex-col p-gutter gap-unit z-40 bg-surface-container-lowest/80 backdrop-blur-2xl text-primary font-body-md text-body-md border-r border-white/10 shadow-2xl">
        <div className="mb-8">
          <h1 className="font-display-lg text-headline-md font-bold text-primary">Vocalize AI</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{userProfile ? userProfile.email : 'Pro Plan'}</p>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <Link className="flex items-center gap-3 p-3 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-[0_0_15px_rgba(88,86,214,0.3)] hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/dashboard">
            <span className="material-symbols-outlined">add_circle</span>
            New Session
          </Link>
          <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/history">
            <span className="material-symbols-outlined">history</span>
            History
          </Link>
          <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/models">
            <span className="material-symbols-outlined">neurology</span>
            Models
          </Link>
          <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/apikeys">
            <span className="material-symbols-outlined">vpn_key</span>
            API Keys
          </Link>
          <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/settings">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-tertiary text-white font-body-md text-body-md font-semibold hover:opacity-90 transition-opacity">
            Upgrade to Ultra
          </button>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
            <Link className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-on-surface transition-colors" to="#">
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="font-label-sm text-label-sm">Help</span>
            </Link>
            <button onClick={handleSignOut} className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-error transition-colors w-full text-left">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-label-sm text-label-sm">Sign Out</span>
            </button>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-white/10">
              <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0XcyFhfg1n00eJD60x9aN9eeyYy7Z6QyfEAOt5Tnq3DzUCu3X3C2WIBlyTH18-NIICkXDre0U7bt3jMN6BXmP6GsVT7exqMGFYcMnwbtRBPnMTfWLp6qpTBhht8KM6dvZDx_DdhaMqs7nO-8qcDAky6sIkPxI3KOtZUUe0fqDb8JxbWBGyTnEkQd7ypp7fKYI2B_0qOIADqR9ayF3BD260_stsVtvkOl9u_AsFDtYjCBZxepomW-KdtLC1ShhZNzEfwgEgvcrig" />
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col relative h-full">
        {/* Top Header Controls */}
        <header className="flex justify-between items-center p-margin-desktop z-10">
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">model_training</span>
            <select 
              className="bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 cursor-pointer appearance-none outline-none"
              value={activeModelId}
              onChange={handleModelChange}
            >
              {allModels.map(m => (
                <option key={m.id} className="bg-surface" value={m.id}>{m.name}</option>
              ))}
            </select>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
          </div>
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-outline'}`}></div>
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">{isLoading ? 'Connecting...' : (isListening ? 'Listening' : 'Idle')}</span>
          </div>
        </header>

        {/* Transcription Canvas */}
        <div className="flex-1 flex flex-col p-margin-desktop pb-32 gap-6 overflow-y-auto z-10 relative">
          <div className="flex-1 min-h-0 shrink-0"></div>
          {messages.map((msg) => (
            msg.role === 'user' ? (
              <div key={msg.id} className="self-end max-w-2xl glass-panel p-6 rounded-2xl rounded-br-sm glow-accent border-primary/30">
                <p className="font-body-lg text-body-lg text-on-surface">{msg.content}</p>
                <div className="mt-3 flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  <span>You</span>
                  <span className="mx-1">•</span>
                  <span>{msg.timestamp || 'Just now'}</span>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="self-start max-w-3xl glass-panel p-6 rounded-2xl rounded-bl-sm">
                <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_10px_rgba(88,86,214,0.5)]">
                      <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Analysis Complete</h3>
                      <p className="font-label-sm text-label-sm text-tertiary">{msg.model || 'AI'} • Processed in {msg.latency || '1.0s'}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-label-sm text-label-sm text-primary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    Play Voice
                  </button>
                </div>
                <div className="font-body-md text-body-md text-on-surface-variant space-y-4">
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            )
          ))}

          {/* Real-time transcription indicator */}
          {(isListening || isAiTyping) && (
            <div className="self-end flex items-center gap-3 mt-4 opacity-70">
              <span className="font-label-sm text-label-sm text-on-surface-variant italic">
                {isAiTyping ? 'AI is generating response...' : 'Transcribing...'}
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Central Waveform Area (Background) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <div className="w-full max-w-4xl h-64 flex items-center justify-center gap-1 opacity-40 mix-blend-screen mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)">
            {/* Static representation of waveform */}
            <div className="waveform-bar w-1"></div>
            <div className="waveform-bar w-3"></div>
            <div className="waveform-bar w-2"></div>
            <div className="waveform-bar w-5"></div>
            <div className="waveform-bar w-4"></div>
            <div className="waveform-bar w-7"></div>
            <div className="waveform-bar w-6"></div>
            <div className="waveform-bar w-4"></div>
            <div className="waveform-bar w-7"></div>
            <div className="waveform-bar w-3"></div>
            <div className="waveform-bar w-5"></div>
            <div className="waveform-bar w-2"></div>
            <div className="waveform-bar w-6"></div>
            <div className="waveform-bar w-4"></div>
            <div className="waveform-bar w-5"></div>
            <div className="waveform-bar w-3"></div>
            <div className="waveform-bar w-1"></div>
          </div>
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-tertiary/10 blur-[80px] rounded-full"></div>
        </div>

        {showKeyboardInput && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4">
            <div className="glass-panel rounded-full flex items-center px-6 py-3 shadow-2xl">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..." 
                className="bg-transparent text-on-surface font-body-md w-full outline-none placeholder:text-outline"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputText);
                  }
                }}
              />
              <button 
                className="text-primary hover:text-tertiary transition-colors ml-4"
                onClick={() => handleSendMessage(inputText)}
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Action Controls */}
        <div className="absolute bottom-margin-desktop left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
            <button 
              className={`transition-colors ${showKeyboardInput ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              onClick={() => setShowKeyboardInput(!showKeyboardInput)}
            >
              <span className="material-symbols-outlined text-[24px]">keyboard</span>
            </button>
            {/* Main Mic FAB */}
            <div className="relative">
              {isListening && (
                <>
                  <div className="pulse-ring scale-150"></div>
                  <div className="pulse-ring scale-110 opacity-70"></div>
                </>
              )}
              <button 
                className={`w-16 h-16 rounded-full text-white flex items-center justify-center shadow-[0_0_30px_rgba(88,86,214,0.6)] hover:scale-105 transition-all z-10 relative ${isListening ? 'bg-error' : 'bg-gradient-to-br from-primary-container to-inverse-primary'}`}
                onClick={() => isListening ? stopListening() : startListening()}
                title={micError || (isListening ? 'Stop listening' : 'Start voice input')}
              >
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>{isListening ? 'mic_off' : 'mic'}</span>
              </button>
            </div>
            <button 
              className="text-on-surface-variant hover:text-error transition-colors"
              onClick={stopListening}
            >
              <span className="material-symbols-outlined text-[24px]">stop_circle</span>
            </button>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
            {micError ? (
              <span className="text-error">{micError}</span>
            ) : isListening ? 'Listening... speak now (stops automatically)' : 'Tap mic to start voice input'}
          </span>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
