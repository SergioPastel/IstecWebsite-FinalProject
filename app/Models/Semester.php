<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;


class Semester extends Model
{
    use HasUuids, HasFactory, HasTranslations;
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Eloquent mapping of course
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Course, Semester>
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Eloquent mapping of subjects, using a pivot
     * table with timestamps
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<Subject, Semester, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function subjects()
    {
        return $this->belongsToMany(Subject::class)
            ->withTimestamps();
    }

}
