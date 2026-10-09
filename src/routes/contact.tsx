import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type ReactNode } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-contact.jpg";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle, Paperclip, FileText, Image as ImageIcon, X, Plus, Minus } from "lucide-react";
import { submitEnquiryApi, EnquiryData } from "@/lib/enquiryApi";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Get in Touch | Sumiraj PEB & Steel Structures" },
      { name: "description", content: "Send us a specification, request a quote, or visit our facility. We respond within 48 hours." },
      { property: "og:title", content: "Contact Sumiraj" },
      { property: "og:description", content: "Contact form, address, phone, email and working hours." },
      { property: "og:url", content: "https://www.sumiraj.com/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://www.sumiraj.com/contact" },
    ],
  }),
  component: Contact,
});

const inputCls = "block w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-slate-400 dark:placeholder:text-slate-500";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

const faqs = [
  {
    num: "01",
    q: "What information is required to receive a project quotation?",
    a: "To prepare an accurate quotation, please share your project location, building type, approximate dimensions or built-up area, intended application, and scope of work required. Available drawings, technical specifications, and estimated timelines are also helpful. Our team will review your requirements and provide a suitable proposal."
  },
  {
    num: "02",
    q: "Do you provide design and erection services?",
    a: "Yes, we provide design and on-site erection services for pre-engineered buildings and structural steel projects. Our team coordinates the relevant stages of project execution according to the approved design and project requirements."
  },
  {
    num: "03",
    q: "Can you execute projects outside Uttar Pradesh?",
    a: "Yes, we undertake projects across India, subject to project requirements, location, scope of work, and execution feasibility. Contact our team to discuss your project location and specific requirements."
  },
  {
    num: "04",
    q: "What is the typical project timeline?",
    a: "The project timeline depends on the building type, size, design complexity, scope of work, and site readiness. After reviewing your project requirements, our team can provide an estimated schedule covering design, manufacturing, delivery, and erection, as applicable."
  },
  {
    num: "05",
    q: "Do you offer turnkey PEB solutions?",
    a: "Yes, we offer turnkey pre-engineered building solutions covering design, manufacturing, and erection, based on the agreed project scope. Our integrated approach helps coordinate the key stages of execution, from initial planning through on-site installation."
  }
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<EnquiryData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

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

  const handleFilesAdded = (files: FileList | File[]) => {
    setErrorMsg("");
    const fileArray = Array.from(files);
    const newValidFiles: File[] = [];

    for (const file of fileArray) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setErrorMsg(`File "${file.name}" is not supported. Please upload JPG, JPEG, PNG, WEBP, or PDF files.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setErrorMsg(`File "${file.name}" exceeds the 10 MB file size limit (${formatFileSize(file.size)}).`);
        return;
      }
      if (!attachments.some((existing) => existing.name === file.name && existing.size === file.size)) {
        newValidFiles.push(file);
      }
    }

    if (newValidFiles.length > 0) {
      setAttachments((prev) => [...prev, ...newValidFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setAttachments((prev) => prev.filter((_, idx) => idx !== indexToRemove));
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
      attachments: attachments,
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
        attachmentNames: attachments.map((f) => f.name),
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
    setAttachments([]);
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

      <section className="container-x mx-auto max-w-[1400px] py-12 sm:py-16 md:py-20">
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
                  <div><span className="font-bold">Project location:</span> {submittedResponse.sourceLocation || "N/A"}</div>
                  <div><span className="font-bold">Destination Location:</span> {submittedResponse.destinationLocation || "N/A"}</div>
                  <div><span className="font-bold">Approximate Area:</span> {submittedResponse.shipmentWeight || "N/A"}</div>
                  <div><span className="font-bold">Project Type:</span> {submittedResponse.enquiryType}</div>
                  <div className="md:col-span-2"><span className="font-bold">Message:</span> {submittedResponse.message}</div>
                  {submittedResponse.attachmentNames && submittedResponse.attachmentNames.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="font-bold">Attachments ({submittedResponse.attachmentNames.length}):</span>{" "}
                      {submittedResponse.attachmentNames.join(", ")}
                    </div>
                  )}
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
                    <AlertCircle size={16} className="shrink-0" />
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
                      placeholder="e.g. Rahul Sharma"
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="e.g. ABC Industries Pvt. Ltd."
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
                      placeholder="e.g. rahul@company.com"
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
                      placeholder="e.g. 9876543210"
                    />
                  </Field>
                  <Field label="Project Location">
                    <input
                      name="sourceLocation"
                      value={formData.sourceLocation}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="e.g. Greater Noida, Uttar Pradesh"
                    />
                  </Field>
                  <Field label="Destination Location">
                    <input
                      name="destinationLocation"
                      value={formData.destinationLocation}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="e.g. Pune, Maharashtra"
                    />
                  </Field>
                  <Field label="Approximate Area">
                    <input
                      name="shipmentWeight"
                      value={formData.shipmentWeight}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="e.g. 10,000 sq. ft. or 1,000 sq. m."
                    />
                  </Field>
                  <Field label="Project Type">
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
                    placeholder="e.g. We require a 10,000 sq. ft. pre-engineered warehouse with supply and erection. Please share an estimated cost and timeline."
                  />
                </Field>

                {/* Attachments (Optional) Upload Field */}
                <Field label="Attachments (Optional)">
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Upload drawings, project images, PDFs, or other relevant documents to help us understand your requirements.
                    </p>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          handleFilesAdded(e.dataTransfer.files);
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative flex flex-col items-center justify-center rounded-sm border-2 border-dashed p-6 text-center transition cursor-pointer ${
                        isDragging
                          ? "border-accent bg-accent/5"
                          : "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-accent hover:bg-slate-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleFilesAdded(e.target.files);
                            e.target.value = "";
                          }
                        }}
                      />
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                        <Paperclip size={20} />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Choose files or drag and drop here
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Accepted formats: JPG, JPEG, PNG, WEBP, PDF · File size limit: 10 MB per file
                      </p>
                    </div>

                    {/* Attached files list */}
                    {attachments.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Attached Files ({attachments.length}):
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {attachments.map((file, idx) => {
                            const isPdf = file.name.toLowerCase().endsWith(".pdf");
                            return (
                              <div
                                key={`${file.name}-${idx}`}
                                className="flex items-center justify-between gap-3 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-xs shadow-xs"
                              >
                                <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                                  <div className="h-7 w-7 rounded bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                    {isPdf ? <FileText size={14} /> : <ImageIcon size={14} />}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-slate-800 dark:text-slate-200 truncate" title={file.name}>
                                      {file.name}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(idx);
                                  }}
                                  className="h-6 w-6 rounded flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition shrink-0 cursor-pointer"
                                  title="Remove file"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:brightness-110 disabled:opacity-50 cursor-pointer"
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

            {/* FAQ Accordion Section */}
            <div className="rounded-sm border bg-card p-6 shadow-xs mt-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h3>

              <div className="divide-y divide-border border-t border-border">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.num} className="py-3.5 first:pt-3.5">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-accent/20 rounded p-1 transition-colors cursor-pointer"
                      >
                        <span className="font-display text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-accent transition-colors leading-snug">
                          <span className="text-accent font-mono mr-2">{faq.num}.</span>
                          {faq.q}
                        </span>
                        <span className="h-6 w-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-accent group-hover:text-white transition shrink-0 mt-0.5">
                          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100 mt-2.5" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-xs text-muted-foreground leading-relaxed pl-7 pr-2 pb-1">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16 md:py-20">
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
