"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function FormValidatorLab() {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Validation Logic
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const strength = [hasLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  return (
    <div className="w-full bg-slate-900/90 border border-orange-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="text-orange-400" size={16} /> Validation Studio
        </h3>
        <div className="flex gap-1">
            {[1,2,3,4].map(i => (
                <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i <= strength ? 'bg-orange-500' : 'bg-slate-700'}`} />
            ))}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* The Input Field */}
        <div className="relative group">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">New Password</label>
            <div className="relative">
                <input 
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-orange-500 transition-colors font-mono"
                    placeholder="Type to test..."
                />
                <button 
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-white"
                >
                    {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
            </div>
        </div>

        {/* The "Under the Hood" Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ValidationRule 
                label="Min Length" 
                attr='minlength="8"' 
                active={hasLength} 
            />
            <ValidationRule 
                label="Uppercase" 
                attr='pattern="(?=.*[A-Z]).*"' 
                active={hasUpper} 
            />
            <ValidationRule 
                label="Number" 
                attr='pattern="(?=.*\d).*"' 
                active={hasNumber} 
            />
            <ValidationRule 
                label="Special Char" 
                attr='pattern="(?=.*[!@#]).*"' 
                active={hasSpecial} 
            />
        </div>

        {/* The HTML Output */}
        <div className="p-3 bg-black/50 border border-white/5 rounded-lg font-mono text-[10px] text-slate-400 leading-relaxed">
            <span className="text-orange-400">&lt;input</span> <br/>
            &nbsp;&nbsp;<span className="text-sky-400">type</span>="password"<br/>
            &nbsp;&nbsp;<span className="text-sky-400">required</span><br/>
            &nbsp;&nbsp;<span className="text-sky-400">minlength</span>="8"<br/>
            &nbsp;&nbsp;<span className="text-sky-400">pattern</span>="(?=.*\d)(?=.*[A-Z])..."<br/>
            <span className="text-orange-400">/&gt;</span>
        </div>
      </div>
    </div>
  );
}

function ValidationRule({ label, attr, active }: any) {
    return (
        <div className={`p-3 rounded border transition-all duration-300 flex items-center justify-between ${active ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-white/5'}`}>
            <div>
                <div className={`text-xs font-bold ${active ? 'text-emerald-400' : 'text-slate-400'}`}>{label}</div>
                <div className="text-[9px] font-mono text-slate-500 mt-1">{attr}</div>
            </div>
            {active ? <CheckCircle size={16} className="text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-600" />}
        </div>
    )
}