FROM dunglas/frankenphp:latest-php8.2

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl unzip git libpq-dev libexif-dev libsodium-dev gnupg \
    ca-certificates software-properties-common

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN install-php-extensions \
    pgsql pdo_pgsql \
    gd intl zip exif sodium pcntl

# Install Node.js (22.x LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# Copy entire project
COPY . .

# Install Laravel dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install laravel octane
RUN composer require laravel/octane --no-interaction --prefer-dist

# Install npm dependencies and build assets
RUN npm install --legacy-peer-deps && npm run build

# Copy entrypoint for permission fix and octane start
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use entrypoint to handle permission & Octane startup
ENTRYPOINT ["/entrypoint.sh"]
