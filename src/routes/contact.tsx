import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-contact.jpg";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitEnquiryApi, EnquiryData } from "@/lib/enquiryApi";

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
  const [submitting, setSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<EnquiryData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    mobile: "",
    sourceLocation: "",
    destinationLocation: "",
    shipmentWeight: "",
    enquiryType: "Website Enquiry",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    const res = await submitEnquiryApi({
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      mobile: formData.mobile,
      sourceLocation: formData.sourceLocation,
      destinationLocation: formData.destinationLocation,
      shipmentWeight: formData.shipmentWeight,
      enquiryType: formData.enquiryType,
      message: formData.message,
    });

    setSubmitting(false);

    if (res.success) {
      setSubmittedResponse(res.data || {
        _id: "demo",
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        mobile: formData.mobile,
        sourceLocation: formData.sourceLocation,
        destinationLocation: formData.destinationLocation,
        shipmentWeight: formData.shipmentWeight,
        enquiryType: formData.enquiryType,
        message: formData.message,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      setErrorMsg(res.message || "Failed to submit enquiry. Please try again.");
    }
  };

  const handleReset = () => {
    setSubmittedResponse(null);
    setErrorMsg("");
    setFormData({
      fullName: "",
      company: "",
      email: "",
      mobile: "",
      sourceLocation: "",
      destinationLocation: "",
      shipmentWeight: "",
      enquiryType: "Website Enquiry",
      message: "",
    });
  };

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
            
            {submittedResponse ? (
              <div className="mt-10 rounded-lg border border-emerald-500/40 bg-emerald-50/50 p-8 dark:bg-emerald-950/20 text-left space-y-4">
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={32} />
                  <div>
                    <h3 className="font-display text-2xl font-bold">Enquiry Submitted Successfully!</h3>
                    <p className="text-xs text-muted-foreground">Reference ID: <span className="font-mono font-bold text-foreground">{submittedResponse._id}</span></p>
                  </div>
                </div>

                <div className="grid gap-3 rounded-md bg-white p-6 dark:bg-slate-900 border text-xs text-slate-700 dark:text-slate-300 md:grid-cols-2">
                  <div><span className="font-bold">Full Name:</span> {submittedResponse.fullName}</div>
                  <div><span className="font-bold">Company:</span> {submittedResponse.company || "N/A"}</div>
                  <div><span className="font-bold">Email:</span> {submittedResponse.email}</div>
                  <div><span className="font-bold">Mobile:</span> {submittedResponse.mobile}</div>
                  <div><span className="font-bold">Source Location:</span> {submittedResponse.sourceLocation || "N/A"}</div>
                  <div><span className="font-bold">Destination Location:</span> {submittedResponse.destinationLocation || "N/A"}</div>
                  <div><span className="font-bold">Shipment Weight:</span> {submittedResponse.shipmentWeight || "N/A"}</div>
                  <div><span className="font-bold">Enquiry Type:</span> {submittedResponse.enquiryType}</div>
                  <div className="md:col-span-2"><span className="font-bold">Message:</span> {submittedResponse.message}</div>
                  <div className="md:col-span-2"><span className="font-bold">Status:</span> <span className="uppercase font-semibold text-amber-600 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded text-[10px]">{submittedResponse.status}</span></div>
                </div>

                <p className="text-sm text-muted-foreground">Our sales and engineering team will review your inquiry and contact you shortly.</p>
                
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-xs font-semibold text-accent-foreground hover:brightness-110"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {errorMsg && (
                  <div className="rounded-sm border border-red-500/50 bg-red-50 p-4 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full Name" required>
                    <input
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Suman Kumar"
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Test Company"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      name="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="your_email@gmail.com"
                    />
                  </Field>
                  <Field label="Mobile Number" required>
                    <input
                      name="mobile"
                      required
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="9876543210"
                    />
                  </Field>
                  <Field label="Source Location">
                    <input
                      name="sourceLocation"
                      value={formData.sourceLocation}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Delhi"
                    />
                  </Field>
                  <Field label="Destination Location">
                    <input
                      name="destinationLocation"
                      value={formData.destinationLocation}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Noida"
                    />
                  </Field>
                  <Field label="Shipment Weight / Quantity">
                    <input
                      name="shipmentWeight"
                      value={formData.shipmentWeight}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="e.g. 50 Tons / Test"
                    />
                  </Field>
                  <Field label="Enquiry Type">
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="Website Enquiry">Website Enquiry</option>
                      <option value="Pre-Engineered Buildings (PEB)">Pre-Engineered Buildings (PEB)</option>
                      <option value="Industrial Warehouses">Industrial Warehouses</option>
                      <option value="Structural Steel Trusses">Structural Steel Trusses</option>
                      <option value="Custom Steel Fabrications">Custom Steel Fabrications</option>
                    </select>
                  </Field>
                </div>

                <Field label="Specification / Message" required>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="This is a test enquiry from Postman / details of your project..."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:brightness-110 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      Submit Enquiry <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            {[
              { icon: MapPin, t: "Head Office & Plant I", d: "SUMIRAJ INDUSTRIES PRIVATE LIMITED \nPlot No. I-46, Site-V, Kasna, Surajpur Industrial Area,\nGreater Noida, G.B. Nagar (U.P.) Pin - 201310" },
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
