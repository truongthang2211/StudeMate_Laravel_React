<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Account;
use App\Models\City;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller {

    public function GetCity(Request $request) {
        try {       
            $city = City::where("CITY_ID",$request->CITY_ID)->first();

            return response()->json([
                'status'=> 200,
                'city'=>$city,
            ]);

        } catch (\Throwable $th) { 
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
    }

    public function GetProfileCourseItem(Request $request) {
        try{
            $courses = Course::join('enrollments', 'enrollments.COURSE_ID', '=', 'courses.COURSE_ID')
                            ->join('users', 'users.USER_ID', '=', 'enrollments.USER_ID')
                            ->where('users.USER_ID', $request->USER_ID)
                            ->get(['courses.COURSE_ID', 'COURSE_NAME', 'IMG', 'AUTHOR_ID']);

            return response()->json([
                'status'=> 200,
                'courses'=>$courses,
            ]);

        } catch (\Throwable $th) { 
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
    }

    public function GetCourseInfo(Request $request) {
        try{
            $learntCourse = Course::join('enrollments', 'enrollments.COURSE_ID', '=', 'courses.COURSE_ID')
                            ->join('users', 'users.USER_ID', '=', 'enrollments.USER_ID')
                            ->where('users.USER_ID', $request->USER_ID)
                            ->count();

            $uppedCourse = Course::join('users', 'users.USER_ID', '=', 'courses.AUTHOR_ID')
                            ->where('users.USER_ID', $request->USER_ID)
                            ->count();

            return response()->json([
                'status'=> 200,
                'learntCourse'=>$learntCourse,
                'uppedCourse'=>$uppedCourse,
            ]);

        } catch (\Throwable $th) { 
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
    }
}