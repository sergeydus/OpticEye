import SiteLayout from '../src/components/SiteLayout'
import ShepardTables from '../src/illusions/shepard-tables/ShepardTables'
import { mountPage } from '../src/mountPage'

export function ShepardTablesPage() {
  return <SiteLayout currentPage="shepard-tables"><ShepardTables /></SiteLayout>
}

mountPage(<ShepardTablesPage />)
