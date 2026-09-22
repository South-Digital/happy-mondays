import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import IndexPage from './routes/IndexPage'
import ConceptA from './concepts/a/ConceptA'
import ConceptB from './concepts/b/ConceptB'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/concept-a" element={<ConceptA />} />
          <Route path="/concept-b" element={<ConceptB />} />
          <Route path="*" element={<IndexPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}
