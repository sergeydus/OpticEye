import Confetti from './illusions/confetti/Confetti'

export default function App() {
  return (
    <div className="min-h-svh bg-[#f6f5f0] text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-slate-300/70 px-4 py-6 sm:px-8">
        <a href="/" className="flex min-h-11 items-center gap-2.5 rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
          <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
          </svg>
          OpticEye
        </a>
        <span className="font-mono text-xs text-slate-600">A study in seeing</span>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-8 sm:pt-14">
        <Confetti />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-slate-300/70 px-4 py-6 text-xs text-slate-600 sm:px-8">
        <p>OpticEye · Explore your perception.</p>
        <p>Look closer. Then look again.</p>
      </footer>
    </div>
  )
}
