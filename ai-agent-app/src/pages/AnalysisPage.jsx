import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Layers, ListChecks } from 'lucide-react'
import { motion } from 'framer-motion'
import { listFiles } from '../utils/storage'

const cards = [
  {
    to: '/test',
    icon: ListChecks,
    title: '10-question Test',
    desc: 'Generate 10 quiz questions from your documents and score instantly.',
    color: 'from-indigo-500/30 to-indigo-400/10',
  },
  {
    to: '/cards',
    icon: Layers,
    title: 'Flashcards',
    desc: 'Create study flashcards with term on front and description on back.',
    color: 'from-emerald-500/30 to-emerald-400/10',
  },
  {
    to: '/chat',
    icon: MessageSquare,
    title: 'Chat',
    desc: 'Ask questions and chat about contents of your uploaded documents.',
    color: 'from-sky-500/30 to-sky-400/10',
  },
]

export default function AnalysisPage() {
  const files = listFiles()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/upload" className="btn-secondary flex items-center gap-2"><ArrowLeft size={18}/> Back</Link>
        <h2 className="text-xl font-semibold">Choose a processing mode</h2>
      </div>
      {/* Active file selector removed as requested */}
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((c, idx) => (
          <motion.div key={c.to}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.06 }}
            className="glass rounded-2xl p-5">
            <div className={`rounded-xl p-3 bg-gradient-to-br ${c.color} inline-flex`}>
              <c.icon className="text-white" />
            </div>
            <h3 className="text-lg font-semibold mt-3">{c.title}</h3>
            <p className="text-slate-300 text-sm mt-1">{c.desc}</p>
            <Link to={c.to} className="btn-primary mt-4 inline-block">Continue</Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


