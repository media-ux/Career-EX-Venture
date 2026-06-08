/* EX Venture Careers — interactive app */
const { useState, useMemo, useRef, useLayoutEffect, useEffect } = React;

/* ---------- tiny lucide-style icons ---------- */
const Ico = {
  search: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6"/></svg>
  ),
  arrowR: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  arrowUpR: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
  ),
  pin: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 10c0 4.4-8 12-8 12s-8-7.6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  x: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
};

const APPLY_URL = "https://ex-venture.careers-page.com/";

/* highlight search term */
function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (<>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>);
}

function modeClass(mode) {
  return mode === "Onsite" ? "onsite" : mode === "Remote" ? "remote" : "hybrid";
}

/* ---------- Navbar ---------- */
function Navbar() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(10,10,10,.82)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="https://exventure.co/" style={{ display: "flex", alignItems: "center" }}>
          <img src="assets/logo-mark.png" alt="EX Venture" style={{ height: 50 }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a className="nav-link" href="https://exventure.co/">Company website</a>
          <a className="nav-link" href="https://ex-venture.careers-page.com/about/">About us</a>
          <span style={{ color: "#fff", fontSize: 13.5, fontWeight: 600 }}>Careers</span>
        </div>
        <a className="btn btn-ghost" href="https://exventure.co/" style={{ padding: "9px 18px" }}>
          Visit exventure.co <Ico.arrowUpR style={{ opacity: .6 }} />
        </a>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
function Hero({ roleCount, showPhoto }) {
  return (
    <header style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
      {showPhoto && (
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="assets/cover.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", opacity: .42 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,.55) 0%, rgba(10,10,10,.75) 55%, var(--exv-ink) 100%)" }} />
        </div>
      )}
      <div className="exv-grid-overlay" />
      <div className="exv-orb" style={{ width: 520, height: 520, top: -180, right: -120, background: "rgba(251,47,90,.22)" }} />
      <div className="exv-orb" style={{ width: 380, height: 380, top: 40, left: -140, background: "rgba(56,189,248,.10)" }} />

      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "112px 28px 64px" }}>
        <div className="exv-rise" style={{ animationDelay: ".05s" }}>
          <span className="exv-eyebrow">CAREERS</span>
        </div>
        <h1 className="exv-rise" style={{ animationDelay: ".12s", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 78px)", lineHeight: .98, letterSpacing: "-.025em", margin: "22px 0 0", maxWidth: 900 }}>
          Build what&rsquo;s next.<br />
          <span style={{ color: "var(--fg-3)" }}>On the ground in Bali.</span>
        </h1>
        <p className="exv-rise" style={{ animationDelay: ".2s", fontSize: 18, lineHeight: 1.6, color: "var(--fg-3)", maxWidth: 620, marginTop: 26 }}>
          We work alongside founders, operators and governments to accelerate clean energy, AI and infrastructure. Every role is hands on and onsite, in the room, not behind a desk.
        </p>

        <div className="exv-rise" style={{ animationDelay: ".3s", display: "flex", flexWrap: "wrap", gap: 44, marginTop: 48 }}>
          <Stat n={roleCount} label="Open Roles" />
          <Stat n="Bali" label="Home Base" />
          <Stat n="16+" label="Nationalities" />
          <Stat n="100" label="Projects" />
        </div>
      </div>
    </header>
  );
}
function Stat({ n, label }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing: "-.03em" }}>{n}</div>
      <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".2em", color: "var(--fg-4)", marginTop: 8 }}>{label}</div>
    </div>
  );
}

/* ---------- detail cell ---------- */
function Detail({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em", color: "var(--fg-5)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15.5, color: "var(--fg)", marginTop: 6 }}>{value}</div>
    </div>
  );
}

/* ---------- Job card ---------- */
function JobCard({ role, q, open, onToggle, delay }) {
  const bodyRef = useRef(null);
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    if (bodyRef.current) setH(open ? bodyRef.current.scrollHeight : 0);
  }, [open, role]);

  return (
    <div className={"job-card exv-rise" + (open ? " open" : "")} style={{ animationDelay: delay + "s" }}>
      <button className="job-head" onClick={onToggle} aria-expanded={open}>
        <div style={{ minWidth: 0 }}>
          <div className="dept-eyebrow">{role.dept}</div>
          <h3 className="job-title" style={{ marginTop: 9 }}>{highlight(role.title, q)}</h3>
          <p style={{ color: "var(--fg-3)", fontSize: 14.5, lineHeight: 1.55, margin: "10px 0 0", maxWidth: 620 }}>{role.blurb}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, alignItems: "center" }}>
            <span className="loc-badge"><span style={{ color: "var(--exv-magenta)", display: "inline-flex" }}><Ico.pin /></span>Bali &middot; Onsite</span>
            {role.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
          </div>
        </div>
        <span className="chev"><Ico.chevron /></span>
      </button>
      <div className="job-body" style={{ height: h }}>
        <div className="job-body-inner" ref={bodyRef}>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: "28px 56px" }}>
            <Detail label="Location" value="Bali, Indonesia" />
            <Detail label="Format" value="Onsite only" />
            <Detail label="Duration" value={role.tags[1] === "Spanish" ? "4\u20136 months" : role.tags[1] || "4\u20136 months"} />
            <Detail label="Department" value={role.dept} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <a className="btn btn-apply" href={"Apply.html?slug=" + role.id}>
              Apply now <span className="arr"><Ico.arrowR /></span>
            </a>
            <a className="btn btn-ghost" href={role.detailUrl || APPLY_URL} {...(role.detailUrl ? {} : { target: "_blank", rel: "noreferrer" })}>
              {role.detailUrl ? "View full role" : "Learn more"} <Ico.arrowUpR style={{ opacity: .6 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- App ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#fb2f5a",
  "heroPhoto": true,
  "singleOpen": true
}/*EDITMODE-END*/;

function App() {
  const data = window.CAREERS_DATA;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [openSet, setOpenSet] = useState({});

  useEffect(() => {
    document.documentElement.style.setProperty("--exv-magenta", t.accent);
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  const deptCounts = useMemo(() => {
    const m = { All: data.roles.length };
    data.departments.forEach((d) => { m[d] = data.roles.filter((r) => r.dept === d).length; });
    return m;
  }, [data]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return data.roles.filter((r) => {
      if (dept !== "All" && r.dept !== dept) return false;
      if (!ql) return true;
      return (r.title + " " + r.blurb + " " + r.dept).toLowerCase().includes(ql);
    });
  }, [data, q, dept]);

  const isOpen = (id) => (t.singleOpen ? openId === id : !!openSet[id]);
  const toggle = (id) => {
    if (t.singleOpen) setOpenId((p) => (p === id ? null : id));
    else setOpenSet((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    <div>
      <Navbar />
      <Hero roleCount={data.roles.length} showPhoto={t.heroPhoto} />

      {/* toolbar */}
      <div className="toolbar-sticky">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 28px" }}>
          <div className="search-wrap" style={{ maxWidth: 560 }}>
            <span style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: "var(--fg-4)" }}><Ico.search /></span>
            <input className="search-input" placeholder="Search roles or skills…" value={q} onChange={(e) => setQ(e.target.value)} />
            {q && <button onClick={() => setQ("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "var(--surface-3)", border: 0, color: "var(--fg-3)", width: 28, height: 28, borderRadius: 9999, cursor: "pointer", display: "grid", placeItems: "center" }}><Ico.x /></button>}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16, overflowX: "auto", paddingBottom: 2 }}>
            <Chip label="All roles" active={dept === "All"} count={deptCounts.All} onClick={() => setDept("All")} />
            {data.departments.map((d) => (
              <Chip key={d} label={d} active={dept === d} count={deptCounts[d]} onClick={() => setDept(d)} />
            ))}
          </div>
        </div>
      </div>

      {/* list */}
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 28px 100px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-4)" }}>
            <span style={{ color: "var(--exv-magenta)" }}>{filtered.length}</span> {filtered.length === 1 ? "role" : "roles"}
            {dept !== "All" && <span> · {dept}</span>}
            {q && <span> · &ldquo;{q}&rdquo;</span>}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--fg-5)" }}>Bali, Indonesia · Onsite · 4 to 6 month programs</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((r, i) => (
            <JobCard key={r.id} role={r} q={q} open={isOpen(r.id)} onToggle={() => toggle(r.id)} delay={Math.min(i * 0.05, 0.4)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed var(--border-2)", borderRadius: "var(--r-xl)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>No roles match that search</div>
            <p style={{ color: "var(--fg-4)", marginTop: 8 }}>Try a different keyword, or clear your filters.</p>
            <button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => { setQ(""); setDept("All"); }}>Reset filters</button>
          </div>
        )}
      </main>

      <Footer />
      <TweaksUI t={t} setTweak={setTweak} />
    </div>
  );
}

function Chip({ label, active, count, onClick }) {
  return (
    <button className={"filter-chip" + (active ? " active" : "")} onClick={onClick}>
      {label}<span className="ct">{count}</span>
    </button>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer style={{ background: "var(--bg-sunken)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 28px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40 }}>
          <div>
            <img src="assets/logo-white.png" alt="EX Venture" style={{ height: 30 }} />
            <p style={{ color: "var(--fg-4)", fontSize: 14, marginTop: 18, maxWidth: 320 }}>Think Unlimited. Infrastructure for builders. Deep tech investment &amp; advisory across clean energy, AI and infrastructure.</p>
          </div>
          <div>
            <div className="dept-eyebrow" style={{ marginBottom: 16 }}>Navigation</div>
            <FCol items={[["Company website", "https://exventure.co/"], ["About us", "https://ex-venture.careers-page.com/about/"], ["All openings", "#"]]} />
          </div>
          <div>
            <div className="dept-eyebrow" style={{ marginBottom: 16 }}>Locations</div>
            <FCol items={[["Bali, Indonesia", "#"], ["Fort Lauderdale, US", "#"], ["Germany", "#"]]} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12.5, color: "var(--fg-5)" }}>© 2026 EX Venture. All rights reserved.</span>
          <span style={{ fontSize: 12.5, color: "var(--fg-5)" }}>Operator-led · 16+ countries</span>
        </div>
      </div>
    </footer>
  );
}
function FCol({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map(([l, h]) => <a key={l} className="nav-link" href={h} style={{ fontSize: 14 }}>{l}</a>)}
    </div>
  );
}

/* ---------- Tweaks ---------- */
function TweaksUI({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Brand" />
      <TweakColor label="Accent" value={t.accent} options={["#fb2f5a", "#b5165f", "#960320", "#fbbf24"]} onChange={(v) => setTweak("accent", v)} />
      <TweakSection label="Hero" />
      <TweakToggle label="Hero photo" value={t.heroPhoto} onChange={(v) => setTweak("heroPhoto", v)} />
      <TweakSection label="Job cards" />
      <TweakToggle label="One card open at a time" value={t.singleOpen} onChange={(v) => setTweak("singleOpen", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
