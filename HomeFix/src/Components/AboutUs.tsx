import {
  Wrench,
  ShieldCheck,
  Clock,
  Users,
  Award,
  MapPin,
  type LucideIcon,
} from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TimelineItem {
  year: string;
  text: string;
}

const stats: Stat[] = [
  { value: "10K+", label: "Happy Customers" },
  { value: "50+", label: "Certified Technicians" },
  { value: "24/7", label: "Support Availability" },
  { value: "99%", label: "Success Rate" },
];

const values: Value[] = [
  {
    icon: ShieldCheck,
    title: "Reliability First",
    description:
      "Every technician is background-checked and certified before they ever visit your home.",
  },
  {
    icon: Clock,
    title: "Speed That Matters",
    description:
      "Appliances break at the worst times. We reach most customers within a few hours, not days.",
  },
  {
    icon: Award,
    title: "Fair, Upfront Pricing",
    description:
      "You see the cost before we start. No surprise fees, no inflated parts markups.",
  },
  {
    icon: Users,
    title: "Trained for Every Brand",
    description:
      "From Samsung to LG to Whirlpool, our team trains on the appliances people actually own.",
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

export default function AboutUs() {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="mx-auto  px-6 pt-20 pb-16">
        <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
          About HomeFix
        </span>
        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
          Built by people who got tired of{" "}
          <span className="text-blue-600">bad repair service.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          HomeFix started because too many repair visits meant waiting all
          week for a technician who showed up without the right part. We
          built a service where booking is simple, technicians are trained,
          and your appliance actually gets fixed on the first visit.
        </p>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-blue-600 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our mission is simple.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              A broken fridge or a washing machine that won't drain isn't
              just an inconvenience — it disrupts your whole day. We exist to
              take that stress off your hands with technicians who know what
              they're doing and pricing you can trust before they even pick
              up a tool.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Every technician on our team is certified on the specific
              appliance brands they service, and every job is backed by our
              workmanship guarantee.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">What we repair</div>
                <p className="mt-1 text-sm text-slate-600">
                  Refrigerators, washing machines, ACs, microwaves, and water
                  purifiers — the appliances your household depends on daily.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Where we operate</div>
                <p className="mt-1 text-sm text-slate-600">
                  Doorstep service across the city, with technicians
                  dispatched from the location nearest to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What we hold ourselves to
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How we got here
        </h2>
        <div className="mt-10 space-y-8 border-l border-slate-200 pl-8">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <div className="absolute -left-9.25 top-1.5 h-2.5 w-2.5 rounded-full bg-blue-600" />
              <div className="text-sm font-semibold text-blue-600">
                {item.year}
              </div>
              <p className="mt-1 max-w-2xl text-base leading-relaxed text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-blue-600 px-8 py-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Something broken at home?
            </h3>
            <p className="mt-2 text-blue-50">
              Book a technician and we'll be there within a few hours.
            </p>
          </div>
          <button className="shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
            Book a Service
          </button>
        </div>
      </section>
    </div>
  );
}