<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course_Gain extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $primaryKey  = 'COURSE_GAIN_ID';
    public $table = "Course_Gains";
}
