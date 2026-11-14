import { TipoBadge } from "@/components/ui/TipoBadge";
import type { Senha } from "@/lib/senhas";

// Componente só de desenho: recebe as chamadas prontas e não sabe de onde vieram
export function PainelChamadas({ chamadas }: { chamadas: Senha[] }) {
  if (chamadas.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6">
        <p className="text-sm text-muted">Nenhuma senha chamada ainda.</p>
      </div>
    );
  }

  // A mais recente vem primeiro: ela ganha destaque, as outras ficam na lista
  const [atual, ...anteriores] = chamadas;

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="rounded-xl border border-line bg-surface">
        <div className="p-8">
          <p className="text-sm text-muted">Senha chamada</p>
          <p className="mt-2 font-display text-7xl font-semibold tabular-nums tracking-tight">{atual.numero}</p>
        </div>
        {/* Quem não compareceu não tem guichê: nesse caso mostramos só o número */}
        {atual.guiche !== undefined && (
          <div className="border-t border-dashed border-line p-8">
            <p className="text-sm text-muted">Dirija-se ao</p>
            <p className="mt-1 font-display text-4xl font-semibold text-accent">Guichê {atual.guiche}</p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-line bg-surface p-6">
        <h2 className="mb-3 text-sm text-muted">Chamadas anteriores</h2>
        {anteriores.length === 0 ? (
          <p className="text-sm text-muted">Ainda não há anteriores.</p>
        ) : (
          <ol className="divide-y divide-line">
            {anteriores.map((senha) => (
              <li key={senha.numero} className="flex items-center justify-between gap-3 py-2.5">
                <span className="flex items-center gap-2">
                  <TipoBadge tipo={senha.tipo} />
                  <span className="font-semibold tabular-nums">{senha.numero}</span>
                </span>
                <span className="text-sm text-muted">{senha.guiche !== undefined ? `Guichê ${senha.guiche}` : ""}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
