<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\Partnership;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactNotification;

class ContactController extends Controller
{
    /**
     * Store a general contact inquiry.
     */
    public function storeContact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contact = Contact::create($request->all());

        try {
             // Send to Admin (hardcoded for now or use env)
             $adminEmail = env('MAIL_FROM_ADDRESS', 'admin@bancat.org');
             Mail::to($adminEmail)->send(new ContactNotification($contact));
        } catch (\Exception $e) {
            \Log::error('Failed to send contact notification: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Thank you for contacting us! We will get back to you shortly.',
            'data' => $contact
        ], 201);
    }

    /**
     * Store a partnership proposal.
     */
    public function storePartnership(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'organization_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'type' => 'nullable|string|max:100',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $partnership = Partnership::create($request->all());

        return response()->json([
            'message' => 'Thank you for your partnership proposal! Our team will review it and contact you soon.',
            'data' => $partnership
        ], 201);
    }
}
