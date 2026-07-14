import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-contact.jpg";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Get in Touch | Sumiraj PEB & Steel Structures" },
      { name: "description", content: "Send us a specification, request a quote, or visit our facility. We respond within 48 hours." },
      { property: "og:title", content: "Contact Sumiraj" },
      { property: "og:description", content: "Contact form, address, phone, email and working hours." },
    ],
  }),
  component: Contact,
});

const inputCls = "block w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="Contact"
        eyebrow="LET'S BUILD TOGETHER"
        title={<>Ready to Build Your Next Steel Structure?</>}
        subtitle="Send drawings, ask a question, or plan a visit — we reply within 48 hours."
        height="sm"
      />

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-sm border bg-card p-8 md:p-12">
            <p className="eyebrow">Inquiry Form</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Tell us what you need.</h2>
            {sent ? (
              <div className="mt-10 rounded-sm border border-accent bg-accent/10 p-8 text-center">
                <div className="font-display text-2xl font-bold text-accent">Thank you.</div>
                <p className="mt-2 text-muted-foreground">Your inquiry has been received. Our sales team will respond within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full Name" required><input required className={inputCls} placeholder="Jane Engineer" /></Field>
                  <Field label="Company"><input className={inputCls} placeholder="Acme Corp." /></Field>
                  <Field label="Email" required><input required type="email" className={inputCls} placeholder="jane@acme.com" /></Field>
                  <Field label="Phone"><input className={inputCls} placeholder="+91 …" /></Field>
                </div>
                <Field label="Product / Category">
                  <select className={inputCls} defaultValue="">
                    <option value="" disabled>Select a product family…</option>
                    <option>Pre-Engineered Buildings (PEB)</option>
                    <option>Industrial Warehouses</option>
                    <option>Structural Steel Trusses</option>
                    <option>Custom Steel Fabrications</option>
                    <option>Custom / Bespoke</option>
                  </select>
                </Field>
                <Field label="Specification / Message" required>
                  <textarea required rows={5} className={inputCls} placeholder="Grade, size, quantity, delivery target…" />
                </Field>
                <button className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:brightness-110">
                  Submit Inquiry <Send size={16} />
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            {[
              { icon: MapPin, t: "Head Office & Plant I", d: "SUMIRAJ INDUSTRIES PRIVATE LIMITED \nI-46, Site-5, Kasna Industrial Area,\n Greater Noida - 201306, Uttar Pradesh, India" },
              { icon: Phone, t: "Call Us", d: "+91-9997904348" },
              { icon: Mail, t: "Email", d: "info@sumiraj.com" },
             /* { icon: Clock, t: "Working Hours", d: "Mon – Sat · 09:00 – 18:00 IST\nEmergency: 24×7" },*/
            ].map((b) => (
              <div key={b.t} className="flex gap-4 rounded-sm border bg-card p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-[var(--steel-dark)] text-accent">
                  <b.icon size={22} />
                </div>
                <div>
                  <div className="font-display text-lg font-bold">{b.t}</div>
                  <div className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{b.d}</div>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <p className="eyebrow">Visit Us</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Find our facility.</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-sm border relative">
            <iframe
              title="Sumiraj location"
              src="https://maps.google.com/maps?q=SUMIRAJ%20INDUSTRIES%20PRIVATE%20LIMITED%20Kasna%20Greater%20Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[480px] w-full border-0"
              allowFullScreen
              loading="lazy"
            />
            {/* Open in Google Maps Link Button */}
            <div className="absolute bottom-4 left-4 z-10">
              <a
                href="https://maps.app.goo.gl/h486xRxJshDA7Cf17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 shadow-lg hover:bg-slate-50 border border-slate-200 transition-all duration-300"
              >
                <MapPin size={14} className="text-accent animate-pulse" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}{required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
