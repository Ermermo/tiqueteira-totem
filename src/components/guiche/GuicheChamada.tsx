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
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="mb-3 text-sm text-[#a3a7c8]">Seu guichê</p>
        <div className="flex gap-2">
          {GUICHES.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={guiche === n}
              onClick={() => setGuiche(n)}
              className={`h-11 w-11 rounded-lg text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 ${
                guiche === n ? "bg-indigo-500 text-white" : "bg-slate-50 text-[#5b5f8d] hover:bg-slate-100"
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
          className="mt-6 flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:opacity-60"
        >
          <Megaphone size={20} strokeWidth={1.5} />
          Chamar próxima senha
        </button>
      </div>

      <div aria-live="polite" className="rounded-lg bg-white p-6 shadow-sm">
        {resultado === null && (
          <p className="text-sm text-[#a3a7c8]">Escolha o guichê e chame a próxima senha.</p>
        )}
        {resultado?.situacao === "vazia" && (
          <p className="text-sm text-[#a3a7c8]">Nenhuma senha aguardando.</p>
        )}
        {resultado?.situacao === "fechado" && (
          <p className="text-sm text-[#a3a7c8]">Fora do horário de chamada (7h às 17h).</p>
        )}
        {resultado?.situacao === "chamada" && (
          <>
            <p className="text-sm text-[#a3a7c8]">Senha chamada</p>
            <p className="mt-1 text-4xl font-semibold tabular-nums text-[#5b5f8d]">{resultado.numero}</p>
            <p className="mt-2 text-sm text-[#a3a7c8]">
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
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#a3a7c8] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-indigo-400 disabled:opacity-60"
        >
          <RotateCcw size={16} strokeWidth={1.5} />
          Reiniciar dia (teste)
        </button>
      )}
    </div>
  );
}
