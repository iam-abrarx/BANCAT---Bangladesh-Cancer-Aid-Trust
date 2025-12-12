import json
import requests
import os

BASE_URL = "http://127.0.0.1:8000/api/v1"
LOGIN_URL = f"{BASE_URL}/login"
TEAM_URL = f"{BASE_URL}/admin/team-members"

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

def upload_team():
    token = login('uploader@bancat.org', 'password123')
    if not token:
        print("Cannot proceed without admin token.")
        return

    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json'
    }

    if not os.path.exists('team_data.json'):
        print("team_data.json not found.")
        return

    with open('team_data.json', 'r', encoding='utf-8') as f:
        team_data = json.load(f)

    image_dir = 'team_images'

    for index, member in enumerate(team_data):
        print(f"Uploading {member['name']}...")
        
        # Prepare data
        payload = {
            'name_en': member['name'],
            'role_en': member['designation'],
            'category': member['category'],
            'bio_en': member['description'] if member['description'] else member.get('additional_info', ''),
            'order': index,
            'is_active': '1'
        }

        # Handle image
        files = {}
        if member.get('image_filename'):
            img_path = os.path.join(image_dir, member['image_filename'])
            if os.path.exists(img_path):
                files['photo'] = (member['image_filename'], open(img_path, 'rb'), 'image/jpeg')
            else:
                print(f"Image not found: {img_path}")
        
        try:
            response = requests.post(TEAM_URL, headers=headers, data=payload, files=files)
            if response.status_code in [200, 201]:
                print(f"Success: {member['name']}")
            else:
                print(f"Failed {member['name']}: {response.text}")
        except Exception as e:
            print(f"Error uploading {member['name']}: {e}")
            
        # Close file if open
        if 'photo' in files:
            files['photo'][1].close()

if __name__ == "__main__":
    upload_team()
