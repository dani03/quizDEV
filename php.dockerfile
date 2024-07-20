FROM php:8.2-fpm

ADD ./src/ var/www/html

RUN mkdir -p /var/www/html
RUN apk --no-cache add shadow && usermod -u 1000 www-data
RUN docker-php-ext-install pdo pdo_mysql


# Copy configuration files.
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./nginx/default.conf /etc/nginx/default.conf

RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del pcre-dev ${PHPIZE_DEPS} \