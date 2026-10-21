import SiteLayout from '../src/components/SiteLayout'
import Hering from '../src/illusions/hering/Hering'
import { mountPage } from '../src/mountPage'

export function HeringPage() {
  return <SiteLayout currentPage="hering"><Hering /></SiteLayout>
}

mountPage(<HeringPage />)
