"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';

// --- ROBUST TYPE DEFINITIONS ---
export type QuestionType = 'mcq' | 'tf' | 'matching';

export interface BaseQuestion {
  id: string;
  prompt: string;
  type: QuestionType;
  explanation: string;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctAnswer: string;
}

export interface TFQuestion extends BaseQuestion {
  type: 'tf';
  correctAnswer: boolean;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  leftItems: string[];
  rightItems: string[]; // These should be passed in SHUFFLED
  correctPairs: Record<string, string>; // { "Left Item": "Right Item" }
}

export type AssessmentQuestion = MCQQuestion | TFQuestion | MatchingQuestion;

interface AssessmentProps {
  title: string;
  questions: AssessmentQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export default function Assessment({ title, questions, onComplete }: AssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Active Answer States
  const [activeAnswer, setActiveAnswer] = useState<string | boolean | null>(null);
  
  // Matching Specific State
  const [matchingPairs, setMatchingPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const currentQ = questions[currentIndex];

  const handleSubmit = () => {
    let correct = false;

    if (currentQ.type === 'mcq') {
      correct = activeAnswer === currentQ.correctAnswer;
    } else if (currentQ.type === 'tf') {
      correct = activeAnswer === currentQ.correctAnswer;
    } else if (currentQ.type === 'matching') {
      // Check if every pair in the user's matching dict matches the correct dict
      const requiredKeys = Object.keys(currentQ.correctPairs);
      const userKeys = Object.keys(matchingPairs);
      
      if (requiredKeys.length === userKeys.length) {
        correct = requiredKeys.every(k => currentQ.correctPairs[k] === matchingPairs[k]);
      }
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setIsSubmitted(false);
      setActiveAnswer(null);
      setMatchingPairs({});
      setSelectedLeft(null);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete(score + (isCorrect ? 0 : 0), questions.length); // Fire callback if provided
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setIsSubmitted(false);
    setActiveAnswer(null);
    setMatchingPairs({});
  };

  const handleMatchingClick = (side: 'left' | 'right', item: string) => {
    if (isSubmitted) return;
    
    if (side === 'left') {
      setSelectedLeft(item === selectedLeft ? null : item);
    } else if (side === 'right' && selectedLeft) {
      setMatchingPairs(prev => ({ ...prev, [selectedLeft]: item }));
      setSelectedLeft(null);
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-10 max-w-2xl mx-auto shadow-2xl text-center">
        <HelpCircle className={`mx-auto mb-6 w-16 h-16 ${percentage >= 80 ? 'text-emerald-400' : 'text-amber-400'}`} />
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Assessment Complete</h2>
        <p className="text-slate-400 mb-8">You scored {score} out of {questions.length} ({percentage}%)</p>
        
        <button 
          onClick={resetQuiz}
          className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all"
        >
          <RotateCcw size={16} /> Retry Lesson
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">{title}</span>
          <span className="text-xs font-bold text-slate-500 tracking-widest">
            QUESTION {currentIndex + 1} OF {questions.length}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
          {currentQ.prompt}
        </h3>

        {/* --- MULTIPLE CHOICE UI --- */}
        {currentQ.type === 'mcq' && (
          <div className="space-y-3 mb-8">
            {currentQ.options.map(opt => (
              <button
                key={opt}
                disabled={isSubmitted}
                onClick={() => setActiveAnswer(opt)}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  activeAnswer === opt 
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                } ${isSubmitted && opt === currentQ.correctAnswer ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' : ''}
                ${isSubmitted && activeAnswer === opt && opt !== currentQ.correctAnswer ? 'bg-red-500/20 border-red-500 text-red-100' : ''}
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* --- TRUE/FALSE UI --- */}
        {currentQ.type === 'tf' && (
          <div className="flex gap-4 mb-8">
            {[true, false].map(val => (
              <button
                key={String(val)}
                disabled={isSubmitted}
                onClick={() => setActiveAnswer(val)}
                className={`flex-1 p-6 rounded-xl border text-lg font-bold transition-all ${
                  activeAnswer === val 
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                } ${isSubmitted && val === currentQ.correctAnswer ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' : ''}
                ${isSubmitted && activeAnswer === val && val !== currentQ.correctAnswer ? 'bg-red-500/20 border-red-500 text-red-100' : ''}
                `}
              >
                {val ? 'TRUE' : 'FALSE'}
              </button>
            ))}
          </div>
        )}

        {/* --- MATCHING UI --- */}
        {currentQ.type === 'matching' && (
          <div className="flex gap-8 mb-8">
            {/* Left Column (Terms) */}
            <div className="flex-1 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">1. Select Term</span>
              {currentQ.leftItems.map(leftItem => {
                const isMatched = Object.keys(matchingPairs).includes(leftItem);
                const matchVal = matchingPairs[leftItem];
                const isCorrectMatch = isSubmitted && currentQ.correctPairs[leftItem] === matchVal;
                
                return (
                  <button
                    key={leftItem}
                    disabled={isSubmitted || isMatched}
                    onClick={() => handleMatchingClick('left', leftItem)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                      selectedLeft === leftItem ? 'bg-amber-500/20 border-amber-500 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.3)]' :
                      isMatched && !isSubmitted ? 'bg-white/10 border-white/20 text-slate-400 opacity-50' :
                      isSubmitted && isCorrectMatch ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' :
                      isSubmitted && !isCorrectMatch ? 'bg-red-500/20 border-red-500 text-red-100' :
                      'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {leftItem}
                  </button>
                )
              })}
            </div>

            {/* Right Column (Definitions) */}
            <div className="flex-1 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">2. Assign Match</span>
              {currentQ.rightItems.map(rightItem => {
                const isMatched = Object.values(matchingPairs).includes(rightItem);
                // Find the left item that matched with this right item to check correctness
                const matchedLeftKey = Object.keys(matchingPairs).find(k => matchingPairs[k] === rightItem);
                const isCorrectMatch = isSubmitted && matchedLeftKey && currentQ.correctPairs[matchedLeftKey] === rightItem;

                return (
                  <button
                    key={rightItem}
                    disabled={isSubmitted || !selectedLeft || isMatched}
                    onClick={() => handleMatchingClick('right', rightItem)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                      isMatched && !isSubmitted ? 'bg-white/10 border-white/20 text-slate-400 opacity-50' :
                      isSubmitted && isCorrectMatch ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' :
                      isSubmitted && matchedLeftKey && !isCorrectMatch ? 'bg-red-500/20 border-red-500 text-red-100' :
                      'bg-white/5 border-white/5 text-slate-300 hover:border-amber-500/50 hover:bg-amber-500/10'
                    }`}
                  >
                    {rightItem}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Submit & Feedback Area */}
        <div className="pt-6 border-t border-white/5 flex items-start justify-between min-h-[100px]">
          {!isSubmitted ? (
            <button 
              onClick={handleSubmit}
              disabled={
                (currentQ.type !== 'matching' && activeAnswer === null) || 
                (currentQ.type === 'matching' && Object.keys(matchingPairs).length !== currentQ.leftItems.length)
              }
              className="px-8 py-4 bg-cyan-500 text-black text-sm font-black uppercase tracking-widest rounded-xl transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <div className="flex-1 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mt-1">
                {isCorrect ? (
                  <CheckCircle className="text-emerald-400 w-8 h-8" />
                ) : (
                  <XCircle className="text-red-400 w-8 h-8" />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect.'}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {currentQ.explanation}
                </p>
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                >
                  {currentIndex + 1 === questions.length ? 'View Results' : 'Next Question'} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}