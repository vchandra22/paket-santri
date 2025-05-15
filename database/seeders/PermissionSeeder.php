<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User permissions
            'user_view',
            'user_create',
            'user_edit',
            'user_delete',

            // Role permissions
            'role_view',
            'role_create',
            'role_edit',
            'role_delete',

            // Permission permissions
            'permission_view',
            'permission_create',
            'permission_edit',
            'permission_delete',

            // Santri permissions
            'santri_view',
            'santri_create',
            'santri_edit',
            'santri_delete',

            // Paket permissions
            'paket_view',
            'paket_create',
            'paket_edit',
            'paket_delete',

            // Asrama permissions
            'asrama_view',
            'asrama_create',
            'asrama_edit',
            'asrama_delete',

            // Kategori Paket permissions
            'kategori_paket_view',
            'kategori_paket_create',
            'kategori_paket_edit',
            'kategori_paket_delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $userRole = Role::findByName('user');
        $userRole->givePermissionTo([
            'santri_view',
            'paket_view',
            'asrama_view',
            'kategori_paket_view',
        ]);
    }
}
