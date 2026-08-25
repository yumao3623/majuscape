"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { capitalizationQuestions } from "@/data/capitalizationQuestions";
import { filterQuestions, isExactAnswer, pickNextQuestion, ROUND_LENGTH, updateRound } from "@/lib/game";
import { difficulties, getBrowserStorage, modes, readChoice, readNumber, STORAGE_KEYS, writeValue } from "@/lib/storage";
import { Icon } from "@/components/Icons";
import { DifficultySelector } from "@/components/game/DifficultySelector";
import { GameModeSelector } from "@/components/game/GameModeSelector";
import { ScoreBoard } from "@/components/game/ScoreBoard";
import type { CapitalizationQuestion, Difficulty, GameMode, RoundState, Skill } from "@/types/game";

const emptyRound: RoundState = { score: 0, streak: 0, bestStreak: 0, answered: 0, correct: 0 };

const skillLabels: Record<Skill, string> = {
  "sentence-beginnings": "Sentence Beginnings",
  "pronoun-i": "Pronoun I",
  names: "People's Names",
  days: "Days",
  months: "Months",
  cities: "Cities",
  countries: "Countries",
  languages: "Languages",
  nationalities: "Nationalities",
  holidays: "Holidays",
  titles: "Titles",
  organisations: "Organizations",
  "geographic-names": "Geographic Names",
  "historical-events": "Historical Events",
  mixed: "Mixed Rules",
};

function answerText(question: CapitalizationQuestion) {
  return question.mode === "capital" ? question.displayAnswer : question.answer;
}

export function GameShell() {
  const initialQuestion = capitalizationQuestions.find((question) => question.mode === "choose" && question.difficulty === "easy");
  const [mode, setMode] = useState<GameMode>("choose");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [skill, setSkill] = useState<Skill | "all">("all");
  const [current, setCurrent] = useState<CapitalizationQuestion | undefined>(initialQuestion);
  const [round, setRound] = useState<RoundState>(emptyRound);
  const [bestScore, setBestScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [roundComplete, setRoundComplete] = useState(false);
  const seenIds = useRef(new Set<string>());

  const pool = useMemo(() => filterQuestions(capitalizationQuestions, mode, difficulty, skill), [mode, difficulty, skill]);
  const availableSkills = useMemo(() => {
    const values = capitalizationQuestions
      .filter((question) => question.mode === mode && question.difficulty === difficulty)
      .map((question) => question.skill);
    return Array.from(new Set(values));
  }, [mode, difficulty]);

  function startRound(nextPool: CapitalizationQuestion[]) {
    seenIds.current = new Set();
    setRound(emptyRound);
    setSubmitted(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setRoundComplete(false);
    setCurrent(pickNextQuestion(nextPool, undefined, new Set()));
  }

  useEffect(() => {
    const storage = getBrowserStorage();
    const timer = window.setTimeout(() => {
      const savedMode = readChoice(storage, STORAGE_KEYS.mode, modes, "choose");
      const savedDifficulty = readChoice(storage, STORAGE_KEYS.difficulty, difficulties, "easy");
      setBestScore(readNumber(storage, STORAGE_KEYS.bestScore));
      setMode(savedMode);
      setDifficulty(savedDifficulty);
      setCurrent(pickNextQuestion(filterQuestions(capitalizationQuestions, savedMode, savedDifficulty), undefined, new Set()));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function changeMode(nextMode: GameMode) {
    setMode(nextMode);
    setSkill("all");
    writeValue(getBrowserStorage(), STORAGE_KEYS.mode, nextMode);
    startRound(filterQuestions(capitalizationQuestions, nextMode, difficulty));
  }

  function changeDifficulty(nextDifficulty: Difficulty) {
    setDifficulty(nextDifficulty);
    setSkill("all");
    writeValue(getBrowserStorage(), STORAGE_KEYS.difficulty, nextDifficulty);
    startRound(filterQuestions(capitalizationQuestions, mode, nextDifficulty));
  }

  function changeSkill(nextSkill: Skill | "all") {
    setSkill(nextSkill);
    startRound(filterQuestions(capitalizationQuestions, mode, difficulty, nextSkill));
    document.querySelector("#game")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function recordAnswer(correct: boolean, answer: string | boolean) {
    if (submitted || roundComplete) return;
    const nextRound = updateRound(round, correct);
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setSubmitted(true);
    setRound(nextRound);
    if (nextRound.score > bestScore) {
      setBestScore(nextRound.score);
      writeValue(getBrowserStorage(), STORAGE_KEYS.bestScore, nextRound.score);
    }
  }

  function nextQuestion() {
    if (!current) return;
    if (round.answered >= ROUND_LENGTH) {
      setRoundComplete(true);
      return;
    }
    seenIds.current.add(current.id);
    if (seenIds.current.size >= pool.length) seenIds.current = new Set([current.id]);
    setCurrent(pickNextQuestion(pool, current.id, seenIds.current));
    setSubmitted(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  }

  if (!current || pool.length === 0) {
    return (
      <section id="game" className="scroll-mt-4 rounded-[28px] border border-indigo-100 bg-white p-8 text-center shadow-[0_24px_70px_rgba(67,56,202,.12)]">
        <h2 className="text-xl font-black text-slate-900">No questions available for this combination yet.</h2>
        <p className="mt-2 text-slate-600">Reset the filters to keep practicing.</p>
        <button type="button" onClick={() => changeSkill("all")} className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-extrabold text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Reset Filters</button>
      </section>
    );
  }

  const progress = roundComplete ? 100 : ((round.answered + (submitted ? 0 : 1)) / ROUND_LENGTH) * 100;

  return (
    <>
      <section id="game" className="scroll-mt-4 overflow-hidden rounded-[26px] border border-indigo-100/90 bg-white shadow-[0_28px_80px_rgba(57,48,164,.14)] sm:rounded-[32px]">
        <div className="border-b border-slate-100 p-3 sm:p-5">
          <GameModeSelector value={mode} onChange={changeMode} />
        </div>

        <div className="px-4 py-5 sm:px-8 sm:py-7 lg:px-10">
          <div className="mb-5 flex flex-col items-center justify-between gap-4 sm:mb-7 sm:flex-row">
            <DifficultySelector value={difficulty} onChange={changeDifficulty} />
            <div className="w-full max-w-[210px] sm:w-44">
              <div className="mb-1.5 flex justify-between text-[11px] font-extrabold uppercase tracking-[.1em] text-slate-400">
                <span>{roundComplete ? "Round complete" : `Question ${Math.min(round.answered + (submitted ? 0 : 1), ROUND_LENGTH)} of ${ROUND_LENGTH}`}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {roundComplete ? (
            <RoundComplete round={round} bestScore={bestScore} onRestart={() => startRound(pool)} />
          ) : (
            <div className="animate-fade-in" key={current.id}>
              <Question question={current} submitted={submitted} selectedAnswer={selectedAnswer} onAnswer={recordAnswer} />
              {submitted && (
                <div className={`mt-5 flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`} role="status" aria-live="polite">
                  <div className="flex gap-3">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full text-white ${isCorrect ? "bg-emerald-500" : "bg-rose-500"}`}>
                      {isCorrect ? <Icon name="check" className="size-5" /> : <span className="text-xl font-black">×</span>}
                    </span>
                    <div>
                      <p className={`font-black ${isCorrect ? "text-emerald-900" : "text-rose-900"}`}>{isCorrect ? "Correct! Great job!" : "Not quite — keep going!"}</p>
                      {!isCorrect && <p className="mt-1 text-sm font-medium text-slate-700">The correct answer is: <strong>{answerText(current)}</strong></p>}
                    </div>
                  </div>
                  <button type="button" onClick={nextQuestion} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-indigo-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    {round.answered >= ROUND_LENGTH ? "See results" : "Next question"} <Icon name="arrow" className="size-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 sm:mt-8">
            <ScoreBoard score={round.score} streak={round.streak} best={bestScore} />
          </div>
        </div>
      </section>

      <section className="mt-7 text-center" aria-labelledby="skills-heading">
        <p id="skills-heading" className="text-xs font-black uppercase tracking-[.16em] text-indigo-500">Practice by skill</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => changeSkill("all")} aria-pressed={skill === "all"} className={`skill-chip ${skill === "all" ? "skill-chip-active" : ""}`}>All skills</button>
          {availableSkills.map((item) => (
            <button key={item} type="button" onClick={() => changeSkill(item)} aria-pressed={skill === item} className={`skill-chip ${skill === item ? "skill-chip-active" : ""}`}>{skillLabels[item]}</button>
          ))}
        </div>
      </section>
    </>
  );
}

function Question({ question, submitted, selectedAnswer, onAnswer }: { question: CapitalizationQuestion; submitted: boolean; selectedAnswer: string | boolean | null; onAnswer: (correct: boolean, answer: string | boolean) => void }) {
  if (question.mode === "choose") {
    return (
      <div>
        <p className="game-eyebrow">Choose one answer</p>
        <h2 className="game-question">{question.prompt}</h2>
        <div className="mt-5 grid gap-3 sm:mt-7">
          {question.options.map((option, index) => {
            const isAnswer = option === question.answer;
            const isSelected = selectedAnswer === option;
            const state = submitted && isAnswer ? "option-correct" : submitted && isSelected ? "option-wrong" : "";
            return (
              <button key={option} type="button" disabled={submitted} onClick={() => onAnswer(isAnswer, option)} className={`answer-option ${state}`}>
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="flex-1">{option}</span>
                {submitted && isAnswer && <Icon name="check" className="size-5 text-emerald-600" />}
                {submitted && isSelected && !isAnswer && <span className="text-xl font-black text-rose-600">×</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.mode === "fix") {
    return <FixQuestion question={question} submitted={submitted} onAnswer={onAnswer} />;
  }

  return (
    <div className="text-center">
      <p className="game-eyebrow">Think about the rule</p>
      <h2 className="game-question mx-auto max-w-xl">Should this word or phrase start with a capital letter?</h2>
      <div className="mx-auto mt-5 max-w-lg rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-6 text-3xl font-black tracking-tight text-indigo-950 sm:mt-7 sm:py-8 sm:text-4xl">{question.prompt}</div>
      <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-3 sm:mt-6">
        {[true, false].map((answer) => {
          const selected = selectedAnswer === answer;
          const correct = answer === question.answer;
          const state = submitted && correct ? "binary-correct" : submitted && selected ? "binary-wrong" : "";
          return <button key={String(answer)} type="button" disabled={submitted} onClick={() => onAnswer(correct, answer)} className={`binary-option ${state}`}>{answer ? "YES" : "NO"}{submitted && correct && <Icon name="check" className="size-5" />}</button>;
        })}
      </div>
    </div>
  );
}

function FixQuestion({ question, submitted, onAnswer }: { question: Extract<CapitalizationQuestion, { mode: "fix" }>; submitted: boolean; onAnswer: (correct: boolean, answer: string) => void }) {
  const [value, setValue] = useState(question.prompt);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submitted) onAnswer(isExactAnswer(value, question.answer), value);
  }

  return (
    <form onSubmit={submit}>
      <p className="game-eyebrow">Edit the capitalization</p>
      <h2 className="game-question">Fix the sentence.</h2>
      <label htmlFor={`answer-${question.id}`} className="mt-5 block text-sm font-extrabold text-slate-700 sm:mt-7">Your corrected sentence</label>
      <input
        id={`answer-${question.id}`}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === "NumpadEnter") && !event.nativeEvent.isComposing) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        disabled={submitted}
        autoComplete="off"
        className="mt-2 min-h-16 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-4 text-lg font-bold leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-indigo-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:opacity-80 sm:px-5 sm:text-xl"
      />
      <button type="submit" disabled={submitted || !value.trim()} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-extrabold text-white shadow-[0_7px_18px_rgba(79,70,229,.22)] transition hover:bg-indigo-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
        <Icon name="check" className="size-5" /> Check answer
      </button>
      <p className="mt-2 text-xs font-medium text-slate-400">Tip: press Enter or use the button to submit.</p>
    </form>
  );
}

function RoundComplete({ round, bestScore, onRestart }: { round: RoundState; bestScore: number; onRestart: () => void }) {
  const accuracy = Math.round((round.correct / Math.max(round.answered, 1)) * 100);
  return (
    <div className="py-3 text-center sm:py-6">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-100 text-amber-600"><Icon name="trophy" className="size-8" /></span>
      <p className="mt-4 text-xs font-black uppercase tracking-[.18em] text-indigo-500">Round complete</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Nice work!</h2>
      <p className="mx-auto mt-2 max-w-md text-slate-600">Every round helps the rules feel more natural. Ready for another ten?</p>
      <div className="mx-auto mt-6 grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
        <ResultStat label="Score" value={round.score} />
        <ResultStat label="Accuracy" value={`${accuracy}%`} />
        <ResultStat label="Best streak" value={round.bestStreak} />
      </div>
      {round.score === bestScore && round.score > 0 && <p className="mt-4 text-sm font-extrabold text-emerald-700">🏆 You matched your best score!</p>}
      <button type="button" onClick={onRestart} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 font-extrabold text-white shadow-[0_7px_18px_rgba(79,70,229,.22)] transition hover:bg-indigo-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        <Icon name="rotate" className="size-5" /> Play again
      </button>
    </div>
  );
}

function ResultStat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-4"><span className="block text-xs font-bold text-slate-500">{label}</span><span className="mt-1 block text-2xl font-black text-slate-950">{value}</span></div>;
}
