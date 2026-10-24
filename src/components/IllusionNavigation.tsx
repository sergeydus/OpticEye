import { LISTED_ILLUSIONS, pageHref, type PageId } from '../illusions'

type Props = { currentPage: PageId; base?: string }

export default function IllusionNavigation({ currentPage, base = import.meta.env.BASE_URL }: Props) {
  const index = LISTED_ILLUSIONS.findIndex(({ id }) => id === currentPage)
  if (index === -1) return null

  const previous = LISTED_ILLUSIONS[index - 1]
  const next = LISTED_ILLUSIONS[index + 1]
  if (!previous && !next) return null

  const linkClass = 'flex min-h-11 min-w-0 flex-col justify-center gap-1 rounded-lg border border-slate-300 px-4 py-4 hover:border-teal-700 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

  return (
    <nav aria-label="Illusion navigation" className="mt-12 grid grid-cols-2 gap-3 border-t border-slate-300/70 pt-6">
      {previous && (
        <a href={pageHref(previous.id, base)} rel="prev" className={linkClass}>
          <span className="text-xs text-slate-600"><span aria-hidden="true">← </span>Previous illusion</span>{' '}
          <span className="text-sm font-semibold break-words text-teal-800">{previous.name}</span>
        </a>
      )}
      {next && (
        <a href={pageHref(next.id, base)} rel="next" className={`${linkClass} col-start-2 text-right`}>
          <span className="text-xs text-slate-600">Next illusion<span aria-hidden="true"> →</span></span>{' '}
          <span className="text-sm font-semibold break-words text-teal-800">{next.name}</span>
        </a>
      )}
    </nav>
  )
}
