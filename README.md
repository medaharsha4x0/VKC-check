# VKC-check
, RVC) and face-swap deepfakes (DeepFaceLive) to impersonate CEOs, family members, or government officials during video and voice calls to extort money or execute "Digital Arrest" scams. Traditional security tools only check emails or static files—leaving live video calls completely unprotected.✨ The 100% Software SolutionTruthPulse is a zero-hardware desktop widget and forensic web dashboard that listens to system audio and watches active video frames every 3 seconds, delivering a real-time Human vs. AI Authenticity Score.Core Architecture & Detection PillarsAcoustic Spectrogram Forensics: Captures system audio loopback (pyaudiowpatch), converts audio chunks into Log-Mel Spectrograms, and spots high-frequency phase cutoffs (>8 kHz) and unnatural pitch jitter left behind by AI vocoders (HiFi-GAN).Biological Micro-Consistency (Lip-Sync): Tracks 468 3D facial landmarks via MediaPipe Face Mesh to compute the Mouth Aspect Ratio (MAR). It cross-correlates lip closure timing with audio phonemes within a 40ms window to catch real-time face-swap desync.Unified Weighted Fusion Engine: Blends acoustic and biological metrics into a real-time probability score ($S_{\text{authenticity}}$), instantly switching the floating HUD overlay from Green (Verified Human) to Crimson (Synthetic Injection Detected).1-Click Tamper-Proof Evidence Logger: Automatically records anomaly logs, generates SHA-256 cryptographic hashes of the offending audio/video buffer, and outputs a downloadable forensic FIR (First Information Report) certificate.🛠️ Tech StackFrontend Dashboard: React, Tailwind CSS, Lucide Icons, HTML5 Canvas.Desktop Overlay HUD: Python, PyQt6 (Qt.WindowStaysOnTopHint | Qt.FramelessWindowHint).Backend API: FastAPI, Uvicorn, WebSockets.AI & Signal Processing: PyTorch, Librosa (Mel-Spectrograms & RMS energy), MediaPipe Face Mesh, OpenCV.Audio Capture: PyAudioWPatch (WASAPI Loopback for system audio).📂 Repository StructurePlaintextTruthPulse/
├── backend/
│   ├── main.py               # FastAPI server & WebSocket stream handler
│   ├── audio_forensics.py    # Librosa Mel-Spectrogram & vocoder artifact detector
│   ├── vision_sync.py        # MediaPipe Face Mesh & Lip-Sync MAR calculator
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Live Forensic Command Center UI
│   │   └── index.css         # Tailwind styles
│   └── package.json          # Node dependencies
├── overlay/
│   └── hud_widget.py         # Floating desktop PyQt6 shield widget
└── README.md
🚀 Quick Start GuidePrerequisitesPython 3.10 or higherNode.js 18+ and npmA working microphone and webcam (for live demo testing)1. Clone the RepositoryBashgit clone https://github.com/your-username/TruthPulse.git
cd TruthPulse
2. Set Up the Python BackendBashcd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python main.py
(The FastAPI server will start on http://localhost:8000)3. Launch the Frontend DashboardOpen a new terminal tab:Bashcd frontend
npm install
npm run dev
(Open http://localhost:5173 in your browser to access the Live Forensic Command Center)🎬 How to Run the Live Stage DemoWhen presenting TruthPulse to judges, use these three pre-loaded test cases:Baseline Test (Verified Human): Speak live into your microphone or play a real interview video. The UI and floating HUD will show 94% Human (Green Shield).Voice Clone Attack Test: Click the "Simulate Vocoder Attack" preset button or play an AI-cloned voice note. Within 3 seconds, the score drops to 14% (Red Shield), highlighting the 8 kHz phase cutoff on the spectrogram.Evidence Export: Click "Export FIR Evidence" to instantly generate a downloadable cryptographic report formatted for cybercrime reporting portals.🏆 Future RoadmapBrowser Extension (Manifest V3): Injecting the shield directly into Chrome/Firefox tabs for zero-install Google Meet and WhatsApp Web protection.Federated Threat Intelligence: Anonymously sharing newly discovered zero-day vocoder signatures across enterprise security pools.Multilingual Scam Intent NLP: Integrating lightweight on-device LLMs to detect conversational coercion tactics ("Digital Arrest", "Urgent Wire Transfer").
