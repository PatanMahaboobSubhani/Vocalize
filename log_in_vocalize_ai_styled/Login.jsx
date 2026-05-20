import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-wrapper min-h-screen flex items-center justify-center relative overflow-hidden font-body-md text-body-md">
      {/* Ambient Lights */}
      <div className="ambient-light bg-primary-container w-[600px] h-[600px] top-[-200px] left-[-200px]"></div>
      <div className="ambient-light bg-tertiary-container w-[500px] h-[500px] bottom-[-100px] right-[-100px] opacity-20"></div>
      
      {/* Login Container */}
      <main className="relative z-10 w-full max-w-[480px] px-margin-mobile md:px-0">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Vocalize AI</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Ambient Intelligence for Everyone.</p>
        </div>
        
        {/* Glassmorphic Card */}
        <div className="glass-panel rounded-lg p-8 shadow-xl">
          <h2 className="font-headline-md text-headline-md mb-6 text-white" data-stitch-orig-opacity="0">Welcome Back</h2>
          <form className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm block uppercase tracking-wider text-on-surface" data-stitch-orig-opacity="0" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
                <input className="glass-input w-full rounded-DEFAULT pl-10 pr-4 py-3 text-on-surface placeholder:text-outline" id="email" placeholder="name@company.com" required type="email" />
              </div>
            </div>
            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm block uppercase tracking-wider text-on-surface" data-stitch-orig-opacity="0" htmlFor="password">Password</label>
                <a className="font-label-sm text-label-sm text-primary hover:text-tertiary transition-colors" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input className="glass-input w-full rounded-DEFAULT pl-10 pr-4 py-3 text-on-surface placeholder:text-outline" id="password" placeholder="••••••••" required type="password" />
              </div>
            </div>
            {/* Submit Button */}
            <button className="glow-btn-primary w-full py-3 rounded-lg text-on-primary-container font-headline-md text-body-md font-semibold mt-8 flex items-center justify-center gap-2" type="submit">
              Sign In
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
            </button>
          </form>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-outline-variant"></div>
            <span className="font-label-sm text-label-sm text-outline">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-outline-variant"></div>
          </div>
          
          {/* Social Logins */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="glass-panel py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container transition-colors text-on-surface font-label-sm">
              <span className="material-symbols-outlined text-outline">dataset</span>
              <span>Google</span>
            </button>
            <button className="glass-panel py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container transition-colors text-on-surface font-label-sm">
              <span className="material-symbols-outlined text-outline">code_blocks</span>
              <span>GitHub</span>
            </button>
          </div>
          <p className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
            Don't have an account? <a className="text-primary hover:text-tertiary transition-colors font-semibold" href="#">Sign up</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
