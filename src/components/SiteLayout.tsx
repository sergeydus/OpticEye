import type { ReactNode } from 'react'
import type { PageId } from '../illusions'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import IllusionNavigation from './IllusionNavigation'

type Props = { currentPage: PageId; children: ReactNode }

export default function SiteLayout({ currentPage, children }: Props) {
  return (
    <div className="min-h-svh bg-[#f6f5f0] text-slate-900">
      <SiteHeader currentPage={currentPage} />
      <main id="main" className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-8 sm:pt-14">
        {children}
        <IllusionNavigation currentPage={currentPage} />
      </main>
      <SiteFooter />
    </div>
  )
}
