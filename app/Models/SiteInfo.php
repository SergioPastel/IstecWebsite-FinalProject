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
        'logo_media_id',
        'favicon_media_id',
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

    public function logo(){
        return $this->belongsTo(Media::class, 'logo_media_id');
    }

    public function favicon(){
        return $this->belongsTo(Media::class, 'icon_media_id');
    }
}
