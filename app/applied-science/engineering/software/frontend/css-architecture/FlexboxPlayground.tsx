"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, AlignCenter, AlignLeft, AlignRight, Columns } from 'lucide-react';

export default function FlexboxPlayground() {
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('center');
  const [direction, setDirection] = useState('row');

  return (
    <div className="w-full bg-slate-900/90 border border-pink-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT: CONTROLS */}
      <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-white/5 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="text-pink-400" size={18} />
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Flex Engine</h3>
        </div>

        <div className="space-y-4">
            <ControlGroup label="justify-content (Main Axis)">
                <Btn active={justify === 'flex-start'} onClick={() => setJustify('flex-start')} label="Start" />
                <Btn active={justify === 'center'} onClick={() => setJustify('center')} label="Center" />
                <Btn active={justify === 'space-between'} onClick={() => setJustify('space-between')} label="Space" />
            </ControlGroup>

            <ControlGroup label="align-items (Cross Axis)">
                <Btn active={align === 'flex-start'} onClick={() => setAlign('flex-start')} label="Start" />
                <Btn active={align === 'center'} onClick={() => setAlign('center')} label="Center" />
                <Btn active={align === 'flex-end'} onClick={() => setAlign('flex-end')} label="End" />
            </ControlGroup>

            <ControlGroup label="flex-direction">
                <Btn active={direction === 'row'} onClick={() => setDirection('row')} label="Row" />
                <Btn active={direction === 'column'} onClick={() => setDirection('column')} label="Column" />
            </ControlGroup>
        </div>

        {/* CSS Output */}
        <div className="p-3 bg-black/50 rounded-lg font-mono text-[10px] text-slate-400">
            <span className="text-pink-400">.container</span> {'{'} <br/>
            &nbsp;&nbsp;<span className="text-sky-400">display</span>: flex;<br/>
            &nbsp;&nbsp;<span className="text-sky-400">flex-direction</span>: {direction};<br/>
            &nbsp;&nbsp;<span className="text-sky-400">justify-content</span>: {justify};<br/>
            &nbsp;&nbsp;<span className="text-sky-400">align-items</span>: {align};<br/>
            {'}'}
        </div>
      </div>

      {/* RIGHT: VISUALIZER */}
      <div className="w-full md:w-2/3 p-8 bg-[url('/grid-pattern.svg')] bg-slate-950 flex items-center justify-center relative">
        <div 
            className="w-full h-64 border-2 border-dashed border-white/10 rounded-xl relative transition-all duration-500 bg-slate-900/50 flex"
            style={{ 
                justifyContent: justify, 
                alignItems: align,
                flexDirection: direction as any
            }}
        >
            <Box color="bg-pink-500" label="1" />
            <Box color="bg-purple-500" label="2" />
            <Box color="bg-indigo-500" label="3" />
            
            {/* Axis Helper Lines */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-slate-600 uppercase pointer-events-none">
                {direction === 'row' ? 'Main Axis ➝' : 'Cross Axis ➝'}
            </div>
            <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-600 uppercase pointer-events-none origin-bottom-left -rotate-90 translate-x-2">
                {direction === 'row' ? 'Cross Axis ➝' : 'Main Axis ➝'}
            </div>
        </div>
      </div>
    </div>
  );
}

function ControlGroup({ label, children }: any) {
    return (
        <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">{label}</div>
            <div className="flex gap-1 p-1 bg-slate-800 rounded-lg">{children}</div>
        </div>
    )
}

function Btn({ active, onClick, label }: any) {
    return (
        <button 
            onClick={onClick}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-all ${active ? 'bg-pink-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
            {label}
        </button>
    )
}

function Box({ color, label }: any) {
    return (
        <motion.div 
            layout
            className={`${color} w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold shadow-lg border border-white/20 m-2`}
        >
            {label}
        </motion.div>
    )
}