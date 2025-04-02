<?php

namespace App\Enums;

use App\Enums\Traits\TranslatableEnum;

enum TaskPriorityEnum: string
{
    use TranslatableEnum;

    case LOW = 'low';
    case MEDIUM = 'medium';
    case HIGH = 'high';
}
