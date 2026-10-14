import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, Mic, Video, FileText, Settings, Volume2, VolumeX, Accessibility } from 'lucide-react';

export default function TruthPulseAccessibleDashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const [simulationMode, setSimulationMode] = useState('human'); // human, voice_clone, deepfake
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [authenticityScore, setAuthenticityScore] = useState(94);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReaderAnnounce, setScreenReaderAnnounce] = useState('TruthPulse active. System secure.');
  const [audioAlertsEnabled, setAudioAlertsEnabled] = useState(true);
  const [transcript, setTranscript] = useState([
    { speaker: 'Caller', text: 'Hello, I am calling from your bank verification desk.', status: 'secure' }
  ]);

  // Audio feedback synthesizer for visually impaired users
  const playAlertTone = (type) => {
    if (!audioAlertsEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'secure') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        // Warning dual-tone beep
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3 note
        osc.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.error("Audio Context error", e);
    }
  };

  // Handle simulation mode changes with accessibility announcements
  const handleModeChange = (mode) => {
    setSimulationMode(mode);
    if (mode === 'human') {
      setAuthenticityScore(94);
      setScreenReaderAnnounce('Secure call verified. Human speaker confirmed.');
      playAlertTone('secure');
      setTranscript(prev => [...prev, { speaker: 'Caller', text: 'Confirming monthly account summary.', status: 'secure' }]);
    } else {
      setAuthenticityScore(14);
      setScreenReaderAnnounce('WARNING: Synthetic voice clone vocoder detected! High risk of scam.');
      playAlertTone('danger');
      setTranscript(prev => [...prev, { speaker: 'Caller (AI Spoof)', text: 'URGENT: Your account is frozen. Read your OTP now.', status: 'danger' }]);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${highContrast ? 'bg-black text-yellow-300' : 'bg-slate-950 text-slate-100'}`} role="main">
      {/* Screen Reader Live Region (Hidden visually but read aloud by screen readers) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {screenReaderAnnounce}
      </div>

      {/* Top Navigation & Accessibility Bar */}
      <header className="border-b border-slate-800 bg-slate-900/60 p-4 flex flex-wrap items-center justify-between gap-4" role="banner">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-cyan-400" aria-hidden="true" />
          <h1 className="text-xl font-bold tracking-tight">TruthPulse <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">A11y Enhanced</span></h1>
        </div>

        {/* Accessibility Quick Toggles */}
        <div className="flex items-center space-x-3 text-sm">
          <button 
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            aria-label="Toggle High Contrast Mode"
          >
            <Accessibility className="h-4 w-4 text-cyan-400" />
            <span>{highContrast ? 'Normal Contrast' : 'High Contrast'}</span>
          </button>

          <button 
            onClick={() => setAudioAlertsEnabled(!audioAlertsEnabled)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            aria-label={audioAlertsEnabled ? 'Mute Audio Chime Alerts' : 'Enable Audio Chime Alerts'}
          >
            {audioAlertsEnabled ? <Volume2 className="h-4 w-4 text-emerald-400" /> : <VolumeX className="h-4 w-4 text-red-400" />}
            <span>{audioAlertsEnabled ? 'Sound On' : 'Muted'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Panel: Live Telemetry & Simulation Controls */}
        <section aria-labelledby="control-heading" className="lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-6">
          <h2 id="control-heading" className="text-lg font-semibold flex items-center space-x-2">
            <Settings className="h-5 w-5 text-cyan-400" />
            <span>Forensic Simulation</span>
          </h2>

          <div className="space-y-3">
            <p className="text-xs text-slate-400">Select test mode to preview detection efficiency:</p>
            
            <button
              onClick={() => handleModeChange('human')}
              className={`w-full text-left p-3 rounded-lg border transition flex items-center justify-between ${
                simulationMode === 'human' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-800/40'
              }`}
              aria-pressed={simulationMode === 'human'}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="font-medium text-sm">Verified Human Call</span>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">94% Safe</span>
            </button>

            <button
              onClick={() => handleModeChange('voice_clone')}
              className={`w-full text-left p-3 rounded-lg border transition flex items-center justify-between ${
                simulationMode === 'voice_clone' ? 'border-red-500 bg-red-500/10' : 'border-slate-800 bg-slate-800/40'
              }`}
              aria-pressed={simulationMode === 'voice_clone'}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <span className="font-medium text-sm">ElevenLabs Voice Clone</span>
              </div>
              <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">14% Danger</span>
            </button>
          </div>

          {/* Real-time Score Gauge */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2" aria-live="polite">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Live Authenticity Index</p>
            <div className={`text-4xl font-extrabold ${authenticityScore > 75 ? 'text-emerald-400' : 'text-red-500'}`}>
              {authenticityScore}%
            </div>
            <p className="text-xs font-medium">
              {authenticityScore > 75 ? '🟢 Verified Human Connection' : '🔴 RED ALERT: Synthetic Vocoder Spoof Detected'}
            </p>
          </div>
        </section>

        {/* Right Panel: Live Accessible Transcript & Closed Captions */}
        <section aria-labelledby="transcript-heading" className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 id="transcript-heading" className="text-lg font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <span>Live Closed Captioning & Scam Risk Stream</span>
              </h2>
              <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">WCAG 2.1 AA Compliant</span>
            </div>

            {/* Scrolling Transcript Log */}
            <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-2" role="log" aria-live="polite" tabIndex="0">
              {transcript.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border text-sm flex items-start space-x-3 ${
                    item.status === 'danger' ? 'bg-red-950/30 border-red-800 text-red-200' : 'bg-slate-800/40 border-slate-700 text-slate-200'
                  }`}
                >
                  {item.status === 'danger' ? <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" /> : <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-bold text-xs uppercase opacity-75">{item.speaker}</span>
                    <p className="mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Press Tab to navigate interactive elements. Screen reader optimized.</span>
            <span className="text-cyan-400 font-medium">Protected by TruthPulse A11y Engine</span>
          </div>
        </section>

      </main>
    </div>
  );
}