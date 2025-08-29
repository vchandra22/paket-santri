#!/bin/sh
set -e

echo "🔧 Set permission Laravel..."
mkdir -p /app/storage/framework/cache/data
mkdir -p /app/storage/framework/sessions
mkdir -p /app/storage/framework/views
mkdir -p /app/storage/framework/testing
mkdir -p /app/bootstrap/cache
chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/storage/framework
chmod -R ug+rwX /app/storage /app/bootstrap/cache /app/storage/framework

echo "🚀 Menjalankan Laravel Octane dengan FrankenPHP..."
exec php artisan octane:start \
    --server=frankenphp \
    --host=0.0.0.0 \
    --port=90 \
    --admin-port=2019 \
    --workers=4 \
    --max-requests=500
