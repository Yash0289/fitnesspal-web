import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

const navBtn = (active) => ({ background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 15, padding: "8px 6px", marginLeft: 8, color: active ? "#2563EB" : "#374151", fontWeight: active ? 700 : 600, borderBottom: active ? "2px solid #2563EB" : "2px solid transparent" })

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [programCount, setProgramCount] = useState(0)

  useEffect(() => { getProfile() }, [])

  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = "/login"; return }
    const { data } = await supabase.from("users").select("*").eq("id", user.id).single()
    setProfile(data); setGoal(data?.goal || "Build Strength")
    const { count } = await supabase.from("user_programs").select("*", { count: "exact" }).eq("user_id", user.id)
    setProgramCount(count || 0)
  }

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600) }

  const handleSave = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from("users").update({ goal }).eq("id", user.id)
    setProfile({ ...profile, goal }); setLoading(false)
    showToast("Profile updated ✓")
  }

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.href = "/login" }

  const joinedDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Poppins',sans-serif", background: "#F8FAFC" }}>
      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "#fff", borderBottom: "1px solid #eef2f7", boxShadow: "0 1px 8px rgba(17,24,39,.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 20 }}>
            <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#2563EB,#10B981)", color: "#fff" }}>⚡</span>
            FITNESS<span style={{ color: "#10B981" }}>PAL</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => window.location.href = "/dashboard"} style={navBtn(false)}>Dashboard</button>
            <button onClick={() => window.location.href = "/workouts"} style={navBtn(false)}>Workouts</button>
            <button onClick={() => window.location.href = "/profile"} style={navBtn(true)}>Profile</button>
            <button onClick={handleLogout} style={{ marginLeft: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontWeight: 600, fontSize: 14, padding: "9px 16px", borderRadius: 10, cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 32px" }}>
        <h1 style={{ fontSize: "clamp(28px,3.2vw,38px)", fontWeight: 800, letterSpacing: "-.5px", margin: "0 0 26px" }}>Profile</h1>

        {/* PROFILE HERO */}
        <div style={{ background: "radial-gradient(500px 220px at 92% -30%, rgba(16,185,129,.32), transparent 60%), linear-gradient(135deg,#111827,#1e3a8a)", borderRadius: 16, padding: 30, color: "#fff", display: "flex", alignItems: "center", gap: 22, marginBottom: 26 }}>
          <div style={{ width: 74, height: 74, borderRadius: 18, background: "linear-gradient(135deg,#2563EB,#10B981)", display: "grid", placeItems: "center", fontSize: 32, fontWeight: 800 }}>
            {profile?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{profile?.name || "User"}</div>
            <div style={{ color: "#cbd5e1" }}>{profile?.email}</div>
          </div>
        </div>

        {/* DETAILS */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(17,24,39,.06)", border: "1px solid #eef2f7", padding: "8px 28px", marginBottom: 26 }}>
          {[
            { label: "Full Name", value: profile?.name },
            { label: "Email", value: profile?.email },
            { label: "Current Goal", value: profile?.goal, valueStyle: { color: "#10B981" } },
            { label: "Joined Date", value: joinedDate },
            { label: "Programs Joined", value: programCount },
          ].map((row, i, arr) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "18px 0", borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <span style={{ color: "#6b7280", fontWeight: 600 }}>{row.label}</span>
              <span style={{ fontWeight: 700, ...(row.valueStyle || {}) }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* EDIT GOAL */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(17,24,39,.06)", border: "1px solid #eef2f7", padding: 28 }}>
          <h3 style={{ fontSize: 19, fontWeight: 800, margin: "0 0 18px" }}>Edit Goal</h3>
          <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: "100%", padding: "13px 15px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, background: "#fff", cursor: "pointer", marginBottom: 20, fontFamily: "Poppins,sans-serif" }}>
            <option>Build Strength</option>
            <option>Lose Fat</option>
            <option>Stay Active</option>
          </select>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={handleSave} disabled={loading} style={{ flex: 1, minWidth: 160, background: "linear-gradient(135deg,#10B981,#059669)", border: "none", color: "#fff", fontWeight: 700, fontSize: 15, padding: 14, borderRadius: 10, cursor: "pointer", boxShadow: "0 10px 22px rgba(16,185,129,.32)" }}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={handleLogout} style={{ flex: 1, minWidth: 160, background: "#fff", border: "1.5px solid #fecaca", color: "#dc2626", fontWeight: 700, fontSize: 15, padding: 14, borderRadius: 10, cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 90, background: "#111827", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 26px", borderRadius: 12, boxShadow: "0 16px 40px rgba(0,0,0,.3)", animation: "fpToast .3s ease" }}>{toast}</div>
      )}
    </div>
  )
}