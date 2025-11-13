// components/VariableComponents.tsx
"use client";
import React, { useState } from "react";
import { M } from "@/components/Math";
import {
  AppletContainer,
  ContentP,
  PracticeProblem,
} from "@/components/LessonBlocks";
import { Check, ChevronRight, X as XIcon } from "@/components/icons";

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