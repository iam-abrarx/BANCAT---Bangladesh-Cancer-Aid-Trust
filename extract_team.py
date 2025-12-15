import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def extract_and_download():
    with open('page_content.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    team_data = []
    
    image_dir = 'team_images'
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)

    def download_image(img_url, name):
        if not img_url:
            return ""
        try:
            # Handle relative URLs if any (though source seems to have distinct absolute URLs)
            if not img_url.startswith('http'):
                img_url = 'https://bancat.org.bd' + img_url
            
            response = requests.get(img_url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=10)
            if response.status_code == 200:
                ext = os.path.splitext(urlparse(img_url).path)[1]
                if not ext:
                    ext = '.jpg'
                filename = f"{name.replace(' ', '_').replace('.', '').lower()}{ext}"
                filepath = os.path.join(image_dir, filename)
                if not os.path.exists(filepath):
                    with open(filepath, 'wb') as f:
                        f.write(response.content)
                print(f"Downloaded: {filename}")
                return filename
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")
        return ""

    # 1. Author/Executive Director (Najmus Ahmed Albab)
    # Finding by structure in section-1
    # This part is a bit unstructured in the HTML, so I'll grab it specifically if possible or skip to the structured lists if they contain him.
    # Actually, Najmus is in the Trustees list too. I should check if I need to duplicate or just take the structured one. 
    # The user said "Parse and extract all team-related data... including Any additional visible details".
    # The "Author's Note" section has a bio for Najmus.
    
    # Let's extract from the structured "Trustees" and "Ambassadors" sections first, as they cover most people.
    
    # Trustees Section
    trustee_section = soup.find('section', class_='why-cancer-section-4')
    if trustee_section:
        cards = trustee_section.find_all('div', class_='col')
        for card in cards:
            body = card.find('div', class_='card-body')
            if not body: continue
            
            img_tag = body.find('img')
            name_tag = body.find('h5', class_='card-title')
            desc_tag = body.find('p', class_='card-text')
            
            if name_tag:
                name = name_tag.get_text(strip=True)
                img_url = img_tag['src'] if img_tag else ""
                description = desc_tag.get_text(strip=True) if desc_tag else ""
                
                # Try to split designation from description if possible?
                # The description often starts with a quote or role.
                # E.g. "“a distinguished figure... As the esteemed President..."
                # It's hard to separate designation exactly, so I will put specific known designations or leave it in description.
                
                designation = "Trustee" # Default category
                
                filename = download_image(img_url, name)
                
                team_data.append({
                    "name": name,
                    "designation": designation,
                    "description": description,
                    "additional_info": "Trustee Section",
                    "image_url": img_url,
                    "image_filename": filename,
                    "category": "trustee"
                })

    # Ambassadors Section
    ambassador_section = soup.find_all('section', class_='why-cancer-section-5')
    # There are two section-5s. First one is Ambassadors.
    for section in ambassador_section:
        header = section.find('h4', class_='ambassador')
        if header:
            cards = section.find_all('div', class_='card')
            for card in cards:
                body = card.find('div', class_='card-body')
                if not body: continue
                
                img_tag = card.find('img', class_='card-img-top') # Image is outside body in some
                name_tag = body.find('h5', class_='card-title')
                role_tag = body.find('p', class_='card-text')
                
                if name_tag:
                    name = name_tag.get_text(strip=True)
                    # Remove "Ms. ", "Mr. " etc for cleaner naming? User didn't specify. I'll keep as is.
                    img_url = img_tag['src'] if img_tag else ""
                    
                    # For ambassadors, the p tag is the designation
                    designation_text = role_tag.get_text(separator=" ", strip=True) if role_tag else "Ambassador"
                    
                    filename = download_image(img_url, name)
                    
                    team_data.append({
                        "name": name,
                        "designation": designation_text,
                        "description": "", # No bio in these cards usually
                        "additional_info": "Ambassador Section",
                        "image_url": img_url,
                        "image_filename": filename,
                        "category": "ambassador"
                    })

    # Special handling for Leadership (President, etc from top sections if they differ)
    # Mr. Anis A. Khan is in the top section "President's Note". He is also in trustees.
    # Ms. Rokia Afzal Rahman is in "In memory of". She is not in the trustees list (maybe?). 
    # Lets check Rokia.
    # Rokia description in trustees card for Najmus? "Rokia Afzal Rahman ... broken barriers..." 
    # Ah, she might not have her own card in trustees.
    
    # Let's extract "In memory of" section manually
    mem_section = soup.find('div', class_='why-cancer-section-1-div-2')
    # Need to be careful to find the right one.
    headers = soup.find_all('h4')
    for h in headers:
        if "Rokia Afzal Rahman" in h.get_text():
            # Found the section
            parent = h.find_parent('div', class_='row')
            if parent:
                img_div = parent.find('div', class_='why-cancer-section-1-image')
                img_tag = img_div.find('img') if img_div else None
                img_url = img_tag['src'] if img_tag else ""
                
                desc_divs = parent.find_all('div', class_='why-cancer-section-1-text')
                description = " ".join([d.get_text(strip=True) for d in desc_divs])
                
                name = "Late Ms. Rokia Afzal Rahman"
                filename = download_image(img_url, name)
                
                team_data.append({
                    "name": name,
                    "designation": "Founding President",
                    "description": description[:500] + "...", # Truncate if too long?
                    "additional_info": "In Memory Section",
                    "image_url": img_url,
                    "image_filename": filename,
                    "category": "leadership"
                })

    with open('team_data.json', 'w', encoding='utf-8') as f:
        json.dump(team_data, f, indent=4)

    print(json.dumps(team_data, indent=2))

if __name__ == "__main__":
    extract_and_download()
