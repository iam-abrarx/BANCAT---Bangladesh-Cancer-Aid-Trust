# BANcat Selenium E2E Testing Suite

## Overview
Comprehensive end-to-end testing suite for the BANcat platform using Selenium WebDriver and pytest.

## Directory Structure

```
testing/selenium/
├── conftest.py                 # Pytest configuration and fixtures
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
├── README.md                  # This file
├── page_objects/              # Page Object Model classes
│   ├── __init__.py
│   ├── base_page.py          # Base page class
│   ├── home_page.py          # Landing page
│   ├── patient_page.py       # Patient listing & detail
│   ├── story_page.py         # Story listing & detail
│   ├── donation_page.py      # Donation form
│   ├── volunteer_page.py     # Volunteer form
│   └── admin_page.py         # Admin panel
├── tests/                     # Test cases
│   ├── __init__.py
│   ├── test_landing_page.py
│   ├── test_patients.py
│   ├── test_stories.py
│   ├── test_donations.py
│   ├── test_volunteers.py
│   ├── test_campaigns.py
│   ├── test_navigation.py
│   ├── test_i18n.py
│   ├── test_search.py
│   └── test_admin/
│       ├── test_admin_login.py
│       ├── test_admin_patients.py
│       └── test_admin_stories.py
├── screenshots/               # Failed test screenshots
├── reports/                   # Test reports (HTML, Allure)
└── utils/                     # Helper utilities
    ├── __init__.py
    ├── wait_helpers.py
    └── data_generators.py
```

## Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create `.env` file from template:

```bash
cp .env.example .env
```

Edit `.env`:

```env
BASE_URL=http://localhost:5173
API_URL=http://localhost:8000/api/v1
BROWSER=chrome
HEADLESS=false
IMPLICIT_WAIT=10
```

### 3. Browser Drivers

Drivers are automatically managed by `webdriver-manager`. Supported browsers:
- Chrome (default)
- Firefox

## Running Tests

### Run All Tests

```bash
pytest tests/ -v
```

### Run Specific Test File

```bash
pytest tests/test_landing_page.py -v
```

### Run Specific Test Function

```bash
pytest tests/test_patients.py::test_patient_listing -v
```

### Run with HTML Report

```bash
pytest tests/ -v --html=reports/report.html --self-contained-html
```

### Run in Headless Mode

```bash
pytest tests/ --headless
```

### Run with Specific Browser

```bash
pytest tests/ --browser=firefox
```

### Run Tests in Parallel

```bash
pytest tests/ -n 4  # Run with 4 parallel workers
```

### Run with Allure Reporting

```bash
# Generate Allure results
pytest tests/ --alluredir=reports/allure-results

# Serve Allure report
allure serve reports/allure-results
```

## Test Categories

### 1. Landing Page Tests (`test_landing_page.py`)
- ✅ Page loads successfully
- ✅ Hero section displays
- ✅ Impact metrics are visible
- ✅ Featured patients carousel works
- ✅ Quick donation section functional
- ✅ Navigation menu accessible

### 2. Patient Tests (`test_patients.py`)
- ✅ Patient listing displays
- ✅ Filters work (type, location, status)
- ✅ Patient detail page loads
- ✅ Progress bar shows correct percentage
- ✅ Donate button navigates correctly

### 3. Story Tests (`test_stories.py`)
- ✅ Story listing displays
- ✅ Story filtering by type
- ✅ Story detail page loads
- ✅ Media gallery functional
- ✅ Social sharing works

### 4. Donation Tests (`test_donations.py`)
- ✅ Donation form loads
- ✅ Amount selection (preset + custom)
- ✅ Payment method selection
- ✅ Recurring donation toggle
- ✅ Form validation works
- ✅ Payment gateway integration (mock)
- ✅ Anonymous donation option
- ✅ Confirmation page displays

### 5. Volunteer Tests (`test_volunteers.py`)
- ✅ Volunteer form loads
- ✅ Form validation
- ✅ Successful submission
- ✅ Confirmation message displays

### 6. Campaign Tests (`test_campaigns.py`)
- ✅ Campaign listing displays
- ✅ Campaign detail page loads
- ✅ Progress tracking visible
- ✅ Donate to campaign works

### 7. Navigation Tests (`test_navigation.py`)
- ✅ Mega menu displays all categories
- ✅ Menu links navigate correctly
- ✅ Mobile menu works
- ✅ Breadcrumbs display
- ✅ Footer links functional

### 8. Internationalization Tests (`test_i18n.py`)
- ✅ Language toggle switches EN ↔ BN
- ✅ Content updates after language change
- ✅ Bengali fonts render correctly
- ✅ Numbers format correctly per locale

### 9. Search Tests (`test_search.py`)
- ✅ Search bar functional
- ✅ Search results display
- ✅ Filter search results
- ✅ No results message displays

### 10. Admin Tests (`test_admin/`)
- ✅ Admin login works
- ✅ Patient CRUD operations
- ✅ Story CRUD operations
- ✅ Donation record viewing
- ✅ Volunteer application review

## Page Object Model

### Base Page Example

```python
# page_objects/base_page.py
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
    
    def find_element(self, locator):
        return self.wait.until(EC.presence_of_element_located(locator))
    
    def click(self, locator):
        element = self.wait.until(EC.element_to_be_clickable(locator))
        element.click()
```

### Page Object Example

```python
# page_objects/home_page.py
from selenium.webdriver.common.by import By
from .base_page import BasePage

class HomePage(BasePage):
    # Locators
    HERO_HEADLINE = (By.CSS_SELECTOR, 'h1.hero-headline')
    DONATE_BUTTON = (By.CSS_SELECTOR, 'button.donate-now')
    IMPACT_METRICS = (By.CSS_SELECTOR, '.impact-metrics')
    
    def navigate(self, base_url):
        self.driver.get(base_url)
    
    def is_loaded(self):
        return self.find_element(self.HERO_HEADLINE).is_displayed()
    
    def click_donate(self):
        self.click(self.DONATE_BUTTON)
```

## Best Practices

### 1. Use Page Object Model
- Separate test logic from page structure
- Reusable page components
- Easier maintenance

### 2. Explicit Waits
- Use WebDriverWait for dynamic content
- Avoid hard-coded sleeps
- Wait for specific conditions

### 3. Test Data Management
- Use fixtures for test data
- Faker for generating realistic data
- Separate test data from test logic

### 4. Screenshot on Failure
- Automatically captures on test failure
- Saved to `screenshots/` directory
- Includes timestamp and test name

### 5. Test Independence
- Each test should run independently
- Clean up test data after execution
- No dependencies between tests

### 6. Descriptive Test Names
- Use clear, descriptive function names
- Follow pattern: `test_<feature>_<scenario>`
- Include docstrings for complex tests

## Continuous Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install -r testing/selenium/requirements.txt
    
    - name: Run tests
      run: |
        pytest testing/selenium/tests/ --headless --html=report.html
    
    - name: Upload screenshots
      if: failure()
      uses: actions/upload-artifact@v3
      with:
        name: screenshots
        path: testing/selenium/screenshots/
```

## Troubleshooting

### Issue: WebDriver not found
**Solution**: Drivers are auto-installed. Ensure internet connection.

### Issue: Element not interactable
**Solution**: Increase implicit wait or use explicit waits.

### Issue: Tests fail in headless mode
**Solution**: Add `--window-size=1920,1080` to browser options.

### Issue: Slow test execution
**Solution**: Run tests in parallel with `pytest-xdist`.

## Contributing

1. Write tests following Page Object Model
2. Include docstrings for test functions
3. Use descriptive variable names
4. Run tests locally before committing
5. Ensure all tests pass

## Resources

- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [Pytest Documentation](https://docs.pytest.org/)
- [Page Object Model](https://selenium-python.readthedocs.io/page-objects.html)

---

Last updated: 2025-12-06
