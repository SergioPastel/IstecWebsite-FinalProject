<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;
use Illuminate\Support\Str;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasUuids, HasFactory, HasTranslations, SoftDeletes;
    protected $fillable = [
        'media_id',
        'start_date',
        'end_date',
        'location',
        'title',
        'description'
    ];
    public $translatable = [
        'title',
        'description'
    ];

    public function media()
    {
        return $this->hasOne(Media::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
