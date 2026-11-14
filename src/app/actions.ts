"use server";

import { revalidatePath } from "next/cache";
import {
  chamarProxima,
  contarFila,
  emitirSenha,
  encerrarExpediente,
  expedienteAberto,
  reiniciarDia,
  type StatusSenha,
  type TipoSenha,
} from "@/lib/senhas";
import { GUICHES } from "@/lib/config";

const TIPOS_VALIDOS: TipoSenha[] = ["SP", "SE", "SG"];

// Tudo que o totem precisa receber: só o número da senha
export async function emitirSenhaAction(tipo: TipoSenha): Promise<string> {
  // Server Actions são endereços públicos: nunca confie no que chega do navegador
  if (!TIPOS_VALIDOS.includes(tipo)) throw new Error("Tipo de senha inválido");

  return emitirSenha(tipo).numero;
}

// A tela do guichê precisa dizer coisas diferentes em cada situação,
// então o resultado diz qual situação aconteceu (o "situacao" é a etiqueta)
export type ResultadoChamada =
  | { situacao: "chamada"; numero: string; tipo: TipoSenha; status: StatusSenha; guiche: number }
  | { situacao: "fechado" }
  | { situacao: "vazia" };

export async function chamarProximaAction(guiche: number): Promise<ResultadoChamada> {
  if (!(GUICHES as readonly number[]).includes(guiche)) throw new Error("Guichê inválido");

  // O chamarProxima devolve undefined tanto fora do horário quanto com a fila vazia.
  // Aqui checamos o horário antes, só para saber qual dos dois motivos aconteceu.
  if (!expedienteAberto(new Date())) return { situacao: "fechado" };

  const senha = chamarProxima(guiche);
  if (!senha) return { situacao: "vazia" };

  return { situacao: "chamada", numero: senha.numero, tipo: senha.tipo, status: senha.status, guiche };
}

// Apaga filas, contadores e relatório do dia. Serve só para testes:
// em produção isso destruiria o dia de trabalho, então o servidor recusa.
export async function reiniciarDiaAction(): Promise<void> {
  if (process.env.NODE_ENV !== "development") throw new Error("Disponível só em desenvolvimento");

  reiniciarDia();
}

// Fim do expediente: o que ainda espera na fila é descartado (o relatório continua intacto).
// Devolve quantas senhas foram descartadas, para a tela avisar.
export async function encerrarExpedienteAction(): Promise<number> {
  const aguardando = TIPOS_VALIDOS.reduce((total, tipo) => total + contarFila(tipo), 0);

  encerrarExpediente();
  revalidatePath("/relatorio"); // pede ao Next para refazer a página do relatório com os dados novos

  return aguardando;
}
