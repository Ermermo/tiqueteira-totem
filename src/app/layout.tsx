import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Controle de Atendimento",
  description: "Sistema de senhas para laboratório médico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#eef0f8] text-[#5b5f8d] antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <header className="flex h-16 items-center bg-white px-8 shadow-sm">
              <p className="text-base font-semibold">Controle de Atendimento</p>
            </header>
            <main className="flex-1 p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
