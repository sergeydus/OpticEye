import SiteLayout from '../src/components/SiteLayout'
import AsahiGlare from '../src/illusions/asahi-glare/AsahiGlare'
import { mountPage } from '../src/mountPage'

export function AsahiGlarePage() {
  return <SiteLayout currentPage="asahi-glare"><AsahiGlare /></SiteLayout>
}

mountPage(<AsahiGlarePage />)
