export default function Landing({ onSignup, onLogin, onWorkouts }) {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#111827", background: "#F8FAFC" }}>

      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden", background: "radial-gradient(1100px 560px at 78% -8%, rgba(16,185,129,.28), transparent 58%), linear-gradient(135deg,#0b1220 0%,#111827 42%,#1e3a8a 100%)", color: "#fff" }}>
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "rgba(37,99,235,.45)", filter: "blur(120px)", top: -120, left: -80, animation: "fpGlow 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "rgba(16,185,129,.4)", filter: "blur(120px)", bottom: -140, right: "8%", animation: "fpGlow 11s ease-in-out infinite" }} />

        {/* NAV */}
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 22, letterSpacing: "-.5px" }}>
            <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#2563EB,#10B981)", fontSize: 20 }}>⚡</span>
            FITNESS<span style={{ color: "#10B981" }}>PAL</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ background: "none", border: "none", color: "#e5e7eb", fontWeight: 600, fontSize: 15, cursor: "pointer", padding: "8px 12px" }}>Home</button>
            <button onClick={onWorkouts} style={{ background: "none", border: "none", color: "#e5e7eb", fontWeight: 600, fontSize: 15, cursor: "pointer", padding: "8px 12px" }}>Workouts</button>
            <button onClick={onLogin} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.22)", color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer", padding: "10px 18px", borderRadius: 10 }}>Login</button>
            <button onClick={onSignup} style={{ background: "linear-gradient(135deg,#2563EB,#1d4ed8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", padding: "10px 20px", borderRadius: 10, boxShadow: "0 10px 24px rgba(37,99,235,.45)" }}>Sign Up</button>
          </div>
        </div>

        {/* HERO BODY */}
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "64px 32px 96px", display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,.15)", border: "1px solid rgba(16,185,129,.35)", color: "#6ee7b7", padding: "7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 22 }}>
              🔥 Trusted by fitness enthusiasts
            </div>
            <h1 style={{ fontSize: "clamp(38px,5.4vw,68px)", lineHeight: 1.02, fontWeight: 800, letterSpacing: "-1.5px", margin: "0 0 18px" }}>
              Build The Stronger<br />Version Of{" "}
              <span style={{ background: "linear-gradient(135deg,#60a5fa,#34d399)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Yourself</span>
            </h1>
            <p style={{ fontSize: "clamp(16px,1.5vw,20px)", lineHeight: 1.55, color: "#cbd5e1", maxWidth: 520, margin: "0 0 32px" }}>
              Track workouts, follow proven strength programs, and crush your fitness goals — all in one place.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={onSignup} style={{ background: "linear-gradient(135deg,#10B981,#059669)", border: "none", color: "#fff", fontWeight: 700, fontSize: 17, cursor: "pointer", padding: "16px 34px", borderRadius: 10, boxShadow: "0 14px 30px rgba(16,185,129,.4)" }}>Start Free →</button>
              <button onClick={onLogin} style={{ background: "rgba(255,255,255,.06)", border: "1.5px solid rgba(255,255,255,.28)", color: "#fff", fontWeight: 700, fontSize: 17, cursor: "pointer", padding: "16px 34px", borderRadius: 10 }}>Login</button>
            </div>
            <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
              <div><div style={{ fontSize: 30, fontWeight: 800 }}>7+</div><div style={{ fontSize: 14, color: "#94a3b8" }}>Programs</div></div>
              <div><div style={{ fontSize: 30, fontWeight: 800 }}>100%</div><div style={{ fontSize: 14, color: "#94a3b8" }}>Free MVP</div></div>
              <div><div style={{ fontSize: 30, fontWeight: 800 }}>3</div><div style={{ fontSize: 14, color: "#94a3b8" }}>Goal tracks</div></div>
            </div>
          </div>

          {/* SESSION PREVIEW CARD */}
          <div>
            <div style={{ background: "linear-gradient(160deg,rgba(255,255,255,.1),rgba(255,255,255,.03))", border: "1px solid rgba(255,255,255,.14)", borderRadius: 20, padding: 26, backdropFilter: "blur(6px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Today's Session</div>
                <div style={{ background: "rgba(16,185,129,.2)", color: "#6ee7b7", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>ACTIVE</div>
              </div>
              {[
                { icon: "🏋️", name: "Push Day", sub: "Strength · 45 min", diff: "Intermediate", diffColor: "#34d399", bg: "linear-gradient(135deg,#2563EB,#1d4ed8)" },
                { icon: "🔥", name: "Fat Burn HIIT", sub: "Cardio · 30 min", diff: "Beginner", diffColor: "#34d399", bg: "linear-gradient(135deg,#f97316,#ea580c)" },
                { icon: "🦵", name: "Leg Day", sub: "Strength · 50 min", diff: "Advanced", diffColor: "#f87171", bg: "linear-gradient(135deg,#10B981,#059669)" },
              ].map((w) => (
                <div key={w.name} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.06)", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: w.bg, display: "grid", placeItems: "center", fontSize: 20 }}>{w.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{w.name}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>{w.sub}</div>
                  </div>
                  <div style={{ color: w.diffColor, fontWeight: 700, fontSize: 13 }}>{w.diff}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ color: "#2563EB", fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Why FitnessPal</div>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 800, letterSpacing: -1, margin: 0 }}>Everything you need to get strong</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {[
            { icon: "🏋️", bg: "linear-gradient(135deg,#2563EB,#1d4ed8)", title: "Strength Programs", desc: "Structured push / pull / legs splits and full-body power programs built to add real muscle." },
            { icon: "📈", bg: "linear-gradient(135deg,#10B981,#059669)", title: "Workout Tracking", desc: "Join programs, build your weekly plan, and keep every session organized in one dashboard." },
            { icon: "🎯", bg: "linear-gradient(135deg,#f97316,#ea580c)", title: "Personalized Goals", desc: "Pick your goal — build strength, lose fat, or stay active — and we tailor the experience." },
          ].map((f) => (
            <div key={f.title} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 20px rgba(17,24,39,.06)", padding: 32, border: "1px solid #eef2f7" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: f.bg, display: "grid", placeItems: "center", fontSize: 26, marginBottom: 20 }}>{f.icon}</div>
              <h3 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 10px" }}>{f.title}</h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0, fontSize: 15 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0b1220", color: "#cbd5e1" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>FITNESS<span style={{ color: "#10B981" }}>PAL</span></div>
          <div style={{ display: "flex", gap: 28, fontSize: 15 }}>
            <a href="#" style={{ color: "#cbd5e1", textDecoration: "none" }}>About</a>
            <a href="#" style={{ color: "#cbd5e1", textDecoration: "none" }}>Contact</a>
            <a href="#" style={{ color: "#cbd5e1", textDecoration: "none" }}>Privacy Policy</a>
          </div>
          <div style={{ fontSize: 13, color: "#64748b" }}>© 2026 FitnessPal · MVP 1.0</div>
        </div>
      </div>

    </div>
  )
}