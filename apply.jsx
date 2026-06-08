/* EX Venture — Apply flow (data-driven via ?slug=) */
const { useState, useRef, useEffect } = React;

const AJOB = (() => {
  const slug = new URLSearchParams(location.search).get("slug");
  return (window.JOBS || []).find((j) => j.slug === slug) || (window.JOBS || [])[0];
})();
const JOB_URL = "Job.html?slug=" + AJOB.slug;
const OFFICIAL = "https://ex-venture.careers-page.com/jobs/" + AJOB.applyId + "/apply";
document.title = "Apply · " + AJOB.headline + " · EX Venture";

const A = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const Ic = {
  pin: (p) => <svg viewBox="0 0 24 24" width="15" height="15" {...A} {...p}><path d="M20 10c0 4.4-8 12-8 12s-8-7.6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  building: (p) => <svg viewBox="0 0 24 24" width="15" height="15" {...A} {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" width="15" height="15" {...A} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  cal: (p) => <svg viewBox="0 0 24 24" width="15" height="15" {...A} {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  globe: (p) => <svg viewBox="0 0 24 24" width="15" height="15" {...A} {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...A} strokeWidth="3" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  checkBig: (p) => <svg viewBox="0 0 24 24" width="40" height="40" {...A} strokeWidth="2.4" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  upload: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...A} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>,
  doc: (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...A} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>,
  x: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...A} {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  arrowR: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...A} {...p}><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  arrowL: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...A} {...p}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  arrowUpR: (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...A} {...p}><path d="M7 17 17 7M7 7h10v10"/></svg>,
  lock: (p) => <svg viewBox="0 0 24 24" width="13" height="13" {...A} {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
};

const BLANK = {
  firstName: "", lastName: "", email: "", dialCode: "+62", phone: "", city: "", linkedin: "",
  cvName: "", cvSize: 0, ack: false, consent: false,
};
const STORE_KEY = "exv_apply_" + AJOB.slug;

function loadState() {
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); return s ? { ...BLANK, ...s } : { ...BLANK }; }
  catch (e) { return { ...BLANK }; }
}

function needsSpanish() { return /spanish/i.test(AJOB.language || ""); }

function Eyebrow({ children }) { return <span className="exv-eyebrow">{children}</span>; }

/* ---------- field helpers ---------- */
function Field({ label, required, optional, error, hint, children }) {
  return (
    <div className={"field" + (error ? " err" : "")}>
      {label && <label className="lbl">{label}{required && <span className="req">*</span>}{optional && <span className="opt">optional</span>}</label>}
      {children}
      {hint && <div className="hint">{hint}</div>}
      <div className="err-msg">{error || "This field is required"}</div>
    </div>
  );
}

/* ---------- upload ---------- */
function CVUpload({ name, size, onPick, onClear, error }) {
  const ref = useRef(null);
  const [drag, setDrag] = useState(false);
  const handle = (file) => { if (file) onPick(file.name, file.size); };
  const fmt = (b) => b ? (b < 1024 * 1024 ? Math.max(1, Math.round(b / 1024)) + " KB" : (b / 1048576).toFixed(1) + " MB") : "";
  return (
    <div className={"field" + (error ? " err" : "")}>
      <label className="lbl">Resume / CV<span className="req">*</span></label>
      {name ? (
        <div className="file-pill">
          <span className="fp-ico"><Ic.doc /></span>
          <span className="fp-name">{name}</span>
          <span className="fp-size">{fmt(size)}</span>
          <button type="button" className="fp-x" onClick={onClear} aria-label="Remove file"><Ic.x /></button>
        </div>
      ) : (
        <div className={"upload" + (drag ? " drag" : "")}
          onClick={() => ref.current && ref.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}>
          <div className="u-ico"><Ic.upload /></div>
          <div className="u-t">Drop your CV here, or <b>browse</b></div>
          <div className="u-d">PDF, DOC or DOCX · up to 10 MB</div>
          <input ref={ref} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={(e) => handle(e.target.files[0])} />
        </div>
      )}
      <div className="err-msg">Please attach your CV</div>
    </div>
  );
}

/* ---------- acknowledgement ---------- */
function Ack({ checked, onToggle, error, children }) {
  return (
    <div className={"field" + (error ? " err" : "")} style={{ marginBottom: 0 }}>
      <div className={"ack" + (checked ? " checked" : "")} onClick={onToggle} role="checkbox" aria-checked={checked} tabIndex={0}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onToggle(); } }}>
        <span className="box"><Ic.check /></span>
        <span className="ack-t">{children}</span>
      </div>
      <div className="err-msg" style={{ marginTop: 8 }}>Please confirm to continue</div>
    </div>
  );
}

/* ---------- aside ---------- */
function RoleSummary() {
  const facts = [
    { i: Ic.pin, t: "Bali, Indonesia" },
    { i: Ic.building, t: "Onsite only" },
    { i: Ic.clock, t: AJOB.hours.split(" · ")[0] },
    { i: Ic.cal, t: AJOB.duration },
  ];
  if (AJOB.language) facts.push({ i: Ic.globe, t: AJOB.language });
  return (
    <aside className="ap-aside">
      <div className="role-card">
        <div className="rc-photo"><img src={AJOB.heroImg} alt="" /></div>
        <div className="rc-body">
          <div className="rc-dept">{AJOB.dept}</div>
          <h2 className="rc-title">{AJOB.headline}</h2>
          <div style={{ marginTop: 14, borderTop: "1px solid var(--border)", paddingTop: 6 }}>
            {facts.map((f, i) => <div className="rc-fact" key={i}><f.i />{f.t}</div>)}
          </div>
          <a className="nav-link" href={JOB_URL} style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, color: "var(--exv-magenta)" }}>
            View full role <Ic.arrowUpR style={{ opacity: .7 }} />
          </a>
        </div>
      </div>

      <div className="next-card">
        <div className="exv-eyebrow" style={{ marginBottom: 14 }}>WHAT HAPPENS NEXT</div>
        {[["1", "We review every application personally."], ["2", "Shortlisted candidates get an interview invite."], ["3", "A short conversation about you and Bali."], ["4", "Offer, then plan your relocation."]].map(([n, t]) => (
          <div className="next-step" key={n}><span className="ns-n">{n}</span><span>{t}</span></div>
        ))}
      </div>

      <div className="note-card">
        Heads up: this is an unpaid internship with mandatory onsite relocation to Bali. Lunch is provided every workday. Accommodation, visa and flights are not covered.
      </div>
    </aside>
  );
}

/* ---------- single-step form ---------- */
function ApplyForm({ d, set, errs }) {
  return (
    <div>
      <div className="step-eyebrow"><Eyebrow>APPLICATION</Eyebrow></div>
      <h1 className="step-h">Apply for this role</h1>
      <p className="step-sub">It takes about three minutes. Tell us who you are and attach your CV. We read every application personally.</p>

      <div className="field-row">
        <Field label="First name" required error={errs.firstName}><input className="inp" value={d.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Maria" /></Field>
        <Field label="Last name" required error={errs.lastName}><input className="inp" value={d.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Garcia" /></Field>
      </div>
      <Field label="Email" required error={errs.email}><input className="inp" type="email" value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="maria@email.com" /></Field>
      <Field label="Phone" required error={errs.phone}>
        <div className="phone-grp">
          <input className="inp" value={d.dialCode} onChange={(e) => set("dialCode", e.target.value)} aria-label="Country code" />
          <input className="inp" type="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} placeholder="812 3456 7890" />
        </div>
      </Field>
      <div className="field-row">
        <Field label="Current city & country" required error={errs.city}><input className="inp" value={d.city} onChange={(e) => set("city", e.target.value)} placeholder="Madrid, Spain" /></Field>
        <Field label="LinkedIn profile" optional><input className="inp" value={d.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="linkedin.com/in/…" /></Field>
      </div>

      <CVUpload name={d.cvName} size={d.cvSize} error={errs.cvName}
        onPick={(n, s) => { set("cvName", n); set("cvSize", s); }} onClear={() => { set("cvName", ""); set("cvSize", 0); }} />

      <div style={{ marginTop: 28, marginBottom: 4 }}><Eyebrow>BEFORE YOU SUBMIT</Eyebrow></div>
      <div style={{ marginTop: 14 }}>
        <Ack checked={d.ack} onToggle={() => set("ack", !d.ack)} error={errs.ack}>
          I understand this is an <strong style={{ color: "#fff" }}>unpaid internship, onsite in Bali</strong>, and that I am able to relocate at my own cost. Lunch is provided, with a path to paid roles for strong performers.
        </Ack>
        <Ack checked={d.consent} onToggle={() => set("consent", !d.consent)} error={errs.consent}>
          I agree that EX Venture may store and process my data for this application.
        </Ack>
      </div>
    </div>
  );
}


/* ---------- success ---------- */
function Success({ onReset }) {
  return (
    <div className="success-wrap">
      <div className="success-badge"><Ic.checkBig /></div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><Eyebrow>APPLICATION RECEIVED</Eyebrow></div>
      <h1 style={{ fontSize: "clamp(30px,4vw,46px)", lineHeight: 1.05, letterSpacing: "-.02em", margin: 0 }}>Thank you. Your application is in.</h1>
      <p style={{ fontSize: 17, color: "var(--fg-2)", lineHeight: 1.6, marginTop: 18 }}>
        We have received your application for <strong style={{ color: "#fff" }}>{AJOB.headline}</strong>. Our team reads every application personally. If there is a fit, you will hear from us by email within about two weeks.
      </p>
      <div className="success-card">
        <div className="exv-eyebrow" style={{ marginBottom: 14 }}>WHAT HAPPENS NEXT</div>
        {[["1", "We review your application and CV."], ["2", "Shortlisted candidates receive an interview invite by email."], ["3", "A short conversation with the team about you and life in Bali."], ["4", "An offer, then we help you plan your relocation."]].map(([n, t]) => (
          <div className="next-step" key={n}><span className="ns-n">{n}</span><span>{t}</span></div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
        <a className="btn btn-apply" href="Careers.html" style={{ padding: "14px 26px", fontSize: 15 }}>Browse more roles <span className="arr"><Ic.arrowR /></span></a>
        <a className="btn btn-ghost" href="https://exventure.co/" style={{ padding: "14px 26px", fontSize: 15 }}>Visit exventure.co <Ic.arrowUpR style={{ opacity: .6 }} /></a>
      </div>
      <p style={{ fontSize: 12.5, color: "var(--fg-5)", marginTop: 30 }}>
        This is a redesigned preview flow. To submit officially, you can also apply via the <a href={OFFICIAL} target="_blank" rel="noreferrer" style={{ color: "var(--fg-3)", textDecoration: "underline" }}>EX Venture careers portal</a>.
      </p>
    </div>
  );
}

/* ---------- nav ---------- */
function TopBar({ pct }) {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(10,10,10,.85)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--border)" }}>
      <div className="ap-wrap" style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="Careers.html" style={{ display: "flex", alignItems: "center" }}><img src="assets/logo-mark.png" alt="EX Venture" style={{ height: 46 }} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--fg-5)" }}><Ic.lock /> Secure application</div>
        <a className="nav-link" href={JOB_URL} style={{ fontSize: 13 }}>Back to role</a>
      </div>
      <div style={{ height: 2, background: "var(--border)" }}><div style={{ height: "100%", background: "var(--exv-magenta)", width: pct + "%", transition: "width .5s var(--ease-out)" }} /></div>
    </nav>
  );
}

/* ---------- app ---------- */
const REQUIRED = ["firstName", "lastName", "email", "phone", "city", "cvName", "ack", "consent"];

function ApplyApp() {
  const [d, setD] = useState(loadState);
  const [errs, setErrs] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef(null);

  useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(d)); }, [d]);
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));

  const scrollTop = () => { try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (x) { window.scrollTo(0, 0); } };

  const submit = () => {
    const e = {};
    REQUIRED.forEach((k) => {
      const v = d[k];
      if (typeof v === "boolean") { if (!v) e[k] = true; }
      else if (!String(v || "").trim()) e[k] = true;
      else if (k === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) e[k] = "Enter a valid email address";
    });
    setErrs(e);
    if (Object.keys(e).length) {
      const first = document.querySelector(".field.err");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    localStorage.removeItem(STORE_KEY);
    setSubmitted(true);
    scrollTop();
  };

  if (submitted) {
    return (<div ref={topRef}><TopBar pct={100} /><Success /></div>);
  }

  return (
    <div ref={topRef}>
      <TopBar pct={100} />
      <div className="ap-wrap">
        <div className="ap-grid">
          <div>
            <ApplyForm d={d} set={set} errs={errs} />
            <div className="ap-actions">
              <a className="btn btn-ghost" href={JOB_URL} style={{ padding: "13px 22px" }}><Ic.arrowL /> Cancel</a>
              <button className="btn btn-apply" onClick={submit} style={{ padding: "14px 30px", fontSize: 15 }}>Submit application <span className="arr"><Ic.arrowR /></span></button>
            </div>
          </div>
          <RoleSummary />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ApplyApp />);
