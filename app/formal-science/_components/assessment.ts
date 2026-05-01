// app/_data/assessments/formal-science.ts
import { AssessmentQuestion } from '@/app/_components/Assessment';

export const formalScienceQuiz: AssessmentQuestion[] = [
  { 
    id: 'fs1', 
    type: 'mcq', 
    prompt: 'Which logic gate outputs a 1 ONLY when both of its inputs are 1?', 
    options: ['OR Gate', 'XOR Gate', 'AND Gate', 'NOT Gate'], 
    correctAnswer: 'AND Gate', 
    explanation: 'An AND gate requires all conditions to be true (1) before it outputs a true (1).' 
  },
  { 
    id: 'fs2', 
    type: 'matching', 
    prompt: 'Match the Formal Science domain to its primary focus.', 
    leftItems: ['Logic', 'Computer Science', 'Information Science'], 
    rightItems: ['Storage, Flow & Retrieval', 'Reasoning & Inference', 'Computation & Automation'], 
    correctPairs: { 
        'Logic': 'Reasoning & Inference', 
        'Computer Science': 'Computation & Automation', 
        'Information Science': 'Storage, Flow & Retrieval' 
    }, 
    explanation: 'Logic deals with valid arguments. Computer Science builds the automation. Information Science focuses on how the data itself is categorized and retrieved.' 
  },
  { 
    id: 'fs3', 
    type: 'tf', 
    prompt: 'True or False: The Formal Sciences rely heavily on empirical observation and physical experiments (like chemistry or biology) to prove their theories.', 
    correctAnswer: false, 
    explanation: 'False. Formal sciences (Math, Logic, CS) are axiomatic. They rely on deductive reasoning from a set of base rules (axioms), not physical experiments.' 
  },
  
  // --- NEW MULTISELECT QUESTION ---
  {
    id: 'fs4',
    type: 'multiselect',
    prompt: 'Select ALL the fields below that are strictly classified as "Formal Sciences".',
    options: [
        'Theoretical Computer Science', 
        'Organic Chemistry', 
        'Systems Science', 
        'Sociology', 
        'Pure Mathematics'
    ],
    correctAnswers: [
        'Theoretical Computer Science', 
        'Systems Science', 
        'Pure Mathematics'
    ],
    explanation: 'Formal sciences study rule-based, logical disciplines. Chemistry and Sociology are Natural and Social sciences, respectively, because they rely on empirical real-world observation rather than pure deductive logic.'
  },

  // --- NEW SHORT ANSWER QUESTION ---
  {
    id: 'fs5',
    type: 'short_answer',
    prompt: 'What is the specific 5-letter term for a starting assumption or premise that is accepted as true without proof?',
    acceptableAnswers: ['Axiom', 'axiom', 'axioms', 'Axioms'],
    explanation: 'An Axiom is the bedrock of formal logic and mathematics. Because you cannot prove everything, you must start with a few self-evident axioms and logically deduce everything else from them.'
  }
];