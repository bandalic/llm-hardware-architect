import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const gpuDatabase = [
  // NVIDIA RTX 50 Serisi [Nisan 2026 itibariyle 50 serisi için girdiğim veriler doğru olmayabilir!]
  { name: "NVIDIA RTX 5090", vram: 32, bandwidth: 1792 },
  { name: "NVIDIA RTX 5080", vram: 16, bandwidth: 1024 },
  { name: "NVIDIA RTX 5070 Ti", vram: 16, bandwidth: 672 },
  { name: "NVIDIA RTX 5070", vram: 12, bandwidth: 504 },
  // NVIDIA RTX 40 Serisi
  { name: "NVIDIA RTX 4090", vram: 24, bandwidth: 1008 },
  { name: "NVIDIA RTX 4080 Super", vram: 16, bandwidth: 736 },
  { name: "NVIDIA RTX 4080", vram: 16, bandwidth: 710 },
  { name: "NVIDIA RTX 4070 Ti Super", vram: 16, bandwidth: 672 },
  { name: "NVIDIA RTX 4070 Ti", vram: 12, bandwidth: 504 },
  { name: "NVIDIA RTX 4070 Super", vram: 12, bandwidth: 504 },
  { name: "NVIDIA RTX 4070", vram: 12, bandwidth: 504 },
  { name: "NVIDIA RTX 4060 Ti (16GB)", vram: 16, bandwidth: 288 },
  { name: "NVIDIA RTX 4060 Ti (8GB)", vram: 8, bandwidth: 288 },
  { name: "NVIDIA RTX 4060", vram: 8, bandwidth: 272 },
  // NVIDIA RTX 30 Serisi
  { name: "NVIDIA RTX 3090 Ti", vram: 24, bandwidth: 1008 },
  { name: "NVIDIA RTX 3090", vram: 24, bandwidth: 936 },
  { name: "NVIDIA RTX 3080 Ti", vram: 12, bandwidth: 912 },
  { name: "NVIDIA RTX 3080 (12GB)", vram: 12, bandwidth: 912 },
  { name: "NVIDIA RTX 3080 (10GB)", vram: 10, bandwidth: 760 },
  { name: "NVIDIA RTX 3070 Ti", vram: 8, bandwidth: 608 },
  { name: "NVIDIA RTX 3070", vram: 8, bandwidth: 448 },
  { name: "NVIDIA RTX 3060 Ti", vram: 8, bandwidth: 448 },
  { name: "NVIDIA RTX 3060 (12GB)", vram: 12, bandwidth: 360 },
  { name: "NVIDIA RTX 3050 (8GB)", vram: 8, bandwidth: 224 },
  // NVIDIA RTX 20 & GTX 10 Serisi
  { name: "NVIDIA RTX 2080 Ti", vram: 11, bandwidth: 616 },
  { name: "NVIDIA RTX 2060 (12GB)", vram: 12, bandwidth: 336 },
  { name: "NVIDIA GTX 1080 Ti", vram: 11, bandwidth: 484 },
  // NVIDIA Workstation (A / H / L Serisi)
  { name: "NVIDIA H100 (SXM5)", vram: 80, bandwidth: 3350 },
  { name: "NVIDIA A100 (80GB)", vram: 80, bandwidth: 2039 },
  { name: "NVIDIA A6000", vram: 48, bandwidth: 768 },
  { name: "NVIDIA RTX 6000 Ada", vram: 48, bandwidth: 960 },
  { name: "NVIDIA RTX 5000 Ada", vram: 32, bandwidth: 576 },
  { name: "NVIDIA L40S", vram: 48, bandwidth: 864 },
  // Apple Silicon (Unified Memory)
  { name: "Apple M3 Ultra (192GB)", vram: 192, bandwidth: 800 },
  { name: "Apple M3 Max (128GB)", vram: 128, bandwidth: 400 },
  { name: "Apple M3 Max (64GB)", vram: 64, bandwidth: 400 },
  { name: "Apple M3 Pro (36GB)", vram: 36, bandwidth: 150 },
  { name: "Apple M2 Ultra (192GB)", vram: 192, bandwidth: 800 },
  { name: "Apple M2 Max (96GB)", vram: 96, bandwidth: 400 },
  { name: "Apple M1 Ultra (128GB)", vram: 128, bandwidth: 800 },
  { name: "Apple M1 Max (64GB)", vram: 64, bandwidth: 400 },

// AMD Radeon RX 7000 Serisi (RDNA 3)
  { name: "AMD RX 7900 XTX", vram: 24, bandwidth: 960 },
  { name: "AMD RX 7900 XT", vram: 20, bandwidth: 800 },
  { name: "AMD RX 7900 GRE", vram: 16, bandwidth: 576 },
  { name: "AMD RX 7800 XT", vram: 16, bandwidth: 624 },
  { name: "AMD RX 7700 XT", vram: 12, bandwidth: 432 },
  { name: "AMD RX 7600 XT", vram: 16, bandwidth: 288 },
  { name: "AMD RX 7600", vram: 8, bandwidth: 288 },
  // AMD Radeon RX 6000 Serisi (RDNA 2)
  { name: "AMD RX 6950 XT", vram: 16, bandwidth: 512 },
  { name: "AMD RX 6900 XT", vram: 16, bandwidth: 512 },
  { name: "AMD RX 6800 XT", vram: 16, bandwidth: 512 },
  { name: "AMD RX 6800", vram: 16, bandwidth: 512 },
  { name: "AMD RX 6750 XT", vram: 12, bandwidth: 432 },
  { name: "AMD RX 6700 XT", vram: 12, bandwidth: 384 },
  { name: "AMD RX 6650 XT", vram: 8, bandwidth: 280 },
  { name: "AMD RX 6600 XT", vram: 8, bandwidth: 256 },
  { name: "AMD RX 6600", vram: 8, bandwidth: 224 },
  // AMD Radeon RX 5000 Serisi
  { name: "AMD RX 5700 XT", vram: 8, bandwidth: 448 },
  { name: "AMD RX 5700", vram: 8, bandwidth: 448 },
  { name: "AMD RX 5600 XT", vram: 6, bandwidth: 288 },
  // AMD Instinct (Data Center)
  { name: "AMD Instinct MI300X", vram: 192, bandwidth: 5300 },
  { name: "AMD Instinct MI250X", vram: 128, bandwidth: 3200 },
  { name: "AMD Instinct MI210", vram: 64, bandwidth: 1600 },
];

const models = [
  // Llama Serisi
  { name: "Llama 3.1 8B", params: 8 },
  { name: "Llama 3.1 70B", params: 70 },
  { name: "Llama 3.1 405B", params: 405 },
  { name: "Llama 3 8B", params: 8 },
  { name: "Llama 3 70B", params: 70 },
  // Mistral & Mixtral
  { name: "Mistral Large 2", params: 123 },
  { name: "Mistral 7B v0.3", params: 7 },
  { name: "Mistral NeMo 12B", params: 12 },
  { name: "Mixtral 8x7B (MoE)", params: 47 },
  { name: "Mixtral 8x22B", params: 141 },
  // Qwen (Alibaba)
  { name: "Qwen 2.5 Coder 7B", params: 7 },
  { name: "Qwen 2.5 Coder 32B", params: 32 },
  { name: "Qwen 2.5 72B", params: 72 },
  { name: "Qwen 2 57B A14B", params: 14 },
  // Google Gemma
  { name: "Gemma 2 9B", params: 9 },
  { name: "Gemma 2 27B", params: 27 },
  { name: "Gemma 2 2B", params: 2.6 },
  // Microsoft Phi
  { name: "Phi-3.5 Mini", params: 3.8 },
  { name: "Phi-3.5 MoE", params: 42 },
  { name: "Phi-3 Medium", params: 14 },
  // DeepSeek
  { name: "DeepSeek Coder V2 (236B)", params: 236 },
  { name: "DeepSeek-V2.5", params: 236 },
  { name: "DeepSeek Coder 6.7B", params: 6.7 },
  // Grok & Diğerleri
  { name: "Grok-1 (Mixture of Experts)", params: 314 },
  { name: "Command R+ (Cohere)", params: 104 },
  { name: "Falcon 180B", params: 180 }
];

function App() {
  const [selectedGpu, setSelectedGpu] = useState(gpuDatabase[4]); 
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [quant, setQuant] = useState(4);
  const [loading, setLoading] = useState(false);
  const [savedSystems, setSavedSystems] = useState([]);

  const fetchSystems = async () => {
    const { data, error } = await supabase
      .from('user_systems')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (!error) setSavedSystems(data);
  };

  useEffect(() => { fetchSystems(); }, []);

  const weightSize = quant === 4 ? 0.75 : 1.25; 
  const overhead = selectedModel.params > 100 ? 5 : (selectedModel.params > 30 ? 2 : 0.8);
  const requiredVram = ((selectedModel.params * weightSize) + overhead).toFixed(1);
  const isCompatible = selectedGpu.vram >= parseFloat(requiredVram);
  
  const estimatedTPS = isCompatible 
    ? Math.round(selectedGpu.bandwidth / (selectedModel.params * (quant === 4 ? 0.55 : 1.05))) 
    : 0;

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('user_systems')
      .insert([{ 
          user_name: 'Anonim Kullanıcı', 
          gpu_name: selectedGpu.name, 
          vram_capacity: selectedGpu.vram,
          selected_model: selectedModel.name 
      }]);

    if (error) alert("Hata: " + error.message);
    else { alert("Sistem doğrulandı! ✅"); fetchSystems(); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent italic tracking-tighter">
            HARDWARE BRAIN
          </h1>
          <p className="text-slate-500 mt-2 font-medium text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
            LLM Hardware Architect by Arda
          </p>
        </header>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 md:p-6 rounded-3xl shadow-2xl">
          <div className="grid gap-4 md:gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Donanım Birimi (GPU)</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-4 text-sm md:text-base text-white outline-none cursor-pointer"
                value={selectedGpu.name} onChange={(e) => setSelectedGpu(gpuDatabase.find(g => g.name === e.target.value))}>
                {gpuDatabase.map(gpu => <option key={gpu.name} value={gpu.name}>{gpu.name} ({gpu.vram}GB)</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Model Seçimi</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-4 text-sm md:text-base text-white outline-none cursor-pointer"
                  value={selectedModel.name} onChange={(e) => setSelectedModel(models.find(m => m.name === e.target.value))}>
                  {models.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Hassasiyet</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-4 text-sm md:text-base text-white outline-none cursor-pointer"
                  value={quant} onChange={(e) => setQuant(parseInt(e.target.value))}>
                  <option value={4}>4-bit (Hızlı)</option>
                  <option value={8}>8-bit (Hassas)</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`mt-6 md:mt-8 p-4 md:p-6 rounded-2xl border transition-all duration-700 ${isCompatible ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase">Gereken VRAM</p>
                <p className="text-2xl md:text-4xl font-black">{requiredVram}<span className="text-sm md:text-lg ml-1 text-slate-600">GB</span></p>
              </div>
              <div className="text-right">
                <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase">Tahmini Hız</p>
                <p className="text-2xl md:text-4xl font-mono font-black text-emerald-400">{estimatedTPS}<span className="text-sm md:text-lg ml-1 text-emerald-900 italic">t/s</span></p>
              </div>
            </div>
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-800/50 flex items-center justify-center">
               <span className={`px-4 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${isCompatible ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
                  {isCompatible ? '● System Verified' : '○ Upgrade Required'}
               </span>
            </div>
          </div>

          <button onClick={handleSave} disabled={loading || !isCompatible}
            className={`w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black py-4 md:py-5 rounded-2xl text-xs md:text-base transition-all shadow-xl active:scale-[0.98] ${loading || !isCompatible ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:-translate-y-1'}`}>
            {loading ? 'KAYDEDİLİYOR...' : 'BU KONFİGÜRASYONU ONAYLA'}
          </button>
        </div>

        {savedSystems.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h3 className="text-[9px] md:text-[10px] font-black mb-4 md:mb-6 text-slate-600 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              Topluluk Onaylı Kurulumlar
            </h3>
            <div className="grid gap-2 md:gap-3">
              {savedSystems.map((sys) => (
                <div key={sys.id} className="bg-slate-900/40 border border-slate-800/50 p-4 md:p-5 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs md:text-base">✓</div>
                    <div>
                      <p className="text-xs md:text-sm font-bold text-slate-200">{sys.gpu_name}</p>
                      <p className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{sys.selected_model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10 mb-1">VERIFIED</div>
                    <p className="text-[7px] md:text-[9px] font-mono text-slate-700 uppercase">
                      {new Date(sys.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <footer className="mt-16 text-center border-t border-slate-900 pt-8 pb-4">
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://github.com/bandalic" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-all hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <a href="https://linkedin.com/in/bandalic" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-all hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          <p className="text-slate-800 text-[9px] tracking-[0.5em] font-black uppercase">Hardware Brain - Designed by Arda © 2026</p>
        </footer>
      </div>
    </div>
  )
}

export default App