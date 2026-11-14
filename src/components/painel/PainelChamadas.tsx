import type { Senha, TipoSenha } from "@/lib/senhas";

// Mesmas cores dos cartões da Visão geral e do totem
const corDoTipo: Record<TipoSenha, string> = {
  SP: "bg-rose-50 text-rose-400",
  SE: "bg-amber-50 text-amber-500",
  SG: "bg-sky-50 text-sky-500",
};

// Componente só de desenho: recebe as chamadas prontas e não sabe de onde vieram
export function PainelChamadas({ chamadas }: { chamadas: Senha[] }) {
  if (chamadas.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm text-[#a3a7c8]">Nenhuma senha chamada ainda.</p>
      </div>
    );
  }

  // A lista vem com a mais recente primeiro: ela ganha destaque, as outras ficam embaixo
  const [atual, ...anteriores] = chamadas;

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <p className="text-sm text-[#a3a7c8]">Senha chamada</p>
        <p className="mt-2 text-6xl font-semibold tabular-nums text-[#5b5f8d]">{atual.numero}</p>
        {/* A senha de quem não compareceu não tem guichê: nesse caso mostramos só o número */}
        {atual.guiche !== undefined && (
          <p className="mt-6 text-3xl font-semibold text-indigo-500">Guichê {atual.guiche}</p>
        )}
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-sm text-[#a3a7c8]">Chamadas anteriores</h2>
        {anteriores.length === 0 ? (
          <p className="text-sm text-[#a3a7c8]">Ainda não há anteriores.</p>
        ) : (
          <ol className="space-y-2">
            {anteriores.map((senha) => (
              <li key={senha.numero} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${corDoTipo[senha.tipo]}`}>
                    {senha.tipo}
                  </span>
                  <span className="font-semibold tabular-nums text-[#5b5f8d]">{senha.numero}</span>
                </span>
                <span className="text-sm text-[#a3a7c8]">
                  {senha.guiche !== undefined ? `Guichê ${senha.guiche}` : ""}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
