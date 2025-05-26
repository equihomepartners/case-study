import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import StandaloneDemo from './demo/StandaloneDemo'
import CaseStudyDemo from './demo/CaseStudyDemo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/case-study" element={<CaseStudyDemo />} />
        <Route path="/*" element={<StandaloneDemo />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
