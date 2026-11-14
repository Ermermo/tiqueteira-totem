import { Suspense } from "react";
import { connection } from "next/server";
import { PainelChamadas } from "@/components/painel/PainelChamadas";
import { ultimasChamadas } from "@/lib/senhas";

// A página busca os dados; o componente só desenha. Mesmo padrão da Visão geral:
// o que depende do momento do acesso fica separado, dentro do <Suspense>.
async function Painel() {
  await connection();
  return <PainelChamadas chamadas={ultimasChamadas()} />;
}

export default function PainelPage() {
  return (
    <section>
      <h1 className="mb-4 text-lg font-semibold">Painel de chamadas</h1>
      <Suspense fallback={<p className="text-sm text-[#a3a7c8]">Carregando...</p>}>
        <Painel />
      </Suspense>
    </section>
  );
}
