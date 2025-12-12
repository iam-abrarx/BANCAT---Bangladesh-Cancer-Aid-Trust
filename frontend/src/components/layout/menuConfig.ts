// Menu configuration for mega menu navigation
export interface MenuItem {
    label: string;
    path: string;
    icon?: string;
    description?: string;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

export interface NavItem {
    id: string;
    label: string;
    path?: string;
    type: 'link' | 'dropdown' | 'mega' | 'cta';
    sections?: MenuSection[];
    items?: MenuItem[];
    featuredImage?: {
        src: string;
        caption?: string;
    };
}

export const menuConfig: NavItem[] = [
    // 1. Home - Simple link
    {
        id: 'home',
        label: 'Home',
        path: '/',
        type: 'link',
    },

    // 2. About - Dropdown menu
    {
        id: 'about',
        label: 'About',
        type: 'dropdown',
        items: [
            { label: 'About Us', path: '/about' },
            { label: 'Our Team', path: '/about/team' },
            { label: 'Our Services', path: '/about/services', description: 'Alok Nibash, Alok Boshoti' },
            { label: 'Contact Us', path: '/contact' },
            { label: 'FAQ', path: '/faq' },
            { label: 'Privacy Policy', path: '/privacy-policy' },
            { label: 'Terms of Use', path: '/terms-of-use' },
            { label: 'Refund Policy', path: '/refund-policy' },
        ],
    },

    // 3. Our Work - Mega menu
    {
        id: 'our-work',
        label: 'Our Work',
        type: 'mega',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
            caption: 'Transforming Care'
        },
        sections: [
            {
                title: 'Initiatives',
                items: [
                    { label: 'Nationwide Cancer Awareness', path: '/programs/awareness' },
                    { label: 'Holistic Care', path: '/programs/holistic-care' },
                    { label: 'Mental Wellness', path: '/programs/mental-wellness' },
                ],
            },
            {
                title: 'Information & Support',
                items: [
                    { label: 'All About Cancer in Bangladesh', path: '/programs/all-about-cancer-in-bangladesh' },
                    { label: 'Patient & Caregiver Support', path: '/programs/patient-caregiver-support' },
                    { label: '24/7 Helpline & Live Chat', path: '/programs/24-7-helpline' },
                ],
            },
        ],
    },

    // 4. Stories - Mega menu
    {
        id: 'stories',
        label: 'Stories',
        type: 'mega',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80',
            caption: 'Voices of Courage'
        },
        sections: [
            {
                title: 'Story Categories',
                items: [
                    { label: 'Impact Stories (Warriors)', path: '/stories?category=warriors' },
                    { label: 'Patient Testimonials', path: '/stories?category=testimonials' },
                    { label: 'Caregiver Stories', path: '/stories?category=caregivers' },
                    { label: 'Volunteer Spotlights', path: '/stories?category=volunteers' },
                ],
            },
            {
                title: 'Media',
                items: [
                    { label: 'Multimedia Gallery', path: '/gallery', description: 'Photos & Videos' },
                ],
            },
        ],
    },

    // 5. Campaigns - Mega menu
    {
        id: 'campaigns',
        label: 'Campaigns',
        type: 'mega',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
            caption: 'Join the Movement'
        },
        sections: [
            {
                title: 'Our Campaigns',
                items: [
                    { label: 'Maa Bachao', path: '/campaigns/maa-bachao' },
                    { label: 'Alok Nibash (Signature Project)', path: '/alok-nibash' },
                    { label: 'BANCAT DURBAR', path: '/campaigns/bancat-durbar' },
                    { label: 'Donate to a Campaign', path: '/campaigns/donate' },
                ],
            },
        ],
    },

    // 6. Get Involved - Mega menu
    {
        id: 'get-involved',
        label: 'Get Involved',
        type: 'mega',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80',
            caption: 'Be the Change'
        },
        sections: [
            {
                title: 'Volunteer',
                items: [
                    { label: 'Volunteer Opportunities', path: '/volunteer' },
                    { label: 'Patient Support', path: '/volunteer/patient-support' },
                    { label: 'Event Volunteer', path: '/volunteer/events' },
                    { label: 'Awareness & Outreach', path: '/volunteer/outreach' },
                    { label: 'Volunteer Application Form', path: '/volunteer/apply' },
                ],
            },
            {
                title: 'Partnerships',
                items: [
                    { label: 'Brand Partnership', path: '/partnerships/brands' },
                    { label: 'CSR Guidance', path: '/partnerships/csr' },
                ],
            },
            {
                title: 'Fundraising',
                items: [
                    { label: 'Start Your Own Fundraiser', path: '/fundraising/start' },
                    { label: 'Fundraising Toolkit', path: '/fundraising/toolkit' },
                    { label: 'In-Kind Donations', path: '/donations/in-kind' },
                    { label: 'Legacy Giving', path: '/donations/legacy' },
                ],
            },
        ],
    },

    // 7. Donate - CTA button with optional dropdown
    {
        id: 'donate',
        label: 'Donate',
        type: 'cta',
        items: [
            { label: 'Donate Now', path: '/donate', description: 'General Donation' },
            { label: 'Campaign Donations', path: '/campaigns/donate' },
            { label: 'Zakat Calculator', path: '/zakat-calculator' },
        ],
    },
];

export default menuConfig;
