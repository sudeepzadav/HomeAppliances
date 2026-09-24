import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MdKitchen,
  MdLocalLaundryService,
  MdAcUnit,
  MdMicrowave,
  MdTv,
  MdWaterDrop,
} from "react-icons/md";
import { Check, Clock, ShieldCheck, Wallet } from "lucide-react";
import axiosInstance from "../Utils/axiosInstance";

type BookingProps = {
  user: any;
};

const services = [
  { id: "refrigerator", name: "Refrigerator", icon: MdKitchen },
  { id: "washing-machine", name: "Washing Machine", icon: MdLocalLaundryService },
  { id: "ac", name: "Air Conditioner", icon: MdAcUnit },
  { id: "microwave", name: "Microwave", icon: MdMicrowave },
  { id: "tv", name: "LED TV", icon: MdTv },
  { id: "water-purifier", name: "Water Purifier", icon: MdWaterDrop },
];

const timeSlots = [
  "9:00 AM - 12:00 PM",
  "12:00 PM - 3:00 PM",
  "3:00 PM - 6:00 PM",
];

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

// Today's date as YYYY-MM-DD in local time (used to block past dates)
const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const formatDate = (value: string) =>
  value
    ? new Date(value + "T00:00:00").toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const Booking = ({ user }: BookingProps) => {
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [issue, setIssue] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = services.find((s) => s.id === service);

  const resetForm = () => {
    setService("");
    setIssue("");
    setDate("");
    setTimeSlot("");
    setPhone("");
    setAddress("");
    setError("");
    setConfirmed(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!service) return setError("Please choose the appliance you need fixed.");
    if (!timeSlot) return setError("Please choose a time slot.");

    setLoading(true);
    try {
      await axiosInstance.post("/bookings", {
        service,
        issue,
        date,
        timeSlot,
        name,
        phone,
        address,
      });
      setConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "We couldn't complete your booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Confirmation screen ---------- */
  if (confirmed) {
    return (
      <div className="bg-slate-50 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 ring-8 ring-blue-100">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
            Your booking is confirmed
          </h1>
          <p className="mt-2 text-slate-600">
            A technician will call you on {phone} before arriving.
          </p>

          <dl className="mt-8 space-y-3 rounded-2xl bg-slate-50 p-5 text-left text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Appliance</dt>
              <dd className="font-medium">{selectedService?.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Date</dt>
              <dd className="font-medium">{formatDate(date)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Time</dt>
              <dd className="font-medium">{timeSlot}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Address</dt>
              <dd className="text-right font-medium">{address}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to home
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              Book another service
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Booking form ---------- */
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Book a technician
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Tell us what's broken and when you're free. We'll confirm by phone
            and arrive within your chosen time slot.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {/* 1. Appliance */}
            <section>
              <h2 className="text-lg font-semibold">What needs fixing?</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {services.map((s) => {
                  const Icon = s.icon;
                  const active = service === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-5 text-sm font-medium transition ${
                        active
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      <Icon
                        className={`text-3xl ${
                          active ? "text-blue-600" : "text-slate-500"
                        }`}
                      />
                      {s.name}
                    </button>
                  );
                })}
              </div>

              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Describe the problem (optional)
                </span>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  rows={3}
                  placeholder="e.g. Fridge is running but not cooling"
                  className={inputClass}
                />
              </label>
            </section>

            {/* 2. Date and time */}
            <section>
              <h2 className="text-lg font-semibold">When are you free?</h2>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Date
                </span>
                <input
                  type="date"
                  value={date}
                  min={getToday()}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                  required
                />
              </label>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {timeSlots.map((slot) => {
                  const active = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`rounded-xl border-2 px-3 py-3 text-sm font-medium transition ${
                        active
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3. Contact */}
            <section>
              <h2 className="text-lg font-semibold">Where should we come?</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Phone number
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    pattern="[0-9+\s-]{7,15}"
                    title="Enter a valid phone number"
                    className={inputClass}
                    required
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full address
                </span>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  placeholder="Area, street, house number, nearby landmark"
                  className={inputClass}
                  required
                />
              </label>
            </section>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm booking"}
            </button>
          </form>

          {/* SUMMARY */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl bg-linear-to-br from-blue-600 to-blue-800 p-6 text-white shadow-xl sm:p-8">
              <h2 className="text-lg font-semibold">Your booking</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-blue-200">Appliance</dt>
                  <dd className="mt-0.5 text-base font-medium">
                    {selectedService?.name ?? "Not selected yet"}
                  </dd>
                </div>
                <div>
                  <dt className="text-blue-200">Date</dt>
                  <dd className="mt-0.5 text-base font-medium">
                    {date ? formatDate(date) : "Not selected yet"}
                  </dd>
                </div>
                <div>
                  <dt className="text-blue-200">Time</dt>
                  <dd className="mt-0.5 text-base font-medium">
                    {timeSlot || "Not selected yet"}
                  </dd>
                </div>
              </dl>
            </div>

            <ul className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                You see the price before any work starts.
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                Certified technicians, backed by our workmanship guarantee.
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                Free rescheduling until the day before your visit.
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Booking;