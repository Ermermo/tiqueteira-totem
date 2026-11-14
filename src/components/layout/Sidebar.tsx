"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ticket, Tv, Headset, FileText } from "lucide-react";

const itens = [
  { href: "/", rotulo: "Visão geral", Icone: LayoutDashboard },
  { href: "/totem", rotulo: "Totem", Icone: Ticket },
  { href: "/painel", rotulo: "Painel", Icone: Tv },
  { href: "/guiche", rotulo: "Guichê", Icone: Headset },
  { href: "/relatorio", rotulo: "Relatório", Icone: FileText },
];

export function Sidebar() {
  const rota = usePathname(); // rota atual, para destacar o item ativo

  return (
    <nav aria-label="Principal" className="flex w-16 flex-col items-center gap-2 bg-white py-4">
      {itens.map(({ href, rotulo, Icone }) => {
        const ativo = rota === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={rotulo}
            title={rotulo}
            aria-current={ativo ? "page" : undefined}
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 ${
              ativo ? "bg-indigo-50 text-indigo-500" : "text-[#a3a7c8] hover:bg-slate-50"
            }`}
          >
            <Icone size={22} strokeWidth={1.5} />
          </Link>
        );
      })}
    </nav>
  );
}
