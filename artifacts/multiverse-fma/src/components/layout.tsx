import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Skull, BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./language-selector";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/comic-bg.png')] bg-cover bg-center opacity-20 pointer-events-none mix-blend-screen z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-0 pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-10 border-b-4 border-black bg-card/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 group outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center comic-shadow-sm border-2 border-black group-hover:-translate-y-1 transition-transform">
              <Skull className="text-black w-6 h-6" />
            </div>
            <h1 className="font-display text-3xl tracking-wider text-white uppercase text-glow hidden sm:block">
              Multiverse <span className="text-primary">FMA</span>
            </h1>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-3">
            <NavLink href="/" active={location === "/" || location === "/game" || location === "/results"}>
              <Home className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:block font-heading font-bold tracking-wide uppercase text-lg">{t("nav.play")}</span>
            </NavLink>
            <NavLink href="/stats" active={location === "/stats"}>
              <BarChart3 className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:block font-heading font-bold tracking-wide uppercase text-lg">{t("nav.leaderboard")}</span>
            </NavLink>
            <LanguageSelector />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-black bg-card/90 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-heading text-muted-foreground uppercase tracking-widest text-sm">
            {t("footer.tagline")}
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center px-4 py-2 rounded-xl border-2 transition-all duration-200 outline-none",
        active 
          ? "bg-primary border-black text-black comic-shadow-sm -translate-y-0.5" 
          : "border-transparent text-muted-foreground hover:text-white hover:border-border hover:bg-white/5"
      )}
    >
      {children}
    </Link>
  );
}
