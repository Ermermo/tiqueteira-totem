import { TotemSenhas } from "@/components/totem/TotemSenhas";

// Página estática: não lê dados na hora, então não precisa de Suspense nem de connection()
export default function TotemPage() {
  return (
    <section>
      <h1 className="mb-6 font-display text-2xl font-semibold tracking-tight">Retirar senha</h1>
      <TotemSenhas />
    </section>
  );
}
