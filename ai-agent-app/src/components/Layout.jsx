import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { getCurrentUser, logout, hasAnyFile } from '../utils/storage'

export default function Layout() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [canSeeFeatures, setCanSeeFeatures] = useState(hasAnyFile())
  const location = useLocation()

  useEffect(() => {
    const onChange = () => setCanSeeFeatures(hasAnyFile())
    window.addEventListener('ai-agent-files-changed', onChange)
    return () => window.removeEventListener('ai-agent-files-changed', onChange)
  }, [])

  const isFeaturesPath = location.pathname.startsWith('/analysis') || location.pathname.startsWith('/test') || location.pathname.startsWith('/cards') || location.pathname.startsWith('/chat')
  const isUploadPath = location.pathname.startsWith('/upload')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-40">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="glass mx-4 mt-4 rounded-2xl px-4 py-3 md:mx-auto md:max-w-6xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-500/20 grid place-items-center text-indigo-300 font-bold">AI</div>
              <span className="font-semibold">AI Agent App</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              {isFeaturesPath ? (
                // In features area: show only Features
                <NavLink className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/5 ${isActive? 'bg-white/10': ''}`} to="/analysis">Features</NavLink>
              ) : isUploadPath ? (
                // On upload page: show only Upload
                <NavLink className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/5 ${isActive? 'bg-white/10': ''}`} to="/upload">Upload</NavLink>
              ) : (
                // Any other page (rare): show Upload, and Features only if files exist
                <>
                  <NavLink className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/5 ${isActive? 'bg-white/10': ''}`} to="/upload">Upload</NavLink>
                  {canSeeFeatures ? (
                    <NavLink className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/5 ${isActive? 'bg-white/10': ''}`} to="/analysis">Features</NavLink>
                  ) : (
                    <div className="relative group">
                      <button type="button" aria-disabled className="px-3 py-2 rounded-lg text-slate-400 bg-white/0 cursor-not-allowed border border-white/5">Features</button>
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block whitespace-nowrap text-xs px-2 py-1 rounded bg-slate-800 text-slate-200 border border-white/10 shadow-glass">Upload a file first</div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-slate-300 text-sm">{user?.username}</span>
              <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.nav>
      </header>
      <main className="mx-4 my-6 md:mx-auto md:max-w-6xl">
        <Outlet />
      </main>
    </div>
  )
}


