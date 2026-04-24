<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class SiteInfo extends Model
{
    use HasTranslations;
    protected $fillable = [
        'slogan',
        'mission',
        'whoWeAre',
        'site_name',
        'phone_number',
        'email',
        'address',
    ];
    public $translatable = [
        'slogan',
        'mission',
        'whoWeAre'
    ];
}
