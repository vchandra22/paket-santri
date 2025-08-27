#!/bin/bash
echo "🔧 Menyetel permission direktori Laravel..."
chown -R www-data:www-data /app/storage /app/bootstrap/cache
chmod -R ug+rwX /app/storage /app/bootstrap/cache

echo "🚀 Menjalankan Laravel Octane (FrankenPHP)..."
exec php artisan octane:frankenphp --host=0.0.0.0 --port=90
