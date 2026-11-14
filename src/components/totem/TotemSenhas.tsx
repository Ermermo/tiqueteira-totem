"use client";

import { useState, useTransition } from "react";
import { HeartPulse, FlaskConical, Users } from "lucide-react";
import { emitirSenhaAction } from "@/app/actions";
// "import type": só o formato, sem trazer o código (e as filas) para o navegador
import type { TipoSenha } from "@/lib/senhas";

const opcoes = [
  { tipo: "SP", titulo: "Senha prioritária", descricao: "Atendimento prioritário", cor: "text-rose-300", Icone: HeartPulse },
  { tipo: "SE", titulo: "Retirada de exames", descricao: "Atendimento rápido", cor: "text-amber-300", Icone: FlaskConical },
  { tipo: "SG", titulo: "Senha geral", descricao: "Atendimento geral", cor: "text-sky-300", Icone: Users },
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
        {opcoes.map(({ tipo, titulo, descricao, cor, Icone }) => (
          <button
            key={tipo}
            type="button"
            onClick={() => pedirSenha(tipo)}
            disabled={pendente}
            className="flex flex-col items-start gap-6 rounded-lg bg-white p-6 text-left shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-indigo-400 disabled:opacity-60"
          >
            <span className={cor}>
              <Icone size={48} strokeWidth={1.25} />
            </span>
            <span>
              <span className="block text-lg font-semibold text-[#5b5f8d]">{titulo}</span>
              <span className="block text-sm text-[#a3a7c8]">{descricao}</span>
            </span>
          </button>
        ))}
      </div>

      <div aria-live="polite" className="rounded-lg bg-white p-6 shadow-sm">
        {numero ? (
          <>
            <p className="text-sm text-[#a3a7c8]">Sua senha</p>
            <p className="mt-1 text-4xl font-semibold tabular-nums text-[#5b5f8d]">{numero}</p>
            <p className="mt-2 text-sm text-[#a3a7c8]">Aguarde ser chamado no painel.</p>
          </>
        ) : (
          <p className="text-sm text-[#a3a7c8]">Escolha o tipo de atendimento para retirar a senha.</p>
        )}
      </div>
    </div>
  );
}
