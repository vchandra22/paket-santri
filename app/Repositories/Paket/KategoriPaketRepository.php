<?php
namespace App\Repositories\Paket;

use App\Models\KategoriPaket;
use App\Repositories\Interfaces\BaseRepositoryInterface;

class KategoriPaketRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(KategoriPaket $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
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
        $kategori = $this->model->findOrFail($id);
        $kategori->update($data);
        return $kategori;
    }

    public function delete($id)
    {
        $kategori = $this->model->findOrFail($id);
        return $kategori->delete();
    }
}
