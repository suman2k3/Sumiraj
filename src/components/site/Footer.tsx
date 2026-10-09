import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--steel-dark)] text-primary-foreground">
      <div className="container-x mx-auto max-w-[1400px] py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo lightText />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60">
              Leading designer, fabricator, and erector of Pre-Engineered Steel Buildings (PEB) and high-precision structural steel solutions since 2017.
            </p>
          </div>
          <div className="flex flex-col md:items-center">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
                <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
                <li><Link to="/manufacturing" className="hover:text-accent">Manufacturing</Link></li>
                <li><Link to="/products" className="hover:text-accent">Products</Link></li>
                <li><Link to="/portfolio" className="hover:text-accent">Portfolio</Link></li>
                <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-accent shrink-0" />
                <span>Plot No. I-46, Site-V, Kasna, Surajpur Industrial Area, Greater Noida, G.B. Nagar (U.P.) Pin - 201310</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="tel:+919997904348" className="hover:text-accent">+91 99979 04348</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:info@sumiraj.com" className="hover:text-accent">info@sumiraj.com</a>
              </li>
            </ul>

            {/* Map Embed under Reach Us */}
            <div className="mt-5 space-y-2">
              <div className="overflow-hidden rounded-md border border-white/10 shadow-inner">
                <iframe
                  title="Sumiraj Location Map"
                  src="https://maps.google.com/maps?q=SUMIRAJ%20INDUSTRIES%20PRIVATE%20LIMITED%20Kasna%20Greater%20Noida&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="h-36 w-full border-0 brightness-90 contrast-125 transition hover:brightness-100"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/h486xRxJshDA7Cf17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
              >
                <MapPin size={14} /> Open Location in Google Maps <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/50 md:flex-row">
          <p>© {new Date().getFullYear()} Sumiraj PEB &amp; Steel Structures Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-accent font-medium text-slate-400">Admin Login</Link>
            <span>·</span>
            <p>ISO 9001:2015 · API 6D · CE Certified</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
