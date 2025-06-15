import React, { useState, useRef, useEffect } from "react";
import "./ai.css";
import picture from "./assets/picture.png";
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import maleAvatar from './assets/face2.png';
import femaleAvatar from './assets/picture.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

function HealthcareAI({ extractedText, triggerReportGen }) {
  // Sample messages array for the chat
  const [messages, setMessages] = useState([
  ]);

  // State for new message input
  const [newMessage, setNewMessage] = useState("");
  // State for typing indicator
  const [isTyping, setIsTyping] = useState(false);
  // Reference for auto-scrolling
  const chatContainerRef = useRef(null);

  const [report, setReport] = useState('');
  const [loadingReport, setLoadingReport] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Function to get current time in 12-hour format
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  // Gemini API constants
  const GEMINI_API_KEY = 'AIzaSyBpbtlJwRWNLlqJmJpKJBo34O_A5AzKKLw';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  useEffect(() => {
    console.log('[HealthcareAI] extractedText changed:', extractedText);
  }, [extractedText]);

  useEffect(() => {
    if (triggerReportGen > 0) {
      setLoadingReport(true);
      setTimeout(() => {
        const dummyReport = `{
  "name": "Amit Sharma",
  "age": "38",
  "gender": "Male",
  "report_date": "2024-06-07",
  "health_summary": "Amit is in generally good health, but his recent blood test shows slightly elevated cholesterol and borderline blood sugar. His blood pressure is within normal range.",
  "primary_concerns": "Elevated cholesterol, borderline blood sugar.",
  "allergies": "No known allergies."
}`;
        setReport(dummyReport);
        setMessages(prev => ([...prev, {
          id: prev.length + 1,
          text: '[Health Report Generated]\n' + dummyReport,
          sender: 'bot',
          time: getCurrentTime()
        }]));
        setLoadingReport(false);
      }, 7000); // 7 seconds loading
    }
    // eslint-disable-next-line
  }, [triggerReportGen]);

  // Parse the report JSON for display
  let parsedReport = null;
  try {
    parsedReport = report ? JSON.parse(report) : null;
  } catch (e) {
    parsedReport = null;
  }

  // Example health metrics for the graphs
  const healthMetrics = {
    labels: ['Cholesterol', 'Blood Sugar', 'Blood Pressure', 'BMI'],
    datasets: [
      {
        label: 'Your Value',
        data: [230, 110, 120, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Normal Max',
        data: [200, 100, 130, 24],
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Blood Sugar (mg/dL)',
        data: [105, 110, 108, 112, 109, 111],
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ['HDL', 'LDL', 'Triglycerides'],
    datasets: [
      {
        label: 'Cholesterol Breakdown',
        data: [50, 120, 60],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: ['Diet', 'Exercise', 'Sleep', 'Stress', 'Hydration'],
    datasets: [
      {
        label: 'Lifestyle Score',
        data: [7, 6, 8, 5, 7],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Health Metrics Comparison' },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Blood Sugar Trend (6 months)' },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Cholesterol Breakdown' },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Lifestyle Assessment' },
    },
  };

  // Download PDF handler
  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById('health-report-section');
    if (!reportElement) return;
    const canvas = await html2canvas(reportElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save('health_report.pdf');
  };

  // Handle message sending (for chat bot)
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "you",
      time: getCurrentTime()
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Call Gemini API for chat bot
    const prompt = `You are an AI health assistant.Your name is "MediNuvo". Built a proper conversation with the user. ask user step by step what's his or her problem. Ask one question at a time. Answer the user's health-related question in a helpful, friendly, and professional manner. Reply shortly and to the point.\n\nUser: ${newMessage}`;
    fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        let geminiText = '';
        try {
          geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
        } catch (e) {
          geminiText = 'Sorry, I could not generate a response.';
        }
        setIsTyping(false);
        setMessages(prev => ([...prev, {
          id: prev.length + 1,
          text: geminiText,
          sender: 'bot',
          time: getCurrentTime()
        }]));
      })
      .catch(() => {
        setIsTyping(false);
        setMessages(prev => ([...prev, {
          id: prev.length + 1,
          text: 'Sorry, there was an error connecting to the AI doctor.',
          sender: 'bot',
          time: getCurrentTime()
        }]));
      });
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  function parseQuestionsFromMessage(message) {
    // This regex matches lines starting with a number and a dot (e.g., "1. ...")
    const questionRegex = /\d+\.\s*\*\*(.*?)\*\*\s*\((.*?)\)|\d+\.\s*\*\*(.*?)\*\*|(\d+\.\s*.+?)(?=\d+\.|$)/gs;
    const matches = [];
    let match;

    while ((match = questionRegex.exec(message)) !== null) {
      // Try to extract the question text from the various possible match groups
      const question = match[1] || match[3] || match[4];
      if (question) {
        matches.push(question.trim());
      }
    }
    return matches;
  }

  return (
    <div className="healthcare-container">
      <div className="healthcare-left">
        <h1 className="report-title">Personalized Health Report</h1>
        <div className="report-header" id="health-report-section">
          <div className="report-info">
            {loadingReport ? (
              <p><em>Generating report...</em></p>
            ) : parsedReport ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ margin: 0 }}>{parsedReport.name}</h2>
                    <div style={{ fontSize: 16, color: '#444' }}>
                      <span>Age: {parsedReport.age}</span> | <span>Gender: {parsedReport.gender}</span>
                    </div>
                    <div style={{ fontSize: 15, color: '#666', marginTop: 4 }}>Report Date: {parsedReport.report_date}</div>
                  </div>
                  <div className="report-avatar">
                    <img
                      src={parsedReport.gender && parsedReport.gender.toLowerCase() === 'female' ? femaleAvatar : maleAvatar}
                      alt="Avatar"
                      className="avatar"
                      style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover', marginLeft: 16 }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <strong>Health Summary:</strong>
                  <div style={{ marginTop: 2 }}>{parsedReport.health_summary}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <strong>Primary Concern(s):</strong>
                  <div style={{ marginTop: 2 }}>{parsedReport.primary_concerns}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <strong>Allergies (if any):</strong>
                  <div style={{ marginTop: 2 }}>{parsedReport.allergies}</div>
                </div>
                <div style={{ margin: '24px 0' }}>
                  <Bar data={healthMetrics} options={chartOptions} />
                </div>
                <div style={{ margin: '24px 0' }}>
                  <Line data={lineData} options={lineOptions} />
                </div>
                {/* <div style={{ margin: '24px 0' }}>
                  <Pie data={pieData} options={pieOptions} />
                </div>
                <div style={{ margin: '24px 0' }}>
                  <Radar data={radarData} options={radarOptions} />
                </div> */}
                <div style={{ textAlign: 'right', marginTop: 24 }}>
                  <button onClick={handleDownloadPDF} style={{ padding: '10px 24px', background: '#6a79f5', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
                    Download PDF
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="healthcare-right">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>Healthcare Assistant</h3>
              <span className="status">Online</span>
            </div>
          </div>
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                <div className="chat-bubble">
                  <p>{msg.text}</p>
                </div>
                <span className="time">{msg.time}</span>
              </div>
            ))}

            {/* Show typing indicator when bot is "typing" */}
            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chat-typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Ask me about your health..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <span className="send-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthcareAI;