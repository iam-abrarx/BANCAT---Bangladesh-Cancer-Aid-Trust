import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPatientList } from './pages/admin/patients/AdminPatientList';
import { AdminPatientForm } from './pages/admin/patients/AdminPatientForm';
import { AdminStoryList } from './pages/admin/stories/AdminStoryList';
import { AdminStoryForm } from './pages/admin/stories/AdminStoryForm';
import { AdminVolunteerList } from './pages/admin/volunteers/AdminVolunteerList';
import { AdminVolunteerDetail } from './pages/admin/volunteers/AdminVolunteerDetail';
import { AdminCampaignList } from './pages/admin/campaigns/AdminCampaignList';
import { AdminCampaignForm } from './pages/admin/campaigns/AdminCampaignForm';
import { AdminProgramList } from './pages/admin/programs/AdminProgramList';
import { AdminProgramForm } from './pages/admin/programs/AdminProgramForm';
import { AdminDonationList } from './pages/admin/donations/AdminDonationList';
import { AdminTeamList } from './pages/admin/team/AdminTeamList';
import { AdminTeamForm } from './pages/admin/team/AdminTeamForm';
import { AdminImpactList } from './pages/admin/impact/AdminImpactList';
import { AdminImpactForm } from './pages/admin/impact/AdminImpactForm';
import { AdminPageList } from './pages/admin/pages/AdminPageList';
import { AdminPageForm } from './pages/admin/pages/AdminPageForm';
import { AdminPartnerList } from './pages/admin/partners/AdminPartnerList';
import Testimonials from './pages/Testimonials';
import AdminGalleryList from './pages/admin/gallery/AdminGalleryList';
import AdminGalleryForm from './pages/admin/gallery/AdminGalleryForm';

import { AdminSettings } from './pages/admin/settings/AdminSettings';
import { AdminContactList } from './pages/admin/contacts/AdminContactList';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="patients" element={<AdminPatientList />} />
        <Route path="patients/new" element={<AdminPatientForm />} />
        <Route path="patients/:id/edit" element={<AdminPatientForm />} />

        <Route path="stories" element={<AdminStoryList />} />
        <Route path="stories/new" element={<AdminStoryForm />} />
        <Route path="stories/:id/edit" element={<AdminStoryForm />} />

        <Route path="volunteers" element={<AdminVolunteerList />} />
        <Route path="volunteers/:id" element={<AdminVolunteerDetail />} />

        <Route path="campaigns" element={<AdminCampaignList />} />
        <Route path="campaigns/new" element={<AdminCampaignForm />} />
        <Route path="campaigns/:id/edit" element={<AdminCampaignForm />} />

        <Route path="programs" element={<AdminProgramList />} />
        <Route path="programs/new" element={<AdminProgramForm />} />
        <Route path="programs/:id/edit" element={<AdminProgramForm />} />

        <Route path="donations" element={<AdminDonationList />} />

        <Route path="team" element={<AdminTeamList />} />
        <Route path="team/new" element={<AdminTeamForm />} />
        <Route path="team/:id" element={<AdminTeamForm />} />

        <Route path="impact" element={<AdminImpactList />} />
        <Route path="impact/new" element={<AdminImpactForm />} />
        <Route path="impact/:id" element={<AdminImpactForm />} />

        <Route path="pages" element={<AdminPageList />} />
        <Route path="pages/new" element={<AdminPageForm />} />
        <Route path="pages/:id" element={<AdminPageForm />} />

        <Route path="gallery" element={<AdminGalleryList />} />
        <Route path="gallery/new" element={<AdminGalleryForm />} />
        <Route path="gallery/:id" element={<AdminGalleryForm />} />

        <Route path="partners" element={<AdminPartnerList />} />
        <Route path="contacts" element={<AdminContactList />} />

        <Route path="settings" element={<AdminSettings />} />
        <Route path="users" element={<Navigate to="/admin/settings" replace />} />

        <Route path="testimonials" element={<Testimonials />} />
      </Route>

    </Routes>
  );
}

export default App;
