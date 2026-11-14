import type { ReactNode } from "react";

// Cada tom casa uma cor forte (ícone) com a versão suave (fundo do ícone)
const tons = {
  sp: "bg-sp-soft text-sp",
  se: "bg-se-soft text-se",
  sg: "bg-sg-soft text-sg",
  ok: "bg-ok-soft text-ok",
  accent: "bg-accent-soft text-accent",
};

type CardProps = { titulo: string; valor: string | number; icone: ReactNode; tom: keyof typeof tons };

export function Card({ titulo, valor, icone, tom }: CardProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface p-5">
      <div>
        <p className="font-display text-3xl font-semibold leading-none tabular-nums">{valor}</p>
        <p className="mt-2 text-sm text-muted">{titulo}</p>
      </div>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${tons[tom]}`}>{icone}</span>
    </div>
  );
}
