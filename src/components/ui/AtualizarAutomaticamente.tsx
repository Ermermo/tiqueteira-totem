"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Não desenha nada: só pede ao servidor, de tempos em tempos, os dados novos da página atual
export function AtualizarAutomaticamente({ intervaloMs = 3000 }: { intervaloMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      // Com a aba escondida ninguém está olhando: não vale gastar o servidor
      if (!document.hidden) router.refresh();
    }, intervaloMs);

    // Função de limpeza: roda ao sair da página, senão os relógios se acumulariam
    return () => clearInterval(id);
  }, [router, intervaloMs]);

  return null;
}
