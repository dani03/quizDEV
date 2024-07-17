FROM 975050020416.dkr.ecr.us-east-2.amazonaws.com/prod-laravel-api-base-image:latest as php

ADD ./src/ var/www/html



# Copy configuration files.
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./nginx/default.conf /etc/nginx/default.conf

# Set working directory to ...
WORKDIR /app

# Copy files from current folder to container current folder (set in workdir).
COPY --chown=www-data:www-data . .

# Create laravel caching folders.
RUN mkdir -p ./src/storage/framework
RUN mkdir -p ./src/storage/framework/{cache, testing, sessions, views}
RUN mkdir -p ./src/storage/framework/bootstrap
RUN mkdir -p ./src/storage/framework/bootstrap/cache

# Adjust user permission & group.
RUN usermod --uid 1000 www-data
RUN groupmod --gid 1000  www-data

# Run the entrypoint file.
ENTRYPOINT [ "docker/entrypoint.sh" ]