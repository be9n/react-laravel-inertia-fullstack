<?php

namespace App\Enums;

use App\Enums\Traits\TranslatableEnum;

enum TaskStatusEnum: string
{
    use TranslatableEnum;

    case PENDING = 'pending';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}
