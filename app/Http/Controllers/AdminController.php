<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;
use App\Models\Course_SubType;
use App\Models\Account;
use App\Models\Course_Require;
use App\Models\Course_Gain;
use App\Models\Notification;
use App\Models\Course_Chapter;
use App\Models\MongoDB;
use App\Models\Approval;
use App\Models\Lesson;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\ObjectId;

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
    public function GetUsers()
    {
        try {

            return response()->json([
                'status' => 200,
                'message' => User::all()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }

    public function Overview()
    {
        try {
            if (isset($_COOKIE['StudyMateAdmin'])) {
                $id = $_COOKIE['StudyMateAdmin'];
                $UserToDay = Account::whereRaw('DATE(CREATED_AT)=CURRENT_DATE')->count();
                $UserYesterDay = Account::whereRaw('DATE(CREATED_AT)=SUBDATE(CURRENT_DATE(),1)')->count();
                $RevenueToDay = DB::table('enrollments')->whereRaw('DATE(ENROLL_TIME)=CURRENT_DATE')->join('payments', 'enrollments.enrollment_id', '=', 'payments.enrollment_id')->where('RECEIVER_ID', $id)->sum('AMOUNT');
                $RevenueYesterDay = DB::table('enrollments')->whereRaw('DATE(ENROLL_TIME)=SUBDATE(CURRENT_DATE(),1)')->join('payments', 'enrollments.enrollment_id', '=', 'payments.enrollment_id')->where('RECEIVER_ID', $id)->sum('AMOUNT');
                $TotalRevenue = DB::table('payments')->where('RECEIVER_ID', $id)->sum('AMOUNT');


                $topCourse =  DB::select("SELECT C.COURSE_ID , c.COURSE_NAME, IFNULL(registered,0) as registered
                FROM COURSES C 
                LEFT JOIN (SELECT COURSE_ID, COUNT(*) as registered
                          FROM enrollments 
                          GROUP BY enrollments.COURSE_ID) a on c.COURSE_ID = a.Course_ID
                ORDER BY registered DESC
                LIMIT 5");

                $topUser = DB::select("SELECT USERS.USER_ID,USERS.FULLNAME,IFNULL(voted,0) as voted
                FROM USERS
                LEFT JOIN (
                    SELECT COMMENTS.USER_ID, COUNT(*) as voted
                    FROM COMMENTS JOIN (SELECT COMMENT_ID
                                               FROM COMMENT_VOTES
                                            WHERE COMMENT_VOTE_STATE = 1) as B ON COMMENTS.COMMENT_ID = B.COMMENT_ID
                    GROUP BY USER_ID
                ) as C ON USERS.USER_ID=C.USER_ID
                ORDER BY voted DESC
                LIMIT 5");

                $payments = DB::select(@"SELECT * FROM PAYMENTS P JOIN Enrollments E ON P.ENROLLMENT_ID = E.ENROLLMENT_ID WHERE RECEIVER_ID = " . $id);
                $ans = (object)[
                    'UserToDay' => $UserToDay,
                    'UserYesterDay' => $UserYesterDay,
                    'RevenueToDay' => $RevenueToDay,
                    'RevenueYesterDay' => $RevenueYesterDay,
                    'TotalRevenue' => $TotalRevenue,
                    'topCourse' => $topCourse,
                    'topUser' => $topUser,
                    'Courses' => Course::all(),
                    'Accounts' => Account::all(),
                    'Payments' => $payments,
                ];
                return response()->json([
                    'status' => 400,
                    'message' => $ans
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
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
    public function GetCourseByID(Request $request)
    {
        try {
            $course = Course::where('COURSE_ID', $request->course_id)->first();
            $main_type = Course_SubType::where('COURSE_SUBTYPE_ID', $course->COURSE_TYPE_ID)->first()->PARENT_TYPE_ID;
            $list_in = Course_Require::where('COURSE_ID', $request->course_id)->get();
            $list_out = Course_Gain::where('COURSE_ID', $request->course_id)->get();
            $list_chapter = Course_Chapter::where('COURSE_ID', $request->course_id)->get();
            $list_course = array();
            foreach ($list_chapter as $chapter) {
                $list_lesson = Lesson::where('CHAPTER_ID', $chapter->COURSE_CHAPTER_ID)->get();
                $object = (object)['title' => $chapter->CHAPTER_NAME, 'type' => 'chapter', 'id' => $chapter->COURSE_CHAPTER_ID];
                array_push($list_course, $object);
                foreach ($list_lesson as $lesson) {
                    $object2 = (object)[
                        'id' => $lesson->LESSON_ID,
                        'title' => $lesson->LESSON_NAME,
                        'URL' => $lesson->LESSON_URL,
                        'type' => 'lesson',
                        'error' => false,
                    ];
                    array_push($list_course, $object2);
                }
            }


            $ans = (object)[
                'CourseID' => $course->COURSE_ID,
                'Author' => $course->AUTHOR_ID,
                'Category' => $main_type,
                'CourseTitle' => $course->COURSE_NAME,
                'Description' => $course->COURSE_DESC,
                'Price' => (int)$course->FEE,
                'Image' => '/' . $course->IMG,
                'SubCategory' => $course->COURSE_TYPE_ID,
                'ListIn' => $list_in,
                'ListOut' => $list_out,
                'ListCourse' => $list_course,
            ];
            return response()->json([
                'status' => 200,
                'message' => $ans
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
    function GetCreateCourseApproval()
    {
        try {
            $mg = new MongoDB();
            $db = $mg->db;
            $approval = $db->Approval;
            $approvals = $approval->find()->toArray();
            $ans = array();
            foreach ($approvals as $item) {
                $Author = User::where('USER_ID', $item->Author)->first();
                $CourseType = Course_SubType::where('COURSE_SUBTYPE_ID', $item->SubCategory)->first();
                $object = (object)[
                    '_id' => $item->_id,
                    'CourseTitle' => $item->CourseTitle,
                    'Fee' => $item->Price,
                    'CourseState' => $item->State,
                    'Commission' => $item->Commisstion,
                    'CourseCreate' => $item->Created_at,
                    'ActionType' => $item->ActionType,
                    'CourseType' => $CourseType->TYPE_NAME,
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
                'message' => $th->__toString(),
            ]);
        }
    }
    public function GetLearningAppById(Request $request)
    {
        try {
            $mg = new MongoDB();
            $approval = $mg->db->Approval;
            $learning = $approval->findOne(array('_id' => new ObjectId($request->course_id)));

            $ListLearn = array();
            foreach ($learning->ListCourse as $chapter) {
                $lessoninchapter = array();
                foreach ($chapter->lesson as $lesson) {
                    $object2 = (object)[
                        'LESSON_ID' => null,
                        'LESSON_NAME' => $lesson->title,
                        'LESSON_URL' => $lesson->url,
                        'DURATION' => $lesson->duration,
                    ];
                    array_push($lessoninchapter, $object2);
                }
                $object = (object)[
                    'ChapterTitle' => $chapter->title,
                    'Lesson' => $lessoninchapter
                ];
                array_push($ListLearn, $object);
            }
            $ans = (object) [
                'CourseTitle' => $learning->CourseTitle,
                'ListLearn' => $ListLearn,
                'LastLessonLearnt' => -1,
                'LearningURL' => $learning->ListCourse[0]->lesson[0]->url,
                'Author' => $learning->Author,

            ];
            return response()->json([
                'status' => 200,
                'message' => $ans,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th->__toString(),
            ]);
        }
    }
    public function LockCourseAction(Request $request)
    {
        try {
            DB::beginTransaction();

            $course = Course::where('COURSE_ID', $request->course_id)->first();
            $noti = new Notification();
            $noti->USER_ID =  $course->AUTHOR_ID;
            $noti->READ_STATE = 0;
            if ($course && $course->COURSE_STATE == 'Công khai') {
                $course->COURSE_STATE = 'Bị khóa';
                $noti->CONTENT = 'Khóa học ' . $course->COURSE_NAME . ' đã bị khóa với lý do: ' .  $request->reason;
            } else if ($course && $course->COURSE_STATE == 'Bị khóa') {
                $course->COURSE_STATE = 'Công khai';
                $noti->CONTENT = 'Khóa học ' . $course->COURSE_NAME . ' đã được mở khóa';
            }
            $course->save();
            $noti->save();
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Thành công'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 400,
                'message' => $th->__toString(),
            ]);
        }
    }
    public function AdminLogin(Request $request)
    {
        $status_code = 200;
        $message = "Đăng nhập thành công";
        try {
            $User = User::where('email', $request->username)->first();
            $Account = Account::where('username', $request->username)->first();
            $ID = $User ? $User->USER_ID : ($Account ? $Account->USER_ID : null);
            $Account = $Account ? $Account : Account::where('user_id', $ID)->first();
            if (($User || $Account) && $Account->ACCOUNT_ROLE == 'Admin') {
                if (!password_verify($request->password, $Account->PWD)) {
                    $status_code = 400;
                    $message = "Sai mật khẩu";
                } else {
                    setcookie("StudyMateAdmin", $ID, time() + 60 * 60 * 24, "/");
                }
            } else {

                $status_code = 400;
                $message = 'Email hoặc username không hợp lệ';
            }
            return response()->json([
                'status' => $status_code,
                'message' => $message,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 404,
                'message' => $ID,
            ]);
        }
    }
    public function GetCurrentUser()
    {
        try {
            if (isset($_COOKIE['StudyMateAdmin'])) {
                $id = $_COOKIE['StudyMateAdmin'];
                $user = User::where('USER_ID', $id)->first();
                return response()->json([
                    'status' => 200,
                    'message' => 'Lay User thanh cong',
                    'user' => $user
                ]);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'Cookies het han',
                    'user' => null
                ]);
            }
        } catch (\Throwable $th) {
            return $th;
        }
    }
    public function GetApprovaled(){
        try {

            return response()->json([
                'status' => 200,
                'message' => Approval::all()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
    public function GetUserByID(Request $request)
    {
        try {
           
            return response()->json([
                'status' => 200,
                'message' => User::where('USER_ID',$request->user_id)->first()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th,
            ]);
        }
    }
}
