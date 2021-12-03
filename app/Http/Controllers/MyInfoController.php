<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MyInfoController extends Controller{

    public function EditMyInfo() {
        $user = User::all();

        return response()->json([
            'status'=> 200,
            'user'=>$user,
        ]);
    }

    public function UpdateMyInfo(Request $request) {
        try {

            $validator = Validator::make($request->all(),[
                'FULLNAME'=>'required|max:191',
                'PHONE'=>'required|max:12',
                'CITY_ID'=>'required|max:191',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=> 422,
                    'validationErrors'=> $validator->messages(),
                ]);
            }
            
            else{
                $user = User::where("EMAIL",$request->EMAIL)->first();
                
                $user->FULLNAME = $request->FULLNAME;
                $user->DATE_OF_BIRTH = $request->DATE_OF_BIRTH;
                $user->CITY_ID = $request->CITY_ID;
                $user->PHONE = $request->PHONE;
                $user->SCHOOL_ID = $request->SCHOOL_ID;
                $user->FACEBOOK = $request->FACEBOOK;

                //$user->AVATAR_IMG = $request->AVATAR_IMG;
                //$user->BACKGROUND_IMG = $request->BACKGROUND_IMG;

                $user->update();
                return response()->json([
                    'status'=> 200,
                    'message'=>'User Updated Successfully',
                    'User'=>$user,
                ]);
            }
                      
        } catch (\Throwable $th) {

        }
    }

    public function UpdatePassword(Request $request) {
        try {

            $validator = Validator::make($request->all(),[
                'currentPassword'=>'required|max:191|min:5',
                'newPassword'=>'required|max:191|min:5',
                'confirmPassword'=>'required|max:191|min:5',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=> 422,
                    'validationErrors'=> $validator->messages(),
                ]);
            }
            
            else{
                $acc = Account::where("USERNAME",$request->USERNAME)->first();

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

        }
     
    }

}