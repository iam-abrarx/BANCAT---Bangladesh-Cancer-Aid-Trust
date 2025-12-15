"""
Home Page Object
Represents the landing page of BANcat website
"""

from selenium.webdriver.common.by import By
from .base_page import BasePage


class HomePage(BasePage):
    """Page Object for the home/landing page"""
    
    # Locators
    HERO_HEADLINE = (By.CSS_SELECTOR, 'h1')
    HERO_SUBTEXT = (By.CSS_SELECTOR, '.hero-subtext')
    DONATE_NOW_BUTTON = (By.XPATH, "//button[contains(text(), 'Donate')]")
    
    # Impact Metrics
    IMPACT_METRICS_SECTION = (By.CSS_SELECTOR, '.impact-metrics')
    LIVES_TOUCHED_METRIC = (By.XPATH, "//div[contains(@class, 'metric')]//span[contains(text(), 'Lives')]")
    CHEMO_SESSIONS_METRIC = (By.XPATH, "//div[contains(@class, 'metric')]//span[contains(text(), 'Chemo')]")
    VOLUNTEERS_METRIC = (By.XPATH, "//div[contains(@class, 'metric')]//span[contains(text(), 'Volunteers')]")
    
    # Featured Patients
    FEATURED_PATIENTS_SECTION = (By.CSS_SELECTOR, '.featured-patients')
    PATIENT_CARDS = (By.CSS_SELECTOR, '.patient-card')
    PATIENT_SUPPORT_BUTTONS = (By.CSS_SELECTOR, '.patient-card button')
    
    # Programs Section
    PROGRAMS_SECTION = (By.CSS_SELECTOR, '.programs-grid')
    PROGRAM_CARDS = (By.CSS_SELECTOR, '.program-card')
    
    # Stories Section
    STORIES_SECTION = (By.CSS_SELECTOR, '.stories-section')
    STORY_CARDS = (By.CSS_SELECTOR, '.story-card')
    READ_ALL_STORIES_BUTTON = (By.XPATH, "//button[contains(text(), 'Read All Stories')]")
    
    # Quick Donation
    QUICK_DONATION_SECTION = (By.CSS_SELECTOR, '.quick-donation')
    AMOUNT_500_BUTTON = (By.XPATH, "//button[contains(text(), '500')]")
    AMOUNT_1000_BUTTON = (By.XPATH, "//button[contains(text(), '1000')]")
    AMOUNT_2000_BUTTON = (By.XPATH, "//button[contains(text(), '2000')]")
    CUSTOM_AMOUNT_INPUT = (By.CSS_SELECTOR, "input[name='customAmount']")
    
    # Get Involved Section
    GET_INVOLVED_SECTION = (By.CSS_SELECTOR, '.get-involved-cta')
    VOLUNTEER_CTA = (By.XPATH, "//button[contains(text(), 'Volunteer')]")
    PARTNER_CTA = (By.XPATH, "//button[contains(text(), 'Partner')]")
    
    # Header Navigation
    LANGUAGE_TOGGLE = (By.CSS_SELECTOR, '.language-toggle')
    MEGA_MENU_TRIGGER = (By.CSS_SELECTOR, '.mega-menu-trigger')
    
    def __init__(self, driver):
        super().__init__(driver)
    
    def navigate(self, base_url):
        """Navigate to home page"""
        self.driver.get(base_url)
    
    def is_loaded(self):
        """Check if home page is loaded"""
        return self.is_displayed(self.HERO_HEADLINE)
    
    def get_hero_headline(self):
        """Get hero section headline text"""
        return self.get_text(self.HERO_HEADLINE)
    
    def click_donate_now(self):
        """Click main donate button"""
        self.click(self.DONATE_NOW_BUTTON)
    
    def get_impact_metrics_count(self):
        """Get count of impact metrics displayed"""
        elements = self.find_elements(self.IMPACT_METRICS_SECTION)
        return len(elements)
    
    def is_impact_metrics_visible(self):
        """Check if impact metrics section is visible"""
        return self.is_displayed(self.IMPACT_METRICS_SECTION)
    
    def get_featured_patients_count(self):
        """Get count of featured patient cards"""
        elements = self.find_elements(self.PATIENT_CARDS)
        return len(elements)
    
    def click_first_patient_support(self):
        """Click support button on first patient card"""
        buttons = self.find_elements(self.PATIENT_SUPPORT_BUTTONS)
        if buttons:
            buttons[0].click()
    
    def get_programs_count(self):
        """Get count of program cards"""
        elements = self.find_elements(self.PROGRAM_CARDS)
        return len(elements)
    
    def get_stories_count(self):
        """Get count of story cards"""
        elements = self.find_elements(self.STORY_CARDS)
        return len(elements)
    
    def click_read_all_stories(self):
        """Click 'Read All Stories' button"""
        self.click(self.READ_ALL_STORIES_BUTTON)
    
    def select_quick_donation_amount(self, amount):
        """Select preset donation amount"""
        if amount == 500:
            self.click(self.AMOUNT_500_BUTTON)
        elif amount == 1000:
            self.click(self.AMOUNT_1000_BUTTON)
        elif amount == 2000:
            self.click(self.AMOUNT_2000_BUTTON)
    
    def enter_custom_donation_amount(self, amount):
        """Enter custom donation amount"""
        self.send_keys(self.CUSTOM_AMOUNT_INPUT, str(amount))
    
    def click_volunteer_cta(self):
        """Click volunteer CTA button"""
        self.scroll_to_element(self.VOLUNTEER_CTA)
        self.click(self.VOLUNTEER_CTA)
    
    def toggle_language(self):
        """Toggle language between EN and BN"""
        self.click(self.LANGUAGE_TOGGLE)
    
    def open_mega_menu(self):
        """Open mega menu navigation"""
        self.click(self.MEGA_MENU_TRIGGER)
