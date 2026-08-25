import Link from "next/link";
import { ArrowRight, RotateCcw, Star, Trophy } from "lucide-react";

export function RoundComplete({ title, score, xp, stars, onRestart }: { title: string; score: number; xp: number; stars: number; onRestart: () => void }) {
  return (
    <div className="round-complete">
      <div className="completion-badge"><Trophy aria-hidden="true" /></div>
      <p className="machine-kicker">Zone restored</p>
      <h2>{title}</h2>
      <div className="completion-stars" aria-label={`${stars} stars earned`}>
        {[1, 2, 3].map((item) => <Star key={item} aria-hidden="true" className={item <= stars ? "earned" : ""} />)}
      </div>
      <div className="completion-readout"><span>Score <strong>{score}</strong></span><span>XP earned <strong>+{xp}</strong></span></div>
      <div className="completion-actions">
        <button type="button" className="game-button game-button-primary" onClick={onRestart}><RotateCcw aria-hidden="true" /> Play again</button>
        <Link className="game-button game-button-secondary" href="/#games">Choose a game <ArrowRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
