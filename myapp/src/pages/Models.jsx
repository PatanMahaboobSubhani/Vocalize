import React, { useState, useEffect } from 'react';
import './Models.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const defaultModels = [
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        description: 'Omni-model optimized for real-time conversational reasoning and ultra-low latency audio processing.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBtLLIJjUJAE1d23o1t1lT3izldIbbEvsKTDa0cSnImpujnd4KyRiJDJWPpwl9B3tBJ_mCNfXrGvaEcaukayLG5kBrrpGxXCk8B19Zr9CaVD-xDnXLKCwVkYTb1XOUhAroMVKIGMg_L98az0OR3TzQh_N_aoKSZJzverAGaBl-9FBNRQqX03NMdxUsEI1YWBI2hm2asvf0oXVUfFaq6Yfcw-_cltToAUlsmPcrYpvEDM0QgYr-cm4EHpoLyXrZxq0zghwkp0UfYA',
        latency: '120ms',
        latencyColor: 'text-emerald-400',
        accuracy: '98.4%',
        accuracyColor: 'text-primary',
        context: '128k',
        contextColor: 'text-on-surface',
        tag: 'ACTIVE',
        tagClass: 'bg-primary text-on-primary font-bold'
    },
    {
        id: 'claude-3-5',
        name: 'Claude 3.5 Sonnet',
        description: 'Highly nuanced linguistic output, ideal for complex creative writing and empathetic character voices.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCFS8twEHtmxzgubBKZ9FJMkcB0M5KZPWrH_vz0bg1q3MLuyNz4Jd-uzjNoZ5yfx73QsK7uHa6-3JTm0KtSrX9JxrEmhI-W6I5FLs7dmV3h1Ompd219aGGC5jJT3j43wPTqJyYjzs2eydBreWNsf4Rk_t_6H3Rjv3U7JPvTAwGm69GzeACn6WoG_6148Ecrr033wVR-SQuno3u2A-MtXYA4qJedOCyyocnEoT4qVY8nExNMz3GPzZDXxkBM__1OUh5jiMkrEPGLA',
        latency: '240ms',
        latencyColor: 'text-on-surface',
        accuracy: '99.1%',
        accuracyColor: 'text-primary',
        context: '200k',
        contextColor: 'text-on-surface',
        tag: 'RECOMMENDED',
        tagClass: 'bg-white/5 text-on-surface-variant border border-white/10'
    },
    {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        description: 'Google\'s most capable model. Advanced reasoning, massive 2M context window, and native multimodal understanding.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp61KcDKX3QhiA3Lmz97-lUDmLo1-YkDFsZePb5apn-sgYSU0QFmO0UYxkr863Wdb_ihMZ89XuMcpdtQRZvM36yXO0QYSNIr-KTPc8OzHYKiD4tQvtws7T-vWBMbkK2tq3qmxQ5PXchr9KYrYXzB6sHOD7pGGhXcODWP4N-FHF3zfCv-44l7V_thMrYp8XwiBxVm5LR_71eOSkyxsrbGMACiVIhZ-CM83y0ZdcOkVdkHXqZt2_W2073LiQyhQb3dJq9HMxkcPQwA',
        latency: '210ms',
        latencyColor: 'text-on-surface',
        accuracy: '99.3%',
        accuracyColor: 'text-primary',
        context: '2M+',
        contextColor: 'text-emerald-400',
        tag: 'LATEST',
        tagClass: 'bg-tertiary-container/30 text-tertiary border border-tertiary/20'
    },
    {
        id: 'gemini-2.0-flash',
        name: 'Gemini 2.0 Flash',
        description: 'Ultra-fast and efficient. Optimized for high-volume, real-time applications with multimodal support.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp61KcDKX3QhiA3Lmz97-lUDmLo1-YkDFsZePb5apn-sgYSU0QFmO0UYxkr863Wdb_ihMZ89XuMcpdtQRZvM36yXO0QYSNIr-KTPc8OzHYKiD4tQvtws7T-vWBMbkK2tq3qmxQ5PXchr9KYrYXzB6sHOD7pGGhXcODWP4N-FHF3zfCv-44l7V_thMrYp8XwiBxVm5LR_71eOSkyxsrbGMACiVIhZ-CM83y0ZdcOkVdkHXqZt2_W2073LiQyhQb3dJq9HMxkcPQwA',
        latency: '95ms',
        latencyColor: 'text-emerald-400',
        accuracy: '97.8%',
        accuracyColor: 'text-primary',
        context: '1M+',
        contextColor: 'text-emerald-400',
        tag: 'FAST',
        tagClass: 'bg-primary/10 text-primary border border-primary/20'
    },
    {
        id: 'llama-3',
        name: 'Llama 3 70B',
        description: 'High-performance open weights model. Excellent for standard tasks with zero data retention policies.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTvWOoKBJvIy2hsJrjN6uOx-Rp5IJU2fk8gNMtK4Px9vFobcO0U7jSHnX4g7yqODWtG32rbWO7_DRgUoOKlbIYMTZb84LewGFI7oOMCAO1fElzGhq2RFY5T3TuHP8oq6de2GdS9kLpeZqb5AahPa9sYseADbzyeD_TU23kQDTRhsGhFmSJhRCcYtQvArRoO1eQrlfABtl3XPkhnxzQGPYA62HctnBBB_jzzoHLvWn0e3iEAtuaYvOAoFiDeagUYCJi58AwnefuUw',
        latency: '180ms',
        latencyColor: 'text-on-surface',
        accuracy: '96.5%',
        accuracyColor: 'text-primary',
        context: '8k',
        contextColor: 'text-on-surface',
        tag: 'OPEN SOURCE',
        tagClass: 'bg-tertiary-container/30 text-tertiary border border-tertiary/20'
    }
];

const Models = () => {
    const navigate = useNavigate();
    const [activeModel, setActiveModel] = useState(null); // null until loaded from DB
    const [activatingModel, setActivatingModel] = useState(null);
    const [modelsData, setModelsData] = useState(defaultModels);
    const [userApiKeys, setUserApiKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const checkModelHasKey = (modelName, keys) => {
        if (modelName.toLowerCase().includes('gpt')) {
            return keys.some(k => k.provider.toLowerCase() === 'openai');
        }
        if (modelName.toLowerCase().includes('claude')) {
            return keys.some(k => k.provider.toLowerCase() === 'anthropic');
        }
        if (modelName.toLowerCase().includes('gemini')) {
            return keys.some(k => k.provider.toLowerCase().includes('gemini'));
        }
        if (modelName.toLowerCase().includes('llama')) {
            return true; // Open Source
        }
        return false;
    };

    useEffect(() => {
        const fetchModelsAndKeys = async () => {
            setIsLoading(true);
            try {
                // Fetch models
                const { data: mData } = await supabase.from('models').select('*');
                if (mData && mData.length > 0) setModelsData(mData);
                
                // Fetch API keys and user preferences
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: keys } = await supabase.from('api_keys').select('*').eq('user_id', user.id);
                    if (keys && keys.length > 0) setUserApiKeys(keys);

                    // Fetch active model preference
                    try {
                        const { data: settings } = await supabase.from('user_settings').select('active_model').eq('user_id', user.id).single();
                        if (settings && settings.active_model) {
                            setActiveModel(settings.active_model);
                        }
                    } catch(err) { /* No settings found */ }
                }
            } catch (err) {
                console.log('Using default fallback models');
            }
            setIsLoading(false);
        };
        fetchModelsAndKeys();
    }, []);

    const handleSwitch = async (modelId) => {
        setActivatingModel(modelId);
        
        // Simulating updating user preferences in Supabase
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase.from('user_settings').upsert({
                    user_id: user.id,
                    active_model: modelId
                });
            }
        } catch (e) {
            console.error('Failed to sync active model to database');
        }

        setTimeout(() => {
            setActiveModel(modelId);
            setActivatingModel(null);
        }, 1200);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            document.querySelectorAll('.ambient-blob').forEach(blob => {
                blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="flex min-h-screen bg-[#11131c] text-[#e1e1ef] overflow-x-hidden font-body-md">
            {/* SideNavBar Anchor */}
            <aside className="hidden md:flex flex-col h-screen w-72 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-white/10 p-gutter gap-unit z-40 fixed left-0">
                <div className="mb-8 px-2">
                    <h1 className="font-display-lg text-headline-md font-bold text-primary">Vocalize AI</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
                            <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfbJ8LeaFEEnTPPi-OmONqb-oh6zVeJo5DoNqttxX-BGq-IJjOwkhR4wWNzuOPct_6EzhkqVjNHHcA-qjy2z5GP2z8P1x3y1w_JgZRAA8MGIPqcnEyGqgU33HVi9KgDMHWMy7wOOX72yN0RABED4O_PiTfjaTwSNtUvR1lc6aDUm3MztMp4A3FvBt1bnTrGiSdzo1tJyAr2aGNs3hOG7ePbrUrwmDnNtYVnVwB9Z17D4WrxLC4cd6KSgEOZQQZTU4nbFyuASORqg" />
                        </div>
                        <div>
                            <p className="font-body-md text-body-md font-semibold text-on-surface">Alex Rivera</p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">Pro Plan</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 space-y-2">
                    <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/dashboard">
                        <span className="material-symbols-outlined">add_circle</span>
                        <span className="font-body-md text-body-md">New Session</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 hover:translate-x-1" to="/history">
                        <span className="material-symbols-outlined">history</span>
                        <span className="font-body-md text-body-md">History</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-[0_0_15px_rgba(88,86,214,0.3)] transition-all duration-200" to="/models">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
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
                        <Link className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-colors" to="/">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="font-label-sm text-label-sm">Sign Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Canvas */}
            <main className="flex-1 ml-0 md:ml-72 min-h-screen flex flex-col relative overflow-hidden">
                {/* Subtle Ambient Background Blobs */}
                <div className="ambient-blob absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="ambient-blob absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-tertiary/10 blur-[100px] rounded-full pointer-events-none"></div>
                
                <header className="h-20 px-margin-desktop flex items-center justify-between border-b border-white/5 bg-surface/10 backdrop-blur-xl sticky top-0 z-30">
                    <div>
                        <h2 className="font-display-lg text-headline-md font-bold text-on-surface">Model Selection</h2>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">Switch between cutting-edge LLMs optimized for vocal synthesis.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-surface-container-high rounded-full border border-white/10 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="font-label-sm text-label-sm text-on-surface">{isLoading ? 'Syncing...' : 'Systems Nominal'}</span>
                        </div>
                    </div>
                </header>

                <section className="p-margin-desktop max-w-container-max mx-auto w-full relative">
                    {/* Bento Grid of Models */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-gutter">
                        {modelsData.map((model) => {
                            const hasKey = checkModelHasKey(model.name, userApiKeys);
                            return (
                                <ModelCard
                                    key={model.id || model.name}
                                    name={model.name}
                                    description={model.description}
                                    image={model.image}
                                    latency={model.latency}
                                    latencyColor={model.latencyColor || "text-on-surface"}
                                    accuracy={model.accuracy}
                                    accuracyColor={model.accuracyColor || "text-primary"}
                                    context={model.context}
                                    contextColor={model.contextColor || "text-on-surface"}
                                    tag={hasKey ? model.tag : 'LOCKED'}
                                    tagClass={hasKey ? model.tagClass : 'bg-surface text-on-surface-variant border border-white/10 opacity-70'}
                                    active={activeModel === model.id}
                                    activating={activatingModel === model.id}
                                    hasKey={hasKey}
                                    onSwitch={() => hasKey ? handleSwitch(model.id) : navigate('/apikeys')}
                                />
                            );
                        })}

                        {/* Custom Integration Card */}
                        <div className="glass-card border-dashed border-white/20 bg-transparent flex flex-col items-center justify-center text-center p-8 rounded-2xl gap-4 group cursor-pointer hover:bg-white/5 min-h-[300px]">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl text-primary">add</span>
                            </div>
                            <div>
                                <h3 className="font-display-lg text-headline-md text-on-surface mb-2">Custom Endpoint</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant">Connect your own hosted fine-tuned model via secure REST API.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Anchor */}
                <footer className="mt-auto w-full py-12 border-t border-white/5 bg-surface-container-lowest">
                    <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-6">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <h4 className="font-display-lg text-headline-md text-primary">Vocalize AI</h4>
                            <p className="font-label-sm text-label-sm text-tertiary">© 2024 Vocalize AI. Ambient Intelligence for Everyone.</p>
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

            {/* Mobile Navigation (BottomNavBar) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface-container-lowest/90 backdrop-blur-xl flex items-center justify-around px-4 z-50 shadow-2xl">
                <Link to="/dashboard" className="flex flex-col items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined">add_circle</span>
                    <span className="text-[10px] font-medium">New</span>
                </Link>
                <Link to="/history" className="flex flex-col items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined">history</span>
                    <span className="text-[10px] font-medium">History</span>
                </Link>
                <Link to="/models" className="flex flex-col items-center gap-1 text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
                    <span className="text-[10px] font-bold">Models</span>
                </Link>
                <Link to="/apikeys" className="flex flex-col items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined">vpn_key</span>
                    <span className="text-[10px] font-medium">API</span>
                </Link>
                <Link to="/settings" className="flex flex-col items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="text-[10px] font-medium">Settings</span>
                </Link>
            </nav>
        </div>
    );
};

const ModelCard = ({
    name,
    description,
    image,
    latency,
    latencyColor,
    accuracy,
    accuracyColor,
    context,
    contextColor,
    tag,
    tagClass,
    active,
    activating,
    hasKey,
    onSwitch
}) => {
    return (
        <div className={`glass-card relative overflow-hidden p-8 rounded-2xl flex flex-col gap-6 group min-h-[300px] ${active ? 'active-model-card' : ''}`}>
            {active && <div className="scanning-line"></div>}
            
            <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                    <img alt="Provider" className="w-full h-full opacity-90" src={image} />
                </div>
                {tag && (
                    <div className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${tagClass}`}>
                        {tag}
                    </div>
                )}
            </div>
            
            <div>
                <h3 className={`font-display-lg text-headline-md mb-2 ${active ? 'text-primary' : 'text-on-surface'}`}>{name}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">{description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-auto mb-4">
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-label-sm text-label-sm text-on-surface-variant">
                    Latency: <span className={latencyColor}>{latency}</span>
                </span>
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-label-sm text-label-sm text-on-surface-variant">
                    Accuracy: <span className={accuracyColor}>{accuracy}</span>
                </span>
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-label-sm text-label-sm text-on-surface-variant">
                    Context: <span className={contextColor}>{context}</span>
                </span>
            </div>
            
            {active ? (
                <button className="w-full py-3 bg-white/10 text-on-surface font-semibold rounded-xl border border-white/20 cursor-default">
                    Current Selection
                </button>
            ) : hasKey ? (
                <button 
                    onClick={onSwitch}
                    className={`w-full py-3 font-semibold rounded-xl border transition-all duration-300 active:scale-95 ${
                        activating 
                        ? 'bg-primary-container text-on-primary-container border-primary animate-pulse'
                        : 'bg-primary-container/20 hover:bg-primary-container text-on-primary-container border-primary/20 hover:border-primary'
                    }`}
                >
                    {activating ? 'Activating...' : `Switch to ${name.split(' ')[0]}`}
                </button>
            ) : (
                <button 
                    onClick={onSwitch}
                    className="w-full py-3 font-semibold rounded-xl border transition-all duration-300 active:scale-95 bg-surface/50 text-on-surface-variant border-white/5 hover:border-white/20 hover:text-primary flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Requires API Key
                </button>
            )}
        </div>
    );
};

export default Models;
