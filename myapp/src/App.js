import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/dashboard.jsx';
import Settings from './pages/Settings.jsx';
import Models from './pages/Models.jsx';
import ApiKeys from './pages/apikey.jsx';
import Sessions from './pages/sessions.jsx';

function HomeNav() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#11131c', color: '#e1e1ef', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '2rem' }}>Vocalize AI - App Hub</h1>
      <p style={{ marginBottom: '40px', opacity: 0.8 }}>Select a page below to view the converted React components:</p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0 }}>
        <li><Link to="/" style={{ color: '#c2c1ff', textDecoration: 'none', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #464554', borderRadius: '8px', display: 'inline-block' }}>Landing Page</Link></li>
        <li><Link to="/login" style={{ color: '#c2c1ff', textDecoration: 'none', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #464554', borderRadius: '8px', display: 'inline-block' }}>Login</Link></li>
        <li><Link to="/signup" style={{ color: '#c2c1ff', textDecoration: 'none', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #464554', borderRadius: '8px', display: 'inline-block' }}>Sign Up</Link></li>
        <li><Link to="/dashboard" style={{ color: '#c2c1ff', textDecoration: 'none', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #464554', borderRadius: '8px', display: 'inline-block' }}>Dashboard</Link></li>
        <li><Link to="/models" style={{ color: '#c2c1ff', textDecoration: 'none', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #464554', borderRadius: '8px', display: 'inline-block' }}>Models</Link></li>
        <li><Link to="/apikeys" style={{ color: '#c2c1ff', textDecoration: 'none', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #464554', borderRadius: '8px', display: 'inline-block' }}>API Keys</Link></li>
        <li><Link to="/settings" style={{ color: '#c2c1ff', textDecoration: 'none', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #464554', borderRadius: '8px', display: 'inline-block' }}>Settings</Link></li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* LandingPage is now the default page at the root URL */}
        <Route path="/" element={<LandingPage />} />

        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/models" element={<Models />} />
        <Route path="/apikeys" element={<ApiKeys />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<Sessions />} />
      </Routes>
    </Router>
  );
}

export default App;
