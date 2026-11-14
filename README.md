# Controle de Atendimento

Sistema de senhas para filas de laboratório médico. O cliente retira a senha no **totem**, a atendente chama a próxima no **guichê**, o **painel** mostra as últimas chamadas e o **relatório** resume o dia.

Projeto de disciplina, feito em Next.js (App Router), TypeScript e Tailwind CSS v4.

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Telas

| Rota | Para quem | O que faz |
| --- | --- | --- |
| `/` | Todos | Visão geral: filas aguardando e totais do dia |
| `/totem` | Cliente | Retira a senha (SP, SE ou SG) |
| `/guiche` | Atendente | Escolhe o guichê e chama a próxima senha |
| `/painel` | Cliente | Últimas 5 chamadas, atualiza a cada 3 segundos |
| `/relatorio` | Gestão | Totais, resumo por tipo e relatório detalhado; botão de encerrar expediente |

## Regras implementadas

- **Tipos:** SP (prioritária), SE (retirada de exames) e SG (geral).
- **Numeração:** `AAMMDD-TTSQ` (ex.: `261114-SP01`), com a sequência reiniciada todo dia, por tipo.
- **Ordem de chamada:** alterna `SP → SE ou SG → SP`. Depois de uma SP, tenta SE e depois SG; depois de SE ou SG, tenta SP.
- **Tempo médio (TM):** sorteado por atendimento. SP entre 10 e 20 min, SG entre 2 e 8 min, SE 1 min (5% das vezes, 5 min).
- **Ausência:** cerca de 5% dos clientes chamados não comparecem. A senha é descartada, sem data de atendimento nem guichê.
- **Expediente:** chamadas das 7h às 17h. Ao encerrar, as senhas que sobraram são descartadas.
- **Relatório do dia:** totais, resumo por tipo e linha por senha.

## Estrutura

```
src/
  app/            rotas (cada pasta com page.tsx vira uma página) e actions.ts (Server Actions)
  components/     layout/, ui/, totem/, guiche/, painel/, relatorio/
  lib/
    senhas.ts     regras do sistema, sem nada de tela
    config.ts     configurações (lista de guichês)
```

As regras ficam em `lib/senhas.ts`; as telas só chamam essas funções por meio das Server Actions. As cores estão todas no `app/globals.css`, com tema claro e escuro.

## Avisos para teste

- **O horário do expediente está desativado.** Em `lib/senhas.ts`, a função `expedienteAberto` devolve `true` direto, e a regra real (7h às 17h) está comentada. Para reativar, remova o `return true` e descomente a regra.
- **O botão "Reiniciar dia (teste)"** do guichê só existe em desenvolvimento, e o servidor recusa a ação em produção.
- **Os dados ficam na memória do servidor.** Reiniciar o servidor, ou salvar certos arquivos no modo de desenvolvimento, zera filas e relatório.

## Decisões sobre pontos ambíguos do documento

- **Ordem entre SE e SG:** depois de uma SP, a SE é preferida à SG. Com muitas SE na fila, a SG pode esperar bastante.
- **Painel:** mostra as 5 últimas senhas **chamadas**, inclusive as de clientes ausentes, que aparecem sem guichê.
- **Emissão fora do horário:** só a chamada é restrita ao expediente; o totem continua emitindo senhas.

## TO-DO

- [ ] Reativar a regra real do horário em `expedienteAberto`.
- [ ] Guardar os dados em banco (MySQL 8, como pede o documento), para sobreviver a reinícios.
- [ ] Relatório mensal (depende do banco, para guardar os dias anteriores).
- [ ] Revisar a prioridade da SG (evitar que fique muito tempo esperando).
- [ ] Encerramento automático às 17h, e restrito a um supervisor (hoje é manual e sem login).
- [ ] Painel com SSE ou WebSocket no lugar de atualizar a cada 3 segundos.
- [ ] Separar "chamar" de "confirmar presença" (hoje o sorteio da ausência acontece na própria chamada).


## Como foi feito
 
- **Regras do sistema** (`src/lib/senhas.ts`): escritas pelo autor.
- **Front-end** (telas, componentes, tema claro e escuro e Server Actions): desenvolvido em grande parte com o Claude, a partir de uma imagem de referência de estilo, e depois testado e ajustado pelo autor.
- **Fluxo do sistema:** diagrama gerado no Miro a partir do documento de requisitos da disciplina.
