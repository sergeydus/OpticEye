import SiteLayout from './components/SiteLayout'
import { LISTED_ILLUSIONS, pageHref } from './illusions'

export default function App() {
  return (
    <SiteLayout currentPage="home">
      <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">A study in seeing</p>
      <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">Explore optical illusions</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">Choose an experiment. Compare what you see, change the context, and reveal what stays the same.</p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {LISTED_ILLUSIONS.map((illusion) => (
          <li key={illusion.id} className="rounded-lg border border-slate-300 bg-white/50 p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              <a href={pageHref(illusion.id, import.meta.env.BASE_URL)} className="inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">{illusion.title}</a>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{illusion.description}</p>
          </li>
        ))}
      </ul>
    </SiteLayout>
  )
}
