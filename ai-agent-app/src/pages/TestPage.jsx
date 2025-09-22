import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { getSelectedFileId, getTestQuestions, setTestQuestions } from '../utils/storage'

function generateMockQuestions() {
  const base = [
    { q: 'What is the main topic of the sample contract?', a: 'Service agreement', choices: ['Sales receipt','Service agreement','NDA','Employment offer'] },
    { q: 'When were the meeting notes created?', a: 'Last week', choices: ['Today','Yesterday','Last week','Last month'] },
    { q: 'Which party is responsible for delivery?', a: 'Vendor', choices: ['Client','Vendor','Both','None'] },
    { q: 'What is the payment term?', a: 'Net 30', choices: ['Prepaid','Net 7','Net 15','Net 30'] },
    { q: 'What type of document is Meeting_Notes.txt?', a: 'Text notes', choices: ['Spreadsheet','Presentation','Text notes','Image'] },
    { q: 'Which clause mentions termination?', a: 'Clause 9', choices: ['Clause 3','Clause 6','Clause 9','Clause 12'] },
    { q: 'Who authored the notes?', a: 'Project manager', choices: ['CEO','Developer','Project manager','Intern'] },
    { q: 'What is the contract duration?', a: '12 months', choices: ['1 month','6 months','12 months','24 months'] },
    { q: 'What is the document format of Sample_Contract?', a: 'PDF', choices: ['DOCX','PDF','TXT','MD'] },
    { q: 'What was discussed in the meeting?', a: 'Roadmap', choices: ['Roadmap','Budget only','Hiring only','Marketing only'] },
  ]
  return base.map((b, i) => ({ id: `q${i+1}`, ...b }))
}

export default function TestPage() {
  const fileId = getSelectedFileId()
  const questions = useMemo(() => {
    const exist = getTestQuestions(fileId)
    if (exist.length) return exist
    const seed = generateMockQuestions()
    setTestQuestions(fileId, seed)
    return seed
  }, [fileId])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const regenerate = () => {
    const seed = generateMockQuestions()
    setTestQuestions(fileId, seed)
    setAnswers({})
    setSubmitted(false)
  }

  const score = useMemo(() => {
    if (!submitted) return 0
    return questions.reduce((acc, q) => acc + (answers[q.id] === q.a ? 1 : 0), 0)
  }, [submitted, answers, questions])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/analysis" className="btn-secondary flex items-center gap-2"><ArrowLeft size={18}/> Back</Link>
        <h2 className="text-xl font-semibold">10-question Test</h2>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <motion.div key={q.id} initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{delay: idx*0.03}} className="glass rounded-2xl p-4">
            <div className="font-medium">{idx+1}. {q.q}</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.choices.map(c => (
                <label key={c} className={`px-3 py-2 rounded-lg border cursor-pointer ${answers[q.id]===c? 'border-indigo-400 bg-white/10' : 'border-white/10 hover:bg-white/5'}`}>
                  <input
                    type="radio"
                    name={q.id}
                    className="mr-2"
                    checked={answers[q.id]===c}
                    onChange={() => setAnswers(a=>({...a,[q.id]: c}))}
                  />
                  {c}
                </label>
              ))}
            </div>
            {submitted && (
              <div className="mt-2 text-sm">
                Correct answer: <span className="text-emerald-300">{q.a}</span>
                {answers[q.id] && answers[q.id] !== q.a && (
                  <span className="text-rose-300"> • Your answer: {answers[q.id]}</span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {!submitted ? (
          <>
            <button onClick={()=>setSubmitted(true)} className="btn-primary">Finish and Score</button>
          </>
        ) : (
          <>
            <div className="glass rounded-xl px-4 py-2">Score: {score} / {questions.length}</div>
            <button onClick={()=>{setAnswers({}); setSubmitted(false)}} className="btn-secondary">Reset</button>
            <button onClick={regenerate} className="btn-primary">New Test</button>
          </>
        )}
      </div>
    </div>
  )
}


