ENV_FILE = src/.env
ENV_EXAMPLE_FILE = src/.env.example
clear-cache:
	@docker compose run --rm artisan optimize:clear

# run les migrations 
migrations:
	@docker compose run --rm artisan migrate 

migrations-seed:
	@docker compose run --rm artisan migrate
	@docker compose run --rm artisan db:seed

passport:
	@docker compose run --rm artisan passport:install

# pour lancer le projet des le début avec toutes les commande dans lordre
build-start:
	@docker compose up --build --force-recreate -d nginx
	@docker compose run --rm composer install
	@make env-file
	@echo "génération de la clé d'application... "
	@docker compose run --rm artisan key:generate
	@echo "installation de passport ... "
	@make flush-db
	@make migrations-seed
	@make passport
	@echo "l'api est prête à être utiliser..."

#refraichi la base de donnée et en met ajour le clé id client de passport 
refresh:
	@docker compose run --rm artisan migrate:refresh
	@make passport

nextjs:
	@docker compose up --build -d nextjs

flush-db:
	@docker compose run --rm artisan migrate:fresh

#création du fichier env file 
env-file: 
	@if [ ! -f $(ENV_FILE) ]; then \
		cp $(ENV_EXAMPLE_FILE) $(ENV_FILE); \
		echo "\n# Database configuration" >> $(ENV_FILE); \
		echo "DB_CONNECTION=mysql" >> $(ENV_FILE); \
		echo "DB_HOST=mysql" >> $(ENV_FILE); \
		echo "DB_PORT=3306" >> $(ENV_FILE); \
		echo "DB_DATABASE=quizdevbdd" >> $(ENV_FILE); \
		echo "DB_USERNAME=homestead" >> $(ENV_FILE); \
		echo "DB_PASSWORD=secret" >> $(ENV_FILE); \
		echo "$(ENV_FILE) a été créer."; \
	else \
		echo "$(ENV_FILE) already exists. No changes made."; \
	fi


push: 
	@git add . 
	@git commit -m "add some updated"
	@git push origin feature/swagger