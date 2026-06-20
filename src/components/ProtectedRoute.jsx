import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    let mounted = true
    const check = async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setAuthed(Boolean(data?.user))
      setLoading(false)
    }
    check()
    return () => { mounted = false }
  }, [])

  if (loading) return <div style={{padding:20}}>Checking authentication...</div>
  return authed ? children : <Navigate to="/login" replace />
}
