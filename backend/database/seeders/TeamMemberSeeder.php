<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class TeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TeamMember::truncate();
        
        // Ensure directory exists
        if (!Storage::disk('public')->exists('team-members')) {
            Storage::disk('public')->makeDirectory('team-members');
        }

        $trustees = [
            [
                'name_en' => 'Anis A. Khan',
                'name_bn' => 'Anis A. Khan',
                'role_en' => 'President, Trustee',
                'role_bn' => 'President, Trustee',
                'category' => 'trustee',
                'photo' => 'https://bancat.org.bd/images/trustees/anis-khan.jpg',
                'is_active' => true,
                'order' => 1,
            ],
            // ... (I will truncate the list for brevity in this thought, but write full list in file)
        ];
        
        // Actually, to avoid writing huge file again blindly, I'll use a helper function in the class to format data
        // and loop through a simplified list.
        
        $trusteesData = [
            ['Anis A. Khan', 'President, Trustee', 'https://bancat.org.bd/images/trustees/anis-khan.jpg'],
            ['Shukla Sarwat Siraj', 'Vice President, Legal & Corporate Affairs, Trustee', 'https://bancat.org.bd/images/trustees/shukla-sarwat.jpg'],
            ['Najmus Ahmed Albab', 'Author and Executive Director, Trustee', 'https://bancat.org.bd/images/trustees/najmus-shakib.jpg'],
            ['Sohana Rouf Chowdhury', 'Vice President, External Affairs, Trustee', 'https://bancat.org.bd/images/trustees/sohana-rouf.jpg'],
            ['Sabrina Shaheed', 'Vice President, Community Development, Trustee', 'https://bancat.org.bd/images/trustees/sabrina-saheed.jpg'],
            ['Zeeshan Hasib', 'Treasurer and Director of Internal Audit, Trustee', 'https://bancat.org.bd/images/trustees/zeeshan-hasib.jpg'],
            ['Nehal Ahmed', 'Vice President of International Development, Trustee', 'https://bancat.org.bd/images/trustees/nehal.jpg'],
            ['Farjad Ahmed', 'Vice President & Director of finance, Trustee', 'https://bancat.org.bd/images/trustees/alamzeb.jpg'],
            ['Mahzabin Ferdous', 'General Secretary, Trustee', 'https://bancat.org.bd/images/trustees/mahjabin.jpg'],
            ['Zoheb Ahmed', 'Trustee', 'https://bancat.org.bd/images/trustees/zoheb.jpg'],
            ['Rumana Ahmed', 'Trustee', 'https://bancat.org.bd/images/trustees/rumana.jpg'],
            ['Yusuf Tahdeebiddin Ahmed', 'Trustee', 'https://bancat.org.bd/images/trustees/yusuf.jpg'],
        ];

        $ambassadorsData = [
            ['Ms. Rubana Huq', 'Vice-chancellor Asian University for Women', 'https://bancat.org.bd/images/ambassador/Rubana_Huq.jpg'],
            ['Ms. Syeda Rizwana Hasan', 'Chief Executive Bangladesh Environmental Lawyers Association (BELA)', 'https://bancat.org.bd/images/ambassador/Syeda_Rizwana_Hasan.jpg'],
            ['Ms. Sitara Ahsanullah', 'President Bangladesh Mohila Samity', 'https://bancat.org.bd/images/ambassador/SitaraAhsanuallah.JPG'],
            ['Ms. Farzanah Chowdhury', 'Managing Director & Chief Executive Officer Marks and Spencer', 'https://bancat.org.bd/images/ambassador/MsFarzanahChowdhury.jpg'],
            ['Ms. Shwapna Bhowmick', 'Country Manager Marks and Spencer', 'https://bancat.org.bd/images/ambassador/Shwapna-Bhowmick.jpg'],
            ['Mr. Mirza Salman Ispahani', 'Managing Director Mr. M M Ispahani Limited.', 'https://bancat.org.bd/images/ambassador/Mirza-Salman-Ispahani.jpg'],
            ['Mr. Syed Mahbubur Rahman', 'Managing Director Mutual Trust Bank Ltd', 'https://bancat.org.bd/images/ambassador/SYED-MAHBUBUR-RAHMAN.jpg'],
            ['Mr. Munir Hasan', 'Chief Coordinator, Digital Transformation and Youth Programme Prothom Alo', 'https://bancat.org.bd/images/ambassador/Mr-Munir-Hasan.jpg'],
            ['Mr. Md Adil Hossain Noble', 'Chief Enterprise Business Officer Robi Axiata Limited', 'https://bancat.org.bd/images/ambassador/Adil-Hossain-Noble-01-scaled.jpg'],
            ['Ms. Zahida Fizza Kabir', 'Chief Executive Officer SAJIDA Foundation', 'https://bancat.org.bd/images/ambassador/zahida_fizza_kabir.jpg'],
            ['Mr. Naser Ezaz', 'Chief Executive Officer Standard Chartered Bank', 'https://bancat.org.bd/images/ambassador/Mr-Naser-Ezaz-Bijoy-_Photo.jpg'],
            ['Mr. MD Golam Kebria Sarkar', 'Managing Director Studio of Creative Arts Limited', 'https://bancat.org.bd/images/ambassador/MrMDGolamKebriaSarkar.jpg'],
            ['Prof. Imran Rahman', 'Vice-Chancellor University of Liberal Arts Bangladesh', 'https://bancat.org.bd/images/ambassador/ProfImranULAB.jpg'],
            ['Mr. Athar Ali Khan', 'Cricket Commentator and Former Cricketer Bangladesh Cricket Board', 'https://bancat.org.bd/images/ambassador/AtharAliKhan.jpg'],
            ['Mr. Sulaiman Ajanee', 'Managing Director Standard Finis Oil Company', 'https://bancat.org.bd/images/ambassador/Picture_2-removebg-preview.png'],
            ['Ms. Naheed Ezaher Khan', 'Former Member Parliament', 'https://bancat.org.bd/images/ambassador/NahidEzharKhan.jpg'],
            ['Ms. Rubaba Dowla', 'Country Managing Director Oracle Bangladesh, Nepal and Bhutan', 'https://bancat.org.bd/images/ambassador/RubabaDowla.jpg'],
            ['Ms. Sara Zaker', 'Member Sectretary Liberation War Museum', 'https://bancat.org.bd/images/ambassador/SaraZaker.jpg'],
            ['Ms. Shampa Reza', 'Artist & Social Activist', 'https://bancat.org.bd/images/ambassador/Shampa_Reza_(cropped).jpg'],
            ['Ms. Suraiya Zannath', 'Lead Financial Management Specialist, World Bank', 'https://bancat.org.bd/images/ambassador/Suraiya-Zannath-World-Bank-.jpg'],
            ['Ms. Zara Jabeen Mahbub MP', 'Member Standing Committee Ministry of Foreign Affairs', 'https://bancat.org.bd/images/ambassador/Zara-Jabeen-Mahbub.jpg'],
            ['Prof. Dr. Golam Mohiuddin Faruque', 'Project Director and Joint Secreary, Bangladesh Cancer Society', 'https://bancat.org.bd/images/ambassador/mohiuddin.JPG'],
        ];

        foreach ($trusteesData as $index => $data) {
            try {
                $photoPath = $data[2];
                if (str_starts_with($data[2], 'http')) {
                    $contents = file_get_contents($data[2]);
                    if ($contents) {
                        $filename = 'trustee_' . ($index + 1) . '.jpg';
                        Storage::disk('public')->put('team-members/' . $filename, $contents);
                        $photoPath = '/storage/team-members/' . $filename;
                    }
                }

                TeamMember::create([
                    'name_en' => $data[0],
                    'name_bn' => $data[0], // Fallback
                    'role_en' => $data[1],
                    'role_bn' => $data[1], // Fallback
                    'category' => 'trustee',
                    'photo' => $photoPath,
                    'is_active' => true,
                    'order' => $index + 1,
                ]);
            } catch (\Exception $e) {
                $this->command->error("ERR {$data[0]}: " . substr($e->getMessage(), 0, 200));
            }
        }

        foreach ($ambassadorsData as $index => $data) {
            try {
                $photoPath = $data[2];
                if (str_starts_with($data[2], 'http')) {
                    $contents = @file_get_contents($data[2]); // suppress warnings for 404s
                    if ($contents) {
                        $filename = 'ambassador_' . ($index + 1) . '.jpg';
                        Storage::disk('public')->put('team-members/' . $filename, $contents);
                        $photoPath = '/storage/team-members/' . $filename;
                    }
                }

                TeamMember::create([
                    'name_en' => $data[0],
                    'name_bn' => $data[0], // Fallback
                    'role_en' => $data[1],
                    'role_bn' => $data[1], // Fallback
                    'category' => 'ambassador',
                    'photo' => $photoPath,
                    'is_active' => true,
                    'order' => $index + 1,
                ]);
            } catch (\Exception $e) {
                $this->command->error("ERR {$data[0]}: " . substr($e->getMessage(), 0, 200));
            }
        }
    }
}
