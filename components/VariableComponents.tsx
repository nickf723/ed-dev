// components/VariableComponents.tsx
"use client";
import React, { useState } from "react";
import { M } from "@/components/Math";
import {
  AppletContainer,
  ContentP,
  PracticeProblem,
} from "@/components/LessonBlocks";
import PageHeader from "@/components/PageHeader";
import { Check, ChevronRight, X as XIcon, Variable as VariableIcon, Replace, Equal } from "@/components/icons"; // Import Variable and Replace icons

/**
 * Applet for visually demonstrating substitution of a variable in an expression.
 */
export function VariableBoxApplet() {
  const [inputValue, setInputValue] = useState("4");
  const [isSubstituted, setIsSubstituted] = useState(false);
  const [result, setResult] = useState<number | string>(() =>
    2 * Number("4") + 5
  );

  const expression = "2x + 5";
  const fn = (x: number) => 2 * x + 5;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSubstituted(false);
    
    // Live calculation for preview
    const num = Number(e.target.value);
    if (!isNaN(num) && e.target.value !== '') {
        setResult(fn(num));
    } else if (e.target.value === '') {
        setResult('?');
    } else {
        setResult("Invalid");
    }
  };

  const handleSubstitute = () => {
    const num = Number(inputValue);
    if (isNaN(num) || inputValue === '') {
      setResult("Invalid");
      setIsSubstituted(false);
      return;
    }
    
    setResult(fn(num));
    setIsSubstituted(true);
  };

  const handleReset = () => {
    setInputValue("4");
    setIsSubstituted(false);
    setResult(fn(4));
  }

  const substitutedExpression = `2(${inputValue}) + 5`;
  const finalResult = String(result);

  return (
    <AppletContainer title="Variable Box Visualizer">
      <ContentP>
        Watch the variable <M>x</M> be replaced (substituted) by a number in the expression <M>{expression}</M>.
      </ContentP>
      
      <div className="flex flex-col items-center justify-center my-6 p-6 rounded-xl border border-neutral-700 bg-neutral-900/50">
        
        {/* Expression Row */}
        <div className="flex items-center space-x-2 text-3xl font-bold">
          <span className="text-neutral-100">2</span>
          
          {/* Variable Box / Substituted Value */}
          <div className="w-16 h-16 relative flex items-center justify-center transition-all duration-700 ease-out">
            <div className={`absolute inset-0 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ease-out ${
                isSubstituted ? 'bg-cyan-600/30 border-cyan-500 scale-100 rotate-0' : 'bg-amber-600/30 border-amber-500 scale-105'
            }`}>
                 {isSubstituted ? (
                     <M>{inputValue}</M>
                 ) : (
                    <VariableIcon className="w-8 h-8 text-amber-300" />
                 )}
            </div>
          </div>
          
          <span className="text-neutral-100">+ 5</span>
          <span className="text-neutral-500"><M>=</M></span>
          <span className="text-cyan-300">
            <M>{isSubstituted ? finalResult : '?'}</M>
          </span>
        </div>
        
        {/* Input/Control Row */}
        <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-sm">
          <div className="flex items-center gap-2 w-full">
            <label htmlFor="box-input" className="shrink-0 font-mono text-lg text-neutral-300">
              Set <M>x =</M>
            </label>
            <input
              id="box-input"
              type="number"
              value={inputValue}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubstitute();
                }
              }}
              className="flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              placeholder="e.g., 5"
            />
          </div>
          <div className="flex space-x-3 w-full">
            <button
              onClick={handleSubstitute}
              disabled={inputValue === '' || isNaN(Number(inputValue)) || isSubstituted}
              className="flex-1 flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Replace size={16} />
              Substitute
            </button>
            <button
              onClick={handleReset}
              className="flex-none rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 font-semibold text-neutral-300 transition-colors hover:bg-neutral-700"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Step-by-Step Visualization */}
      {isSubstituted && (
        <div className="mt-4 p-4 border border-green-800/40 bg-green-900/20 rounded-lg">
          <p className="font-semibold text-green-300 mb-2">Step-by-Step:</p>
          <ol className="list-decimal pl-5 text-neutral-300 space-y-1">
            <li>Replace <M>x</M> with <M>{inputValue}</M>: <M>{substitutedExpression}</M></li>
            <li>Calculate multiplication: <M>{`${2 * Number(inputValue)} + 5`}</M></li>
            <li>Calculate addition: <M>{finalResult}</M></li>
          </ol>
        </div>
      )}
    </AppletContainer>
  );
}

/**
 * Applet for evaluating a simple expression with one variable, 'x'.
 */
export function EvaluateApplet({
  expression,
  fn,
}: {
  expression: string;
  fn: (x: number) => number;
}) {
  const [inputValue, setInputValue] = useState("5");
  const [result, setResult] = useState<number | string>(() =>
    fn(Number("5"))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(inputValue);
    if (isNaN(num)) {
      setResult("Invalid input");
    } else {
      setResult(fn(num));
    }
  };

  return (
    <AppletContainer title="Interactive Evaluator">
      <ContentP>
        Evaluate the expression <M>{expression}</M> for any value of <M>x</M>.
      </ContentP>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col items-center gap-3 sm:flex-row"
      >
        <label htmlFor="x-input" className="flex items-center gap-2">
          <span className="font-mono text-lg text-neutral-300">
            If <M>x =</M>
          </span>
          <input
            id="x-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            placeholder="e.g., 5"
          />
        </label>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500"
        >
          <ChevronRight size={16} />
          Evaluate
        </button>
      </form>
      <div className="mt-4 rounded-lg bg-neutral-800 p-4 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Result
        </span>
        <p className="font-mono text-3xl font-bold text-cyan-300">
          <M>{String(result)}</M>
        </p>
      </div>
    </AppletContainer>
  );
}

/**
 * A simple multiple-choice quiz for the variables page.
 */
const quizQuestions = [
  {
    question: "In the expression 7y + 4, what is the variable?",
    options: ["7", "y", "4", "+"],
    correctAnswer: "y",
  },
  {
    question: "What is the value of 3x - 1 if you substitute x = 5?",
    options: ["14", "7", "15", "4"],
    correctAnswer: "14",
  },
  {
    question:
      "Which of these is an 'equation', not just an 'expression'?",
    options: ["5x", "5x - 10", "5x = 10", "10 - 5"],
    correctAnswer: "5x = 10",
  },
];

export function VariableQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const question = quizQuestions[currentQuestionIndex];

  const handleSelect = (option: string) => {
    if (isCorrect) return; // Don't allow changing answer after correct
    setSelectedAnswer(option);
  };

  const checkAnswer = () => {
    if (selectedAnswer === question.correctAnswer) {
      setFeedback("Correct!");
      setIsCorrect(true);
    } else {
      setFeedback("Not quite. Try again!");
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setSelectedAnswer(null);
    setIsCorrect(false);
    setCurrentQuestionIndex(
      (prev) => (prev + 1) % quizQuestions.length
    );
  };

  return (
    <AppletContainer title="Quick Quiz">
      <ContentP>{question.question}</ContentP>
      <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`rounded-md border p-3 text-left font-medium transition-all
              ${
                selectedAnswer === option
                  ? "border-cyan-500 bg-cyan-900/40 text-cyan-300"
                  : "border-neutral-700 bg-neutral-900/30 hover:bg-neutral-800"
              }
              ${
                isCorrect && selectedAnswer === option
                  ? "!border-green-500 !bg-green-900/40 !text-green-300"
                  : ""
              }
              ${
                !isCorrect &&
                feedback &&
                selectedAnswer === option
                  ? "!border-red-500 !bg-red-900/40 !text-red-300"
                  : ""
              }
            `}
          >
            <M>{option}</M>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={checkAnswer}
          disabled={!selectedAnswer || isCorrect}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check size={16} />
          Check Answer
        </button>
        <button
          onClick={nextQuestion}
          className="flex-1 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 font-semibold text-neutral-300 transition-colors hover:bg-neutral-700 sm:flex-none"
        >
          Next Question
        </button>
      </div>
      {feedback && (
        <p
          className={`mt-3 rounded-md p-3 text-center text-sm font-medium ${
            isCorrect
              ? "bg-green-900/50 text-green-300"
              : "bg-red-900/50 text-red-300"
          }`}
        >
          {feedback}
        </p>
      )}
    </AppletContainer>
  );
}

const compositionSteps = [
  // Note: Term is steps 2 & 3. Expression is step 4.
  { id: 1, text: "x", focus: "VARIABLE", term: "VARIABLE", color: "text-red-400", bg: "bg-red-800/20", border: "border-red-700", definition: "The unknown symbol. The starting point for all of algebra." },
  { id: 2, text: "5x", focus: "COEFFICIENT", term: "COEFFICIENT", color: "text-orange-400", bg: "bg-orange-800/20", border: "border-orange-700", definition: "The multiplier of the variable. It creates a full Term with the variable." },
  { id: 3, text: "5x^2", focus: "EXPONENT", term: "EXPONENT", color: "text-yellow-400", bg: "bg-yellow-800/20", border: "border-yellow-700", definition: "The power applied to the variable, indicating higher-order growth." },
  { id: 4, text: "5x^2 + 10", focus: "CONSTANT", term: "CONSTANT", color: "text-green-400", bg: "bg-green-800/20", border: "border-green-700", definition: "A fixed number added to the Term. The entire phrase is an Expression." },
  { id: 5, text: "5x^2 + 10 = 35", focus: "EQUATION", term: "EQUATION", color: "text-indigo-400", bg: "bg-indigo-800/20", border: "border-indigo-700", definition: "Two Expressions set equal with the '=' sign. This gives us a problem to solve!" },
];

const TermDefinitionBox = ({ isVisible, step }: { isVisible: boolean, step: number }) => {
    const isTermVisible = isVisible && (step === 2 || step === 3);
    const isExpressionVisible = isVisible && step >= 4;
    
    const isTermTerm = step === 2 ? "5x" : "5x²";
    const isExpressionTerm = "5x² + 10";

    const termDefinition = "A single unit in an expression, typically a product of a coefficient, variable, and exponent.";
    const expressionDefinition = "A mathematical phrase that combines one or more terms and constants with operations.";

    const SubBox = ({ title, definition, color, isVisible, currentPiece }: { title: string, definition: string, color: string, isVisible: boolean, currentPiece: string }) => (
        <div className={`transition-all duration-500 ease-in-out w-1/2 p-4 rounded-xl border-2 ${color} text-center overflow-hidden flex-shrink-0 ${isVisible ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
            <p className="text-xl font-bold uppercase text-white">{title}</p>
            <p className="text-sm text-neutral-300 mt-1">{definition}</p>
            {isVisible && <p className="text-xs mt-2 text-neutral-400">Example: <span className="font-mono text-lg text-white"><M>{currentPiece}</M></span></p>}
        </div>
    );

    return (
        <div className="w-full mt-6 grid grid-cols-2 gap-4 flex-shrink-0" style={{ minHeight: '10rem' }}>
            <SubBox 
                title="Term"
                definition={termDefinition}
                color="bg-orange-800/20 border-orange-700"
                isVisible={isTermVisible}
                currentPiece={isTermTerm}
            />
            <SubBox 
                title="Expression"
                definition={expressionDefinition}
                color="bg-green-800/20 border-green-700"
                isVisible={isExpressionVisible}
                currentPiece={isExpressionTerm}
            />
        </div>
    );
};

function CompositionDisplay({ step }: { step: number }) {
    // Defines what parts of the full equation are visible at each step (based on fullExpressionParts array below)
    const visibleCount = [1, 2, 3, 5, 7][step - 1]; 
    
    // Defines all parts with their semantic role and index, in order
    const fullExpressionParts = [
        { char: '5', role: 'COEFFICIENT', index: 0 },
        { char: 'x', role: 'VARIABLE', index: 1 },
        { char: '^{2}', role: 'EXPONENT', index: 2 },
        { char: '+', role: 'OPERATOR', index: 3 },
        { char: '10', role: 'CONSTANT', index: 4 },
        { char: '=', role: 'EQUALS', index: 5 },
        { char: '35', role: 'RHS_CONSTANT', index: 6 },
    ];

    return (
        <div className="flex items-center justify-center font-mono text-7xl font-extrabold h-[2.5em] transition-all duration-500 ease-out" style={{ minHeight: '1.5em' }}>
            {fullExpressionParts.map((part, index) => {
                const isVisible = index < visibleCount;
                let colorClass = 'text-neutral-500'; 

                // Set the specific highlight color for the current step's focus piece
                if (step === 1 && part.role === 'VARIABLE') colorClass = compositionSteps[0].color.replace('text-', 'text-');
                else if (step === 2 && part.role === 'COEFFICIENT') colorClass = compositionSteps[1].color.replace('text-', 'text-');
                else if (step === 3 && part.role === 'EXPONENT') colorClass = compositionSteps[2].color.replace('text-', 'text-');
                else if (step === 4 && part.role === 'CONSTANT') colorClass = compositionSteps[3].color.replace('text-', 'text-');
                else if (step === 5 && (part.role === 'EQUALS' || part.role === 'RHS_CONSTANT')) colorClass = compositionSteps[4].color.replace('text-', 'text-');

                // Mute color for non-focused but visible parts
                else if (isVisible) colorClass = 'text-neutral-300';
                
                return (
                    <span 
                          key={index} 
                          className={`transition-all duration-700 ease-out ${colorClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                          // Use index delay for sequential reveal
                          style={{ transitionDelay: `${index * 50}ms` }}> 
                        <M>{part.char}</M>
                    </span>
                );
            })}
        </div>
    );
}

export function VariableShortAnimation2() {
    const [step, setStep] = useState(1);
    const currentStep = compositionSteps[step - 1];

    const handleNext = () => setStep(prev => (prev % compositionSteps.length) + 1);

    const commonClasses = "p-6 rounded-xl border-2 transition-all duration-700 ease-in-out w-full";
    
    return (
        <div className="flex flex-col items-center p-12 bg-neutral-900 h-full w-full">
            <h1 className="text-4xl font-bold text-cyan-400 mb-10">Building Algebra: From Variable to Equation</h1>

            {/* Main Expression Animation Area */}
            <CompositionDisplay step={step} />

            {/* Vocab Box (Main Content - Dynamic) */}
            <div className={`mt-10 ${currentStep.bg} ${currentStep.border} text-center flex-shrink-0 flex flex-col justify-between w-full p-8 rounded-xl border-2`}>
                <p className="text-5xl font-extrabold uppercase text-white mb-4">{currentStep.term}</p>
                <p className="text-2xl text-neutral-300">{currentStep.definition}</p>
            </div>

            {/* Supplementary Boxes for Term and Expression */}
            <TermDefinitionBox isVisible={true} step={step} />

            {/* Navigation/Progress */}
            <div className="w-full mt-12 flex flex-col items-center flex-shrink-0">
                <div className="flex space-x-2 mb-4">
                    {compositionSteps.map((s, index) => (
                        <div key={s.id} className={`w-4 h-4 rounded-full ${s.id === step ? 'bg-cyan-400' : 'bg-neutral-600'} transition-colors`} />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-6 py-4 text-2xl font-semibold text-white transition-colors hover:bg-cyan-500 w-full"
                >
                    {step === compositionSteps.length ? 'Start Over (Step 1)' : `Next Concept: ${compositionSteps[(step % compositionSteps.length)].term}`}
                    <ChevronRight size={28} />
                </button>
            </div>
        </div>
    );
}