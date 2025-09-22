import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { addFiles } from '../utils/storage'
import { useNavigate } from 'react-router-dom'
import { UploadCloud } from 'lucide-react'

export default function UploadPage() {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    setError('')
    if (!acceptedFiles?.length) return
    setUploading(true)
    setTimeout(() => {
      addFiles(acceptedFiles)
      setUploading(false)
      navigate('/analysis')
    }, 800)
  }, [navigate])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Upload documents</h2>
      </div>

      <div {...getRootProps()} className={`glass rounded-3xl p-10 grid place-items-center border-2 border-dashed ${isDragActive? 'border-indigo-400 bg-white/10' : 'border-white/10'}`}>
        <input {...getInputProps()} />
        <div className="text-center">
          <UploadCloud className="mx-auto text-indigo-300" size={48} />
          <p className="mt-3">Drag & drop files here, or click to select</p>
          <p className="text-sm text-slate-300 mt-1">PDF, TXT, DOCX up to 10MB</p>
          <button disabled={uploading} className="btn-primary mt-4">{uploading? 'Uploading...' : 'Upload'}</button>
          {error && <p className="text-rose-400 mt-2 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  )
}


