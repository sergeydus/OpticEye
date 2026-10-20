import SiteLayout from '../src/components/SiteLayout'
import Confetti from '../src/illusions/confetti/Confetti'
import { mountPage } from '../src/mountPage'

export function ConfettiPage() {
  return <SiteLayout currentPage="confetti"><Confetti /></SiteLayout>
}

mountPage(<ConfettiPage />)
