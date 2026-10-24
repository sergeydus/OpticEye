import SiteLayout from '../src/components/SiteLayout'
import Jastrow from '../src/illusions/jastrow/Jastrow'
import { mountPage } from '../src/mountPage'

export function JastrowPage() {
  return <SiteLayout currentPage="jastrow"><Jastrow /></SiteLayout>
}

mountPage(<JastrowPage />)
