import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import UploadPage from './pages/UploadPage'
import AnalysisPage from './pages/AnalysisPage'
import TestPage from './pages/TestPage'
import CardPage from './pages/CardPage'
import ChatPage from './pages/ChatPage'
import { getCurrentUser, hasAnyFile } from './utils/storage'

function PrivateRoute({ children }) {
  const user = getCurrentUser()
  return user ? children : <Navigate to="/login" replace />
}
function RequireFile({ children }) {
  const ok = hasAnyFile()
  return ok ? children : <Navigate to="/upload" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/upload" replace />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="analysis" element={<RequireFile><AnalysisPage /></RequireFile>} />
        <Route path="test" element={<RequireFile><TestPage /></RequireFile>} />
        <Route path="cards" element={<RequireFile><CardPage /></RequireFile>} />
        <Route path="chat" element={<RequireFile><ChatPage /></RequireFile>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}


