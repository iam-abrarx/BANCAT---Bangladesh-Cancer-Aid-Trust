# BANCAT Website Redesign: Requirement Analysis

**Document Date:** 25/11/2025  
**Quotation ID:** 2a9TcF9  
**Version:** Final  

---

## 1. Project Summary

BANCAT aims to transform its current website into a modern, multilingual, and emotionally engaging platform that inspires action, simplifies donations, and fosters a supportive community around cancer awareness in Bangladesh. The new site will combine streamlined giving options with compelling storytelling, dedicated information and support resources, and clear pathways for individuals, volunteers, and organizations to get involved—ultimately positioning BANCAT as a comprehensive digital hub for awareness, impact, and participation.

---

## 2. Core Functional Requirements

### 1. Multilingual Support

* **1.1** Bengali language option (Full localization).
* **1.2** English language option.
* **1.3** Prominent language selector toggle.

### 2. Dynamic & Emotional User Interface

* **2.1** Clean, modern, visually compelling design.
* **2.2** High-quality imagery and videos (patients, volunteers, community).
* **2.3** Real-time impact metrics (e.g., “Lives Touched,” “Chemotherapy Sessions Funded This Month”).
* **2.4** Campaign banner (e.g., “End Cancer as We Know It”).

### 3. Donation Features

* **3.1** Multiple transaction gateways: bKash, Nagad, local banks, PayPal (international).
* **3.2** Flexible giving: Custom donation amounts (input field).
* **3.3** Donation-linked storytelling: "Donate to this Story" context preservation.

### 4. Content & Storytelling

* **4.1** Dedicated Initiative: Nationwide Cancer Awareness.
* **4.2** Dedicated Initiative: Holistic Care.
* **4.3** Dedicated Initiative: Mental Wellness.
* **4.4** Blog: Revamped "Our Warriors / Impact Stories" (Admin CRUD).
* **4.5-4.8** Testimonials (Patient/Caregiver), Volunteer Spotlights, Multimedia (Text/Photo/Video).

### 5. Information & Support

* **5.1** "All About Cancer in Bangladesh": Localized info on types, early detection, prevention.
* **5.2** Patient & Caregiver Support: Treatment navigation, connection to local groups.
* **5.3** Service Connections: Direct links/info for *Alok Nibash* and *Alok Boshoti*.
* **5.4** Support Channel: 24/7 helpline or live chat integration.

### 6. Community Engagement ("Get Involved")

* **6.1-6.3** Volunteer Opportunities: Patient Support, Event, Awareness & Outreach.
* **6.4** Online Volunteer Application Form.
* **6.5-6.6** Corporate Affiliations: Brand Partnership page + CSR guidance page.
* **6.7** Fundraising Empowerment: "Start Your Own Fundraiser" tool.
* **6.8** Fundraising Toolkit: Downloadable logos, social guides.
* **6.9-6.10** Other Giving: In-kind (goods/services), Legacy giving (wills).

### 7. Zakat Calculation Function

* **7.1** Built-in Zakat Calculator.
* **7.2** Inputs: Savings, Assets (Gold/Property), Liabilities.
* **7.3** Logic: Automatic calculation based on current Nisab values.

---

## 3. Detailed Site Structure & Module Specifications

This section maps the Information Architecture to specific backend/frontend requirements.

### 1. Landing Page

* **Type:** Static structure / Dynamic content hooks.
* **Content:** Hero slider, Impact metrics, Generalized content, Campaign banners.

### 2. Our Work

* **Type:** Dynamic (CMS).
* **Modules:** Blogging engine for Initiatives (Awareness, Holistic Care, Mental Wellness).
* **Admin:** CRUD operations for blog posts.

### 3. Patient Stories

* **Type:** Dynamic (CMS).
* **Modules:** "Our Warriors" blog, Patient Testimonials, Caregiver Stories.
* **Features:** Multimedia embedding (YouTube/Vimeo).

### 4. Get Involved

* **Modules:**
  * **Volunteer:** Role listings + Application Form (Data collection).
  * **Fundraising:** P2P Campaign creation tool + Toolkit download.
  * **Legacy/In-Kind:** Informational static pages.

### 5. Patient Profiles

* **Type:** Dynamic Database.
* **Features:** Searchable categories, Individual profile pages.
* **Purpose:** To facilitate the "Adopt a Patient" flow.

### 6. Donation Form (Global)

* **Modes:**
  * **Anonymous:** One-time donation without login.
  * **Subscriber:** Login to track history and subscribe to monthly updates.

### 7. About Us

* **Type:** Static.
* **Content:** Organization history, mission, vision.

### 8. Our Team

* **Type:** Static/Semi-Dynamic.
* **Content:** Leadership bios, Trustee profiles.

### 9, 10, 11. Legal & Policies

* **Pages:** Privacy Policy, Terms of Use, Donation Refund Policy.
* **Type:** Static text.

### 12. Brand Partnership Module

* **Frontend:** Application Form.
* **Workflow:**
    1. Brand submits form.
    2. Admin accepts and generates credentials (email/password).
    3. **Brand Dashboard:** Partner logs in to view impact.
    4. **Public Display:** Brand logo and total donation amount shown on "Partners" page.

### 13. Adopt a Patient Module

* **Workflow:**
    1. User views Patient Profile.
    2. Selects "Adopt".
    3. Commitment sets up recurring donation.
    4. **Update Loop:** Adopter receives medical document updates and living condition reports (Admin uploaded).

### 14. Donate (Transaction Hub)

* Integrations: bKash, Nagad, Bank APIs, PayPal.
* Options: One-time, Monthly, Custom Amount.

### 15. Join a Campaign

* **Feature:** User-generated campaign submission.
* **Workflow:** Form Submission -> Admin Review (Documents) -> Accept/Reject -> Campaign Page Creation.

### 16. Contact Us

* **Location:** Footer / Dedicated Page.
* **Features:** Contact form, Map, Helpline number.

### 17. System & Utility Pages (Maintenance & Auth)

These pages ensure a robust user experience during edge cases and authentication flows.

* **Authentication & Accounts:**
  * **Login / Sign In:** Centralized login for Donors, Volunteers, Partners, and Admins (with role detection).
  * **Registration:** New account creation for Donors (Social Login + Email/Password).
  * **Forgot Password:** Input for email to trigger reset link.
  * **Reset Password:** Secure page to enter new password.
  * **Email Verification:** Landing page for confirmation clicks.

* **System Status & Maintenance:**
  * **404 Not Found:** Custom branded page (e.g., "This page is missing, but our fight against cancer isn't") with helpful links.
  * **500 Internal Server Error:** Friendly error message with "Report Issue" button.
* **Authentication & Accounts:**
  * **Login / Sign In:** Centralized login for Donors, Volunteers, Partners, and Admins (with role detection).
  * **Registration:** New account creation for Donors (Social Login + Email/Password).
  * **Forgot Password:** Input for email to trigger reset link.
  * **Reset Password:** Secure page to enter new password.
  * **Email Verification:** Landing page for confirmation clicks.

* **System Status & Maintenance:**
  * **404 Not Found:** Custom branded page (e.g., "This page is missing, but our fight against cancer isn't") with helpful links.
  * **500 Internal Server Error:** Friendly error message with "Report Issue" button.
  * **403 Access Denied:** Unauthorized access notice (for non-admins trying to access admin routes).
  * **Site Maintenance Mode:** "We are upgrading our platform" message (Used during deployments).
  * **Under Construction / Coming Soon:** Placeholder for features in Phase 2 (if applicable).

### 18. Alok Nibash (Signature Project)

* **Type:** Information & Service Page.
* **Content:** Details on the "Home for Terminally Ill".
* **Features:**
  * Photo/Video Gallery of the facility.
  * Services provided (Palliative care, accommodation).
  * **Admission Info:** Guidelines and contact for patient admission.
  * **Direct Support:** "Sponsor a Room" or "Donate to Alok Nibash" CTA.

### 19. Maa Bachao, Bachao Desh (Signature Campaign)

* **Type:** Dedicated Campaign Page.
* **Content:** Focus on maternal cancer support.
* **Features:**
  * Impact Statistics (Mothers saved).
  * Video Documentary Series.
  * **Urgent Needs:** Live ticker of required funds for specific treatments.
  * **Donation:** Direct gateway to this specific fund.

### 20. BANCAT DURBAR (Community Event)

* **Type:** Event & Community Hub.
* **Content:** Highlights of the "Durbar" gatherings.
* **Features:**
  * Event Calendar (Upcoming Durbars).
  * Past Event Archive (Gallery/Videos).
  * **Registration:** RSVP or "Join the Durbar" form.

### 21. Cancer Warriors of Bangladesh & Warriors Club

* **Type:** Community Portal (Partially Restricted).
* **Content:** A network for survivors and fighters.
* **Features:**
  * **Public:** Mission of the club, Success stories.
  * **Member Area:** Exclusive event invites, support group schedules.
  * **Membership:** "Join the Club" application form.

### 22. Our Trustees & Ambassadors

* **Type:** Leadership Showcase.
* **Content:** High-profile individuals backing BANCAT.
* **Features:**
  * **Trustees:** Professional bios, photos, Message from the Board.
  * **Ambassadors:** Celebrity/Influencer profiles, video appeals.
  * **Invite:** "Become an Ambassador" inquiry form.

---

## 4. User Personas (Context)

| Persona | Role | Key Goal |
| :--- | :--- | :--- |
| **The Compassionate Donor** | Professional/Expat | Quick, transparent giving; Zakat compliance. |
| **The Cancer Warrior** | Patient | Finding financial aid and emotional support. |
| **The Change-Maker** | Volunteer | Easy application and meaningful engagement opportunities. |
| **The Corporate Partner** | CSR Manager | Visibility for brand impact and seamless reporting. |
| **The Administrator** | BANCAT Staff | Efficient content and user management (No technical bottlenecks). |
