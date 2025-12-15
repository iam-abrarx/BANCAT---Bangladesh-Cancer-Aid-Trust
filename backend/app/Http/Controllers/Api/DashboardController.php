<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Donation;

use App\Models\Patient;
use App\Models\Volunteer;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $user = $request->user();
        
        $totalDonated = Donation::where('email', $user->email)
            ->where('status', 'completed')
            ->sum('amount');
            
        $donationCount = Donation::where('email', $user->email)
            ->where('status', 'completed')
            ->count();
            
        // For now, impact is simple calculation or mock
        $impactCount = $donationCount; 

        return response()->json([
            'total_donated' => $totalDonated,
            'donation_count' => $donationCount,
            'impact_count' => $impactCount,
        ]);
    }

    public function adminStats(Request $request)
    {
        $totalDonated = Donation::where('status', 'completed')->sum('amount');
        $totalPatients = Patient::count();
        $totalCampaigns = \App\Models\Campaign::count();
        $totalPrograms = \App\Models\Program::count();

        // Top Campaigns
        $topCampaigns = \App\Models\Campaign::orderBy('raised_amount', 'desc')
            ->take(5)
            ->get(['id', 'name_en', 'raised_amount', 'goal_amount', 'status']);

        // Current Programs
        $currentPrograms = \App\Models\Program::where('is_active', true)
            ->take(5)
            ->get(['id', 'name_en', 'is_active']);

        // Donation Trends (Last 6 Months)
        $donationTrends = Donation::select(
            \Illuminate\Support\Facades\DB::raw('sum(amount) as total'),
            \Illuminate\Support\Facades\DB::raw("strftime('%Y-%m', created_at) as month")
        )
            ->where('status', 'completed')
            ->where('created_at', '>=', \Carbon\Carbon::now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'total_donated' => $totalDonated,
            'total_patients' => $totalPatients,
            'total_campaigns' => $totalCampaigns,
            'total_programs' => $totalPrograms,
            'top_campaigns' => $topCampaigns,
            'current_programs' => $currentPrograms,
            'donation_trends' => $donationTrends
        ]);
    }

    public function donations(Request $request)
    {
        $user = $request->user();

        $donations = Donation::where('email', $user->email)
            ->with(['patient:id,name_en,name_bn', 'campaign:id,name_en,name_bn'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($donations);
    }
}
