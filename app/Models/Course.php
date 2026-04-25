<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;

class Course extends Model
{
    use HasUuids, HasFactory, HasTranslations, SoftDeletes;

    protected $fillable = [
        'title',
        'course_category_id',
        'media_id',
        'description',
        'duration_years',
        'professional_outcomes',
        'study_regime',
        'tuition_monthly_pay',
        'tuition_months',
        'modality',
    ];
    /**
     * Summary of translatable attributes.
     * These values are stored in mySql database as
     * json collumns, with a key representing the
     * locale ('pt', 'en') and the value representing
     * the translated text
     * @var array
     */
    public $translatable = [
        'title',
        'professional_outcomes',
        'description',
    ];

    /**
     * Summary of media
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Media, Course>
     */
    function media()
    {
        return $this->belongsTo(Media::class);
    }
    /**
     * Eloquent mapping of CourseCategory
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Course, Course>
     */
    function category()
    {
        return $this->belongsTo(CourseCategory::class, 'course_category_id');
    }

    /**
     * Eloquent mapping of Semesters
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Semester, Course>
     */
    function semesters()
    {
        return $this->hasMany(Semester::class);
    }

    /**
     * Eloquent mapping of Applications
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Application, Course>
     */
    function applications()
    {
        return $this->hasMany(Application::class);
    }


}
