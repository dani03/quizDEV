<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TestController extends Controller
{

    public function testingMethod() {
       // $permissions = Permission::whereHas('roles')->get();


        $permissions = Permission::whereHas('roles', function($query) {
        dd(auth()->user());
            $query->where('Role.id', auth()->user()->role_id);

        })->get();
        dd($permissions);
        foreach($permissions as $permission) {
            Gate::define($permission->name, fn() => true);
        }
    }
}
