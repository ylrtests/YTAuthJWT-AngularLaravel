<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB, Hash;
use App\Mail\ResetPasswordMail;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;

class PasswordController extends Controller
{
    public function sendEmail(Request $request){
       
       if($this->validateEmail($request->email)){
            $this->send($request->email);
            return $this->successResponse('Email has been sent.');
       }

        return $this->failedResponse('Email not found');
    }

    public function send($email){
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    private function createToken($email){
        $oldToken = DB::table('password_resets')->where('email',$email)->first();
        
        if($oldToken){
            return $oldToken->token;
        }
          
        $token = str_random(68);
        $this->saveToken($token, $email);
        return $token;

    }

    private function saveToken($token, $email){
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email){
        return !!User::where('email', $email)->first();
    }

    public function changePassword(Request $request){
        $tokenFoundData =  $this->checkToken($request->resetToken);

        if($tokenFoundData){
            
            $password = $request->password;
            $confirmPassword = $request->confirmPassword;

            //Contraseñas no son iguales
            if($password != $confirmPassword){
                return $this->failedResponse('Passwords don\'t match');
            }

            //Contraseñas y Token Válido
            $this->removeToken($request->resetToken);

            $newPassword =  Hash::make($password);
            DB::table('users')
            ->where('email', $tokenFoundData->email)
            ->update(['password' => $newPassword]);

            return $this->successResponse('Password changed.');
        }

        //error
        return $this->failedResponse('Token is not valid');
    }

    private function checkToken($token){
        return DB::table('password_resets')->where('token',$token)->first();
    }

    private function removeToken($token){
        DB::table('password_resets')->where('token',$token)->delete();
    }

    public function failedResponse($errorMessage){
        return response()->json([
            'success' => false,
            'error' => $errorMessage,
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse($message){
        return response()->json([
            'success' => true,
            'data' => $message,
        ], Response::HTTP_OK);
    }

    
}
