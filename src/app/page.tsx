import { Suspense } from "react";
import { connection } from "next/server";
import { gerarNumero, entrarNaFila, Senha, filas, chamarProxima, reiniciarDia, contador, emitirSenha, listaGeral, historicoChamadas, ultimasChamadas, TipoSenha, contarEmitidas, contarAtendidas, tempoMedio, resumoPorTipo, totaisGerais, formatarDataHora, linhasDetalhadas, gerarRelatorio, encerrarExpediente, expedienteAberto, contarFila } from "@/lib/senhas";

async function Conteudo() {
  await connection();
  
  reiniciarDia()

  const senhasFalsas: Record<string, TipoSenha> = {
    s1: "SP",
    s2: "SG",
    s3: "SP",
    s4: "SE",
  }

  for (let senha of Object.values(senhasFalsas)) {
    emitirSenha(senha)
  }

  function chamar(a: Date) {
    const x = chamarProxima(1, new Date(a))
    // console.log(x?.tipo, x?.duracao, x?.status)
  }

  console.log('a', contarFila("SP"))
  chamar(new Date(2026, 10, 13, 6, 0))
  chamar(new Date(2026, 10, 13, 8, 0))
  console.log(contarFila("SP"))

  // console.log(gerarNumero("SP", 1, new Date()))

  // console.log(formatarDataHora(new Date()))
  // console.log(formatarDataHora(undefined))
  
  // console.log(linhasDetalhadas())
  
  // encerrarExpediente()
  // console.log(gerarRelatorio())
  // console.log(filas)

  // for (let ficha of listaGeral) {
  //   chamarProxima(1)?.numero
    
  //   const hora = ficha.atendidaEm?.toLocaleTimeString('pt-BR', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   })

  //   console.log(`Ficha: ${ficha.numero} atendida às ${hora} pelo guichê: ${ficha.guiche}`)
  // }

  // console.log(historicoChamadas)
  // console.log(ultimasChamadas().map(s => s.numero))

  // console.log("SP", contarEmitidas("SP"), contarAtendidas("SP"))
  // console.log("SE", contarEmitidas("SE"), contarAtendidas("SE"))
  // console.log("SG", contarEmitidas("SG"), contarAtendidas("SG"))

  return <h1>Hello, world!</h1>
}

export default function Home() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Conteudo />
    </Suspense>
  );
}