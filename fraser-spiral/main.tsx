import SiteLayout from '../src/components/SiteLayout'
import FraserSpiral from '../src/illusions/fraser-spiral/FraserSpiral'
import { mountPage } from '../src/mountPage'

export function FraserSpiralPage() {
  return <SiteLayout currentPage="fraser-spiral"><FraserSpiral /></SiteLayout>
}

mountPage(<FraserSpiralPage />)
