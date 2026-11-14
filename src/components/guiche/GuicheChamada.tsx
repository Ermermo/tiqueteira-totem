"use client";

import { useState, useTransition } from "react";
import { Megaphone, RotateCcw } from "lucide-react";
import { chamarProximaAction, reiniciarDiaAction, type ResultadoChamada } from "@/app/actions";
import { GUICHES } from "@/lib/config";

export function GuicheChamada() {
  const [guiche, setGuiche] = useState<number>(GUICHES[0]);
  const [resultado, setResultado] = useState<ResultadoChamada | null>(null);
  const [pendente, iniciar] = useTransition();

  function chamar() {
    iniciar(async () => {
      setResultado(await chamarProximaAction(guiche));
    });
  }

  function reiniciar() {
    iniciar(async () => {
      await reiniciarDiaAction();
      setResultado(null);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-surface p-6 border border-line">
        <p className="mb-3 text-sm text-muted">Seu guichê</p>
        <div className="flex gap-2">
          {GUICHES.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={guiche === n}
              onClick={() => setGuiche(n)}
              className={`h-11 w-11 rounded-lg text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                guiche === n ? "bg-accent text-accent-ink" : "bg-surface-2 text-ink hover:bg-line"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={chamar}
          disabled={pendente}
          className="mt-6 flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-base font-semibold text-accent-ink transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        >
          <Megaphone size={20} strokeWidth={1.5} />
          Chamar próxima senha
        </button>
      </div>

      <div aria-live="polite" className="rounded-xl bg-surface p-6 border border-line">
        {resultado === null && (
          <p className="text-sm text-muted">Escolha o guichê e chame a próxima senha.</p>
        )}
        {resultado?.situacao === "vazia" && (
          <p className="text-sm text-muted">Nenhuma senha aguardando.</p>
        )}
        {resultado?.situacao === "fechado" && (
          <p className="text-sm text-muted">Fora do horário de chamada (7h às 17h).</p>
        )}
        {resultado?.situacao === "chamada" && (
          <>
            <p className="text-sm text-muted">Senha chamada</p>
            <p className="mt-1 font-display text-5xl font-semibold tabular-nums tracking-tight text-ink">{resultado.numero}</p>
            <p className="mt-2 text-sm text-muted">
              {resultado.status === "atendida"
                ? `Atendimento no guichê ${resultado.guiche}.`
                : "O cliente não compareceu: senha descartada."}
            </p>
          </>
        )}
      </div>

      {/* Só aparece em desenvolvimento (o servidor também recusa fora dele) */}
      {process.env.NODE_ENV === "development" && (
        <button
          type="button"
          onClick={reiniciar}
          disabled={pendente}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-60"
        >
          <RotateCcw size={16} strokeWidth={1.5} />
          Reiniciar dia (teste)
        </button>
      )}
    </div>
  );
}
