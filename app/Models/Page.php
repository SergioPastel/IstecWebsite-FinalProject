<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;

class Page extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'title',
        'slug',
    ];

    public function sections(){
        return $this->hasMany(Section::class)->orderBy('order');
    }


}
