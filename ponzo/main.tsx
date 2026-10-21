import SiteLayout from '../src/components/SiteLayout'
import Ponzo from '../src/illusions/ponzo/Ponzo'
import { mountPage } from '../src/mountPage'

export function PonzoPage() {
  return <SiteLayout currentPage="ponzo"><Ponzo /></SiteLayout>
}

mountPage(<PonzoPage />)
