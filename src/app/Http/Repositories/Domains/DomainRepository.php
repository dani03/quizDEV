<?php

namespace App\Http\Repositories\Domains;

use App\Models\Domain;

class DomainRepository
{
    public function  create(array $data) {
       return Domain::create($data);
    }
}
