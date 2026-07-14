import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  // { to: "/products", label: "Products" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/blog", label: "Blog" },
  { to: "/quality", label: "Quality" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-150 bg-white/95 shadow-sm backdrop-blur">
      <div className="container-x mx-auto flex h-16 max-w-[1400px] items-center justify-between">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-accent font-bold" }}
              inactiveProps={{ className: "text-slate-600 hover:text-slate-900" }}
              className="rounded px-3 py-2 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 lg:inline-flex"
        >
          Request a Quote
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded text-slate-700 hover:text-slate-900 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden shadow-md">
          <div className="container-x mx-auto flex max-w-[1400px] flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-accent font-bold" }}
                inactiveProps={{ className: "text-slate-600 hover:text-slate-900" }}
                className="border-b border-slate-50 py-3 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
