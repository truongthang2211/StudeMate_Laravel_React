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
            setcookie("email", $user->email, time() + 60 * 60*24, "/");
            return response()->json([
                'status' => 200,
                'message' => 'Đăng ký thành công'
            ]);
        }
        return response()->json([
            'status' => 400,
            'message' => 'Email hoặc username đã tồn tại'
        ]);
    }
    public function test(Request $request)
    {

        $value = $request->cookie('username');
        dd($_COOKIE['username']);
    }
    public function SignIn(Request $request)
    {
        $status_code = 200;
        $message = "Đăng nhập thành công";
        try {
        $User = User::where('email',$request->username)->orWhere('username',$request->username)->first();
        if ($User){
            if(!password_verify($request->password, $User->password)){
                $status_code = 400;
                $message = "Sai mật khẩu";
            }else{
                setcookie("email", $User->email, time() + 60 * 60*24, "/");
            }
            
        } else {
            $status_code = 400;
            $message = 'Email hoặc username không tồn tại';
        }
        return response()->json([
            'status' => $status_code,
            'message' => $message,
        ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 404,
                'message' => $th->getMessage(),
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
