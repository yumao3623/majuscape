import { Icon } from "@/components/Icons";
import type { GameMode } from "@/types/game";

const modes: { id: GameMode; label: string; shortLabel: string; icon: "check" | "pencil" | "case" }[] = [
  { id: "choose", label: "Choose the Correct Sentence", shortLabel: "Choose", icon: "check" },
  { id: "fix", label: "Fix the Sentence", shortLabel: "Fix", icon: "pencil" },
  { id: "capital", label: "Capital or Not?", shortLabel: "Capital?", icon: "case" },
];

export function GameModeSelector({ value, onChange }: { value: GameMode; onChange: (mode: GameMode) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-indigo-50/90 p-1.5" role="tablist" aria-label="Game mode">
      {modes.map((mode) => (
        <button key={mode.id} type="button" role="tab" aria-selected={value === mode.id} onClick={() => onChange(mode.id)} className={`flex min-h-14 items-center justify-center gap-2 rounded-xl px-2 text-xs font-extrabold leading-tight transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:min-h-16 sm:px-4 sm:text-sm ${value === mode.id ? "bg-white text-indigo-700 shadow-[0_3px_12px_rgba(67,56,202,.12)] ring-1 ring-indigo-100" : "text-slate-500 hover:bg-white/60 hover:text-slate-800"}`}>
          <Icon name={mode.icon} className="hidden size-5 shrink-0 sm:block" />
          <span className="sm:hidden">{mode.shortLabel}</span>
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
