# --- Builder stage ---
FROM dunglas/frankenphp:1.2.1-php8.3 AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    curl unzip git default-libmysqlclient-dev libexif-dev libsodium-dev gnupg \
    ca-certificates software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN install-php-extensions \
    pdo_mysql mysqli \
    gd intl zip exif sodium pcntl

# Install Node.js (22.x LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy project files
COPY . .

# Install PHP dependencies (production only)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Install npm dependencies and build assets
RUN npm install --legacy-peer-deps && npm run build

# --- Final stage ---
FROM dunglas/frankenphp:php8.3

# Install runtime PHP extensions (lebih ringan dari builder)
RUN install-php-extensions \
    pdo_mysql mysqli \
    gd intl zip exif sodium pcntl

# Install FrankenPHP binary manual (hindari prompt Octane)
RUN curl -L https://github.com/dunglas/frankenphp/releases/download/v1.2.1/frankenphp-linux-x86_64 \
    -o /usr/local/bin/frankenphp \
    && chmod +x /usr/local/bin/frankenphp

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app /app

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Laravel Octane jangan coba download binary lagi
ENV OCTANE_SKIP_BINARY_DOWNLOAD=1

ENTRYPOINT ["/entrypoint.sh"]
