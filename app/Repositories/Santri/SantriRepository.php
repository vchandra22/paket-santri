<?php
namespace App\Repositories\Santri;

use App\Models\Santri;
use App\Repositories\Interfaces\BaseRepositoryInterface;

class SantriRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Santri $model)
    {
        $this->model = $model;
    }
    public function all()
    {
        return $this->model->with('asrama', 'paket')->latest()->get();
    }

    public function find($id)
    {
        return $this->model->with('asrama', 'paket')->where('nis', $id)->first();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $santri = $this->model->findOrFail($id);
        $santri->update($data);
        return $santri;
    }

    public function delete($id)
    {
        $santri = $this->model->findOrFail($id);
        return $santri->delete();
    }
}
