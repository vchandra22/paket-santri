#!/bin/sh
set -e

echo "🔧 Set permission Laravel..."
mkdir -p /app/storage/framework/{cache/data,sessions,views,testing}
mkdir -p /app/bootstrap/cache
chown -R www-data:www-data /app/storage /app/bootstrap/cache
chmod -R ug+rwX /app/storage /app/bootstrap/cache

echo "⚡ Optimize Laravel cache..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "🚀 Start FrankenPHP directly..."
exec frankenphp run --workers=4 --max-requests=500 public/index.php
