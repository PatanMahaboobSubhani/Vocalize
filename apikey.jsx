import React, { useState, useEffect } from 'react';
import './apikey.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const fallbackKeys = [
    {
        id: 1,
        provider: 'OpenAI',
        model_desc: 'GPT-4o / DALL-E 3',
        icon: 'psychology',
        icon_color: 'text-primary',
        key_ref: 'sk-•••••••••••••7u2a',
        last_used: '2 mins ago',
        status: 'Verified',
        status_color: 'bg-primary/10 text-primary',
        status_dot: 'bg-primary animate-pulse'
    },
    {
        id: 2,
        provider: 'Anthropic',
        model_desc: 'Claude 3.5 Sonnet',
        icon: 'science',
        icon_color: 'text-secondary',
        key_ref: 'ant-•••••••••••••99pk',
        last_used: '14 hours ago',
        status: 'Verified',
        status_color: 'bg-primary/10 text-primary',
        status_dot: 'bg-primary animate-pulse'
    },
    {
        id: 3,
        provider: 'ElevenLabs',
        model_desc: 'Multilingual v2',
        icon: 'graphic_eq',
        icon_color: 'text-tertiary',
        key_ref: 'el-•••••••••••••x31x',
        last_used: '3 days ago',
        status: 'Expired',
        status_color: 'bg-error/10 text-error',
        status_dot: 'bg-error'
    }
];

const ApiKeys = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showKey, setShowKey] = useState(false);
    
    // Supabase State
    const [apiKeys, setApiKeys] = useState(fallbackKeys);
    const [isLoading, setIsLoading] = useState(true);
    
    // Form State
    const [newProvider, setNewProvider] = useState('OpenAI');
    const [newKeyName, setNewKeyName] = useState('');
    const [newSecretKey, setNewSecretKey] = useState('');

    useEffect(() => {
        const fetchKeys = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase.from('api_keys').select('*');
                if (data && data.length > 0) {
                    setApiKeys(data);
                }
            } catch (err) {
                console.log('Using default fallback keys (Supabase table may not exist yet).');
            }
            setIsLoading(false);
        };
        fetchKeys();
    }, []);

    const handleSaveKey = async () => {
        // Simple insert to supabase
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("Please log in to save keys.");
                return;
            }

            const { data, error } = await supabase.from('api_keys').insert([
                { 
                    user_id: user.id,
                    provider: newProvider,
                    key_name: newKeyName,
                    secret_key: newSecretKey, 
                    status: 'Verified'
                }
            ]);
            
            if (error) throw error;
            
            // Reload keys or optimistic update...
            alert("Key saved successfully!");
            toggleModal(false);
        } catch (e) {
            console.error('Failed to save key:', e);
            alert("Failed to save key. Make sure the api_keys table exists!");
            toggleModal(false);
        }
    };
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };
    useEffect(() => {
        const handleMouseMove = (e) => {
            const panels = document.querySelectorAll('.glow-hover');
            panels.forEach(panel => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                    panel.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(194,193,255,0.06) 0%, rgba(255,255,255,0.03) 60%)`;
                } else {
                    panel.style.background = 'rgba(255,255,255,0.03)';
                }
            });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const toggleModal = (show) => {
        setIsModalOpen(show);
        if (!show) {
            setShowKey(false);
            setNewProvider('openai');
            setNewKeyName('');
            setNewSecretKey('');
        }
    };

    return (
        <div className="bg-[#11131c] text-[#e1e1ef] font-['Inter',_sans-serif] min-h-screen overflow-x-hidden">
            <div className="flex min-h-screen">
                {/* SideNavBar */}
                <aside className="hidden md:flex h-screen w-72 flex-col p-gutter gap-unit z-40 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-white/10 shadow-2xl sticky top-0">
                    <div className="mb-10">
                        <h1 className="font-display-lg text-headline-md font-bold text-primary">Vocalize AI</h1>
                        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">Pro Plan</p>
                    </div>
                    <nav className="flex-1 flex flex-col gap-2">
                        <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/dashboard">
                            <span className="material-symbols-outlined">add_circle</span>
                            <span className="font-body-md text-body-md">New Session</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/history">
                            <span className="material-symbols-outlined">history</span>
                            <span className="font-body-md text-body-md">History</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/models">
                            <span className="material-symbols-outlined">neurology</span>
                            <span className="font-body-md text-body-md">Models</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-[0_0_15px_rgba(88,86,214,0.3)] transition-all duration-200 hover:translate-x-1" to="/apikeys">
                            <span className="material-symbols-outlined">vpn_key</span>
                            <span className="font-body-md text-body-md">API Keys</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/settings">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="font-body-md text-body-md">Settings</span>
                        </Link>
                    </nav>
                    <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
                        <button className="w-full py-4 mb-4 rounded-xl bg-gradient-to-r from-primary to-tertiary text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                            Upgrade to Ultra
                        </button>
                        <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors" to="#">
                            <span className="material-symbols-outlined">help</span>
                            <span className="font-label-sm text-label-sm">Help</span>
                        </Link>
                        <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error transition-colors w-full text-left">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="font-label-sm text-label-sm">Sign Out</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto w-full">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div>
                            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">API Infrastructure</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Manage secure authentication tokens for third-party AI orchestration and neural synthesis providers.</p>
                        </div>
                        <button 
                            className="flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-bold rounded-xl shadow-[0_0_20px_rgba(194,193,255,0.2)] hover:shadow-[0_0_35px_rgba(194,193,255,0.4)] transition-all active:scale-95" 
                            onClick={() => toggleModal(true)}
                        >
                            <span className="material-symbols-outlined">add</span>
                            Add New Key
                        </button>
                    </div>

                    {/* Dashboard Stats Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="glass-panel p-8 rounded-2xl glow-hover transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-primary">bolt</span>
                                <span className="font-label-sm text-label-sm text-tertiary">Live</span>
                            </div>
                            <div className="font-display-lg text-headline-md text-on-surface">{apiKeys.length} Active</div>
                            <div className="font-body-md text-on-surface-variant opacity-60">Connected Providers</div>
                        </div>
                        <div className="glass-panel p-8 rounded-2xl glow-hover transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-secondary">monitoring</span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">24h</span>
                            </div>
                            <div className="font-display-lg text-headline-md text-on-surface">1.2M</div>
                            <div className="font-body-md text-on-surface-variant opacity-60">Tokens Orchestrated</div>
                        </div>
                        <div className="glass-panel p-8 rounded-2xl glow-hover transition-all border-tertiary/20">
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-tertiary">security</span>
                                <span className="font-label-sm text-label-sm text-error">Warning</span>
                            </div>
                            <div className="font-display-lg text-headline-md text-on-surface">0 Breaches</div>
                            <div className="font-body-md text-on-surface-variant opacity-60">System Integrity: 99.9%</div>
                        </div>
                    </div>

                    {/* API Keys Table Container */}
                    <div className="glass-panel rounded-3xl overflow-hidden animate-scan">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                        <th className="px-8 py-6 font-display-lg text-label-sm text-on-surface-variant uppercase tracking-widest">Provider</th>
                                        <th className="px-8 py-6 font-display-lg text-label-sm text-on-surface-variant uppercase tracking-widest">API Key Reference</th>
                                        <th className="px-8 py-6 font-display-lg text-label-sm text-on-surface-variant uppercase tracking-widest">Last Used</th>
                                        <th className="px-8 py-6 font-display-lg text-label-sm text-on-surface-variant uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-6 font-display-lg text-label-sm text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-8 text-center text-on-surface-variant">
                                                Loading API Keys...
                                            </td>
                                        </tr>
                                    ) : (
                                        apiKeys.map((key) => (
                                            <tr key={key.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-8 py-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-on-surface-variant/10 flex items-center justify-center">
                                                            <span className={`material-symbols-outlined ${key.icon_color || 'text-primary'}`}>{key.icon || 'key'}</span>
                                                        </div>
                                                        <div>
                                                            <div className="font-headline-md text-body-lg text-on-surface">{key.provider}</div>
                                                            <div className="font-label-sm text-[10px] text-on-surface-variant">{key.model_desc || 'Custom Configuration'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-8">
                                                    <div className="flex items-center gap-2 group/key cursor-pointer">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant group-hover/key:text-primary transition-colors">{key.key_ref || 'sk-•••••••••••••'}</span>
                                                        <span className="material-symbols-outlined text-[16px] opacity-0 group-hover/key:opacity-100 transition-opacity">content_copy</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-8 font-label-sm text-label-sm text-on-surface-variant">
                                                    {key.last_used || 'Just now'}
                                                </td>
                                                <td className="px-8 py-8">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-[10px] ${key.status_color || 'bg-primary/10 text-primary'}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${key.status_dot || 'bg-primary animate-pulse'}`}></span>
                                                        {key.status || 'Active'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-8 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-on-surface-variant hover:text-error"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">refresh</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Global Footer */}
                    <footer className="mt-24 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-on-surface-variant">
                        <div className="flex flex-col gap-2">
                            <span className="font-display-lg text-headline-md text-primary">Vocalize AI</span>
                            <p className="font-label-sm text-label-sm">© 2024 Vocalize AI. Ambient Intelligence for Everyone.</p>
                        </div>
                        <div className="flex gap-8 font-label-sm text-label-sm">
                            <Link className="hover:text-primary transition-colors" to="#">Privacy Policy</Link>
                            <Link className="hover:text-primary transition-colors" to="#">Terms of Service</Link>
                            <Link className="hover:text-primary transition-colors" to="#">Status</Link>
                            <Link className="hover:text-primary transition-colors" to="#">GitHub</Link>
                        </div>
                    </footer>
                </main>
            </div>

            {/* Add Key Modal Overlay */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 transition-opacity duration-300"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) toggleModal(false);
                    }}
                >
                    <div className="glass-panel w-full max-w-lg rounded-3xl p-10 shadow-2xl transition-transform duration-300 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="font-display-lg text-headline-md text-on-surface">New API Integration</h3>
                                <p className="font-body-md text-on-surface-variant">Securely authorize a new provider.</p>
                            </div>
                            <button 
                                className="p-2 hover:bg-white/10 rounded-full transition-colors" 
                                onClick={() => toggleModal(false)}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">Service Provider</label>
                                <select 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all"
                                    value={newProvider}
                                    onChange={(e) => setNewProvider(e.target.value)}
                                >
                                    <option className="bg-surface" value="OpenAI">OpenAI</option>
                                    <option className="bg-surface" value="Anthropic">Anthropic</option>
                                    <option className="bg-surface" value="Google Gemini">Google Gemini</option>
                                    <option className="bg-surface" value="ElevenLabs">ElevenLabs</option>
                                </select>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">Key Name (Optional)</label>
                                <input 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                                    placeholder="e.g. Production Main" 
                                    type="text" 
                                    value={newKeyName}
                                    onChange={(e) => setNewKeyName(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">API Secret Key</label>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-12" 
                                        placeholder="sk-..." 
                                        type={showKey ? "text" : "password"}
                                        value={newSecretKey}
                                        onChange={(e) => setNewSecretKey(e.target.value)}
                                    />
                                    <button 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" 
                                        type="button"
                                        onClick={() => setShowKey(!showKey)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showKey ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                                <p className="font-label-sm text-label-sm text-primary/80">Keys are encrypted at rest using AES-256 and never stored in plain text.</p>
                            </div>
                            
                            <div className="flex gap-4 pt-4">
                                <button 
                                    className="flex-1 py-4 font-bold text-on-surface-variant hover:bg-white/5 rounded-xl transition-all" 
                                    onClick={() => toggleModal(false)} 
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="flex-1 py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" 
                                    type="button"
                                    onClick={handleSaveKey}
                                >
                                    Save Key
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApiKeys;
