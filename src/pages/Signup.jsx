import { useState } from "react"
import { supabase } from "../services/supabase"

export default function Signup({ onLogin }) {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", goal: "Build Strength" })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSignup = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!formData.fullName.trim()) errs.fullName = "Full name is required."
    if (!formData.email.trim()) errs.email = "Email is required."
    if (formData.password.length < 6) errs.password = "Password must be at least 6 characters."
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const { data, error: err } = await supabase.auth.signUp({
      email: formData.email, password: formData.password,
      options: { data: { full_name: formData.fullName, goal: formData.goal } }
    })
    if (err) { setErrors({ general: err.message }); setLoading(false); return }
    if (data.user) {
      await supabase.from("users").insert({ id: data.user.id, name: formData.fullName, email: formData.email, goal: formData.goal })
    }
    window.location.href = "/dashboard"
  }

  const inp = { width: "100%", padding: "13px 15px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, background: "#fff", boxSizing: "border-box" }
  const lbl = { display: "block", fontWeight: 600, fontSize: 14, marginBottom: 7 }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "'Poppins',sans-serif" }}>
      {/* LEFT — dark panel */}
      <div style={{ position: "relative", overflow: "hidden", background: "radial-gradient(800px 500px at 30% 10%, rgba(16,185,129,.3), transparent 60%), linear-gradient(150deg,#0b1220,#1e3a8a)", color: "#fff", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 22 }}>
          <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#2563EB,#10B981)" }}>⚡</span>
          FITNESS<span style={{ color: "#10B981" }}>PAL</span>
        </div>
        <div>
          <h2 style={{ fontSize: "clamp(30px,3.4vw,46px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: -1, margin: "0 0 16px" }}>Start your journey today.</h2>
          <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.6, maxWidth: 380, margin: 0 }}>Join FitnessPal and get instant access to structured strength and conditioning programs.</p>
        </div>
        <div style={{ color: "#64748b", fontSize: 14 }}>No credit card required · Free forever MVP</div>
      </div>

      {/* RIGHT — form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px", background: "#F8FAFC" }}>
        <form onSubmit={handleSignup} style={{ width: "100%", maxWidth: 420 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-.5px", margin: "0 0 6px" }}>Create Account</h1>
          <p style={{ color: "#6b7280", margin: "0 0 28px" }}>Let's build the stronger you.</p>

          {errors.general && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 14, padding: "11px 14px", borderRadius: 10, marginBottom: 16 }}>{errors.general}</div>}

          <label style={lbl}>Full Name</label>
          <input name="fullName" type="text" placeholder="John Carter" value={formData.fullName} onChange={handleChange} style={{ ...inp, marginBottom: 4 }} />
          {errors.fullName && <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 8 }}>{errors.fullName}</div>}
          <div style={{ height: 14 }} />

          <label style={lbl}>Email Address</label>
          <input name="email" type="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} style={{ ...inp, marginBottom: 4 }} />
          {errors.email && <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 8 }}>{errors.email}</div>}
          <div style={{ height: 14 }} />

          <label style={lbl}>Password</label>
          <input name="password" type="password" placeholder="Minimum 6 characters" value={formData.password} onChange={handleChange} style={{ ...inp, marginBottom: 4 }} />
          {errors.password && <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 8 }}>{errors.password}</div>}
          <div style={{ height: 14 }} />

          <label style={lbl}>Fitness Goal</label>
          <select name="goal" value={formData.goal} onChange={handleChange} style={{ ...inp, cursor: "pointer" }}>
            <option>Build Strength</option>
            <option>Lose Fat</option>
            <option>Stay Active</option>
          </select>

          <button type="submit" disabled={loading}
            style={{ width: "100%", marginTop: 24, padding: 15, border: "none", borderRadius: 10, background: "linear-gradient(135deg,#2563EB,#1d4ed8)", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 12px 26px rgba(37,99,235,.35)" }}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <div style={{ textAlign: "center", marginTop: 18, color: "#6b7280", fontSize: 15 }}>
            Already have an account?{" "}
            <button type="button" onClick={onLogin} style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}