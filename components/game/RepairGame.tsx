"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, RotateCcw, Sparkles, Wrench } from "lucide-react";
import { repairQuestions } from "@/data/gameContent";
import { changedTokenIndexes, isSentenceCorrect, splitSentence, starsForAccuracy, toggleTokenCase, uniqueSkills } from "@/lib/majuscapeGame";
import { GameHud } from "@/components/game/GameHud";
import { RoundComplete } from "@/components/game/RoundComplete";
import { RuleFeedback } from "@/components/game/RuleFeedback";
import { usePlayerProgress } from "@/components/game/usePlayerProgress";

const ROUND_SIZE = 6;

export function RepairGame() {
  const questions = useMemo(() => repairQuestions.slice(0, ROUND_SIZE), []);
  const [index, setIndex] = useState(0);
  const [tokens, setTokens] = useState(() => splitSentence(questions[0].sentence));
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ kind: "success" | "error"; title: string; messages: string[] } | null>(null);
  const [locked, setLocked] = useState(false);
  const [complete, setComplete] = useState(false);
  const recorded = useRef(false);
  const { recordRound } = usePlayerProgress();
  const question = questions[index];

  function toggle(indexToChange: number) {
    if (locked) return;
    setTokens((current) => current.map((token, tokenIndex) => tokenIndex === indexToChange ? toggleTokenCase(token) : token));
    setFeedback(null);
  }

  function testRepair() {
    if (locked) return;
    setAttempts((value) => value + 1);
    if (isSentenceCorrect(question, tokens)) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setCorrect((value) => value + 1);
      setScore((value) => value + 100 + Math.min(nextStreak - 1, 4) * 20);
      setLocked(true);
      setFeedback({ kind: "success", title: nextStreak >= 3 ? `Perfect repair! Combo x${nextStreak}` : "Nice repair!", messages: ["Every capitalization glitch in this sentence is fixed."] });
      return;
    }

    const wrong = changedTokenIndexes(question, tokens);
    const explanations = wrong.map((tokenIndex) => question.changes.find((change) => change.index === tokenIndex)?.explanation ?? `Check the capitalization of "${tokens[tokenIndex]}".`);
    setStreak(0);
    setFeedback({ kind: "error", title: "The scanner found a glitch", messages: explanations.slice(0, 2) });
  }

  function next() {
    if (index === questions.length - 1) {
      const finalScore = score;
      const finalXp = correct * 25;
      const stars = starsForAccuracy(correct, Math.max(attempts, questions.length));
      if (!recorded.current) {
        recordRound("repair", finalScore, finalXp, stars, uniqueSkills(questions.flatMap((item) => item.skills)));
        recorded.current = true;
      }
      setComplete(true);
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setTokens(splitSentence(questions[nextIndex].sentence));
    setFeedback(null);
    setLocked(false);
  }

  function restart() {
    recorded.current = false;
    setIndex(0);
    setTokens(splitSentence(questions[0].sentence));
    setScore(0);
    setStreak(0);
    setCorrect(0);
    setAttempts(0);
    setFeedback(null);
    setLocked(false);
    setComplete(false);
  }

  if (complete) return <div className="game-machine repair-machine"><RoundComplete title="Workshop online!" score={score} xp={correct * 25} stars={starsForAccuracy(correct, Math.max(attempts, questions.length))} onRestart={restart} /></div>;

  const changed = splitSentence(question.sentence);
  return (
    <div className="game-machine repair-machine">
      <div className="machine-topbar"><span><i className="status-light" /> REPAIR BAY 01</span><span>ORDER {index + 1}/{questions.length}</span></div>
      <GameHud score={score} streak={streak} progress={(index / questions.length) * 100} />
      <div className="repair-workbench">
        <div className="pipe pipe-left" aria-hidden="true" /><div className="pipe pipe-right" aria-hidden="true" />
        <div className="screen-label"><Sparkles aria-hidden="true" /> TAP WORDS TO SWITCH THEIR FIRST LETTER</div>
        <div className="word-track" aria-label="Sentence repair controls">
          {tokens.map((token, tokenIndex) => (
            <button
              type="button"
              key={`${question.id}-${tokenIndex}`}
              className={`word-tile ${token !== changed[tokenIndex] ? "word-tile-changed" : ""} ${locked ? "word-tile-correct" : ""}`}
              onClick={() => toggle(tokenIndex)}
              disabled={locked}
              aria-label={`Change capitalization of ${token}`}
              aria-pressed={token !== changed[tokenIndex]}
            >{token}</button>
          ))}
        </div>
        <div className="conveyor" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      </div>
      {feedback && <RuleFeedback {...feedback} />}
      <div className="machine-controls">
        <button type="button" className="game-button game-button-quiet" onClick={() => { setTokens(splitSentence(question.sentence)); setFeedback(null); }} disabled={locked}><RotateCcw aria-hidden="true" /> Reset</button>
        {!locked
          ? <button type="button" className="game-button game-button-primary" onClick={testRepair}><Wrench aria-hidden="true" /> Test repair</button>
          : <button type="button" className="game-button game-button-primary" onClick={next}>{index === questions.length - 1 ? "Finish round" : "Next repair"}<ArrowRight aria-hidden="true" /></button>}
      </div>
    </div>
  );
}
