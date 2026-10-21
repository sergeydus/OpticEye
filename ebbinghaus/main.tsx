import SiteLayout from '../src/components/SiteLayout'
import Ebbinghaus from '../src/illusions/ebbinghaus/Ebbinghaus'
import { mountPage } from '../src/mountPage'

export function EbbinghausPage() {
  return <SiteLayout currentPage="ebbinghaus"><Ebbinghaus /></SiteLayout>
}

mountPage(<EbbinghausPage />)
