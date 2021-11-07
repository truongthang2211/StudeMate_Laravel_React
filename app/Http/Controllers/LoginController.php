<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function SignUp(Request $request)
    {
        $UserExist = User::where('username', $request->username)->orWhere('email', $request->email)->first();
        if (!$UserExist) {
            $user = new User();
            $user->username = $request->input('username');
            $user->name = $request->input('username');
            $user->password = bcrypt($request->input('password'));
            $user->email = $request->input('email');
            $user->save();
            setcookie("email", $user->email, time() + 60 * 5, "/");
            return response()->json([
                'status' => 200,
                'message' => 'Sign up thanh cong'
            ]);
        }
        return response()->json([
            'status' => 404,
            'message' => 'Sign up 0 thanh cong'
        ]);
    }
    public function test(Request $request)
    {

        $value = $request->cookie('username');
        dd($_COOKIE['username']);
    }
    public function SignIn(Request $request)
    {
        
        $User = User::where('email',$request->username)->orWhere('username',$request->username)->first();
        if ($User && password_verify($request->password, $User->password)) {
            setcookie("email", $User->email, time() + 60 * 5, "/");
            return response()->json([
                'status' => 200,
                'message' => 'Sign in thanh cong',
                
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Sign in that bai',
            ]);
        }
      
        
    }
    public function SignOut(){
        if (isset($_COOKIE['email'])) {
            setcookie("email", "", time(), "/");
            
        }
        return response()->json([
            'status' => 200,
            'message' => 'Sign out thanh cong',
        ]);
    }
    public function GetCurrentUser()
    {
        try {
            if (isset($_COOKIE['email'])) {
                $email = $_COOKIE['email'];
                $user = User::where('email', $email)->first();
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
}
