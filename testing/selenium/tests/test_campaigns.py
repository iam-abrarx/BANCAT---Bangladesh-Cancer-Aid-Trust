import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures("driver")
class TestCampaigns:
    """Test Suite for Campaigns"""

    def test_campaign_list_loads(self, driver, base_url):
        """Verify campaign listing"""
        driver.get(f"{base_url}/campaigns")
        
        try:
             WebDriverWait(driver, 10).until(
                 EC.presence_of_element_located((By.CSS_SELECTOR, ".MuiCard-root"))
             )
             assert "Campaign" in driver.page_source
        except:
             pytest.fail("Campaigns failed to load")

    def test_campaign_detail(self, driver, base_url):
        """Verify campaign detail page"""
        driver.get(f"{base_url}/campaigns")
        
        try:
            # Click first campaign
            cards = driver.find_elements(By.CSS_SELECTOR, ".MuiCard-root")
            if len(cards) > 0:
                cards[0].find_element(By.TAG_NAME, "a").click()
                
                # Check for Goal/Raised
                WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Goal')]"))
                )
        except Exception as e:
            pytest.fail(f"Campaign detail failed: {e}")
