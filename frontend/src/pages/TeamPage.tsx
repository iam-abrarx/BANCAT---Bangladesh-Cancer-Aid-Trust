import { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CircularProgress, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion } from 'framer-motion';

interface TeamMemberData {
    id: number;
    name_en: string;
    role_en: string;
    photo: string;
    category: string;
    bio_en?: string;
    linkedin?: string;
}

export const TeamPage = () => {
    const [members, setMembers] = useState<TeamMemberData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Assuming public API endpoint exists. If not, I might need to create it or use existing content endpoint.
                // Based on standard Laravel resource controllers:
                const response = await axios.get('http://localhost:8000/api/v1/team-members');
                setMembers(response.data);
            } catch (err) {
                console.error('Failed to fetch team members', err);
                setError('Failed to load team members.');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const trustees = members.filter(m => m.category === 'trustee');
    const ambassadors = members.filter(m => m.category === 'ambassador');

    const MemberCard = ({ member }: { member: TeamMemberData }) => (
        <Grid item xs={12} sm={6} md={3} key={member.id}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: 'all 0.3s' } }}>
                    <CardMedia
                        component="img"
                        height="280"
                        image={member.photo ? (member.photo.startsWith('http') ? member.photo : `http://localhost:8000${member.photo}`) : '/assets/placeholder-person.png'}
                        alt={member.name_en}
                        sx={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {member.name_en}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {member.role_en}
                        </Typography>
                        {/* 
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {member.bio_en?.substring(0, 100)}...
                        </Typography> 
                        */}
                    </CardContent>
                </Card>
            </motion.div>
        </Grid>
    );

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

    return (
        <Box>
            <Helmet>
                <title>Our Team | BANcat</title>
                <meta name="description" content="Meet the dedicated Board of Trustees and Ambassadors behind Bangladesh Cancer Aid Trust." />
            </Helmet>

            <Box sx={{ bgcolor: 'primary.main', py: 10, color: 'white', textAlign: 'center', mb: 6 }}>
                <Container>
                    <Typography variant="h2" fontWeight="bold" gutterBottom>
                        Meet Our Team
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9 }}>
                        The dedicated individuals driving our mission forward.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mb: 10 }}>
                {/* Board of Trustees Section */}
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight="bold" color="secondary.main" sx={{ mr: 2 }}>
                            Board of Trustees
                        </Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                    </Box>
                    <Grid container spacing={4}>
                        {trustees.map(member => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </Grid>
                </Box>

                {/* Ambassadors Section */}
                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight="bold" color="secondary.main" sx={{ mr: 2 }}>
                            Ambassadors
                        </Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                    </Box>
                    <Grid container spacing={4}>
                        {ambassadors.map(member => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};
