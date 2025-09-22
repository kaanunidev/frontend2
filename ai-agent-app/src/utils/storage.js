const KEYS = {
  user: 'ai_agent_user',
  files: 'ai_agent_files',
  chats: 'ai_agent_chats',
  selectedFile: 'ai_agent_selected_file',
  cards: 'ai_agent_cards',
  tests: 'ai_agent_tests',
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(KEYS.user)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function login({ username }) {
  const user = { id: 'u1', username }
  localStorage.setItem(KEYS.user, JSON.stringify(user))
  return user
}

export function logout() {
  localStorage.removeItem(KEYS.user)
}

export function listFiles() {
  try {
    const raw = localStorage.getItem(KEYS.files)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addFiles(newFiles) {
  const files = listFiles()
  const enriched = newFiles.map((f, i) => ({
    id: `f_${Date.now()}_${i}`,
    name: f.name,
    size: f.size,
    uploadedAt: Date.now(),
    content: '',
  }))
  const next = [...enriched, ...files]
  localStorage.setItem(KEYS.files, JSON.stringify(next))
  if (enriched[0]) {
    localStorage.setItem(KEYS.selectedFile, enriched[0].id)
  }
  // Notify listeners that files changed
  try { window.dispatchEvent(new Event('ai-agent-files-changed')) } catch {}
  return next
}

export function getChatsForFile(fileId) {
  try {
    const raw = localStorage.getItem(KEYS.chats)
    const all = raw ? JSON.parse(raw) : {}
    return all[fileId] || []
  } catch {
    return []
  }
}

export function appendChatMessage(fileId, message) {
  const raw = localStorage.getItem(KEYS.chats)
  const all = raw ? JSON.parse(raw) : {}
  const list = all[fileId] || []
  list.push({ id: `m_${Date.now()}`, ...message })
  all[fileId] = list
  localStorage.setItem(KEYS.chats, JSON.stringify(all))
  return list
}

// Selected file helpers
export function getSelectedFileId() {
  return localStorage.getItem(KEYS.selectedFile) || ''
}
export function setSelectedFileId(fileId) {
  if (fileId) localStorage.setItem(KEYS.selectedFile, fileId)
}
export function getSelectedFile() {
  const id = getSelectedFileId()
  return listFiles().find(f => f.id === id) || null
}

// Cards per file
export function getCards(fileId) {
  const raw = localStorage.getItem(KEYS.cards)
  const all = raw ? JSON.parse(raw) : {}
  return all[fileId] || []
}
export function addCard(fileId, card) {
  const raw = localStorage.getItem(KEYS.cards)
  const all = raw ? JSON.parse(raw) : {}
  const list = all[fileId] || []
  const next = [...list, { id: `c_${Date.now()}`, ...card }]
  all[fileId] = next
  localStorage.setItem(KEYS.cards, JSON.stringify(all))
  return next
}
export function setCards(fileId, cards) {
  const raw = localStorage.getItem(KEYS.cards)
  const all = raw ? JSON.parse(raw) : {}
  all[fileId] = cards
  localStorage.setItem(KEYS.cards, JSON.stringify(all))
}

// Tests per file
export function getTestQuestions(fileId) {
  const raw = localStorage.getItem(KEYS.tests)
  const all = raw ? JSON.parse(raw) : {}
  return all[fileId] || []
}
export function setTestQuestions(fileId, questions) {
  const raw = localStorage.getItem(KEYS.tests)
  const all = raw ? JSON.parse(raw) : {}
  all[fileId] = questions
  localStorage.setItem(KEYS.tests, JSON.stringify(all))
}

export function hasAnyFile() {
  return listFiles().length > 0
}


