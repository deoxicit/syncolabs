import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function CIDVisualizer() {
  const [cid, setCid] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!cid) return;
    setLoading(true);
    setFiles([]);

    const fileList = ['input.txt', 'output.txt', 'cot.txt', 'metadata.txt', 'validation.txt', 'score.txt'];

    const fetchedFiles = await Promise.all(fileList.map(async (name) => {
      try {
        const res = await fetch(`https://${cid}.ipfs.w3s.link/${name}`);
        if (!res.ok) return null;
        const text = await res.text();
        return { name, content: text };
      } catch {
        return null;
      }
    }));

    setFiles(fetchedFiles.filter(Boolean));
    setLoading(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    files.forEach((file) => zip.file(file.name, file.content));
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `cid-${cid}.zip`);
  };

  return (
    <div className="min-h-screen text-slate-800 p-8">
      <h1 className="text-2xl font-bold mb-4">🖼️ CID Visualizer</h1>
      <input
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter IPFS CID..."
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleFetch}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
      >
        Fetch Files
      </button>
      {files.length > 0 && (
        <button
          onClick={downloadZip}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          📦 Download All
        </button>
      )}

      {loading && <p className="mt-4">Loading files from IPFS...</p>}

      <div className="mt-6 space-y-4">
        {files.map(({ name, content }) => (
          <div key={name} className="bg-white border rounded p-4 shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{name}</h2>
              <button
                onClick={() => navigator.clipboard.writeText(content)}
                className="text-sm text-blue-500 underline"
              >
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
