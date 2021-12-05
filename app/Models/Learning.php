<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Learning extends Model
{
    use HasFactory;
    public $timestamps = false;
    const UPDATED_AT=null;
    const CREATED_AT='LEARN_TIME';
}
