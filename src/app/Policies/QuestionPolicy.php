<?php

namespace App\Policies;

use App\Models\Question;
use App\Models\Role;
use App\Models\User;


class QuestionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Question $question): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user):bool
    {
        // on vérifie si l'utilisateur à un role admin ou un role entreprise
        return $user->role_id === Role::ROLE_ADMINISTRATOR || $user->role_id === Role::ROLE_ENTREPRISE;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Question $question): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Question $question): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Question $question): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Question $question): bool
    {
        return false;
    }
}
