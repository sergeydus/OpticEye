import SiteLayout from '../src/components/SiteLayout'
import VanishingDots from '../src/illusions/vanishing-dots/VanishingDots'
import { mountPage } from '../src/mountPage'

export function VanishingDotsPage() {
  return <SiteLayout currentPage="vanishing-dots"><VanishingDots /></SiteLayout>
}

mountPage(<VanishingDotsPage />)
