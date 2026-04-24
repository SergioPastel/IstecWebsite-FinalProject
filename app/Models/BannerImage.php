<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class BannerImage extends Model
{
    use HasUuids;
    protected $fillable = [
        'order',
        'media_id',
    ];

    public function images(){
        return $this->belongsTo(Media::class);
    }


}
