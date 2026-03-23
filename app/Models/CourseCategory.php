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
