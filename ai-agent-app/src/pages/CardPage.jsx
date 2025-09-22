import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { getSelectedFileId, getCards, addCard, setCards } from '../utils/storage'

function generateMockCards() {
  const pairs = [
    ['NDA', 'A non-disclosure agreement protecting confidential information.'],
    ['Service Level', 'A measurable commitment of response and uptime.'],
    ['Termination', 'Conditions where the contract ends early.'],
    ['Net 30', 'Payment is due within 30 days after invoice date.'],
    ['Scope', 'Detailed description of what is included in delivery.'],
  ]
  return pairs.map(([front, back], i) => ({ id:`c${i+1}`, front, back }))
}

export default function CardPage() {
  const fileId = getSelectedFileId()
  const [cards, setCardsState] = useState(() => {
    const existing = getCards(fileId)
    if (existing.length) return existing
    const seed = generateMockCards()
    setCards(fileId, seed)
    return seed
  })
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const current = useMemo(() => cards[index], [cards, index])

  const next = () => { setFlipped(false); setIndex(i => (i+1) % cards.length) }
  const prev = () => { setFlipped(false); setIndex(i => (i-1+cards.length) % cards.length) }
  const addNew = () => {
    const term = prompt('New card term:')
    if (!term) return
    const desc = prompt('Card description:') || ''
    const updated = addCard(fileId, { front: term, back: desc })
    setCardsState(updated)
    setIndex(updated.length - 1)
    setFlipped(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/analysis" className="btn-secondary flex items-center gap-2"><ArrowLeft size={18}/> Back</Link>
        <h2 className="text-xl font-semibold">Flashcards</h2>
      </div>

      <div className="glass rounded-xl px-4 py-2 text-sm text-slate-300">
        Tip: Click the card to reveal the text. Click again to flip back.
      </div>

      <div className="grid place-items-center">
        <div className="flip-scene w-full max-w-xl aspect-video">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>setFlipped(f=>!f)}
            className={`glass w-full h-full rounded-3xl relative`}
          >
            <div className={`flip-card w-full h-full ${flipped? 'is-flipped' : ''}`}>
              <div className="flip-face text-2xl font-semibold">
                {current.front}
              </div>
              <div className="flip-face flip-back text-lg text-slate-200">
                {current.back}
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      <div className="flex items-center gap-3 justify-center">
        <button className="btn-secondary" onClick={prev}>Previous</button>
        <button className="btn-primary" onClick={next}>Next</button>
        <button className="btn-primary" onClick={addNew}>New Card</button>
      </div>
    </div>
  )
}


