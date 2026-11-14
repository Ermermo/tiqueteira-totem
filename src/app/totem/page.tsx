import { TotemSenhas } from "@/components/totem/TotemSenhas";

// Página estática: não lê dados na hora, então não precisa de Suspense nem de connection()
export default function TotemPage() {
  return (
    <section>
      <h1 className="mb-4 text-lg font-semibold">Retirar senha</h1>
      <TotemSenhas />
    </section>
  );
}