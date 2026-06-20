import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

const navBtn = (active) => ({
  background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif",
  fontSize: 15, padding: "8px 6px", marginLeft: 8,
  color: active ? "#2563EB" : "#374151", fontWeight: active ? 700 : 600,
  borderBottom: active ? "2px solid #2563EB" : "2px solid transparent"
})

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [programCount, setProgramCount] = useState(0)
  const [recentPrograms, setRecentPrograms] = useState([])

  useEffect(() => { getUser() }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = "/login"; return }
    setUser(user)
    const { data: p } = await supabase.from("users").select("*").eq("id", user.id).single()
    setProfile(p)
    const { data: up, count } = await supabase.from("user_programs").select("*, programs(*)", { count: "exact" }).eq("user_id", user.id).order("created_at", { ascending: false }).limit(4)
    setProgramCount(count || 0)
    setRecentPrograms(up || [])
  }

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.href = "/login" }

  const diffColor = (d) => d === "Beginner" ? "#10B981" : d === "Advanced" ? "#ef4444" : "#2563EB"
  const catColor = (c) => c === "Cardio" ? "#f97316" : c === "Home Workout" ? "#10B981" : "#2563EB"

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Poppins',sans-serif", background: "#F8FAFC" }}>
      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "#fff", borderBottom: "1px solid #eef2f7", boxShadow: "0 1px 8px rgba(17,24,39,.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 20 }}>
            <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#2563EB,#10B981)", color: "#fff" }}>⚡</span>
            FITNESS<span style={{ color: "#10B981" }}>PAL</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={() => window.location.href = "/dashboard"} style={navBtn(true)}>Dashboard</button>
            <button onClick={() => window.location.href = "/workouts"} style={navBtn(false)}>Workouts</button>
            <button onClick={() => window.location.href = "/profile"} style={navBtn(false)}>Profile</button>
            <button onClick={handleLogout} style={{ marginLeft: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontWeight: 600, fontSize: 14, padding: "9px 16px", borderRadius: 10, cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
        {/* WELCOME */}
        <div style={{ background: "radial-gradient(700px 300px at 90% -40%, rgba(16,185,129,.3), transparent 60%), linear-gradient(135deg,#111827,#1e3a8a)", borderRadius: 16, padding: "34px 36px", color: "#fff", marginBottom: 28 }}>
          <div style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 800, letterSpacing: "-.5px", marginBottom: 6 }}>Hello {profile?.name || user?.email} 👊</div>
          <div style={{ color: "#cbd5e1", fontSize: 16 }}>Goal: <span style={{ color: "#6ee7b7", fontWeight: 700 }}>{profile?.goal || "Not set"}</span></div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 28 }}>
          {[
            { icon: "📋", bg: "#eff6ff", label: "Programs Joined", value: programCount },
            { icon: "⏱️", bg: "#ecfdf5", label: "Weekly Minutes", value: recentPrograms.reduce((s, p) => s + (p.programs?.duration_minutes || 0), 0) },
            { icon: "🏆", bg: "#fff7ed", label: "Latest Program", value: recentPrograms[0]?.programs?.name || "—" },
          ].map((c) => (
            <div key={c.label} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(17,24,39,.06)", padding: 24, border: "1px solid #eef2f7" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: c.bg, display: "grid", placeItems: "center", fontSize: 22 }}>{c.icon}</div>
                <div style={{ color: "#6b7280", fontWeight: 600, fontSize: 14 }}>{c.label}</div>
              </div>
              <div style={{ fontSize: typeof c.value === "number" ? 38 : 22, fontWeight: 800, lineHeight: 1.1 }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <button onClick={() => window.location.href = "/workouts"} style={{ display: "flex", alignItems: "center", gap: 16, background: "linear-gradient(135deg,#2563EB,#1d4ed8)", border: "none", color: "#fff", padding: "22px 24px", borderRadius: 12, cursor: "pointer", textAlign: "left", boxShadow: "0 10px 24px rgba(37,99,235,.28)" }}>
            <span style={{ fontSize: 28 }}>🔍</span>
            <span><span style={{ display: "block", fontWeight: 700, fontSize: 18 }}>Browse Workouts</span><span style={{ display: "block", fontSize: 14, opacity: .85 }}>Find your next program</span></span>
          </button>
          <button onClick={() => window.location.href = "/profile"} style={{ display: "flex", alignItems: "center", gap: 16, background: "#fff", border: "1.5px solid #e2e8f0", color: "#111827", padding: "22px 24px", borderRadius: 12, cursor: "pointer", textAlign: "left" }}>
            <span style={{ fontSize: 28 }}>⚙️</span>
            <span><span style={{ display: "block", fontWeight: 700, fontSize: 18 }}>Update Profile</span><span style={{ display: "block", fontSize: 14, color: "#6b7280" }}>Change your goal & details</span></span>
          </button>
        </div>

        {/* RECENT PROGRAMS */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Recent Programs</h2>
          <button onClick={() => window.location.href = "/workouts"} style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>View all →</button>
        </div>
        {recentPrograms.length > 0 ? (
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(17,24,39,.06)", border: "1px solid #eef2f7", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, padding: "14px 22px", background: "#f8fafc", borderBottom: "1px solid #eef2f7", fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: .5 }}>
              <div>Program Name</div><div>Category</div><div>Difficulty</div>
            </div>
            {recentPrograms.map((rp) => (
              <div key={rp.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, padding: "18px 22px", borderBottom: "1px solid #f1f5f9", alignItems: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{rp.programs?.name}</div>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: catColor(rp.programs?.category) }}>{rp.programs?.category}</span></div>
                <div><span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: "#fff", background: diffColor(rp.programs?.difficulty), padding: "4px 11px", borderRadius: 999 }}>{rp.programs?.difficulty}</span></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1.5px dashed #cbd5e1", borderRadius: 12, padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏃</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>No programs yet</div>
            <div style={{ color: "#6b7280", marginBottom: 20 }}>Browse the library and join your first workout program.</div>
            <button onClick={() => window.location.href = "/workouts"} style={{ background: "linear-gradient(135deg,#10B981,#059669)", border: "none", color: "#fff", fontWeight: 700, padding: "13px 26px", borderRadius: 10, cursor: "pointer", fontSize: 15 }}>Browse Workouts</button>
          </div>
        )}
      </div>
    </div>
  )
}