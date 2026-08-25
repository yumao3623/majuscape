import { Icon } from "@/components/Icons";

const stats = [
  { key: "score", label: "Score", icon: "star" as const, color: "text-indigo-600 bg-indigo-50" },
  { key: "streak", label: "Streak", icon: "flame" as const, color: "text-amber-600 bg-amber-50" },
  { key: "best", label: "Best", icon: "trophy" as const, color: "text-emerald-600 bg-emerald-50" },
];

export function ScoreBoard({ score, streak, best }: { score: number; streak: number; best: number }) {
  const values = { score, streak, best };
  return (
    <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white" aria-label="Game statistics">
      {stats.map((stat) => (
        <div key={stat.key} className="flex items-center justify-center gap-2 px-2 py-3 sm:gap-3 sm:py-4">
          <span className={`hidden size-9 place-items-center rounded-xl sm:grid ${stat.color}`}><Icon name={stat.icon} className="size-5" /></span>
          <span>
            <span className="block text-[10px] font-extrabold uppercase tracking-[.12em] text-slate-400 sm:text-xs">{stat.label}</span>
            <span className="block text-lg font-black tabular-nums text-slate-900 sm:text-xl">{values[stat.key as keyof typeof values]}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
