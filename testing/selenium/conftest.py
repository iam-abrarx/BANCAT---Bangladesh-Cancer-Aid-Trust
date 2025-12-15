"""
BANcat Selenium Test Configuration
Pytest configuration and fixtures for E2E testing
"""

import pytest
import os
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Test configuration
BASE_URL = os.getenv('BASE_URL', 'http://localhost:5173')
API_URL = os.getenv('API_URL', 'http://localhost:8000/api/v1')
BROWSER = os.getenv('BROWSER', 'chrome')
HEADLESS = os.getenv('HEADLESS', 'false').lower() == 'true'
IMPLICIT_WAIT = int(os.getenv('IMPLICIT_WAIT', '10'))
SCREENSHOT_DIR = 'screenshots'


@pytest.fixture(scope='function')
def driver(request):
    """
    Setup WebDriver for each test
    Automatically tears down after test completion
    """
    # Create screenshot directory
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)
    
    # Initialize driver based on browser choice
    if BROWSER.lower() == 'chrome':
        options = webdriver.ChromeOptions()
        if HEADLESS:
            options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=1920,1080')
        
        driver = webdriver.Chrome(
            service=ChromeService(ChromeDriverManager().install()),
            options=options
        )
    
    elif BROWSER.lower() == 'firefox':
        options = webdriver.FirefoxOptions()
        if HEADLESS:
            options.add_argument('--headless')
        
        driver = webdriver.Firefox(
            service=FirefoxService(GeckoDriverManager().install()),
            options=options
        )
    
    else:
        raise ValueError(f"Unsupported browser: {BROWSER}")
    
    # Set implicit wait
    driver.implicitly_wait(IMPLICIT_WAIT)
    driver.maximize_window()
    
    # Provide driver to test
    yield driver
    
    # Teardown: Screenshot on failure, then quit
    if request.node.rep_call.failed:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        screenshot_name = f"{request.node.name}_{timestamp}.png"
        screenshot_path = os.path.join(SCREENSHOT_DIR, screenshot_name)
        driver.save_screenshot(screenshot_path)
        print(f"\n📸 Screenshot saved: {screenshot_path}")
    
    driver.quit()


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """
    Hook to make test results available to fixtures
    Used for screenshot on failure
    """
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)


@pytest.fixture(scope='session')
def base_url():
    """Provide base URL for frontend"""
    return BASE_URL


@pytest.fixture(scope='session')
def api_url():
    """Provide API URL for backend"""
    return API_URL


@pytest.fixture
def test_patient_data():
    """Sample patient data for testing"""
    return {
        'name_en': 'Test Patient',
        'name_bn': 'পরীক্ষা রোগী',
        'age': 45,
        'gender': 'female',
        'cancer_type': 'Breast Cancer',
        'location': 'Dhaka',
        'treatment_cost_required': 500000,
    }


@pytest.fixture
def test_donation_data():
    """Sample donation data for testing"""
    return {
        'donor_name': 'Test Donor',
        'donor_email': 'testdonor@example.com',
        'donor_phone': '01712345678',
        'amount': 1000,
        'donation_type': 'one_time',
        'category': 'general',
        'payment_method': 'bkash',
    }


@pytest.fixture
def test_volunteer_data():
    """Sample volunteer application data"""
    return {
        'name': 'Test Volunteer',
        'email': 'volunteer@example.com',
        'phone': '01712345678',
        'occupation': 'Software Engineer',
        'skills': 'Web Development, Content Writing',
        'availability': 'Weekends',
        'message': 'I would like to help with your mission.',
    }


# Pytest command-line options
def pytest_addoption(parser):
    """Add custom command-line options"""
    parser.addoption(
        "--browser",
        action="store",
        default="chrome",
        help="Browser to run tests: chrome or firefox"
    )
    parser.addoption(
        "--headless",
        action="store_true",
        help="Run browser in headless mode"
    )


@pytest.fixture(scope='session', autouse=True)
def configure_from_cli(request):
    """Configure test settings from CLI arguments"""
    global BROWSER, HEADLESS
    
    browser = request.config.getoption("--browser")
    if browser:
        BROWSER = browser
    
    if request.config.getoption("--headless"):
        HEADLESS = True
