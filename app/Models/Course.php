<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasUuids, HasFactory;
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Eloquent mapping of CourseCategory
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Course, Course>
     */
    function courseCategory()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Eloquent mapping of Semesters
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Semester, Course>
     */
    function semesters()
    {
        return $this->hasMany(Semester::class);
    }
}
