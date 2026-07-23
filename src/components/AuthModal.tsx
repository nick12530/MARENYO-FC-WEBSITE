import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Lock, MapPin, Sparkles, LogIn, UserPlus, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

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
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signup') {
      if (!name.trim() || !email.trim()) return;
      const memberNum = Math.floor(1000 + Math.random() * 9000);
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        village: village.trim() || 'Sagam, Gem',
        joinedDate: 'July 2026',
        memberId: `MFC-2026-${memberNum}`,
      };
      localStorage.setItem('marenyo_user', JSON.stringify(newUser));
      onLoginSuccess(newUser);
      setSuccessMsg('Account created successfully! Welcome to the Marenyo FC Family.');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);
    } else {
      if (!email.trim()) return;
      // Demo log in
      const existingUserStr = localStorage.getItem('marenyo_user');
      let userObj: User;
      if (existingUserStr) {
        userObj = JSON.parse(existingUserStr);
        if (email.trim().toLowerCase() !== userObj.email.toLowerCase()) {
          userObj.email = email.trim();
        }
      } else {
        const memberNum = Math.floor(1000 + Math.random() * 9000);
        userObj = {
          id: `u-${Date.now()}`,
          name: email.split('@')[0] || 'Marenyo Fan',
          email: email.trim().toLowerCase(),
          village: village || 'Sagam, Gem',
          joinedDate: 'July 2026',
          memberId: `MFC-2026-${memberNum}`,
        };
      }
      localStorage.setItem('marenyo_user', JSON.stringify(userObj));
      onLoginSuccess(userObj);
      setSuccessMsg('Logged in successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 transition-all ${
          isDarkMode
            ? 'bg-[#111111] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Brand Header */}
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

        {/* Success Banner */}
        {successMsg ? (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-center text-xs font-bold flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <>
            {/* Tab Selector */}
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

            {/* Form */}
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
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
                  <input
                    type="password"
                    required
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
                className="w-full py-3.5 rounded-2xl bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#FF6321]/20 mt-2 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{mode === 'signup' ? 'Create Account & Continue' : 'Log In & Continue'}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
