<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'full_name',
        'email',
        'phone',
        'birth_date',
        'identification_number',
    ];

    // EventApplication belongs to an event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
