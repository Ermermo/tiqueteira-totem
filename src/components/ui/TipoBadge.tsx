import type { TipoSenha } from "@/lib/senhas";

const cores: Record<TipoSenha, string> = {
  SP: "bg-sp-soft text-sp",
  SE: "bg-se-soft text-se",
  SG: "bg-sg-soft text-sg",
};

export function TipoBadge({ tipo }: { tipo: TipoSenha }) {
  return <span className={`rounded px-2 py-0.5 text-xs font-semibold ${cores[tipo]}`}>{tipo}</span>;
}
