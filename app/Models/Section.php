<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;

class Section extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'page_id',
        'type',
        'content',
        'order',
    ];

    protected $casts = [
        'content' => 'json',
    ];

    public function pages()
    {
        return $this->belongsTo(Page::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
