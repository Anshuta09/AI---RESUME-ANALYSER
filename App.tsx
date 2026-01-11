import React, { useState, useEffect } from 'react';
import { 
  FileUp, Search, Loader2, AlertCircle, RefreshCw, 
  Github, ArrowRight, UserCheck, Briefcase, Zap, Key, 
  Moon, Sun, ShieldCheck
} from 'lucide-react';
import { AnalysisState } from './types';
import { analyzeResume } from './services/geminiService';
import AnalysisDashboard from './components/AnalysisDashboard';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    results: null,
    error: null,
  });

  // Handle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  const startAnalysis = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setState(prev => ({ ...prev, error: 'Please provide both your resume and the job description.' }));
      return;
    }

    setState({ isAnalyzing: true, results: null, error: null });

    try {
      const results = await analyzeResume(resumeText, jobDescription);
      setState({ isAnalyzing: false, results, error: null });
    } catch (err: any) {
      console.error(err);
      setState({ 
        isAnalyzing: false, 
        results: null, 
        error: err.message || 'Analysis failed. Check your API key in the .env file.' 
      });
    }
  };

  const reset = () => {
    setState({ isAnalyzing: false, results: null, error: null });
    setResumeText('');
    setJobDescription('');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-[#0f0a0a]">
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-burgundy-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-burgundy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-burgundy-800 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-burgundy-900/20">R</div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-burgundy-800 to-burgundy-500 dark:from-burgundy-300 dark:to-burgundy-100">
              ResumeInsight
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-burgundy-900 transition-colors text-slate-600 dark:text-burgundy-200"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href="https://github.com/your-username/resume-analyzer" 
              target="_blank" 
              className="text-slate-500 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-white transition-colors"
            >
              <Github size={22} />
            </a>
            <div className="h-6 w-px bg-slate-200 dark:bg-burgundy-900 hidden sm:block"></div>
            <button className="hidden sm:flex items-center gap-2 bg-burgundy-800 hover:bg-burgundy-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-burgundy-900/20 transition-all active:scale-95">
              <ShieldCheck size={16} /> Local Mode
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero Section */}
        {!state.results && !state.isAnalyzing && (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Professional <span className="text-burgundy-800 dark:text-burgundy-400 underline decoration-burgundy-200/30 underline-offset-8">Resume Analyzer</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-burgundy-200/60 max-w-2xl mx-auto mb-10">
              The premium, local-first solution to optimize your career. Powered by Google Gemini.
            </p>
          </div>
        )}

        {/* Action Panel */}
        {!state.results && (
          <div className={`max-w-4xl mx-auto bg-white dark:bg-burgundy-950 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-burgundy-900/40 transition-all duration-500 ${state.isAnalyzing ? 'scale-95 opacity-50 blur-sm pointer-events-none' : 'scale-100'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="flex items-center text-xs font-black text-burgundy-800 dark:text-burgundy-400 uppercase tracking-[0.2em]">
                  <FileUp className="mr-2" size={16} /> 01. Resume Data
                </label>
                <textarea
                  className="w-full h-64 p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-burgundy-900/30 rounded-2xl focus:ring-4 focus:ring-burgundy-100 dark:focus:ring-burgundy-900/30 transition-all outline-none resize-none text-sm dark:text-burgundy-50"
                  placeholder="Paste your resume content..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
                <label className="cursor-pointer flex items-center justify-center w-full py-3 border-2 border-dashed border-slate-200 dark:border-burgundy-900/40 rounded-xl text-slate-400 hover:text-burgundy-800 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20 transition-all">
                  <FileUp size={18} className="mr-2" />
                  <span className="text-xs font-bold uppercase">Load Text File</span>
                  <input type="file" className="hidden" accept=".txt" onChange={handleFileUpload} />
                </label>
              </div>

              <div className="space-y-4">
                <label className="flex items-center text-xs font-black text-burgundy-800 dark:text-burgundy-400 uppercase tracking-[0.2em]">
                  <Search className="mr-2" size={16} /> 02. Target Role
                </label>
                <textarea
                  className="w-full h-[312px] p-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-burgundy-900/30 rounded-2xl focus:ring-4 focus:ring-burgundy-100 dark:focus:ring-burgundy-900/30 transition-all outline-none resize-none text-sm dark:text-burgundy-50"
                  placeholder="Paste job description..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>

            {state.error && (
              <div className="mt-8 p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-xl flex items-center text-sm font-medium border border-rose-100 dark:border-rose-900/30">
                <AlertCircle size={18} className="mr-2" /> {state.error}
              </div>
            )}

            <button
              onClick={startAnalysis}
              disabled={!resumeText || !jobDescription}
              className="mt-10 w-full bg-burgundy-800 hover:bg-burgundy-900 disabled:bg-slate-300 dark:disabled:bg-burgundy-950 text-white font-bold py-5 rounded-2xl shadow-xl shadow-burgundy-900/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-[0.98]"
            >
              Begin Comprehensive Analysis <ArrowRight size={20} />
            </button>
          </div>
        )}

        {state.isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <Loader2 size={64} className="text-burgundy-800 dark:text-burgundy-400 animate-spin" />
              <div className="absolute inset-0 bg-burgundy-600/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">AI Engine Running</h2>
              <p className="text-slate-500 dark:text-burgundy-300/60 mt-2">Checking market trends and keyword matching...</p>
            </div>
          </div>
        )}

        {state.results && !state.isAnalyzing && (
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Intelligence Report</h2>
                <p className="text-slate-500 dark:text-burgundy-300/60">Comprehensive resume vs. role breakdown</p>
              </div>
              <button 
                onClick={reset} 
                className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-burgundy-950 text-burgundy-800 dark:text-burgundy-400 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/40 font-bold rounded-full border border-slate-200 dark:border-burgundy-900/40 transition-all shadow-sm"
              >
                <RefreshCw size={18} /> Restart Analysis
              </button>
            </div>
            <AnalysisDashboard data={state.results} />
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-burgundy-950 border-t border-slate-100 dark:border-burgundy-900/30 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 bg-burgundy-800 rounded flex items-center justify-center text-white font-bold text-[10px]">R</div>
            <span className="font-bold text-slate-800 dark:text-burgundy-200">ResumeInsight v1.0</span>
          </div>
          <p className="text-slate-400 dark:text-burgundy-500 text-xs font-medium uppercase tracking-[0.2em]">
            Built with Gemini Pro & React
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
