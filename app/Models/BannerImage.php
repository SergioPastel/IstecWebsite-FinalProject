<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class BannerImage extends Model
{
    use HasUuids, HasTranslations;

    protected $fillable = [
        'media_id',
        'order',
        'title',
        'subtitle',
    ];

    public $translatable = ['title', 'subtitle'];

    public function media()
    {
        return $this->belongsTo(Media::class);
    }
}
