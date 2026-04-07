<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Str;

class Section extends Model
{
    use HasUuids;

    protected $fillable = [
        'page_id',
        'type',
        'content'
    ];

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
