import SiteLayout from '../src/components/SiteLayout'
import NeonColorSpreading from '../src/illusions/neon-color-spreading/NeonColorSpreading'
import { mountPage } from '../src/mountPage'

export function NeonColorSpreadingPage() {
  return <SiteLayout currentPage="neon-color-spreading"><NeonColorSpreading /></SiteLayout>
}

mountPage(<NeonColorSpreadingPage />)
