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
                'name'=>'required|max:191',
                'phone'=>'required|max:12',
                'city_id'=>'required|max:191',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=> 422,
                    'validationErrors'=> $validator->messages(),
                ]);
            }
            
            else{
                $user = User::where("email",$request->email)->first();
                
                $user->name = $request->name;
                $user->date_of_birth = $request->date_of_birth;
                $user->city_id = $request->city_id;
                $user->phone = $request->phone;
                $user->school_id = $request->school_id;
                $user->facebook = $request->facebook;

                $user->avatar = $request->avatar;
                //$user->background_img = $request->background_img;

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
                $user = User::where("email",$request->email)->first();

                if ($user && password_verify($request->currentPassword, $user->password)) {

                    $user->password = bcrypt($request->newPassword);
                    $user->update();
                    return response()->json([
                        'status'=> 200,
                        'message'=>'Password Updated Successfully',
                        'User'=>$user,
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