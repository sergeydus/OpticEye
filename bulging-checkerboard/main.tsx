import SiteLayout from '../src/components/SiteLayout'
import BulgingCheckerboard from '../src/illusions/bulging-checkerboard/BulgingCheckerboard'
import { mountPage } from '../src/mountPage'

export function BulgingCheckerboardPage() {
  return <SiteLayout currentPage="bulging-checkerboard"><BulgingCheckerboard /></SiteLayout>
}

mountPage(<BulgingCheckerboardPage />)
