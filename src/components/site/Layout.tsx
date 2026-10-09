import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background overflow-x-hidden w-full">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
