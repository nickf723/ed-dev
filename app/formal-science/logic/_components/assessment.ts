import { AssessmentQuestion } from '@/app/_components/Assessment';

export const logicQuiz: AssessmentQuestion[] = [
  {
    id: 'l1',
    type: 'tf',
    prompt: 'True or False: If proposition P is False, the implication (P ⇒ Q) is ALWAYS considered True, regardless of the truth value of Q.',
    correctAnswer: true,
    explanation: 'True. This is known as a "Vacuous Truth." In formal logic, a false premise can imply anything, so the statement as a whole evaluates to True.'
  },
  {
    id: 'l2',
    type: 'matching',
    prompt: 'Match the logical connective symbol to its correct name.',
    leftItems: ['∧ (Wedge)', '∨ (Vee)', '¬ (Hook/Tilde)'],
    rightItems: ['AND (Conjunction)', 'OR (Disjunction)', 'NOT (Negation)'],
    correctPairs: {
      '∧ (Wedge)': 'AND (Conjunction)',
      '∨ (Vee)': 'OR (Disjunction)',
      '¬ (Hook/Tilde)': 'NOT (Negation)'
    },
    explanation: 'The wedge (∧) points up like an "A" for AND. The vee (∨) is for OR. The hook/tilde negates the statement.'
  },
  {
    id: 'l3',
    type: 'mcq',
    prompt: 'In First-Order Logic, what does the symbol "∀" represent?',
    options: [
      'There exists at least one...',
      'For all / For every...',
      'Therefore...',
      'It is not the case that...'
    ],
    correctAnswer: 'For all / For every...',
    explanation: 'The upside-down A (∀) is the Universal Quantifier, meaning the statement applies to "All" elements in the domain.'
  },
  {
    id: 'l4',
    type: 'multiselect',
    prompt: 'Which of the following are examples of Informal Logical Fallacies? (Select all that apply)',
    options: [
      'Ad Hominem',
      'Modus Ponens',
      'Straw Man Argument',
      'De Morgan\'s Laws',
      'Appeal to Authority'
    ],
    correctAnswers: ['Ad Hominem', 'Straw Man Argument', 'Appeal to Authority'],
    explanation: 'Modus Ponens and De Morgan\'s Laws are valid rules of formal logic. The others are informal errors in reasoning.'
  },
  {
    id: 'l5',
    type: 'short_answer',
    prompt: 'What is the specific term for a logical statement that is ALWAYS true, regardless of the inputs? (e.g., "It is raining OR it is not raining").',
    acceptableAnswers: ['Tautology', 'tautology', 'tautologies'],
    explanation: 'A tautology is a formula that evaluates to True under every possible interpretation or assignment of truth values.'
  }
];