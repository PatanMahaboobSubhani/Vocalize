import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper h-screen flex overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar (Shared Component) */}
      <aside className="hidden md:flex h-screen w-72 flex-col p-gutter gap-unit z-40 bg-surface-container-lowest/80 backdrop-blur-2xl text-primary font-body-md text-body-md border-r border-white/10 shadow-2xl">
        <div className="mb-8">
          <h1 className="font-display-lg text-headline-md font-bold text-primary">Vocalize AI</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Pro Plan</p>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <a className="flex items-center gap-3 p-3 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-[0_0_15px_rgba(88,86,214,0.3)] hover:bg-white/5 transition-all duration-200 hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">add_circle</span>
            New Session
          </a>
          <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">history</span>
            History
          </a>
          <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">neurology</span>
            Models
          </a>
          <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">vpn_key</span>
            API Keys
          </a>
          <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:bg-white/5 transition-all duration-200 hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-tertiary text-white font-body-md text-body-md font-semibold hover:opacity-90 transition-opacity">
            Upgrade to Ultra
          </button>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
            <a className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="font-label-sm text-label-sm">Help</span>
            </a>
            <a className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-error transition-colors" href="../log_in_vocalize_ai_styled/Login.jsx">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-label-sm text-label-sm">Sign Out</span>
            </a>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-white/10">
              <img alt="User profile" className="w-full h-full object-cover" data-alt="A close-up portrait of a professional individual in a high-tech environment..." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0XcyFhfg1n00eJD60x9aN9eeyYy7Z6QyfEAOt5Tnq3DzUCu3X3C2WIBlyTH18-NIICkXDre0U7bt3jMN6BXmP6GsVT7exqMGFYcMnwbtRBPnMTfWLp6qpTBhht8KM6dvZDx_DdhaMqs7nO-8qcDAky6sIkPxI3KOtZUUe0fqDb8JxbWBGyTnEkQd7ypp7fKYI2B_0qOIADqR9ayF3BD260_stsVtvkOl9u_AsFDtYjCBZxepomW-KdtLC1ShhZNzEfwgEgvcrig" />
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
            <select className="bg-transparent border-none text-on-surface font-body-md text-body-md focus:ring-0 cursor-pointer appearance-none outline-none">
              <option className="bg-surface" value="gpt4o">GPT-4o (Default)</option>
              <option className="bg-surface" value="claude">Claude 3.5 Sonnet</option>
              <option className="bg-surface" value="gemini">Gemini Pro</option>
            </select>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
          </div>
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">Listening</span>
          </div>
        </header>
        {/* Transcription Canvas */}
        <div className="flex-1 flex flex-col justify-end p-margin-desktop pb-32 gap-6 overflow-y-auto z-10 relative">
          {/* User Bubble */}
          <div className="self-end max-w-2xl glass-panel p-6 rounded-2xl rounded-br-sm glow-accent border-primary/30">
            <p className="font-body-lg text-body-lg text-on-surface">
              Could you analyze the latest quarterly metrics and summarize the key growth areas? Focus specifically on user retention in the EMEA region.
            </p>
            <div className="mt-3 flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>You</span>
              <span className="mx-1">•</span>
              <span>0:14</span>
            </div>
          </div>
          {/* AI Response Card */}
          <div className="self-start max-w-3xl glass-panel p-6 rounded-2xl rounded-bl-sm">
            <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_10px_rgba(88,86,214,0.5)]">
                  <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Analysis Complete</h3>
                  <p className="font-label-sm text-label-sm text-tertiary">GPT-4o • Processed in 1.2s</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-label-sm text-label-sm text-primary">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Play Voice
              </button>
            </div>
            <div className="font-body-md text-body-md text-on-surface-variant space-y-4">
              <p>
                I've reviewed the Q3 metrics. The most significant growth area is indeed user retention within the EMEA region, which saw a <span className="text-primary font-semibold">14.2% increase</span> quarter-over-quarter.
              </p>
              <p>
                This improvement correlates strongly with the rollout of localized ambient intelligence features in late August. Specifically, German and French markets adopted the new voice-to-text workflows at a rate 3x higher than initial projections.
              </p>
            </div>
          </div>
          {/* Real-time transcription indicator */}
          <div className="self-end flex items-center gap-3 mt-4 opacity-70">
            <span className="font-label-sm text-label-sm text-on-surface-variant italic">Transcribing...</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
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
        {/* Floating Action Controls */}
        <div className="absolute bottom-margin-desktop left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[24px]">keyboard</span>
            </button>
            {/* Main Mic FAB */}
            <div className="relative">
              <div className="pulse-ring scale-150"></div>
              <div className="pulse-ring scale-110 opacity-70"></div>
              <button className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-container to-inverse-primary text-white flex items-center justify-center shadow-[0_0_30px_rgba(88,86,214,0.6)] hover:scale-105 transition-transform z-10 relative">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
              </button>
            </div>
            <button className="text-on-surface-variant hover:text-error transition-colors">
              <span className="material-symbols-outlined text-[24px]">stop_circle</span>
            </button>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Tap to pause listening</span>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
