import { useEffect, useState } from 'react';
import { uploadAgentData } from '@/scripts/storageAgent';

export default function Dashboard() {
    const [runs, setRuns] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [runsCID, setRunsCID] = useState(null);

    console.log(runs);
    useEffect(() => {
        const localRuns = JSON.parse(localStorage.getItem('syncolab-runs') || '[]');
        setRuns(localRuns);
    }, []);

    async function handleUploadToStoracha() {
        setUploading(true);
        const content = JSON.stringify(runs, null, 2);
        const cid = await uploadAgentData('generator', {
            'runs.json': content
        });
        setRunsCID(cid);
        setUploading(false);
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">📊 SynCoLab Run History</h1>

            <div className="mb-6">
                <button
                    onClick={handleUploadToStoracha}
                    disabled={runs.length === 0 || uploading}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    {uploading ? 'Uploading...' : '📤 Upload All Runs to Storacha'}
                </button>

                {runsCID && (
                    <p className="mt-2 text-sm">
                        ✅ Uploaded! View on IPFS:{' '}
                        <a
                            href={`https://${runsCID}.ipfs.w3s.link/runs.json`}
                            target="_blank"
                            className="text-blue-600 underline"
                        >
                            {runsCID}
                        </a>
                    </p>
                )}
            </div>

            {runs.length === 0 ? (
                <p>No past runs found.</p>
            ) : (
                <div className="space-y-4">
                    {runs.map((run, i) => (
                        <div key={i} className="bg-white border p-4 rounded shadow">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <div>{new Date(run.timestamp).toLocaleString()}</div>
                                <div>
                                    Score:{' '}
                                    <span className="font-bold text-blue-600">{run.score}</span>
                                </div>
                            </div>
                            <p className="font-semibold mb-1">Prompt:</p>
                            <p className="text-sm text-gray-800">{run.prompt}</p>

                            <div className="flex gap-4 mt-4 text-sm">
                                {run.generatorCID && (
                                    <a
                                        href={`https://w3s.link/ipfs/${run.generatorCID['/']}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Generator CID
                                    </a>

                                )}
                                {run.validatorCID && (
                                    <a
                                        href={`https://w3s.link/ipfs/${run.validatorCID['/']}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 underline"
                                    >
                                        Validator CID
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
