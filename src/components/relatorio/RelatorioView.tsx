import { Ticket, Check, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TipoBadge } from "@/components/ui/TipoBadge";
import type { gerarRelatorio, StatusSenha } from "@/lib/senhas";

// O tipo do relatório vem da própria função: se ela mudar, a tela acompanha
type Relatorio = ReturnType<typeof gerarRelatorio>;

const corDoStatus: Record<StatusSenha, string> = {
  atendida: "bg-emerald-50 text-emerald-500",
  descartada: "bg-rose-50 text-rose-400",
  aguardando: "bg-slate-100 text-slate-500",
};

const minutos = (valor: number) => `${Math.round(valor)} min`;

export function RelatorioView({ relatorio }: { relatorio: Relatorio }) {
  const { totais, resumo, detalhado } = relatorio;
  const icone = { size: 40, strokeWidth: 1.25 };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card titulo="Total emitidas" valor={totais.emitidas} cor="text-violet-300" icone={<Ticket {...icone} />} />
        <Card titulo="Total atendidas" valor={totais.atendidas} cor="text-emerald-300" icone={<Check {...icone} />} />
        <Card titulo="Tempo médio" valor={minutos(totais.tempoMedioGeral)} cor="text-indigo-300" icone={<Clock {...icone} />} />
      </div>

      <section>
        <h2 className="mb-3 text-base font-semibold">Resumo por prioridade</h2>
        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[#a3a7c8]">
                <th className="px-6 py-3 font-normal">Tipo</th>
                <th className="px-6 py-3 font-normal">Emitidas</th>
                <th className="px-6 py-3 font-normal">Atendidas</th>
                <th className="px-6 py-3 font-normal">Tempo médio</th>
              </tr>
            </thead>
            <tbody>
              {resumo.map((linha) => (
                <tr key={linha.tipo} className="border-t border-slate-100">
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
        <h2 className="mb-3 text-base font-semibold">Relatório detalhado</h2>
        {detalhado.length === 0 ? (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm text-[#a3a7c8]">Nenhuma senha emitida hoje.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[#a3a7c8]">
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
                  <tr key={linha.numero} className="border-t border-slate-100">
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
