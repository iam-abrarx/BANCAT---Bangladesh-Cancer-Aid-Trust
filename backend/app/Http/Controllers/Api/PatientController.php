<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query()->where('is_active', true);

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name_en', 'like', "%{$search}%")
                  ->orWhere('name_bn', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
            });
        }

        if ($request->has('cancer_type') && $request->cancer_type) {
            $query->where('cancer_type', $request->cancer_type);
        }

        if ($request->has('district') && $request->district) {
            $query->where('location', 'like', "%{$request->district}%");
        }

        // Sorting
        $sort = $request->get('sort', 'newest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'goal_high':
                $query->orderBy('treatment_cost_required', 'desc');
                break;
            case 'goal_low':
                $query->orderBy('treatment_cost_required', 'asc');
                break;
            case 'raised_high':
                $query->orderBy('treatment_cost_raised', 'desc');
                break;
            case 'urgent':
                // rudimentary urgency: high percentage raised means close to goal? 
                // Or maybe low raised amount but high goal? 
                // For now, let's say urgency is recent + high goal.
                // Lets just use created_at desc for now as default.
                $query->orderBy('created_at', 'desc');
                break;
            default: // newest
                $query->orderBy('created_at', 'desc');
        }

        $patients = $query->paginate(12);

        return response()->json($patients);
    }

    public function show($code)
    {
        $patient = Patient::with('updates')->where('code', $code)->firstOrFail();
        return response()->json($patient);
    }

    /**
     * Show the specified patient for Admin (by ID).
     */
    public function showAdmin($id)
    {
        $patient = Patient::findOrFail($id);
        return response()->json($patient);
    }

    /**
     * Store a newly created patient (Admin only).
     */
    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Store Patient Request:', $request->all());
        \Illuminate\Support\Facades\Log::info('Has File photo:', [$request->hasFile('photo')]);

        $data = $request->validate([
            'name_en' => 'required|string',
            'name_bn' => 'nullable|string',
            'code' => 'required|string|unique:patients',
            'age' => 'required|integer',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'donor_name' => 'nullable|string',
            'location' => 'required|string',
            'gender' => 'required|in:male,female,other',
            'cancer_type' => 'required|string',
            'diagnosis_date' => 'nullable|date',
            'medical_summary_en' => 'required|string',
            'medical_summary_bn' => 'nullable|string',
            'treatment_cost_required' => 'required|numeric',
            'fund_raised' => 'nullable|numeric',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'photo' => 'nullable', // Allow file or string
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('patients', 'public');
            $data['photo'] = '/storage/' . $path;
            \Illuminate\Support\Facades\Log::info('Photo stored at: ' . $data['photo']);
        } else {
            // Explicitly set to null if no valid file found, to avoid array/object issues
            $data['photo'] = null;
        }

        // Handle boolean conversion if form-data sends strings
        $data['is_active'] = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);
        $data['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);

        \Illuminate\Support\Facades\Log::info('Create Data:', $data);

        $patient = Patient::create($data);

        return response()->json($patient, 201);
    }

    /**
     * Update the specified patient (Admin only).
     */
    public function update(Request $request, $id)
    {
        \Illuminate\Support\Facades\Log::info('Update Patient Request:', $request->all());
        \Illuminate\Support\Facades\Log::info('Has File photo:', [$request->hasFile('photo')]);

        $patient = Patient::findOrFail($id);

        $data = $request->validate([
            'name_en' => 'sometimes|string',
            'name_bn' => 'nullable|string',
            'age' => 'sometimes|integer',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'donor_name' => 'nullable|string',
            'location' => 'sometimes|string',
            'location' => 'sometimes|string',
            'gender' => 'sometimes|in:male,female,other',
            'cancer_type' => 'sometimes|string',
            'diagnosis_date' => 'nullable|date',
            'medical_summary_en' => 'sometimes|string',
            'medical_summary_bn' => 'nullable|string',
            'treatment_cost_required' => 'sometimes|numeric',
            'fund_raised' => 'nullable|numeric',
            'is_active' => 'sometimes',
            'is_featured' => 'sometimes',
            'photo' => 'nullable',
            'status' => 'sometimes|string',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('patients', 'public');
            $data['photo'] = '/storage/' . $path;
            \Illuminate\Support\Facades\Log::info('Photo stored at: ' . $data['photo']);
        } else {
            // If updating and no new file, we usually keep the old one.
            // But validation rule 'photo' => 'nullable' might include 'photo' => null in $data if sent?
            // If 'photo' is not in request, validate won't include it.
            // If it IS in request as null/empty, we should respect that or ignore?
            // Usually for update, if no file, we unset it to keep old value.
            if (array_key_exists('photo', $data) && $data['photo'] === null) {
                 // Logic: If explicitly null, remove photo? Or ignore?
                 // For now, let's keep it simple: if no file, don't update photo column unless keys exist
                 unset($data['photo']);
            }
            // If unexpected array, force unset
            if (isset($data['photo']) && !is_string($data['photo'])) {
                unset($data['photo']);
            }
        }

        // Handle boolean conversion
        if ($request->has('is_active')) {
            $data['is_active'] = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }
        if ($request->has('is_featured')) {
            $data['is_featured'] = filter_var($request->input('is_featured'), FILTER_VALIDATE_BOOLEAN);
        }

        $patient->update($data);

        return response()->json($patient);
    }

    /**
     * Remove the specified patient (Admin only).
     */
    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);
        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully']);
    }
}
