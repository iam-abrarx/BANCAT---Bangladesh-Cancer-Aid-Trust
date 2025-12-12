
import requests
import json
import time

# Configuration
BASE_URL = "http://127.0.0.1:8000/api/v1"
LOGIN_URL = f"{BASE_URL}/login"
STORIES_URL = f"{BASE_URL}/admin/stories"

CREDENTIALS = {
    'email': 'admin@bancat.org',
    'password': 'password'
}

STORIES_DATA = [
    # --- Impact Stories (Survivor) ---
    {
        "title_en": "Fighting Back: Rubina's Journey",
        "subject_name_en": "Rubina Akter",
        "type": "survivor",
        "excerpt_en": "A mother of two who battled breast cancer with resilience and the support of BANCAT.",
        "content_en": "Rubina was diagnosed with stage 2 breast cancer in 2023. Devastated but determined, she approached BANCAT for guidance. Through our patient navigation program, she connected with the right oncologists and received financial aid for her chemotherapy. Today, she is cancer-free and advocates for early detection in her community.",
        "featured_image": "https://placehold.co/600x400?text=Rubina+Akter", 
        "is_published": 1
    },
    {
        "title_en": "A Second Chance at Life",
        "subject_name_en": "Rahim Uddin",
        "type": "survivor",
        "excerpt_en": "Beating lymphoma against all odds, Rahim is now back to supporting his family.",
        "content_en": "Rahim, a day laborer, thought his life was over when he was diagnosed with lymphoma. The high cost of treatment was impossible for him. BANCAT stepped in to cover his medication costs. After six months of rigorous treatment, Rahim is in remission and has returned to work, grateful for the second chance.",
        "featured_image": "https://placehold.co/600x400?text=Rahim+Uddin",
        "is_published": 1
    },

    # --- Patient Testimonials ---
    {
        "title_en": "BANCAT Saved My Father",
        "subject_name_en": "Salma Begum",
        "type": "testimonial",
        "excerpt_en": "A daughter's gratitude for the timely support that saved her father.",
        "content_en": "My father needed urgent surgery, and we had no funds left. BANCAT's emergency fund was a lifesaver. They didn't just give us money; they gave us hope. The staff treated us with such dignity and care. I will forever be indebted to this organization.",
        "featured_image": "https://placehold.co/600x400?text=Salma+Begum",
        "is_published": 1
    },
    {
        "title_en": "More Than Just Financial Aid",
        "subject_name_en": "Kamal Hossain",
        "type": "testimonial",
        "excerpt_en": "Kamal highlights the counseling and mental health support provided by BANCAT.",
        "content_en": "Cancer breaks you mentally more than physically. The counseling sessions at BANCAT helped me stay strong for my children. The financial aid was crucial, but the emotional support was what kept me going.",
        "featured_image": "https://placehold.co/600x400?text=Kamal+Hossain",
        "is_published": 1
    },

    # --- Caregiver Stories ---
    {
        "title_en": "Walking the Path Together",
        "subject_name_en": "Anisur Rahman",
        "type": "caregiver",
        "excerpt_en": "A husband's unwavering support for his wife through her cancer battle.",
        "content_en": "Watching my wife suffer was the hardest thing I've ever done. BANCAT's caregiver workshops taught me how to care for her properly at home and manage her medication. It also gave me a space to share my own stress. We are in this together, and BANCAT is part of our family now.",
        "featured_image": "https://placehold.co/600x400?text=Anisur+Rahman",
        "is_published": 1
    },
    {
        "title_en": "A Mother's Strength",
        "subject_name_en": "Jahanara Bibi",
        "type": "caregiver",
        "excerpt_en": "Caring for her son with leukemia, Jahanara is a pillar of strength.",
        "content_en": "My son is only 12. It's heartbreaking. But the doctors at BANCAT told me to be strong for him. They helped us with accommodation near the hospital so I didn't have to travel daily. That support allowed me to be by his side every moment.",
        "featured_image": "https://placehold.co/600x400?text=Jahanara+Bibi",
        "is_published": 1
    },

    # --- Volunteer Spotlight ---
    {
        "title_en": "Giving Back to the Community",
        "subject_name_en": "Tanvir Hasan",
        "type": "volunteer",
        "excerpt_en": "University student Tanvir dedicates his weekends to helping cancer patients.",
        "content_en": "I started volunteering at BANCAT for a college credit, but I stayed for the cause. Organizing blood donation drives and spending time with children in the palliative care unit has changed my perspective on life. Everyone should volunteer here.",
        "featured_image": "https://placehold.co/600x400?text=Tanvir+Hasan",
        "is_published": 1
    },
    {
        "title_en": "Driving Change",
        "subject_name_en": "Nasreen Sultana",
        "type": "volunteer",
        "excerpt_en": "A corporate professional using her skills to fundraise for BANCAT.",
        "content_en": "I use my network to raise funds for BANCAT's 'Zakat for Life' campaign. It's fulfilling to see how corporate social responsibility can directly save lives. BANCAT's transparency makes it easy for me to convince donors.",
        "featured_image": "https://placehold.co/600x400?text=Nasreen+Sultana",
        "is_published": 1
    }
]

def login():
    print(f"Logging in as {CREDENTIALS['email']}...")
    try:
        response = requests.post(LOGIN_URL, json=CREDENTIALS, headers={'Accept': 'application/json'})
        if response.status_code == 200:
            token = response.json().get('access_token')
            if token:
                print("✅ Login successful!")
                return token
            else:
                print("❌ Login success but no token returned.")
                return None
        else:
            print(f"❌ Login failed: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Login exception: {e}")
        return None

def seed_stories():
    token = login()
    if not token:
        return

    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    print(f"🚀 Starting upload of {len(STORIES_DATA)} stories...")
    
    success_count = 0

    for story in STORIES_DATA:
        # Fill in optional fields with defaults if needed
        data = {
            "title_en": story.get('title_en'),
            "title_bn": story.get('title_bn', ''), # Optional
            "subject_name_en": story.get('subject_name_en'),
            "subject_name_bn": story.get('subject_name_bn', ''), # Optional
            "type": story.get('type'),
            "content_en": story.get('content_en'),
            "content_bn": story.get('content_bn', ''), # Optional
            "excerpt_en": story.get('excerpt_en', ''),
            "excerpt_bn": story.get('excerpt_bn', ''), # Optional
            "featured_image": story.get('featured_image', ''),
            "video_url": story.get('video_url', ''),
            "is_published": story.get('is_published', 1)
        }

        try:
            response = requests.post(STORIES_URL, json=data, headers=headers)
            
            if response.status_code in [200, 201]:
                print(f"✅ Created: {data['title_en']}")
                success_count += 1
            else:
                print(f"❌ Failed: {data['title_en']} - {response.status_code} - {response.text}")

        except Exception as e:
            print(f"❌ Error creating {data['title_en']}: {e}")
            
    print(f"✨ Seeding complete! {success_count}/{len(STORIES_DATA)} stories added.")

if __name__ == "__main__":
    seed_stories()
