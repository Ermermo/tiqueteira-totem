// Os 3 tipos possíveis. O "|" significa "um destes".
export type TipoSenha = "SP" | "SE" | "SG"

// O que toda senha precisa ter
export interface Senha {
    numero: string; // ex.: "261111-SP01"
    tipo: TipoSenha;
    emitidaEm: Date; 
    atendidaEm?: Date; // o "?" quer dizer: pode estar vazio
    guiche?: number;
    status: StatusSenha;
    duracao?: number;
}

export function formatacao(data?: Date) {
    if (data){
        const ano = String(data.getFullYear())
        const mes = String(data.getMonth() + 1).padStart(2,"0")
        const dia = String(data.getDate()).padStart(2, "0")
        const horaMin: string = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        }). format(data)
        return { ano, mes, dia, horaMin }
    }
    return {ano: "", mes: "", dia: "", horaMin: ""};
}

// A geração de identificação de uma parte do numero
export function gerarNumero(tipo: TipoSenha, sequencia: number, data: Date) {
    const formatado = formatacao(data)
    return `${formatado.ano.slice(-2)}${formatado.mes}${formatado.dia}-${tipo}${String(sequencia).padStart(2, "0")}`
}

export const filas: Record<TipoSenha, Senha[]> = {
    SP: [],
    SE: [],
    SG: [],
}

export function entrarNaFila(senha: Senha) {
    filas[senha.tipo].push(senha)
}

let ultimoTipo: TipoSenha | null = null;

export function chamarProxima(guiche: number, agora: Date = new Date()): Senha | undefined {
    if (!expedienteAberto(agora)) return undefined;

    const tipo = escolherProximoTipo()
    if (tipo === null) return undefined; // se não tiver nenhuma ficha devolve undefined
    const senha = filas[tipo].shift() // se tiver, armazena
    if (senha) {
        senha.status = Math.random() < 0.05? "descartada" : "atendida"
        if (senha.status === "atendida") {
            senha.atendidaEm = agora
            senha.guiche = guiche
            senha.duracao = sortearDuracao(senha.tipo)
        }
        historicoChamadas.push(senha)
    }
    ultimoTipo = tipo
    return senha
}

export function contarFila(tipo: TipoSenha): number {
    return filas[tipo].length
}

export function escolherProximoTipo(): TipoSenha | null {
    const filaSP = contarFila("SP"), filaSE = contarFila("SE"), filaSG = contarFila("SG")
    if (ultimoTipo === "SP") {
        if (filaSE > 0) return "SE";
        if (filaSG > 0) return "SG";
        if (filaSP > 0) return "SP";
    }
    if (ultimoTipo !== "SP") {
        if (filaSP > 0) return "SP";
        if (filaSE > 0) return "SE";
        if (filaSG > 0) return "SG";
    }
    return null
}

export function reiniciarDia(){
    for (const tipo of Object.keys(filas) as TipoSenha[]) filas[tipo] = []; 
    for (const tipo of Object.keys(contador) as TipoSenha[]) contador[tipo] = 0; 
    listaGeral.length = 0 
    ultimoTipo = null
    historicoChamadas.length = 0
}

export const contador: Record<TipoSenha, number> = {
    SP: 0,
    SE: 0,
    SG: 0,
}

export function emitirSenha(tipo: TipoSenha): Senha {
    contador[tipo] += 1; // Guarda quantas senhas do tipo já foram emitidas hoje
    const dataAtual = new Date() // Captura a data no momento que a senha é emitida
    const sequencia = contador[tipo] // Captura e aplica a senha atual do paciente
    const novaSenha: Senha = { numero: gerarNumero(tipo, sequencia, dataAtual), tipo, emitidaEm: dataAtual, status: "aguardando"}
    entrarNaFila(novaSenha) // Lança a ficha do paciente na fila
    listaGeral.push(novaSenha)
    return novaSenha
}

export const listaGeral: Senha[] = []

export const historicoChamadas: Senha[] = []

export function ultimasChamadas(): Senha[] {return historicoChamadas.slice(-5).reverse()}

export function contarEmitidas(tipo: TipoSenha): number {
    return listaGeral.filter(s => s.tipo === tipo).length
}
export function contarAtendidas(tipo: TipoSenha): number {
    return listaGeral.filter(s => s.tipo === tipo && s.status === "atendida").length
}

export type StatusSenha = "aguardando" | "atendida" | "descartada"

export function sortearDuracao(tipo: TipoSenha): number {
    if (tipo === "SP") return Math.floor(Math.random() * (20 - 10 + 1) + 10);
    if (tipo === "SG") return Math.floor(Math.random() * (8 - 2 + 1) + 2);
    if (tipo === "SE") return Math.random() > 0.05 ? 1 : 5;
    return 0
}

export function tempoMedio(tipo: TipoSenha): number {
    const listaTipada = listaGeral.filter(s => s.tipo === tipo && s.status === "atendida")
    if (listaTipada.length > 0) {
        const somaDuracoes = listaTipada.reduce((acumulador, valorAtual) => acumulador + (valorAtual.duracao ?? 0), 0)
        return somaDuracoes / listaTipada.length
    }
    return 0
}

const tipos = Object.keys(filas) as TipoSenha[]

export function resumoPorTipo(){
    return tipos.map(s => ({ tipo: s, emitidas: contarEmitidas(s), atendidas: contarAtendidas(s), tempoMedio: tempoMedio(s)}))
}

export function totaisGerais() {
    const emitidas = listaGeral.length
    // Separei em listaAtendidas (devolve a lista) e atendidas (traz a quantidade de atendidas)
    const listaAtendidas = listaGeral.filter(s => s.status === "atendida") 
    const atendidas = listaAtendidas.length
    let tempoMedioGeral = 0
    if (atendidas > 0) tempoMedioGeral = listaAtendidas.reduce((acumulador, valorAtual) => acumulador + (valorAtual.duracao ?? 0), 0) / atendidas

    return {emitidas, atendidas, tempoMedioGeral}
}

export function formatarDataHora(data?: Date): string {
    if (data) {
        const tempo = formatacao(data)
        return `${tempo.dia}/${tempo.mes}/${tempo.ano} ${tempo.horaMin}`
    }
    return ""
}

export function linhasDetalhadas() {
    return listaGeral.map(s => ({
        numero: s.numero,
        tipo: s.tipo,
        emissao: formatarDataHora(s.emitidaEm),
        atendimento: formatarDataHora(s.atendidaEm),
        guiche: s.guiche ?? "",
        status: s.status,
    }))
}

export function gerarRelatorio() {
    return ({totais: totaisGerais(), resumo: resumoPorTipo(), detalhado: linhasDetalhadas()})
}

export function encerrarExpediente() {
    for (const tipo of tipos) {
        for (const ficha of filas[tipo]) {
            ficha.status = "descartada"
        }
        filas[tipo] = []
    }
}

export function expedienteAberto(agora: Date): boolean {
    return agora.getHours() >= 7 && agora.getHours() < 17
}