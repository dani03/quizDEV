<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{

    public function index() {

        $this->authorize('entreprise-user');

        return response()->json(['success' => true]);

    }
}
