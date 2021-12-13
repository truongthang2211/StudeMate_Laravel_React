<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\MyInfoController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/sign-up', [LoginController::class, 'SignUp']);
Route::post('/sign-in', [LoginController::class, 'SignIn']);
Route::post('/action-course', [CourseController::class, 'CreateorDelCourse']);
Route::post('/create-course-approval', [CourseController::class, 'AddCourseApproval']);
Route::post('/add-learn', [CourseController::class, 'AddLearn']);
Route::post('/get-comments', [CommentController::class, 'GetListCommentByLesson']);
Route::post('/add-comment', [CommentController::class, 'AddComment']);
Route::post('/comment-vote', [CommentController::class, 'VoteComment']);
Route::get('/my-course', [CourseController::class, 'GetUserCourse']);
Route::get('get-learn/{course_id}/{lesson_id}', [CourseController::class, 'GetLearning']);
Route::get('/get-list-course', [AdminController::class, 'CourseList']);
Route::get('/get-list-createapp', [AdminController::class, 'GetCreateCourseApproval']);
Route::get('/get-list-user', [AdminController::class, 'GetUsers']);
Route::post('/get-user', [AdminController::class, 'GetUserByID']);
Route::post('/get-course', [AdminController::class, 'GetUserByID']);
Route::post('/get-learn-app', [AdminController::class, 'GetLearningAppById']);
Route::get('/get-overview', [AdminController::class, 'Overview']);
Route::post('/lock-course-action', [AdminController::class, 'LockCourseAction']);
Route::post('/update-course', [CourseController::class, 'UpdateCourse']);


Route::get('/get-courses-homepage', [CourseController::class, 'GetCourseHomePage']);
Route::get('/get-courses', [CourseController::class, 'GetCourses']);
Route::post('/get-courses-by-subtype', [CourseController::class, 'GetCoursesBySubtype']);
Route::post('/get-courses-by-maintype', [CourseController::class, 'GetCoursesByMaintype']);
Route::post('/get-course-detail', [CourseController::class, 'GetCourseDetailByCourseId']);


Route::get('/sign-out', [LoginController::class, 'SignOut']);
Route::get('/myinfo', [MyInfoController::class, 'EditMyInfo']);
Route::post('/update-myinfo', [MyInfoController::class, 'UpdateMyInfo']);
Route::put('/update-password', [MyInfoController::class, 'UpdatePassword']);

Route::get('/get-city', [ProfileController::class, 'GetCity']);
Route::post('/get-course-item', [ProfileController::class, 'GetProfileCourseItem']);
Route::post('/get-course-info', [ProfileController::class, 'GetCourseInfo']);
Route::post('/get-author', [ProfileController::class, 'GetAuthor']);