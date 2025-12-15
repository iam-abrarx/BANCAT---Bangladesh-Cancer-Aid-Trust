import pytest
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures("driver")
class TestLandingPage:
    """Test Suite for Landing Page"""

    def test_landing_page_load(self, driver, base_url):
        """Verify landing page loads with key components"""
        driver.get(base_url)
        
        # Verify Title
        assert "BANcat" in driver.title, f"Title 'BANcat' not found in {driver.title}"
        
        # Verify Hero Section
        hero = driver.find_element(By.TAG_NAME, "h1")
        assert hero.is_displayed(), "Hero heading is not visible"
        # Optional: Check text if stable
        # assert "Cancer" in hero.text 

    def test_impact_metrics_display(self, driver, base_url):
        """Verify impact metrics are visible"""
        driver.get(base_url)
        
        # Look for metrics section/cards
        # Assuming component structure or text
        # We can look for typical metric labels if we know them, e.g., "Patients Supported"
        # Or check for elements with specific classes/ids if we added them.
        # Fallback to text check for now:
        time.sleep(1) # wait for animation
        body_text = driver.find_element(By.TAG_NAME, "body").text
        assert "Patients Supported" in body_text or "Lives Impacted" in body_text
        assert "Funds Raised" in body_text

    def test_navigation_menu(self, driver, base_url):
        """Verify navigation links work"""
        driver.get(base_url)
        
        # Find 'Patients' link
        # Assuming Navbar links
        patients_link = driver.find_element(By.LINK_TEXT, "Patients") # Make sure text matches
        patients_link.click()
        
        # Verify URL changed
        WebDriverWait(driver, 5).until(EC.url_contains("/patients"))
        assert "/patients" in driver.current_url
