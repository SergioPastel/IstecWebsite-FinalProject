<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Str;

class News extends Model
{
    /** @use HasFactory<\Database\Factories\NewsFactory> */
    use HasUuids, HasFactory, HasTranslations;
    protected $fillable = [
        'media_id',
        'news_category_id',
        'title',
        'description',
    ];
    /**
     * Summary of translatable attributes.
     * These values are stored in mySql database as
     * json collumns, with a key representing the
     * locale ('pt', 'en') and the value representing
     * the translated text
     * @var array
     */
    public $translatable = [
        'title',
        'description'
    ];

    public function category()
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id');
    }

    /**
     * Summary of media
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Media, News>
     */
    public function media()
    {
        return $this->belongsTo(Media::class);
    }


}
