import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-wrapper bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* TopNavBar */}
      <nav className="bg-surface/10 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 shadow-[0_0_30px_rgba(194,193,255,0.1)] z-50">
        <div className="flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto z-50">
          <div className="font-display-lg text-display-lg-mobile font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
            Vocalize AI
          </div>
          <div className="hidden md:flex gap-8 items-center font-body-md text-body-md">
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Features</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Pricing</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Providers</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Docs</a>
          </div>
          <div className="flex gap-4 items-center">
            <a className="hidden md:block font-body-md text-body-md text-on-surface hover:text-primary transition-colors" href="#">Log In</a>
            <a className="bg-gradient-to-r from-primary to-tertiary text-on-primary font-body-md text-body-md px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(194,193,255,0.3)]" href="#">Get Started</a>
          </div>
        </div>
      </nav>
      {/* Main Content Canvas */}
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center flex flex-col items-center justify-center min-h-[819px] overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-tertiary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
            {/* AI Status Chip */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-surface/30 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_var(--color-tertiary)]"></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Ambient Intelligence Live</span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background tracking-tight">
              The Voice of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-tertiary">Intelligence.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Speak naturally. Interact with OpenAI, Claude, and Gemini through a unified, ultra-low latency voice interface designed for seamless flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <button className="bg-gradient-to-r from-primary to-tertiary text-on-primary font-body-md text-body-md px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(194,193,255,0.4)] w-full sm:w-auto">
                Get Started Free
              </button>
              <button className="glass-panel text-on-surface font-body-md text-body-md px-8 py-3.5 rounded-lg font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto glow-effect transition-all duration-300">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Watch Demo
              </button>
            </div>
          </div>
          {/* Hero Image/UI Mockup Placeholder */}
          <div className="relative w-full max-w-5xl mx-auto mt-24 z-10 glass-panel rounded-xl p-2 md:p-4 shadow-2xl overflow-hidden glow-effect transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none"></div>
            <img alt="Audio waveform visualization" className="w-full h-auto rounded-lg object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" data-alt="A sophisticated, dark-themed 3D rendering of an abstract audio wave visualization..." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTtLE65cVH6P-coDux4hiKW1DYqFX0UvUCukZXnp8XGnih2lxxtp6eOJlYBzLm5z4c_QQ0hOsvgDvWTBngO7okSTusYqcrz6bz2MNd5YzmAMMGGBRbpLMYNr2ZlW-PtWVjibrDLKw6-RHRyfRaGvcsKKY6IKwhG1TpAgbfoVqRaPuIKn9h5T5jiqgqOfbmwI9pgZCZMMtRR6T5CQvlCIpGhfIFvZ-R36DnFrySYHLm2eW6bIZ1osEdnsGLKwUJgFopIfGckvekIQ" />
            {/* Floating UI Elements over Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 glass-panel rounded-full p-6 animate-pulse">
              <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
            </div>
          </div>
        </section>
        {/* Feature Bento Grid */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-16">
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">Orchestrate powerful technology.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Advanced minimalism meets hyper-efficient routing. Experience voice interaction without the wait.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            {/* Feature 1: Large Span */}
            <div className="md:col-span-2 glass-panel rounded-xl p-8 flex flex-col justify-between glow-effect transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors duration-500"></div>
              <div className="z-10">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-6 border border-white/5">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-2">Ultra-low Latency</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Our edge-optimized routing ensures sub-500ms response times. Conversations feel natural, fluid, and human.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between glow-effect transition-all duration-300 relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-[40px] group-hover:bg-tertiary/20 transition-colors duration-500"></div>
              <div className="z-10">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-6 border border-white/5">
                  <span className="material-symbols-outlined text-tertiary">record_voice_over</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-2">Real-time STT</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Flawless speech-to-text conversion with contextual understanding.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between glow-effect transition-all duration-300 relative overflow-hidden group">
              <div className="z-10">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-6 border border-white/5">
                  <span className="material-symbols-outlined text-primary">hub</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-2">Multi-provider</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Switch seamlessly between OpenAI, Claude, Gemini, and DeepSeek.</p>
              </div>
            </div>
            {/* Feature 4: Large Span */}
            <div className="md:col-span-2 glass-panel rounded-xl p-8 flex flex-col justify-between glow-effect transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
              <div className="z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-6 border border-white/5">
                    <span className="material-symbols-outlined text-tertiary">lock</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-background mb-2">Secure Key Vault</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Your API keys are encrypted at rest and in transit. We never store your voice data or transcripts without explicit opt-in.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">Transparent access.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Choose the tier that fits your compute needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pro Tier */}
            <div className="glass-panel rounded-xl p-10 relative overflow-hidden border-primary/30 glow-effect transition-all duration-300">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary"></div>
              <div className="mb-8">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2 block">Pro Plan</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg text-on-background">$29</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-4">For power users who need constant ambient access.</p>
              </div>
              <ul className="space-y-4 mb-8 font-body-md text-body-md text-on-surface">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">check</span> Unlimited local voice models
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">check</span> Bring your own API keys
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">check</span> Priority routing
                </li>
              </ul>
              <button className="w-full bg-primary-container text-on-primary-container font-body-md text-body-md px-6 py-3 rounded-lg font-medium hover:bg-primary-container/90 transition-colors shadow-[0_0_15px_rgba(88,86,214,0.3)]">
                Subscribe Now
              </button>
            </div>
            {/* Enterprise Tier */}
            <div className="glass-panel rounded-xl p-10 relative overflow-hidden glow-effect transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 block">Enterprise</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-lg text-display-lg text-on-background">Custom</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-4">For teams integrating voice intelligence at scale.</p>
                </div>
                <ul className="space-y-4 mb-8 font-body-md text-body-md text-on-surface">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-sm">check</span> Dedicated compute instances
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-sm">check</span> Custom model fine-tuning
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-sm">check</span> SLA guarantees
                  </li>
                </ul>
              </div>
              <button className="w-full border border-outline-variant text-on-surface font-body-md text-body-md px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-surface-container-lowest w-full py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-6 md:gap-0">
          <div className="font-display-lg text-headline-md text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-label-sm text-label-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Status</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Twitter</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">GitHub</a>
          </div>
          <div className="font-label-sm text-label-sm text-tertiary">
            © 2024 Vocalize AI. Ambient Intelligence for Everyone.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
