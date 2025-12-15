import requests
import os
import random
import glob

BASE_URL = "http://127.0.0.1:8000/api/v1"
LOGIN_URL = f"{BASE_URL}/login"
PATIENTS_URL = f"{BASE_URL}/admin/patients"

# Dummy data generators
CANCER_TYPES = ['Leukemia', 'Lymphoma', 'Breast Cancer', 'Lung Cancer', 'Osteosarcoma', 'Brain Tumor']
LOCATIONS = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh']
NAMES = [
    'Rahim Uddin', 'Fatima Begum', 'Abdul Karim', 'Nasreen Akter', 'Kamal Hossain', 
    'Ayesha Siddiqua', 'Rafiqul Islam', 'Tasnim Jara', 'Sultana Razia', 'Jamal Uddin',
    'Bilquis Banu', 'Farid Ahmed', 'Salma Khatun', 'Moklesur Rahman', 'Jahanara Imam'
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

def seed_patients():
    # Use the same credentials as upload_team.py
    token = login('uploader@bancat.org', 'password123')
    if not token:
        # Fallback to admin if uploader doesn't exist
        print("Retrying with admin account...")
        token = login('admin@bancat.org', 'password')
        if not token:
            print("Cannot proceed without token.")
            return

    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json'
    }

    image_dir = 'team_images'
    if not os.path.exists(image_dir):
        print(f"Directory {image_dir} not found.")
        return

    # Get all images
    images = glob.glob(os.path.join(image_dir, '*.*'))
    images = [img for img in images if img.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]

    print(f"Found {len(images)} images in {image_dir}")

    for index, img_path in enumerate(images):
        name = NAMES[index % len(NAMES)] + f" ({index+1})"
        code = f"PT-{1000 + index}"
        
        print(f"Uploading {name} with image {os.path.basename(img_path)}...")
        
        payload = {
            'name_en': name,
            'name_bn': f"রোগী {index+1}", # Dummy Bangla name
            'code': code,
            'age': random.randint(5, 70),
            'phone': f"017{random.randint(10000000, 99999999)}",
            'email': f"patient{index}@example.com",
            'donor_name': random.choice(['Anonymous', 'John Doe', 'Jane Smith', '']),
            'location': random.choice(LOCATIONS),
            'cancer_type': random.choice(CANCER_TYPES),
            'treatment_cost_required': random.randint(50000, 500000),
            'fund_raised': random.randint(0, 40000),
            'medical_summary_en': f"This is a dummy medical summary for {name}. Patient requires urgent chemotherapy and radiation therapy.",
            'medical_summary_bn': "এটি একটি নমুনা মেডিকেল সারাংশ। রোগীর জরুরি কেমোথেরাপি প্রয়োজন।",
            'is_active': '1',
            'is_featured': '1' if index < 3 else '0' # Feature first 3
        }

        files = {
            'photo': (os.path.basename(img_path), open(img_path, 'rb'), 'image/jpeg')
        }
        
        try:
            # Note: Do NOT set Content-Type header manually when using 'files' in requests, 
            # it handles multipart boundary automatically.
            response = requests.post(PATIENTS_URL, headers=headers, data=payload, files=files)
            
            if response.status_code in [200, 201]:
                print(f"Success: {name}")
            else:
                print(f"Failed {name}: {response.text}")
        except Exception as e:
            print(f"Error uploading {name}: {e}")
        finally:
            files['photo'][1].close()

if __name__ == "__main__":
    seed_patients()
