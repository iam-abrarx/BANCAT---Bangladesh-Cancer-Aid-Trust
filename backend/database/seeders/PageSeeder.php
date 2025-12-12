<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'slug' => 'about-us',
                'title_en' => 'About Us',
                'title_bn' => 'আমাদের সম্পর্কে',
                'content_en' => '
                    <h2>Our Mission</h2>
                    <p>Bangladesh Cancer Aid Trust – BANCAT is a non-profit working towards raising awareness, with the ultimate goal, of eliminating cancer as a major health problem in Bangladesh by prevention and diminishing suffering through education, advocacy and service.</p>
                    <p>Approximately 150,000 people die while 200,000 develop cancer annually in Bangladesh. Out of which, only 25% can avail treatment. Our goal is to change this scenario.</p>
                    
                    <h2>Our Vision</h2>
                    <p>BANCAT focuses on three major development areas for the cancer community of Bangladesh:</p>
                    <ul>
                        <li>Nationwide Cancer Awareness</li>
                        <li>Holistic Care for Underprivileged Cancer Patients</li>
                        <li>Mental Wellness of Cancer Community</li>
                    </ul>
                ',
                'content_bn' => '
                    <p>বাংলাদেশ ক্যানসার এইড ট্রাস্ট (BANCAT) একটি অলাভজনক সংস্থা যা সচেতনতা বৃদ্ধির লক্ষ্যে কাজ করে, যার চূড়ান্ত লক্ষ্য হলো শিক্ষা, অ্যাডভোকেসি এবং সেবার মাধ্যমে প্রতিরোধ এবং দুর্ভোগ কমিয়ে বাংলাদেশে ক্যানসারকে একটি প্রধান স্বাস্থ্য সমস্যা হিসেবে নির্মূল করা।</p>
                ',
                'meta_title_en' => 'About Us - BANCAT',
                'meta_description_en' => 'Learn about BANCAT mission and vision to eliminate cancer as a major health problem in Bangladesh.',
            ],
            [
                'slug' => 'team',
                'title_en' => 'Our Trustees & Ambassadors',
                'title_bn' => 'আমাদের ট্রাস্টি এবং অ্যাম্বাসেডর',
                'content_en' => '
                    <h2>Executive Director\'s Note</h2>
                    <p>As the Author and Executive Director of Bangladesh Cancer Aid Trust (BANCAT), I am profoundly humbled to share with you the inspiration behind our mission, the vision that propels us forward, and the unwavering commitment we hold toward those battling cancer in our communities.</p>
                    
                    <h3>Trustees</h3>
                    <ul>
                        <li>Anis A. Khan</li>
                        <li>Shukla Sarwat Siraj</li>
                        <li>Najmus Ahmed Albab</li>
                        <li>Sohana Rouf Chowdhury</li>
                        <li>Sabrina Shaheed</li>
                        <li>Zeeshan Hasib</li>
                        <li>Nehal Ahmed</li>
                        <li>Farjad Ahmed</li>
                        <li>Mahzabin Ferdous</li>
                        <li>Zoheb Ahmed</li>
                        <li>Rumana Ahmed</li>
                        <li>Yusuf Tahdeebiddin Ahmed</li>
                    </ul>

                    <h3>Ambassadors of BANCAT</h3>
                    <ul>
                        <li>Ms. Rubana Huq</li>
                        <li>Ms. Syeda Rizwana Hasan</li>
                        <li>Ms. Sitara Ahsanullah</li>
                        <li>Ms. Farzanah Chowdhury</li>
                        <li>Ms. Shwapna Bhowmick</li>
                        <li>Mr. Mirza Salman Ispahani</li>
                        <li>Mr. Syed Mahbubur Rahman</li>
                        <li>Mr. Munir Hasan</li>
                        <li>Ms. Zahida Fizza Kabir</li>
                        <li>Mr. Naser Ezaz</li>
                        <li>Mr. MD Golam Kebria Sarkar</li>
                        <li>Prof. Imran Rahman</li>
                        <li>Mr. Athar Ali Khan</li>
                        <li>Mr. Sulaiman Ajanee</li>
                        <li>Ms. Naheed Ezaher Khan</li>
                        <li>Ms. Rubaba Dowla</li>
                        <li>Ms. Sara Zaker</li>
                        <li>Ms. Shampa Reza</li>
                        <li>Ms. Suraiya Zannath</li>
                        <li>Ms. Zara Jabeen Mahbub MP</li>
                        <li>Prof. Dr. Golam Mohiuddin Faruque</li>
                    </ul>
                ',
                'content_bn' => '<p>আমাদের ট্রাস্টি এবং অ্যাম্বাসেডরদের তালিকা।</p>',
                'meta_title_en' => 'Our Team - BANCAT',
                'meta_description_en' => 'Meet the dedicated Trustees and Ambassadors behind BANCAT.',
            ],
            [
                'slug' => 'services',
                'title_en' => 'Our Work & Services',
                'title_bn' => 'আমাদের কাজ ও সেবাসমূহ',
                'content_en' => '
                    <h2>Nationwide Cancer Awareness</h2>
                    <p>We conduct campaigns across the country to educate people about cancer prevention, early detection, and healthy lifestyle choices.</p>

                    <h2>Holistic Care</h2>
                    <p>We provide support for underprivileged cancer patients, ensuring they receive not just medical treatment but also emotional and social support.</p>

                    <h2>Mental Wellness</h2>
                    <p>Cancer affects the mind as much as the body. We offer counseling and support groups for patients and their families to help them cope with the journey.</p>
                ',
                'content_bn' => '<p>আমাদের সেবাসমূহ।</p>',
                'meta_title_en' => 'Our Services - BANCAT',
                'meta_description_en' => 'Explore the services provided by BANCAT including awareness, holistic care, and mental wellness.',
            ],
            [
                'slug' => 'contact-intro',
                'title_en' => 'Contact Us',
                'title_bn' => 'যোগাযোগ করুন',
                'content_en' => '
                    <p>We are here to help. If you have any questions, need support, or want to get involved, please reach out to us.</p>
                    <p><strong>Address:</strong><br>Floor-5A, House-11 /A, Suvastu Amirul Villa, Road-36, Gulshan-2, Dhaka</p>
                ',
                'content_bn' => '<p>আমাদের সাথে যোগাযোগ করুন।</p>',
                'meta_title_en' => 'Contact Us - BANCAT',
                'meta_description_en' => 'Get in touch with BANCAT.',
            ],
            [
                'slug' => 'privacy-policy',
                'title_en' => 'Privacy Policy',
                'title_bn' => 'গোপনীয়তা নীতি',
                'content_en' => '
                    <p><strong>Last Updated: March 10, 2021</strong></p>
                    <p>At BANCAT, we value your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
                    <p>(Full privacy policy text reflecting the commitment to data protection, donor privacy, and secure transactions would go here. For the purpose of this demo, we are summarizing.)</p>
                    <p>If you have any questions about this Privacy Policy, you can contact us by emailing us support@bancat.org.bd.</p>
                ',
                'content_bn' => '<p>গোপনীয়তা নীতি।</p>',
                'meta_title_en' => 'Privacy Policy - BANCAT',
                'meta_description_en' => 'Read our Privacy Policy.',
            ],
            [
                'slug' => 'terms-of-use',
                'title_en' => 'Terms of Use',
                'title_bn' => 'ব্যবহারের শর্তাবলী',
                'content_en' => '
                    <p><strong>IMPORTANT NOTICE:</strong> THIS AGREEMENT CONTAINS A BINDING ARBITRATION PROVISION AND CLASS ACTION WAIVER. IT AFFECTS YOUR LEGAL RIGHTS AS DETAILED IN THE ARBITRATION AND CLASS ACTION WAIVER SECTION BELOW. PLEASE READ CAREFULLY.</p>
                    <p>By using this website, you agree to these terms. (Full terms content would be placed here, covering usage rights, limitations of liability, and governing law.)</p>
                ',
                'content_bn' => '<p>ব্যবহারের শর্তাবলী।</p>',
                'meta_title_en' => 'Terms of Use - BANCAT',
                'meta_description_en' => 'Read our Terms of Use.',
            ],
            [
                'slug' => 'refund-policy',
                'title_en' => 'Refund Policy',
                'title_bn' => 'রিফান্ড পলিসি',
                'content_en' => '
                    <h2>Donation Refund Policy</h2>
                    <p>We are grateful for your donation and support of our organization. If you have made an error in making your donation or change your mind about contributing to our organization please contact us. Refunds are returned using the original method of payment. If you made your donation by credit card, your refund will be credited to that same credit card.</p>
                    <p>Email: support@bancatbd.org</p>
                ',
                'content_bn' => '<p>রিফান্ড পলিসি।</p>',
                'meta_title_en' => 'Refund Policy - BANCAT',
                'meta_description_en' => 'Read our Refund Policy.',
            ],
            // New Pages for Initiatives & Support
            [
                'slug' => 'awareness',
                'title_en' => 'Nationwide Cancer Awareness',
                'title_bn' => 'জাতীয় ক্যানসার সচেতনতা',
                'content_en' => '
                    <div class="program-content">
                        <h2>Nationwide Cancer Awareness</h2>
                        <p class="lead">Empowering communities with knowledge to fight cancer.</p>
                        
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" alt="Cancer Awareness Rally" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

                        <h3>Why Awareness Matters</h3>
                        <p>Cancer is often detected at late stages in Bangladesh due to lack of awareness. BANCAT runs nationwide campaigns to educate people about early warning signs, the importance of regular screenings, and lifestyle choices that can reduce cancer risk.</p>

                        <h3>Our Impact</h3>
                        <ul>
                            <li><strong>50+</strong> Schools Visited</li>
                            <li><strong>10,000+</strong> People Educated</li>
                            <li><strong>Free Screenings</strong> in remote villages</li>
                        </ul>

                        <blockquote>"Awareness is the first step towards a cancer-free future."</blockquote>
                    </div>
                ',
                'content_bn' => '<p>জাতীয় ক্যানসার সচেতনতা কার্যক্রম। আমরা স্কুল, কলেজ এবং গ্রামীণ এলাকায় ক্যানসার সচেতনতা বৃদ্ধি করছি।</p>',
                'meta_title_en' => 'Nationwide Cancer Awareness Program - BANCAT',
                'meta_description_en' => 'BANCAT\'s nationwide program to raise cancer awareness and promote early detection.',
            ],
            [
                'slug' => 'holistic-care',
                'title_en' => 'Holistic Care',
                'title_bn' => 'হোলিস্টিক কেয়ার',
                'content_en' => '
                     <div class="program-content">
                        <h2>Holistic Care for Patients</h2>
                        <p class="lead">Treating the human, not just the disease.</p>

                        <img src="https://images.unsplash.com/photo-1516574187841-693083fcc49c?auto=format&fit=crop&w=1200&q=80" alt="Holistic Care" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
                        
                        <p>Our Holistic Care program focuses on the physical, emotional, and social well-being of cancer patients. We believe effective treatment requires a supportive environment.</p>

                        <h3>Integrated Services</h3>
                        <ul>
                            <li><strong>Nutritional Support:</strong> Custom diet plans to maintain strength during treatment.</li>
                            <li><strong>Pain Management:</strong> Non-invasive therapies to manage chronic pain.</li>
                            <li><strong>Rehabilitation:</strong> Physical therapy to help patients regain mobility.</li>
                        </ul>
                    </div>
                ',
                'content_bn' => '<p>হোলিস্টিক কেয়ার সেবা। রোগীদের শারীরিক ও মানসিক সুস্বাস্থ্যের জন্য আমাদের বিশেষ সেবা।</p>',
                'meta_title_en' => 'Holistic Care Program - BANCAT',
                'meta_description_en' => 'Integrated holistic care services for cancer patients including nutrition and rehabilitation.',
            ],
            [
                'slug' => 'mental-wellness',
                'title_en' => 'Mental Wellness',
                'title_bn' => 'মানসিক সুস্বাস্থ্য',
                'content_en' => '
                     <div class="program-content">
                        <h2>Mental Wellness Support</h2>
                        <p class="lead">Healing the mind to help heal the body.</p>

                        <img src="https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=1200&q=80" alt="Mental Wellness Group" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
                        
                        <p>A cancer diagnosis can be overwhelming. Anxiety, depression, and fear are common. BANCAT provides professional counseling and support groups to help patients and families navigate the emotional journey of cancer.</p>

                        <h3>Our Support System</h3>
                        <ul>
                            <li><strong>One-on-One Counseling:</strong> Confidential sessions with licensed psychologists.</li>
                            <li><strong>Support Groups:</strong> Connect with others going through similar experiences.</li>
                            <li><strong>Stress Reduction:</strong> Mindfulness and meditation workshops.</li>
                        </ul>
                    </div>
                ',
                'content_bn' => '<p>মানসিক সুস্বাস্থ্য সেবা। ক্যানসার রোগীদের এবং তাদের পরিবারের জন্য মানসিক সহায়তা।</p>',
                'meta_title_en' => 'Mental Wellness Program - BANCAT',
                'meta_description_en' => 'Mental health support and counseling for cancer patients and families.',
            ],
            [
                'slug' => 'all-about-cancer-in-bangladesh',
                'title_en' => 'All About Cancer in Bangladesh',
                'title_bn' => 'বাংলাদেশে ক্যানসার তথ্যাবলী',
                'content_en' => '
                    <h2>Understanding the Landscape</h2>
                    <p>Cancer is a major public health concern in Bangladesh. With an estimated 200,000 new cases annually, the burden on the healthcare system and families is immense.</p>
                    
                    <h3>Key Statistics</h3>
                    <ul>
                        <li><strong>Incidence:</strong> ~200,000 new cases per year.</li>
                        <li><strong>Mortality:</strong> ~150,000 deaths annually.</li>
                        <li><strong>Common Types:</strong> Lung, Breast, Cervical, and Oral cancers are the most prevalent.</li>
                    </ul>
                    
                    <h3>Cheklist for Prevention</h3>
                    <p>Avoiding tobacco, maintaining a healthy diet, and regular screenings are crucial steps for prevention. We provide resources to help you locate the nearest cancer treatment centers.</p>
                ',
                'content_bn' => '<p>বাংলাদেশে ক্যানসার সম্পর্কিত তথ্য।</p>',
                'meta_title_en' => 'All About Cancer in Bangladesh - BANCAT',
                'meta_description_en' => 'Statistics and information about cancer in Bangladesh.',
            ],
            [
                'slug' => 'patient-caregiver-support',
                'title_en' => 'Patient & Caregiver Support',
                'title_bn' => 'রোগী ও পরিচর্যাকারীর সহায়তা',
                'content_en' => '
                    <h2>You Are Not Alone</h2>
                    <p>Caregivers are the unsung heroes of the cancer journey. We provide resources not only for patients but also for the family members and friends who care for them.</p>
                    
                    <h3>For Caregivers</h3>
                    <p>Caregiver burnout is real. We offer respite care advice, training on how to handle medical needs at home, and emotional support groups specifically for caregivers.</p>
                    
                    <h3>Financial Assistance</h3>
                    <p>We guide underprivileged families on how to apply for financial grants and Zakat funds to cover treatment costs.</p>
                ',
                'content_bn' => '<p>রোগী ও পরিচর্যাকারীর সহায়তা কার্যক্রম।</p>',
                'meta_title_en' => 'Patient & Caregiver Support - BANCAT',
                'meta_description_en' => 'Support resources for cancer patients and their caregivers.',
            ],
            [
                'slug' => '24-7-helpline',
                'title_en' => '24/7 Helpline & Live Chat',
                'title_bn' => '২৪/৭ হেল্পলাইন',
                'content_en' => '
                    <h2>Always Here to Listen</h2>
                    <p>Need someone to talk to? Our helpline provides immediate support for cancer patients and their families.</p>
                    
                    <h3>Contact Us</h3>
                    <ul>
                        <li><strong>Hotline:</strong> 096XX-XXXXXX (Available 24/7)</li>
                        <li><strong>Live Chat:</strong> Click the chat icon on the bottom right to speak with a counselor.</li>
                    </ul>
                    
                    <p>Whether you need medical guidance, emotional support, or just a listening ear, BANCAT is just a call away.</p>
                ',
                'content_bn' => '<p>২৪/৭ হেল্পলাইন সেবা।</p>',
                'meta_title_en' => '24/7 Helpline - BANCAT',
                'meta_description_en' => '24/7 Helpline and Live Chat support for cancer patients.',
            ],
        ];

        foreach ($pages as $page) {
            Page::updateOrCreate(
                ['slug' => $page['slug']],
                array_merge($page, ['is_published' => true])
            );
        }
    }
}
