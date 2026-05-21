import React, { useState } from 'react';
import './Settings.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Settings = () => {
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [showAnthropicKey, setShowAnthropicKey] = useState(false);
  const [editOpenAIKey, setEditOpenAIKey] = useState(false);
  const [editAnthropicKey, setEditAnthropicKey] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="settings-wrapper flex h-screen overflow-hidden">
      {/* SideNavBar (JSON Derived) */}
      <nav className="hidden md:flex bg-surface-container-lowest/80 backdrop-blur-2xl text-primary font-body-md text-body-md h-screen w-72 flex-col border-r border-white/10 shadow-2xl flex flex-col p-gutter gap-unit z-40">
        <div className="mb-8 mt-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-white/10">
            <img alt="User profile" className="w-full h-full object-cover" data-alt="A small, stylized avatar portrait of a user in a dark mode UI, subtly illuminated, minimalist." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4k8MKusOYfGWVyPBzsKiDv1ZRMMpvvMtDVlMxsgVj55iJiQ90Bnlbz_aZwAZ9nN2c1q2nvDRLPLy-zL7F-BZ_5lUiM0m_0CeZVT_R6iagBXKKIfLU1LeL7okrTe6eGWUGlweeGjNyRIVOiWm9GQg1wjJGgkgQj2M8BjHuTaIyOftPKsgeS-Wbh1Xuo6mVE6sOxHbtECy-LA4b8ZHxxnT8qT2fRtyh0tZqXoOFQhXlHld5BdSyjcMW-c9TEXiKnStOq7Syh84bmQ" />
          </div>
          <div>
            <h1 className="font-display-lg text-headline-md font-bold text-primary">Vocalize AI</h1>
            <span className="text-on-surface-variant font-label-sm text-label-sm block mt-1">Pro Plan</span>
          </div>
        </div>
        <button className="mb-8 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-tertiary text-white font-body-md text-body-md font-semibold hover:shadow-[0_0_20px_rgba(194,193,255,0.4)] transition-all duration-300">
          Upgrade to Ultra
        </button>
        <div className="flex flex-col gap-2 flex-grow">
          {/* New Session */}
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/dashboard">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>add_circle</span>
            New Session
          </Link>
          {/* History */}
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/history">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
            History
          </Link>
          {/* Models */}
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/models">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>neurology</span>
            Models
          </Link>
          {/* API Keys */}
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/apikeys">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>vpn_key</span>
            API Keys
          </Link>
          {/* Settings (ACTIVE) */}
          <Link className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-[0_0_15px_rgba(88,86,214,0.3)] hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="/settings">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            Settings
          </Link>
        </div>
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" to="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>help</span>
            Help
          </Link>
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error transition-colors w-full text-left">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
            Sign Out
          </button>
        </div>
      </nav>
      {/* Main Content Canvas */}
      <main className="flex-1 overflow-y-auto bg-background p-gutter md:p-margin-desktop relative">
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-container-max mx-auto relative z-10 space-y-8 pb-20">
          {/* Page Header */}
          <header className="mb-10">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">Settings & Integrations</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your LLM providers, voice profiles, and ambient AI preferences.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Primary Settings (API Keys) */}
            <div className="lg:col-span-8 space-y-8">
              {/* API Keys Bento Card */}
              <section className="glass-panel rounded-xl p-8 glow-hover transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">API Configurations</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Provide keys for external inference models.</p>
                  </div>
                  <span className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Services Online
                  </span>
                </div>
                <div className="space-y-6">
                  {/* Provider: OpenAI */}
                  <div className="group">
                    <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">
                      <span className="w-4 h-4 rounded-sm bg-white/10 flex items-center justify-center text-[10px]">O</span>
                      OpenAI
                    </label>
                    <div className="relative flex items-center">
                      <input className="w-full input-glass py-3 px-4 text-on-surface font-body-md text-body-md rounded-t-lg transition-all" type={showOpenAIKey ? "text" : "password"} defaultValue="sk-proj-8x92nd83nd92..." readOnly={!editOpenAIKey} />
                      <div className="absolute right-2 flex gap-2">
                        <button onClick={() => setShowOpenAIKey(!showOpenAIKey)} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">{showOpenAIKey ? "visibility_off" : "visibility"}</span>
                        </button>
                        <button onClick={() => setEditOpenAIKey(!editOpenAIKey)} className={`p-2 text-on-surface-variant hover:text-primary transition-colors ${editOpenAIKey ? 'text-primary' : ''}`}>
                          <span className="material-symbols-outlined text-[20px]">{editOpenAIKey ? "check" : "edit"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Provider: Anthropic */}
                  <div className="group">
                    <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">
                      <span className="w-4 h-4 rounded-sm bg-white/10 flex items-center justify-center text-[10px]">A</span>
                      Anthropic
                    </label>
                    <div className="relative flex items-center">
                      <input className="w-full input-glass py-3 px-4 text-on-surface font-body-md text-body-md rounded-t-lg transition-all" type={showAnthropicKey ? "text" : "password"} defaultValue="sk-ant-api03-..." readOnly={!editAnthropicKey} />
                      <div className="absolute right-2 flex gap-2">
                        <button onClick={() => setShowAnthropicKey(!showAnthropicKey)} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">{showAnthropicKey ? "visibility_off" : "visibility"}</span>
                        </button>
                        <button onClick={() => setEditAnthropicKey(!editAnthropicKey)} className={`p-2 text-on-surface-variant hover:text-primary transition-colors ${editAnthropicKey ? 'text-primary' : ''}`}>
                          <span className="material-symbols-outlined text-[20px]">{editAnthropicKey ? "check" : "edit"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Provider: Google */}
                  <div className="group">
                    <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">
                      <span className="w-4 h-4 rounded-sm bg-white/10 flex items-center justify-center text-[10px]">G</span>
                      Google Gemini
                    </label>
                    <div className="relative flex items-center">
                      <input className="w-full input-glass py-3 px-4 text-on-surface font-body-md text-body-md rounded-t-lg transition-all placeholder:text-outline-variant" placeholder="Enter API Key" type="text" />
                      <div className="absolute right-2 flex gap-2">
                        <button className="px-4 py-1.5 bg-surface-container-high hover:bg-surface-bright rounded text-primary font-label-sm text-label-sm transition-colors border border-white/5">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Voice & Ambient Settings */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Voice Profile */}
                <div className="glass-panel rounded-xl p-6 glow-hover transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-tertiary">record_voice_over</span>
                    <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Voice Profile</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">TTS PROVIDER</label>
                      <select className="w-full input-glass py-2.5 px-3 text-on-surface font-body-md text-body-md rounded-t-lg appearance-none bg-surface-container-low cursor-pointer">
                        <option>ElevenLabs (Premium)</option>
                        <option>OpenAI TTS</option>
                        <option>Google Cloud TTS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">VOICE MODEL</label>
                      <select className="w-full input-glass py-2.5 px-3 text-on-surface font-body-md text-body-md rounded-t-lg appearance-none bg-surface-container-low cursor-pointer">
                        <option>Alloy (Neutral)</option>
                        <option>Echo (Warm, Male)</option>
                        <option>Nova (Clear, Female)</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Language & Toggles */}
                <div className="glass-panel rounded-xl p-6 glow-hover transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-tertiary">language</span>
                    <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Preferences</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">OUTPUT LANGUAGE</label>
                      <select className="w-full input-glass py-2.5 px-3 text-on-surface font-body-md text-body-md rounded-t-lg appearance-none bg-surface-container-low cursor-pointer">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Auto-Detect</option>
                      </select>
                    </div>
                    {/* Toggles */}
                    <div className="pt-2 space-y-4">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Continuous Mode</span>
                        <div className="relative">
                          <input defaultChecked={true} className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                        </div>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Aggressive Noise Reduction</span>
                        <div className="relative">
                          <input className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* Right Column: Usage & Analytics */}
            <div className="lg:col-span-4 space-y-8">
              {/* Usage Stats Card */}
              <aside className="glass-panel rounded-xl p-6 glow-hover transition-all duration-300 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-secondary">monitoring</span>
                  <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">API Usage</h3>
                </div>
                <div className="space-y-6">
                  {/* Metric 1 */}
                  <div>
                    <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm mb-2">
                      <span>OpenAI (GPT-4o)</span>
                      <span>$12.40 / $50.00</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  {/* Metric 2 */}
                  <div>
                    <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm mb-2">
                      <span>ElevenLabs</span>
                      <span>45k / 100k chars</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Estimated Monthly Total</p>
                    <p className="font-display-lg text-[32px] font-bold text-on-surface">$28.90</p>
                  </div>
                  <button className="w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-on-surface font-body-md text-body-md hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                    View Detailed Billing
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
