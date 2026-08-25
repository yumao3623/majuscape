"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Check, Factory, Gauge, LockKeyhole, Map, RadioTower, Sparkles, Star, Wrench, Zap } from "lucide-react";
import { zones } from "@/data/gameContent";
import { readProgress } from "@/lib/progress";
import { splitSentence, toggleTokenCase } from "@/lib/majuscapeGame";

const demoSentence = "last monday, emma visited texas.";
const demoCorrect = "Last Monday, Emma visited Texas.";

export function HeroRepairDemo() {
  const original = splitSentence(demoSentence);
  const [tokens, setTokens] = useState(original);
  const [tested, setTested] = useState(false);
  const complete = tokens.join(" ") === demoCorrect;

  return (
    <div className="hero-machine" aria-label="Interactive capitalization repair preview">
      <div className="hero-machine-rail"><span><i /> LIVE REPAIR SIGNAL</span><span>CASE: 001</span></div>
      <p className="hero-machine-prompt"><Wrench aria-hidden="true" /> Tap the words with capitalization glitches.</p>
      <div className="hero-demo-words">
        {tokens.map((token, index) => (
          <button type="button" key={index} aria-label={`Change capitalization of ${token}`} aria-pressed={token !== original[index]} onClick={() => { setTokens((current) => current.map((item, itemIndex) => itemIndex === index ? toggleTokenCase(item) : item)); setTested(false); }} className={token !== original[index] ? "active" : ""}>{token}</button>
        ))}
      </div>
      <div className="hero-machine-floor" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="hero-demo-controls">
        <span className={tested ? (complete ? "demo-status success" : "demo-status error") : "demo-status"} aria-live="polite">
          {tested ? complete ? <><Check aria-hidden="true" /> Repair complete!</> : <><Gauge aria-hidden="true" /> Keep scanning</> : <><Sparkles aria-hidden="true" /> Capitalization scanner ready</>}
        </span>
        <button type="button" onClick={() => setTested(true)}>{complete ? "TEST REPAIR" : "SCAN WORDS"}</button>
      </div>
    </div>
  );
}

export function PlayerDock() {
  const [xp, setXp] = useState(0);
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = readProgress(window.localStorage);
      setXp(saved.xp);
      setStars(saved.stars);
      setStreak(saved.dailyStreak);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="player-dock" aria-label="Player progress">
      <div><Zap aria-hidden="true" /><span>City XP<strong>{xp}</strong></span></div>
      <div><Star aria-hidden="true" /><span>Stars<strong>{stars}</strong></span></div>
      <div><CalendarDays aria-hidden="true" /><span>Day streak<strong>{streak}</strong></span></div>
    </div>
  );
}

const gamePortals = [
  {
    id: "repair",
    number: "01",
    name: "Capitalization Repair",
    tagline: "Notice it. Flip it. Fix it.",
    description: "Tap words to repair missing capitals and remove capitals that do not belong.",
    href: "/games/capitalization-repair",
    icon: Wrench,
    className: "repair-portal",
    action: "Enter workshop",
    visual: <div className="portal-repair-visual" aria-hidden="true"><span>last</span><span>Monday</span><span>Emma</span><i /><i /></div>,
  },
  {
    id: "sort",
    number: "02",
    name: "Capitalization Sort",
    tagline: "Read the context. Pick the gate.",
    description: "Route word cargo to CAPITALIZE or KEEP LOWERCASE as the conveyor speeds up.",
    href: "/games/capitalization-sort",
    icon: Factory,
    className: "sort-portal",
    action: "Open sorting dock",
    visual: <div className="portal-sort-visual" aria-hidden="true"><b>monday</b><span>lowercase</span><span>CAPITALIZE</span></div>,
  },
  {
    id: "rush",
    number: "03",
    name: "Capitalization Rush",
    tagline: "Fix fast. Light the city.",
    description: "Repair mixed-rule sentences before the timer runs out and restore the city grid.",
    href: "/games/capitalization-rush",
    icon: RadioTower,
    className: "rush-portal",
    action: "Start emergency",
    visual: <div className="portal-rush-visual" aria-hidden="true"><span /><span /><span /><span /><i /></div>,
  },
];

export function GamePortals() {
  return (
    <div className="game-portals">
      {gamePortals.map((game) => {
        const Icon = game.icon;
        return (
          <article key={game.id} className={`game-portal ${game.className}`}>
            <div className="portal-number">ZONE {game.number}</div>
            <div className="portal-copy">
              <Icon aria-hidden="true" />
              <p>{game.tagline}</p>
              <h3>{game.name}</h3>
              <span>{game.description}</span>
              <Link href={game.href}>{game.action}<ArrowRight aria-hidden="true" /></Link>
            </div>
            <div className="portal-visual">{game.visual}</div>
          </article>
        );
      })}
    </div>
  );
}

export function CityZoneMap() {
  const [xp, setXp] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => setXp(readProgress(window.localStorage).xp), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="zone-map" role="list" aria-label="Majuscape City learning zones">
      {zones.map((zone, index) => {
        const unlocked = xp >= zone.unlockXp;
        const Icon = index === 3 ? Map : index === 6 ? Zap : Factory;
        return (
          <div key={zone.id} className={unlocked ? "zone-node unlocked" : "zone-node"} role="listitem">
            <span>{unlocked ? <Icon aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}</span>
            <div><small>ZONE {index + 1}</small><strong>{zone.name}</strong><p>{unlocked ? zone.description : `Unlock at ${zone.unlockXp} XP`}</p></div>
          </div>
        );
      })}
    </div>
  );
}
