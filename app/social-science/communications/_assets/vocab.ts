export interface VocabTerm {
  id: string;
  term: string;
  def: string;
  example: string;
  category: 'Model' | 'Concept' | 'Fallacy';
}

export const VOCAB: VocabTerm[] = [
  {
    id: 'encoding',
    term: 'Encoding',
    def: 'The process of turning thoughts into communication. The sender packs the message into symbols (words, gestures) that the receiver can understand.',
    example: 'Thinking "I am hungry" and saying the word "Pizza".',
    category: 'Concept'
  },
  {
    id: 'decoding',
    term: 'Decoding',
    def: 'The process of interpreting the message. The receiver translates the symbols back into thoughts.',
    example: 'Hearing "Pizza" and visualizing a slice of pepperoni.',
    category: 'Concept'
  },
  {
    id: 'noise',
    term: 'Noise',
    def: 'Anything that interferes with the transmission or interpretation of the message. Can be physical (loud sounds) or psychological (bias).',
    example: 'Misunderstanding a text because you are angry (Psychological Noise).',
    category: 'Concept'
  },
  {
    id: 'feedback',
    term: 'Feedback Loop',
    def: 'The response sent back to the sender, confirming whether the message was understood or requiring clarification.',
    example: 'Nodding your head while listening to a story.',
    category: 'Model'
  }
];