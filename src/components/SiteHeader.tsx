import { ILLUSIONS, pageHref, type PageId } from '../illusions'

type Props = { currentPage: PageId; base?: string }

export default function SiteHeader({ currentPage, base = import.meta.env.BASE_URL }: Props) {
  const pages = [{ id: 'home', name: 'Home' }, ...ILLUSIONS] as const
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-slate-300/70 px-4 py-5 sm:px-8">
      <a href={pageHref('home', base)} className="flex min-h-11 items-center gap-2.5 rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
        OpticEye
      </a>
      <nav aria-label="Main navigation" className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {pages.map((page) => (
          <a key={page.id} href={pageHref(page.id, base)} aria-current={currentPage === page.id ? 'page' : undefined} className="inline-flex min-h-11 items-center text-teal-800 underline-offset-4 hover:underline aria-[current=page]:font-semibold aria-[current=page]:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">{page.name}</a>
        ))}
      </nav>
    </header>
  )
}
