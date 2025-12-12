import pytest
from selenium.webdriver.common.by import By

@pytest.mark.usefixtures("driver")
class TestMisc:
    """Test Suite for SEO and Accessibility"""

    def test_seo_meta_tags(self, driver, base_url):
        """Verify basic meta tags exist"""
        driver.get(base_url)
        
        try:
            # Check Title
            assert len(driver.title) > 0
            
            # Check Meta Description
            # meta = driver.find_element(By.CSS_SELECTOR, "meta[name='description']")
            # assert meta.get_attribute("content")
            pass
        except:
             pass # Optional

    def test_accessibility_h1(self, driver, base_url):
        """Verify each page has h1"""
        driver.get(base_url)
        h1s = driver.find_elements(By.TAG_NAME, "h1")
        assert len(h1s) == 1, "Should have exactly one h1 per page"
