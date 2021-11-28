<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

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
            // $validator = Validator::make($request->all(),[
            //     'name'=>'required|max:191',
            //     'email'=>'required|email|max:191',
            // ]);
    
            
                // echo "<script>console.log('Debug Objects: " . 'loi ig gig ' . "' );</script>";
                // return response()->json([
                //     'status'=> 422,
                //     'validationErrors'=> $validator->messages(),
                // ]);
            
            
                $user = User::where("email",$request->email)->first();
                
                
                $user->name = $request->name;
                $user->update();
                return response()->json([
                    'status'=> 200,
                    'message'=>'User Updated Successfully',
                    'User'=>$user,
                ]);
                
                      
        } catch (\Throwable $th) {

        }
     
    }

}