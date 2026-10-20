import SiteLayout from '../src/components/SiteLayout'
import Poggendorff from '../src/illusions/poggendorff/Poggendorff'
import { mountPage } from '../src/mountPage'

export function PoggendorffPage() {
  return <SiteLayout currentPage="poggendorff"><Poggendorff /></SiteLayout>
}

mountPage(<PoggendorffPage />)
