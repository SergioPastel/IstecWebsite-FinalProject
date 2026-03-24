<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Str;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasUuids, HasFactory, HasTranslations;
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
