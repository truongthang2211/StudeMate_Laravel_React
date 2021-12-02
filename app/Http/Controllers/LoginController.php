<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function SignUp(Request $request)
    {
        try {
            $EmailExist = User::where('email', $request->email)->first();
            $UsernameExist = Account::where('username', $request->username)->first();
            if (!$EmailExist && !$UsernameExist) {
                $user = new User();
                $user->fullname = $request->username;
                $user->email = $request->email;
                $user->save();
                $account = new Account();
                $account->username = $request->username;
                $account->pwd = bcrypt($request->password);
                $account->user_id = $user->id;
                $account->account_role = 'User';
                $account->save();
                setcookie("email", $user->email, time() + 60 * 60 * 24, "/");
                return response()->json([
                    'status' => 200,
                    'message' => 'Đăng ký thành công'
                ]);
            }
            return response()->json([
                'status' => 400,
                'message' => 'Email hoặc username đã tồn tại'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => $th
            ]);
        }
    }

    public function SignIn(Request $request)
    {
        $status_code = 200;
        $message = "Đăng nhập thành công";
        try {
            $User = User::where('email', $request->username)->first();
            $Account = Account::where('username', $request->username)->first();
            $ID=$User?$User->id:($Account?$Account->USER_ID:null);
            if ($User || $Account) {
                if (!password_verify($request->password, $Account->PWD)) {
                    $status_code = 400;
                    $message = "Sai mật khẩu";
                } else {
                    setcookie("StudyMate", $ID, time() + 60 * 60 * 24, "/");
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
    public function SignOut()
    {
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
            if (isset($_COOKIE['StudyMate'])) {
                $id = $_COOKIE['StudyMate'];
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
}
