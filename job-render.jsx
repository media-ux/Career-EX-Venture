/* EX Venture — generic job detail renderer. Reads ?slug= from window.JOBS. */
const { useState, useRef, useLayoutEffect } = React;

const JOB = (() => {
  const slug = new URLSearchParams(location.search).get("slug");
  return (window.JOBS || []).find((j) => j.slug === slug) || (window.JOBS || [])[0];
})();
const APPLY = JOB.applyUrl || ("Apply.html?slug=" + JOB.slug);
const REFER = "https://ex-venture.careers-page.com/jobs/" + JOB.applyId + "/refer";
document.title = JOB.headline + " · EX Venture";

/* ---------- icons ---------- */
const SS = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const I = {
  pin: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...SS} {...p}><path d="M20 10c0 4.4-8 12-8 12s-8-7.6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  building: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...SS} {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...SS} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  cal: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...SS} {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  globe: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...SS} {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>,
  zap: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...SS} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="13" height="13" {...SS} strokeWidth="3" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  doc: (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...SS} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>,
  users: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...SS} {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  utensils: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...SS} {...p}><path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M21 15V2a5 5 0 0 0-3 5v6h3Zm0 0v7"/></svg>,
  wifi: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...SS} {...p}><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 20 0"/><circle cx="12" cy="20" r="1"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...SS} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>,
  home: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...SS} {...p}><path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>,
  rocket: (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...SS} {...p}><path d="M4.5 16.5 3 21l4.5-1.5M9 15l-3-3 1-3a9 9 0 0 1 9-6 9 9 0 0 1-6 9l-3 1Z"/><circle cx="14" cy="10" r="1.5"/></svg>,
  arrowR: (p) => <svg viewBox="0 0 24 24" width="16" height="16" {...SS} {...p}><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  arrowUpR: (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...SS} {...p}><path d="M7 17 17 7M7 7h10v10"/></svg>,
  chev: (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...SS} {...p}><path d="m6 9 6 6 6-6"/></svg>,
  info: (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...SS} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>,
  share: (p) => <svg viewBox="0 0 24 24" width="15" height="15" {...SS} {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5"/></svg>,
  play: (p) => <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" stroke="none" {...p}><path d="M7 4.5v15a1 1 0 0 0 1.5.87l13-7.5a1 1 0 0 0 0-1.74l-13-7.5A1 1 0 0 0 7 4.5Z"/></svg>,
};

/* benefit -> icon by keyword */
function offerIcon(t) {
  const s = t.toLowerCase();
  if (/(hour|week|11)/.test(s)) return I.clock;
  if (/lunch/.test(s)) return I.utensils;
  if (/(international|global)/.test(s)) return I.globe;
  if (/network/.test(s)) return I.users;
  if (/(housing|home|living)/.test(s)) return I.home;
  if (/remote/.test(s)) return I.wifi;
  if (/(future|opportunit|paid|transition)/.test(s)) return I.rocket;
  return I.spark;
}

const TRUST = [
  { n: "1000+", l: "Investors" }, { n: "$150M+", l: "Raised by team" },
  { n: "65+", l: "Companies advised" }, { n: "100+", l: "Gov. grants" }, { n: "16+", l: "Countries" },
];
const STEPS = [
  { t: "Apply", d: "Submit your application in about five minutes. We read every one." },
  { t: "Screening", d: "We review your fit on skills, mindset and language." },
  { t: "Interview", d: "A conversation with the team about you, the role and life in Bali." },
  { t: "Offer & relocate", d: "Accept, plan your move and start on the ground in Bali, as soon as possible." },
];
const TESTIMONIALS = [
  { q: "I shipped real work into a live business in my second week. No other internship moves this fast.", nm: "María G.", rl: "Intern '25 · now Full time", c: "#fb2f5a" },
  { q: "The 25 hour week sounds short until you see how much you build. Mornings on projects, afternoons exploring the island.", nm: "Daniel R.", rl: "Intern · Madrid to Bali", c: "#b5165f" },
  { q: "Sitting in rooms with founders and operators taught me more than two years of theory ever did.", nm: "Priya S.", rl: "Intern · London to Bali", c: "#960320" },
];

function buildFacts(j) {
  const f = [
    { ico: I.pin, label: "Bali, Indonesia" },
    { ico: I.building, label: "Onsite only" },
    { ico: I.clock, label: j.hours },
    { ico: I.cal, label: j.duration },
  ];
  if (j.language) f.push({ ico: I.globe, label: j.language });
  f.push({ ico: I.zap, label: "Start " + j.start });
  return f;
}
function buildFaqs(j) {
  const faqs = [
    { q: "Is this internship paid?", a: "No, this is an unpaid internship. What you get instead is free lunch every workday, real hands-on experience, and a clear path: strong performers transition into full time roles." },
    { q: "What is covered, and what is not?", a: "Lunch every workday is on us. Accommodation, visa and flights are not covered. You arrange and fund your own relocation to Bali." },
    { q: "Do I have to relocate to Bali?", a: "Yes. This role is onsite only with mandatory relocation to Bali, Indonesia. There is no remote option during the internship." },
  ];
  if (/spanish/i.test(j.language || "")) faqs.push({ q: "Do I really need to speak Spanish?", a: "Yes. Fluent Spanish and English are both mandatory, as you will work directly with Spanish speaking clients, partners and stakeholders." });
  faqs.push({ q: "What are the working hours?", a: "Working hours are " + j.hours.replace("·", "and").replace("hrs/week", "hours a week") + ", Monday to Friday." });
  faqs.push({ q: "Should I apply if I do not meet every requirement?", a: "Yes. We encourage you to apply even if you do not meet every requirement. We value diverse experiences and people eager to grow." });
  return faqs;
}

function Eyebrow({ children }) { return <span className="exv-eyebrow">{children}</span>; }

function TopNav() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(10,10,10,.82)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--border)" }}>
      <div className="jd-wrap" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="Careers.html" style={{ display: "flex", alignItems: "center" }}><img src="assets/logo-mark.png" alt="EX Venture" style={{ height: 50 }} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a className="nav-link" href="https://exventure.co/">Company website</a>
          <a className="nav-link" href="Careers.html">All roles</a>
        </div>
        <a className="btn btn-apply" href={APPLY} style={{ padding: "10px 20px" }}>Apply now <span className="arr"><I.arrowR /></span></a>
      </div>
    </nav>
  );
}

function Hero({ j }) {
  const facts = buildFacts(j);
  return (
    <header className="jd-hero">
      <div className="jd-hero-photo"><img src={j.heroImg} alt="" /></div>
      <div className="exv-grid-overlay" />
      <div className="exv-orb" style={{ width: 480, height: 480, top: -160, right: -120, background: "rgba(251,47,90,.22)" }} />
      <div className="jd-wrap" style={{ position: "relative", padding: "26px 28px 56px" }}>
        <nav className="crumb exv-rise" style={{ animationDelay: ".02s" }}>
          <a href="Careers.html">Careers</a><span className="sep">/</span>
          <span style={{ color: "var(--fg-3)" }}>{j.dept}</span><span className="sep">/</span>
          <span style={{ color: "#fff" }}>{j.headline}</span>
        </nav>
        <div className="exv-rise" style={{ animationDelay: ".08s", marginTop: 40 }}><Eyebrow>NOW HIRING · {j.dept.toUpperCase()}</Eyebrow></div>
        <h1 className="exv-rise" style={{ animationDelay: ".14s", fontSize: "clamp(38px,5vw,68px)", lineHeight: 1, letterSpacing: "-.025em", margin: "20px 0 0", maxWidth: 880 }}>{j.headline}</h1>
        <p className="exv-rise" style={{ animationDelay: ".2s", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 20, color: "var(--fg-3)", marginTop: 14 }}>{j.subtitle}</p>
        <p className="exv-rise" style={{ animationDelay: ".26s", fontSize: 18, lineHeight: 1.6, color: "var(--fg-2)", maxWidth: 640, marginTop: 22 }}>{j.overview[0]}</p>
        <div className="exv-rise" style={{ animationDelay: ".32s", display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
          {facts.map((f, i) => <span className="fact-chip" key={i}><f.ico />{f.label}</span>)}
        </div>
      </div>
    </header>
  );
}

function ApplyCard({ j }) {
  const rows = [["Role", j.type], ["Location", "Bali, Indonesia"], ["Format", "Onsite only"], ["Hours", j.hours.split(" · ")[0]], ["Duration", j.duration], ["Start", j.start]];
  return (
    <aside>
      <div className="apply-card">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#fff" }}>Ready to build?</div>
        <p style={{ fontSize: 13.5, color: "var(--fg-4)", margin: "8px 0 20px", lineHeight: 1.55 }}>Applications take about 5 minutes. We read every one.</p>
        <a className="btn btn-apply btn-block" href={APPLY} style={{ padding: "14px 20px", fontSize: 15 }}>Apply now <span className="arr"><I.arrowR /></span></a>
        <a className="btn btn-ghost btn-block" href={REFER} target="_blank" rel="noreferrer" style={{ padding: "12px 20px", marginTop: 10 }}>Refer someone <I.arrowUpR style={{ opacity: .6 }} /></a>
        <div style={{ marginTop: 22 }}>
          {rows.map(([k, v]) => <div className="apply-fact" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--fg-5)" }}>Share</span>
          <div style={{ display: "flex", gap: 8 }}>
            {["LinkedIn", "WhatsApp", "X"].map((s) => <a key={s} href="#" onClick={(e) => e.preventDefault()} title={s} style={{ width: 30, height: 30, borderRadius: 9999, border: "1px solid var(--border-2)", display: "grid", placeItems: "center", color: "var(--fg-3)" }}><I.share /></a>)}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Section({ eyebrow, title, children, style }) {
  return (
    <section className="jd-section" style={style}>
      {eyebrow && <div style={{ marginBottom: 14 }}><Eyebrow>{eyebrow}</Eyebrow></div>}
      {title && <h2>{title}</h2>}
      <div style={{ marginTop: 22 }}>{children}</div>
    </section>
  );
}
function CheckList({ items }) {
  return <ul className="check-list">{items.map((it, i) => <li key={i}><span className="check-ico"><I.check /></span><span>{it}</span></li>)}</ul>;
}

function MainColumn({ j }) {
  return (
    <div className="jd-body">
      <Section eyebrow="THE ROLE" title="What this actually is">
        <p className="jd-lead">{j.overview[0]}</p>
        {j.overview.slice(1).map((p, i) => <p key={i} style={{ marginTop: 18 }}>{p}</p>)}
      </Section>

      <Section eyebrow="RESPONSIBILITIES" title="What you will do">
        <div className="group-card"><div className="group-head"><span className="group-ico"><I.doc /></span><span className="group-title">Day to day</span></div><CheckList items={j.responsibilities} /></div>
      </Section>

      <Section eyebrow="WHO YOU ARE" title="Skills we look for"><CheckList items={j.skills} /></Section>

      <Section eyebrow="MINDSET" title="The way you think">
        <div className="mindset-grid">{j.looking.map((m, i) => <div className="mindset" key={i}><div className="t">{m.t}</div><div className="d">{m.d}</div></div>)}</div>
      </Section>

      {j.gain && (
        <Section eyebrow="WHAT YOU GET" title="What you will walk away with">
          <div>{j.gain.map((g, i) => <div className="gain-row" key={i}><span className="gain-n">/ {String(i + 1).padStart(2, "0")}</span><span className="gain-t">{g}</span></div>)}</div>
        </Section>
      )}

      <Section eyebrow="BENEFITS" title="What we offer">
        <div className="perk-grid">{j.offer.map((p, i) => { const Ico = offerIcon(p.t); return <div className="perk" key={i}><div className="pico"><Ico /></div><div className="pt">{p.t}</div><div className="pd">{p.d}</div></div>; })}</div>
      </Section>

      <Section eyebrow="BEFORE YOU APPLY" title="Good to know" style={{ marginTop: 56 }}>
        <div className="gtk">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, color: "var(--exv-magenta)" }}>
            <I.info /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#fff" }}>Full transparency, up front</span>
          </div>
          <CheckList items={[
            "This is an unpaid internship. Strong performers transition into paid roles.",
            "Accommodation, visa and flights are not covered. You arrange your own relocation.",
            "Mandatory relocation to Bali. Onsite only, with no remote during the internship.",
            j.hours.split(" · ")[0] + ", start date " + j.start + ".",
          ]} />
        </div>
      </Section>
    </div>
  );
}

function TrustBand() {
  return <div className="trust-band"><div className="jd-wrap"><div className="trust-grid">{TRUST.map((s, i) => <div className="trust-stat" key={i}><div className="n">{s.n}</div><div className="l">{s.l}</div></div>)}</div></div></div>;
}
function Process() {
  return (
    <div className="trust-band" style={{ background: "var(--bg-sunken)" }}>
      <div className="jd-wrap" style={{ padding: "80px 28px" }}>
        <div style={{ marginBottom: 14 }}><Eyebrow>HOW HIRING WORKS</Eyebrow></div>
        <h2 style={{ maxWidth: 560 }}>Four clear steps. No black box.</h2>
        <div className="steps" style={{ marginTop: 40, maxWidth: 720 }}>
          {STEPS.map((s, i) => <div className="step" key={i}><div className="step-n">{i + 1}</div><div><div className="step-t">{s.t}</div><div className="step-d">{s.d}</div></div></div>)}
        </div>
      </div>
    </div>
  );
}
function Testimonials() {
  return (
    <div className="jd-wrap" style={{ padding: "84px 28px" }}>
      <div style={{ marginBottom: 14 }}><Eyebrow>FROM THE TEAM</Eyebrow></div>
      <h2 style={{ maxWidth: 620 }}>Interns who chose Bali over a desk</h2>
      <div className="t-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 40 }}>
        {TESTIMONIALS.map((t, i) => <div className="tcard" key={i}><div className="quote">&ldquo;{t.q}&rdquo;</div><div className="who"><span className="avatar" style={{ background: t.c }}>{t.nm[0]}</span><div><div className="nm">{t.nm}</div><div className="rl">{t.rl}</div></div></div></div>)}
      </div>
    </div>
  );
}
function VideoReel() {
  return (
    <div className="jd-wrap" style={{ paddingBottom: 90 }}>
      <div style={{ marginBottom: 14 }}><Eyebrow>WATCH</Eyebrow></div>
      <h2 style={{ maxWidth: 620 }}>Hear it from the team</h2>
      <div className="video-card" style={{ marginTop: 36 }}>
        <img src="assets/collab-03.jpg" alt="" />
        <div className="v-overlay">
          <button className="v-play" aria-label="Play intern testimonials"><I.play /></button>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "#fff" }}>Intern stories, in their words</div>
          <span className="v-note">Testimonial reel · video goes here</span>
        </div>
      </div>
    </div>
  );
}
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null); const [h, setH] = useState(0);
  useLayoutEffect(() => { if (ref.current) setH(open ? ref.current.scrollHeight : 0); }, [open]);
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}><span>{q}</span><span className="fchev"><I.chev /></span></button>
      <div className="faq-a" style={{ height: h }}><div className="faq-a-in" ref={ref}>{a}</div></div>
    </div>
  );
}
function FinalCTA() {
  return (
    <div className="jd-wrap" style={{ paddingBottom: 96 }}>
      <div className="final-cta">
        <div className="photo"><img src="assets/cover.jpg" alt="" /></div>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><Eyebrow>START YOUR JOURNEY</Eyebrow></div>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,44px)", maxWidth: 640, margin: "0 auto" }}>Build real things. Move to Bali.</h2>
          <p style={{ color: "var(--fg-2)", maxWidth: 520, margin: "18px auto 0", fontSize: 16.5 }}>We encourage you to apply even if you do not meet every requirement. We value people eager to grow and contribute.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <a className="btn btn-apply" href={APPLY} style={{ padding: "15px 30px", fontSize: 15 }}>Apply now <span className="arr"><I.arrowR /></span></a>
            <a className="btn btn-ghost" href="Careers.html" style={{ padding: "15px 30px", fontSize: 15 }}>Browse all roles</a>
          </div>
        </div>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <footer style={{ background: "var(--bg-sunken)", borderTop: "1px solid var(--border)" }}>
      <div className="jd-wrap" style={{ padding: "48px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <img src="assets/logo-white.png" alt="EX Venture" style={{ height: 26 }} />
        <span style={{ fontSize: 12.5, color: "var(--fg-5)" }}>© 2026 EX Venture · Think Unlimited · 16+ countries</span>
      </div>
    </footer>
  );
}
function MobileApply() {
  return (
    <div className="mobile-apply">
      <a className="btn btn-ghost" href={REFER} target="_blank" rel="noreferrer" style={{ padding: "13px 20px" }}>Refer</a>
      <a className="btn btn-apply btn-block" href={APPLY} style={{ padding: "13px 20px", fontSize: 15 }}>Apply now <span className="arr"><I.arrowR /></span></a>
    </div>
  );
}

function App() {
  const j = JOB;
  const faqs = buildFaqs(j);
  return (
    <div>
      <TopNav />
      <Hero j={j} />
      <TrustBand />
      <div className="jd-wrap"><div className="jd-grid"><MainColumn j={j} /><ApplyCard j={j} /></div></div>
      <Process />
      <Testimonials />
      <VideoReel />
      <div className="jd-wrap" style={{ paddingBottom: 84 }}>
        <div style={{ marginBottom: 14 }}><Eyebrow>FAQ</Eyebrow></div>
        <h2 style={{ maxWidth: 560 }}>Honest answers</h2>
        <div style={{ marginTop: 32 }}>{faqs.map((f, i) => <FAQItem key={i} {...f} />)}</div>
      </div>
      <FinalCTA />
      <Footer />
      <MobileApply />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
