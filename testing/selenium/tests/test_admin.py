import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures("driver")
class TestAdmin:
    """Test Suite for Admin Panel"""

    def test_admin_login(self, driver, base_url):
        """Verify admin login"""
        driver.get(f"{base_url}/login") # Assuming login page handles admin too or separate /admin/login
        
        try:
            driver.find_element(By.NAME, "email").send_keys("admin@bancat.com")
            driver.find_element(By.NAME, "password").send_keys("password")
            driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
            
            # Verify Dashboard Access
            WebDriverWait(driver, 10).until(
                EC.url_contains("/dashboard") or EC.url_contains("/admin")
            )
            assert "Dashboard" in driver.title or "Dashboard" in driver.page_source
        except Exception as e:
             pytest.fail(f"Admin login failed: {e}")

    def test_admin_patient_crud(self, driver, base_url):
        """Verify admin can see patient list"""
        # Assuming already logged in from previous test or fixture?
        # Selenium Driver persistence depends on fixture scope. Our fixture is 'function', so new driver each time.
        # We need to login again.
        self.test_admin_login(driver, base_url) 
        
        driver.get(f"{base_url}/admin/patients")
        try:
             WebDriverWait(driver, 10).until(
                 EC.presence_of_element_located((By.TAG_NAME, "table"))
             )
        except:
             pytest.fail("Admin patient list failed")

    def test_admin_donation_records(self, driver, base_url):
        """Verify admin callbacks"""
        self.test_admin_login(driver, base_url)
        
        driver.get(f"{base_url}/admin/donations")
        try:
             WebDriverWait(driver, 10).until(
                 EC.presence_of_element_located((By.TAG_NAME, "table"))
             )
        except:
             pytest.fail("Admin donation list failed")
