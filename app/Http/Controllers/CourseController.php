<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Course_Require;
use App\Models\Course_Gain;
use App\Models\Course_Chapter;
use App\Models\Course_Review;
use App\Models\Course_MainType;
use App\Models\Lesson;
use App\Models\Learning;
use App\Models\Approval;
use App\Models\Notification;
use App\Models\Enrollment;
use Illuminate\Support\Facades\DB;
use App\Models\Course_SubType;
use App\Models\MongoDB;

use MongoDB\BSON\ObjectId;

class CourseController extends Controller
{
    public function CreateorDelCourse(Request $request)
    {
        try {
            $mg = new MongoDB();
            $course_data = $mg->db->Approval->findOneAndDelete(array('_id' => new ObjectId($request->_id['$oid'])));

            DB::beginTransaction();


            $course = new Course();
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->FEE = $course_data->Price;
            $course->IMG = $course_data->Image;
            $course->COURSE_DESC = $course_data->Description;
            $course->COURSE_STATE = 'Công khai';
            if (!$request->accept) {
                $course->COURSE_STATE = 'Từ chối';
            }
            $course->COMMISSION = $course_data->Commisstion;
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->AUTHOR_ID = $course_data->Author;
            $course->COURSE_TYPE_ID = $course_data->SubCategory;

            $course->save();

            foreach ($course_data->ListIn as $value) {
                $course_require = new Course_Require();
                $course_require->CONTENT = $value->CONTENT;
                $course_require->COURSE_ID = $course->COURSE_ID;
                $course_require->save();
            }
            foreach ($course_data->ListOut as $value) {
                $course_gain = new Course_Gain();
                $course_gain->CONTENT = $value->CONTENT;
                $course_gain->COURSE_ID = $course->COURSE_ID;
                $course_gain->save();
            }
            foreach ($course_data->ListCourse as $value) {
                $course_chapter = new Course_Chapter();
                $course_chapter->CHAPTER_NAME = $value->title;
                $course_chapter->COURSE_ID = $course->COURSE_ID;
                $course_chapter->save();
                $Array2 = $value->lesson;
                foreach ($Array2 as $value2) {
                    $lesson = new Lesson();
                    $lesson->LESSON_NAME = $value2->title;
                    $lesson->LESSON_URL = $value2->url;
                    $lesson->DURATION = $value2->duration;
                    $lesson->CHAPTER_ID = $course_chapter->COURSE_CHAPTER_ID;
                    $lesson->save();
                }
            }
            $noti = new Notification();
            $noti->USER_ID =  $course_data->Author;
            $noti->READ_STATE = 0;


            $approval = new Approval();
            $approval->COURSE_ID = $course->COURSE_ID;
            $approval->ACCEPT = $request->accept;
            if (!$request->accept) {
                $approval->REASON = $request->reason;
                $noti->CONTENT = 'Khóa học ' . $course_data->CourseTitle . ' đã bị từ chối với lý do: ' .  $request->reason;
            } else {
                $noti->CONTENT = 'Chúc mừng khóa học ' . $course_data->CourseTitle . ' của bạn đã được duyệt!';
            }
            $approval->save();
            $noti->save();
            DB::commit();


            return response()->json([
                'status' => 200,
                'message' => 'thành công'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 400,
                'message' => $th->__toString(),
            ]);
        }
    }

    public function GetCourses()
    {
        $courses = DB::table('courses')
            ->select('courses.course_id', 'courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
            ->join('users', 'courses.author_id', '=', 'users.user_id')->where('COURSE_STATE', 'Công khai')
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
                ->select('courses.course_id', 'courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->join('course_subtypes', 'courses.course_type_id', '=', 'course_subtypes.course_subtype_id')
                ->where('course_subtypes.parent_type_id', $courseMainType1->COURSE_MAINTYPE_ID)->where('COURSE_STATE', 'Công khai')
                ->take(8)
                ->get();
            $courses2 = DB::table('courses')
                ->select('courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->join('course_subtypes', 'courses.course_type_id', '=', 'course_subtypes.course_subtype_id')
                ->where('course_subtypes.parent_type_id', $courseMainType2->COURSE_MAINTYPE_ID)->where('COURSE_STATE', 'Công khai')
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
                ->select('courses.course_id', 'courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->where('courses.course_type_id', $id)->where('COURSE_STATE', 'Công khai')
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
                ->select('courses.course_id', 'courses.course_name', 'courses.fee', 'courses.course_desc', 'courses.img', 'users.fullname')
                ->join('users', 'courses.author_id', '=', 'users.user_id')
                ->join('course_subtypes', 'courses.course_type_id', '=', 'course_subtypes.course_subtype_id')
                ->where('course_subtypes.parent_type_id', $id)->where('COURSE_STATE', 'Công khai')
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
    public function CheckEnrolled(Request $request)
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $user_id = $_COOKIE['StudyMate'];
                $ans = DB::table('enrollments')
                    ->where('user_id', $user_id)
                    ->where('course_id', $request->courseId)
                    ->first();
                return response()->json([
                    'status' => 200,
                    'message' => $ans
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
                'status' => 200,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function GetCourseDetailByCourseId(Request $request)
    {
        try {
            $id = $request->courseId;
            $course_general = DB::table('courses')
                ->select('course_name', 'course_desc', 'img')
                ->where('course_id', $id)
                ->get();
            $course_gains = DB::table('course_gains')
                ->select('content')
                ->where('course_id', $id)
                ->get();
            $course_requires = DB::table('course_requires')
                ->select('content')
                ->where('course_id', $id)
                ->get();
            $total_chapter = DB::table('course_chapters')
                ->select(DB::raw('COUNT(course_chapter_id) as numOfChapter'))
                ->where('course_id', $id)
                ->get();
            $total_lesson = DB::table('lessons')
                ->select(DB::raw('COUNT(course_chapter_id) as numOfLesson'))
                ->join('course_chapters', 'lessons.chapter_id', '=', 'course_chapters.course_chapter_id')
                ->where('course_chapters.course_id', $id)
                ->get();
            $total_duration = DB::table('lessons')
                ->select(DB::raw('SUM(lessons.duration) as totalDuration'))
                ->join('course_chapters', 'lessons.chapter_id', '=', 'course_chapters.course_chapter_id')
                ->where('course_chapters.course_id', $id)
                ->get();
            $course_chapters = DB::table('course_chapters')
                ->where('course_id', $id);
            $list_learn = array();
            foreach ($course_chapters->get() as $chapter) {
                $less_in_chapter = DB::table('lessons')
                    ->where('chapter_id', $chapter->COURSE_CHAPTER_ID)
                    ->get();
                $num_of_chapter_less = DB::table('lessons')
                    ->select(DB::raw('COUNT(lesson_id) as numOfChapterLess'))
                    ->where('chapter_id', $chapter->COURSE_CHAPTER_ID)
                    ->get();
                $obj = (object)[
                    'chapterTitle' => $chapter->CHAPTER_NAME,
                    'lessons' => $less_in_chapter,
                    'numOfChapterLess' => $num_of_chapter_less

                ];
                array_push($list_learn, $obj);
            }

            return response()->json([
                'status' => 200,
                'course_general' => $course_general,
                'course_gains' => $course_gains,
                'course_requires' => $course_requires,
                'total_chapter' => $total_chapter,
                'total_lesson' => $total_lesson,
                'list_learn' => $list_learn,
                'total_duration' => $total_duration
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 200,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function GetUserCourse()
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $course_list = Course::where('AUTHOR_ID', $id)->where('COURSE_STATE', 'Công khai')->orWhere('COURSE_STATE', 'Bị khóa')->get();
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
    public function GetUserCourseApp()
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $mg = new MongoDB();
                $db = $mg->db;
                $approval = $db->Approval;
                $approvals = $approval->find(array('Author' => (int)$id))->toArray();
                $ans = array();
                foreach ($approvals as $item) {
                    $CourseType = Course_SubType::where('COURSE_SUBTYPE_ID', $item->SubCategory)->first();
                    $object = (object)[
                        '_id' => $item->_id,
                        'CourseTitle' => $item->CourseTitle,
                        'CourseIMG' => $item->Image,
                        'Fee' => $item->Price,
                        'CourseState' => $item->State,
                        'CourseCreate' => $item->Created_at,
                        'ActionType' => $item->ActionType,
                        'CourseType' => $CourseType->TYPE_NAME,

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
                $this_course = Course::where('COURSE_ID',$course_id)->first();
                $CourseType = Course_SubType::where('COURSE_SUBTYPE_ID',$this_course->COURSE_TYPE_ID)->first();
                $CourseMainType = Course_MainType::where('COURSE_MAINTYPE_ID',$CourseType->PARENT_TYPE_ID)->first();
                $chapters = Course_Chapter::where('COURSE_ID', $course_id);
                $lesson = 0;
                $lesson = Learning::where('USER_ID', $id)
                    ->whereIn('LESSON_ID',Lesson::whereIn('CHAPTER_ID', $chapters->get('COURSE_CHAPTER_ID'))->get('LESSON_ID'))
                    ->max('LESSON_ID');
                $firstlesson = Lesson::where('CHAPTER_ID', $chapters->min('COURSE_CHAPTER_ID'))->min('LESSON_ID');
                if ($lesson_id == "undefined" || $lesson_id > $lesson) {
                    $lesson_id = $lesson ? $lesson : $firstlesson;
                }
                $lesson = $lesson ? $lesson : -1;
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
                    'LearningURL' => Lesson::where('LESSON_ID', $lesson_id)->first()->LESSON_URL,
                    'Author' => Course::where('COURSE_ID', $course_id)->first()->AUTHOR_ID,
                    'CourseType'=>$CourseType,
                    'CourseMainType'=>$CourseMainType,
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
                'message' => $th->__toString(),
            ]);
        }
    }
    public function AddLearn(Request $request)
    {

        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                if (!Learning::where('USER_ID', $id)->where('LESSON_ID', $request->lesson_id)->first()) {
                    $learning = new Learning();
                    $learning->USER_ID = $id;
                    $learning->LESSON_ID = $request->lesson_id;
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
    function UpdateCourse(Request $request)
    {
        try {
            DB::beginTransaction();
            $file = $request->file('course-img');
            $path = 'img/course';
            $fileName = '';
            if ($file && $file->getClientOriginalExtension()) {
                $extension = $file->getClientOriginalExtension(); // you can also use file name
                $fileName = time() . '.' . $extension;
            }


            $course_data = json_decode($request->data);
            $course = Course::where('COURSE_ID', $course_data->CourseID)->first();
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->FEE = $course_data->Price;
            if ($file && $file->getClientOriginalExtension()) {
                $course->IMG = $path . "/" . $fileName;
            }
            $course->COURSE_DESC = $course_data->Description;
            $course->COURSE_STATE = $course_data->State;
            $course->COMMISSION = $course_data->Commisstion;
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->COURSE_TYPE_ID = $course_data->SubCategory;

            $course->save();
            Course_Require::where('COURSE_ID', $course_data->CourseID)->delete();
            Course_Gain::where('COURSE_ID', $course_data->CourseID)->delete();
            foreach ($course_data->ListIn as $value) {
                $course_require = new Course_Require();
                $course_require->CONTENT = $value->CONTENT;
                $course_require->COURSE_ID = $course->COURSE_ID;
                $course_require->save();
            }
            foreach ($course_data->ListOut as $value) {
                $course_gain = new Course_Gain();
                $course_gain->CONTENT = $value->CONTENT;
                $course_gain->COURSE_ID = $course->COURSE_ID;
                $course_gain->save();
            }
            foreach ($course_data->ListCourse as $value) {
                $course_chapter = new Course_Chapter();
                if ($value->id) {
                    $course_chapter = Course_Chapter::where('COURSE_CHAPTER_ID', $value->id)->first();
                }
                $course_chapter->CHAPTER_NAME = $value->title;
                $course_chapter->COURSE_ID = $course->COURSE_ID;
                $course_chapter->save();
                $Array2 = $value->lesson;
                foreach ($Array2 as $value2) {
                    $lesson = new Lesson();
                    if ($value2->id) {
                        $lesson = Lesson::where('LESSON_ID', $value2->id)->first();
                    }
                    $lesson->LESSON_NAME = $value2->title;
                    $lesson->LESSON_URL = $value2->url;
                    $lesson->DURATION = $value2->duration;
                    $lesson->CHAPTER_ID = $course_chapter->COURSE_CHAPTER_ID;

                    $lesson->save();
                }
            }
            DB::commit();
            if ($file && $file->getClientOriginalExtension())
                $file->move($path, $fileName);

            return response()->json([
                'status' => 200,
                'message' => 'Sửa khóa học thành công'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 400,
                'message' => $th->__toString(),
            ]);
        }
    }
    function UpdateCourseApp(Request $request)
    {
        try {
            $mg = new MongoDB();
            $course_data = $mg->db->Approval->findOneAndDelete(array('_id' => new ObjectId($request->_id['$oid'])));

            DB::beginTransaction();
            $course = Course::where('COURSE_ID', $course_data->CourseID)->first();
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->FEE = $course_data->Price;
            $course->IMG = $course_data->Image;
            $course->COURSE_DESC = $course_data->Description;
            $course->COURSE_STATE = 'Công khai';
            $course->COMMISSION = $course_data->Commisstion;
            $course->COURSE_NAME = $course_data->CourseTitle;
            $course->COURSE_TYPE_ID = $course_data->SubCategory;

            $course->save();
            Course_Require::where('COURSE_ID', $course_data->CourseID)->delete();
            Course_Gain::where('COURSE_ID', $course_data->CourseID)->delete();
            foreach ($course_data->ListIn as $value) {
                $course_require = new Course_Require();
                $course_require->CONTENT = $value->CONTENT;
                $course_require->COURSE_ID = $course->COURSE_ID;
                $course_require->save();
            }
            foreach ($course_data->ListOut as $value) {
                $course_gain = new Course_Gain();
                $course_gain->CONTENT = $value->CONTENT;
                $course_gain->COURSE_ID = $course->COURSE_ID;
                $course_gain->save();
            }
            foreach ($course_data->ListCourse as $value) {
                $course_chapter = new Course_Chapter();
                if ($value->id) {
                    $course_chapter = Course_Chapter::where('COURSE_CHAPTER_ID', $value->id)->first();
                }
                $course_chapter->CHAPTER_NAME = $value->title;
                $course_chapter->COURSE_ID = $course->COURSE_ID;
                $course_chapter->save();
                $Array2 = $value->lesson;
                foreach ($Array2 as $value2) {
                    $lesson = new Lesson();
                    if ($value2->id) {
                        $lesson = Lesson::where('LESSON_ID', $value2->id)->first();
                    }
                    $lesson->LESSON_NAME = $value2->title;
                    $lesson->LESSON_URL = $value2->url;
                    $lesson->DURATION = $value2->duration;
                    $lesson->CHAPTER_ID = $course_chapter->COURSE_CHAPTER_ID;

                    $lesson->save();
                }
            }
            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'Sửa khóa học thành công'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 400,
                'message' => $th->__toString(),
            ]);
        }
    }
    public function AddCourseApproval(Request $request)
    {
        try {


            $mg = new MongoDB();
            $db = $mg->db;
            $approval = $db->Approval;
            $store_data = json_decode($request->data);
            $path = 'img/course';

            $file = $request->file('course-img');
            if ($file) {
                $extension = $file->getClientOriginalExtension(); // you can also use file name
                $fileName = time() . '.' . $extension;
                $store_data->Image =  $path . "/" . $fileName;
                $file->move($path, $fileName);
            }
            $store_data->Image = ltrim($store_data->Image, "/");
            $approval->insertOne($store_data);
            return response()->json([
                'status' => 200,
                'message' => 'Thành công'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th->__toString(),
            ]);
        }
    }
    public function GetRegisteredCourse()
    {

        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $courseEnrolled = DB::select("SELECT c.*, u.FULLNAME, e.*,a.paid
                FROM enrollments e join courses c on e.COURSE_ID = c.COURSE_ID 
                join users u on u.USER_ID = c.AUTHOR_ID
                join (select ENROLLMENT_ID,sum(AMOUNT) as paid from payments group by ENROLLMENT_ID) a on a.enrollment_id = e.ENROLLMENT_ID 
                where e.USER_ID=$id
                ");
                return response()->json([
                    'status' => 200,
                    'message' => $courseEnrolled,
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
    public function GetOverview()
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $enroll = DB::select("SELECT e.*
                from enrollments e join courses c on e.COURSE_ID = c.COURSE_ID
                where c.AUTHOR_ID = $id");
                $payments = DB::select("SELECT p.*, e.ENROLL_TIME
                from payments p  join enrollments e on p.ENROLLMENT_ID = e.ENROLLMENT_ID
                where p.RECEIVER_ID = $id");
                $ans = (object)[
                    'payments' => $payments,
                    'learns' => Learning::where('USER_ID', $id)->get(),
                    'enrollments' => $enroll
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
    public function GetReviewsByCourseId(Request $request)
    {
        try {
            $review_list = DB::table('course_reviews')
                ->where('course_id', $request->course_id)->get();
            $ans = array();
            foreach ($review_list as $review) {
                $user = DB::table('users')
                    ->where('user_id', $review->USER_ID)->first();
                $obj = (object)[
                    'user' => $user,
                    'review_content' => $review->CONTENT,
                    'review_state' => $review->COURSE_REVIEW_STATE
                ];
                array_push($ans, $obj);
            }
            return response()->json([
                'status' => 200,
                'message' => $ans
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th->getMessage()
            ]);
        }
    }
    public function AddCourseReview(Request $request)
    {
        try {
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
                $review = new Course_Review();
                $review->USER_ID = $id;
                $review->COURSE_ID = $request->course_id;
                $review->COURSE_REVIEW_STATE = $request->state;
                $review->CONTENT = $request->content;
                $review->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Thêm course_review thành công'
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
                'message' => $th->getMessage(),
            ]);
        }
    }
}
