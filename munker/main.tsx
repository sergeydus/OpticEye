import SiteLayout from '../src/components/SiteLayout'
import Munker from '../src/illusions/munker/Munker'
import { mountPage } from '../src/mountPage'

export function MunkerPage() {
  return <SiteLayout currentPage="munker"><Munker /></SiteLayout>
}

mountPage(<MunkerPage />)
