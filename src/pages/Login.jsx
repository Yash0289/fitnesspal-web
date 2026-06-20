import { useState } from "react"
import { supabase } from "../services/supabase"

export default function Login({ onSignup }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false); return }
    window.location.href = "/dashboard"
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "'Poppins',sans-serif" }}>
      {/* LEFT — form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px", background: "#F8FAFC" }}>
        <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 420 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-.5px", margin: "0 0 6px" }}>Welcome Back</h1>
          <p style={{ color: "#6b7280", margin: "0 0 28px" }}>Let's get back to training.</p>

          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 14, padding: "11px 14px", borderRadius: 10, marginBottom: 16 }}>{error}</div>}

          <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 7 }}>Email</label>
          <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ width: "100%", padding: "13px 15px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, background: "#fff", marginBottom: 16, boxSizing: "border-box" }} />

          <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 7 }}>Password</label>
          <input type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ width: "100%", padding: "13px 15px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, background: "#fff", marginBottom: 24, boxSizing: "border-box" }} />

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: 15, border: "none", borderRadius: 10, background: "linear-gradient(135deg,#2563EB,#1d4ed8)", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 12px 26px rgba(37,99,235,.35)" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div style={{ textAlign: "center", marginTop: 18, color: "#6b7280", fontSize: 15 }}>
            New here?{" "}
            <button type="button" onClick={onSignup} style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Create New Account</button>
          </div>
        </form>
      </div>

      {/* RIGHT — dark panel */}
      <div style={{ position: "relative", overflow: "hidden", background: "radial-gradient(800px 500px at 70% 10%, rgba(37,99,235,.4), transparent 60%), linear-gradient(150deg,#0b1220,#065f46)", color: "#fff", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 22, justifyContent: "flex-end" }}>
          FITNESS<span style={{ color: "#10B981" }}>PAL</span>
          <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#2563EB,#10B981)" }}>⚡</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2 style={{ fontSize: "clamp(30px,3.4vw,46px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: -1, margin: "0 0 16px" }}>Consistency<br />beats intensity.</h2>
          <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.6, maxWidth: 380, margin: "0 0 0 auto" }}>Pick up right where you left off and keep the streak alive.</p>
        </div>
        <div style={{ textAlign: "right", color: "#64748b", fontSize: 14 }}>Your progress, always saved.</div>
      </div>
    </div>
  )
}