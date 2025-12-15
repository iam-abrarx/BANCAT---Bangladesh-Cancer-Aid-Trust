import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures("driver")
class TestForms:
    """Test Suite for Public Forms"""

    def test_volunteer_form_submission(self, driver, base_url, test_volunteer_data):
        """Verify volunteer application form"""
        driver.get(f"{base_url}/volunteer")
        
        # Fill Form
        try:
             driver.find_element(By.NAME, "name").send_keys(test_volunteer_data['name'])
             driver.find_element(By.NAME, "email").send_keys(test_volunteer_data['email'])
             driver.find_element(By.NAME, "phone").send_keys(test_volunteer_data['phone'])
             driver.find_element(By.NAME, "bio").send_keys(test_volunteer_data['message'])
             # Skills might be a multi-select or checkbox. Assuming text for simplicity or skipping complex interaction
             # If Select:
             # Select(driver.find_element(By.NAME, "skills")).select_by_visible_text(test_volunteer_data['skills'].split(',')[0])
             
             # Submit
             driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
             
             # Verify Success Message
             WebDriverWait(driver, 5).until(
                 EC.text_to_be_present_in_element((By.TAG_NAME, "body"), "successfully")
             )
        except Exception as e:
            pytest.fail(f"Volunteer form failed: {e}")

    def test_contact_form_submission(self, driver, base_url):
        """Verify contact form submission"""
        driver.get(f"{base_url}/contact")
        
        try:
            driver.find_element(By.NAME, "name").send_keys("Test Contact")
            driver.find_element(By.NAME, "email").send_keys("contact@example.com")
            driver.find_element(By.NAME, "message").send_keys("Hello BANcat!")
            
            driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
            
            WebDriverWait(driver, 5).until(
                 EC.text_to_be_present_in_element((By.TAG_NAME, "body"), "sent")
            )
        except Exception as e:
            pytest.fail(f"Contact form failed: {e}")
