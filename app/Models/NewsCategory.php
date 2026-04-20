<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class NewsCategory extends Model
{
    use HasTranslations, HasUuids;

    public $translatable = [
        'title'
    ];

    public function news()
    {
        return $this->hasMany(News::class, 'news_category_id');
    }
}
