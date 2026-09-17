import { useState, type ChangeEvent, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send, type LucideIcon } from "lucide-react";

interface ContactCard {
  icon: LucideIcon;
  title: string;
  lines: string[];
}

interface ContactForm {
  name: string;
  phone: string;
  service: string;
  message: string;
}

const contactCards: ContactCard[] = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["9801234567", "Mon–Sun, 7am–10pm"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@homefix.com", "We reply within a few hours"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Service Road", "Kathmandu, Nepal"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["24/7 emergency support", "Standard visits 7am–10pm"],
  },
];

const services: string[] = [
  "Refrigerator Repair",
  "Washing Machine Repair",
  "AC Repair",
  "Microwave Repair",
  "Water Purifier Repair",
  "Something else",
];

export default function ContactUs() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    phone: "",
    service: services[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    // Wire this up to your backend endpoint, e.g.:
    // await fetch("/api/v1/contact", { method: "POST", body: JSON.stringify(form) })
    setSubmitted(true);
  }

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="px-6 pt-20 pb-16">
        <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
          Contact Us
        </span>
        <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
          Tell us what's broken.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Call us for same-day service, or send a message below and a member
          of our team will get back to you shortly.
        </p>
      </section>

      {/* Contact info cards */}
      <section className=" px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-slate-600">
                    {line}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + map */}
      <section className="px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Send a message
            </h2>
            <p className="mt-3 text-slate-600">
              Give us a few details and we'll match you with the right
              technician.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <p className="font-semibold text-blue-700">
                  Message sent.
                </p>
                <p className="mt-1 text-sm text-blue-600">
                  We'll reach out to you shortly at the number you provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Service needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Briefly describe the issue"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Map / location panel */}
          <div className="flex flex-col gap-6">
            <div className="flex h-72 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 lg:h-full">
              {/* Swap this block for an embedded Google Map iframe */}
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-blue-600" />
                <p className="mt-2 text-sm text-slate-500">
                  Map embed goes here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-blue-600 px-8 py-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Need help right now?
            </h3>
            <p className="mt-2 text-blue-50">
              Skip the form and call us directly for urgent repairs.
            </p>
          </div>
          <a
            href="tel:9801234567"
            className="shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Call Us: 9801234567
          </a>
        </div>
      </section>
    </div>
  );
}