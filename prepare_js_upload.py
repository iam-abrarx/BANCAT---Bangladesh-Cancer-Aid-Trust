import json
import base64
import os

def generate_js():
    with open('team_data.json', 'r', encoding='utf-8') as f:
        team_data = json.load(f)
    
    image_dir = 'team_images'
    js_data = []

    for member in team_data:
        item = {
            'name_en': member['name'],
            'name_bn': '',
            'role_en': member['designation'],
            'role_bn': '',
            'category': member['category'],
            'bio_en': member['description'],
            'bio_bn': '',
            'order': 0,
            'is_active': '1',
            'email': '',
            'linkedin': '',
            'imageFilename': member['image_filename']
        }
        
        # Base64 Encode Image
        img_path = os.path.join(image_dir, member['image_filename'])
        if os.path.exists(img_path):
            with open(img_path, 'rb') as imgf:
                b64 = base64.b64encode(imgf.read()).decode('utf-8')
                item['imageBase64'] = f"data:image/jpeg;base64,{b64}" # Assuming jpg
        else:
            item['imageBase64'] = ""
            
        js_data.append(item)

    # Chunk the data
    chunk_size = 5
    for i in range(0, len(js_data), chunk_size):
        chunk = js_data[i:i + chunk_size]
        
        js_content = f"""
        (async function() {{
            const teamData = {json.dumps(chunk)};
            const token = localStorage.getItem('token');
            if (!token) {{
                console.error("No token found");
                return "No token";
            }}
            
            console.log("Starting upload of chunk " + {i} + " size " + teamData.length);
            let success = 0;
            let fail = 0;
            
            for (let item of teamData) {{
                try {{
                    const formData = new FormData();
                    formData.append('name_en', item.name_en);
                    formData.append('role_en', item.role_en);
                    formData.append('category', item.category);
                    formData.append('bio_en', item.bio_en);
                    formData.append('is_active', '1');
                    if (item.additional_info) formData.append('bio_bn', item.additional_info); 

                    if (item.imageBase64) {{
                        const res = await fetch(item.imageBase64);
                        const blob = await res.blob();
                        formData.append('photo', blob, item.imageFilename);
                    }}
                    
                    const response = await fetch('http://localhost:8000/api/v1/admin/team-members', {{
                        method: 'POST',
                        headers: {{
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json'
                        }},
                        body: formData
                    }});
                    
                    if (response.ok) {{
                        console.log("Uploaded: " + item.name_en);
                        success++;
                    }} else {{
                        const txt = await response.text();
                        console.error("Failed " + item.name_en + ": " + txt);
                        fail++;
                    }}
                }} catch (e) {{
                    console.error("Error " + item.name_en + ": " + e);
                    fail++;
                }}
            }}
            window.chunkStatus_{i} = "Chunk {i} complete. Success: " + success + ", Fail: " + fail;
            console.log(window.chunkStatus_{i});
        }})();
        """
        
        filename = f'upload_payload_chunk_{i}.js'
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"Generated {filename}")

if __name__ == "__main__":
    generate_js()
