# iut-project

### 1. installation des packages
```
npm i
```

### 2. modification des variables d'envireonement
renommer le fichier .env-keep qui se trouve dans le dossier server en .env
et modifier chaques variables a votre guise.

### 3. Lancer l'application 
```
npm run start
```

### 4. C'est parti
```
http://localhost:3000/documentation
```



Nom  | Signification | Exemple
------------- | ------------- | -------------
DB_HOST  | l'ip du serveur de bdd  | 0.0.0.0
DB_USER  | l'utilisateur pour la bdd  | root
DB_PASSWORD  | le mot de passe de l'utilisateur pour la bdd  | root
DB_DATABASE  | la database par defaut  | hapi
DB_PORT  | le port de la bdd  | 3306
MAIL_USER  | l'utilisateur du serveur mail  | user@user.fr
MAIL_PASS  | le mdp du serveur web   | user_pass


### ps : 
Le package.json contient un script qui permet de lancer un mysql dans un conteneur docker
si vous l'utilisez, pensez a changer le .env avec les bonnes valeurs pour le user, le mdp et la database, respectivement `root`, `hapi` et `user`

