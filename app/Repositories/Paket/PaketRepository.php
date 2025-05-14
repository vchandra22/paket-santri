<?php
namespace App\Repositories\Paket;

use App\Models\Paket;
use App\Repositories\Interfaces\BaseRepositoryInterface;
use Illuminate\Support\Facades\DB;

class PaketRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Paket $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->with('santri', 'kategori', 'asrama')->get();
    }

    public function find($id)
    {
        return $this->model->with('santri', 'kategori', 'asrama')->findOrFail($id);
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
