<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Course_Require;
use App\Models\Course_Gain;
use App\Models\Course_Chapter;
use App\Models\Lesson;
use Illuminate\Support\Facades\DB;
use App\Models\Course_MainType;

class CourseController extends Controller
{
    public function CreateCourse(Request $request)
    {
        try {
            DB::beginTransaction();
            $path = 'img/course';
            $file = $request->file('course-img');
            $extension = $file->getClientOriginalExtension(); // you can also use file name
            $fileName = time() . '.' . $extension;

            $course = new Course();
            $course_data = json_decode($request->data);
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->FEE = $course_data->Price;
            $course->IMG = $path . "/" . $fileName;
            $course->COURSE_DESC = $course_data->Description;
            $course->COURSE_STATE = "Chờ duyệt bài";
            $course->COMMISSION = 70;
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->AUTHOR_ID = $course_data->Author;
            $course->COURSE_TYPE_ID = $course_data->SubCategory;

            $course->save();

            foreach ($course_data->ListIn as $value) {
                $course_require = new Course_Require();
                $course_require->CONTENT = $value;
                $course_require->COURSE_ID = $course->id;
                $course_require->save();
            }
            foreach ($course_data->ListOut as $value) {
                $course_gain = new Course_Gain();
                $course_gain->CONTENT = $value;
                $course_gain->COURSE_ID = $course->id;
                $course_gain->save();
            }
            foreach ($course_data->ListCourse as $value) {
                $course_chapter = new Course_Chapter();
                $course_chapter->CHAPTER_NAME = $value->title;
                $course_chapter->COURSE_ID = $course->id;
                $course_chapter->save();
                $Array2 = $value->lesson;
                foreach ($Array2 as $value2) {
                    $lesson = new Lesson();
                    $lesson->LESSON_NAME = $value2->title;
                    $lesson->LESSON_URL = $value2->url;
                    $lesson->DURATION = $value2->duration;
                    $lesson->CHAPTER_ID = $course_chapter->id;
                    $lesson->save();
                }
            }
            DB::commit();
            $file->move($path, $fileName);

            return response()->json([
                'status' => 200,
                'message' => 'Tạo khóa học thành công'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 200,
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function GetCourses()
    {
        $courses = DB::table('courses')
            ->select('courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
            ->join('users', 'courses.author_id', '=', 'users.user_id')
            ->take(8)
            ->get();
        return response()->json([
            'status' => 200,
            'message' => $courses,
        ]);
    }

    public function GetCourseHomePage()
    {
        try {
            $courseMainType1 = DB::table('course_maintypes')->where('TYPE_NAME', 'Tin học văn phòng')->first();
            $courseMainType2 = DB::table('course_maintypes')->where('TYPE_NAME', 'Công nghệ thông tin')->first();
            $courses1 = DB::table('courses')
                ->select('courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->join('course_subtypes', 'courses.course_type_id', '=', 'course_subtypes.course_subtype_id')
                ->where('course_subtypes.parent_type_id', $courseMainType1->COURSE_MAINTYPE_ID)
                ->take(8)
                ->get();
            $courses2 = DB::table('courses')
                ->select('courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->join('course_subtypes', 'courses.course_type_id', '=', 'course_subtypes.course_subtype_id')
                ->where('course_subtypes.parent_type_id', $courseMainType2->COURSE_MAINTYPE_ID)
                ->take(8)
                ->get();
            $result = (object)['TinHocVanPhong' => $courses1, 'CNTT' => $courses2];
            // $array = array();
            // array_push($array, 'gia tri');
            return response()->json([
                'status' => 200,
                'message' => $result
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 200,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function GetCoursesBySubtype(Request $request)
    {
        try {
            $id = $request->subtypeId;
            $courses = DB::table('courses')
                ->select('courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->where('courses.course_type_id', $id)
                ->get();
            return response()->json([
                'status' => 200,
                'message' => $courses
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 200,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function GetCoursesByMaintype(Request $request)
    {
        try {
            $id = $request->maintypeId;
            $courses = DB::table('courses')
                ->select('courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->join('course_subtypes', 'courses.course_type_id', '=', 'course_subtypes.course_subtype_id')
                ->where('course_subtypes.parent_type_id', $id)
                ->get();
            return response()->json([
                'status' => 200,
                'message' => $courses
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 200,
                'message' => $th->getMessage()
            ]);
        }
    }
}
