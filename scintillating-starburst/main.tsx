import SiteLayout from '../src/components/SiteLayout'
import ScintillatingStarburst from '../src/illusions/scintillating-starburst/ScintillatingStarburst'
import { mountPage } from '../src/mountPage'

export function ScintillatingStarburstPage() {
  return <SiteLayout currentPage="scintillating-starburst"><ScintillatingStarburst /></SiteLayout>
}

mountPage(<ScintillatingStarburstPage />)
