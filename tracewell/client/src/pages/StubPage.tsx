import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";

export default function StubPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-xl font-medium">{title}</h1>
        <p className="mt-2 text-sm text-neutral-400">Page content coming soon.</p>
      </main>
      <ChatWidget />
    </div>
  );
}
