
import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/v1"
LOGIN_URL = f"{BASE_URL}/login"
STORIES_URL = f"{BASE_URL}/admin/stories"

CREDENTIALS = {
    'email': 'admin@bancat.org',
    'password': 'password'
}

def test_upload_no_image():
    # Login
    resp = requests.post(LOGIN_URL, json=CREDENTIALS, headers={'Accept': 'application/json'})
    if resp.status_code != 200:
        print("Login failed")
        return
    token = resp.json().get('access_token')

    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    # Payload with NO featured_image
    data = {
        "title_en": "Test Story No Image",
        "subject_name_en": "Test Subject",
        "type": "survivor",
        "content_en": "Content without image.",
        "is_published": 1
    }

    response = requests.post(STORIES_URL, json=data, headers=headers)
    
    if response.status_code in [200, 201]:
        print("✅ Success: Created story without image!")
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")

if __name__ == "__main__":
    test_upload_no_image()
