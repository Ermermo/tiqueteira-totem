"use client";

import { useState, useTransition } from "react";
import { Power } from "lucide-react";
import { encerrarExpedienteAction } from "@/app/actions";

export function EncerrarExpediente() {
  const [confirmando, setConfirmando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [pendente, iniciar] = useTransition();

  function encerrar() {
    iniciar(async () => {
      const descartadas = await encerrarExpedienteAction();
      setConfirmando(false);
      setMensagem(
        descartadas === 0
          ? "Nenhuma senha aguardando."
          : `${descartadas} ${descartadas === 1 ? "senha descartada" : "senhas descartadas"}.`,
      );
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {confirmando ? (
        <>
          <span className="text-sm">Descartar as senhas que ainda aguardam?</span>
          <button
            type="button"
            onClick={encerrar}
            disabled={pendente}
            className="rounded-lg border border-bad bg-bad-soft px-4 py-2 text-sm font-semibold text-bad transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bad disabled:opacity-60"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={() => setConfirmando(false)}
            disabled={pendente}
            className="rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent"
          >
            Cancelar
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => {
            setMensagem(null);
            setConfirmando(true);
          }}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Power size={16} strokeWidth={1.5} />
          Encerrar expediente
        </button>
      )}
      <span aria-live="polite" className="text-sm text-muted">{mensagem}</span>
    </div>
  );
}
