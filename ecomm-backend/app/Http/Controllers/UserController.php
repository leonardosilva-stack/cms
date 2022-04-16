<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //
    function register(Request $req)
    {
        $validated = $req->validate([
            'email' => 'unique:users|email',
        ]);


        $user = new User;
        $user->name= $req->input('name');
        $user->email= $req->input('email');
        $user->password= Hash::make($req->input('password'));
        $user->save();
        return $user;
    }
    function login(Request $req){

        $user= User::where('email',$req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password)){
            return ["error"=>"Email or password is not matched"];
        }
        return $user;
    }
}
