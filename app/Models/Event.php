<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;
use Illuminate\Support\Str;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasUuids, HasFactory, HasTranslations, SoftDeletes;
    protected $fillable = [
        'media_id',
        'event_category_id',
        'title',
        'description',
        'location',
        'start_date',
        'end_date',
        'category'
    ];
    /**
     * Summary of translatable attributes.
     * These values are stored in mySql database as
     * json collumns, with a key representing the
     * locale ('pt', 'en') and the value representing
     * the translated text
     * @var array
     */

    public function category(){
        return $this->hasOne(EventCategory::class);
    }
    public $translatable = [
        'title',
        'description',
    ];
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    /**
     * Summary of media
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Media, Event>
     */
    public function media()
    {
        return $this->belongsTo(Media::class);
    }


}
