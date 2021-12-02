<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Course_Require;
use App\Models\Course_Gain;
use App\Models\Course_Chapter;
use App\Models\Lesson;

class CourseController extends Controller
{
    //
    public function CreateCourse(Request $request)
    {
        
        try {
            $path = 'img/course';
            $file = $request->file('course-img');
            $extension = $file->getClientOriginalExtension(); // you can also use file name
            $fileName = time() . '.' . $extension;
    
            $course = new Course();
            $course_data = json_decode($request->data);
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->FEE = $course_data->Price;
            $course->IMG = $path ."/".$fileName;
            $course->COURSE_DESC = $course_data->Description;
            $course->COURSE_STATE = "Chờ duyệt bài";
            $course->COMMISSION = 70;
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->AUTHOR_ID = $course_data->Author;
            $course->COURSE_TYPE_ID = $course_data->SubCategory;
            $course->save();
            $file->move($path,$fileName);

            foreach($course_data->ListIn as $value){
                $course_require = new Course_Require();
                $course_require->CONTENT = $value;
                $course_require->COURSE_ID = $course->id();
                $course_require->save();
            }
            foreach($course_data->ListOut as $value){
                $course_gain = new Course_Gain();
                $course_gain->CONTENT = $value;
                $course_gain->COURSE_ID = $course->id();
                $course_gain->save();
            }
            foreach($course_data->ListCourse as $value){
                $course_chapter = new Course_Chapter();
                $course_chapter->CHAPTER_NAME = $value->title;
                $course_chapter->COURSE_ID = $course->id;
                $course_chapter->save();
                foreach($value->lession as $value2){
                    $lesson = new Lesson();
                    $lesson->LESSON_NAME = $value2->title;
                    $lesson->LESSON_URL = $value2->url;
                    $lesson->DURATION = $value2->duration;
                    $lesson->CHAPTER_ID = $course_chapter->id;
                    $lesson->save();
                    
                }
            }

            return response()->json([
                'status' => 200,
                'message' => 'Tạo khóa học thành công'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 200,
                'message' => $th->getMessage(),
            ]);
        }
    }
}
