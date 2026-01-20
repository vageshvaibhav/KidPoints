
import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  History, 
  Settings, 
  Award, 
  Star, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  ShoppingBag,
  ArrowLeft,
  ChevronDown,
  Trash2,
  Sparkles,
  Bell,
  Users,
  LogOut,
  ShieldCheck,
  Info,
  ExternalLink,
  Shield,
  ThumbsUp,
  AlertCircle,
  RotateCcw,
  Smartphone,
  Globe,
  Download,
  Upload,
  Database,
  TrendingUp,
  Moon,
  Sun,
  WifiOff,
  Cloud,
  Share,
  SmartphoneNfc
} from 'lucide-react';
import { 
  AppState, 
  ChildProfile, 
  Transaction, 
  RewardCategory, 
  RewardItem,
  Notification 
} from './types';
import { DEFAULT_CATEGORIES, INITIAL_REWARDS, AVATARS, CHORE_SUGGESTIONS } from './constants';

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[2.5rem] p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-2 text-slate-400"><XCircle size={24} /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

const MobileContainer = ({ children, title, showBack, onBack, role, activeChild, unreadCount, setShowNotifications, setView, setState, view, darkMode, setDarkMode }: any) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  return (
    <div className={`flex flex-col h-full ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'} max-w-md mx-auto relative border-x border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-300`}>
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={onBack} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {title || 'KidPoints'}
            </h1>
            <div className="flex items-center gap-1 opacity-40">
              {isOnline ? <Cloud size={10} className="text-emerald-500" /> : <WifiOff size={10} className="text-rose-500" />}
              <span className="text-[8px] font-black uppercase tracking-tighter dark:text-white">{isOnline ? 'Cloud Ready' : 'Offline Mode'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           {role === 'PARENT' && (
             <button onClick={() => setShowNotifications(true)} className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
               <Bell size={22} className="text-slate-600 dark:text-slate-300" />
               {unreadCount > 0 && (
                 <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-800">
                   {unreadCount}
                 </span>
               )}
             </button>
           )}
           <button 
            onClick={() => { setState((p: AppState) => ({ ...p, role: p.role === 'PARENT' ? 'CHILD' : 'PARENT' })); setView('DASHBOARD'); }}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${role === 'PARENT' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-emerald-600 text-white shadow-emerald-200'}`}
          >
            {role}
          </button>
        </div>
      </header>
      
      <main className="flex-1 p-6 pb-28 overflow-y-auto hide-scrollbar">
        {children}
      </main>

      <nav className="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 px-8 py-4 pb-8 flex items-center justify-between fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 shadow-lg">
        <button onClick={() => setView('DASHBOARD')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'DASHBOARD' ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'}`}>
          <Star size={24} fill={view === 'DASHBOARD' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button onClick={() => setView('STORE')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'STORE' ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'}`}>
          <ShoppingBag size={24} fill={view === 'STORE' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold uppercase">Store</span>
        </button>
        <button onClick={() => setView('HISTORY')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'HISTORY' ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'}`}>
          <History size={24} />
          <span className="text-[10px] font-bold uppercase">History</span>
        </button>
        {role === 'PARENT' && (
          <button onClick={() => setView('FAMILY_SETTINGS')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'FAMILY_SETTINGS' ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'}`}>
            <Settings size={24} />
            <span className="text-[10px] font-bold uppercase">Setup</span>
          </button>
        )}
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  const STORAGE_KEY = 'kidpoints_app_state_prod_v1';
  const THEME_KEY = 'kidpoints_dark_mode';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === 'true');
  const [isStandalone, setIsStandalone] = useState(false);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      children: [],
      categories: DEFAULT_CATEGORIES,
      rewards: INITIAL_REWARDS,
      transactions: [],
      notifications: [],
      activeChildId: null,
      role: 'PARENT',
      familyId: 'FAM-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      activeParentName: 'Parent',
      coParents: []
    };
  });

  const [view, setView] = useState<'AUTH' | 'DASHBOARD' | 'STORE' | 'HISTORY' | 'MANAGE_KIDS' | 'MANAGE_CATEGORIES' | 'FAMILY_SETTINGS' | 'LEGAL'>('AUTH');
  const [showAddPointModal, setShowAddPointModal] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  
  const [rewardForm, setRewardForm] = useState({ name: '', cost: '', description: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', value: '', icon: '✨', color: 'bg-indigo-100 text-indigo-600' });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode.toString());
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    // Check if running as a PWA
    const checkStandalone = () => {
      const isWindowStandalone = (window.navigator as any).standalone;
      const isMediaStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(!!(isWindowStandalone || isMediaStandalone));
    };
    checkStandalone();
  }, []);

  const activeChild = state.children.find(c => c.id === state.activeChildId);
  const unreadCount = state.notifications.filter(n => !n.read).length;
  const pendingRequests = state.transactions.filter(t => t.status === 'PENDING');

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      title,
      message,
      timestamp: Date.now(),
      read: false,
      type
    };
    setState(prev => ({ ...prev, notifications: [newNotif, ...prev.notifications].slice(0, 50) }));
  };

  const updatePoints = (childId: string, amount: number, categoryName: string, description: string) => {
    triggerHaptic();
    const childName = state.children.find(c => c.id === childId)?.name || 'Child';
    setState(prev => {
      const updatedChildren = prev.children.map(child => {
        if (child.id === childId) {
          const catPoints = child.pointsByCategory || {};
          return {
            ...child,
            points: Math.max(0, child.points + amount),
            pointsByCategory: { ...catPoints, [categoryName]: (catPoints[categoryName] || 0) + amount }
          };
        }
        return child;
      });
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        childId,
        type: amount >= 0 ? 'EARNED' : 'REDEEMED',
        points: Math.abs(amount),
        category: categoryName,
        description,
        timestamp: Date.now(),
        status: 'APPROVED'
      };
      return { ...prev, children: updatedChildren, transactions: [newTransaction, ...prev.transactions] };
    });
    addNotification('Points Updated', `${state.activeParentName} ${amount >= 0 ? 'added' : 'removed'} ${Math.abs(amount)} pts for ${childName}`, 'POINT_EARNED');
  };

  const revertTransaction = (txId: string) => {
    const tx = state.transactions.find(t => t.id === txId);
    if (!tx || !confirm(`Revert "${tx.description}"? points will be adjusted.`)) return;
    setState(prev => {
      const targetChild = prev.children.find(c => c.id === tx.childId);
      if (!targetChild) return prev;
      const pointAdjustment = (tx.type === 'EARNED' || tx.type === 'MANUAL') ? -tx.points : tx.points;
      const updatedChildren = prev.children.map(child => child.id === tx.childId ? { ...child, points: Math.max(0, child.points + pointAdjustment) } : child);
      return { ...prev, children: updatedChildren, transactions: prev.transactions.filter(t => t.id !== txId) };
    });
    addNotification('Reverted', `Reverted "${tx.description}"`, 'COPARENT_ACTION');
  };

  const handleRedeemRequest = (reward: RewardItem) => {
    if (!activeChild || activeChild.points < reward.cost) return;
    triggerHaptic();
    const isAutoApproved = state.role === 'PARENT';
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      childId: activeChild.id,
      type: 'REDEEMED',
      points: reward.cost,
      description: `Reward: ${reward.name}`,
      timestamp: Date.now(),
      status: isAutoApproved ? 'APPROVED' : 'PENDING'
    };
    setState(prev => {
      let finalChildren = prev.children;
      if (isAutoApproved) {
        finalChildren = prev.children.map(c => c.id === activeChild.id ? { ...c, points: c.points - reward.cost } : c);
      }
      return { ...prev, children: finalChildren, transactions: [newTransaction, ...prev.transactions] };
    });
    if (!isAutoApproved) addNotification('Request Sent', `${activeChild.name} wants ${reward.name}`, 'REWARD_REQUEST');
  };

  const handleApproval = (txId: string, approved: boolean) => {
    triggerHaptic();
    setState(prev => {
      const tx = prev.transactions.find(t => t.id === txId);
      if (!tx || tx.status !== 'PENDING') return prev;
      const updatedTransactions = prev.transactions.map(t => t.id === txId ? { ...t, status: approved ? 'APPROVED' : 'REJECTED' as any } : t);
      let updatedChildren = prev.children;
      if (approved && tx.type === 'REDEEMED') {
        updatedChildren = prev.children.map(c => c.id === tx.childId ? { ...c, points: c.points - tx.points } : c);
      }
      return { ...prev, transactions: updatedTransactions, children: updatedChildren };
    });
  };

  const addCategory = (name: string, value: number, icon: string, color: string) => {
    setState(p => ({ ...p, categories: [...p.categories, { id: Date.now().toString(), name, value, icon, color }] }));
    setShowAddCategoryModal(false);
  };

  const addReward = (name: string, cost: number, description: string) => {
    setState(p => ({
      ...p,
      rewards: [...p.rewards, {
        id: Date.now().toString(),
        name,
        cost,
        description,
        image: `https://picsum.photos/seed/${Math.random()}/200/200`
      }]
    }));
    setShowAddRewardModal(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `kidpoints_backup_${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedState = JSON.parse(e.target?.result as string);
        if (importedState.children) setState(importedState);
      } catch (err) { alert('Invalid file'); }
    };
    reader.readAsText(file);
  };

  const getWeeklyEarnings = () => {
    if (!activeChild) return 0;
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return state.transactions
      .filter(t => t.childId === activeChild.id && t.type === 'EARNED' && t.timestamp > oneWeekAgo)
      .reduce((sum, t) => sum + t.points, 0);
  };

  if (view === 'AUTH' || state.children.length === 0) {
    return (
      <div className={`h-full ${darkMode ? 'bg-slate-900' : 'bg-indigo-600'} flex flex-col items-center justify-center p-8 text-white max-w-md mx-auto transition-colors duration-500`}>
        <Star size={64} className="mb-6 animate-pulse" fill="white" />
        <h1 className="text-4xl font-black mb-2 tracking-tighter">KidPoints</h1>
        <p className="text-indigo-100 text-center mb-10 opacity-90">Rewarding excellence, daily.</p>
        
        {state.children.length === 0 ? (
          <div className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-[2.5rem] p-8 shadow-2xl space-y-4">
             <h2 className="text-xl font-bold">New Family Hub</h2>
             <input id="new-child-name" type="text" placeholder="First Child's Name" className="w-full bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 outline-none" />
             <div className="grid grid-cols-4 gap-2 py-2">
                {AVATARS.map(a => (
                  <button key={a} onClick={(e) => {
                      document.querySelectorAll('.av-btn').forEach(b => b.classList.remove('bg-indigo-50', 'border-indigo-500', 'dark:bg-indigo-900'));
                      e.currentTarget.classList.add('bg-indigo-50', 'border-indigo-500', 'dark:bg-indigo-900');
                      (e.currentTarget as any).dataset.val = a;
                    }} className="av-btn text-2xl h-12 flex items-center justify-center rounded-xl border-2 border-slate-50 dark:border-slate-700 transition-all">
                    {a}
                  </button>
                ))}
             </div>
             <button onClick={() => {
                const name = (document.getElementById('new-child-name') as HTMLInputElement).value;
                const av = (document.querySelector('.av-btn[data-val]') as HTMLElement)?.dataset.val;
                if (name && av) {
                   const id = Date.now().toString();
                   setState(p => ({ ...p, children: [{ id, name, avatar: av, points: 0, pointsByCategory: {} }], activeChildId: id }));
                   setView('DASHBOARD');
                }
             }} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200">Start Journey</button>
          </div>
        ) : (
          <div className="w-full space-y-4">
             <button onClick={() => setView('DASHBOARD')} className="w-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
               <ShieldCheck size={20} /> Parent Dashboard
             </button>
             <button onClick={() => { setState(p => ({ ...p, role: 'CHILD' })); setView('DASHBOARD'); }} className="w-full bg-white/10 dark:bg-slate-800/20 text-white border border-white/20 font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
               <Users size={20} /> I'm a Kid!
             </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <MobileContainer 
      title={state.role === 'PARENT' ? `Family Hub` : `Hey ${activeChild?.name}!`} 
      showBack={view !== 'DASHBOARD'} 
      onBack={() => setView('DASHBOARD')}
      role={state.role}
      activeChild={activeChild}
      unreadCount={unreadCount}
      setShowNotifications={setShowNotifications}
      setView={setView}
      setState={setState}
      view={view}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      
      {view === 'DASHBOARD' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <Star size={120} fill="currentColor" />
               </div>
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/20 shadow-lg">{activeChild?.avatar}</div>
                    <div>
                      <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Selected Member</p>
                      <button onClick={() => setShowAddChildModal(!showAddChildModal)} className="flex items-center gap-2 text-xl font-black">{activeChild?.name} <ChevronDown size={18} /></button>
                    </div>
                 </div>
                 {state.role === 'PARENT' && (
                   <button onClick={() => { triggerHaptic(); setShowAddPointModal(true); }} className="bg-white text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all"><Plus size={24} /></button>
                 )}
               </div>
               <div className="flex items-end gap-3">
                 <span className="text-7xl font-black tracking-tighter leading-none">{activeChild?.points}</span>
                 <span className="text-sm font-black text-white/60 mb-2 uppercase tracking-widest">PTS</span>
               </div>
            </div>

            {showAddChildModal && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-4 z-40 border border-slate-100 dark:border-slate-700 animate-in zoom-in-95">
                <div className="space-y-1">
                  {state.children.map(c => (
                    <button key={c.id} onClick={() => { triggerHaptic(); setState(p => ({ ...p, activeChildId: c.id })); setShowAddChildModal(false); }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${state.activeChildId === c.id ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.avatar}</span>
                        <span className={`font-bold ${state.activeChildId === c.id ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-200'}`}>{c.name}</span>
                      </div>
                      <span className="text-sm font-black text-slate-300 dark:text-slate-500">{c.points} pts</span>
                    </button>
                  ))}
                  <button onClick={() => { triggerHaptic(); setShowAddChildModal(false); setView('MANAGE_KIDS'); }} className="w-full flex items-center gap-3 p-4 rounded-2xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-bold transition-colors">
                    <Plus size={20} /> Add Member
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-all">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">7-Day Progress</p>
                   <p className="text-lg font-black dark:text-white">+{getWeeklyEarnings()} <span className="text-slate-400 text-xs">pts this week</span></p>
                </div>
             </div>
             <Sparkles className="text-amber-400 animate-bounce" size={20} />
          </div>

          {state.role === 'PARENT' && pendingRequests.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-[2.5rem] p-6 border-2 border-amber-200/50 dark:border-amber-800/50 shadow-xl animate-in slide-in-from-right-10">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-amber-800 dark:text-amber-300 font-black flex items-center gap-2 uppercase text-[10px] tracking-widest"><AlertCircle size={14} /> Needs Review</h3>
                  <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{pendingRequests.length}</span>
               </div>
               <div className="space-y-3">
                 {pendingRequests.map(t => {
                   const child = state.children.find(c => c.id === t.childId);
                   return (
                     <div key={t.id} className="bg-white dark:bg-slate-800 rounded-3xl p-4 flex items-center justify-between shadow-sm border border-amber-200/50 dark:border-amber-800/50">
                        <div className="flex items-center gap-3">
                           <div className="text-xl w-10 h-10 bg-amber-50 dark:bg-amber-900/40 rounded-xl flex items-center justify-center">{child?.avatar}</div>
                           <div>
                             <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{t.description}</p>
                             <p className="text-amber-600 dark:text-amber-400 text-[10px] font-black mt-1 uppercase">-{t.points} PTS • {child?.name}</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => handleApproval(t.id, false)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-full transition-colors"><XCircle size={24} /></button>
                           <button onClick={() => handleApproval(t.id, true)} className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors"><CheckCircle size={24} /></button>
                        </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          )}

          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Active Quests</h2>
                {state.role === 'PARENT' && <button onClick={() => { triggerHaptic(); setView('MANAGE_CATEGORIES'); }} className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full transition-colors">Edit</button>}
             </div>
             <div className="grid grid-cols-2 gap-4">
                {state.categories.map(cat => (
                  <button key={cat.id} onClick={() => state.role === 'PARENT' && updatePoints(activeChild!.id, cat.value, cat.name, `Awarded for ${cat.name}`)}
                    className={`p-5 rounded-[2rem] flex flex-col items-start gap-3 transition-all relative overflow-hidden group shadow-sm ${cat.color} active:scale-95 hover:shadow-md`}>
                    <div className="text-3xl bg-white/40 dark:bg-slate-900/40 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform shadow-inner">{cat.icon}</div>
                    <div className="text-left">
                      <p className="font-black text-sm text-slate-900/80 dark:text-white/90 mb-0.5 leading-tight">{cat.name}</p>
                      <p className="text-[10px] font-black opacity-60 uppercase">+{cat.value} PTS</p>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>
      )}

      {view === 'STORE' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner">{activeChild?.avatar}</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personal Balance</p>
                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{activeChild?.points} <span className="text-sm">pts</span></p>
              </div>
            </div>
            {state.role === 'PARENT' && (
              <button onClick={() => { triggerHaptic(); setShowAddRewardModal(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 dark:shadow-none transition-transform active:scale-95">Add Reward</button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
             {state.rewards.map(reward => (
               <div key={reward.id} className="bg-white dark:bg-slate-800 rounded-[2rem] p-5 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-5 group relative transition-all hover:shadow-md">
                  <div className="w-24 h-24 bg-slate-50 dark:bg-slate-700 rounded-3xl overflow-hidden shrink-0 shadow-inner">
                    <img src={reward.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm">{reward.name}</h3>
                      <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded-lg">{reward.cost} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-tight">{reward.description}</p>
                    <button disabled={activeChild!.points < reward.cost} onClick={() => handleRedeemRequest(reward)}
                       className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase transition-all shadow-md ${activeChild!.points >= reward.cost ? 'bg-indigo-600 text-white active:scale-95' : 'bg-slate-50 dark:bg-slate-700 text-slate-300 dark:text-slate-500 shadow-none'}`}>
                      {activeChild!.points >= reward.cost ? 'Redeem Now' : `${reward.cost - activeChild!.points} pts left`}
                    </button>
                  </div>
                  {state.role === 'PARENT' && (
                    <button onClick={() => { triggerHaptic(); setState(p => ({ ...p, rewards: p.rewards.filter(r => r.id !== reward.id) })); }} className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-700 shadow-md border border-slate-100 dark:border-slate-600 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-90"><Trash2 size={14} /></button>
                  )}
               </div>
             ))}
          </div>
        </div>
      )}

      {view === 'HISTORY' && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight px-2">Family Timeline</h2>
          <div className="space-y-3">
             {state.transactions.filter(t => t.childId === state.activeChildId).map(t => (
               <div key={t.id} className="bg-white dark:bg-slate-800 rounded-3xl p-5 flex items-center justify-between shadow-sm border border-slate-50 dark:border-slate-700 transition-all group hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${t.type === 'EARNED' || t.type === 'MANUAL' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'}`}>
                      {t.type === 'EARNED' || t.type === 'MANUAL' ? <Star size={18} fill="currentColor" /> : <Award size={18} />}
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-800 dark:text-slate-100 text-sm tracking-tight">{t.description}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-0.5">{new Date(t.timestamp).toLocaleDateString()} • <span className={`font-black ${t.status === 'PENDING' ? 'text-amber-500' : t.status === 'REJECTED' ? 'text-rose-500' : 'text-emerald-500'}`}>{t.status}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`font-black text-xl tracking-tighter ${t.type === 'EARNED' || t.type === 'MANUAL' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {t.type === 'EARNED' || t.type === 'MANUAL' ? '+' : '-'}{t.points}
                    </div>
                    {state.role === 'PARENT' && (
                      <button onClick={() => { triggerHaptic(); revertTransaction(t.id); }} className="p-2 text-slate-200 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100"><RotateCcw size={18} /></button>
                    )}
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {view === 'FAMILY_SETTINGS' && state.role === 'PARENT' && (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
          {/* Device Context Alert */}
          {!isStandalone && (
            <div className="bg-indigo-600 text-white p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group mx-2">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                 <SmartphoneNfc size={60} />
               </div>
               <h3 className="text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Info size={16} /> iPhone Install Needed
               </h3>
               <p className="text-xs font-medium opacity-90 leading-relaxed mb-4">
                 You're running KidPoints in a browser "wrapper." To make it a real app, you need to use a direct hosting link.
               </p>
               <button onClick={() => setShowInstallGuide(true)} className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                 <Share size={12} /> Show Me How
               </button>
            </div>
          )}

          <section className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center shadow-inner border border-indigo-100 dark:border-indigo-800">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-slate-800 dark:text-white text-lg">KidPoints Premium</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-black text-xl uppercase tracking-tighter leading-none">Vagesh Vaibhav</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                 <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${isStandalone ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30'}`}>
                    {isStandalone ? 'Mode: Standalone App' : 'Mode: Browser Frame'}
                 </span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
             <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-6">Data & Backup</h3>
             <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => { triggerHaptic(); exportData(); }} className="flex items-center justify-center gap-2 p-4 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-2xl text-indigo-600 dark:text-indigo-400 transition-all group">
                      <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-widest">Backup</span>
                   </button>
                   <button onClick={() => { triggerHaptic(); fileInputRef.current?.click(); }} className="flex items-center justify-center gap-2 p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-2xl text-slate-600 dark:text-slate-400 transition-all group">
                      <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-widest">Restore</span>
                   </button>
                   <input type="file" ref={fileInputRef} onChange={importData} accept=".json" className="hidden" />
                </div>
             </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-6">Family Profiles</h3>
            <div className="space-y-3">
              {state.children.map(child => (
                <div key={child.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-3xl shadow-inner">{child.avatar}</div>
                    <div className="text-left">
                      <h4 className="font-black text-slate-800 dark:text-white tracking-tight">{child.name}</h4>
                      <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{child.points} PTS Balance</p>
                    </div>
                  </div>
                  <button onClick={() => { triggerHaptic(); if(confirm('Remove profile?')) setState(p => ({...p, children: p.children.filter(c => c.id !== child.id)})); }} className="p-3 text-slate-200 dark:text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </section>

          <div className="px-4 py-8 flex flex-col items-center gap-4">
            <button onClick={() => { triggerHaptic(); setView('AUTH'); setState(p => ({ ...p, role: 'PARENT' })); }} className="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-6 py-3 rounded-2xl transition-all"><LogOut size={16} /> Sign Out</button>
            <p className="text-[10px] text-slate-300 dark:text-slate-600 font-black uppercase tracking-widest text-center">© 2025 Vagesh Vaibhav<br/>Secure Local Storage Active</p>
          </div>
        </div>
      )}

      {/* iPhone Install Modal */}
      <Modal isOpen={showInstallGuide} onClose={() => setShowInstallGuide(false)} title="iPhone Standalone Fix">
        <div className="space-y-6 text-slate-600 dark:text-slate-300">
           <p className="text-sm">You are currently using a <strong>Development Link</strong>. To get the actual app on your phone:</p>
           <ol className="space-y-4">
              <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-black text-xs">1</div>
                 <p className="text-xs">Deploy this code to a <strong>Clean URL</strong> (like Vercel or GitHub Pages) to get a direct link.</p>
              </li>
              <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-black text-xs">2</div>
                 <p className="text-xs">Open your <strong>New Link</strong> in Safari on your iPhone.</p>
              </li>
              <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-black text-xs">3</div>
                 <p className="text-xs">Tap <Share className="inline text-indigo-600" size={14} /> and choose <strong>"Add to Home Screen"</strong>.</p>
              </li>
           </ol>
           <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Why do this?</p>
              <p className="text-[10px] leading-relaxed">The current AI Studio link is for development. A clean URL tells Safari to treat this as a <strong>Standalone Premium App</strong>, removing all browser bars.</p>
           </div>
           <button onClick={() => setShowInstallGuide(false)} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">Got it!</button>
        </div>
      </Modal>

      {/* Modals remain structurally similar but get dark mode classes */}
      <Modal isOpen={showAddRewardModal} onClose={() => setShowAddRewardModal(false)} title="New Reward">
        <div className="space-y-5">
           <input value={rewardForm.name} onChange={e => setRewardForm({...rewardForm, name: e.target.value})} type="text" placeholder="Reward Name" className="w-full bg-slate-50 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none font-bold" />
           <input value={rewardForm.cost} onChange={e => setRewardForm({...rewardForm, cost: e.target.value})} type="number" placeholder="Cost (PTS)" className="w-full bg-slate-50 dark:bg-slate-700 dark:text-indigo-400 p-4 rounded-2xl outline-none font-black text-indigo-600" />
           <button onClick={() => { if(rewardForm.name && rewardForm.cost) { triggerHaptic(); addReward(rewardForm.name, parseInt(rewardForm.cost), rewardForm.description); setRewardForm({name:'', cost:'', description:''}); } }} className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl uppercase tracking-widest text-xs">Add to Store</button>
        </div>
      </Modal>

      <Modal isOpen={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)} title="New Quest">
        <div className="space-y-5">
           <input value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} type="text" placeholder="Chore Name" className="w-full bg-slate-50 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none font-bold" />
           <input value={categoryForm.value} onChange={e => setCategoryForm({...categoryForm, value: e.target.value})} type="number" placeholder="Points Value" className="w-full bg-slate-50 dark:bg-slate-700 dark:text-indigo-400 p-4 rounded-2xl outline-none font-black text-indigo-600" />
           <button onClick={() => { if(categoryForm.name && categoryForm.value) { triggerHaptic(); addCategory(categoryForm.name, parseInt(categoryForm.value), categoryForm.icon, 'bg-indigo-50 text-indigo-600'); setCategoryForm({ name: '', value: '', icon: '✨', color: 'bg-indigo-100 text-indigo-600' }); } }} className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl uppercase tracking-widest text-xs">Create Quest</button>
        </div>
      </Modal>

      <Modal isOpen={showAddPointModal} onClose={() => setShowAddPointModal(false)} title="Quick Adjust">
        <div className="space-y-4">
          <input id="manual-pts" type="number" placeholder="Enter Points" className="w-full p-4 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-2xl outline-none font-black text-xl text-center" />
          <button onClick={() => {
              const pts = (document.getElementById('manual-pts') as HTMLInputElement).value;
              if (pts && activeChild) {
                updatePoints(activeChild.id, parseInt(pts), 'Adjustment', 'Manual entry');
                setShowAddPointModal(false);
              }
            }} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-transform active:scale-95">Apply</button>
        </div>
      </Modal>

      {showNotifications && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowNotifications(false)} />
          <div className="w-[85%] bg-white dark:bg-slate-800 h-full relative z-10 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between mt-8">
              <h2 className="text-xl font-black text-slate-800 dark:text-white">Updates</h2>
              <button onClick={() => { triggerHaptic(); setState(p => ({ ...p, notifications: p.notifications.map(n => ({...n, read: true }))})); setShowNotifications(false); }} className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">Mark read</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {state.notifications.map(n => (
                <div key={n.id} className={`p-4 rounded-2xl border transition-all ${n.read ? 'bg-white dark:bg-slate-800 border-slate-50 dark:border-slate-700' : 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800 shadow-sm'}`}>
                  <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase mb-1">{n.title}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'MANAGE_KIDS' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Add Profile</h2>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 space-y-6 text-center">
             <input id="new-k-name" type="text" placeholder="Name" className="w-full bg-slate-50 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none font-bold" />
             <div className="grid grid-cols-4 gap-3">
                 {AVATARS.map(a => (
                   <button key={a} onClick={(e) => {
                     triggerHaptic();
                     document.querySelectorAll('.k-av-btn').forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
                     e.currentTarget.classList.add('bg-indigo-600', 'text-white');
                     (e.currentTarget as any).dataset.val = a;
                   }} className="k-av-btn text-2xl h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-700 transition-all">{a}</button>
                 ))}
             </div>
             <button onClick={() => {
               const name = (document.getElementById('new-k-name') as HTMLInputElement).value;
               const av = (document.querySelector('.k-av-btn[data-val].bg-indigo-600') as HTMLElement)?.dataset.val;
               if (name && av) {
                 triggerHaptic();
                 const id = Date.now().toString();
                 setState(p => ({ ...p, children: [...p.children, { id, name, avatar: av, points: 0, pointsByCategory: {} }], activeChildId: p.activeChildId || id }));
                 setView('DASHBOARD');
               }
             }} className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl uppercase tracking-widest text-xs">Join Family</button>
          </div>
        </div>
      )}

      {view === 'MANAGE_CATEGORIES' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="bg-indigo-50/50 dark:bg-indigo-900/10 -mx-6 px-6 py-6 border-b border-indigo-100 dark:border-indigo-900">
             <h2 className="text-sm font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest mb-4">Quick Presets</h2>
             <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
               {CHORE_SUGGESTIONS.map((sug, idx) => (
                 <button key={idx} onClick={() => { triggerHaptic(); addCategory(sug.name!, sug.value!, sug.icon!, sug.color!); }}
                   className="shrink-0 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 p-4 rounded-3xl flex flex-col items-center gap-2 shadow-sm hover:scale-105 active:scale-95 transition-all min-w-[120px]">
                   <span className="text-3xl mb-1">{sug.icon}</span>
                   <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase leading-none">{sug.name}</p>
                   <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400">+{sug.value}</p>
                 </button>
               ))}
             </div>
          </div>
          <button onClick={() => { triggerHaptic(); setShowAddCategoryModal(true); }} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg">Create Custom Quest</button>
          <div className="space-y-3 pb-20">
            {state.categories.map(cat => (
              <div key={cat.id} className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <span className={`text-2xl w-14 h-14 flex items-center justify-center rounded-2xl shadow-inner ${cat.color}`}>{cat.icon}</span>
                    <div className="text-left">
                      <p className="font-black text-slate-800 dark:text-white tracking-tight">{cat.name}</p>
                      <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{cat.value} pts</p>
                    </div>
                </div>
                <button onClick={() => { triggerHaptic(); setState(p => ({ ...p, categories: p.categories.filter(c => c.id !== cat.id) })); }} className="text-slate-200 dark:text-slate-600 hover:text-rose-500 p-2"><Trash2 size={20} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </MobileContainer>
  );
};

export default App;
