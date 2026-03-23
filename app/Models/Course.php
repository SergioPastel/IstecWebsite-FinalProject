<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;


class Course extends Model
{
    use HasUuids, HasFactory, HasTranslations;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'course_category_id',
        'description',
        'duration_years',
        'study_regime',
        'tuition_monthly_pay',
        'tuition_months'
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
     * Eloquent mapping of CourseCategory
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Course, Course>
     */
    function category()
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
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
