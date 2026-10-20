import SiteLayout from '../src/components/SiteLayout'
import CafeWall from '../src/illusions/cafe-wall/CafeWall'
import { mountPage } from '../src/mountPage'

export function CafeWallPage() {
  return <SiteLayout currentPage="cafe-wall"><CafeWall /></SiteLayout>
}

mountPage(<CafeWallPage />)
