import { VocabTerm } from '../_registry';

export const economicsVocab: VocabTerm[] = [
    {
        id: "econ-opportunity-cost",
        word: "Opportunity Cost",
        definition: "The potential benefit that is lost when you choose one alternative over another.",
        domain: "Economics",
        tags: ["Microeconomics", "Decision Making"],
        isAdult: false
    },
    {
        id: "econ-fiat",
        word: "Fiat Money",
        definition: "A government-issued currency that is not backed by a physical commodity, such as gold or silver, but rather by the government that issued it.",
        domain: "Economics",
        tags: ["Macroeconomics", "Currency"],
        relatedTerms: ["econ-inflation"],
        isAdult: false
    },
    {
        id: "econ-inflation",
        word: "Inflation",
        definition: "The rate at which the general level of prices for goods and services is rising, and subsequently, how purchasing power is falling.",
        domain: "Economics",
        tags: ["Macroeconomics", "Prices"],
        relatedTerms: ["econ-fiat"],
        isAdult: false
    },
    {
        id: "econ-elasticity",
        word: "Price Elasticity",
        definition: "A measurement of the change in consumption of a product in relation to a change in its price.",
        domain: "Economics",
        tags: ["Microeconomics", "Supply & Demand"],
        isAdult: false
    }
];