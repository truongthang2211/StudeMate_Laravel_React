<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Course_Require;
use App\Models\Course_Gain;
use App\Models\Course_Chapter;
use App\Models\Course_Review;
use App\Models\Lesson;
use App\Models\Learning;
use App\Models\Enrollment;
use Illuminate\Support\Facades\DB;

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
    public function GetCourses(){
        $courses= Course::all();
        return response()->json([
            'status' => 200,
            'message' => $courses,
        ]);

    }

    public function GetUserCourse()
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $course_list = Course::where('AUTHOR_ID', $id)->get();
                $ans = array();

                foreach ($course_list as $course) {
                    $course_review = Course_Review::where('COURSE_ID', $course->COURSE_ID);
                    $earn = DB::table('payments')->where('RECEIVER_ID', $id)
                        ->join('enrollments', 'payments.ENROLLMENT_ID', '=', 'enrollments.ENROLLMENT_ID')
                        ->where('COURSE_ID', $course->COURSE_ID)->get()->sum('AMOUNT');
                    $subcribe = Enrollment::where('COURSE_ID', $course->COURSE_ID)->count();
                    $object = (object) [
                        'CourseTitle' => $course->COURSE_NAME,
                        'Created_at' => $course->CREATED_AT,
                        'Price' => $course->FEE,
                        'Commission' => $course->COMMISSION,
                        'Status' => $course->COURSE_STATE,
                        'Rate' => (object) [
                            'up' => $course_review->where('COURSE_REVIEW_STATE', 1)->count(),
                            'down' => $course_review->where('COURSE_REVIEW_STATE', 0)->count()
                        ],
                        'Earn' => $earn,
                        'Subcribe' => $subcribe,
                        'CourseID' => $course->COURSE_ID,
                        'CourseIMG' => $course->IMG
                    ];
                    array_push($ans, $object);
                }

                return response()->json([
                    'status' => 200,
                    'message' => $ans,
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Cookies het han',
                    'user' => null
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'data' => $th,
            ]);
        }
    }
    public function GetLearning($course_id, $lesson_id)
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $chapters = Course_Chapter::where('COURSE_ID', $course_id);
                $lesson = 0;
                $lesson = Learning::where('USER_ID', $id)->get('LESSON_ID')->intersect(Lesson::whereIn('CHAPTER_ID', $chapters->get('COURSE_CHAPTER_ID'))->get('LESSON_ID'))->max('LESSON_ID');
                $firstlesson=Lesson::where('CHAPTER_ID', $chapters->min('COURSE_CHAPTER_ID'))->min('LESSON_ID');
                if ($lesson_id=="undefined" || $lesson_id >$lesson) {
                    $lesson_id= $lesson? $lesson : $firstlesson;
                }
                $lesson = $lesson? $lesson:-1;
                $course = Course::where('COURSE_ID', $course_id);
                $ListLearn = array();
                foreach ($chapters->get() as $chapter) {
                    $lessoninchapter = Lesson::where('CHAPTER_ID', $chapter->COURSE_CHAPTER_ID)->get();
                    $object = (object)[
                        'ChapterTitle' => $chapter->CHAPTER_NAME,
                        'Lesson' => $lessoninchapter
                    ];
                    array_push($ListLearn, $object);
                }
                $ans = (object) [
                    'CourseTitle' => $course->first()->COURSE_NAME,
                    'ListLearn' => $ListLearn,
                    'LastLessonLearnt' => (int)($lesson),
                    'LearningURL'=>Lesson::where('LESSON_ID',$lesson_id)->first()->LESSON_URL,


                ];
                return response()->json([
                    'status' => 200,
                    'message' => $ans,
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Cookies het han',
                    'user' => null
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
    public function AddLearn(Request $request){

         try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                if (!Learning::where('USER_ID',$id)->where('LESSON_ID',$request->lesson_id)->first()){
                    $learning = new Learning();
                    $learning->USER_ID = $id;
                    $learning->LESSON_ID=$request->lesson_id;
                    $learning->save();
                }
                return response()->json([
                    'status' => 200,
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Cookies het han',
                    'user' => null
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
}
