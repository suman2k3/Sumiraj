import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-quality.jpg";
import cncImg from "@/assets/img-cnc.jpg";
import { Award, FileCheck, Microscope, ClipboardCheck, ShieldCheck, Beaker } from "lucide-react";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Assurance — ISO 9001, API 6D, CE Certified | Sumiraj" },
      { name: "description", content: "In-house NABL lab, third-party inspection and nine international certifications back every unit we ship." },
      { property: "og:title", content: "Sumiraj Quality Assurance" },
      { property: "og:description", content: "Testing, inspection, certifications and international standards compliance." },
    ],
  }),
  component: Quality,
});

function Quality() {
  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="Quality"
        eyebrow="Quality Assurance"
        title={<>Quality isn't a stage.<br />It's the whole process.</>}
        subtitle="Every batch. Every unit. Every stamp. Traceable, third-party auditable, and warrantied."
      />

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="eyebrow">Our Approach</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl leading-tight">Quality assured at every touchpoint.</h2>
            <p className="mt-5 text-muted-foreground">We don't inspect quality in. We build it in — from raw material selection through final packing.</p>
          </div>
          <div className="space-y-4">
            {[
              { icon: Beaker, t: "Incoming material check", d: "Chemical & mechanical verification of every heat number before it enters production." },
              { icon: ClipboardCheck, t: "In-process inspection", d: "SPC data captured at every CNC pass; drift triggers auto-alerts." },
              { icon: Microscope, t: "Non-destructive testing", d: "UT, RT, MPT and DPT performed by ASNT Level II/III technicians." },
              { icon: ShieldCheck, t: "Hydro & functional testing", d: "100% of pressure-containing parts tested to 1.5× rated pressure." },
              { icon: FileCheck, t: "Final documentation", d: "MTR, IRC, dimensional report, hydro certificate — all archived digitally." },
            ].map((p, i) => (
              <div key={p.t} className="flex gap-6 rounded-sm border bg-card p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground">
                  <p.icon size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</div>
                  <h3 className="mt-1 font-display text-xl font-bold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Certifications</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Nine international standards. All audited.</h2>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { c: "ISO 9001:2015", d: "Quality Management System" },
              { c: "ISO 14001:2015", d: "Environmental Management" },
              { c: "ISO 45001:2018", d: "Occupational H&S" },
              { c: "API 6D", d: "Pipeline Valves" },
              { c: "API 600", d: "Steel Gate Valves" },
              { c: "ASME U-Stamp", d: "Pressure Vessels" },
              { c: "CE / PED 2014/68/EU", d: "European Compliance" },
              { c: "TÜV Nord", d: "Independent audit" },
              { c: "NABL", d: "Laboratory Accreditation" },
            ].map((cert) => (
              <div key={cert.c} className="flex items-center gap-4 rounded-sm border bg-card p-5">
                <Award size={36} className="shrink-0 text-accent" />
                <div>
                  <div className="font-display text-lg font-bold">{cert.c}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{cert.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <img src={cncImg} alt="Inspection" className="aspect-[4/3] rounded-sm object-cover" loading="lazy" />
          <div>
            <p className="eyebrow">Inspection Protocol</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Every unit passes 47 checkpoints.</h2>
            <p className="mt-5 text-muted-foreground">From dimensional CMM to hydrostatic pressure — no unit ships without a signed inspection dossier.</p>
            <div className="mt-8 space-y-3 border-l-2 border-accent pl-6">
              {[
                "Material heat number cross-referenced to MTR",
                "Dimensional inspection with Zeiss CMM (µm accuracy)",
                "Ultrasonic thickness & flaw detection",
                "Hydrostatic test at 1.5× rated pressure",
                "Surface finish verification (Ra measurement)",
                "Coating & painting DFT check",
                "Final visual by dedicated QC (independent of production)",
              ].map((s, i) => (
                <div key={s} className="flex gap-3">
                  <span className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--steel-dark)] py-20 text-primary-foreground">
        <div className="container-x mx-auto max-w-[1400px] text-center">
          <p className="eyebrow justify-center">Standards Compliance</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold md:text-4xl">
            Built to <span className="text-accent">ASTM, ASME, API, DIN, EN, IS, JIS &amp; MSS-SP</span> — the standards your engineers already trust.
          </h2>
        </div>
      </section>
    </Layout>
  );
}
