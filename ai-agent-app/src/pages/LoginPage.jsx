import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { login, getCurrentUser } from '../utils/storage'

export default function LoginPage() {
  const navigate = useNavigate()
  const existing = getCurrentUser()
  const [username, setUsername] = useState(existing?.username || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!username) {
      setError('Please enter a username')
      return
    }
    setLoading(true)
    setTimeout(() => {
      login({ username })
      setLoading(false)
      navigate('/upload')
    }, 800)
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md rounded-2xl p-6"
      >
        <h1 className="text-2xl font-semibold mb-2">Welcome</h1>
        <p className="text-slate-300 mb-6">Enter a username to continue</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input className="input" placeholder="yourname" value={username} onChange={e=>setUsername(e.target.value)} />
          </div>
          {error && <p className="text-rose-400 text-sm">{error}</p>}
          <button disabled={loading} className="btn-primary w-full">{loading? 'Continuing...' : 'Continue'}</button>
        </form>
      </motion.div>
    </div>
  )
}


