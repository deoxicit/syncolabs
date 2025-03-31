import Link from 'next/link';

export default function Layout({ children }) {

    return (
        <>
            <nav className="bg-white border-b shadow-sm px-6 py-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        🧠 SynCoLab
                    </Link>
                    <div className="space-x-4 text-sm font-medium text-gray-700">
                        <Link href="/" className="hover:text-blue-500">Home</Link>
                        <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
                        <Link href="/visualizer" className="hover:text-blue-500">CID Visualizer</Link>
                    </div>

                </div>
            </nav>

            <main className="bg-gray-50 min-h-screen py-10 px-4 text-slate-800">
                <div className="max-w-5xl mx-auto">{children}</div>
            </main>
        </>
    );
}
