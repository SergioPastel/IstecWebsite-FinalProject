<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasUuids, HasFactory;
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Eloquent mapping of semesters, using a pivot
     * table with timestamps
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<Semester, Subject, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function semesters()
    {
        return $this->belongsToMany(Semester::class)
            ->withTimestamps();
    }
}
