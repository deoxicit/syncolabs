import { useState, useEffect } from 'react';
import { PROMPT_TEMPLATES } from '@/utils/templates';
import PromptSidebar from '@/components/PromptSidebar';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const res = await fetch('/api/runAgents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const handleCategorySelect = async (cat) => {
    setCategory(cat);
    setPrompt('Generating prompt...');
    const res = await fetch('/api/generatePrompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: cat }),
    });
    const data = await res.json();
    setPrompt(data.prompt);
  };

  useEffect(() => {
    if (result) {
      const history = JSON.parse(localStorage.getItem('syncolab-runs') || '[]');
      history.unshift({ ...result, timestamp: Date.now() });
      localStorage.setItem('syncolab-runs', JSON.stringify(history.slice(0, 20)));
    }
  }, [result]);

  return (
    <main className="min-h-screen  text-slate-800 px-4 py-12">


      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-2 right-4 bg-blue-600 text-white rounded-full px-4 py-2 shadow z-50 hover:bg-blue-700"
      >
        📜 History
      </button>
      <PromptSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={(promptText) => {
          setPrompt(promptText);
          setSidebarOpen(false);
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-600 tracking-tight">
          🧠 SynCoLab
        </h1>

        {/* Category Buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {Object.keys(PROMPT_TEMPLATES).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${category === cat
                ? 'bg-blue-700 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prompt Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch mb-10">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt or select a category"
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold shadow transition ${loading
                ? 'bg-blue-300 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {loading ? 'Running...' : 'Run Agents'}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="bg-white border border-slate-200 shadow-lg rounded-xl p-6 space-y-6 transition">
            <h2 className="text-2xl font-semibold text-slate-700 border-b pb-2">🧪 Results</h2>
            <ResultRow label="Prompt" value={result.prompt} />
            <ResultRow label="Synthetic Output" value={result.syntheticData} />
            <ResultRow label="Generator Reasoning (CoT)" value={result.generatorCoT} />
            <ResultRow label="Validator Score" value={result.score} />
            <ResultRow label="Validator Reasoning" value={result.validatorCoT} />
            {result.generatorCID && (
              <div className="pt-4 text-sm">
                <p className="mb-1 text-gray-500">🔗 Generator CID:</p>
                <a
                  href={`https://w3s.link/ipfs/${result.generatorCID?.["/"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  https://w3s.link/ipfs/{result.generatorCID?.["/"]}
                </a>
              </div>
            )}
            {result.validatorCID && (
              <div className="text-sm">
                <p className="mb-1 text-gray-500">🔗 Validator CID:</p>
                <a
                  href={`https://w3s.link/ipfs/${result.validatorCID?.["/"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline break-all"
                >
                  https://w3s.link/ipfs/{result.validatorCID?.["/"]}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function ResultRow({ label, value }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
        {value}
      </div>
    </div>
  );
}
