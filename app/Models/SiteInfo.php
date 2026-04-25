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

        'ctesp_banner',
        'licenciatura_banner',
        'pos_graduacao_banner',
        'eventos_noticias_banner',
        'erasmus_banner',
        'pedagogia_banner',
    ];

    public $translatable = [
        'slogan',
        'mission',
        'whoWeAre',
    ];

    public function ctespBannerMedia()
    {
        return $this->belongsTo(Media::class, 'ctesp_banner');
    }
    public function licenciaturaBannerMedia()
    {
        return $this->belongsTo(Media::class, 'licenciatura_banner');
    }
    public function posGraduacaoBannerMedia()
    {
        return $this->belongsTo(Media::class, 'pos_graduacao_banner');
    }
    public function eventosNoticiasBannerMedia()
    {
        return $this->belongsTo(Media::class, 'eventos_noticias_banner');
    }
    public function erasmusBannerMedia()
    {
        return $this->belongsTo(Media::class, 'erasmus_banner');
    }
    public function pedagogiaBannerMedia()
    {
        return $this->belongsTo(Media::class, 'pedagogia_banner');
    }
}
