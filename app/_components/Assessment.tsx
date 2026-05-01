"use client";
import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Target, HelpCircle, AlertCircle } from 'lucide-react';

// --- THEME DICTIONARY ---
export type ThemeColor = 'indigo' | 'rose' | 'cyan' | 'amber' | 'emerald' | 'purple' | 'blue';

const THEMES: Record<ThemeColor, { text: string; bgSubtle: string; border: string; borderActive: string; bgActive: string; button: string; shadow: string }> = {
  indigo: { text: 'text-indigo-400', bgSubtle: 'bg-indigo-500/10', border: 'border-indigo-500/30', borderActive: 'border-indigo-500', bgActive: 'bg-indigo-500/20', button: 'bg-indigo-500 text-black', shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.3)]' },
  rose:   { text: 'text-rose-400', bgSubtle: 'bg-rose-500/10', border: 'border-rose-500/30', borderActive: 'border-rose-500', bgActive: 'bg-rose-500/20', button: 'bg-rose-500 text-black', shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]' },
  cyan:   { text: 'text-cyan-400', bgSubtle: 'bg-cyan-500/10', border: 'border-cyan-500/30', borderActive: 'border-cyan-500', bgActive: 'bg-cyan-500/20', button: 'bg-cyan-500 text-black', shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' },
  amber:  { text: 'text-amber-400', bgSubtle: 'bg-amber-500/10', border: 'border-amber-500/30', borderActive: 'border-amber-500', bgActive: 'bg-amber-500/20', button: 'bg-amber-500 text-black', shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' },
  emerald:{ text: 'text-emerald-400', bgSubtle: 'bg-emerald-500/10', border: 'border-emerald-500/30', borderActive: 'border-emerald-500', bgActive: 'bg-emerald-500/20', button: 'bg-emerald-500 text-black', shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
  purple: { text: 'text-purple-400', bgSubtle: 'bg-purple-500/10', border: 'border-purple-500/30', borderActive: 'border-purple-500', bgActive: 'bg-purple-500/20', button: 'bg-purple-500 text-black', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' },
  blue:   { text: 'text-blue-400', bgSubtle: 'bg-blue-500/10', border: 'border-blue-500/30', borderActive: 'border-blue-500', bgActive: 'bg-blue-500/20', button: 'bg-blue-500 text-black', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
};

// --- EXPANDED TYPE DEFINITIONS ---
export type QuestionType = 'mcq' | 'tf' | 'matching' | 'multiselect' | 'short_answer';

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

export interface MultiselectQuestion extends BaseQuestion {
  type: 'multiselect';
  options: string[];
  correctAnswers: string[]; // Requires an array of correct options
}

export interface TFQuestion extends BaseQuestion {
  type: 'tf';
  correctAnswer: boolean;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer';
  acceptableAnswers: string[]; // e.g., ["Nash Equilibrium", "nash equilibrium"]
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  leftItems: string[];
  rightItems: string[]; // These should be passed in SHUFFLED from the parent
  correctPairs: Record<string, string>;
}

export type AssessmentQuestion = MCQQuestion | MultiselectQuestion | TFQuestion | ShortAnswerQuestion | MatchingQuestion;

interface AssessmentProps {
  title: string;
  questions: AssessmentQuestion[];
  accentColor?: ThemeColor;
  onComplete?: (score: number, total: number) => void;
}

export default function Assessment({ title, questions, accentColor = 'cyan', onComplete }: AssessmentProps) {
  const theme = THEMES[accentColor];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Unified Answer State (Handles strings, booleans, and arrays for multiselect)
  const [activeAnswer, setActiveAnswer] = useState<any>(null);
  const [matchingPairs, setMatchingPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const currentQ = questions[currentIndex];

  const handleSubmit = () => {
    let correct = false;

    if (currentQ.type === 'mcq') {
      correct = activeAnswer === currentQ.correctAnswer;
    } else if (currentQ.type === 'tf') {
      correct = activeAnswer === currentQ.correctAnswer;
    } else if (currentQ.type === 'short_answer') {
      const normalizedInput = String(activeAnswer || '').trim().toLowerCase();
      correct = currentQ.acceptableAnswers.some(ans => ans.toLowerCase() === normalizedInput);
    } else if (currentQ.type === 'multiselect') {
      const userAnswers = (activeAnswer as string[]) || [];
      const required = currentQ.correctAnswers;
      correct = userAnswers.length === required.length && userAnswers.every(ans => required.includes(ans));
    } else if (currentQ.type === 'matching') {
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
      if (onComplete) onComplete(score + (isCorrect ? 1 : 0), questions.length);
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

  // --- SPECIFIC HANDLERS ---
  const toggleMultiselect = (option: string) => {
    if (isSubmitted) return;
    setActiveAnswer((prev: string[] | null) => {
      const current = prev || [];
      return current.includes(option) ? current.filter(item => item !== option) : [...current, option];
    });
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
      <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-10 mx-auto shadow-2xl text-center w-full">
        <Target className={`mx-auto mb-6 w-16 h-16 ${percentage >= 80 ? 'text-emerald-400' : 'text-amber-400'}`} />
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Module Complete</h2>
        <p className="text-slate-400 mb-8">You scored {score} out of {questions.length} ({percentage}%)</p>
        <button onClick={resetQuiz} className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all">
          <RotateCcw size={16} /> Retry Assessment
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-black/40 backdrop-blur-md border ${theme.border} rounded-3xl p-8 shadow-2xl relative overflow-hidden w-full font-sans`}>
      <div className={`absolute -top-40 -right-40 w-96 h-96 ${theme.bgSubtle} rounded-full blur-[100px] pointer-events-none`} />

      <div className="relative z-10 flex flex-col h-full min-h-[400px]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
          <span className={`text-xs font-black uppercase tracking-widest ${theme.text}`}>{title}</span>
          <span className="text-xs font-bold text-slate-500 tracking-widest">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
          {currentQ.prompt}
          {currentQ.type === 'multiselect' && <span className="block text-xs text-slate-500 uppercase tracking-widest mt-2">(Select all that apply)</span>}
        </h3>

        <div className="flex-1">
          {/* --- MCQ UI --- */}
          {currentQ.type === 'mcq' && (
            <div className="space-y-3 mb-8">
              {currentQ.options.map(opt => (
                <button
                  key={opt} disabled={isSubmitted} onClick={() => setActiveAnswer(opt)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    activeAnswer === opt ? `${theme.bgActive} ${theme.borderActive} text-white ${theme.shadow}` : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  } ${isSubmitted && opt === currentQ.correctAnswer ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' : ''}
                  ${isSubmitted && activeAnswer === opt && opt !== currentQ.correctAnswer ? 'bg-red-500/20 border-red-500 text-red-100' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* --- MULTISELECT UI --- */}
          {currentQ.type === 'multiselect' && (
            <div className="space-y-3 mb-8">
              {currentQ.options.map(opt => {
                const isSelected = (activeAnswer || []).includes(opt);
                const isCorrectSelection = isSubmitted && currentQ.correctAnswers.includes(opt);
                const isMissedSelection = isSubmitted && currentQ.correctAnswers.includes(opt) && !isSelected;
                const isWrongSelection = isSubmitted && isSelected && !currentQ.correctAnswers.includes(opt);

                return (
                  <button
                    key={opt} disabled={isSubmitted} onClick={() => toggleMultiselect(opt)}
                    className={`w-full flex items-center gap-4 text-left p-5 rounded-xl border transition-all ${
                      isSelected ? `${theme.bgActive} ${theme.borderActive} text-white` : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    } ${isSubmitted && isCorrectSelection ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' : ''}
                    ${isWrongSelection ? 'bg-red-500/20 border-red-500 text-red-100' : ''}
                    ${isMissedSelection ? 'border-dashed border-emerald-500/50 text-emerald-500/50' : ''}`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? theme.bgActive : 'border-slate-600'}`}>
                      {isSelected && <CheckCircle size={14} />}
                    </div>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* --- TRUE/FALSE UI --- */}
          {currentQ.type === 'tf' && (
            <div className="flex gap-4 mb-8">
              {[true, false].map(val => (
                <button
                  key={String(val)} disabled={isSubmitted} onClick={() => setActiveAnswer(val)}
                  className={`flex-1 p-6 rounded-xl border text-lg font-bold transition-all ${
                    activeAnswer === val ? `${theme.bgActive} ${theme.borderActive} text-white ${theme.shadow}` : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  } ${isSubmitted && val === currentQ.correctAnswer ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' : ''}
                  ${isSubmitted && activeAnswer === val && val !== currentQ.correctAnswer ? 'bg-red-500/20 border-red-500 text-red-100' : ''}`}
                >
                  {val ? 'TRUE' : 'FALSE'}
                </button>
              ))}
            </div>
          )}

          {/* --- SHORT ANSWER UI --- */}
          {currentQ.type === 'short_answer' && (
            <div className="mb-8">
              <input
                type="text"
                disabled={isSubmitted}
                value={(activeAnswer as string) || ''}
                onChange={(e) => setActiveAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className={`w-full p-5 rounded-xl border bg-black/50 text-white outline-none transition-all ${
                  isSubmitted && isCorrect ? 'border-emerald-500 focus:border-emerald-500' : 
                  isSubmitted && !isCorrect ? 'border-red-500 focus:border-red-500' : 
                  `border-white/10 focus:${theme.borderActive}`
                }`}
              />
              {isSubmitted && !isCorrect && (
                <div className="mt-3 text-xs text-emerald-400 font-mono">
                  Accepted answers included: {currentQ.acceptableAnswers.join(' OR ')}
                </div>
              )}
            </div>
          )}

          {/* --- MATCHING UI --- */}
          {currentQ.type === 'matching' && (
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
              <div className="flex-1 space-y-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">1. Select Term</span>
                {currentQ.leftItems.map(leftItem => {
                  const isMatched = Object.keys(matchingPairs).includes(leftItem);
                  const isCorrectMatch = isSubmitted && currentQ.correctPairs[leftItem] === matchingPairs[leftItem];
                  return (
                    <button
                      key={leftItem} disabled={isSubmitted || isMatched} onClick={() => handleMatchingClick('left', leftItem)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                        selectedLeft === leftItem ? `${theme.bgActive} ${theme.borderActive} text-white ${theme.shadow}` :
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
              <div className="flex-1 space-y-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">2. Assign Match</span>
                {currentQ.rightItems.map(rightItem => {
                  const isMatched = Object.values(matchingPairs).includes(rightItem);
                  const matchedLeftKey = Object.keys(matchingPairs).find(k => matchingPairs[k] === rightItem);
                  const isCorrectMatch = isSubmitted && matchedLeftKey && currentQ.correctPairs[matchedLeftKey] === rightItem;
                  return (
                    <button
                      key={rightItem} disabled={isSubmitted || !selectedLeft || isMatched} onClick={() => handleMatchingClick('right', rightItem)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                        isMatched && !isSubmitted ? 'bg-white/10 border-white/20 text-slate-400 opacity-50' :
                        isSubmitted && isCorrectMatch ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100' :
                        isSubmitted && matchedLeftKey && !isCorrectMatch ? 'bg-red-500/20 border-red-500 text-red-100' :
                        `bg-white/5 border-white/5 text-slate-300 hover:${theme.borderActive} hover:${theme.bgActive}`
                      }`}
                    >
                      {rightItem}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/5 mt-auto flex items-start justify-between min-h-[100px]">
          {!isSubmitted ? (
            <button 
              onClick={handleSubmit}
              disabled={
                (currentQ.type === 'mcq' && !activeAnswer) ||
                (currentQ.type === 'tf' && activeAnswer === null) ||
                (currentQ.type === 'short_answer' && !activeAnswer) ||
                (currentQ.type === 'multiselect' && (!activeAnswer || activeAnswer.length === 0)) ||
                (currentQ.type === 'matching' && Object.keys(matchingPairs).length !== currentQ.leftItems.length)
              }
              className={`px-8 py-4 ${theme.button} text-sm font-black uppercase tracking-widest rounded-xl transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Submit Answer
            </button>
          ) : (
            <div className="flex-1 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mt-1">{isCorrect ? <CheckCircle className="text-emerald-400 w-8 h-8" /> : <XCircle className="text-red-400 w-8 h-8" />}</div>
              <div className="flex-1">
                <h4 className={`text-lg font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect.'}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{currentQ.explanation}</p>
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