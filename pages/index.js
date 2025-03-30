import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/runAgents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.result);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SynCoLab</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Run</button>
      </form>
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Prompt:</strong> {result.prompt}</p>
          <p><strong>Data:</strong> {result.syntheticData}</p>
          <p><strong>Gen CoT:</strong> {result.generatorLog}</p>
          <p><strong>Score:</strong> {result.score}</p>
          <p><strong>Validation:</strong> {result.validatorLog}</p>
        </div>
      )}
    </div>
  );
}
