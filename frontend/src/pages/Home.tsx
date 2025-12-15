import { Hero } from '../components/home/Hero';
import { ImpactMetrics } from '../components/home/ImpactMetrics';
import { FeaturedPatients } from '../components/home/FeaturedPatients';
import { ProgramsGrid } from '../components/programs/ProgramsGrid';
import { CampaignBanner } from '../components/campaigns/CampaignBanner';
import { Partners } from '../components/home/Partners';
import { Testimonials } from '../components/home/Testimonials';
import { CallToAction } from '../components/home/CallToAction';
import { HowItWorks } from '../components/home/HowItWorks';
import { Box } from '@mui/material';

export const Home = () => {
    return (
        <Box>
            <Hero />
            <ImpactMetrics />
            <Partners />
            <HowItWorks />
            <CampaignBanner />
            <ProgramsGrid />
            <Testimonials />
            {/* <FeaturedPatients /> */}
            <CallToAction />
        </Box>
    );
};
