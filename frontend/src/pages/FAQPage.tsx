import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Chip,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    HelpOutline as HelpIcon,
    VolunteerActivism as DonationIcon,
    MedicalServices as MedicalIcon,
    AccountBalance as ZakatIcon,
    Security as SecurityIcon,
    Groups as CommunityIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    // About BANCAT
    {
        category: 'About BANCAT',
        question: 'What is BANCAT?',
        answer: 'BANCAT (Bangladesh Cancer Aid & Trust) is a non-profit organization dedicated to supporting cancer patients across Bangladesh. We provide financial assistance for treatment, raise awareness about cancer prevention, and offer emotional support to patients and their families.'
    },
    {
        category: 'About BANCAT',
        question: 'Is BANCAT a registered organization?',
        answer: 'Yes, BANCAT is a registered charitable trust in Bangladesh. We operate with full transparency and accountability, ensuring all donations reach those in need.'
    },
    {
        category: 'About BANCAT',
        question: 'How can I contact BANCAT?',
        answer: 'You can reach us through our contact page, email us directly, or visit our office in Dhaka. We also maintain active social media presence on Facebook and Twitter where you can connect with our team.'
    },

    // Donations
    {
        category: 'Donations',
        question: 'How can I donate to support cancer patients?',
        answer: 'You can donate through our website using bKash, Nagad, or card payments. Simply visit a patient\'s profile or our general fund page and choose your preferred payment method. We also accept bank transfers for larger donations.'
    },
    {
        category: 'Donations',
        question: 'Is my donation tax-deductible?',
        answer: 'Yes, donations to BANCAT may be tax-deductible under Bangladesh tax laws as we are a registered charitable organization. We provide receipts for all donations which can be used for tax purposes.'
    },
    {
        category: 'Donations',
        question: 'How is my donation used?',
        answer: 'Your donations directly support cancer patients with treatment costs, medications, hospital bills, and essential living expenses during treatment. We maintain detailed records and publish regular reports on fund utilization.'
    },
    {
        category: 'Donations',
        question: 'Can I donate to a specific patient?',
        answer: 'Yes! You can choose to donate to a specific patient by visiting their profile page. You\'ll see their story, treatment needs, and fundraising progress. You can also choose to donate to our general fund which helps all patients.'
    },
    {
        category: 'Donations',
        question: 'What payment methods do you accept?',
        answer: 'We accept bKash, Nagad, debit/credit cards (Visa, Mastercard), and direct bank transfers. All payment methods are secure and you\'ll receive an instant confirmation receipt.'
    },

    // Zakat
    {
        category: 'Zakat',
        question: 'Can I give my Zakat through BANCAT?',
        answer: 'Yes, BANCAT is Zakat-eligible. Cancer patients who cannot afford treatment are among the categories of Zakat recipients mentioned in Islamic teachings. We ensure Zakat funds go directly to eligible patients.'
    },
    {
        category: 'Zakat',
        question: 'How do you ensure Zakat is distributed properly?',
        answer: 'We maintain a separate Zakat fund and only distribute it to patients who meet Islamic criteria for Zakat eligibility. Our Shariah advisors help verify patient eligibility, and we provide detailed reports on Zakat distribution.'
    },
    {
        category: 'Zakat',
        question: 'Do you have a Zakat calculator?',
        answer: 'Yes! We provide a comprehensive Zakat calculator on our website that helps you calculate your Zakat based on gold, silver, cash, investments, and other assets according to current Nisab values.'
    },

    // Patient Support
    {
        category: 'Patient Support',
        question: 'How can a patient apply for financial assistance?',
        answer: 'Cancer patients can apply by filling out our patient registration form with their medical documents, treatment plan, and financial details. Our team reviews each case and works to connect patients with donors.'
    },
    {
        category: 'Patient Support',
        question: 'What types of cancer does BANCAT support?',
        answer: 'BANCAT supports patients with all types of cancer including blood cancer, breast cancer, lung cancer, colorectal cancer, and others. We believe every cancer patient deserves access to treatment regardless of their cancer type.'
    },
    {
        category: 'Patient Support',
        question: 'Does BANCAT provide non-financial support?',
        answer: 'Yes! Beyond financial aid, we provide emotional counseling, hospital coordination, accommodation support through Alok Nibash (our patient home), and awareness programs for early detection.'
    },

    // Volunteering
    {
        category: 'Get Involved',
        question: 'How can I volunteer with BANCAT?',
        answer: 'We welcome volunteers! You can apply through our volunteer page. Opportunities include hospital visits, fundraising campaigns, awareness programs, administrative support, and social media outreach.'
    },
    {
        category: 'Get Involved',
        question: 'Can companies partner with BANCAT?',
        answer: 'Absolutely! We work with corporate partners on CSR initiatives, employee giving programs, and cause marketing campaigns. Contact us to discuss partnership opportunities tailored to your organization.'
    },
    {
        category: 'Get Involved',
        question: 'How can I start a fundraising campaign?',
        answer: 'You can create your own fundraising campaign through our website. Whether it\'s for your birthday, wedding, marathon, or in memory of a loved one, we\'ll help you set up and promote your campaign.'
    },

    // Security & Privacy
    {
        category: 'Security & Privacy',
        question: 'Is my personal information safe?',
        answer: 'Yes, we take data security seriously. All personal and payment information is encrypted and protected. We never share your information with third parties without your consent.'
    },
    {
        category: 'Security & Privacy',
        question: 'How do you verify patient authenticity?',
        answer: 'Every patient application goes through a rigorous verification process. We verify medical documents, hospital records, and conduct home visits when necessary to ensure authenticity before listing patients on our platform.'
    },
];

const categoryIcons: Record<string, React.ReactNode> = {
    'About BANCAT': <HelpIcon />,
    'Donations': <DonationIcon />,
    'Zakat': <ZakatIcon />,
    'Patient Support': <MedicalIcon />,
    'Get Involved': <CommunityIcon />,
    'Security & Privacy': <SecurityIcon />,
};

const categoryColors: Record<string, string> = {
    'About BANCAT': '#2196f3',
    'Donations': '#4caf50',
    'Zakat': '#9c27b0',
    'Patient Support': '#f44336',
    'Get Involved': '#ff9800',
    'Security & Privacy': '#607d8b',
};

export const FAQPage = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const categories = [...new Set(faqData.map(faq => faq.category))];

    const filteredFAQs = selectedCategory
        ? faqData.filter(faq => faq.category === selectedCategory)
        : faqData;

    return (
        <Box sx={{ py: 8, minHeight: '100vh', bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    sx={{ textAlign: 'center', mb: 6 }}
                >
                    <Typography
                        variant="h2"
                        fontWeight={700}
                        sx={{
                            mb: 2,
                            background: 'linear-gradient(135deg, #1a5f7a 0%, #86c232 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        Find answers to common questions about BANCAT, donations, Zakat, and how you can help cancer patients in Bangladesh.
                    </Typography>
                </Box>

                {/* Category Filter */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: 'center',
                        mb: 4
                    }}
                >
                    <Chip
                        label="All Categories"
                        onClick={() => setSelectedCategory(null)}
                        variant={selectedCategory === null ? 'filled' : 'outlined'}
                        color="primary"
                        sx={{ fontWeight: 600 }}
                    />
                    {categories.map((category) => (
                        <Chip
                            key={category}
                            icon={categoryIcons[category] as React.ReactElement}
                            label={category}
                            onClick={() => setSelectedCategory(category)}
                            variant={selectedCategory === category ? 'filled' : 'outlined'}
                            sx={{
                                fontWeight: 500,
                                borderColor: categoryColors[category],
                                color: selectedCategory === category ? 'white' : categoryColors[category],
                                bgcolor: selectedCategory === category ? categoryColors[category] : 'transparent',
                                '&:hover': {
                                    bgcolor: selectedCategory === category
                                        ? categoryColors[category]
                                        : `${categoryColors[category]}15`,
                                }
                            }}
                        />
                    ))}
                </Box>

                {/* FAQ Accordions */}
                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    {filteredFAQs.map((faq, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                            disableGutters
                            elevation={0}
                            sx={{
                                '&:before': { display: 'none' },
                                borderBottom: index < filteredFAQs.length - 1 ? '1px solid' : 'none',
                                borderColor: 'divider',
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    px: 3,
                                    py: 1,
                                    '&:hover': { bgcolor: 'action.hover' },
                                    '& .MuiAccordionSummary-content': {
                                        alignItems: 'center',
                                        gap: 2,
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        bgcolor: categoryColors[faq.category],
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography fontWeight={600} sx={{ flexGrow: 1 }}>
                                    {faq.question}
                                </Typography>
                                <Chip
                                    label={faq.category}
                                    size="small"
                                    sx={{
                                        display: { xs: 'none', sm: 'flex' },
                                        bgcolor: `${categoryColors[faq.category]}15`,
                                        color: categoryColors[faq.category],
                                        fontWeight: 500,
                                    }}
                                />
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    px: 3,
                                    pb: 3,
                                    pt: 0,
                                    pl: { xs: 3, sm: 6 },
                                }}
                            >
                                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Paper>

                {/* Contact CTA */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    sx={{
                        textAlign: 'center',
                        mt: 6,
                        p: 4,
                        borderRadius: 3,
                        bgcolor: 'primary.main',
                        color: 'white',
                    }}
                >
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                        Didn't find your answer?
                    </Typography>
                    <Typography sx={{ mb: 2, opacity: 0.9 }}>
                        Contact our team and we'll be happy to help you.
                    </Typography>
                    <Box
                        component="a"
                        href="/contact"
                        sx={{
                            display: 'inline-block',
                            px: 4,
                            py: 1.5,
                            bgcolor: 'white',
                            color: 'primary.main',
                            borderRadius: 2,
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': {
                                bgcolor: 'grey.100',
                            }
                        }}
                    >
                        Contact Us
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
