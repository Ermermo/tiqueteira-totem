import { Suspense } from "react";
import { connection } from "next/server";
import { HeartPulse, FlaskConical, Users, Ticket, Check, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { contarFila, totaisGerais } from "@/lib/senhas";

// Parte dinâmica: depende do momento do acesso, por isso fica separada e dentro do <Suspense>
async function VisaoGeral() {
  await connection();
  const totais = totaisGerais();
  const icone = { size: 40, strokeWidth: 1.25 };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card titulo="Fila prioritária" valor={contarFila("SP")} cor="text-rose-300" icone={<HeartPulse {...icone} />} />
      <Card titulo="Fila de exames" valor={contarFila("SE")} cor="text-amber-300" icone={<FlaskConical {...icone} />} />
      <Card titulo="Fila geral" valor={contarFila("SG")} cor="text-sky-300" icone={<Users {...icone} />} />
      <Card titulo="Emitidas hoje" valor={totais.emitidas} cor="text-violet-300" icone={<Ticket {...icone} />} />
      <Card titulo="Atendidas hoje" valor={totais.atendidas} cor="text-emerald-300" icone={<Check {...icone} />} />
      <Card titulo="Tempo médio" valor={`${Math.round(totais.tempoMedioGeral)} min`} cor="text-indigo-300" icone={<Clock {...icone} />} />
    </div>
  );
}

export default function Home() {
  return (
    <section>
      <h1 className="mb-4 text-lg font-semibold">Visão geral</h1>
      <Suspense fallback={<p className="text-sm text-[#a3a7c8]">Carregando...</p>}>
        <VisaoGeral />
      </Suspense>
    </section>
  );
}
