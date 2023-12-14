<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name'];

    # nrelation many to many : on lit
    # un role à plusieurs permissions
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }
}
