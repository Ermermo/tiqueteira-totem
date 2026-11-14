import { Ticket, Check, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TipoBadge } from "@/components/ui/TipoBadge";
import type { gerarRelatorio, StatusSenha } from "@/lib/senhas";

// O tipo do relatório vem da própria função: se ela mudar, a tela acompanha
type Relatorio = ReturnType<typeof gerarRelatorio>;

const corDoStatus: Record<StatusSenha, string> = {
  atendida: "bg-ok-soft text-ok",
  descartada: "bg-bad-soft text-bad",
  aguardando: "bg-surface-2 text-muted",
};

const minutos = (valor: number) => `${Math.round(valor)} min`;

export function RelatorioView({ relatorio }: { relatorio: Relatorio }) {
  const { totais, resumo, detalhado } = relatorio;
  const icone = { size: 24, strokeWidth: 1.5 };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card titulo="Total emitidas" valor={totais.emitidas} tom="accent" icone={<Ticket {...icone} />} />
        <Card titulo="Total atendidas" valor={totais.atendidas} tom="ok" icone={<Check {...icone} />} />
        <Card titulo="Tempo médio" valor={minutos(totais.tempoMedioGeral)} tom="accent" icone={<Clock {...icone} />} />
      </div>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Resumo por prioridade</h2>
        <div className="overflow-x-auto rounded-xl bg-surface border border-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted">
                <th className="px-6 py-3 font-normal">Tipo</th>
                <th className="px-6 py-3 font-normal">Emitidas</th>
                <th className="px-6 py-3 font-normal">Atendidas</th>
                <th className="px-6 py-3 font-normal">Tempo médio</th>
              </tr>
            </thead>
            <tbody>
              {resumo.map((linha) => (
                <tr key={linha.tipo} className="border-t border-line transition-colors hover:bg-surface-2">
                  <td className="px-6 py-3"><TipoBadge tipo={linha.tipo} /></td>
                  <td className="px-6 py-3 tabular-nums">{linha.emitidas}</td>
                  <td className="px-6 py-3 tabular-nums">{linha.atendidas}</td>
                  {/* Sem nenhum atendimento não existe média: mostramos um traço, e não "0 min" */}
                  <td className="px-6 py-3 tabular-nums">{linha.atendidas > 0 ? minutos(linha.tempoMedio) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Relatório detalhado</h2>
        {detalhado.length === 0 ? (
          <div className="rounded-xl bg-surface p-6 border border-line">
            <p className="text-sm text-muted">Nenhuma senha emitida hoje.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-surface border border-line">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-muted">
                  <th className="px-6 py-3 font-normal">Número</th>
                  <th className="px-6 py-3 font-normal">Tipo</th>
                  <th className="px-6 py-3 font-normal">Emissão</th>
                  <th className="px-6 py-3 font-normal">Atendimento</th>
                  <th className="px-6 py-3 font-normal">Guichê</th>
                  <th className="px-6 py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {detalhado.map((linha) => (
                  <tr key={linha.numero} className="border-t border-line transition-colors hover:bg-surface-2">
                    <td className="px-6 py-3 font-semibold tabular-nums">{linha.numero}</td>
                    <td className="px-6 py-3"><TipoBadge tipo={linha.tipo} /></td>
                    <td className="px-6 py-3 tabular-nums">{linha.emissao}</td>
                    <td className="px-6 py-3 tabular-nums">{linha.atendimento}</td>
                    <td className="px-6 py-3 tabular-nums">{linha.guiche}</td>
                    <td className="px-6 py-3">
                      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${corDoStatus[linha.status]}`}>
                        {linha.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
