<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class DepartmentInfo extends Model
{
    use HasUuids, HasTranslations;

    protected $fillable = [
        'title',
        'phone',
        'phone_alt',
        'email'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
