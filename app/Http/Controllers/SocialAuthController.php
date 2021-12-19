<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Account;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Chuyển hướng người dùng sang OAuth Provider.
     *
     * @return Response
     */
    public function redirectToProvider($provider)
    {
        if (!Session::has('pre_url')) {
            Session::put('pre_url', URL::previous());
        } else {
            if (URL::previous() != URL::to('login')) Session::put('pre_url', URL::previous());
        }
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Lấy thông tin từ Provider, kiểm tra nếu người dùng đã tồn tại trong CSDL
     * thì đăng nhập, ngược lại nếu chưa thì tạo người dùng mới trong SCDL.
     *
     * @return Response
     */
    public function handleProviderCallback($provider)
    {

        $user = Socialite::driver($provider)->stateless()->user();
        $authUser = $this->findOrCreateUser($user, $provider);
        // dd($authUser->email);
        setcookie("email", $authUser->email, time() + 60 * 15, "/");
        dd(Session::get('pre_url'));
        return Redirect::to(Session::get('pre_url'));
    }

    /**
     * @param  $user Socialite user object
     * @param $provider Social auth provider
     * @return  User
     */
    public function findOrCreateUser($user, $provider)
    {
        // dd($user);
        try {
            $authUser = User::where('email', $user->email)->first();
            if ($authUser) {
                return $authUser;
            }
            DB::beginTransaction();
            $account = new Account();
            $account->USERNAME = $user->email;
            $account->ACCOUNT_ROLE = 'User';
            $account->save();
            $newuser = new User();
            $newuser->FULLNAME = $user->name;
            $newuser->EMAIL = $user->email;
            $newuser->AVATAR_IMG = $user->avatar;
            DB::commit();
            return $newuser;
        } catch (\Throwable $th) {
            DB::rollBack();

        }


        
    }
}
