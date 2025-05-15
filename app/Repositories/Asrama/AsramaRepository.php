<?php

namespace App\Repositories\Asrama;

use App\Models\Asrama;
use App\Repositories\Interfaces\BaseRepositoryInterface;

class AsramaRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Asrama $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->latest()->get();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $asrama = $this->model->findOrFail($id);
        $asrama->update($data);
        return $asrama;
    }

    public function delete($id)
    {
        $asrama = $this->model->findOrFail($id);
        return $asrama->delete();
    }
}
