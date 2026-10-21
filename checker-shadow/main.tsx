import SiteLayout from '../src/components/SiteLayout'
import CheckerShadow from '../src/illusions/checker-shadow/CheckerShadow'
import { mountPage } from '../src/mountPage'

export function CheckerShadowPage() {
  return <SiteLayout currentPage="checker-shadow"><CheckerShadow /></SiteLayout>
}

mountPage(<CheckerShadowPage />)
