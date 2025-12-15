<?php

namespace Database\Seeders;

use App\Models\Story;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StorySeeder extends Seeder
{
    public function run(): void
    {
        $stories = [
            [
                'type' => 'survivor',
                'title_en' => 'Battling Against Odds: Rahims Journey',
                'title_bn' => 'প্রতিকূলতার বিরুদ্ধে লড়াই: রহিমের যাত্রা',
                'excerpt_en' => 'Diagnosed at stage 3, Rahim never gave up hope.',
                'excerpt_bn' => '৩য় ধাপে ধরা পড়ার পর, রহিম কখনো আশা ছাড়েননি।',
                'content_en' => '<p>Rahim was just 35 when he was diagnosed with Colon Cancer. It was a shock to his family. But with determination and the support of BANCAT, he fought back.</p><p>Through months of chemotherapy, he maintained a smile. "Cancer can take my strength, but not my spirit," he would say.</p><p>Today, Rahim is cancer-free and advocates for early screening in his village.</p>',
                'content_bn' => '<p>রহিমের বয়স ছিল ৩৫ যখন তার কোলন ক্যান্সার ধরা পড়ে। এটি তার পরিবারের জন্য একটি ধাক্কা ছিল। কিন্তু দৃঢ় সংকল্প এবং BANCAT-এর সমর্থনে তিনি লড়াই করেছিলেন।</p>',
                'featured_image' => 'https://placehold.co/600x400/e91e63/ffffff?text=Rahim+Story',
                'is_published' => true,
                'subject_name_en' => 'Rahim Uddin',
                'subject_name_bn' => 'রহিম উদ্দিন',
            ],
            [
                'type' => 'survivor',
                'title_en' => 'A Mother’s Strength',
                'title_bn' => 'একজন মায়ের শক্তি',
                'excerpt_en' => 'Salma fought breast cancer for her children.',
                'excerpt_bn' => 'সালমা তার সন্তানদের জন্য স্তন ক্যান্সারের সাথে লড়াই করেছিলেন।',
                'content_en' => '<p>Salma discovered a lump during a self-exam. Immediate action saved her life. She underwent surgery and radiation.</p><p>Her message to women: "Do not ignore your body. Check yourself regularly."</p>',
                'content_bn' => '<p>সালমা নিজের পরীক্ষার সময় একটি পিণ্ড আবিষ্কার করেছিলেন। তাৎক্ষণিক পদক্ষেপ তার জীবন বাঁচিয়েছে।</p>',
                'featured_image' => 'https://placehold.co/600x400/9c27b0/ffffff?text=Salma+Story',
                'is_published' => true,
                'subject_name_en' => 'Salma Begum',
                'subject_name_bn' => 'সালমা বেগম',
            ],
            [
                'type' => 'caregiver',
                'title_en' => 'Caring with Love',
                'title_bn' => 'ভালবাসার সাথে যত্ন',
                'excerpt_en' => 'Anika stood by her husband through every chemo session.',
                'excerpt_bn' => 'আনিকা প্রতিটি কেমো সেশনের সময় তার স্বামীর পাশে ছিলেন।',
                'content_en' => '<p>Being a caregiver is not easy. It takes immense patience and love. Anika learned to be the pillar of strength for her husband fighting Leukemia.</p><blockquote>"We fought this battle together," she says.</blockquote>',
                'content_bn' => '<p>একজন সেবাদানকারী হওয়া সহজ নয়। এতে অপরিসীম ধৈর্য এবং ভালবাসা লাগে।</p>',
                'featured_image' => 'https://placehold.co/600x400/2196f3/ffffff?text=Caregiver+Anika',
                'is_published' => true,
                'subject_name_en' => 'Anika Rahman',
                'subject_name_bn' => 'আনিকা রহমান',
            ],
            [
                'type' => 'volunteer',
                'title_en' => 'Volunteering for a Cause',
                'title_bn' => 'কারণের জন্য স্বেচ্ছাসেবী',
                'excerpt_en' => 'Karim dedicates his weekends to hospital visits.',
                'excerpt_bn' => 'করিম তার সপ্তাহান্তগুলো হাসপাতালে পরিদর্শনে উৎসর্গ করেন।',
                'content_en' => '<p>Karim, a software engineer, spends his Saturdays visiting young cancer patients. He brings toys, books, and smiles.</p><p>"The joy on their faces is my reward," Karim shares.</p>',
                'content_bn' => '<p>করিম, একজন সফটওয়্যার ইঞ্জিনিয়ার, তার শনিবারে তরুণ ক্যান্সার রোগীদের দেখতে যান।</p>',
                'featured_image' => 'https://placehold.co/600x400/4caf50/ffffff?text=Volunteer+Karim',
                'is_published' => true,
                'subject_name_en' => 'Karim Hasan',
                'subject_name_bn' => 'করিম হাসান',
            ],
            [
                'type' => 'testimonial',
                'title_en' => 'Grateful for Life',
                'title_bn' => 'জীবনের জন্য কৃতজ্ঞ',
                'excerpt_en' => 'I could not afford treatment without BANCAT.',
                'excerpt_bn' => 'BANCAT ছাড়া আমি চিকিৎসার খরচ বহন করতে পারতাম না।',
                'content_en' => '<p>"I had lost all hope when the hospital asked for 5 Lakh Taka. Then BANCAT stepped in. They not only funded my surgery but gave me mental support."</p><p>- <strong>Rafiq, Lung Cancer Survivor</strong></p>',
                'content_bn' => '<p>"হাসপাতাল যখন ৫ লাখ টাকা চেয়েছিল তখন আমি সব আশা হারিয়ে ফেলেছিলাম। তখন BANCAT এগিয়ে আসে।"</p>',
                'featured_image' => 'https://placehold.co/600x400/ff9800/ffffff?text=Testimonial+Rafiq',
                'is_published' => true,
                'subject_name_en' => 'Rafiqul Islam',
                'subject_name_bn' => 'রফিকুল ইসলাম',
            ],
        ];

        foreach ($stories as $story) {
            Story::create(array_merge($story, [
                'slug' => Str::slug($story['title_en']),
                'view_count' => rand(100, 5000),
                'published_at' => $story['is_published'] ? now() : null,
            ]));
        }
    }
}
