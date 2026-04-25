<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class SiteInfo extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slogan', 'mission', 'whoWeAre', 'site_name',
        'phone_number', 'email', 'address',

        'ctesp_banner', 'ctesp_banner_title', 'ctesp_banner_subtitle',
        'licenciatura_banner', 'licenciatura_banner_title', 'licenciatura_banner_subtitle',
        'pos_graduacao_banner', 'pos_graduacao_banner_title', 'pos_graduacao_banner_subtitle',
        'eventos_noticias_banner', 'eventos_noticias_banner_title', 'eventos_noticias_banner_subtitle',
        'erasmus_banner', 'erasmus_banner_title', 'erasmus_banner_subtitle',
        'pedagogia_banner', 'pedagogia_banner_title', 'pedagogia_banner_subtitle',
    ];

    public $translatable = [
        'slogan', 'mission', 'whoWeAre',
        'ctesp_banner_title', 'ctesp_banner_subtitle',
        'licenciatura_banner_title', 'licenciatura_banner_subtitle',
        'pos_graduacao_banner_title', 'pos_graduacao_banner_subtitle',
        'eventos_noticias_banner_title', 'eventos_noticias_banner_subtitle',
        'erasmus_banner_title', 'erasmus_banner_subtitle',
        'pedagogia_banner_title', 'pedagogia_banner_subtitle',
    ];

    public function ctespBannerMedia()        { return $this->belongsTo(Media::class, 'ctesp_banner'); }
    public function licenciaturaBannerMedia() { return $this->belongsTo(Media::class, 'licenciatura_banner'); }
    public function posGraduacaoBannerMedia() { return $this->belongsTo(Media::class, 'pos_graduacao_banner'); }
    public function eventosNoticiasBannerMedia() { return $this->belongsTo(Media::class, 'eventos_noticias_banner'); }
    public function erasmusBannerMedia()      { return $this->belongsTo(Media::class, 'erasmus_banner'); }
    public function pedagogiaBannerMedia()    { return $this->belongsTo(Media::class, 'pedagogia_banner'); }
}
