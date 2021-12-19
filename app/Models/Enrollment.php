<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;
    const UPDATED_AT = null;
    const CREATED_AT = 'ENROLL_TIME';
    public $table = "Enrollments";
    protected $primaryKey = 'enrollment_id';
}
