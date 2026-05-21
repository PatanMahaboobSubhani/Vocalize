import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './sessions.css';

const INITIAL_SESSIONS = [
  {
    id: 'mock-1',
    title: 'Quarterly Growth Analysis',
    excerpt: '"Looking at the trajectory for Q4, we need to focus on user retention specifically in the enterprise segment..."',
    model: 'GPT-4o',
    tag: 'Growth',
    date: 'Oct 24, 2024',
    duration: '2:45',
    tagClass: 'bg-primary/10 text-primary border border-primary/20',
    messages: [
      { id: 101, role: 'user', content: 'Can we analyze the trajectory for Q4 growth?' },
      { id: 102, role: 'ai', content: 'Looking at the trajectory for Q4, we need to focus on user retention specifically in the enterprise segment. If we increase enterprise retention by 2%, we hit our Q4 targets easily.', model: 'GPT-4o', latency: '1.2s' }
    ]
  },
  {
    id: 'mock-2',
    title: 'Email Draft: Project Launch',
    excerpt: '"Subject: Final preparations for the upcoming product reveal. I\'ve outlined the three main pillars of our messaging..."',
    model: 'Claude 3.5',
    tag: 'Internal',
    date: 'Oct 23, 2024',
    duration: '1:12',
    tagClass: 'bg-surface-variant text-on-surface-variant',
    messages: [
      { id: 201, role: 'user', content: 'Draft an email for the project launch' },
      { id: 202, role: 'ai', content: 'Subject: Final preparations for the upcoming product reveal. I\'ve outlined the three main pillars of our messaging: Innovation, Speed, and Simplicity.', model: 'Claude 3.5 Sonnet', latency: '1.8s' }
    ]
  },
  {
    id: 'mock-3',
    title: 'Weekly Sprint Retrospective',
    excerpt: '"The deployment pipeline showed some latency issues this week. We should investigate the cache layers..."',
    model: 'GPT-4o',
    tag: 'Brainstorm',
    date: 'Oct 21, 2024',
    duration: '12:04',
    tagClass: 'bg-surface-variant text-on-surface-variant',
    messages: [
      { id: 301, role: 'user', content: 'What were the main engineering issues this week?' },
      { id: 302, role: 'ai', content: 'The deployment pipeline showed some latency issues this week. We should investigate the cache layers and optimize database connection pooling.', model: 'GPT-4o', latency: '0.9s' }
    ]
  },
  {
    id: 'mock-4',
    title: 'Brand Identity Brainstorming',
    excerpt: '"Exploring the intersection of cinematic visuals and functional minimalism. The color palette should evoke high-tech..."',
    model: 'GPT-4o',
    tag: 'Marketing',
    date: 'Oct 19, 2024',
    duration: '4:30',
    tagClass: 'bg-surface-variant text-on-surface-variant',
    messages: [
      { id: 401, role: 'user', content: 'Brainstorm brand identity ideas for our app' },
      { id: 402, role: 'ai', content: 'Exploring the intersection of cinematic visuals and functional minimalism. The color palette should evoke high-tech precision combined with organic warmth.', model: 'GPT-4o', latency: '1.4s' }
    ]
  }
];

const groupMessagesIntoSessions = (messages) => {
  if (!messages || messages.length === 0) return [];
  
  // Sort messages ascending by created_at first to group them chronologically
  const sorted = [...messages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
  const sessions = [];
  let currentSession = null;
  const GAP_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
  
  sorted.forEach(msg => {
    const msgTime = new Date(msg.created_at || Date.now());
    
    if (!currentSession || (msgTime - new Date(currentSession.lastTime)) > GAP_THRESHOLD_MS) {
      // Start a new session
      currentSession = {
        id: msg.id || Math.random().toString(),
        title: `Session on ${msgTime.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`,
        excerpt: msg.content ? `"${msg.content.substring(0, 100)}..."` : 'No content',
        model: msg.model || 'AI Model',
        tag: 'Chat',
        date: msgTime.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        duration: msgTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
        tagClass: 'bg-primary/10 text-primary border border-primary/20',
        messages: [msg],
        lastTime: msg.created_at || new Date().toISOString()
      };
      sessions.push(currentSession);
    } else {
      // Add to current session
      currentSession.messages.push(msg);
      currentSession.lastTime = msg.created_at || new Date().toISOString();
      if (msg.role === 'user' && msg.content) {
        currentSession.excerpt = `"${msg.content.substring(0, 100)}..."`;
      }
      if (msg.model) {
        currentSession.model = msg.model;
      }
    }
  });
  
  // Return sessions sorted descending (most recent first)
  return sessions.reverse();
};

const Sessions = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [sortByDate, setSortByDate] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchUserAndHistory = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserProfile(user);
          
          const { data: dbMessages } = await supabase
            .from('messages')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });

          if (dbMessages && dbMessages.length > 0) {
            const grouped = groupMessagesIntoSessions(dbMessages);
            setSessions([...grouped, ...INITIAL_SESSIONS]);
          } else {
            setSessions(INITIAL_SESSIONS);
          }
        } else {
          setSessions(INITIAL_SESSIONS);
        }
      } catch (err) {
        console.error('Failed to load history from Supabase:', err);
        setSessions(INITIAL_SESSIONS);
      }
      setIsLoading(false);
    };
    fetchUserAndHistory();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          session.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          session.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModel = selectedModel ? session.model.toLowerCase().includes(selectedModel.toLowerCase()) : true;
    return matchesSearch && matchesModel;
  });

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (sortByDate) {
      return new Date(b.date) - new Date(a.date);
    }
    return 0; // maintain default order if not sorted
  });

  return (
    <div className="sessions-wrapper flex min-h-screen">
      {/* SideNavBar Shell */}
      <aside className={`fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-white/10 p-gutter gap-unit z-40 flex flex-col transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:block'}`}>
        <div className="mb-8 px-2">
          <h1 className="font-display-lg text-headline-md font-bold text-primary">Vocalize AI</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
              <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfbJ8LeaFEEnTPPi-OmONqb-oh6zVeJo5DoNqttxX-BGq-IJjOwkhR4wWNzuOPct_6EzhkqVjNHHcA-qjy2z5GP2z8P1x3y1w_JgZRAA8MGIPqcnEyGqgU33HVi9KgDMHWMy7wOOX72yN0RABED4O_PiTfjaTwSNtUvR1lc6aDUm3MztMp4A3FvBt1bnTrGiSdzo1tJyAr2aGNs3hOG7ePbrUrwmDnNtYVnVwB9Z17D4WrxLC4cd6KSgEOZQQZTU4nbFyuASORqg"/>
            </div>
            <div>
              <p className="font-body-md text-body-md font-semibold text-on-surface truncate max-w-[150px]">
                {userProfile ? userProfile.email.split('@')[0] : 'Alex Rivera'}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Pro Plan</p>
            </div>
          </div>
        </div>
        <nav className="flex-grow space-y-2">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/dashboard">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="font-body-md text-body-md">New Session</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-[0_0_15px_rgba(88,86,214,0.3)] transition-all duration-200" to="/history">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
            <span className="font-body-md text-body-md">History</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/models">
            <span className="material-symbols-outlined">neurology</span>
            <span className="font-body-md text-body-md">Models</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/apikeys">
            <span className="material-symbols-outlined">vpn_key</span>
            <span className="font-body-md text-body-md">API Keys</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/settings">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </Link>
        </nav>
        <div className="mt-auto space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="font-body-md text-body-md text-on-surface-variant mb-2">Power user?</p>
            <button className="w-full py-2 bg-gradient-to-r from-primary to-tertiary text-on-primary font-bold rounded-lg active:scale-95 transition-transform duration-200">Upgrade to Ultra</button>
          </div>
          <div className="space-y-1">
            <Link className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors" to="#">
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-sm text-label-sm">Help</span>
            </Link>
            <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-colors w-full text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-sm text-label-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen bg-background relative flex flex-col">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 blur-[100px] rounded-full -z-10"></div>

        {/* Header Shell */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/10 h-20 px-margin-mobile md:px-margin-desktop flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
            <h2 className="font-headline-md text-headline-md text-on-surface">Sessions</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
            </button>
            <Link className="p-2 rounded-full hover:bg-white/5 transition-colors" to="/settings">
              <span className="material-symbols-outlined text-on-surface-variant">settings</span>
            </Link>
            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOx07QPaLK0FREtpEsd17SAcixc7Lcle0nfIf1hVwEedBtbJylcL2tRuOPR-vIlUO_JbuqHOgUfKZoNJc1Qhpc5KmUO84Q93u44uzilVeMp-VPpAKxh-3FTR2Cb8vgCyLtMWnYYrtFbAJfcypWvWyrhGriZjEfNjuDZ3OYHiI0PVQjFd-N1iaS-jJXBL9Gb57NuP0LIiQ-kpkzSTNAuKLC2t9OMwmtfJQRfNplnJ4fiUMo_mM8dqRQ7BfhOB2mR2rxQL0cbLoaHw"/>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex-grow w-full">
          {/* Hero Title Section */}
          <div className="mb-12">
            <h1 className="font-display-lg text-display-lg mb-2 text-gradient">Conversation History</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Review, analyze, and manage your previous AI voice interactions. All transcripts are automatically generated and stored securely.
            </p>
          </div>

          {/* Controls Panel */}
          <div className="glass-card rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="w-full bg-white/5 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary text-body-md text-on-surface placeholder-on-surface-variant/50 transition-all outline-none" 
                placeholder="Search sessions or content..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button 
                onClick={() => setSortByDate(!sortByDate)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${sortByDate ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 hover:bg-white/10 text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span className="font-body-md text-body-md">Date</span>
              </button>
              
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-body-md text-on-surface cursor-pointer outline-none hover:bg-white/10 transition-colors"
              >
                <option value="" className="bg-surface">All Models</option>
                <option value="gpt" className="bg-surface">GPT Models</option>
                <option value="claude" className="bg-surface">Claude Models</option>
                <option value="gemini" className="bg-surface">Gemini Models</option>
              </select>

              <div className="h-8 w-[1px] bg-white/10 mx-1 hidden md:block"></div>
              
              {(searchQuery || selectedModel || sortByDate) && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedModel('');
                    setSortByDate(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  <span className="font-body-md text-body-md">Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Session Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              <div className="lg:col-span-2 text-center py-20 glass-card rounded-2xl">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-on-surface-variant font-body-lg">Loading conversation history...</p>
              </div>
            ) : sortedSessions.length > 0 ? (
              sortedSessions.map((session) => (
                <div key={session.id} className="glass-card rounded-2xl p-8 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded font-label-sm text-label-sm uppercase tracking-widest">{session.model}</span>
                        <span className={`px-2 py-1 rounded font-label-sm text-label-sm uppercase tracking-widest ${session.tagClass}`}>{session.tag}</span>
                      </div>
                      <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-3 group-hover:text-primary transition-colors">{session.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-6">
                      {session.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-on-surface-variant/70">
                        <span className="material-symbols-outlined text-lg">event</span>
                        <span className="font-label-sm text-label-sm">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant/70">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span className="font-label-sm text-label-sm">{session.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-on-surface transition-all">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg bg-primary-container/20 text-primary hover:bg-primary-container/30 transition-all font-body-md text-sm font-semibold"
                        onClick={() => setSelectedSession(session)}
                      >
                        View Transcript
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="lg:col-span-2 text-center py-20 glass-card rounded-2xl">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">search_off</span>
                <p className="text-on-surface-variant font-body-lg">No sessions found matching your filters.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-4">
            <button className="p-2 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold">1</button>
              <button className="w-10 h-10 rounded-lg bg-white/5 text-on-surface-variant hover:bg-white/10">2</button>
              <button className="w-10 h-10 rounded-lg bg-white/5 text-on-surface-variant hover:bg-white/10">3</button>
            </div>
            <button className="p-2 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Footer Anchor */}
        <footer className="w-full py-12 border-t border-white/5 bg-surface-container-lowest mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h4 className="font-display-lg text-headline-md text-primary">Vocalize AI</h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant">© 2026 Vocalize AI. Ambient Intelligence for Everyone.</p>
            </div>
            <div className="flex gap-8">
              <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" to="#">Privacy Policy</Link>
              <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" to="#">Terms of Service</Link>
              <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" to="#">Status</Link>
              <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" to="#">GitHub</Link>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Navigation Shell */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface-container-lowest/90 backdrop-blur-xl flex items-center justify-around px-4 z-50 shadow-2xl">
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/dashboard">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="text-[10px] font-medium">New</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-primary" to="/history">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="text-[10px] font-bold">History</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/models">
          <span className="material-symbols-outlined">neurology</span>
          <span className="text-[10px] font-medium">Models</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/apikeys">
          <span className="material-symbols-outlined">vpn_key</span>
          <span className="text-[10px] font-medium">API</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface-variant" to="/settings">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium">Settings</span>
        </Link>
      </nav>

      {/* Transcript Modal Overlay */}
      {selectedSession && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedSession(null);
          }}
        >
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-8 shadow-2xl flex flex-col max-h-[85vh] transition-transform duration-300 animate-in fade-in zoom-in-95 border border-white/10">
            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display-lg text-headline-md text-on-surface">{selectedSession.title}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Model: {selectedSession.model} | Date: {selectedSession.date}
                </p>
              </div>
              <button 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-on-surface" 
                onClick={() => setSelectedSession(null)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 scrolling-hide flex flex-col gap-2">
              {selectedSession.messages.map((msg, index) => (
                msg.role === 'user' ? (
                  <div key={msg.id || index} className="self-end ml-auto max-w-[85%] bg-primary-container/20 border border-primary/30 p-4 rounded-2xl rounded-br-sm shadow-md">
                    <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap">{msg.content}</p>
                    <span className="text-[10px] text-on-surface-variant block mt-2 text-right">You</span>
                  </div>
                ) : (
                  <div key={msg.id || index} className="self-start mr-auto max-w-[85%] bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-sm shadow-md">
                    <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">{msg.content}</p>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[10px] text-on-surface-variant">
                      <span className="text-tertiary">{msg.model || selectedSession.model}</span>
                      <span>Latency: {msg.latency || '1.0s'}</span>
                    </div>
                  </div>
                )
              ))}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-white/10">
              <button 
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-bold rounded-xl transition-all" 
                onClick={() => setSelectedSession(null)}
              >
                Close Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
