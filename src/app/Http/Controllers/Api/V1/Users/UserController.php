<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{


    public function index() {
        $this->authorize('basic-user');


        return response()->json(['success' => true]);
    }
}
