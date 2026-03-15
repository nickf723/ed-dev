"use client";
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const LESSONS = [
    {
        id: "contrast",
        title: "Contrast & Legibility",
        concept: "Color combinations must have sufficient mathematical contrast for the human eye to easily distinguish letterforms from their background.",
        badStyle: "bg-pink-300 text-yellow-200",
        goodStyle: "bg-stone-900 text-stone-100",
        badText: "WARNING: THIS IS A VISUAL NIGHTMARE.",
        goodText: "High contrast ensures effortless reading.",
        explanation: "Yellow on pink has a contrast ratio of roughly 1.5:1. Web Accessibility Guidelines (WCAG) require at least 4.5:1 for normal text. When contrast fails, the eye strains to find the edges of the letters."
    },
    {
        id: "hierarchy",
        title: "Visual Hierarchy",
        concept: "Without clear size and weight differences, the viewer doesn't know what to read first. Everything shouts at the same volume.",
        badStyle: "flex-col items-center justify-center text-center space-y-0 text-base font-normal bg-stone-200 text-black",
        goodStyle: "flex-col items-start justify-center space-y-4 bg-stone-200 text-black p-8",
        badContent: (
            <>
                <div>annual report 2026</div>
                <div>we made a lot of money this year</div>
                <div>click here to read the full report</div>
            </>
        ),
        goodContent: (
            <>
                <div className="text-xs font-bold uppercase tracking-widest text-red-600">Annual Report 2026</div>
                <div className="text-4xl font-black leading-none">Record Breaking Revenue.</div>
                <div className="px-4 py-2 bg-black text-white text-xs font-bold uppercase cursor-pointer">Read Full Report</div>
            </>
        ),
        explanation: "By varying font weight, size, and alignment, we create a 'reading path'. The eye naturally goes to the largest, heaviest text first, then follows the structural alignment down to the action item."
    },
    {
        id: "whitespace",
        title: "Breathing Room (Padding)",
        concept: "Negative space is not empty space; it is the structural support that holds the design together.",
        badStyle: "bg-white text-black p-0 border-8 border-black flex items-center",
        goodStyle: "bg-white text-black p-12 border-8 border-black flex items-center",
        badText: "This text is claustrophobic. It is crammed directly against the structural borders, making it feel tense and amateurish.",
        goodText: "Generous padding gives the layout room to breathe, projecting confidence and making the content feel deliberate.",
        explanation: "When elements touch the edge of their container, it creates visual tension. Adding generous padding (internal whitespace) frames the content and draws the eye inward."
    },
    {
        id: "alignment",
        title: "The Ragged Edge",
        concept: "Center-aligned text forces the eye to find a new starting point for every single line, exhausting the reader.",
        badStyle: "bg-stone-800 text-stone-200 p-8 flex items-center justify-center text-center",
        goodStyle: "bg-stone-800 text-stone-200 p-8 flex items-center justify-start text-left",
        badText: "When you center align a large block of text, you create ragged edges on both the left and right sides. The human eye relies on a consistent left-hand margin to anchor itself when jumping to the next line. Without it, reading becomes a chore.",
        goodText: "Left-aligning text creates a 'hard left edge.' The eye naturally knows exactly where to snap back to after finishing a line, creating a smooth, rhythmic reading experience. Save center alignment for short titles or quotes.",
        explanation: "Western languages are read left-to-right. A strong left margin provides a predictable anchor point for the saccadic movements of the eye."
    },
    {
        id: "proximity",
        title: "Law of Proximity",
        concept: "Items that are related to each other must be placed close together. Distance implies disconnect.",
        badStyle: "bg-white text-black p-8 flex-col items-start justify-between", // justifies all the way to edges
        goodStyle: "bg-white text-black p-8 flex-col items-start justify-center gap-1", // tightly grouped
        badContent: (
            <>
                <div className="text-xs font-bold text-stone-400">First Name</div>
                <input type="text" className="border-2 border-stone-300 w-full p-2 mb-12" /> 
                <div className="text-xs font-bold text-stone-400">Last Name</div>
                <input type="text" className="border-2 border-stone-300 w-full p-2" />
            </>
        ),
        goodContent: (
            <>
                <div className="mb-6 w-full">
                    <div className="text-xs font-bold text-black mb-1">First Name</div>
                    <input type="text" className="border-2 border-black w-full p-2" />
                </div>
                <div className="w-full">
                    <div className="text-xs font-bold text-black mb-1">Last Name</div>
                    <input type="text" className="border-2 border-black w-full p-2" />
                </div>
            </>
        ),
        explanation: "In the bad example, the massive gap makes the label look disconnected from the input field. Grouping related elements together creates logical 'chunks' of information."
    }
];

export default function DesignAntiLab() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFixed, setIsFixed] = useState(false);

    const lesson = LESSONS[currentIndex];

    const nextLesson = () => {
        setIsFixed(false); // Reset the toggle
        setCurrentIndex((prev) => (prev + 1) % LESSONS.length);
    };

    const prevLesson = () => {
        setIsFixed(false);
        setCurrentIndex((prev) => (prev - 1 + LESSONS.length) % LESSONS.length);
    };

    return (
        <div className="border-4 border-black bg-stone-100 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Lab Header */}
            <div className="flex items-center justify-between border-b-4 border-black p-4 bg-white">
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-1">Interactive Diagnostic Lab</div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{lesson.title}</h3>
                </div>
                
                {/* BIG CHUNKY TOGGLE */}
                <button 
                    onClick={() => setIsFixed(!isFixed)}
                    className={`flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest border-4 border-black transition-all ${
                        isFixed 
                            ? 'bg-emerald-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-0.5 translate-x-0.5' 
                            : 'bg-red-500 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-red-400'
                    }`}
                >
                    {isFixed ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                    {isFixed ? 'Design Fixed' : 'Fix Design'}
                </button>
            </div>

            {/* The Display Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* The Canvas */}
                <div className={`h-[400px] flex transition-all duration-300 ${isFixed ? lesson.goodStyle : lesson.badStyle}`}>
                    {lesson.badContent ? (
                        <div className={`w-full h-full flex ${isFixed ? lesson.goodStyle : lesson.badStyle}`}>
                             {isFixed ? lesson.goodContent : lesson.badContent}
                        </div>
                    ) : (
                        <div className="text-2xl font-bold w-full h-full flex items-center justify-center text-center px-4">
                            {isFixed ? lesson.goodText : lesson.badText}
                        </div>
                    )}
                </div>

                {/* The Explanation */}
                <div className="p-8 border-t-4 lg:border-t-0 lg:border-l-4 border-black bg-white flex flex-col justify-between">
                    <div>
                        <div className="inline-block px-2 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                            Status: {isFixed ? 'Resolved' : 'Critical Failure'}
                        </div>
                        <p className="text-xl font-medium text-stone-800 leading-relaxed mb-6">
                            {lesson.concept}
                        </p>
                        
                        {/* Only show the deep explanation if they fixed it! */}
                        <div className={`transition-all duration-500 ${isFixed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                            <div className="p-4 bg-stone-100 border-l-4 border-emerald-500 text-sm text-stone-600 leading-relaxed">
                                <strong className="text-black block mb-1">Why this works:</strong>
                                {lesson.explanation}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mt-8 pt-4 border-t-2 border-stone-200">
                        <button onClick={prevLesson} className="p-2 hover:bg-stone-200 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <span className="text-xs font-mono font-bold text-stone-400">
                            {currentIndex + 1} / {LESSONS.length}
                        </span>
                        <button onClick={nextLesson} className="p-2 hover:bg-stone-200 transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}