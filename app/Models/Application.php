<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    /** @use HasFactory<\Database\Factories\ApplicationFactory> */
    use HasFactory;

    protected $fillable = [
        'course_id',
        'full_name',
        'email',
        'phone',
        'birth_date',
        'academic_level',
        'motivation'
    ];

    // Applications belong to a course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
