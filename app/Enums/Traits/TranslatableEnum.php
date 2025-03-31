<?php

namespace App\Enums\Traits;

trait TranslatableEnum
{
    public function translate(): string
    {
        return __($this->value);
    }
}
