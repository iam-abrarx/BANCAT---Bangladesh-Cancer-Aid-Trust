<?php

use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\StoryController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\ImpactMetricController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\Authcontroller;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\VolunteerController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\PartnerApplicationController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\SettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    // Public user submission routes
    Route::post('/campaigns/submit', [CampaignController::class, 'submit']);
    
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{code}', [PatientController::class, 'show']);

    Route::get('/stories', [StoryController::class, 'index']);
    Route::get('/stories/{slug}', [StoryController::class, 'show']);

    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/{slug}', [ProgramController::class, 'show']);

    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::get('/campaigns/{slug}', [CampaignController::class, 'show']);

    Route::get('/pages/{slug}', [PageController::class, 'show']);

    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/galleries', [GalleryController::class, 'index']);
    Route::get('/galleries/{slug}', [GalleryController::class, 'show']);
    Route::get('/team-members', [TeamMemberController::class, 'index']);
    Route::get('/team-members/{id}', [TeamMemberController::class, 'show']);

    // Public SEO Settings (for frontend)
    Route::get('/settings/seo', [SettingsController::class, 'getSeoSettings']);
    Route::get('/settings/company', [SettingsController::class, 'getCompanySettings']);

    Route::post('/donations/initiate', [DonationController::class, 'initiate']);
    // Callback route for gateway redirect (using GET usually for redirects)
    // Callback route for gateway redirect (using GET usually for redirects, POST for IPN/Webhook)
    Route::match(['get', 'post'], '/donations/callback', [DonationController::class, 'callback'])->name('api.donations.callback');

    // Admin donations - temporarily public for debugging
    Route::get('/admin/donations', [DonationController::class, 'index']);
    Route::put('/admin/donations/{id}/approve', [DonationController::class, 'approve']);

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Volunteer Route
    Route::post('/volunteers/apply', [VolunteerController::class, 'store']);

    // Contact Routes
    Route::post('/contact', [ContactController::class, 'storeContact']);
    // Contact Routes
    Route::post('/contact', [ContactController::class, 'storeContact']);
    Route::post('/partnership', [PartnerApplicationController::class, 'store']); // Updated to use new controller

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Dashboard
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/dashboard/donations', [DashboardController::class, 'donations']);

        // Admin Routes
        Route::middleware('admin')->prefix('admin')->group(function () {
             Route::get('/stats', [DashboardController::class, 'adminStats']);

             // User Management
             Route::get('/users', [UserController::class, 'index']);
             Route::post('/users', [UserController::class, 'store']);
             Route::put('/users/{id}/role', [UserController::class, 'updateRole']);
              
             // Patient Management
             Route::get('/patients/{id}', [PatientController::class, 'showAdmin']);
             Route::post('/patients', [PatientController::class, 'store']);
             Route::put('/patients/{id}', [PatientController::class, 'update']);
             Route::delete('/patients/{id}', [PatientController::class, 'destroy']);

             // Story Management
             Route::get('/stories/{id}', [StoryController::class, 'showAdmin']);
             Route::post('/stories', [StoryController::class, 'store']);
             Route::put('/stories/{id}', [StoryController::class, 'update']);
             Route::delete('/stories/{id}', [StoryController::class, 'destroy']);

             // Volunteer Management
             Route::get('/volunteers', [VolunteerController::class, 'index']);
             Route::get('/volunteers/{id}', [VolunteerController::class, 'show']);
             Route::put('/volunteers/{id}', [VolunteerController::class, 'update']);
             Route::delete('/volunteers/{id}', [VolunteerController::class, 'destroy']);

             // Campaign Management
             Route::post('/campaigns', [CampaignController::class, 'store']);
             Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
             Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);

             // Program Management
             Route::get('/programs/{id}', [ProgramController::class, 'showAdmin']);
             Route::post('/programs', [ProgramController::class, 'store']);
             Route::put('/programs/{id}', [ProgramController::class, 'update']);
             Route::delete('/programs/{id}', [ProgramController::class, 'destroy']);

             // Team Member Management
             Route::get('/team-members', [TeamMemberController::class, 'index']);
             Route::post('/team-members', [TeamMemberController::class, 'store']);
             Route::get('/team-members/{id}', [TeamMemberController::class, 'show']);
             Route::put('/team-members/{id}', [TeamMemberController::class, 'update']);
             Route::delete('/team-members/{id}', [TeamMemberController::class, 'destroy']);

             // Impact Metrics Management
             Route::get('/impact-metrics', [ImpactMetricController::class, 'index']);
             Route::post('/impact-metrics', [ImpactMetricController::class, 'store']);
             Route::get('/impact-metrics/{id}', [ImpactMetricController::class, 'show']);
             Route::put('/impact-metrics/{id}', [ImpactMetricController::class, 'update']);
             Route::delete('/impact-metrics/{id}', [ImpactMetricController::class, 'destroy']);

             // Page Management
             Route::get('/pages', [PageController::class, 'index']);
             Route::post('/pages', [PageController::class, 'store']);
             Route::get('/pages/{id}', [PageController::class, 'showAdmin']);
             Route::put('/pages/{id}', [PageController::class, 'update']);
             Route::delete('/pages/{id}', [PageController::class, 'destroy']);

             // Partner Management
             Route::get('/partners', [PartnerApplicationController::class, 'index']);
             Route::put('/partners/{id}', [PartnerApplicationController::class, 'update']);
             Route::delete('/partners/{id}', [PartnerApplicationController::class, 'destroy']);
             Route::put('/partners/{id}/status', [PartnerApplicationController::class, 'updateStatus']);
             Route::put('/partners/{id}', [PartnerApplicationController::class, 'update']);
             Route::delete('/partners/{id}', [PartnerApplicationController::class, 'destroy']);
             Route::put('/partners/{id}/status', [PartnerApplicationController::class, 'updateStatus']);

             // Testimonial Management
             Route::post('/testimonials', [TestimonialController::class, 'store']);
             Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
             Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

             // Gallery Management
             /*
             Route::post('/galleries', [GalleryController::class, 'store']);
             Route::put('/galleries/{id}', [GalleryController::class, 'update']);
             Route::delete('/galleries/{id}', [GalleryController::class, 'destroy']);
             Route::post('/galleries/{id}/images', [GalleryController::class, 'addImages']);
             Route::delete('/galleries/{id}/images/{imageId}', [GalleryController::class, 'removeImage']);
             */

             // Donation Management (temporarily disabled - using public route for debugging)
             // Route::put('/donations/{id}/approve', [DonationController::class, 'approve']);

             // SEO Settings Management
             Route::put('/settings/seo', [SettingsController::class, 'updateSeoSettings']);
             Route::put('/settings/company', [SettingsController::class, 'updateCompanySettings']);
        });
    });

    // Temp Public Gallery Routes
    Route::post('/admin/galleries', [GalleryController::class, 'store']);
    Route::get('/admin/galleries', [GalleryController::class, 'index']); 
});
