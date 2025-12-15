import { Hero } from '../components/home/Hero';
import { ImpactMetrics } from '../components/home/ImpactMetrics';
import { FeaturedPatients } from '../components/home/FeaturedPatients';
import { ProgramsGrid } from '../components/programs/ProgramsGrid';
import { CampaignBanner } from '../components/campaigns/CampaignBanner';
import { Box } from '@mui/material';

export const Home = () => {
    return (
        <Box>
            <Hero />
            <ImpactMetrics />
            <CampaignBanner />
            <ProgramsGrid />
            <FeaturedPatients />
        </Box>
    );
};
