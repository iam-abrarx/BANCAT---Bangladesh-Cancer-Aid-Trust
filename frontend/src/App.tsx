import { Routes, Route } from 'react-router-dom';
import { DynamicPage } from './pages/DynamicPage';
import { TeamPage } from './pages/TeamPage';
import { SEOHead } from './components/common/SEOHead';

// ... (existing imports, but wait, I can't easily inject import at top if I select bottom lines. I should do import separately or use multi_replace)
// Actually, I can use multi_replace for imports + routes.
// But let's check if DynamicPage is already imported? No it wasn't in previous view.

// I'll do this in two steps or use multi_replace.
// Let's use multi_replace.

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Patients } from './pages/Patients';
import { PatientDetail } from './pages/PatientDetail';
import { Stories } from './pages/Stories';
import { StoryDetail } from './pages/StoryDetail';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { Campaigns } from './pages/Campaigns';
import { CampaignDetail } from './pages/CampaignDetail';
import { StartCampaign } from './pages/StartCampaign';
import { DonationSuccess } from './pages/DonationSuccess';
import { ZakatCalculator } from './pages/ZakatCalculator';
// Dashboard removed
import { VolunteerPage } from './pages/VolunteerPage';
import { ContactPage } from './pages/ContactPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import AboutPage from './pages/AboutPage';
import ImpactPage from './pages/ImpactPage';
import { AlokNibash } from './pages/AlokNibash';
import { Partners } from './pages/Partners';
import { CancerInfo } from './pages/CancerInfo';
import { MaaBachao } from './pages/MaaBachao';
import { FAQPage } from './pages/FAQPage';
// Admin imports removed


function App() {
  return (
    <Layout>
      <SEOHead />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:code" element={<PatientDetail />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<StoryDetail />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/start" element={<StartCampaign />} />
        <Route path="/campaigns/:slug" element={<CampaignDetail />} />
        <Route path="/donation/success" element={<DonationSuccess />} />

        {/* Auth Routes */}
        {/* Auth Routes Removed */}
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/zakat-calculator" element={<ZakatCalculator />} />
        <Route path="/alok-nibash" element={<AlokNibash />} />
        <Route path="/partnerships/brands" element={<Partners />} />
        <Route path="/partnerships/csr" element={<Partners />} />
        <Route path="/cancer-info" element={<CancerInfo />} />
        <Route path="/campaigns/maa-bachao" element={<MaaBachao />} />
        <Route path="/faq" element={<FAQPage />} />


        <Route path="/about/team" element={<TeamPage />} />
        <Route path="/about/services" element={<DynamicPage slug="services" />} />
        <Route path="/privacy-policy" element={<DynamicPage slug="privacy-policy" />} />
        <Route path="/terms-of-use" element={<DynamicPage slug="terms-of-use" />} />
        <Route path="/refund-policy" element={<DynamicPage slug="refund-policy" />} />

        {/* Generic Routes for new sections */}
        <Route path="/initiatives/:slug" element={<DynamicPage />} />
        <Route path="/support/:slug" element={<DynamicPage />} />
        <Route path="/programs/:slug" element={<DynamicPage />} />

        {/* Catch-all route should be last if it existed, but we have specific ones */}
      </Routes>
    </Layout>
  );
}

export default App;
