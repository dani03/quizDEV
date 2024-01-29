<?php

namespace App\Http\Repositories\Domains;

use App\Models\Domain;

class DomainRepository
{
    public function __construct(private Domain $domain) {

    }

    public function  create(array $data) {
       return Domain::create($data);
    }
}
