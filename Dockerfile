# --- Builder stage ---
FROM dunglas/frankenphp:1.2.1-php8.3 AS builder

RUN apt-get update && apt-get install -y \
    curl unzip git default-libmysqlclient-dev libexif-dev libsodium-dev gnupg \
    ca-certificates software-properties-common \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN install-php-extensions \
    pdo_mysql mysqli \
    gd intl zip exif sodium pcntl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
RUN npm install --legacy-peer-deps && npm run build

# --- Final stage ---
FROM dunglas/frankenphp:1.2.1

RUN install-php-extensions \
    pdo_mysql mysqli \
    gd intl zip exif sodium pcntl

WORKDIR /app
COPY --from=builder /app /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV OCTANE_SKIP_BINARY_DOWNLOAD=1

ENTRYPOINT ["/entrypoint.sh"]
