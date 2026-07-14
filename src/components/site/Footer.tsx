import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--steel-dark)] text-primary-foreground">
      <div className="container-x mx-auto max-w-[1400px] py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo lightText />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60">
              Leading designer, fabricator, and erector of Pre-Engineered Steel Buildings (PEB) and high-precision structural steel solutions since 1987.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/manufacturing" className="hover:text-accent">Manufacturing</Link></li>
              <li><Link to="/quality" className="hover:text-accent">Quality</Link></li>
              <li><Link to="/gallery" className="hover:text-accent">Gallery</Link></li>
            </ul>
          </div>
          {/* <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Solutions</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-accent">Pre-Engineered Buildings</Link></li>
              <li><Link to="/" className="hover:text-accent">Industrial Warehouses</Link></li>
              <li><Link to="/" className="hover:text-accent">Structural Steel Trusses</Link></li>
              <li><Link to="/" className="hover:text-accent">Custom Fabrications</Link></li>
            </ul>
          </div> */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-accent" /> Plot 42, Industrial Sector 7, Pune 411057</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-accent" /> +91 20 4000 8899</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-accent" /> sales@sumirajpeb.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/50 md:flex-row">
          <p>© {new Date().getFullYear()} Sumiraj PEB &amp; Steel Structures Pvt. Ltd. All rights reserved.</p>
          <p>ISO 9001:2015 · API 6D · CE Certified</p>
        </div>
      </div>
    </footer>
  );
}
