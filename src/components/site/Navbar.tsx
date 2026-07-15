import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/manufacturing", label: "Manufacturing" },
] as const;

const buildingSystemsSublinks = [
  { to: "/building-systems/pre-engineered-buildings", label: "Pre Engineered Buildings" },
  { to: "/building-systems/primary-framing", label: "Primary Framing" },
  { to: "/building-systems/secondary-framing-systems", label: "Secondary Framing Systems" },
  { to: "/building-systems/roofing-and-wall-cladding-systems", label: "Roofing & Wall Cladding Systems" },
  { to: "/building-systems/standing-seam-roofing-system", label: "Standing Seam Roofing System" },
  { to: "/building-systems/mezzanine-floors", label: "Mezzanine Floors" },
  { to: "/building-systems/erection-and-installation", label: "Erection & Installation" },
] as const;

const endLinks = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  
  const location = useLocation();
  const isBuildingSystemActive = location.pathname.startsWith("/building-systems");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-150 bg-white/95 shadow-sm backdrop-blur">
      <div className="container-x mx-auto flex h-16 max-w-[1400px] items-center justify-between">
        <Link to="/" className="hover:opacity-90 transition-opacity" onClick={() => setOpen(false)}>
          <Logo iconOnly />
        </Link>

        {/* Desktop Navigation */}
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

          {/* Building Systems Hover Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              to="/building-systems"
              onClick={() => setDropdownOpen(false)}
              className={`flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors outline-none ${
                isBuildingSystemActive ? "text-accent font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Building Systems
              <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-accent" : "text-slate-400"}`} />
            </Link>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1 w-72 rounded-lg border border-slate-150 bg-white p-2 shadow-xl ring-1 ring-black/5"
                >
                  {buildingSystemsSublinks.map((sublink) => (
                    <Link
                      key={sublink.to}
                      to={sublink.to}
                      activeProps={{ className: "text-accent bg-accent/5 font-bold" }}
                      inactiveProps={{ className: "text-slate-700 hover:bg-slate-55/40 hover:text-slate-950" }}
                      className="block rounded-md px-4 py-2.5 text-xs font-semibold transition"
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {endLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
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

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded text-slate-700 hover:text-slate-900 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden shadow-md max-h-[85vh] overflow-y-auto">
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

            {/* Mobile Accordion for Building Systems */}
            <div className="border-b border-slate-50 py-1">
              <button
                onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
                className="flex w-full items-center justify-between py-3 text-sm font-medium text-slate-600 hover:text-slate-900 outline-none"
              >
                <span className={isBuildingSystemActive ? "text-accent font-bold" : ""}>
                  Building Systems
                </span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAccordionOpen ? "rotate-180 text-accent" : "text-slate-400"}`} />
              </button>

              <AnimatePresence>
                {mobileAccordionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-slate-55/20 px-4 py-1 flex flex-col gap-1 border-l-2 border-accent/25 my-1"
                  >
                    {buildingSystemsSublinks.map((sublink) => (
                      <Link
                        key={sublink.to}
                        to={sublink.to}
                        onClick={() => {
                          setOpen(false);
                        }}
                        activeProps={{ className: "text-accent font-bold" }}
                        inactiveProps={{ className: "text-slate-500 hover:text-slate-800" }}
                        className="py-2.5 text-xs font-semibold transition"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {endLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
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
