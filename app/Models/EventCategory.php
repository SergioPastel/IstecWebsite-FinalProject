<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class EventCategory extends Model
{
    use HasTranslations, HasUuids;

    public $translatable = [
        'title'
    ];
}
