import type { ReactNode } from "react";

type CardProps = {
  titulo: string;
  valor: string | number;
  icone: ReactNode;
  cor: string; // classe de cor do ícone, ex.: "text-rose-300"
};

// Cartão branco da visão geral: número pequeno em cima, nome embaixo, ícone à direita
export function Card({ titulo, valor, icone, cor }: CardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-6 py-5 shadow-sm">
      <div>
        <p className="text-sm text-[#a3a7c8]">{valor}</p>
        <p className="mt-1 text-base font-semibold text-[#5b5f8d]">{titulo}</p>
      </div>
      <span className={cor}>{icone}</span>
    </div>
  );
}
