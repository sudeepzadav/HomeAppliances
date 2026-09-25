import {
  Wrench,
  ShieldCheck,
  Clock,
  Users,
  Award,
  MapPin,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router";

interface Stat {
  value: string;
  label: string;
}

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  span: string; 
  featured?: boolean;
}

interface TimelineItem {
  year: string;
  text: string;
}

const stats: Stat[] = [
  { value: "10K+", label: "Happy customers" },
  { value: "50+", label: "Certified technicians" },
  { value: "24/7", label: "Support availability" },
  { value: "99%", label: "First-visit success rate" },
];

const values: Value[] = [
  {
    icon: ShieldCheck,
    title: "Reliability first",
    description:
      "Every technician is background-checked and certified before they ever visit your home.",
    span: "md:col-span-2",
    featured: true,
  },
  {
    icon: Clock,
    title: "Speed that matters",
    description:
      "Appliances break at the worst times. We reach most customers within a few hours, not days.",
    span: "md:col-span-1",
  },
  {
    icon: Award,
    title: "Fair, upfront pricing",
    description:
      "You see the cost before we start. No surprise fees, no inflated parts markups.",
    span: "md:col-span-1",
  },
  {
    icon: Users,
    title: "Trained for every brand",
    description:
      "From Samsung to LG to Whirlpool, our team trains on the appliances people actually own.",
    span: "md:col-span-2",
  },
];

const timeline: TimelineItem[] = [
  {
    year: "2019",
    text: "Started with three technicians and a single service van, fixing refrigerators across the city.",
  },
  {
    year: "2021",
    text: "Expanded into ACs, washing machines, and microwaves as demand for reliable repair grew.",
  },
  {
    year: "2023",
    text: "Crossed 10,000 completed repairs and built a same-day dispatch system.",
  },
  {
    year: "2026",
    text: "Now serving households daily with a 99% first-visit repair success rate.",
  },
];

const ticketSteps = [
  { label: "Booked", time: "9:02 AM", done: true },
  { label: "Technician assigned", time: "9:15 AM", done: true },
  { label: "On the way", time: "10:05 AM", done: true, current: true },
  { label: "Repaired and tested", time: "Est. 11:00 AM", done: false },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-slate-900">
      
      <section className="relative overflow-hidden bg-linear-to-br from-white via-slate-50 to-blue-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="container relative mx-auto grid items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Built by people who got tired of{" "}
              <span className="text-blue-600">bad repair service.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              HomeFix started because too many repair visits meant waiting all
              week for a technician who showed up without the right part. We
              built a service where booking is simple, technicians are
              trained, and your appliance actually gets fixed on the first
              visit.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
              >
                Book a Service
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Contact us
              </button>
            </div>
          </div>

          
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            <div className="rotate-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Ticket HF-2048</p>
                  <h2 className="mt-1 text-xl font-bold">
                    Refrigerator not cooling
                  </h2>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-slate-300" />

              <ol className="space-y-5">
                {ticketSteps.map((step, i) => (
                  <li key={step.label} className="relative flex gap-4">
                    {i < ticketSteps.length - 1 && (
                      <span
                        className={`absolute left-3.5 top-8 h-[calc(100%-0.5rem)] w-px ${
                          ticketSteps[i + 1].done
                            ? "bg-blue-600"
                            : "bg-slate-200"
                        }`}
                      />
                    )}
                    <span
                      className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        step.done
                          ? "bg-blue-600 text-white"
                          : "border-2 border-slate-200 bg-white"
                      } ${step.current ? "ring-4 ring-blue-100" : ""}`}
                    >
                      {step.done && <Check className="h-4 w-4" />}
                    </span>
                    <div className="flex flex-1 items-baseline justify-between gap-3">
                      <span
                        className={`font-medium ${
                          step.done ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="text-sm text-slate-500">
                        {step.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

     
      <section className="bg-blue-600 mx-20 border-0 rounded-lg">
        <div className="container mx-auto grid grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our mission is simple.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              A broken fridge or a washing machine that won't drain isn't just
              an inconvenience. It disrupts your whole day. We exist to take
              that stress off your hands with technicians who know what
              they're doing and pricing you can trust before they pick up a
              tool.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Every technician on our team is certified on the appliance
              brands they service, and every job is backed by our workmanship
              guarantee.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">What we repair</h3>
                <p className="mt-1 text-slate-600">
                  Refrigerators, washing machines, ACs, microwaves, and water
                  purifiers: the appliances your household depends on daily.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Where we operate</h3>
                <p className="mt-1 text-slate-600">
                  Doorstep service across the city, with technicians
                  dispatched from the location nearest to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES (bento grid) */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            What we hold ourselves to
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={`${value.span} rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-xl ${
                    value.featured
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "border border-slate-200 bg-white"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      value.featured ? "bg-white/15" : "bg-blue-50"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        value.featured ? "text-white" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                  <p
                    className={`mt-2 max-w-md leading-relaxed ${
                      value.featured ? "text-blue-50" : "text-slate-600"
                    }`}
                  >
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How we got here
        </h2>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* horizontal line on desktop */}
          <div className="absolute left-0 right-0 top-2.5 hidden h-px bg-slate-200 lg:block" />

          {timeline.map((item) => (
            <div key={item.year} className="relative border-l-2 border-slate-200 pl-6 lg:border-l-0 lg:pl-0 lg:pt-10">
              <span className="absolute -left-2.25 top-1 h-4 w-4 rounded-full border-4 border-white bg-blue-600 ring-1 ring-blue-600 lg:left-0 lg:top-0.5" />
              <div className="text-2xl font-bold text-blue-600">
                {item.year}
              </div>
              <p className="mt-2 leading-relaxed text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-800 px-8 py-12 sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Something broken at home?
              </h3>
              <p className="mt-2 text-blue-100">
                Book a technician and we'll be there within a few hours.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Book a Service
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}