<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;
use App\Models\Story;
use App\Models\Testimonial;
use Illuminate\Support\Str;

class WebsiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedTeamMembers();
        $this->seedStories();
        $this->seedTestimonials();
    }

    private function seedTeamMembers()
    {
        $members = [
            [
                'name_en' => 'Najmus Ahmed Albab',
                'role_en' => 'Co-Founder, Executive Director & Trustee',
                'bio_en' => 'Founder of BANCAT after his own battle with acute myeloid leukemia. Dedicated to making cancer treatment accessible and raising nationwide awareness.',
                'image' => 'https://ui-avatars.com/api/?name=Najmus+Ahmed+Albab&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 1,
            ],
            [
                'name_en' => 'Anis A Khan',
                'role_en' => 'President',
                'bio_en' => 'Anis A Khan serves as the President of BANCAT, leading the organization with his vast experience and dedication.',
                'image' => 'https://ui-avatars.com/api/?name=Anis+A+Khan&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 2,
            ],
            [
                'name_en' => 'Mahzabin Ferdous',
                'role_en' => 'General Secretary & Trustee',
                'bio_en' => 'General Secretary of BANCAT, playing a pivotal role in the organization\'s strategic direction and community engagement.',
                'image' => 'https://ui-avatars.com/api/?name=Mahzabin+Ferdous&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 3,
            ],
            [
                'name_en' => 'Sarwat Siraj',
                'role_en' => 'Vice President – External Relations',
                'bio_en' => 'Responsible for managing external relations and fostering partnerships for BANCAT.',
                'image' => 'https://ui-avatars.com/api/?name=Sarwat+Siraj&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 4,
            ],
            [
                'name_en' => 'Sabrina Shaheed',
                'role_en' => 'Vice President – Community Development',
                'bio_en' => 'Focuses on community development initiatives and expanding BANCAT\'s reach.',
                'image' => 'https://ui-avatars.com/api/?name=Sabrina+Shaheed&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 5,
            ],
            [
                'name_en' => 'Alamzeb Farjad Ahmed',
                'role_en' => 'Vice President & Director – Finance',
                'bio_en' => 'Oversees the financial health and transparency of the organization.',
                'image' => 'https://ui-avatars.com/api/?name=Alamzeb+Farjad+Ahmed&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 6,
            ],
            [
                'name_en' => 'Sohana Rouf Chowdhury',
                'role_en' => 'Vice President – International Development',
                'bio_en' => 'Leads international development efforts and global outreach for BANCAT.',
                'image' => 'https://ui-avatars.com/api/?name=Sohana+Rouf+Chowdhury&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 7,
            ],
            [
                'name_en' => 'Rumana Ahmed',
                'role_en' => 'Trustee, Director – Communications',
                'bio_en' => 'Manages communications and brand messaging for the trust.',
                'image' => 'https://ui-avatars.com/api/?name=Rumana+Ahmed&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 8,
            ],
            [
                'name_en' => 'Sohana Yusuf',
                'role_en' => 'Trustee, Director – Maa Bachao, Bachao Desh',
                'bio_en' => 'Directs the "Maa Bachao, Bachao Desh" program, focusing on maternal health and cancer.',
                'image' => 'https://ui-avatars.com/api/?name=Sohana+Yusuf&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 9,
            ],
            [
                'name_en' => 'Sajid Mahbub',
                'role_en' => 'Trustee, Director – Brand & Marketing',
                'bio_en' => 'Spearheads brand strategy and marketing initiatives.',
                'image' => 'https://ui-avatars.com/api/?name=Sajid+Mahbub&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 10,
            ],
             [
                'name_en' => 'Eshtiaque Ahmed',
                'role_en' => 'Joint Treasurer',
                'bio_en' => 'Assists in financial management and treasury functions.',
                'image' => 'https://ui-avatars.com/api/?name=Eshtiaque+Ahmed&background=0D8ABC&color=fff',
                'category' => 'trustee',
                'order' => 11,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(
                ['name_en' => $member['name_en']],
                [
                    'role_en' => $member['role_en'],
                    'name_bn' => $member['name_en'], // Placeholder for BN
                    'role_bn' => $member['role_en'], // Placeholder for BN
                    'bio_en' => $member['bio_en'],
                    'bio_bn' => $member['bio_en'], // Placeholder for BN
                    'category' => $member['category'],
                    'photo' => $member['image'],
                    'email' => Str::slug($member['name_en']) . '@bancat.org',
                    'order' => $member['order'],
                    'is_active' => true,
                ]
            );
        }
    }

    private function seedStories()
    {
        $stories = [
            [
                'title' => 'From Survivor to Savior: Najmus Ahmed Albab',
                'subject' => 'Najmus Ahmed Albab',
                'excerpt' => 'The inspiring journey of BANCAT founder Najmus Ahmed Albab, who turned his battle with AML into a mission to help others.',
                'content' => 'Najmus Ahmed Albab is a survivor of acute myeloid leukemia (AML). Diagnosed in 2011, he received treatment in Singapore. Upon his recovery, he dedicated his life to improving cancer care in Bangladesh, founding BANCAT to support underprivileged patients.',
                'type' => 'survivor',
            ],
            [
                'title' => 'A Beacon of Hope: Shahnaz Begum',
                'subject' => 'Shahnaz Begum',
                'excerpt' => 'Shahnaz Begum found comprehensive care and a supportive community at Alok Nibash during her fight against cervical cancer.',
                'content' => 'Shahnaz Begum, facing cervical cancer and financial difficulties, found a "beacon of hope" at Alok Nibash. She received comprehensive care, including a hygienic environment, dedicated nursing, nutritious meals, and a supportive community during her radiotherapy sessions.',
                'type' => 'survivor',
            ],
            [
                'title' => 'An Early Victory Against Leukemia',
                'subject' => 'Anonymous survivor',
                'excerpt' => 'Before BANCAT was even founded, a young girl\'s life was saved through community support.',
                'content' => 'Before officially founding BANCAT, Najmus Ahmed Albab helped a young girl who was battling the same type of leukemia he had overcome. He raised funds for her year-long treatment, and she not only survived but later married and had her first child.',
                'type' => 'survivor',
            ],
             [
                'title' => 'Speaking Out: Sara Zaker',
                'subject' => 'Sara Zaker',
                'excerpt' => 'Media personality Sara Zaker shares her courageous fight against breast cancer at the Warriors Club.',
                'content' => 'Sara Zaker, a prominent media personality, spoke about her fight against breast cancer at the Warriors Club, inspiring many others to stay strong and hopeful.',
                'type' => 'survivor',
            ],
        ];

        foreach ($stories as $story) {
            Story::updateOrCreate(
                ['title_en' => $story['title']],
                [
                    'slug' => Str::slug($story['title']),
                    'type' => $story['type'],
                    'title_bn' => $story['title'], // Placeholder
                    'subject_name_en' => $story['subject'],
                    'subject_name_bn' => $story['subject'], // Placeholder
                    'excerpt_en' => $story['excerpt'],
                    'excerpt_bn' => $story['excerpt'], // Placeholder
                    'content_en' => $story['content'],
                    'content_bn' => $story['content'], // Placeholder
                    'is_published' => true,
                    'published_at' => now(),
                    'featured_image' => 'https://placehold.co/600x400?text=' . urlencode($story['subject']),
                ]
            );
        }
    }

    private function seedTestimonials()
    {
        $testimonials = [
            [
                'name' => 'Abdul Ahab',
                'role' => 'Colon Cancer Patient',
                'quote' => 'I feel immense relief and gratitude for securing a bed and accommodation at Alok Nibash-2. It has been a blessing.',
            ],
            [
                'name' => 'Mother of Tazrian',
                'role' => 'Patient Family Member',
                'quote' => 'Having a clean, safe place to stay with my 11-month-old child during treatment was something I never thought possible. BANCAT made it happen.',
            ],
             [
                'name' => 'Hafsa Islam',
                'role' => 'Editor, London Features',
                'quote' => 'BANCAT embodies a new standard of care and compassion, offering dignity and comfort to patients who need it most.',
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(
                ['name' => $t['name']],
                [
                    'role' => $t['role'],
                    'quote' => $t['quote'],
                    'image' => 'https://ui-avatars.com/api/?name=' . urlencode($t['name']) . '&background=random',
                ]
            );
        }
    }
}
