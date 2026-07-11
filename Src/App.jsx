import React, { useState } from "react";
import {
  Hammer, MapPin, Star, ShieldCheck, Banknote, ArrowRight, ArrowLeft,
  Check, Briefcase, Clock, Plus, X, Wrench, HardDrive, User, ClipboardList
} from "lucide-react";

const C = {
  bg: "#171713",
  surface: "#211F1B",
  surfaceRaised: "#2A2823",
  yellow: "#F5B700",
  yellowDim: "#8A6600",
  orange: "#D8572A",
  steel: "#5C7FA3",
  green: "#5C8A3F",
  text: "#F2EFE7",
  textMuted: "#9C978A",
  line: "#3A3730",
};

const TRADES = [
  "Groundworker", "Bricklayer", "Carpenter", "Electrician", "Plumber",
  "Scaffolder", "Plasterer", "Painter & Decorator", "General Labourer", "Steel Fixer",
];

const QUALS = ["CSCS Card", "CPCS Ticket", "First Aid", "IPAF", "SSSTS", "SMSTS", "NVQ L2", "NVQ L3"];

const MOCK_JOBS = [
  { id: 1, title: "3x Groundworkers needed", trade: "Groundworker", firm: "Halden Construction", loc: "Leeds", dur: "2 weeks", rate: 190 },
  { id: 2, title: "Bricklayer, new-build estate", trade: "Bricklayer", firm: "Ashfield Homes", loc: "Bradford", dur: "6 weeks", rate: 220 },
  { id: 3, title: "First fix carpenter", trade: "Carpenter", firm: "Marlow Build Co", loc: "Leeds", dur: "10 days", rate: 200 },
  { id: 4, title: "Site electrician cover", trade: "Electrician", firm: "Voltech Ltd", loc: "Wakefield", dur: "3 weeks", rate: 260 },
];

const MOCK_WORKERS = [
  { id: 1, name: "D. Okafor", trade: "Bricklayer", loc: "Leeds", rate: 210, rating: 4.9, jobs: 63, quals: ["CSCS Card", "NVQ L3"] },
  { id: 2, name: "M. Kowalski", trade: "Bricklayer", loc: "Bradford", rate: 195, rating: 4.7, jobs: 41, quals: ["CSCS Card", "SSSTS"] },
  { id: 3, name: "S. Whitfield", trade: "Bricklayer", loc: "Leeds", rate: 225, rating: 5.0, jobs: 88, quals: ["CSCS Card", "NVQ L3", "First Aid"] },
];

function HazardStrip({ h = 10 }) {
  return (
    <div
      style={{
        height: h,
        backgroundImage: `repeating-linear-gradient(45deg, ${C.yellow} 0 14px, #171713 14px 28px)`,
      }}
    />
  );
}

function Badge({ children, tone = "steel" }) {
  const bg = tone === "steel" ? C.steel : tone === "green" ? C.green : C.yellowDim;
  return (
    <span
      className="text-xs px-2 py-1 rounded-sm font-medium tracking-wide"
      style={{ background: bg, color: C.text }}
    >
      {children}
    </span>
  );
}

function Button({ children, onClick, variant = "primary", full, icon: Icon }) {
  const styles = {
    primary: { background: C.yellow, color: "#171713" },
    secondary: { background: "transparent", color: C.text, border: `1px solid ${C.line}` },
    ghost: { background: "transparent", color: C.textMuted },
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-sm font-semibold uppercase tracking-wider text-sm transition-transform active:scale-[0.98] ${full ? "w-full" : ""}`}
      style={styles[variant]}
    >
      {children}
      {Icon && <Icon size={16} />}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  background: C.surfaceRaised,
  border: `1px solid ${C.line}`,
  color: C.text,
};

function Shell({ children, onBack, title }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg, fontFamily: "'Work Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap');
        .disp { font-family: 'Oswald', sans-serif; letter-spacing: 0.02em; }
      `}</style>
      <HazardStrip />
      <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
        {onBack && (
          <button onClick={onBack} className="p-1" style={{ color: C.textMuted }}>
            <ArrowLeft size={20} />
          </button>
        )}
        <Hammer size={20} color={C.yellow} />
        <div>
          <div className="disp text-lg font-semibold" style={{ color: C.text }}>BG LABOURWORKS</div>
          {title && <div className="text-xs" style={{ color: C.textMuted }}>{title}</div>}
        </div>
      </div>
      <div className="flex-1 px-5 py-6 max-w-md w-full mx-auto">{children}</div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [worker, setWorker] = useState({ name: "", trade: TRADES[0], loc: "", rate: "", quals: [] });
  const [job, setJob] = useState({ title: "", trade: TRADES[0], loc: "", dur: "", rate: "" });
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const toggleQual = (q) =>
    setWorker((w) => ({
      ...w,
      quals: w.quals.includes(q) ? w.quals.filter((x) => x !== q) : [...w.quals, q],
    }));

  // ---------- LANDING ----------
  if (screen === "landing") {
    return (
      <Shell>
        <div className="text-center mb-8 mt-4">
          <h1 className="disp text-3xl font-bold mb-2" style={{ color: C.text }}>
            Direct hire.<br />No agency fees.
          </h1>
          <p className="text-sm" style={{ color: C.textMuted }}>
            Register your qualifications, get matched with sites hiring now.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setScreen("worker-signup")}
            className="p-6 rounded-sm text-left"
            style={{ background: C.surface, border: `1px solid ${C.line}` }}
          >
            <Wrench color={C.yellow} className="mb-3" size={24} />
            <div className="disp text-lg font-semibold" style={{ color: C.text }}>I'm a tradesperson</div>
            <div className="text-sm mt-1" style={{ color: C.textMuted }}>Get your Site Pass and find work</div>
          </button>
          <button
            onClick={() => setScreen("employer-post")}
            className="p-6 rounded-sm text-left"
            style={{ background: C.surface, border: `1px solid ${C.line}` }}
          >
            <Briefcase color={C.steel} className="mb-3" size={24} />
            <div className="disp text-lg font-semibold" style={{ color: C.text }}>I'm hiring</div>
            <div className="text-sm mt-1" style={{ color: C.textMuted }}>Post a job, book verified workers</div>
          </button>
        </div>
      </Shell>
    );
  }

  // ---------- WORKER SIGNUP ----------
  if (screen === "worker-signup") {
    return (
      <Shell onBack={() => setScreen("landing")} title="Register — Step 1 of 2">
        <Field label="Full name">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            value={worker.name}
            onChange={(e) => setWorker({ ...worker, name: e.target.value })}
            placeholder="J. Fletcher"
          />
        </Field>
        <Field label="Trade">
          <select
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            value={worker.trade}
            onChange={(e) => setWorker({ ...worker, trade: e.target.value })}
          >
            {TRADES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Base location">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            value={worker.loc}
            onChange={(e) => setWorker({ ...worker, loc: e.target.value })}
            placeholder="Leeds"
          />
        </Field>
        <Field label="Day rate (£)">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            type="number"
            value={worker.rate}
            onChange={(e) => setWorker({ ...worker, rate: e.target.value })}
            placeholder="200"
          />
        </Field>
        <Field label="Qualifications & tickets">
          <div className="flex flex-wrap gap-2">
            {QUALS.map((q) => (
              <button
                key={q}
                onClick={() => toggleQual(q)}
                className="text-xs px-3 py-2 rounded-sm border"
                style={{
                  borderColor: worker.quals.includes(q) ? C.yellow : C.line,
                  color: worker.quals.includes(q) ? C.yellow : C.textMuted,
                  background: worker.quals.includes(q) ? "#2E2A16" : "transparent",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </Field>
        <div className="mt-6">
          <Button full icon={ArrowRight} onClick={() => setScreen("worker-card")}>
            Generate Site Pass
          </Button>
        </div>
      </Shell>
    );
  }

  // ---------- WORKER ID CARD ----------
  if (screen === "worker-card") {
    return (
      <Shell onBack={() => setScreen("worker-signup")} title="Register — Step 2 of 2">
        <div
          className="rounded-md p-5 mb-6 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C.surfaceRaised}, ${C.surface})`, border: `1px solid ${C.line}` }}
        >
          <div className="absolute top-0 right-0"><HazardStrip h={6} /></div>
          <div className="flex justify-between items-start mb-4 mt-2">
            <div>
              <div className="text-xs uppercase tracking-widest" style={{ color: C.textMuted }}>Site Pass</div>
              <div className="disp text-xl font-bold" style={{ color: C.text }}>
                {worker.name || "J. Fletcher"}
              </div>
              <div className="text-sm" style={{ color: C.yellow }}>{worker.trade}</div>
            </div>
            <div
              className="w-14 h-14 rounded-sm flex items-center justify-center"
              style={{ background: C.line }}
            >
              <User size={26} color={C.textMuted} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: C.textMuted }}>
            <MapPin size={14} /> {worker.loc || "Leeds"}
            <span className="mx-1">·</span>
            <Banknote size={14} /> £{worker.rate || "200"}/day
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {(worker.quals.length ? worker.quals : ["CSCS Card"]).map((q) => (
              <Badge key={q}>{q}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: C.green }}>
            <ShieldCheck size={14} /> Pending verification
          </div>
        </div>
        <p className="text-sm mb-4" style={{ color: C.textMuted }}>
          One-off registration fee unlocks your pass and job matching. No further charges until you're booked.
        </p>
        <div
          className="flex justify-between items-center px-4 py-3 rounded-sm mb-4"
          style={{ background: C.surface, border: `1px solid ${C.line}` }}
        >
          <span style={{ color: C.text }}>Registration fee</span>
          <span className="disp font-semibold" style={{ color: C.yellow }}>£15.00</span>
        </div>
        <Button full icon={Check} onClick={() => setScreen("worker-jobs")}>
          Pay & activate pass
        </Button>
      </Shell>
    );
  }

  // ---------- WORKER JOB MATCHES ----------
  if (screen === "worker-jobs") {
    const matches = MOCK_JOBS.filter((j) => j.trade === worker.trade).length
      ? MOCK_JOBS.filter((j) => j.trade === worker.trade)
      : MOCK_JOBS;
    return (
      <Shell onBack={() => setScreen("worker-card")} title="Matched jobs">
        <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: C.green }}>
          <ShieldCheck size={16} /> Pass active — {matches.length} matches near {worker.loc || "you"}
        </div>
        <div className="flex flex-col gap-3">
          {matches.map((j) => (
            <div key={j.id} className="p-4 rounded-sm" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold" style={{ color: C.text }}>{j.title}</div>
                  <div className="text-xs mt-1" style={{ color: C.textMuted }}>{j.firm}</div>
                </div>
                <div className="disp text-lg font-bold" style={{ color: C.yellow }}>£{j.rate}<span className="text-xs" style={{ color: C.textMuted }}>/day</span></div>
              </div>
              <div className="flex gap-3 mt-3 text-xs" style={{ color: C.textMuted }}>
                <span className="flex items-center gap-1"><MapPin size={12} />{j.loc}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{j.dur}</span>
              </div>
              <div className="mt-3">
                <Button onClick={() => { setSelectedJob(j); setScreen("worker-booked"); }}>Apply</Button>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (screen === "worker-booked") {
    return (
      <Shell onBack={() => setScreen("worker-jobs")} title="Application sent">
        <div className="text-center mt-10 mb-8">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: "#2E2A16" }}>
            <Check color={C.yellow} size={28} />
          </div>
          <h2 className="disp text-2xl font-bold mb-2" style={{ color: C.text }}>Application sent</h2>
          <p className="text-sm" style={{ color: C.textMuted }}>
            {selectedJob?.firm} will confirm within 24 hours. No fee is taken until you're booked on site.
          </p>
        </div>
        <Button full variant="secondary" onClick={() => setScreen("landing")}>Back to home</Button>
      </Shell>
    );
  }

  // ---------- EMPLOYER: POST JOB ----------
  if (screen === "employer-post") {
    return (
      <Shell onBack={() => setScreen("landing")} title="Post a job">
        <Field label="Job title">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            placeholder="Bricklayer for new-build estate"
          />
        </Field>
        <Field label="Trade needed">
          <select
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            value={job.trade}
            onChange={(e) => setJob({ ...job, trade: e.target.value })}
          >
            {TRADES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Location">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            value={job.loc}
            onChange={(e) => setJob({ ...job, loc: e.target.value })}
            placeholder="Leeds"
          />
        </Field>
        <Field label="Duration">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            value={job.dur}
            onChange={(e) => setJob({ ...job, dur: e.target.value })}
            placeholder="6 weeks"
          />
        </Field>
        <Field label="Day rate offered (£)">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none"
            style={inputStyle}
            type="number"
            value={job.rate}
            onChange={(e) => setJob({ ...job, rate: e.target.value })}
            placeholder="220"
          />
        </Field>
        <div className="mt-6">
          <Button full icon={ArrowRight} onClick={() => setScreen("employer-matches")}>
            Find matched workers
          </Button>
        </div>
      </Shell>
    );
  }

  // ---------- EMPLOYER: MATCHES ----------
  if (screen === "employer-matches") {
    return (
      <Shell onBack={() => setScreen("employer-post")} title={`Matches for ${job.trade || "your job"}`}>
        <div className="flex flex-col gap-3">
          {MOCK_WORKERS.map((w) => (
            <div key={w.id} className="p-4 rounded-sm" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold" style={{ color: C.text }}>{w.name}</div>
                  <div className="text-xs mt-1" style={{ color: C.textMuted }}>{w.trade} · {w.loc}</div>
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: C.yellow }}>
                  <Star size={14} fill={C.yellow} /> {w.rating}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {w.quals.map((q) => <Badge key={q} tone="green">{q}</Badge>)}
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs" style={{ color: C.textMuted }}>{w.jobs} jobs completed</span>
                <span className="disp font-bold" style={{ color: C.text }}>£{w.rate}/day</span>
              </div>
              <div className="mt-3">
                <Button onClick={() => { setSelectedWorker(w); setScreen("employer-confirm"); }}>Book</Button>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  // ---------- EMPLOYER: BOOKING CONFIRM (fee breakdown) ----------
  if (screen === "employer-confirm") {
    const dayRate = Number(selectedWorker?.rate || 0);
    const days = 5; // demo assumption for a week's booking
    const jobValue = dayRate * days;
    const commissionRate = 0.12;
    const commission = Math.round(jobValue * commissionRate);
    const payout = jobValue - commission;
    return (
      <Shell onBack={() => setScreen("employer-matches")} title="Confirm booking">
        <div className="p-4 rounded-sm mb-4" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
          <div className="font-semibold mb-1" style={{ color: C.text }}>{selectedWorker?.name}</div>
          <div className="text-xs" style={{ color: C.textMuted }}>{selectedWorker?.trade} · {job.loc || selectedWorker?.loc} · {days} days</div>
        </div>
        <div className="p-4 rounded-sm mb-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
          <div className="flex justify-between py-2 text-sm" style={{ color: C.text }}>
            <span>Job value ({days} days × £{dayRate})</span><span>£{jobValue}</span>
          </div>
          <div className="flex justify-between py-2 text-sm" style={{ borderTop: `1px solid ${C.line}`, color: C.textMuted }}>
            <span>Platform fee ({Math.round(commissionRate * 100)}%)</span><span>£{commission}</span>
          </div>
          <div className="flex justify-between py-2 text-sm font-semibold" style={{ borderTop: `1px solid ${C.line}`, color: C.green }}>
            <span>Paid to worker</span><span>£{payout}</span>
          </div>
          <div className="flex justify-between py-2 disp font-bold text-lg" style={{ borderTop: `1px solid ${C.line}`, color: C.yellow }}>
            <span>You pay today</span><span>£{jobValue}</span>
          </div>
        </div>
        <p className="text-xs mb-4" style={{ color: C.textMuted }}>
          Funds are held until the worker confirms the job as complete, then released automatically.
        </p>
        <Button full icon={Check} onClick={() => setScreen("employer-done")}>Confirm & pay</Button>
      </Shell>
    );
  }

  if (screen === "employer-done") {
    return (
      <Shell onBack={() => setScreen("employer-matches")} title="Booking confirmed">
        <div className="text-center mt-10 mb-8">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: "#2E2A16" }}>
            <ClipboardList color={C.yellow} size={28} />
          </div>
          <h2 className="disp text-2xl font-bold mb-2" style={{ color: C.text }}>Booking confirmed</h2>
          <p className="text-sm" style={{ color: C.textMuted }}>
            {selectedWorker?.name} has been notified. Funds are held in escrow until the job's marked complete.
          </p>
        </div>
        <Button full variant="secondary" onClick={() => setScreen("landing")}>Back to home</Button>
      </Shell>
    );
  }

  return null;
}
