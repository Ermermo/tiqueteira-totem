"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function alternar() {
    const escuro = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("tema", escuro ? "escuro" : "claro");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label="Alternar entre tema claro e escuro"
      title="Alternar tema"
      className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* O CSS escolhe qual ícone aparece: não precisa de estado nem de JavaScript */}
      <Moon size={20} strokeWidth={1.5} className="dark:hidden" />
      <Sun size={20} strokeWidth={1.5} className="hidden dark:block" />
    </button>
  );
}
