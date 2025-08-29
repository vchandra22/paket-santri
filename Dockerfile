FROM dunglas/frankenphp:1.2.1-php8.3 AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    curl unzip git default-libmysqlclient-dev libexif-dev libsodium-dev gnupg \
    ca-certificates software-properties-common

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN install-php-extensions \
    pdo_mysql mysqli \
    gd intl zip exif sodium pcntl

# Install Node.js (22.x LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# Copy project files
COPY . .

# Install PHP dependencies (production only)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Install npm dependencies and build assets
RUN npm install --legacy-peer-deps && npm run build

# --- Final stage ---
FROM dunglas/frankenphp:1.2.1-php8.3

# Install runtime PHP extensions
RUN install-php-extensions \
    pdo_mysql mysqli \
    gd intl zip exif sodium pcntl

RUN ln -s /usr/bin/frankenphp /usr/local/bin/frankenphp

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app /app

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV OCTANE_SKIP_BINARY_DOWNLOAD=1

ENTRYPOINT ["/entrypoint.sh"]
