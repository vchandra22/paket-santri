#!/bin/bash
echo "🔧 Menyetel permission direktori & permission Laravel..."

mkdir -p /app/storage/framework/{cache/data,sessions,views,testing}
mkdir -p /app/bootstrap/cache

chown -R www-data:www-data /app/storage /app/bootstrap/cache
chmod -R ug+rwX /app/storage /app/bootstrap/cache

echo "🚀 Menjalankan Laravel Octane (FrankenPHP)..."
exec php artisan octane:frankenphp --host=0.0.0.0 --port=90
