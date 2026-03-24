<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Str;

class Media extends Model
{
    use HasUuids, HasFactory, HasTranslations;
    protected $fillable = [
        'type',
        'file_path',
        'thumbnail_path',
        'alt_text'
    ];
    public $translatable = ['alt_text'];

    public static function boot()
    {
        parent::boot();


        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
