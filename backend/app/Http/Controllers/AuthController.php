<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator, DB, Hash, Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use JWTAuth;

use App\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Incorrect username or password.'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     *  Users signs up and redirects if process is valid to login method
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signup(Request $request)
    {
        //TODO validate password and matchpassword

        $credentials = $request->only('name', 'email', 'password', 'username');

        //Backend Validation 
        $rules = [
            'name' => 'required|max:255',
            'username' => 'required|max:255|unique:users',
            'email' => 'required|max:255|email|unique:users',
            'password' => 'required|min:6|'
        ];

        $validator = Validator::make($credentials, $rules);

        // Fallo la validación del validador
        if($validator->fails()) {
            return response()->json([
                'success'=> false, 
                'error'=> $validator->messages()
                ]);
        }
        
        $name = $request->name;
        $username = $request->username;
        $email = $request->email;
        $password = $request->password;
        $confirmPassword = $request->confirmPassword;

        //Contraseñas no son iguales
        if($password != $confirmPassword){
            return response()->json([
                'success'=> false, 
                'error'=> 'Password do not match.'
                ]);
        }
        
        try{
            $user = User::create([
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'password' => Hash::make($password)
            ]);
        }
        catch(QueryException  $e){
            return response()->json([
                'success'=> false, 
                'message'=> $e->errorInfo
            ]);
        }
        
       return $this->login($request);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->name
        ]);
    }
}