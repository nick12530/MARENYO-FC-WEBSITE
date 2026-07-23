import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Lock, MapPin, Sparkles, LogIn, UserPlus, CheckCircle2 } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { User } from '../types';
import { downloadPassCardImage } from './DigitalMembershipCard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  isDarkMode?: boolean;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isDarkMode = true,
  initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [village, setVillage] = useState('Sagam, Gem');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const persistUserLocally = (user: User, passwordHash?: string) => {
    let registeredUsers: (User & { password?: string })[] = [];
    try {
      const registeredUsersStr = localStorage.getItem('marenyo_registered_users');
      if (registeredUsersStr) {
        const parsed = JSON.parse(registeredUsersStr);
        if (Array.isArray(parsed)) registeredUsers = parsed;
      }
    } catch {
      /* ignore */
    }

    const existingIndex = registeredUsers.findIndex((u) => u.email === user.email);
    const entry = passwordHash ? { ...user, password: passwordHash } : user;
    if (existingIndex >= 0) {
      registeredUsers[existingIndex] = { ...registeredUsers[existingIndex], ...entry };
    } else {
      registeredUsers.push(entry);
    }
    localStorage.setItem('marenyo_registered_users', JSON.stringify(registeredUsers));
    localStorage.setItem('marenyo_user', JSON.stringify(user));
  };

  const addToFanRegistry = (user: User) => {
    let fanMembers: any[] = [];
    try {
      const fanMembersStr = localStorage.getItem('marenyo_fanmembers');
      if (fanMembersStr) {
        const parsed = JSON.parse(fanMembersStr);
        if (Array.isArray(parsed)) fanMembers = parsed;
      }
    } catch {
      /* ignore */
    }

    if (!fanMembers.some((m) => m.email === user.email || m.id === user.id)) {
      fanMembers.push({
        id: user.id,
        name: user.name,
        email: user.email,
        memberId: user.memberId,
        tier: 'Supporter',
        village: user.village,
        joinedDate: user.joinedDate,
        status: 'Active',
      });
      localStorage.setItem('marenyo_fanmembers', JSON.stringify(fanMembers));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (mode === 'signup') {
        if (!name.trim() || !cleanEmail || !password) {
          setIsLoading(false);
          return;
        }

        await createUserWithEmailAndPassword(auth, cleanEmail, password);

        const memberNum = Math.floor(1000 + Math.random() * 9000);
        const newUser: User = {
          id: `u-${Date.now()}`,
          name: name.trim(),
          email: cleanEmail,
          village: village.trim() || 'Sagam, Gem',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          memberId: `MFC-2026-${memberNum}`,
        };

        persistUserLocally(newUser);
        addToFanRegistry(newUser);
        onLoginSuccess(newUser);

        setSuccessMsg('Account created! Your Fan Pass is downloading now...');

        setTimeout(() => {
          downloadPassCardImage(
            newUser.name,
            'Supporter',
            newUser.memberId || `MFC-2026-${memberNum}`,
            newUser.village || 'Sagam, Gem',
            newUser.joinedDate || 'July 2026'
          );
        }, 600);

        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 2500);
      } else {
        if (!cleanEmail || !password) {
          setIsLoading(false);
          return;
        }

        const credential = await signInWithEmailAndPassword(auth, cleanEmail, password);

        let registeredUsers: User[] = [];
        try {
          const saved = localStorage.getItem('marenyo_registered_users');
          if (saved) registeredUsers = JSON.parse(saved);
        } catch {
          /* ignore */
        }

        let userObj = registeredUsers.find((u) => u.email === cleanEmail);

        if (!userObj) {
          const memberNum = Math.floor(1000 + Math.random() * 9000);
          userObj = {
            id: credential.user.uid,
            name: credential.user.displayName || cleanEmail.split('@')[0] || 'Marenyo Fan',
            email: cleanEmail,
            village: village || 'Sagam, Gem',
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            memberId: `MFC-2026-${memberNum}`,
          };
        }

        persistUserLocally(userObj);
        onLoginSuccess(userObj);
        setSuccessMsg('Logged in successfully!');
        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        setErrorMsg('An account with this email already exists. Please log in.');
        setMode('login');
      } else if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setErrorMsg('Invalid email or password. Please try again.');
      } else if (code === 'auth/weak-password') {
        setErrorMsg('Password must be at least 6 characters.');
      } else {
        setErrorMsg(err?.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 transition-all cursor-default ${
          isDarkMode
            ? 'bg-[#111111] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          id="close-auth-modal-btn"
          data-testid="close-auth-modal-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`absolute top-5 right-5 p-2.5 rounded-full transition-colors cursor-pointer z-10 ${
            isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6321] text-black font-black italic text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#FF6321]/30">
            M
          </div>
          <h3 className="text-2xl font-black italic uppercase tracking-tight">
            MARENYO <span className="text-[#FF6321]">FAN PORTAL</span>
          </h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Sign up or log in to generate and download your official Fan Pass.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        {successMsg ? (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-center text-xs font-bold flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <>
            <div
              className={`flex items-center p-1 rounded-full mb-6 border ${
                isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  mode === 'signup'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Sign Up
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  mode === 'login'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" /> Log In
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Joseph Odhiambo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FF6321] ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-500'
                }`}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. fan@marenyofc.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FF6321] ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-500'
                }`}>
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FF6321] ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    Village / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="e.g. Sagam, Gem"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FF6321] ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#FF6321]/20 mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isLoading
                    ? 'Please wait...'
                    : mode === 'signup'
                    ? 'Create Account & Download Pass'
                    : 'Log In & Continue'}
                </span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
