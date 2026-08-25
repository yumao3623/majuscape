import { Flame, Gauge, Star, Zap } from "lucide-react";

export function GameHud({ score, streak, progress, label = "Repair meter", energy }: { score: number; streak: number; progress: number; label?: string; energy?: number }) {
  return (
    <div className="game-hud" aria-label="Game status">
      <div className="hud-stat"><Star aria-hidden="true" /><span><small>Score</small><strong>{score}</strong></span></div>
      <div className="hud-stat"><Flame aria-hidden="true" /><span><small>Combo</small><strong>x{Math.max(streak, 1)}</strong></span></div>
      {typeof energy === "number" && <div className="hud-stat"><Zap aria-hidden="true" /><span><small>Energy</small><strong>{energy}/4</strong></span></div>}
      <div className="hud-meter-wrap">
        <span><Gauge aria-hidden="true" /> {label}</span>
        <div className="hud-meter" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <i style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }} />
        </div>
      </div>
    </div>
  );
}
