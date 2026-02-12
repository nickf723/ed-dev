export const RECURSION_MEDIA = {
  hero: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1600", // Fractal/Geometric
  droste: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Droste_effect_with_clock.jpg", // Droste Effect example
};

export const RECURSION_VOCAB = [
  {
    term: 'Base Case',
    def: 'The stopping condition. Without this, the recursion continues forever (Infinite Loop) until the program crashes.',
    code: 'if (n === 0) return;'
  },
  {
    term: 'Recursive Step',
    def: 'The part of the function where it calls itself with a modified (usually smaller) input.',
    code: 'return n * factorial(n - 1);'
  },
  {
    term: 'Call Stack',
    def: 'The memory structure that tracks active subroutines. Recursion pushes new layers onto the stack until the base case is reached.',
    code: 'Stack Overflow'
  },
  {
    term: 'Memoization',
    def: 'Optimization technique. Storing the results of expensive function calls so you don\'t have to recalculate them (e.g., caching Fibonacci numbers).',
    code: 'cache[n] = result;'
  }
];

export const FIBONACCI_SEQ = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];