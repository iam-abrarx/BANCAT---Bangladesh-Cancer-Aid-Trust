<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DonationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\DonationReceipt;

use App\Models\Donation;

class DonationController extends Controller
{
    protected $donationService;

    public function __construct(DonationService $donationService)
    {
        $this->donationService = $donationService;
    }

    // Admin: List all donations
    public function index(Request $request)
    {
        $query = Donation::with(['donor', 'campaign', 'program', 'patient']);

        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('transaction_id', 'like', "%{$search}%")
                  ->orWhereHas('donor', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                  });
        }

        return $query->orderBy('created_at', 'desc')->paginate(15);
    }

    public function initiate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:10',
            'payment_method' => 'required|string',
            'patient_id' => 'required_without_all:campaign_id,program_id|exists:patients,id',
            'campaign_id' => 'required_without_all:patient_id,program_id|exists:campaigns,id',
            'program_id' => 'required_without_all:patient_id,campaign_id|exists:programs,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();
        // Add auth user if logged in
        if ($request->user()) {
            $data['donor_id'] = $request->user()->id;
        }

        $result = $this->donationService->initiateDonation($data);

        return response()->json($result);
    }

    public function callback(Request $request)
    {
        // For mock, we might receive trxID via query param
        $transactionId = $request->input('transaction_id') ?? $request->input('trxID');

        if (!$transactionId) {
            return response()->json(['error' => 'Transaction ID missing'], 400);
        }

        $donation = $this->donationService->verifyAndComplete($transactionId);

        // Send Receipt Email
        try {
            if ($donation->donor_id && $donation->donor && $donation->donor->email) {
                 Mail::to($donation->donor->email)->send(new DonationReceipt($donation));
            } else if (isset($donation->donor_email)) {
                 Mail::to($donation->donor_email)->send(new DonationReceipt($donation));
            }
        } catch (\Exception $e) {
            Log::error('Failed to send donation receipt: ' . $e->getMessage());
        }

        // Redirect to Frontend Success Page
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
        return redirect("$frontendUrl/donation/success?trxId=$transactionId");
    }

    public function approve(Request $request, $id)
    {
        try {
            $donation = $this->donationService->approveDonation($id);
            return response()->json(['message' => 'Donation approved successfully', 'donation' => $donation]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
