"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownLeft, ArrowDownRight, Clock3, Gift, ShieldCheck, TimerOff } from "lucide-react";
import { sortQuestions } from "@/data/gameContent";
import { starsForAccuracy, uniqueSkills } from "@/lib/majuscapeGame";
import { GameHud } from "@/components/game/GameHud";
import { RoundComplete } from "@/components/game/RoundComplete";
import { RuleFeedback } from "@/components/game/RuleFeedback";
import { usePlayerProgress } from "@/components/game/usePlayerProgress";

const ROUND_SIZE = 10;

export function SortGame() {
  const questions = useMemo(() => sortQuestions.slice(0, ROUND_SIZE), []);
  const [timed, setTimed] = useState(false);
  const [time, setTime] = useState(45);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [locked, setLocked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "success" | "error"; title: string; messages: string[] } | null>(null);
  const recorded = useRef(false);
  const advanceTimer = useRef<number | null>(null);
  const { recordRound } = usePlayerProgress();
  const question = questions[index];

  const finish = useCallback((finalScore: number, finalCorrect: number, finalAttempts: number) => {
    if (!recorded.current) {
      const stars = starsForAccuracy(finalCorrect, Math.max(finalAttempts, 1));
      recordRound("sort", finalScore, finalCorrect * 20, stars, uniqueSkills(questions.flatMap((item) => item.skills)));
      recorded.current = true;
    }
    setComplete(true);
  }, [questions, recordRound]);

  useEffect(() => {
    if (!timed || complete) return;
    const timer = window.setInterval(() => setTime((value) => Math.max(value - 1, 0)), 1000);
    return () => window.clearInterval(timer);
  }, [timed, complete]);

  useEffect(() => {
    if (!timed || time !== 0 || complete) return;
    const timeout = window.setTimeout(() => finish(score, correct, attempts), 0);
    return () => window.clearTimeout(timeout);
  }, [attempts, complete, correct, finish, score, time, timed]);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const answer = useCallback((capitalize: boolean) => {
    if (locked || complete) return;
    const isCorrect = capitalize === question.capitalize;
    const nextAttempts = attempts + 1;
    const nextCorrect = correct + (isCorrect ? 1 : 0);
    const nextStreak = isCorrect ? streak + 1 : 0;
    const earned = isCorrect ? 80 + Math.min(nextStreak, 5) * 10 + (question.bonus ? 100 : 0) : 0;
    const nextScore = score + earned;
    const nextMistakes = mistakes + (isCorrect ? 0 : 1);
    setLocked(true);
    setAttempts(nextAttempts);
    setCorrect(nextCorrect);
    setStreak(nextStreak);
    setScore(nextScore);
    setMistakes(nextMistakes);
    setFeedback({
      kind: isCorrect ? "success" : "error",
      title: isCorrect ? (question.bonus ? "Bonus crate sorted!" : "Correct gate!") : "Wrong gate - check the rule",
      messages: [question.explanation],
    });

    advanceTimer.current = window.setTimeout(() => {
      if (index === questions.length - 1 || nextMistakes >= 3) {
        finish(nextScore, nextCorrect, nextAttempts);
        return;
      }
      setIndex((value) => value + 1);
      setLocked(false);
      setFeedback(null);
    }, 900);
  }, [attempts, complete, correct, finish, index, locked, mistakes, question, questions.length, score, streak]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") answer(false);
      if (event.key === "ArrowRight") answer(true);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answer]);

  function restart(nextTimed = timed) {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    recorded.current = false;
    setTimed(nextTimed);
    setTime(45);
    setIndex(0);
    setScore(0);
    setStreak(0);
    setCorrect(0);
    setAttempts(0);
    setMistakes(0);
    setLocked(false);
    setComplete(false);
    setFeedback(null);
  }

  if (complete) return <div className="game-machine sort-machine"><RoundComplete title={mistakes >= 3 ? "Dock reset complete" : "Cargo cleared!"} score={score} xp={correct * 20} stars={starsForAccuracy(correct, Math.max(attempts, 1))} onRestart={() => restart()} /></div>;

  return (
    <div className="game-machine sort-machine">
      <div className="machine-topbar"><span><i className="status-light" /> SORTING DOCK 02</span><span>CRATE {index + 1}/{questions.length}</span></div>
      <div className="mode-switch" aria-label="Round mode">
        <button type="button" aria-pressed={!timed} onClick={() => restart(false)}><TimerOff aria-hidden="true" /> Practice</button>
        <button type="button" aria-pressed={timed} onClick={() => restart(true)}><Clock3 aria-hidden="true" /> Timed</button>
      </div>
      <GameHud score={score} streak={streak} progress={(index / questions.length) * 100} label="Cargo cleared" />
      <div className="sort-status-row">
        <span className={timed && time <= 10 ? "urgent" : ""}><Clock3 aria-hidden="true" /> {timed ? `${time}s` : "No timer"}</span>
        <span><ShieldCheck aria-hidden="true" /> Mistakes {mistakes}/3</span>
      </div>
      <div className="sorting-floor">
        <div className="cargo-lane" aria-hidden="true">{[0, 1, 2, 3, 4].map((roller) => <i key={roller} style={{ animationDuration: `${Math.max(.42, 1.2 - index * .08)}s` }} />)}</div>
        <article className={`word-crate ${question.bonus ? "bonus-crate" : ""}`} aria-live="polite">
          {question.bonus && <span className="bonus-label"><Gift aria-hidden="true" /> BONUS</span>}
          <small>{question.questionType === "context-sort" ? "USE THE SENTENCE" : "WORD CARGO"}</small>
          <strong>{question.term}</strong>
          <p>{question.context}</p>
        </article>
        <div className="sorting-gates">
          <button type="button" className="sort-gate lowercase-gate" onClick={() => answer(false)} disabled={locked} aria-label={`Keep ${question.term} lowercase`}>
            <ArrowDownLeft aria-hidden="true" /><span>KEEP<small>lowercase</small></span>
          </button>
          <button type="button" className="sort-gate capitalize-gate" onClick={() => answer(true)} disabled={locked} aria-label={`Capitalize ${question.term}`}>
            <span>CAPITALIZE<small>Uppercase start</small></span><ArrowDownRight aria-hidden="true" />
          </button>
        </div>
      </div>
      {feedback && <RuleFeedback {...feedback} />}
      <p className="machine-caption">Choose a sorting gate. Context decides the rule.</p>
    </div>
  );
}
