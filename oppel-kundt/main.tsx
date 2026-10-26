import SiteLayout from '../src/components/SiteLayout'
import OppelKundt from '../src/illusions/oppel-kundt/OppelKundt'
import { mountPage } from '../src/mountPage'

export function OppelKundtPage() {
  return <SiteLayout currentPage="oppel-kundt"><OppelKundt /></SiteLayout>
}

mountPage(<OppelKundtPage />)
