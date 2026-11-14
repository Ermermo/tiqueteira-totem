import { Suspense } from "react";
import { connection } from "next/server";
import { HeartPulse, FlaskConical, Users, Ticket, Check, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { contarFila, totaisGerais } from "@/lib/senhas";

// Parte dinâmica: depende do momento do acesso, por isso fica separada e dentro do <Suspense>
async function VisaoGeral() {
  await connection();
  const totais = totaisGerais();
  const icone = { size: 24, strokeWidth: 1.5 };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card titulo="Fila prioritária" valor={contarFila("SP")} tom="sp" icone={<HeartPulse {...icone} />} />
      <Card titulo="Fila de exames" valor={contarFila("SE")} tom="se" icone={<FlaskConical {...icone} />} />
      <Card titulo="Fila geral" valor={contarFila("SG")} tom="sg" icone={<Users {...icone} />} />
      <Card titulo="Emitidas hoje" valor={totais.emitidas} tom="accent" icone={<Ticket {...icone} />} />
      <Card titulo="Atendidas hoje" valor={totais.atendidas} tom="ok" icone={<Check {...icone} />} />
      <Card titulo="Tempo médio" valor={`${Math.round(totais.tempoMedioGeral)} min`} tom="accent" icone={<Clock {...icone} />} />
    </div>
  );
}

export default function Home() {
  return (
    <section>
      <h1 className="mb-6 font-display text-2xl font-semibold tracking-tight">Visão geral</h1>
      <Suspense fallback={<p className="text-sm text-muted">Carregando...</p>}>
        <VisaoGeral />
      </Suspense>
    </section>
  );
}
