import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Workouts from "./pages/Workouts"
import Profile from "./pages/Profile"

function LandingWrapper() {
  const nav = useNavigate()
  return <Landing onSignup={() => nav("/signup")} onLogin={() => nav("/login")} onWorkouts={() => nav("/workouts")} />
}
function LoginWrapper() {
  const nav = useNavigate()
  return <Login onSignup={() => nav("/signup")} />
}
function SignupWrapper() {
  const nav = useNavigate()
  return <Signup onLogin={() => nav("/login")} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}