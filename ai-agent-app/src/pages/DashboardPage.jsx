import { useMemo } from 'react'
import { listFiles } from '../utils/storage'
import { Link } from 'react-router-dom'
import { FileText, Upload, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const files = useMemo(() => listFiles(), [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your documents</h2>
          <p className="text-slate-300 text-sm">Manage uploaded files and start analysis</p>
        </div>
        <div className="flex gap-2">
          <Link to="/upload" className="btn-primary flex items-center gap-2"><Upload size={18}/> Upload</Link>
          <Link to="/analysis" className="btn-secondary flex items-center gap-2"><BarChart3 size={18}/> Analysis</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {files.map((f, idx) => (
          <motion.div
            key={f.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center"><FileText className="text-indigo-300" size={20}/></div>
              <div className="min-w-0">
                <div className="truncate font-medium">{f.name}</div>
                <div className="text-xs text-slate-400">{(f.size/1024).toFixed(1)} KB • {new Date(f.uploadedAt).toLocaleString()}</div>
              </div>
            </div>
          </motion.div>
        ))}
        {files.length === 0 && (
          <div className="text-slate-300">No documents yet. Upload your first file.</div>
        )}
      </div>
    </div>
  )
}


