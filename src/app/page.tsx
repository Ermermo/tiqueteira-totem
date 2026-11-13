import { Suspense } from "react";
import { connection } from "next/server";
import { gerarNumero, entrarNaFila, Senha, filas, chamarProxima, reiniciarDia, contador, emitirSenha, listaGeral, historicoChamadas, ultimasChamadas, TipoSenha, contarEmitidas, contarAtendidas, tempoMedio} from "@/lib/senhas";

async function Conteudo() {
  await connection();
  
  reiniciarDia()

  const senhasFalsas: Record<string, TipoSenha> = {
    s1: "SP",
    // s2: "SG",
    s3: "SP",
    // s4: "SE",
  }

  for (let senha of Object.values(senhasFalsas)) {
    emitirSenha(senha)
  }

  console.log(tempoMedio("SP"))

  // function chaamaa() {
  //   const x = chamarProxima(1)
  //   console.log(x?.tipo, x?.duracao, x?.status)
  // }

  // chaamaa()
  // chaamaa()
  // chaamaa()
  
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