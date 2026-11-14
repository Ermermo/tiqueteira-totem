import type { TipoSenha } from "@/lib/senhas";

// As cores de cada tipo, definidas uma vez só para quem precisar reutilizar
const cores: Record<TipoSenha, string> = {
  SP: "bg-rose-50 text-rose-400",
  SE: "bg-amber-50 text-amber-500",
  SG: "bg-sky-50 text-sky-500",
};

export function TipoBadge({ tipo }: { tipo: TipoSenha }) {
  return <span className={`rounded px-2 py-0.5 text-xs font-semibold ${cores[tipo]}`}>{tipo}</span>;
}
