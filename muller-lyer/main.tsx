import SiteLayout from '../src/components/SiteLayout'
import MullerLyer from '../src/illusions/muller-lyer/MullerLyer'
import { mountPage } from '../src/mountPage'

export function MullerLyerPage() {
  return <SiteLayout currentPage="muller-lyer"><MullerLyer /></SiteLayout>
}

mountPage(<MullerLyerPage />)
