/**
 * Stories Seeder Script
 * 
 * INSTRUCTIONS:
 * 1. Open the BANCAT Admin Panel in your browser (e.g., http://localhost:5174/admin/stories).
 * 2. Ensure you are logged in.
 * 3. Open the Developer Console (F12 -> Console).
 * 4. Copy and paste the entire code below into the console and press Enter.
 */

const stories = [
    // --- Impact Stories (Survivor) ---
    {
        title_en: "Fighting Back: Rubina's Journey",
        subject_name_en: "Rubina Akter",
        type: "survivor",
        excerpt_en: "A mother of two who battled breast cancer with resilience and the support of BANCAT.",
        content_en: "Rubina was diagnosed with stage 2 breast cancer in 2023. Devastated but determined, she approached BANCAT for guidance. Through our patient navigation program, she connected with the right oncologists and received financial aid for her chemotherapy. Today, she is cancer-free and advocates for early detection in her community.",
        featured_image: "https://placehold.co/600x400?text=Rubina+Akter",
        is_published: 1
    },
    {
        title_en: "A Second Chance at Life",
        subject_name_en: "Rahim Uddin",
        type: "survivor",
        excerpt_en: "Beating lymphoma against all odds, Rahim is now back to supporting his family.",
        content_en: "Rahim, a day laborer, thought his life was over when he was diagnosed with lymphoma. The high cost of treatment was impossible for him. BANCAT stepped in to cover his medication costs. After six months of rigorous treatment, Rahim is in remission and has returned to work, grateful for the second chance.",
        featured_image: "https://placehold.co/600x400?text=Rahim+Uddin",
        is_published: 1
    },

    // --- Patient Testimonials ---
    {
        title_en: "BANCAT Saved My Father",
        subject_name_en: "Salma Begum",
        type: "testimonial",
        excerpt_en: "A daughter's gratitude for the timely support that saved her father.",
        content_en: "My father needed urgent surgery, and we had no funds left. BANCAT's emergency fund was a lifesaver. They didn't just give us money; they gave us hope. The staff treated us with such dignity and care. I will forever be indebted to this organization.",
        featured_image: "https://placehold.co/600x400?text=Salma+Begum",
        is_published: 1
    },
    {
        title_en: "More Than Just Financial Aid",
        subject_name_en: "Kamal Hossain",
        type: "testimonial",
        excerpt_en: "Kamal highlights the counseling and mental health support provided by BANCAT.",
        content_en: "Cancer breaks you mentally more than physically. The counseling sessions at BANCAT helped me stay strong for my children. The financial aid was crucial, but the emotional support was what kept me going.",
        featured_image: "https://placehold.co/600x400?text=Kamal+Hossain",
        is_published: 1
    },

    // --- Caregiver Stories ---
    {
        title_en: "Walking the Path Together",
        subject_name_en: "Anisur Rahman",
        type: "caregiver",
        excerpt_en: "A husband's unwavering support for his wife through her cancer battle.",
        content_en: "Watching my wife suffer was the hardest thing I've ever done. BANCAT's caregiver workshops taught me how to care for her properly at home and manage her medication. It also gave me a space to share my own stress. We are in this together, and BANCAT is part of our family now.",
        featured_image: "https://placehold.co/600x400?text=Anisur+Rahman",
        is_published: 1
    },
    {
        title_en: "A Mother's Strength",
        subject_name_en: "Jahanara Bibi",
        type: "caregiver",
        excerpt_en: "Caring for her son with leukemia, Jahanara is a pillar of strength.",
        content_en: "My son is only 12. It's heartbreaking. But the doctors at BANCAT told me to be strong for him. They helped us with accommodation near the hospital so I didn't have to travel daily. That support allowed me to be by his side every moment.",
        featured_image: "https://placehold.co/600x400?text=Jahanara+Bibi",
        is_published: 1
    },

    // --- Volunteer Spotlight ---
    {
        title_en: "Giving Back to the Community",
        subject_name_en: "Tanvir Hasan",
        type: "volunteer",
        excerpt_en: "University student Tanvir dedicates his weekends to helping cancer patients.",
        content_en: "I started volunteering at BANCAT for a college credit, but I stayed for the cause. Organizing blood donation drives and spending time with children in the palliative care unit has changed my perspective on life. Everyone should volunteer here.",
        featured_image: "https://placehold.co/600x400?text=Tanvir+Hasan",
        is_published: 1
    },
    {
        title_en: "Driving Change",
        subject_name_en: "Nasreen Sultana",
        type: "volunteer",
        excerpt_en: "A corporate professional using her skills to fundraise for BANCAT.",
        content_en: "I use my network to raise funds for BANCAT's 'Zakat for Life' campaign. It's fulfilling to see how corporate social responsibility can directly save lives. BANCAT's transparency makes it easy for me to convince donors.",
        featured_image: "https://placehold.co/600x400?text=Nasreen+Sultana",
        is_published: 1
    }
];

async function seedStories() {
    // 1. Get Auth Token
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("❌ No auth token found! Please login to the Admin Panel first.");
        return;
    }

    // 2. Define API Endpoint
    // Inferred from AdminStoryForm.tsx implicit usage or standard conventions
    // If AdminStoryForm uses `storyService.createStory(data)`, check `storyService.ts` for exact URL.
    // Assuming standard Laravel resource route: /api/v1/admin/stories
    const API_URL = 'http://localhost:8000/api/v1/admin/stories';

    console.log(`🚀 Starting upload of ${stories.length} stories to ${API_URL}...`);

    let successCount = 0;

    // 3. Iterate and Upload
    for (const story of stories) {
        // Construct FormData just like the manual form submission likely does, or JSON if supported.
        // AdminStoryForm uses `storyService.createStory(data)`.
        // Let's use JSON if the backend accepts it, but FormData is safer for file uploads (even if we are just sending strings).
        // However, the previous `upload_payload.js` used FormData, so let's stick to that for consistnecy.

        try {
            // Note: If the backend expects FormData for file uploads, we must use it.
            // If we are just sending text (and `featured_image` is a URL string in our dummy data), JSON might work if the backend supports it.
            // But let's stick to FormData as it's robust for 'multipart/form-data'.

            // Wait - the form in AdminStoryForm has `featured_image` as a string (URL) in the interface `StoryFormData`.
            // So it's likely just a text field or the user has to handle file uploads separately.
            // If it's a file input in reality, we can't seed it easily. 
            // Looking at the component: `TextField {...field} label="Featured Image URL"` -> It takes a URL string! great.

            // So we can send JSON probably. But let's try JSON first as it's cleaner.
            // Actually, the previous `upload_payload.js` used FormData. Let's use JSON this time if likely supported, 
            // BUT to be safe given PHP/Laravel often likes its FormData for "requests with files" (even if none provided sometimes), 
            // I'll stick to JSON because `storyService` likely sends JSON unless it detects files.

            // let's try JSON.
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(story)
            });

            if (response.ok) {
                console.log(`✅ Uploaded: ${story.title_en}`);
                successCount++;
            } else {
                // If 422 Unprocessable Entity (Validation Error), maybe it wants FormData?
                const errText = await response.text();
                try {
                    const errJson = JSON.parse(errText);
                    console.error(`❌ Failed: ${story.title_en}`, errJson);
                } catch (e) {
                    console.error(`❌ Failed: ${story.title_en}`, errText);
                }
            }
        } catch (error) {
            console.error(`❌ Network/Script Error for ${story.title_en}:`, error);
        }
    }

    console.log(`✨ Seeding complete! Successfully added ${successCount} out of ${stories.length} stories.`);

    // Optional: Refresh the page to see changes
    if (successCount > 0) {
        console.log("🔄 Refreshing page in 2 seconds...");
        setTimeout(() => window.location.reload(), 2000);
    }
}

// Run the function
seedStories();
