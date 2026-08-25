import type { Difficulty } from "@/types/game";

const options: Difficulty[] = ["easy", "medium", "hard"];

export function DifficultySelector({ value, onChange }: { value: Difficulty; onChange: (difficulty: Difficulty) => void }) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1" aria-label="Difficulty">
      {options.map((difficulty) => (
        <button key={difficulty} type="button" aria-pressed={value === difficulty} onClick={() => onChange(difficulty)} className={`min-h-11 rounded-lg px-4 text-xs font-extrabold capitalize transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:px-6 sm:text-sm ${value === difficulty ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-800"}`}>
          {difficulty}
        </button>
      ))}
    </div>
  );
}
