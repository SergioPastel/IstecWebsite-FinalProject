<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class CourseCategory extends Model
{
    use HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Eloquent mapping of courses
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Course, CourseCategory>
     */
    function courses()
    {
        return $this->hasMany(Course::class);
    }
}
