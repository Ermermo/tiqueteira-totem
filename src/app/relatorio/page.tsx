import { Suspense } from "react";
import { connection } from "next/server";
import { EncerrarExpediente } from "@/components/relatorio/EncerrarExpediente";
import { RelatorioView } from "@/components/relatorio/RelatorioView";
import { gerarRelatorio } from "@/lib/senhas";

async function Relatorio() {
  await connection();
  return <RelatorioView relatorio={gerarRelatorio()} />;
}

export default function RelatorioPage() {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Relatório do dia</h1>
        <EncerrarExpediente />
      </div>
      <Suspense fallback={<p className="text-sm text-[#a3a7c8]">Carregando...</p>}>
        <Relatorio />
      </Suspense>
    </section>
  );
}
