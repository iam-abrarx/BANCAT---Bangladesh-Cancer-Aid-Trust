<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            [
                'name_en' => 'Cancer Awareness',
                'name_bn' => 'ক্যান্সার সচেতনতা',
                'slug' => 'awareness',
                'tagline_en' => 'Spreading Knowledge, Saving Lives',
                'tagline_bn' => 'জ্ঞান ছড়িয়ে জীবন বাঁচান',
                'description_en' => "
                    <h2>Why Awareness Matters</h2>
                    <p>Our Cancer Awareness program is dedicated to educating communities about the early signs and symptoms of cancer. We believe that early detection is key to survival. By breaking the silence and stigma surrounding cancer, we empower individuals to seek timely medical advice.</p>
                    
                    <img src='https://placehold.co/800x400/e91e63/ffffff?text=Community+Workshop' alt='Community Workshop' />

                    <h2>Key Initiatives</h2>
                    <ul>
                        <li><strong>School Campaigns:</strong> Interactive sessions for students to understand healthy lifestyle choices.</li>
                        <li><strong>Rural Outreach:</strong> Door-to-door education in remote villages.</li>
                        <li><strong>Corporate Seminars:</strong> Wellness workshops for employees.</li>
                    </ul>

                    <h2>Impact Statistics</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Count</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>People Reached</td>
                                <td>50,000+</td>
                                <td>2024</td>
                            </tr>
                            <tr>
                                <td>Seminars Conducted</td>
                                <td>120</td>
                                <td>2024</td>
                            </tr>
                        </tbody>
                    </table>
                ",
                'description_bn' => "
                    <h2>কেন সচেতনতা জরুরি</h2>
                    <p>আমাদের ক্যান্সার সচেতনতা কর্মসূচি সম্প্রদায়কে ক্যান্সারের প্রাথমিক লক্ষণ এবং উপসর্গ সম্পর্কে শিক্ষিত করার জন্য নিবেদিত। আমরা বিশ্বাস করি যে প্রাথমিক সনাক্তকরণই বেঁচে থাকার চাবিকাঠি।</p>
                    
                    <img src='https://placehold.co/800x400/e91e63/ffffff?text=Workshop+Bangla' alt='Workshop' />

                    <h2>মূল উদ্যোগ</h2>
                    <ul>
                        <li><strong>স্কুল ক্যাম্পেইন:</strong> শিক্ষার্থীদের জন্য স্বাস্থ্যকর জীবনধারা বোঝার সেশন।</li>
                        <li><strong>গ্রামীণ আউটরিচ:</strong> দূরবর্তী গ্রামগুলিতে ঘরে ঘরে শিক্ষা।</li>
                    </ul>
                ",
                'icon' => 'Campaign',
                'banner_image' => 'https://placehold.co/1200x600/e91e63/ffffff?text=Cancer+Awareness',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name_en' => 'Holistic Care',
                'name_bn' => 'হোলিস্টিক কেয়ার',
                'slug' => 'holistic-care',
                'tagline_en' => 'Healing Beyond Medicine',
                'tagline_bn' => 'ঔষধের বাইরে নিরাময়',
                'description_en' => "
                    <h2>Comprehensive Healing</h2>
                    <p>Cancer treatment is physically demanding, but the emotional and psychological toll can be just as heavy. Our Holistic Care program compliments medical treatment by focusing on the whole person - mind, body, and spirit.</p>

                    <img src='https://placehold.co/800x400/4caf50/ffffff?text=Yoga+Session' alt='Yoga Session' />

                    <h2>Our Services</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Schedule</th>
                                <th>Benefits</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Yoga & Meditation</td>
                                <td>Weekly (Fri)</td>
                                <td>Stress reduction, flexibility</td>
                            </tr>
                            <tr>
                                <td>Nutritional Counseling</td>
                                <td>On Request</td>
                                <td>Better immunity, recovery</td>
                            </tr>
                            <tr>
                                <td>Art Therapy</td>
                                <td>Monthly</td>
                                <td>Emotional expression</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>We provide a serene environment where patients can disconnect from their illness and reconnect with themselves.</p>
                ",
                'description_bn' => "
                    <h2>সামগ্রিক নিরাময়</h2>
                    <p>ক্যান্সার চিকিৎসা শারীরিকভাবে কষ্টসাধ্য, কিন্তু মানসিক এবং মনস্তাত্ত্বিক চাপও সমানভাবে ভারী হতে পারে। আমাদের হোলিস্টিক কেয়ার প্রোগ্রাম সম্পূর্ণ ব্যক্তির উপর ফোকাস করে।</p>
                    <img src='https://placehold.co/800x400/4caf50/ffffff?text=Yoga+Bangla' alt='Yoga' />
                ",
                'icon' => 'SelfImprovement',
                'banner_image' => 'https://placehold.co/1200x600/4caf50/ffffff?text=Holistic+Care',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name_en' => 'Mental Wellness',
                'name_bn' => 'মানসিক সুস্থতা',
                'slug' => 'mental-wellness',
                'tagline_en' => 'Stronger Minds, Stronger Fight',
                'tagline_bn' => 'শক্তিশালী মন, শক্তিশালী লড়াই',
                'description_en' => "
                    <h2>Psychological Support</h2>
                    <p>A cancer diagnosis affects the mind as much as the body. Depression and anxiety are common among patients. Our Mental Wellness program offers professional counseling and support groups to help navigate these emotions.</p>

                    <img src='https://placehold.co/800x400/2196f3/ffffff?text=Counseling+Session' alt='Counseling' />

                    <h2>Support Options</h2>
                    <ul>
                        <li><strong>Individual Therapy:</strong> One-on-one sessions with psycho-oncologists.</li>
                        <li><strong>Group Support:</strong> Sharing experiences with fellow fighters.</li>
                        <li><strong>Family Counseling:</strong> Helping loved ones cope.</li>
                    </ul>

                    <blockquote>'It is okay not to be okay. We are here to listen.'</blockquote>
                ",
                'description_bn' => "
                    <h2>মনস্তাত্ত্বিক সহায়তা</h2>
                    <p>ক্যান্সার নির্ণয় শরীরের মতোই মনকে প্রভাবিত করে। আমাদের মানসিক সুস্থতা কর্মসূচি রোগী এবং তাদের পরিবারের জন্য পেশাদার কাউন্সেলিং অফার করে।</p>
                    <img src='https://placehold.co/800x400/2196f3/ffffff?text=Counseling+Bangla' alt='Counseling' />
                ",
                'icon' => 'Psychology',
                'banner_image' => 'https://placehold.co/1200x600/2196f3/ffffff?text=Mental+Wellness',
                'is_active' => true,
                'order' => 3,
            ],
            [
                'name_en' => 'All About Cancer in Bangladesh',
                'name_bn' => 'বাংলাদেশে ক্যান্সার সম্পর্কে সব',
                'slug' => 'all-about-cancer-in-bangladesh',
                'tagline_en' => 'Comprehensive information regarding cancer landscape.',
                'tagline_bn' => 'ক্যান্সার ল্যান্ডস্কেপ সম্পর্কিত ব্যাপক তথ্য।',
                'description_en' => "
                    <h2>Cancer Landscape in Bangladesh</h2>
                    <p>Understanding the cancer situation in Bangladesh is crucial for policy making and awareness. We gather data from various sources to present a clear picture.</p>

                    <img src='https://placehold.co/800x400/9c27b0/ffffff?text=Hospital+Map' alt='Map' />

                    <h2>Top Cancer Hospitals</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Location</th>
                                <th>Specialty</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>NICRH</td>
                                <td>Dhaka</td>
                                <td>General Oncology</td>
                            </tr>
                            <tr>
                                <td>United Hospital</td>
                                <td>Dhaka</td>
                                <td>Radiation Oncology</td>
                            </tr>
                            <tr>
                                <td>Ahsania Mission</td>
                                <td>Uttara</td>
                                <td>Comprehensive Care</td>
                            </tr>
                        </tbody>
                    </table>
                ",
                'description_bn' => "
                    <h2>বাংলাদেশে ক্যান্সারের পরিস্থিতি</h2>
                    <p>বাংলাদেশে ক্যান্সারের পরিস্থিতি বোঝা নীতি নির্ধারণ এবং সচেতনতার জন্য অত্যন্ত গুরুত্বপূর্ণ।</p>
                    <img src='https://placehold.co/800x400/9c27b0/ffffff?text=Hospital+Bangla' alt='Hospital' />
                ",
                'icon' => 'Info',
                'banner_image' => 'https://placehold.co/1200x600/9c27b0/ffffff?text=Cancer+in+BD',
                'is_active' => true,
                'order' => 4,
            ],
            [
                'name_en' => 'Patient & Caregiver Support',
                'name_bn' => 'রোগী এবং যত্নকারী সহায়তা',
                'slug' => 'patient-caregiver-support',
                'tagline_en' => 'Support for those who need it most.',
                'tagline_bn' => 'তাদের জন্য সমর্থন যারা এটি সবচেয়ে বেশি প্রয়োজন।',
                'description_en' => "
                    <h2>Guidance for Caregivers</h2>
                    <p>Caregivers are the unsung heroes of the cancer journey. We provide resources to help them manage the physical and emotional demands of caregiving.</p>

                    <img src='https://placehold.co/800x400/ff9800/ffffff?text=Caregiver+Support' alt='Caregivers' />

                    <h2>Resources Available</h2>
                    <ul>
                        <li><strong>Home Care Guide:</strong> Manuals on hygiene and nutrition.</li>
                        <li><strong>Emergency Contacts:</strong> List of ambulance and blood banks.</li>
                        <li><strong>Respite Care:</strong> Temporary relief for primary caregivers.</li>
                    </ul>
                ",
                'description_bn' => "
                    <h2>তত্ত্বাবধায়কদের জন্য নির্দেশিকা</h2>
                    <p>তত্ত্বাবধায়করা ক্যান্সার যাত্রার অদৃশ্য নায়ক। আমরা তাদের শারীরিক ও মানসিক চাহিদা ব্যবস্থাপনার জন্য সম্পদ প্রদান করি।</p>
                    <img src='https://placehold.co/800x400/ff9800/ffffff?text=Caregiver+Bangla' alt='Caregiver' />
                ",
                'icon' => 'SupportAgent',
                'banner_image' => 'https://placehold.co/1200x600/ff9800/ffffff?text=Patient+Support',
                'is_active' => true,
                'order' => 5,
            ],
            [
                'name_en' => '24/7 Helpline & Live Chat',
                'name_bn' => '২৪/৭ হেল্পলাইন এবং লাইভ চ্যাট',
                'slug' => '24-7-helpline',
                'tagline_en' => 'Always here for you.',
                'tagline_bn' => 'সর্বদা আপনার জন্য এখানে।',
                'description_en' => "
                    <h2>We Are Here to Listen</h2>
                    <p>Our helpline is available 24 hours a day, 7 days a week. Whether you have a medical question or just need someone to talk to, we are here.</p>

                    <img src='https://placehold.co/800x400/f44336/ffffff?text=Call+Center' alt='Helpline' />

                    <h2>Contact Channels</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Channel</th>
                                <th>Contact Info</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Phone</td>
                                <td>09600-000000</td>
                                <td>24/7</td>
                            </tr>
                            <tr>
                                <td>WhatsApp</td>
                                <td>+880190000000</td>
                                <td>9 AM - 10 PM</td>
                            </tr>
                            <tr>
                                <td>Live Chat</td>
                                <td>Website Widget</td>
                                <td>24/7</td>
                            </tr>
                        </tbody>
                    </table>
                ",
                'description_bn' => "
                    <h2>আমরা শোনার জন্য এখানে আছি</h2>
                    <p>আমাদের হেল্পলাইন দিনে ২৪ ঘন্টা, সপ্তাহে ৭ দিন উপলব্ধ। আপনার কোন চিকিৎসা প্রশ্ন থাকুক বা কথা বলার দরকার হোক, আমরা আছি।</p>
                    <img src='https://placehold.co/800x400/f44336/ffffff?text=Helpline+Bangla' alt='Helpline' />
                ",
                'icon' => 'HeadsetMic',
                'banner_image' => 'https://placehold.co/1200x600/f44336/ffffff?text=Helpline',
                'is_active' => true,
                'order' => 6,
            ],
        ];

        foreach ($programs as $program) {
            Program::updateOrCreate(
                ['slug' => $program['slug']],
                $program
            );
        }
    }
}
