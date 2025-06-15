import { useState, useRef } from 'react'
import ReportEntry from './ReportEntry'
import Hero from './Hero'
import Fotter from './footer'
import Navbar from './Navbar'
import ReportMaking from './ReportContent'
import HealthcareAI from './ai'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import './App.css'

function App() {
  const [showReportContent, setShowReportContent] = useState(false)
  const nodeRef = useRef(null)
  const [allExtractedText, setAllExtractedText] = useState({
    bloodTest: '',
    prescription: '',
    diagnosis: '',
    allergy: '',
    bodyMeasurements: ''
  })
  const [triggerReportGen, setTriggerReportGen] = useState(0);

  const handleSendReports = () => {
    setShowReportContent(true)
    console.log('[App] handleSendReports: Show report content');
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('report-section').offsetTop - 100,
        behavior: 'smooth'
      })
    }, 100)
  }

  const handleGoBack = () => {
    setShowReportContent(false)
    console.log('[App] handleGoBack: Back to entry');
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('report-section').offsetTop - 100,
        behavior: 'smooth'
      })
    }, 100)
  }

  const handleTextExtracted = (type, text) => {
    console.log('[App] handleTextExtracted:', type, text);
    setAllExtractedText(prev => ({ ...prev, [type]: text }))
  }

  // This function will be called when user submits files
  const handleSubmitFiles = () => {
    setTriggerReportGen(prev => prev + 1);
    console.log('[App] handleSubmitFiles: Trigger report generation');
  }

  return (
    <div className="main-container">
      <Navbar />
      <Hero  />
      <div id="report-section">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={showReportContent ? 'report-content' : 'report-entry'}
            nodeRef={nodeRef}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >            <div ref={nodeRef}>
              {showReportContent ? (
                <ReportMaking onGoBack={handleGoBack} onTextExtracted={handleTextExtracted} onSubmitFiles={handleSubmitFiles} />
              ) : (
                <ReportEntry onSendReports={handleSendReports} />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>

      </div>
      <HealthcareAI extractedText={allExtractedText} triggerReportGen={triggerReportGen} />
      <Fotter />

    </div>
  )
}

export default App
