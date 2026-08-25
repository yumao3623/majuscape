"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BatteryCharging, Clock3, RotateCcw, Zap } from "lucide-react";
import { rushQuestions } from "@/data/gameContent";
import { changedTokenIndexes, isSentenceCorrect, splitSentence, starsForAccuracy, toggleTokenCase, uniqueSkills } from "@/lib/majuscapeGame";
import { GameHud } from "@/components/game/GameHud";
import { RoundComplete } from "@/components/game/RoundComplete";
import { RuleFeedback } from "@/components/game/RuleFeedback";
import { usePlayerProgress } from "@/components/game/usePlayerProgress";

const ROUND_SIZE = 7;
const QUESTION_TIME = 14;

export function RushGame() {
  const questions = useMemo(() => rushQuestions.slice(0, ROUND_SIZE), []);
  const [index, setIndex] = useState(0);
  const [tokens, setTokens] = useState(() => splitSentence(questions[0].sentence));
  const [time, setTime] = useState(QUESTION_TIME);
  const [energy, setEnergy] = useState(4);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "success" | "error"; title: string; messages: string[] } | null>(null);
  const recorded = useRef(false);
  const { recordRound } = usePlayerProgress();
  const question = questions[index];

  const finish = useCallback((finalScore: number, finalCorrect: number, finalAttempts: number) => {
    if (!recorded.current) {
      const stars = starsForAccuracy(finalCorrect, Math.max(finalAttempts, 1));
      recordRound("rush", finalScore, finalCorrect * 30, stars, uniqueSkills(questions.flatMap((item) => item.skills)));
      recorded.current = true;
    }
    setComplete(true);
  }, [questions, recordRound]);

  const advance = useCallback((nextScore: number, nextCorrect: number, nextAttempts: number, nextEnergy: number) => {
    if (index === questions.length - 1 || nextEnergy <= 0) {
      finish(nextScore, nextCorrect, nextAttempts);
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setTokens(splitSentence(questions[nextIndex].sentence));
    setTime(Math.max(8, QUESTION_TIME - Math.floor(nextIndex / 2)));
    setLocked(false);
    setFeedback(null);
  }, [finish, index, questions]);

  const submit = useCallback((timedOut = false) => {
    if (locked || complete) return;
    const isCorrect = !timedOut && isSentenceCorrect(question, tokens);
    const nextAttempts = attempts + 1;
    const nextCorrect = correct + (isCorrect ? 1 : 0);
    const nextStreak = isCorrect ? streak + 1 : 0;
    const nextEnergy = Math.max(0, Math.min(4, energy + (isCorrect && nextStreak % 3 === 0 ? 1 : 0) - (isCorrect ? 0 : 1)));
    const earned = isCorrect ? 120 + time * 8 + Math.min(nextStreak, 5) * 30 : 0;
    const nextScore = score + earned;
    setLocked(true);
    setAttempts(nextAttempts);
    setCorrect(nextCorrect);
    setStreak(nextStreak);
    setEnergy(nextEnergy);
    setScore(nextScore);

    if (isCorrect) {
      setFeedback({ kind: "success", title: nextStreak >= 3 ? `City power restored! Combo x${nextStreak}` : "Grid section online!", messages: [`Fast repair: +${earned} points.`] });
    } else {
      const wrong = changedTokenIndexes(question, tokens);
      const messages = timedOut
        ? ["Time ran out. Scan the rule before the next emergency."]
        : wrong.map((tokenIndex) => question.changes.find((change) => change.index === tokenIndex)?.explanation ?? `Check "${tokens[tokenIndex]}".`).slice(0, 2);
      setFeedback({ kind: "error", title: timedOut ? "Power surge missed" : "The grid still has a glitch", messages });
    }
  }, [attempts, complete, correct, energy, locked, question, score, streak, time, tokens]);

  useEffect(() => {
    if (locked || complete) return;
    const timer = window.setInterval(() => setTime((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [complete, locked, index]);

  useEffect(() => {
    if (time !== 0 || locked || complete) return;
    const timeout = window.setTimeout(() => submit(true), 0);
    return () => window.clearTimeout(timeout);
  }, [complete, locked, submit, time]);

  function restart() {
    recorded.current = false;
    setIndex(0);
    setTokens(splitSentence(questions[0].sentence));
    setTime(QUESTION_TIME);
    setEnergy(4);
    setScore(0);
    setStreak(0);
    setCorrect(0);
    setAttempts(0);
    setLocked(false);
    setComplete(false);
    setFeedback(null);
  }

  if (complete) return <div className="game-machine rush-machine"><RoundComplete title={energy <= 0 ? "Core stabilized" : "City fully charged!"} score={score} xp={correct * 30} stars={starsForAccuracy(correct, Math.max(attempts, 1))} onRestart={restart} /></div>;

  const original = splitSentence(question.sentence);
  return (
    <div className="game-machine rush-machine">
      <div className="machine-topbar"><span><i className="status-light" /> EMERGENCY GRID</span><span>LEVEL {index + 1}</span></div>
      <GameHud score={score} streak={streak} progress={(index / questions.length) * 100} label="City power" energy={energy} />
      <div className="rush-timer" role="timer" aria-label={`${time} seconds remaining`}><Clock3 aria-hidden="true" /><span style={{ width: `${(time / QUESTION_TIME) * 100}%` }} /><strong>{time}s</strong></div>
      <div className="city-grid" aria-label="City power display">
        {[0, 1, 2, 3, 4, 5].map((building) => <span key={building} className={building < index ? "powered" : ""}>{[0, 1, 2, 3].map((window) => <i key={window} />)}</span>)}
        <div className="power-line" />
      </div>
      <div className="rush-console">
        <p><Zap aria-hidden="true" /> TAP EVERY WORD THAT NEEDS A CASE CHANGE</p>
        <div className="rush-words">
          {tokens.map((token, tokenIndex) => (
            <button type="button" key={`${question.id}-${tokenIndex}`} className={token !== original[tokenIndex] ? "selected" : ""} disabled={locked} aria-pressed={token !== original[tokenIndex]} aria-label={`Change capitalization of ${token}`} onClick={() => setTokens((current) => current.map((item, itemIndex) => itemIndex === tokenIndex ? toggleTokenCase(item) : item))}>{token}</button>
          ))}
        </div>
      </div>
      {feedback && <RuleFeedback {...feedback} />}
      <div className="machine-controls">
        {!locked && <button type="button" className="game-button game-button-quiet" onClick={() => setTokens(splitSentence(question.sentence))}><RotateCcw aria-hidden="true" /> Clear</button>}
        {!locked
          ? <button type="button" className="game-button game-button-primary rush-submit" onClick={() => submit(false)}><BatteryCharging aria-hidden="true" /> Restore power</button>
          : <button type="button" className="game-button game-button-primary rush-submit" onClick={() => advance(score, correct, attempts, energy)}>{index === questions.length - 1 || energy <= 0 ? "See results" : "Next emergency"}<ArrowRight aria-hidden="true" /></button>}
      </div>
    </div>
  );
}
