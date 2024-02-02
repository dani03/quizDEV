# quiz-dev

ceci est l'API de l'application QUIZDEV;

## instalation

clone le projet depuis ce repo avec la commande `git clone https://github.com/dani03/quizDEV.git ` dans un dossier.

placez vous ensuite dans le projet (quizDEV) `cd quizDEV`

Une fois dans le dossier dans le terminal taper la commande `docker-compose run --rm composer install` afin d'installer les dependances du projet.
ensuite placer vous dans le dossier `src` copier le fichier `.env.exemple`et renomer le en `.env`.
dans le fichier.env.exmple copier et coller le block suivant dans .env :

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=quizdevbdd
DB_USERNAME=homestead
DB_PASSWORD=secret

```

DB_CONNECTION=mysql , 'mysql' ici correspond au service (container) mysql qu'on peut voir dans le fichier docker-compose.yml à la racine du projet ainsi que le mot de passe (DB_PASSWORD) et le username (DB_USERNAME) tous definis dans le docker-compose.yml dans le service(container) mysql.

Ensuite taper la commande `docker-compose run --rm artisan key:generate` afin de generer une clé unique pour notre application.

Une fois la clé générée, taper la commande `docker-compose up --build -d nginx` pour lancer vos containers, ensuite taper la commande `docker-compose ps` pour voir si vos containers tournent bien. vous pouvez tester l'api sur le endpoint `http://localhost/api/v1/test. vous devriez avoir un retour si vous êtes connecter à l'api.

# PHP MY ADMIN

l'accès à PHpMyadmin est sur le port 2023 et donc sur le lien: http://localhost:2023

username : homestead
password : secret

# La documentation des endpoints de l'API

Pour voir les routes(endpoints) que vous pouvez utiliser vous pouvez avoir accès si vos containers sont en marche sur le lien: <a href="http://localhost:3002/docs/index.html">
voir la doc.
</a>

# Gitignore

```
/mysql/*
/front/.next
/front/node_modules
/front/README.md
```
