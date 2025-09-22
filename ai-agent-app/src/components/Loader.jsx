import { motion } from 'framer-motion'

export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3 text-slate-300">
      <motion.div
        className="h-2 w-2 rounded-full bg-indigo-400"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-indigo-400"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-indigo-400"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}


