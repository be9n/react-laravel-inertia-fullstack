<?php

namespace App\Traits;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Nicolaslopezj\Searchable\SearchableTrait;

trait Searchable
{
    use SearchableTrait;

    public function scopeApplySearch(Builder $builder, $key = 'search')
    {
        return $builder->search(request($key));
    }
}