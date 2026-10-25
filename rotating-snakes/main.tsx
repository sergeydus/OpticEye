import SiteLayout from '../src/components/SiteLayout'
import RotatingSnakes from '../src/illusions/rotating-snakes/RotatingSnakes'
import { mountPage } from '../src/mountPage'

export function RotatingSnakesPage() {
  return <SiteLayout currentPage="rotating-snakes"><RotatingSnakes /></SiteLayout>
}

mountPage(<RotatingSnakesPage />)
