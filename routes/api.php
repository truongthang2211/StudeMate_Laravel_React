<?php
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CourseController;
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

Route::post('/sign-up', [LoginController::class,'SignUp']);
Route::post('/sign-in', [LoginController::class,'SignIn']);
Route::post('/create-course', [CourseController::class,'CreateCourse']);
Route::post('/add-learn', [CourseController::class,'AddLearn']);
Route::get('/my-course', [CourseController::class,'GetUserCourse']);
Route::get('get-learn/{course_id}/{lesson_id}', [CourseController::class, 'GetLearning']);


Route::get('/sign-out', [LoginController::class,'SignOut']);

