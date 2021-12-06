<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\MyInfoController;
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
Route::post('/create-course', [CourseController::class, 'CreateCourse']);
Route::post('/add-learn', [CourseController::class, 'AddLearn']);
Route::post('/get-comments', [CommentController::class, 'GetListCommentByLesson']);
Route::post('/add-comment', [CommentController::class, 'AddComment']);
Route::get('/my-course', [CourseController::class, 'GetUserCourse']);
Route::get('get-learn/{course_id}/{lesson_id}', [CourseController::class, 'GetLearning']);
Route::get('/get-courses', [CourseController::class, 'GetCourses']);
Route::get('/get-list-course', [AdminController::class, 'CourseList']);


Route::get('/sign-out', [LoginController::class, 'SignOut']);
Route::get('/myinfo', [MyInfoController::class,'EditMyInfo']);
Route::post('/update-myinfo', [MyInfoController::class, 'UpdateMyInfo']);
Route::put('/update-password', [MyInfoController::class, 'UpdatePassword']);
