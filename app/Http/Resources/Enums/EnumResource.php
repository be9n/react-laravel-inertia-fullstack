<?php

namespace App\Http\Resources\Enums;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */ 
    public function toArray(Request $request): array
    {
        return [
            'key' => $this->value,
            'value' => $this->translate()
        ];
    }
}
