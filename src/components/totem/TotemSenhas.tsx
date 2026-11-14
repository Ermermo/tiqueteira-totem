"use client";

import { useState, useTransition } from "react";
import { HeartPulse, FlaskConical, Users } from "lucide-react";
import { emitirSenhaAction } from "@/app/actions";
// "import type": só o formato, sem trazer o código (e as filas) para o navegador
import type { TipoSenha } from "@/lib/senhas";

const opcoes = [
  { tipo: "SP", titulo: "Senha prioritária", descricao: "Atendimento prioritário", tom: "bg-sp-soft text-sp", Icone: HeartPulse },
  { tipo: "SE", titulo: "Retirada de exames", descricao: "Atendimento rápido", tom: "bg-se-soft text-se", Icone: FlaskConical },
  { tipo: "SG", titulo: "Senha geral", descricao: "Atendimento geral", tom: "bg-sg-soft text-sg", Icone: Users },
] as const;

export function TotemSenhas() {
  const [numero, setNumero] = useState<string | null>(null);
  const [pendente, iniciar] = useTransition(); // true enquanto o servidor responde

  function pedirSenha(tipo: TipoSenha) {
    iniciar(async () => {
      setNumero(await emitirSenhaAction(tipo));
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {opcoes.map(({ tipo, titulo, descricao, tom, Icone }) => (
          <button
            key={tipo}
            type="button"
            onClick={() => pedirSenha(tipo)}
            disabled={pendente}
            className="flex items-center gap-4 rounded-xl border border-line bg-surface p-5 text-left transition-colors hover:border-accent hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-60"
          >
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${tom}`}>
              <Icone size={28} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block font-display text-lg font-semibold">{titulo}</span>
              <span className="block text-sm text-muted">{descricao}</span>
            </span>
          </button>
        ))}
      </div>

      <div aria-live="polite" className="rounded-xl border border-line bg-surface">
        {numero ? (
          <>
            <div className="p-6">
              <p className="text-sm text-muted">Sua senha</p>
              <p className="mt-1 font-display text-5xl font-semibold tabular-nums tracking-tight">{numero}</p>
            </div>
            <p className="border-t border-dashed border-line px-6 py-4 text-sm text-muted">Aguarde ser chamado no painel.</p>
          </>
        ) : (
          <p className="p-6 text-sm text-muted">Escolha o tipo de atendimento para retirar a senha.</p>
        )}
      </div>
    </div>
  );
}
