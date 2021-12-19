<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MyInfoController extends Controller {

    public function EditMyInfo() {
        $user = User::all();

        return response()->json([
            'status'=> 200,
            'user'=>$user,
        ]);
    }

    public function UpdateMyInfo(Request $request) {
        try {

            
                
                $userData = json_decode($request->data);
                $user = User::where("EMAIL",$userData->EMAIL)->first();
                
                $user->FULLNAME = $userData->FULLNAME;
                $user->DATE_OF_BIRTH = $userData->DATE_OF_BIRTH;
                $user->CITY_ID = $userData->CITY_ID;
                $user->PHONE = $userData->PHONE;
                $user->SCHOOL = $userData->SCHOOL;
                $user->FACEBOOK = $userData->FACEBOOK;
                $user->BIO = $userData->BIO;
                if ($request->file('avatar-img')){
                    $file = $request->file('avatar-img');
                    $path = 'img/user/avatar';
                    $extension = $file->getClientOriginalExtension();
                    $fileName = time() . '.' . $extension;
                    $file->move($path, $fileName);
                    $user->AVATAR_IMG = $path . "/". $fileName;
                }
                if ($request->file('background-img')){
                    $file = $request->file('background-img');
                    $path = 'img/user/background';
                    $extension = $file->getClientOriginalExtension();
                    $fileName = time() . '.' . $extension;
                    $file->move($path, $fileName);
                    $user->BACKGROUND_IMG = $path . "/". $fileName;
                }
                //$user->BACKGROUND_IMG = $request->BACKGROUND_IMG;

                $user->update();
                return response()->json([
                    'status'=> 200,
                    'message'=>'User Updated Successfully',
                    'User'=>$user,
                ]);
                      
        } catch (\Throwable $th) {
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
    }

    public function UpdatePassword(Request $request) {
        try {

            $validator = Validator::make($request->all(),[
                'currentPassword'=>'required',
                'newPassword'=>'required|min:5',
                'confirmPassword'=>'required|min:5',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=> 422,
                    'validationErrors'=> $validator->messages(),
                ]);
            }
            
            else{
                $acc = Account::where("USER_ID",$request->USER_ID)->first();

                if ($acc && password_verify($request->currentPassword, $acc->PWD)) {

                    $acc->PWD = bcrypt($request->newPassword);
                    $acc->update();
                    return response()->json([
                        'status'=> 200,
                        'message'=>'Password Updated Successfully',
                        'Account'=>$acc,
                    ]);
                }

                else
                {
                    return response()->json([
                        'status'=> 404,
                        'message' => 'Fails',
                    ]);
                }
            }      
        } catch (\Throwable $th) {
            return response()->json([
                'status'=> 422,
                'message'=>$th->getMessage(),
            ]);
        }
     
    }

}