<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseCategoryResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\AdminCourseResource;
use App\Models\CourseCategory;
use App\Models\Media;
use App\Models\Subject;
use DB;
use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;

use Storage;
use Str;
use function Termwind\render;

class CourseController extends Controller
{
    /*
    FRONT
    */
    public function index()
    {
        $courses = Course::latest()->paginate(10)->onEachSide(1);
        return Inertia('front/pages/courses/Index', [ // Will be replaced
            // Wraps the data as a Laravel data resource, applying to all items with collection
            'courses' => CourseResource::collection($courses)
        ]);
    }

    public function ctesp()
    {
        $courses = Course::latest()->paginate(10)->onEachSide(1);
        return Inertia('front/pages/courses/CtespIndex', [
            'courses' => CourseResource::collection($courses)
        ]);
    }

    public function licenciatura()
    {
        $courses = Course::latest()->paginate(10)->onEachSide(1);

        return Inertia('front/pages/courses/LicenciaturasIndex', [
            'courses' => CourseResource::collection($courses)
        ]);
    }

    public function posGraduacao()
    {
        $courses = Course::latest()->paginate(10)->onEachSide(1);
        return Inertia('front/pages/courses/PosGraduacoesIndex', [
            'courses' => CourseResource::collection($courses)
        ]);
    }

    // Admin doesn't need show
    public function show(Course $course)
    {
        return Inertia('front/pages/courses/Show', [
            'course' => new CourseResource($course)
        ]);
    }

    /*
    ADMIN
    */

    public function adminIndex()
    {
        return Inertia('back/pages/courses/Index', [
            'courses' => CourseResource::collection(Course::latest()->get())
        ]);
    }

    public function create()
    {

        $categories = CourseCategory::get();
        $subjects = Subject::get();

        return Inertia('back/pages/courses/Create', [
            'categories' => $categories,
            'subjects' => $subjects
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|array',
                'title.pt' => 'required|string|max:255',
                'title.en' => 'required|string|max:255',
                'description' => 'required|array',
                'description.pt' => 'required|string',
                'description.en' => 'required|string',
                'professional_outcomes' => 'required|array',
                'professional_outcomes.pt' => 'required|string',
                'professional_outcomes.en' => 'required|string',
                'course_category_id' => 'sometimes|nullable|uuid|exists:course_categories,id',
                'modality' => 'sometimes|nullable|in:hybrid,online,in-person',
                'duration_years' => 'nullable|numeric|min:1|max:6',
                'study_regime' => 'nullable|numeric|in:0,1',
                'tuition_monthly_pay' => 'nullable|numeric|min:0',
                'tuition_months' => 'nullable|numeric|min:1',
                'media' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:51200',
                'semesters' => 'nullable|array',
                'semesters.*.semester_number' => 'required|numeric|min:1',
                'semesters.*.subjects' => 'nullable|array',
                'semesters.*.subjects.*.id' => 'nullable|uuid|exists:subjects,id',
                'semesters.*.subjects.*._type' => 'nullable|string|in:existing,new',
                'semesters.*.subjects.*.name' => 'nullable|array',
                'semesters.*.subjects.*.name.pt' => 'nullable|string|max:255',
                'semesters.*.subjects.*.name.en' => 'nullable|string|max:255',
                'semesters.*.subjects.*.ects' => 'nullable|numeric|min:1|max:30',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            dd($e->errors());
        }

        // Move file immediately after validation, before the transaction
        $mediaId = null;

        if ($request->hasFile('media') && $request->file('media')->isValid()) {
            $file = $request->file('media');
            $extension = $file->getClientOriginalExtension();
            $filename = \Illuminate\Support\Str::uuid() . '.' . $extension;
            $isVideo = str_starts_with($file->getMimeType(), 'video/');

            // Move it NOW before the transaction, while the temp file still exists
            $path = $file->move(storage_path('app/public/media'), $filename);

            if (!$path) {
                return back()->withErrors(['media' => 'Falha ao guardar o ficheiro.']);
            }

            $media = Media::create([
                'file_path' => 'media/' . $filename,
                'file_disk' => 'public',
                'thumbnail_disk' => null,
                'thumbnail_path' => null,
                'alt_text' => null,
            ]);

            $mediaId = $media->id;
        }

        DB::transaction(function () use ($validated, $mediaId) {
            $course = Course::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'professional_outcomes' => $validated['professional_outcomes'],
                'course_category_id' => $validated['course_category_id'] ?? null,
                'modality' => $validated['modality'] ?? 'in-person',
                'duration_years' => (int) $validated['duration_years'],
                'study_regime' => (int) $validated['study_regime'],
                'tuition_monthly_pay' => (int) $validated['tuition_monthly_pay'],
                'tuition_months' => (int) $validated['tuition_months'],
                'media_id' => $mediaId,
            ]);

            foreach ($validated['semesters'] ?? [] as $semesterData) {
                $semester = $course->semesters()->create([
                    'semester_number' => (int) $semesterData['semester_number'],
                ]);

                $subjectIds = [];

                foreach ($semesterData['subjects'] ?? [] as $subjectData) {
                    if ($subjectData['_type'] === 'existing') {
                        $subjectIds[] = $subjectData['id'];
                    } else {
                        $subject = Subject::create([
                            'name' => $subjectData['name'],
                            'ects' => (int) $subjectData['ects'],
                            'file_path' => '',
                        ]);
                        $subjectIds[] = $subject->id;
                    }
                }

                if (!empty($subjectIds)) {
                    $semester->subjects()->attach($subjectIds);
                }
            }
        });


        return to_route('backoffice.courses')
            ->with('success', __('flashes.success.courseCreated'));
    }
    public function edit(Course $course)
    {
        return Inertia('back/pages/courses/Edit', [
            'course' => new AdminCourseResource($course->load('semesters.subjects')),
            'categories' => CourseCategory::get(),
            'subjects' => Subject::all(),
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            // Core fields
            'title' => 'required|array',
            'title.pt' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'description' => 'required|array',
            'description.pt' => 'required|string',
            'description.en' => 'required|string',
            'professional_outcomes' => 'required|array',
            'professional_outcomes.pt' => 'required|string',
            'professional_outcomes.en' => 'required|string',
            'course_category_id' => 'sometimes|nullable|uuid|exists:course_categories,id',
            'modality' => 'sometimes|nullable|in:hybrid,online,in-person',
            'duration_years' => 'nullable|numeric|min:1|max:6',
            'study_regime' => 'nullable|numeric|in:0,1',
            'tuition_monthly_pay' => 'nullable|numeric|min:0',
            'tuition_months' => 'nullable|numeric|min:1',

            // Media
            'media' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:51200',

            // Semesters
            'semesters' => 'nullable|array',
            'semesters.*.semester_number' => 'required|numeric|min:1',
            'semesters.*.subjects' => 'nullable|array',
            'semesters.*.subjects.*.id' => 'nullable|uuid|exists:subjects,id',
            'semesters.*.subjects.*._type' => 'nullable|string|in:existing,new',
            'semesters.*.subjects.*.name' => 'nullable|array',
            'semesters.*.subjects.*.name.pt' => 'nullable|string|max:255',
            'semesters.*.subjects.*.name.en' => 'nullable|string|max:255',
            'semesters.*.subjects.*.ects' => 'nullable|numeric|min:1',
        ]);

        // Manually validate new subjects
        $errors = [];
        foreach ($request->input('semesters', []) as $i => $semester) {
            foreach ($semester['subjects'] ?? [] as $j => $subject) {
                $type = $subject['_type'] ?? null;

                if ($type === 'existing' && empty($subject['id'])) {
                    $errors["semesters.$i.subjects.$j.id"] = 'A disciplina existente não tem ID.';
                }

                if ($type === 'new') {
                    if (empty($subject['name']['pt']) && empty($subject['name']['en'])) {
                        $errors["semesters.$i.subjects.$j.name.pt"] = 'O nome da disciplina é obrigatório.';
                    }
                    if (empty($subject['ects'])) {
                        $errors["semesters.$i.subjects.$j.ects"] = 'Os ECTS são obrigatórios.';
                    }
                }
            }
        }

        if (!empty($errors)) {
            return back()->withErrors($errors)->withInput();
        }

        DB::transaction(function () use ($request, $validated, $course) {

            // ── 1. Handle media upload ──────────────────────────────────────────
            $mediaId = $course->media_id; // keep existing by default
            $oldMedia = $course->media;   // grab reference before we touch anything

            if ($request->hasFile('media') && $request->file('media')->isValid()) {
                $file = $request->file('media');
                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

                Storage::disk('public')->put("media/{$filename}", file_get_contents($file));

                $media = Media::create([
                    'file_path' => "media/{$filename}",
                    'file_disk' => 'public',
                    'thumbnail_disk' => null,
                    'thumbnail_path' => null,
                    'alt_text' => null,
                ]);
                $mediaId = $media->id;

                // ① Point the course at the new media first (removes the FK reference)
                $course->update(['media_id' => $mediaId]);

                // ② Now it's safe to delete the old record and its file
                if ($oldMedia) {
                    Storage::disk('public')->delete($oldMedia->file_path);
                    $oldMedia->delete();
                }
            }

            // ── 2. Update the course ────────────────────────────────────────────
            $course->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'professional_outcomes' => $validated['professional_outcomes'],
                'course_category_id' => $validated['course_category_id'] ?? $course->course_category_id,
                'modality' => $validated['modality'] ?? $course->modality,
                'duration_years' => (int) $validated['duration_years'],
                'study_regime' => (int) $validated['study_regime'],
                'tuition_monthly_pay' => (int) $validated['tuition_monthly_pay'],
                'tuition_months' => (int) $validated['tuition_months'],
            ]);

            // ── 3. Sync semesters + subjects ────────────────────────────────────
            // Delete semesters that are no longer in the payload
            $incomingSemesterNumbers = collect($validated['semesters'] ?? [])
                ->pluck('semester_number')
                ->map(fn($n) => (int) $n)
                ->toArray();

            $course->semesters()
                ->whereNotIn('semester_number', $incomingSemesterNumbers)
                ->each(function ($semester) {
                    $semester->subjects()->detach();
                    $semester->delete();
                });

            // Upsert each semester and sync its subjects
            foreach ($validated['semesters'] ?? [] as $semesterData) {
                $semester = $course->semesters()->firstOrCreate([
                    'semester_number' => (int) $semesterData['semester_number'],
                ]);

                $subjectIds = [];

                foreach ($semesterData['subjects'] ?? [] as $subjectData) {
                    if ($subjectData['_type'] === 'existing') {
                        $subjectIds[] = $subjectData['id'];
                    } else {
                        $subject = Subject::create([
                            'name' => $subjectData['name'],
                            'ects' => (int) $subjectData['ects'],
                            'file_path' => '',
                        ]);
                        $subjectIds[] = $subject->id;
                    }
                }

                // sync() replaces existing pivot rows — perfect for update
                $semester->subjects()->sync($subjectIds);
            }
        });

        return to_route('backoffice.courses')
            ->with('success', __('flashes.success.courseUpdated'));
    }
    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('backoffice.courses')
            ->with('success', __('flashes.success.courseDeleted'));
    }

}
