# BANcat — Technical Approach & Architecture

## Project Overview
A comprehensive cancer awareness and patient support platform for Bangladesh National Cancer Awareness Team, built with modern web technologies to support multilingual content, donation management, and patient advocacy.

---

## Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup validation
- **HTTP Client**: Axios
- **Internationalization**: react-i18next
- **Build Tool**: Vite

### Backend
- **Framework**: Laravel 10+ (PHP 8.2+)
- **API Architecture**: RESTful API
- **Authentication**: Laravel Sanctum (SPA authentication)
- **Authorization**: Laravel Policies & Gates
- **Payment Integration**: Custom payment gateway adapters (bKash, Nagad, Rocket, Stripe, PayPal)
- **File Storage**: Laravel Storage (S3-compatible)
- **Queue System**: Laravel Queue (Redis/Database driver)
- **Email**: Laravel Mail with queue support

### Database
- **Primary Database**: PostgreSQL 15+
- **Cache Layer**: Redis
- **Search**: PostgreSQL Full-Text Search
- **Migration System**: Laravel Migrations
- **Seeding**: Laravel Seeders & Factories

### DevOps & Infrastructure
- **Version Control**: Git
- **API Documentation**: Laravel Scribe
- **Testing**: PHPUnit (Backend), Vitest + React Testing Library (Frontend)
- **Containerization**: Docker (optional)
- **CI/CD**: GitHub Actions (recommended)

---

## Database Schema Design

### Core Tables

#### 1. Users & Authentication
```sql
-- users table
id: bigint PRIMARY KEY
name: varchar(255)
email: varchar(255) UNIQUE
phone: varchar(20) NULLABLE
password: varchar(255)
role: enum('admin', 'volunteer', 'donor', 'patient', 'partner')
is_active: boolean DEFAULT true
preferred_language: char(2) DEFAULT 'bn' -- 'bn' or 'en'
created_at: timestamp
updated_at: timestamp

-- user_profiles table
id: bigint PRIMARY KEY
user_id: bigint FOREIGN KEY → users.id
avatar: varchar(255) NULLABLE
bio: text NULLABLE
address: text NULLABLE
city: varchar(100)
country: varchar(100) DEFAULT 'Bangladesh'
created_at: timestamp
updated_at: timestamp
```

#### 2. Patients
```sql
-- patients table
id: bigint PRIMARY KEY
code: varchar(50) UNIQUE -- e.g., "PAT-2024-001"
name_en: varchar(255)
name_bn: varchar(255)
photo: varchar(255)
age: integer
gender: enum('male', 'female', 'other')
cancer_type: varchar(100)
diagnosis_date: date
location: varchar(255)
medical_summary_en: text
medical_summary_bn: text
treatment_cost_required: decimal(12,2)
treatment_cost_raised: decimal(12,2) DEFAULT 0
is_active: boolean DEFAULT true
is_featured: boolean DEFAULT false
status: enum('active', 'completed', 'archived')
created_at: timestamp
updated_at: timestamp

-- patient_updates table (treatment progress)
id: bigint PRIMARY KEY
patient_id: bigint FOREIGN KEY → patients.id
title_en: varchar(255)
title_bn: varchar(255)
content_en: text
content_bn: text
photo: varchar(255) NULLABLE
update_date: date
created_at: timestamp
updated_at: timestamp
```

#### 3. Stories (Warriors)
```sql
-- stories table
id: bigint PRIMARY KEY
slug: varchar(255) UNIQUE
type: enum('survivor', 'caregiver', 'volunteer')
subject_name_en: varchar(255)
subject_name_bn: varchar(255)
title_en: varchar(255)
title_bn: varchar(255)
excerpt_en: text
excerpt_bn: text
content_en: text
content_bn: text
featured_image: varchar(255)
video_url: varchar(255) NULLABLE
is_published: boolean DEFAULT false
is_featured: boolean DEFAULT false
published_at: timestamp NULLABLE
view_count: integer DEFAULT 0
created_at: timestamp
updated_at: timestamp

-- story_media table (gallery)
id: bigint PRIMARY KEY
story_id: bigint FOREIGN KEY → stories.id
media_type: enum('image', 'video')
media_url: varchar(255)
caption_en: varchar(255) NULLABLE
caption_bn: varchar(255) NULLABLE
order: integer DEFAULT 0
created_at: timestamp
```

#### 4. Donations
```sql
-- donations table
id: bigint PRIMARY KEY
transaction_id: varchar(100) UNIQUE
user_id: bigint NULLABLE FOREIGN KEY → users.id
donor_name: varchar(255)
donor_email: varchar(255)
donor_phone: varchar(20)
amount: decimal(10,2)
currency: char(3) DEFAULT 'BDT'
donation_type: enum('one_time', 'monthly', 'adopt_patient')
category: enum('general', 'campaign', 'patient', 'emergency')
patient_id: bigint NULLABLE FOREIGN KEY → patients.id
campaign_id: bigint NULLABLE FOREIGN KEY → campaigns.id
payment_method: enum('bkash', 'nagad', 'rocket', 'card', 'paypal')
payment_status: enum('pending', 'completed', 'failed', 'refunded')
is_anonymous: boolean DEFAULT false
message: text NULLABLE
payment_gateway_response: jsonb NULLABLE
created_at: timestamp
updated_at: timestamp

-- recurring_donations table
id: bigint PRIMARY KEY
donation_id: bigint FOREIGN KEY → donations.id
frequency: enum('monthly', 'quarterly', 'yearly')
start_date: date
end_date: date NULLABLE
next_billing_date: date
is_active: boolean DEFAULT true
created_at: timestamp
updated_at: timestamp
```

#### 5. Campaigns
```sql
-- campaigns table
id: bigint PRIMARY KEY
slug: varchar(255) UNIQUE
name_en: varchar(255)
name_bn: varchar(255)
description_en: text
description_bn: text
banner_image: varchar(255)
goal_amount: decimal(12,2)
raised_amount: decimal(12,2) DEFAULT 0
start_date: date
end_date: date NULLABLE
is_active: boolean DEFAULT true
is_featured: boolean DEFAULT false
created_at: timestamp
updated_at: timestamp
```

#### 6. Programs (Our Work)
```sql
-- programs table
id: bigint PRIMARY KEY
slug: varchar(255) UNIQUE
name_en: varchar(255)
name_bn: varchar(255)
tagline_en: varchar(255)
tagline_bn: varchar(255)
description_en: text
description_bn: text
icon: varchar(255)
banner_image: varchar(255)
impact_metrics: jsonb -- {"lives_touched": 5000, "sessions_supported": 1200}
is_active: boolean DEFAULT true
order: integer DEFAULT 0
created_at: timestamp
updated_at: timestamp
```

#### 7. Volunteers
```sql
-- volunteer_applications table
id: bigint PRIMARY KEY
user_id: bigint NULLABLE FOREIGN KEY → users.id
name: varchar(255)
email: varchar(255)
phone: varchar(20)
occupation: varchar(100)
skills: text
availability: varchar(255)
message: text
status: enum('pending', 'approved', 'rejected')
reviewed_at: timestamp NULLABLE
reviewed_by: bigint NULLABLE FOREIGN KEY → users.id
created_at: timestamp
updated_at: timestamp
```

#### 8. Team Members
```sql
-- team_members table
id: bigint PRIMARY KEY
name_en: varchar(255)
name_bn: varchar(255)
role_en: varchar(100)
role_bn: varchar(100)
category: enum('leadership', 'medical_advisor', 'coordinator', 'trustee', 'ambassador')
photo: varchar(255)
bio_en: text
bio_bn: text
email: varchar(255) NULLABLE
linkedin: varchar(255) NULLABLE
order: integer DEFAULT 0
is_active: boolean DEFAULT true
created_at: timestamp
updated_at: timestamp
```

#### 9. Content Pages
```sql
-- pages table
id: bigint PRIMARY KEY
slug: varchar(255) UNIQUE
title_en: varchar(255)
title_bn: varchar(255)
content_en: text
content_bn: text
meta_title_en: varchar(255) NULLABLE
meta_title_bn: varchar(255) NULLABLE
meta_description_en: text NULLABLE
meta_description_bn: text NULLABLE
is_published: boolean DEFAULT true
created_at: timestamp
updated_at: timestamp
```

#### 10. Impact Metrics (Dashboard)
```sql
-- impact_metrics table
id: bigint PRIMARY KEY
metric_key: varchar(100) UNIQUE -- e.g., 'lives_touched', 'chemo_sessions'
label_en: varchar(255)
label_bn: varchar(255)
value: bigint
icon: varchar(255) NULLABLE
order: integer DEFAULT 0
is_visible: boolean DEFAULT true
updated_at: timestamp
```

### Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_patients_status ON patients(status, is_active);
CREATE INDEX idx_patients_featured ON patients(is_featured) WHERE is_featured = true;
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_donations_user ON donations(user_id);
CREATE INDEX idx_donations_patient ON donations(patient_id);
CREATE INDEX idx_stories_published ON stories(is_published, published_at);
CREATE INDEX idx_stories_slug ON stories(slug);
CREATE INDEX idx_campaigns_active ON campaigns(is_active, start_date, end_date);

-- Full-text search indexes
CREATE INDEX idx_patients_search ON patients USING GIN(
  to_tsvector('english', name_en || ' ' || medical_summary_en)
);
CREATE INDEX idx_stories_search ON stories USING GIN(
  to_tsvector('english', title_en || ' ' || content_en)
);
```

---

## Landing Page Structure

### Concise Section Breakdown

```
┌─────────────────────────────────────────────┐
│  1. HERO SECTION                            │
│  - Full-screen emotional hero               │
│  - Headline + Subtext (multilingual)        │
│  - Primary CTA: "Donate Now"                │
│  - Secondary CTA: "Our Stories"             │
│  - Background: Video/Image slideshow        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  2. IMPACT METRICS BAR                      │
│  - 3-4 key metrics in cards                 │
│  - Animated counters                        │
│  - Icons + Numbers + Labels                 │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  3. FEATURED PATIENT CAROUSEL               │
│  - 3-5 active patients                      │
│  - Patient photo + name + diagnosis         │
│  - Progress bar (funds raised)              │
│  - Quick "Support Now" button               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  4. OUR PROGRAMS (3-COLUMN GRID)            │
│  - Awareness | Holistic Care | Mental       │
│  - Icon + Title + Short description         │
│  - "Learn More" link to Programs page       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  5. FEATURED STORIES SECTION                │
│  - 2-3 story cards (grid)                   │
│  - Thumbnail + Title + Excerpt              │
│  - "Read All Stories" CTA                   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  6. ACTIVE CAMPAIGNS BANNER                 │
│  - Horizontal scroll/carousel               │
│  - Campaign cards with goals & progress     │
│  - "Join Campaign" buttons                  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  7. QUICK DONATION SECTION                  │
│  - Preset amounts: ৳500, ৳1000, ৳2000       │
│  - Custom amount input                      │
│  - "Give Monthly" toggle                    │
│  - Secure payment badges                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  8. GET INVOLVED CTA SECTION                │
│  - 3 cards: Volunteer | Partner | Fundraise │
│  - Icon + Title + Description + CTA button  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  9. FOOTER                                  │
│  - Multi-column layout                      │
│  - Quick links, Social, Contact, Newsletter │
└─────────────────────────────────────────────┘
```

---

## Navigation & Page Structure

### Mega Menu Design

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Language Toggle | Mega Menu | Donate Button      │
└──────────────────────────────────────────────────────────────────┘

MEGA MENU STRUCTURE:

┌─────────────────────────────────────────────────────────────────┐
│  ABOUT                                                          │
│  ├─ Our Mission & Vision                                        │
│  ├─ Our Story                                                   │
│  ├─ Our Team                                                    │
│  │  ├─ Leadership                                               │
│  │  ├─ Medical Advisors                                         │
│  │  └─ Trustees & Ambassadors                                   │
│  └─ Annual Reports                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  OUR WORK                                                       │
│  ├─ Programs                                                    │
│  │  ├─ Nationwide Cancer Awareness                             │
│  │  ├─ Holistic Care Support                                   │
│  │  └─ Mental Wellness Programs                                │
│  ├─ Campaigns                                                   │
│  │  ├─ Alok Nibash                                             │
│  │  ├─ Maa Bachao, Bachao Desh                                 │
│  │  └─ BANcat Durbar                                           │
│  └─ Impact Stories                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SUPPORT US                                                     │
│  ├─ Donate Now                                                  │
│  │  ├─ General Fund                                             │
│  │  ├─ Campaign Donation                                        │
│  │  ├─ Adopt a Patient                                          │
│  │  └─ Emergency Fund                                           │
│  ├─ Get Involved                                                │
│  │  ├─ Volunteer                                                │
│  │  ├─ Start a Fundraiser                                       │
│  │  ├─ Corporate Partnership                                    │
│  │  └─ In-Kind Donations                                        │
│  └─ Legacy Giving                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PATIENTS & STORIES                                             │
│  ├─ Cancer Warriors (All Stories)                               │
│  ├─ Patient Profiles (Search & Browse)                          │
│  ├─ Survivor Stories                                            │
│  └─ Caregiver Voices                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  RESOURCES                                                      │
│  ├─ Cancer Information                                          │
│  ├─ Support Services                                            │
│  ├─ Fundraising Toolkit                                         │
│  └─ FAQ                                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CONTACT                                                        │
│  ├─ Contact Us                                                  │
│  ├─ Office Locations                                            │
│  └─ Media Inquiries                                             │
└─────────────────────────────────────────────────────────────────┘
```

### Page Hierarchy

**Shallow Pages** (Direct access from menu):
- Home
- About Us
- Programs Overview
- All Stories
- Donate
- Contact

**Deep Pages** (Accessed through mega menu or content):
- Individual Patient Profile
- Individual Story Detail
- Specific Campaign Page
- Team Member Details
- Volunteer Application
- Partnership Information
- Legal Pages (Privacy, Terms, Refund Policy)

---

## UI Design System (MUI-Based)

### Design Tokens

#### Color Palette
```javascript
// Primary Brand Colors
const theme = {
  palette: {
    primary: {
      main: '#1976D2',      // Blue - Trust & Stability
      light: '#42A5F5',
      dark: '#1565C0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00897B',      // Teal - Healing & Growth
      light: '#4DB6AC',
      dark: '#00695C',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#43A047',      // Green - Progress
    },
    warning: {
      main: '#FB8C00',      // Orange - Urgency
    },
    error: {
      main: '#E53935',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
};
```

#### Typography
```javascript
typography: {
  fontFamily: [
    'Poppins',           // English
    'Noto Sans Bengali', // Bangla
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  button: {
    textTransform: 'none', // Keep natural casing
    fontWeight: 600,
  },
}
```

#### Spacing System
```javascript
// 8px base unit
spacing: (factor) => `${8 * factor}px`

// Usage:
theme.spacing(1)  // 8px
theme.spacing(2)  // 16px
theme.spacing(3)  // 24px
```

#### Breakpoints
```javascript
breakpoints: {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}
```

### Component Library Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx              // Custom MUI Button wrapper
│   │   ├── Card.tsx                // Custom Card component
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── SEO.tsx                 // React Helmet wrapper
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── MobileDrawer.tsx
│   │
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ImpactMetrics.tsx
│   │   ├── FeaturedPatients.tsx
│   │   ├── ProgramsGrid.tsx
│   │   ├── StoriesSection.tsx
│   │   ├── CampaignBanner.tsx
│   │   ├── QuickDonation.tsx
│   │   └── GetInvolvedCTA.tsx
│   │
│   ├── patients/
│   │   ├── PatientCard.tsx
│   │   ├── PatientGrid.tsx
│   │   ├── PatientDetail.tsx
│   │   ├── PatientSearchFilters.tsx
│   │   └── ProgressBar.tsx
│   │
│   ├── stories/
│   │   ├── StoryCard.tsx
│   │   ├── StoryGrid.tsx
│   │   ├── StoryDetail.tsx
│   │   └── MediaGallery.tsx
│   │
│   ├── donations/
│   │   ├── DonationForm.tsx
│   │   ├── PaymentMethodSelector.tsx
│   │   ├── AmountSelector.tsx
│   │   ├── RecurringToggle.tsx
│   │   └── DonationConfirmation.tsx
│   │
│   └── forms/
│       ├── VolunteerForm.tsx
│       ├── ContactForm.tsx
│       └── PartnershipForm.tsx
```

### MUI Component Guidelines

#### 1. **Buttons**
```tsx
// Primary CTA
<Button variant="contained" color="primary" size="large">
  Donate Now
</Button>

// Secondary action
<Button variant="outlined" color="secondary">
  Learn More
</Button>

// Text link
<Button variant="text" color="primary">
  Read Story
</Button>
```

#### 2. **Cards**
```tsx
<Card elevation={2} sx={{ borderRadius: 2 }}>
  <CardMedia component="img" height="200" image={patientPhoto} />
  <CardContent>
    <Typography variant="h6" gutterBottom>
      {patientName}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {diagnosis}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small" color="primary">Support</Button>
  </CardActions>
</Card>
```

#### 3. **Grid Layout**
```tsx
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Card content */}
  </Grid>
</Grid>
```

#### 4. **Form Fields**
```tsx
<TextField
  fullWidth
  label="Your Name"
  variant="outlined"
  required
  {...register('name')}
  error={!!errors.name}
  helperText={errors.name?.message}
/>
```

---

## Backend Architecture (Laravel)

### Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── API/
│   │   │   │   ├── PatientController.php
│   │   │   │   ├── DonationController.php
│   │   │   │   ├── StoryController.php
│   │   │   │   ├── CampaignController.php
│   │   │   │   ├── ProgramController.php
│   │   │   │   ├── VolunteerController.php
│   │   │   │   ├── AuthController.php
│   │   │   │   └── PaymentController.php
│   │   │   └── Middleware/
│   │   │       ├── LocalizationMiddleware.php
│   │   │       └── CheckRole.php
│   │   └── Requests/
│   │       ├── DonationRequest.php
│   │       ├── VolunteerRequest.php
│   │       └── PatientRequest.php
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Patient.php
│   │   ├── Donation.php
│   │   ├── Story.php
│   │   ├── Campaign.php
│   │   ├── Program.php
│   │   └── Volunteer.php
│   │
│   ├── Services/
│   │   ├── PaymentGateway/
│   │   │   ├── PaymentGatewayInterface.php
│   │   │   ├── BkashGateway.php
│   │   │   ├── NagadGateway.php
│   │   │   ├── RocketGateway.php
│   │   │   └── StripeGateway.php
│   │   ├── DonationService.php
│   │   ├── PatientService.php
│   │   └── EmailService.php
│   │
│   ├── Observers/
│   │   └── DonationObserver.php  // Update patient raised amounts
│   │
│   └── Policies/
│       ├── PatientPolicy.php
│       └── StoryPolicy.php
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
│
├── routes/
│   ├── api.php              // API routes
│   └── web.php
│
├── config/
│   ├── cors.php
│   └── payment.php          // Payment gateway configs
│
└── tests/
    ├── Feature/
    └── Unit/
```

### API Route Structure

```php
// routes/api.php

// Public routes
Route::prefix('v1')->group(function () {
    
    // Home & Landing
    Route::get('/home-data', [HomeController::class, 'index']);
    Route::get('/impact-metrics', [MetricController::class, 'index']);
    
    // Patients
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{code}', [PatientController::class, 'show']);
    Route::get('/patients/{code}/updates', [PatientController::class, 'updates']);
    
    // Stories
    Route::get('/stories', [StoryController::class, 'index']);
    Route::get('/stories/{slug}', [StoryController::class, 'show']);
    
    // Programs
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/{slug}', [ProgramController::class, 'show']);
    
    // Campaigns
    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::get('/campaigns/{slug}', [CampaignController::class, 'show']);
    
    // Donations
    Route::post('/donations', [DonationController::class, 'store']);
    Route::post('/donations/verify', [PaymentController::class, 'verify']);
    
    // Volunteers
    Route::post('/volunteer-applications', [VolunteerController::class, 'store']);
    
    // Contact
    Route::post('/contact', [ContactController::class, 'store']);
    
    // Pages
    Route::get('/pages/{slug}', [PageController::class, 'show']);
});

// Protected routes (Admin/Staff)
Route::middleware(['auth:sanctum'])->prefix('v1/admin')->group(function () {
    
    // Patient management
    Route::apiResource('patients', Admin\PatientController::class);
    Route::post('patients/{id}/updates', [Admin\PatientController::class, 'addUpdate']);
    
    // Story management
    Route::apiResource('stories', Admin\StoryController::class);
    Route::post('stories/{id}/publish', [Admin\StoryController::class, 'publish']);
    
    // Donation records
    Route::get('donations', [Admin\DonationController::class, 'index']);
    Route::get('donations/{id}', [Admin\DonationController::class, 'show']);
    Route::post('donations/{id}/refund', [Admin\DonationController::class, 'refund']);
    
    // Volunteers
    Route::get('volunteer-applications', [Admin\VolunteerController::class, 'index']);
    Route::patch('volunteer-applications/{id}', [Admin\VolunteerController::class, 'review']);
    
    // Analytics
    Route::get('analytics/donations', [Admin\AnalyticsController::class, 'donations']);
    Route::get('analytics/impact', [Admin\AnalyticsController::class, 'impact']);
});
```

### API Response Structure

```php
// Success Response
{
  "success": true,
  "data": {
    // Resource data
  },
  "message": "Resource fetched successfully"
}

// Paginated Response
{
  "success": true,
  "data": [
    // Array of resources
  ],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 150,
    "last_page": 10
  },
  "links": {
    "first": "URL",
    "last": "URL",
    "prev": null,
    "next": "URL"
  }
}

// Error Response
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

### Key Services

#### 1. **DonationService.php**
```php
class DonationService
{
    public function processDonation(array $data): Donation
    {
        // 1. Create donation record
        // 2. Initialize payment gateway
        // 3. Process payment
        // 4. Update patient/campaign raised amounts
        // 5. Send confirmation email
        // 6. Return donation with payment URL
    }
    
    public function verifyPayment(string $transactionId): bool
    {
        // Verify payment with gateway
        // Update donation status
        // Trigger thank you email
    }
}
```

#### 2. **Payment Gateway Interface**
```php
interface PaymentGatewayInterface
{
    public function initiatePayment(Donation $donation): array;
    public function verifyPayment(string $transactionId): bool;
    public function refundPayment(string $transactionId): bool;
}
```

### Middleware & Localization

```php
// LocalizationMiddleware.php
public function handle($request, Closure $next)
{
    $locale = $request->header('Accept-Language', 'bn');
    $locale = in_array($locale, ['bn', 'en']) ? $locale : 'bn';
    
    app()->setLocale($locale);
    
    return $next($request);
}
```

### Database Optimization

1. **Eager Loading**: Prevent N+1 queries
```php
Patient::with(['updates', 'donations'])->get();
```

2. **Caching**: Cache frequently accessed data
```php
Cache::remember('impact_metrics', 3600, function () {
    return ImpactMetric::where('is_visible', true)
        ->orderBy('order')
        ->get();
});
```

3. **Query Scopes**: Reusable query filters
```php
// In Patient model
public function scopeActive($query)
{
    return $query->where('is_active', true);
}

public function scopeFeatured($query)
{
    return $query->where('is_featured', true);
}
```

---

## API Integration (Frontend)

### Axios Setup

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': localStorage.getItem('language') || 'bn',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default api;
```

### React Query Hooks

```typescript
// src/hooks/usePatients.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export const usePatients = (filters?: PatientFilters) => {
  return useQuery({
    queryKey: ['patients', filters],
    queryFn: async () => {
      const response = await api.get('/patients', { params: filters });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePatient = (code: string) => {
  return useQuery({
    queryKey: ['patient', code],
    queryFn: async () => {
      const response = await api.get(`/patients/${code}`);
      return response.data;
    },
    enabled: !!code,
  });
};
```

---

## Internationalization (i18n)

### Setup

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import bn from './locales/bn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
    },
    fallbackLng: 'bn',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### Usage

```tsx
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <Typography variant="h1">
      {t('hero.headline')}
    </Typography>
  );
}
```

---

## Development Workflow

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Laravel backend with PostgreSQL
- [ ] Create database migrations & seeders
- [ ] Set up React + Vite + MUI
- [ ] Implement i18n system
- [ ] Create basic API structure
- [ ] Design system & theme configuration

### Phase 2: Core Features (Week 3-5)
- [ ] Landing page components
- [ ] Patient listing & detail pages
- [ ] Story listing & detail pages
- [ ] Programs & campaigns pages
- [ ] Donation form (basic)

### Phase 3: Advanced Features (Week 6-8)
- [ ] Payment gateway integrations
- [ ] Volunteer application system
- [ ] Admin panel (CMS)
- [ ] Search & filters
- [ ] Email notifications

### Phase 4: Polish & Launch (Week 9-10)
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Testing (unit + integration)
- [ ] Accessibility audit
- [ ] Deployment & monitoring

---

## Deployment Architecture

```
┌─────────────────┐
│   CloudFlare    │ ← CDN & DNS
│   (Optional)    │
└────────┬────────┘
         │
┌────────▼────────┐
│   Nginx/Apache  │ ← Web Server
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│ React │ │ Laravel │ ← Application Layer
│ (SPA) │ │   API   │
└───────┘ └────┬────┘
              │
         ┌────▼────────┐
         │ PostgreSQL  │ ← Database
         └─────────────┘
              │
         ┌────▼────┐
         │  Redis  │ ← Cache & Queue
         └─────────┘
```

---

## Security Considerations

1. **API Security**
   - CORS configuration
   - Rate limiting
   - SQL injection prevention (Eloquent ORM)
   - XSS protection
   - CSRF tokens (Sanctum)

2. **Data Protection**
   - Encrypt sensitive data
   - PCI DSS compliance for payments
   - GDPR-compliant data handling
   - Regular backups

3. **Authentication**
   - Laravel Sanctum for SPA
   - Role-based access control
   - Email verification
   - Password hashing (bcrypt)

---

## Performance Optimization

1. **Frontend**
   - Code splitting (React.lazy)
   - Image optimization (WebP format)
   - Bundle size monitoring
   - Lazy loading components

2. **Backend**
   - Database query optimization
   - Redis caching
   - API response caching
   - Queue long-running tasks

3. **Infrastructure**
   - CDN for static assets
   - Database indexing
   - Gzip compression
   - HTTP/2 support

---

## Monitoring & Analytics

- **Application Monitoring**: Laravel Telescope (dev), Sentry (production)
- **Performance**: Google PageSpeed Insights
- **Analytics**: Google Analytics 4
- **Uptime**: UptimeRobot or Pingdom
- **Error Tracking**: Sentry

---

## Conclusion

This technical approach provides a scalable, maintainable, and modern foundation for the BANcat platform. The combination of React + MUI for the frontend and Laravel + PostgreSQL for the backend ensures a robust, performant, and developer-friendly system that can grow with the organization's needs.

**Key Strengths:**
- ✅ Clean separation of concerns
- ✅ Multilingual from day one
- ✅ Scalable architecture
- ✅ Modern tech stack
- ✅ Consistent UI/UX with MUI
- ✅ Secure payment processing
- ✅ SEO-friendly structure
- ✅ Admin-friendly CMS capabilities
