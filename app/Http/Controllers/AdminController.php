<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;
use App\Models\Course_SubType;

class AdminController extends Controller
{
    public function CourseList()
    {
        try {
            $course_list = Course::all();
            $ans = array();
            foreach ($course_list as $item) {
                $Author = User::where('USER_ID', $item->AUTHOR_ID)->first();
                $CourseType = Course_SubType::where('COURSE_SUBTYPE_ID', $item->COURSE_TYPE_ID)->first();
                $object = (object)[
                    'CourseID' => $item->COURSE_ID,
                    'CourseTitle' => $item->COURSE_NAME,
                    'Fee' => $item->FEE,
                    'CourseState' => $item->COURSE_STATE,
                    'Commission' => $item->COMMISSION,
                    'CourseType' => $CourseType->TYPE_NAME,
                    'CourseCreate' => $item->CREATED_AT,
                    'Author' => (object)[
                        'UserID' => $Author->USER_ID,
                        'FullName' => $Author->FULLNAME,
                    ]
                ];
                array_push($ans, $object);
            }
            return response()->json([
                'status' => 200,
                'message' => $ans,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
       
    }
}
