import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { getSelectedFile, getChatsForFile, appendChatMessage } from '../utils/storage'

export default function ChatPage() {
  const file = useMemo(()=> getSelectedFile(), [])
  const [selected, setSelected] = useState(file?.id || '')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState(selected? getChatsForFile(selected) : [])

  const send = () => {
    if (!selected || !input.trim()) return
    setLoading(true)
    const text = input.trim()
    setInput('')
    const next = appendChatMessage(selected, { role:'user', text })
    setMessages(next)
    setTimeout(() => {
      const reply = `Mock answer related to: "${text.slice(0,60)}"`
      const after = appendChatMessage(selected, { role:'assistant', text: reply })
      setMessages(after)
      setLoading(false)
    }, 800)
  }

  // File is chosen at upload/analysis step; here we just display its name

  return (
    <div className="grid gap-4 grid-rows-[auto,1fr,auto] h-[calc(100vh-140px)]">
      <div className="flex items-center gap-3">
        <Link to="/analysis" className="btn-secondary flex items-center gap-2"><ArrowLeft size={18}/> Back</Link>
        <h2 className="text-xl font-semibold">Chat about your document</h2>
      </div>

      <div className="glass rounded-2xl p-4 flex flex-col min-h-0">
        <div className="mb-3 text-sm text-slate-300">Document: <span className="text-slate-100 font-medium">{file?.name}</span></div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {messages.map(m => (
            <div key={m.id} className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.role==='user'? 'ml-auto bg-indigo-600/30' : 'bg-white/5'}`}>
              <div className="text-xs text-slate-300 mb-1">{m.role==='user'? 'You' : 'Assistant'}</div>
              <div>{m.text}</div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-slate-300">Start chatting by asking a question.</div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <input className="input flex-1" placeholder="Ask about the document..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send() }} />
        <button disabled={loading} className="btn-primary inline-flex items-center gap-2" onClick={send}><Send size={16}/> Send</button>
      </div>
    </div>
  )
}


