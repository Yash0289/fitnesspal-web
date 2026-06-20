import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

const navBtn = (active) => ({ background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 15, padding: "8px 6px", marginLeft: 8, color: active ? "#2563EB" : "#374151", fontWeight: active ? 700 : 600, borderBottom: active ? "2px solid #2563EB" : "2px solid transparent" })

const bannerBg = { Strength: "linear-gradient(135deg,#1e3a8a,#2563EB)", Cardio: "linear-gradient(135deg,#9a3412,#f97316)", "Home Workout": "linear-gradient(135deg,#065f46,#10B981)" }
const icons = { Strength: "🏋️", Cardio: "🔥", "Home Workout": "🏠" }
const catColor = (c) => c === "Cardio" ? "#f97316" : c === "Home Workout" ? "#10B981" : "#2563EB"
const diffColor = (d) => d === "Beginner" ? "#10B981" : d === "Advanced" ? "#ef4444" : "#2563EB"

export default function Workouts() {
  const [programs, setPrograms] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [joinedIds, setJoinedIds] = useState([])
  const [userId, setUserId] = useState(null)
  const [detail, setDetail] = useState(null)

  useEffect(() => { init() }, [])

  const init = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = "/login"; return }
    setUserId(user.id)
    const { data: progs } = await supabase.from("programs").select("*")
    setPrograms(progs || [])
    setFiltered(progs || [])
    const { data: joined } = await supabase.from("user_programs").select("program_id").eq("user_id", user.id)
    setJoinedIds((joined || []).map(j => j.program_id))
  }

  const applyFilter = (filter, searchVal, progs = programs) => {
    let r = [...progs]
    if (filter !== "All") r = r.filter(p => p.category === filter)
    if (searchVal) r = r.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()))
    setFiltered(r)
  }

  const handleSearch = (e) => { setSearch(e.target.value); applyFilter(activeFilter, e.target.value) }
  const handleFilter = (f) => { setActiveFilter(f); applyFilter(f, search) }

  const handleJoin = async (programId) => {
    if (joinedIds.includes(programId)) {
      await supabase.from("user_programs").delete().eq("user_id", userId).eq("program_id", programId)
      setJoinedIds(joinedIds.filter(id => id !== programId))
    } else {
      await supabase.from("user_programs").insert({ user_id: userId, program_id: programId })
      setJoinedIds([...joinedIds, programId])
    }
  }

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.href = "/login" }

  const filters = ["All", "Strength", "Cardio", "Home Workout"]

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
            <button onClick={() => window.location.href = "/workouts"} style={navBtn(true)}>Workouts</button>
            <button onClick={() => window.location.href = "/profile"} style={navBtn(false)}>Profile</button>
            <button onClick={handleLogout} style={{ marginLeft: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontWeight: 600, fontSize: 14, padding: "9px 16px", borderRadius: 10, cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
        <h1 style={{ fontSize: "clamp(28px,3.2vw,38px)", fontWeight: 800, letterSpacing: "-.5px", margin: "0 0 6px" }}>Workout Library</h1>
        <p style={{ color: "#6b7280", margin: "0 0 26px" }}>Browse and join structured programs built for results.</p>

        {/* SEARCH */}
        <div style={{ position: "relative", marginBottom: 18 }}>
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: .5 }}>🔍</span>
          <input type="text" placeholder="Search workouts..." value={search} onChange={handleSearch}
            style={{ width: "100%", padding: "14px 16px 14px 46px", border: "1.5px solid #e2e8f0", borderRadius: 12, fontSize: 15, background: "#fff", boxSizing: "border-box" }} />
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 26 }}>
          {filters.map(f => (
            <button key={f} onClick={() => handleFilter(f)}
              style={{ border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 999, fontFamily: "Poppins,sans-serif", background: activeFilter === f ? "#2563EB" : "#fff", color: activeFilter === f ? "#fff" : "#374151", boxShadow: activeFilter === f ? "0 6px 16px rgba(37,99,235,.3)" : "inset 0 0 0 1.5px #e2e8f0" }}>
              {f}
            </button>
          ))}
        </div>

        {/* GRID */}
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {filtered.map(p => {
              const joined = joinedIds.includes(p.id)
              return (
                <div key={p.id} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(17,24,39,.06)", border: "1px solid #eef2f7", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 120, background: bannerBg[p.category] || bannerBg.Strength, position: "relative", display: "flex", alignItems: "flex-end", padding: 16 }}>
                    <span style={{ position: "absolute", top: 14, right: 14, fontSize: 34 }}>{icons[p.category] || "💪"}</span>
                    <span style={{ background: "rgba(255,255,255,.92)", color: catColor(p.category), fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>{p.category}</span>
                  </div>
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 12px" }}>{p.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#6b7280", fontSize: 14, marginBottom: 18 }}>
                      <span>⏱️ {p.duration_minutes} min</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: diffColor(p.difficulty) }} />{p.difficulty}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                      <button onClick={() => setDetail(p)} style={{ flex: 1, background: "#f1f5f9", border: "none", color: "#111827", fontWeight: 700, fontSize: 14, padding: 11, borderRadius: 10, cursor: "pointer" }}>View Details</button>
                      <button onClick={() => handleJoin(p.id)} style={{ flex: 1, border: "none", fontWeight: 700, fontSize: 14, padding: 11, borderRadius: 10, cursor: "pointer", background: joined ? "#ecfdf5" : "linear-gradient(135deg,#2563EB,#1d4ed8)", color: joined ? "#059669" : "#fff", boxShadow: joined ? "inset 0 0 0 1.5px #10B981" : "none" }}>
                        {joined ? "Joined ✓" : "Join"}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1.5px dashed #cbd5e1", borderRadius: 12, padding: 56, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤷</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>No workouts found</div>
            <div style={{ color: "#6b7280" }}>Try a different search or filter.</div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {detail && (
        <div onClick={() => setDetail(null)} style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(11,18,32,.62)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fpFade .2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, maxWidth: 480, width: "100%", overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,.4)", animation: "fpModal .25s ease" }}>
            <div style={{ height: 150, background: bannerBg[detail.category] || bannerBg.Strength, position: "relative", display: "flex", alignItems: "flex-end", padding: 20 }}>
              <span style={{ position: "absolute", top: 18, right: 18, fontSize: 48 }}>{icons[detail.category] || "💪"}</span>
              <span style={{ background: "rgba(255,255,255,.92)", color: catColor(detail.category), fontSize: 13, fontWeight: 700, padding: "6px 14px", borderRadius: 999 }}>{detail.category}</span>
            </div>
            <div style={{ padding: 28 }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>{detail.name}</h2>
              <div style={{ display: "flex", gap: 18, color: "#6b7280", fontSize: 15, marginBottom: 18 }}>
                <span>⏱️ {detail.duration_minutes} min</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: diffColor(detail.difficulty) }} />{detail.difficulty}</span>
              </div>
              <p style={{ color: "#374151", lineHeight: 1.65, fontSize: 15, margin: "0 0 24px" }}>{detail.description}</p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => { handleJoin(detail.id); setDetail(null) }} style={{ flex: 1, border: "none", fontWeight: 700, fontSize: 15, padding: 14, borderRadius: 10, cursor: "pointer", background: joinedIds.includes(detail.id) ? "#fef2f2" : "linear-gradient(135deg,#10B981,#059669)", color: joinedIds.includes(detail.id) ? "#dc2626" : "#fff", boxShadow: joinedIds.includes(detail.id) ? "inset 0 0 0 1.5px #fecaca" : "0 10px 22px rgba(16,185,129,.32)" }}>
                  {joinedIds.includes(detail.id) ? "Leave Program" : "Join Program"}
                </button>
                <button onClick={() => setDetail(null)} style={{ background: "#f1f5f9", border: "none", color: "#111827", fontWeight: 700, fontSize: 15, padding: "14px 22px", borderRadius: 10, cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}