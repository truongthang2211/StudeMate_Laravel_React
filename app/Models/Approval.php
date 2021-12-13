<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    use HasFactory;
    const UPDATED_AT = null;
    const CREATED_AT = 'APPROVE_TIME';
    public $primaryKey  = 'APPROVAL_ID';

}
