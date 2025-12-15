<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ImpactMetric;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ImpactMetricController extends Controller
{
    public function index(Request $request)
    {
        $query = ImpactMetric::query();

        // Admin sees all, public sees visible
        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('is_visible', true);
        }

        return $query->orderBy('order', 'asc')->get();
    }

    public function show($id)
    {
        return ImpactMetric::findOrFail($id);
    }

    // Admin Methods

    public function store(Request $request)
    {
        $data = $request->validate([
            'label_en' => 'required|string',
            'label_bn' => 'nullable|string',
            'value' => 'required|integer',
            'icon' => 'nullable|string',
            'order' => 'integer',
            'is_visible' => 'boolean',
            'metric_key' => 'nullable|string|unique:impact_metrics,metric_key',
        ]);

        if (empty($data['metric_key'])) {
            $data['metric_key'] = Str::slug($data['label_en']);
             // ensure uniqueness if generated
            $count = ImpactMetric::where('metric_key', $data['metric_key'])->count();
            if ($count > 0) {
                 $data['metric_key'] .= '-' . Str::random(4);
            }
        }

        $metric = ImpactMetric::create($data);

        return response()->json($metric, 201);
    }

    public function update(Request $request, $id)
    {
        $metric = ImpactMetric::findOrFail($id);

        $data = $request->validate([
            'label_en' => 'sometimes|string',
            'label_bn' => 'nullable|string',
            'value' => 'sometimes|integer',
            'icon' => 'nullable|string',
            'order' => 'integer',
            'is_visible' => 'boolean',
            'metric_key' => 'nullable|string|unique:impact_metrics,metric_key,' . $id,
        ]);

        $metric->update($data);

        return response()->json($metric);
    }

    public function destroy($id)
    {
        $metric = ImpactMetric::findOrFail($id);
        $metric->delete();

        return response()->json(['message' => 'Metric deleted successfully']);
    }
}
