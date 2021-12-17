<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Account;
use App\Models\City;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller {

    public function GetCity(Request $request) {
        try {       
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $User = User::where('USER_ID',$id)->first();
                $city = City::where("CITY_ID", $User->CITY_ID)->get();
            //$city = DB::table('cities')->where('CITY_ID',$request->CITY_ID)->get();
            
            return response()->json([
                'status'=> 200,
                'city'=>$city,
            ]);

            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'Cookies het han',
                    'user' => null
                ]);
            }
           
        } catch (\Throwable $th) { 
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
    }

    public function GetProfileCourseItem(Request $request) {
        try{
            // $courses = Course::join('enrollments', 'enrollments.COURSE_ID', '=', 'courses.COURSE_ID')
            //                 ->join('users', 'users.USER_ID', '=', 'enrollments.USER_ID')
            //                 ->where('users.USER_ID', $request->USER_ID)
            //                 ->get(['courses.COURSE_ID', 'COURSE_NAME', 'IMG', 'AUTHOR_ID']);

            $courses = DB::table('users')->join('learnings', 'learnings.USER_ID', '=', 'users.USER_ID')
                            ->join('lessons ', 'lessons.LESSON_ID', '=', 'learnings.LESSON_ID')
                            ->join('course_chapters', 'course_chapters.COURSE_CHAPTER_ID', '=', 'lessons.CHAPTER_ID')
                            ->join('courses', 'courses.COURSE_ID', '=', 'course_chapters.COURSE_ID')
                            ->where('users.USER_ID', $request->USER_ID)
                            ->orderBy('LEARN_TIME', DESC)
                            ->take(3)
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

    public function GetListLearntCourses(Request $request) {
        try{
            $learntCourses = Course::join('enrollments', 'enrollments.COURSE_ID', '=', 'courses.COURSE_ID')
                            ->join('users', 'users.USER_ID', '=', 'enrollments.USER_ID')
                            ->where('users.USER_ID', $request->USER_ID)
                            ->get(['courses.COURSE_ID', 'COURSE_NAME', 'IMG', 'AUTHOR_ID']);

            return response()->json([
                'status'=> 200,
                'learntCourses'=>$learntCourses,
            ]);

        } catch (\Throwable $th) { 
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
    }

    public function GetListUppedCourses(Request $request) {
        try{
            $uppedCourses = Course::join('users', 'users.USER_ID', '=', 'courses.AUTHOR_ID')
                            ->where('users.USER_ID', $request->USER_ID)
                            ->get(['courses.COURSE_ID', 'COURSE_NAME', 'IMG', 'AUTHOR_ID']);

            return response()->json([
                'status'=> 200,
                'uppedCourses'=>$uppedCourses,
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

    public function GetAuthor(Request $request) {
        try{
            $author = Course::join('users', 'users.USER_ID', '=', 'courses.AUTHOR_ID')
                            ->where('courses.COURSE_ID', $request->COURSE_ID)
                            ->get(['AUTHOR_ID', 'FULLNAME']);

            return response()->json([
                'status'=> 200,
                'author'=>$author,
            ]);

        } catch (\Throwable $th) { 
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
    }
}