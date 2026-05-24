import { AssessmentQuestion } from '@/app/_components/Assessment';

export const integersQuiz: AssessmentQuestion[] = [
  {
    id: 'int1',
    type: 'mcq',
    prompt: 'What happens when you subtract a negative number? (e.g., 5 - (-3))',
    options: ['The numbers cancel out to zero', 'It becomes addition', ' The result is always negative', 'You multiply the numbers instead'],
    correctAnswer: 'It becomes addition',
    explanation: 'Subtracting a negative is like taking away a debt. It has a positive effect, turning into addition (5 + 3 = 8).'
  },
  {
    id: 'int2',
    type: 'tf',
    prompt: 'True or False: The absolute value of -15 is smaller than the absolute value of 10.',
    correctAnswer: false,
    explanation: 'False. The absolute value is the distance from zero. |-15| is 15, and |10| is 10. Since 15 > 10, the absolute value of -15 is greater.'
  },
  {
    id: 'int3',
    type: 'mcq',
    prompt: 'If you multiply a negative integer by a negative integer, the result will always be:',
    options: ['Positive', 'Negative', 'Zero', 'Fractions'],
    correctAnswer: 'Positive',
    explanation: 'A negative times a negative always yields a positive result. Think of it as "the opposite of an opposite is the original."'
  }
];
