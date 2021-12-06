<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    const UPDATED_AT = null;
    public $primaryKey  = 'ACCOUNT_ID';

}
