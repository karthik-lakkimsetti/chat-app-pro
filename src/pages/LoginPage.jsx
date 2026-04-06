import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Industry Standard: Simulate a brief loading state
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Save user data to Zustand (Global State)
      login({ 
        email, 
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=0071E3&color=fff`
      }); 
      
      navigate('/chat');
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col items-center justify-center selection:bg-[#0071E3] selection:text-white">
      
      {/* Apple-style Top Nav */}
      <nav className="w-full fixed top-0 bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50">
        <div className="max-w-[1024px] mx-auto px-6 h-12 flex items-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#0071E3]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span className="text-[12px] font-semibold tracking-widest uppercase opacity-80">ChatApp Pro</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full max-w-[440px] px-6">
        <div className="mb-10 text-center">
          <h1 className="text-[40px] sm:text-[48px] font-semibold tracking-tight text-[#1D1D1F] leading-tight">
            {isRegistering ? 'Create Account.' : 'Sign In.'} <br/>
            <span className="text-[#86868B]">
              {isRegistering ? 'Join the workspace.' : 'Stay in the loop.'}
            </span>
          </h1>
        </div>
        
        <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
          {error && (
            <div className="mb-6 p-4 rounded-[14px] bg-[#FFF2F2] border border-[#FFD1D1] text-[#E30000] text-[13px] font-medium text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Email address"
              className="w-full px-5 py-4 bg-[#F5F5F7] border-none rounded-[18px] outline-none text-[17px] focus:ring-[3px] focus:ring-[#0071E3]/20 transition-all placeholder:text-[#86868B]"
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Password"
              className="w-full px-5 py-4 bg-[#F5F5F7] border-none rounded-[18px] outline-none text-[17px] focus:ring-[3px] focus:ring-[#0071E3]/20 transition-all placeholder:text-[#86868B]"
            />
            <button 
              type="submit" 
              className="w-full mt-2 py-4 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-[17px] rounded-[18px] transition-all active:scale-[0.98] shadow-md shadow-blue-200"
            >
              {isRegistering ? 'Sign Up' : 'Continue'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              type="button" 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-[14px] font-medium text-[#0071E3] hover:underline"
            >
              {isRegistering ? 'Already have an account? Sign in.' : "Don't have an account? Create one."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}