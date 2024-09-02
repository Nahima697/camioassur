# camioassur
Projet : Réservation de contrôle technique de camions  Technologies utilisées : Node.js, mongoose, MongoDB, React

# Guide pour Tester le Projet

## Prérequis

Avant de commencer, assurez-vous que les outils suivants sont installés sur votre machine :

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Étapes pour Tester le Projet

### 1. Cloner le Repository

Clonez le repository contenant le projet en utilisant la commande suivante :

```bash
git clone <URL_DU_REPOSITORY>
cd <NOM_DU_REPOSITORY>
```

### 2 . Construire les images et Lancer les conteneur Dockers

#### Construire l'image pour le backend
```bash
docker build -t backend-image ./back-end
```

#### Construire l'image pour le frontend
```bash
docker build -t frontend-image ./front-end
```

#### Construire les conteneurs avec la commande suivante :

```bash
docker-compose-up --build
```
Cette commande démarrera les conteneurs associés dans le fichier docker-compose.yml.

```bash
docker-compose-down
```
Pour fermer les conteneurs


### 3.Accéder à l'Application

    API Backend : L'API sera accessible à l'adresse http://localhost:3000
    Pour accéder à la documentation http://localhost:3000/api
    Frontend : L'application frontend sera accessible à l'adresse http://localhost:3001

### Site toujours en cours

Je n'ai pas encore terminé toutes les fonctionnalités ni mis en place de test pour le moment.
To be continued...
