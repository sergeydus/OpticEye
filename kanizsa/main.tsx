import SiteLayout from '../src/components/SiteLayout'
import Kanizsa from '../src/illusions/kanizsa/Kanizsa'
import { mountPage } from '../src/mountPage'

export function KanizsaPage() {
  return <SiteLayout currentPage="kanizsa"><Kanizsa /></SiteLayout>
}

mountPage(<KanizsaPage />)
