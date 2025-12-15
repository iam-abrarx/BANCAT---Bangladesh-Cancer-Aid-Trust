import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/v1"
LOGIN_URL = f"{BASE_URL}/login"
TESTIMONIALS_URL = f"{BASE_URL}/admin/testimonials"

testimonials = [
    {
        "name": "Sarah Ahmed",
        "role": "Cancer Survivor",
        "quote": "The support I received from BANCAT was truly life-changing. They helped me navigate the complexities of treatment with dignity and hope."
    },
    {
        "name": "Dr. Ayesha Rahim",
        "role": "Oncologist",
        "quote": "Seeing the impact of BANCAT's financial aid on my patients is heartwarming. It removes a huge burden, allowing them to focus on recovery."
    },
    {
        "name": "Ali Khan",
        "role": "Volunteer",
        "quote": "Volunteering with BANCAT has shown me the power of community. Every small effort contributes to saving a life."
    },
    {
        "name": "Fatima Z.",
        "role": "Patient Family Member",
        "quote": "When we lost hope due to the high costs of medication, BANCAT stepped in. We are forever grateful for their kindness."
    },
    {
        "name": "Kamran Beg",
        "role": "Regular Donor",
        "quote": "I donate to BANCAT because I trust their transparency and see the tangible difference they make in people's lives."
    }
]

def login(email, password):
    try:
        response = requests.post(LOGIN_URL, json={'email': email, 'password': password}, headers={'Accept': 'application/json'})
        if response.status_code == 200:
            token = response.json().get('access_token')
            return token
        else:
            print(f"Login failed: {response.text}")
            return None
    except Exception as e:
        print(f"Login error: {e}")
        return None

def seed_testimonials():
    print("Logging in...")
    token = login('uploader@bancat.org', 'password123')
    if not token:
        print("Cannot proceed without admin token.")
        return

    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json'
    }

    print(f"Seeding {len(testimonials)} testimonials...")

    success_count = 0
    for t in testimonials:
        # formData in JS used 'name', 'role', 'quote'
        payload = {
            'name': t['name'],
            'role': t['role'],
            'quote': t['quote']
        }
        
        try:
            response = requests.post(TESTIMONIALS_URL, headers=headers, json=payload)
            # Check for both 200 and 201 (Created)
            if response.status_code in [200, 201]:
                print(f"✅ Uploaded: {t['name']}")
                success_count += 1
            else:
                print(f"❌ Failed: {t['name']} - Status: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Error uploading {t['name']}: {e}")

    print(f"✨ Seeding complete! Successfully added {success_count} out of {len(testimonials)} testimonials.")

if __name__ == "__main__":
    seed_testimonials()
