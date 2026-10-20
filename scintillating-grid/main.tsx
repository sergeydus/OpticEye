import SiteLayout from '../src/components/SiteLayout'
import ScintillatingGrid from '../src/illusions/scintillating-grid/ScintillatingGrid'
import { mountPage } from '../src/mountPage'

export function ScintillatingGridPage() {
  return <SiteLayout currentPage="scintillating-grid"><ScintillatingGrid /></SiteLayout>
}

mountPage(<ScintillatingGridPage />)
