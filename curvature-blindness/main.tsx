import SiteLayout from '../src/components/SiteLayout'
import CurvatureBlindness from '../src/illusions/curvature-blindness/CurvatureBlindness'
import { mountPage } from '../src/mountPage'

export function CurvatureBlindnessPage() {
  return <SiteLayout currentPage="curvature-blindness"><CurvatureBlindness /></SiteLayout>
}

mountPage(<CurvatureBlindnessPage />)
