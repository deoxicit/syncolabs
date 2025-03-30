import { useState,useEffect } from 'react';
import { PROMPT_TEMPLATES } from '@/utils/templates';
import Link from 'next/link';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  const handleCategorySelect = (cat) => {
    const randomPrompt = PROMPT_TEMPLATES[cat][Math.floor(Math.random() * PROMPT_TEMPLATES[cat].length)];
    setPrompt(randomPrompt);
    setCategory(cat);
  };

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

  useEffect(() => {
    if (result) {
      const history = JSON.parse(localStorage.getItem('syncolab-runs') || '[]');
      history.unshift({ ...result, timestamp: Date.now() });
      localStorage.setItem('syncolab-runs', JSON.stringify(history.slice(0, 20))); // Keep last 20
    }
  }, [result]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800 p-8">
      <Link href="/dashboard" className="text-sm text-blue-500 underline ml-4">📊 Dashboard</Link>
      <Link href="/visualizer" className="text-sm text-blue-500 underline ml-4">🖼️ CID Viewer</Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600">🧪 SynCoLab</h1>

        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {Object.keys(PROMPT_TEMPLATES).map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${category === cat ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'
                }`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt or select a category"
            className="w-full md:flex-1 p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            {loading ? 'Running...' : 'Run Agents'}
          </button>
        </form>

        {result && (
          <div className="bg-white border border-slate-200 shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">📄 Result</h2>
            <ResultRow label="Prompt" value={result.prompt} />
            <ResultRow label="Generated Data" value={result.syntheticData} />
            <ResultRow label="Generator Reasoning (CoT)" value={result.generatorCoT} />
            <ResultRow label="Validator Score" value={result.score} />
            <ResultRow label="Validator Reasoning" value={result.validatorCoT} />
            {result.cid && (
              <p className="mt-4">
                <a
                  href={`https://${result.cid}.ipfs.w3s.link`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  🔗 View on IPFS
                </a>
              </p>
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
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <div className="bg-slate-50 border border-slate-200 p-3 rounded text-sm whitespace-pre-wrap">
        {value}
      </div>
    </div>
  );
}
