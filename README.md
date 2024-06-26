# quiz-dev

ceci est l'API de l'application QUIZ DEV ;

## installation

Clone le projet depuis ce repo avec la commande `git clone https://github.com/dani03/quizDEV.git ` dans un dossier.

Placez-vous ensuite dans le projet (quizDEV) `cd quizDEV`

Une fois dans le dossier dans le terminal taper la commande `docker-compose run --rm composer install` afin d'installer les dependence du projet.
Ensuite placer vous dans le dossier `src` copier le fichier `.env.exemple`et renommer le en `.env`.
Dans le fichier.env.exemple copier et coller le block suivant dans le fichier .env :

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=quizdevbdd
DB_USERNAME=homestead
DB_PASSWORD=secret

```

DB_CONNECTION=mysql, 'mysql' ici correspond au service (conteneur) mysql qu'on peut voir dans le fichier docker-compose.yml à la racine du projet ainsi que le mot de passe (DB_PASSWORD) et le username (DB_USERNAME) tous definit dans le docker-compose.yml dans le service (conteneur) mysql.

Ensuite taper la commande `docker-compose run --rm artisan key:generate` afin de générer une clé unique pour notre application.

Et pour mettre à jour les utilisateurs password, on tape la commande `docker compose run --rm artisan passport:install` afin de 
générer les utilisateurs.

Si le dossier "mysql" est présent à la racine de votre projet supprimer le. 

Une fois la clé générée, taper la commande `docker-compose up --build -d nginx` pour lancer vos conteneurs, ensuite taper la commande `docker-compose ps` pour voir si vos conteneurs tournent bien. Vous pouvez tester l'api sur l'endpoint `http://localhost/api/v1/test. Vous devriez avoir un retour si vous êtes connecté à l'api.

# RUN les migrations 

Une fois vos conteneurs en marche, taper la commande `docker compose run --rm artisan migrate` afin de lancer les migrations vers votre base de données. 
Après les migrations lancer les seeders afin de peupler notre base de données avec la commande `docker compose run --rm db:seed`.
# PHP MY ADMIN

L'accès à PHpMyadmin est sur le port 2023 et donc sur le lien : http://localhost:2023 et le port 2025 pour le SGBD adminer similaire à phpMyadmin 

username : homestead
password : secret

# La documentation des endpoints de l'API

Pour voir les routes (endpoints) que vous pouvez utiliser, vous pouvez avoir accès si vos conteneurs sont en marche sur le lien : <a href="http://localhost:3002/docs/index.html">
voir la doc.
</a>

# FRONT

`cd /front`
`npm install`
`npm run dev`

# Gitignore

```
/mysql/*
/front/.next
/front/node_modules
/front/README.md
```
