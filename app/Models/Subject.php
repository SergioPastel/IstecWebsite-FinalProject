<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;

class Subject extends Model
{
    use HasUuids, HasFactory, HasTranslations;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'ects',
    ];

    /**
     * Summary of translatable attributes.
     * These values are stored in mySql database as
     * json collumns, with a key representing the
     * locale ('pt', 'en') and the value representing
     * the translated text
     * @var array
     */
    public $translatable = ['name'];

    /**
     * Eloquent mapping of semesters, using a pivot
     * table with timestamps
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<Semester, Subject, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function semesters()
    {
        return $this->belongsToMany(Semester::class)
            ->withTimestamps();
    }
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
