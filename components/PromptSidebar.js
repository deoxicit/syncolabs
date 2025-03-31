import { useEffect, useState } from 'react';

export default function PromptSidebar({ onSelect, isOpen, onClose }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('syncolab-runs') || '[]');
    setHistory(stored);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl border-r transition-transform z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg text-blue-600">🗂 Prompt History</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">No past prompts yet.</p>
        ) : (
          history.map((item, i) => (
            <button
              key={i}
              onClick={() => onSelect(item.prompt)}
              className="w-full text-left text-sm bg-slate-100 hover:bg-blue-100 border border-slate-200 p-2 rounded"
            >
              {item.prompt && item.prompt.length > 80
                ? item.prompt.slice(0, 80) + '…'
                : item.prompt || '⚠️ Missing prompt'}

            </button>
          ))
        )}
      </div>
    </div>
  );
}
