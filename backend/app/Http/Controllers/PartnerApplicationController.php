<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PartnerApplication;
use Illuminate\Support\Facades\Validator;

class PartnerApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'org_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'type' => 'required|string',
            'message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $application = PartnerApplication::create($request->all());

        return response()->json([
            'message' => 'Application submitted successfully',
        ], 201);
    }

    public function index()
    {
        return response()->json(PartnerApplication::latest()->paginate(10));
    }

    public function update(Request $request, $id)
    {
        $application = PartnerApplication::findOrFail($id);
        $application->update($request->all());
        return response()->json($application);
    }

    public function destroy($id)
    {
        PartnerApplication::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    public function updateStatus(Request $request, $id)
    {
        $application = PartnerApplication::findOrFail($id);
        $request->validate(['status' => 'required|string']);
        $application->update(['status' => $request->status]);
        return response()->json($application);
    }
}
