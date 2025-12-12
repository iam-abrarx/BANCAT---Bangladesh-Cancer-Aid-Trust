import json
import os
import shutil

# Paths
JSON_PATH = 'team_data.json'
IMAGE_SOURCE_DIR = 'team_images'
STORAGE_DIR = os.path.join('backend', 'storage', 'app', 'public', 'team')
SEEDER_PATH = os.path.join('backend', 'database', 'seeders', 'ImportTeamSeeder.php')

def run():
    # 1. Create storage directory
    if not os.path.exists(STORAGE_DIR):
        os.makedirs(STORAGE_DIR)
        print(f"Created directory: {STORAGE_DIR}")

    # 2. Read Data
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        team_data = json.load(f)

    # 3. Process Data and Move Images
    php_records = []
    
    for i, member in enumerate(team_data):
        # Move image
        img_filename = member['image_filename']
        src_img = os.path.join(IMAGE_SOURCE_DIR, img_filename)
        if os.path.exists(src_img):
            dst_img = os.path.join(STORAGE_DIR, img_filename)
            shutil.copy2(src_img, dst_img)
            # Path relative to public disk root
            db_photo_path = f"team/{img_filename}"
        else:
            print(f"Warning: Image not found for {member['name']}: {src_img}")
            db_photo_path = "" # Or default image

        # Escape strings for PHP
        name_en = member['name'].replace("'", "\\'")
        role_en = member['designation'].replace("'", "\\'")
        bio_en = member['description'].replace("'", "\\'")
        category = member['category']
        
        # PHP Array Entry
        record = f"""
            [
                'name_en' => '{name_en}',
                'name_bn' => '',
                'role_en' => '{role_en}',
                'role_bn' => '',
                'category' => '{category}',
                'photo' => '{db_photo_path}',
                'bio_en' => '{bio_en}',
                'bio_bn' => '',
                'email' => '',
                'linkedin' => '',
                'order' => {i},
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]"""
        php_records.append(record)

    # 4. Generate PHP Seeder Content
    all_records_str = ",\n".join(php_records)
    
    php_content = f"""<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class ImportTeamSeeder extends Seeder
{{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {{
        $team_members = [
{all_records_str}
        ];

        DB::table('team_members')->insert($team_members);
    }}
}}
"""

    with open(SEEDER_PATH, 'w', encoding='utf-8') as f:
        f.write(php_content)
    
    print(f"Seeder generated at: {SEEDER_PATH}")
    print(f"Processed {len(team_data)} records.")

if __name__ == "__main__":
    run()
