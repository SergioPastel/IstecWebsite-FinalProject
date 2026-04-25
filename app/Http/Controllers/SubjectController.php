<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Subject;


class SubjectController extends Controller
{
    public function downloadPdf(Subject $subject)
    {
        abort_unless($subject->file_path, 404);

        $disk = Storage::disk('public');

        abort_unless($disk->exists($subject->file_path), 404);

        return response()->download($disk->path($subject->file_path), basename($subject->file_path));
    }
}