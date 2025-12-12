/**
 * Testimonial Seeder Script
 * 
 * INSTRUCTIONS:
 * 1. Open the BANCAT Admin Panel in your browser (e.g., http://localhost:5174/admin/testimonials).
 * 2. Ensure you are logged in.
 * 3. Open the Developer Console (F12 -> Console).
 * 4. Copy and paste the entire code below into the console and press Enter.
 */

const testimonials = [
    {
        name: "Sarah Ahmed",
        role: "Cancer Survivor",
        quote: "The support I received from BANCAT was truly life-changing. They helped me navigate the complexities of treatment with dignity and hope."
    },
    {
        name: "Dr. Ayesha Rahim",
        role: "Oncologist",
        quote: "Seeing the impact of BANCAT's financial aid on my patients is heartwarming. It removes a huge burden, allowing them to focus on recovery."
    },
    {
        name: "Ali Khan",
        role: "Volunteer",
        quote: "Volunteering with BANCAT has shown me the power of community. Every small effort contributes to saving a life."
    },
    {
        name: "Fatima Z.",
        role: "Patient Family Member",
        quote: "When we lost hope due to the high costs of medication, BANCAT stepped in. We are forever grateful for their kindness."
    },
    {
        name: "Kamran Beg",
        role: "Regular Donor",
        quote: "I donate to BANCAT because I trust their transparency and see the tangible difference they make in people's lives."
    }
];

async function seedTestimonials() {
    // 1. Get Auth Token
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("❌ No auth token found! Please login to the Admin Panel first.");
        return;
    }

    // 2. Define API Endpoint (Adjust if your API runs on a different port)
    const API_URL = 'http://localhost:8000/api/v1/admin/testimonials';

    console.log(`🚀 Starting upload of ${testimonials.length} testimonials to ${API_URL}...`);

    let successCount = 0;

    // 3. Iterate and Upload
    for (const t of testimonials) {
        const formData = new FormData();
        formData.append('name', t.name);
        formData.append('role', t.role);
        formData.append('quote', t.quote);
        // Note: Images are skipped to keep things simple. You can add them manually in the admin panel later.

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Content-Type is set automatically for FormData
                },
                body: formData
            });

            if (response.ok) {
                console.log(`✅ Uploaded: ${t.name}`);
                successCount++;
            } else {
                const errText = await response.text();
                // Try to parse JSON error if possible
                try {
                    const errJson = JSON.parse(errText);
                    console.error(`❌ Failed: ${t.name}`, errJson);
                } catch (e) {
                    console.error(`❌ Failed: ${t.name}`, errText);
                }
            }
        } catch (error) {
            console.error(`❌ Network/Script Error for ${t.name}:`, error);
        }
    }

    console.log(`✨ Seeding complete! Successfully added ${successCount} out of ${testimonials.length} testimonials.`);

    // Optional: Refresh the page to see changes
    if (successCount > 0) {
        console.log("🔄 Refreshing page in 2 seconds...");
        setTimeout(() => window.location.reload(), 2000);
    }
}

// Run the function
seedTestimonials();