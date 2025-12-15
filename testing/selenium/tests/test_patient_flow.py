import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures("driver")
class TestPatientFlow:
    """Test Suite for Patient Browsing and Search"""

    def test_patient_list_loads(self, driver, base_url):
        """Verify patient listing page loads cards"""
        driver.get(f"{base_url}/patients")
        
        # Wait for valid patient cards
        # Assuming we have at least one mock patient
        # Or look for 'No patients found' if empty, but cards preferrable.
        try:
             # Look for typical card element or grid
             # Using a generic wait for a known class or tag inside the grid
             # e.g., Material UI Card or just 'img' inside a link
             WebDriverWait(driver, 10).until(
                 EC.presence_of_element_located((By.CSS_SELECTOR, ".MuiCard-root"))
             )
             cards = driver.find_elements(By.CSS_SELECTOR, ".MuiCard-root")
             assert len(cards) > 0, "No patient cards found"
        except:
             # If API is down or empty, this might fail.
             # We assume test db is seeded.
             pytest.fail("Patient cards did not load (timeout)")

    def test_patient_detail_navigation(self, driver, base_url):
        """Verify clicking a patient takes to detail page"""
        driver.get(f"{base_url}/patients")
        
        # Click first 'Read More' or Card action
        # MUI CardActionArea or Button
        try:
            # First card
            card = WebDriverWait(driver, 10).until(
                 EC.presence_of_element_located((By.CSS_SELECTOR, ".MuiCard-root"))
            )
            # Find link inside card
            # Usually the whole card is clickable or a specific button
            # Let's try finding an anchor tag inside
            link = card.find_element(By.TAG_NAME, "a") 
            href = link.get_attribute("href")
            link.click()
            
            # Verify URL
            WebDriverWait(driver, 5).until(EC.url_to_be(href))
            assert driver.current_url == href
            
            # Verify Detail Page Content
            assert "Treatment Cost" in driver.page_source or "Medical Summary" in driver.page_source
        except Exception as e:
            pytest.fail(f"Navigation failed: {e}")
