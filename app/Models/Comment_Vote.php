<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment_Vote extends Model
{

    public $table = "Comment_Votes";
    public $incrementing = false;
    public $timestamps = false;
    use HasFactory;
}
