<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;

class PaginationService
{
    /**
     * Extract pagination data from a paginator instance
     *
     * @param LengthAwarePaginator $paginator
     * @return array
     */
    public function getPaginationData(LengthAwarePaginator $paginator): array
    {
        return [
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'has_more_pages' => $paginator->hasMorePages(),
            'has_pages' => $paginator->hasPages(),
            'path' => $paginator->path(),
        ];
    }
} 