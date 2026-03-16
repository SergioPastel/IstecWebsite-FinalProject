<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;


class CourseCategory extends Model
{
    use HasUuids, HasTranslations;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'title',
        'description',
    ];
    public $translatable = [
        'title',
        'description',
    ];

    /**
     * Eloquent mapping of courses
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Course, CourseCategory>
     */
    function courses()
    {
        return $this->hasMany(Course::class);
    }
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
