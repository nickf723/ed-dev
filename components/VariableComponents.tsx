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

/**
 * Component for a 60-second explainer short on Variables & Expressions.
 * Uses hardcoded structure and colors for narrative clarity.
 */
export function VariableShortAnimation() {
  const commonClasses = "p-4 rounded-xl border-2 transition-all duration-700 ease-in-out";

  const TermBox = ({ title, definition, colorClass }: { title: string, definition: string, colorClass: string }) => (
    <div className={`mt-4 ${commonClasses} ${colorClass} text-left`}>
      <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
      <p className="text-sm text-neutral-300">{definition}</p>
    </div>
  );
  
  // Custom Expression part to highlight different roles
  const ExpressionDisplay = ({ highlight }: { highlight?: 'VARIABLE' | 'COEFFICIENT' | 'CONSTANT' | 'EXPRESSION' | 'EQUATION' }) => {
      const colorMap = {
          VARIABLE: 'text-yellow-400 bg-yellow-900/50 border-yellow-700',
          COEFFICIENT: 'text-orange-400 bg-orange-900/50 border-orange-700',
          CONSTANT: 'text-cyan-400 bg-cyan-900/50 border-cyan-700',
          EXPRESSION: 'text-pink-400 bg-pink-900/50 border-pink-700',
          EQUATION: 'text-red-400 bg-red-900/50 border-red-700',
      };
      
      const defaultText = 'text-neutral-400';
      const defaultBg = 'bg-transparent border-transparent';

      const getClass = (role: 'VARIABLE' | 'COEFFICIENT' | 'CONSTANT' | 'EXPRESSION' | 'EQUATION') => {
          if (highlight === role) {
              return colorMap[role];
          }
          if (highlight === 'EXPRESSION' && (role === 'VARIABLE' || role === 'COEFFICIENT' || role === 'CONSTANT')) {
              return 'text-pink-400/80 ' + defaultBg;
          }
          if (highlight === 'EQUATION') {
              return 'text-red-400/80 ' + defaultBg;
          }
          return defaultText + ' ' + defaultBg;
      };

      const HighlightBox = ({ role, children }: { role: 'VARIABLE' | 'COEFFICIENT' | 'CONSTANT', children: React.ReactNode }) => (
          <span className={`inline-block rounded-lg px-2 border ${getClass(role)}`}>
              {children}
          </span>
      );

      const ExpressionInner = () => (
          <span className={`transition-all duration-700 ease-in-out ${highlight === 'EXPRESSION' ? colorMap['EXPRESSION'] + ' p-2 rounded-lg border' : ''}`}>
              <HighlightBox role="COEFFICIENT">{highlight === 'COEFFICIENT' ? '3' : '3'}</HighlightBox>
              <HighlightBox role="VARIABLE">{highlight === 'VARIABLE' ? 'x' : 'x'}</HighlightBox>
              <span className="mx-1 text-neutral-400">+</span>
              <HighlightBox role="CONSTANT">{highlight === 'CONSTANT' ? '5' : '5'}</HighlightBox>
          </span>
      );

      return (
        <div className="flex items-center justify-center space-x-2 text-6xl font-extrabold my-8">
            <span className={`transition-all duration-700 ease-in-out ${highlight === 'EQUATION' ? colorMap['EQUATION'] + ' p-4 rounded-xl border' : ''}`}>
              <ExpressionInner />
              <span className="text-neutral-400 mx-3"><Equal size={48} /></span>
              <span className="text-neutral-300">17</span>
            </span>
        </div>
      );
  };

  const StepComponent = ({ title, content, term, definition, color, highlight, stepNumber }: { title: string, content: React.ReactNode, term: string, definition: string, color: string, highlight: 'VARIABLE' | 'COEFFICIENT' | 'CONSTANT' | 'EXPRESSION' | 'EQUATION', stepNumber: number }) => (
    <div className="mb-12 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm shadow-xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="bg-cyan-600 rounded-full w-8 h-8 flex items-center justify-center text-white text-lg">{stepNumber}</span>
            {title}
        </h2>
        {content}
        <ExpressionDisplay highlight={highlight} />
        <TermBox 
            title={term}
            definition={definition}
            colorClass={color}
        />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
        <PageHeader 
            eyebrow="60-Second Short"
            title="Algebra: The Language of Equations"
            subtitle="A visual breakdown of the key components: Variables, Coefficients, Constants, Expressions, and Equations."
        />
        
        <div className="mt-8 space-y-12">
            
            <StepComponent
                stepNumber={1}
                title="The Whole Picture: Equation"
                content={<p className="text-lg text-neutral-300">
                    An **Equation** uses an equals sign to state that two sides have the same value. This entire statement is what we aim to solve.
                </p>}
                term="Equation"
                definition="A mathematical statement that sets two expressions equal to each other (e.g., 3x + 5 = 17)."
                color="bg-red-800/20 border-red-700"
                highlight="EQUATION"
            />

            <StepComponent
                stepNumber={2}
                title="The Phrase: Expression"
                content={<p className="text-lg text-neutral-300">
                    An **Expression** is a mathematical phrase made of numbers and symbols. It is a part of the equation, without the equals sign.
                </p>}
                term="Expression"
                definition="A mathematical phrase combining numbers, variables, and operations, *without* an equals sign (e.g., 3x + 5)."
                color="bg-pink-800/20 border-pink-700"
                highlight="EXPRESSION"
            />
            
            <StepComponent
                stepNumber={3}
                title="The Unknown: Variable"
                content={<p className="text-lg text-neutral-300">
                    The **Variable** ('x') is the symbol representing the unknown value. Think of it as a question mark waiting for an answer.
                </p>}
                term="Variable"
                definition="A symbol (like x) that represents an unknown or changing quantity."
                color="bg-yellow-800/20 border-yellow-700"
                highlight="VARIABLE"
            />

            <StepComponent
                stepNumber={4}
                title="The Multiplier: Coefficient"
                content={<p className="text-lg text-neutral-300">
                    The **Coefficient** ('3') is the fixed number that tells you how many variables you have.
                </p>}
                term="Coefficient"
                definition="The fixed number that is multiplied by the variable in an algebraic term (e.g., the '3' in 3x)."
                color="bg-orange-800/20 border-orange-700"
                highlight="COEFFICIENT"
            />

            <StepComponent
                stepNumber={5}
                title="The Fixed Value: Constant"
                content={<p className="text-lg text-neutral-300">
                    The **Constant** ('5') is a fixed number that stands alone and never changes its value.
                </p>}
                term="Constant"
                definition="A numerical value that is fixed and does not change (e.g., 5, -10, π)."
                color="bg-cyan-800/20 border-cyan-700"
                highlight="CONSTANT"
            />
            
        </div>
        <div className="w-full h-20 text-center text-xl text-neutral-300 pt-10 border-t border-neutral-800">
            <p>Master these concepts to unlock **all** of algebra! 🚀</p>
        </div>
    </div>
  );
}