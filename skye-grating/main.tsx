import SiteLayout from '../src/components/SiteLayout'
import SkyeGrating from '../src/illusions/skye-grating/SkyeGrating'
import { mountPage } from '../src/mountPage'

export function SkyeGratingPage() {
  return <SiteLayout currentPage="skye-grating"><SkyeGrating /></SiteLayout>
}

mountPage(<SkyeGratingPage />)
