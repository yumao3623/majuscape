import type { CapitalizationSkill, SentenceChallenge } from "@/types/majuscape";

export function splitSentence(sentence: string) {
  return sentence.split(" ");
}

export function toggleTokenCase(token: string) {
  const index = token.search(/[A-Za-z]/);
  if (index === -1) return token;
  const character = token[index];
  const toggled = character === character.toUpperCase() ? character.toLowerCase() : character.toUpperCase();
  return `${token.slice(0, index)}${toggled}${token.slice(index + 1)}`;
}

export function changedTokenIndexes(question: SentenceChallenge, tokens: string[]) {
  const correct = splitSentence(question.correctedSentence);
  return tokens.reduce<number[]>((indexes, token, index) => {
    if (token !== correct[index]) indexes.push(index);
    return indexes;
  }, []);
}

export function isSentenceCorrect(question: SentenceChallenge, tokens: string[]) {
  return tokens.join(" ") === question.correctedSentence;
}

export function starsForAccuracy(correct: number, total: number) {
  const accuracy = correct / Math.max(total, 1);
  if (accuracy === 1) return 3;
  if (accuracy >= 0.75) return 2;
  return 1;
}

export function uniqueSkills(skills: CapitalizationSkill[]) {
  return Array.from(new Set(skills));
}
