export type Framework = 'Utilitarianism' | 'Deontology' | 'Virtue Ethics';

export interface School {
  id: string;
  name: string;
  philosopher: string;
  corePrinciple: string;
  desc: string;
  quote: string;
}

export const SCHOOLS: School[] = [
  {
    id: 'utilitarian',
    name: 'Utilitarianism',
    philosopher: 'Jeremy Bentham / John Stuart Mill',
    corePrinciple: 'The Greatest Good for the Greatest Number',
    desc: "Consequentialism. The morality of an action is determined solely by its outcome. If the result maximizes happiness and minimizes suffering, the action is right.",
    quote: "It is the greatest happiness of the greatest number that is the measure of right and wrong."
  },
  {
    id: 'deontology',
    name: 'Deontology',
    philosopher: 'Immanuel Kant',
    corePrinciple: 'Duty & The Categorical Imperative',
    desc: "Rules-based ethics. Certain actions are inherently right or wrong, regardless of their consequences. You must act according to rules that you would want to become universal laws.",
    quote: "Act only according to that maxim by which you can at the same time will that it should become a universal law."
  },
  {
    id: 'virtue',
    name: 'Virtue Ethics',
    philosopher: 'Aristotle',
    corePrinciple: 'Character & Eudaimonia',
    desc: "Character-based ethics. It asks not 'What should I do?' but 'What kind of person should I be?' It focuses on cultivating virtues like courage, temperance, and wisdom.",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
  }
];