<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Question;
use App\Models\Role;
use App\Policies\QuestionPolicy;
use Carbon\Carbon;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Question::class => QuestionPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Passport::personalAccessTokensExpireIn(Carbon::now()->addMinutes(120));
        Passport::refreshTokensExpireIn(Carbon::now()->addMinutes(120));

        //on définit une gate afin de restreindre l'accès de certaines fonctionnalités
        Gate::define('create-level', function($user) {
            return $user->role_id === Role::ROLE_ADMINISTRATOR ? Response::allow()
                : Response::deny('Vous n\'avez pas les droits pour effectuer cette action.');
        });

        Gate::define('create-question', [QuestionPolicy::class, 'create']);
    }
}
