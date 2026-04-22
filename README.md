# 🎓 Nvalidi - Plateforme Éducative pour les Étudiants de l’ISIMM

## 📌 Description

**Nvalidi** est une application web éducative dédiée aux étudiants de **l’ISIMM Monastir**.
L’objectif principal de ce projet est d’aider les étudiants à mieux organiser leur travail académique et à améliorer leurs performances tout au long de leur parcours universitaire.

La plateforme regroupe plusieurs outils essentiels dans une seule interface simple et intuitive.

---

## 🚀 Fonctionnalités

### 🔐 Authentification

* Inscription et connexion des utilisateurs
* Gestion des sessions
* Accès personnalisé à chaque utilisateur

---

### 📝 Gestion des tâches (To-Do List)

* Ajouter, modifier et supprimer des tâches
* Définir une priorité (basse, moyenne, haute)
* Suivre l’état (à faire, en cours, terminé)
* Filtrer et trier les tâches

---

### 📚 Système de Flashcards

* Création de cartes de révision (question/réponse)
* Marquer une carte comme apprise
* Modifier, dupliquer ou supprimer une carte
* Faciliter la mémorisation

---

### 📊 Calcul des moyennes académiques

* Calcul automatique pour les niveaux L1, L2 et L3
* Calcul des :

  * Moyennes par matière
  * Moyennes par module
  * Moyennes semestrielles
  * Moyenne générale
* Calcul des crédits obtenus

---

### 🧠 Jeu de mémoire

* Jeu interactif pour améliorer la mémoire
* Comptage du nombre d’essais
* Sauvegarde du meilleur score

---

### 👤 Profil utilisateur et paramètres

* Modification des informations personnelles
* Changement de mot de passe
* Choix du niveau académique

---

## 🏗️ Structure du projet

```
Nvalidi/
├── api/            # Back-end PHP
├── assets/
│   ├── css/        # Styles
│   ├── js/         # Scripts JavaScript
│   └── img/        # Images
├── config/         # Configuration base de données
├── public/         # Pages HTML
├── sql/            # Script SQL
└── README.md
```

---

## 🛠️ Technologies utilisées

### Front-end

* HTML
* CSS
* JavaScript (Vanilla JS)

### Back-end

* PHP

### Base de données

* MySQL

### Communication

* Fetch API
* JSON

---

## 🗄️ Base de données

La base de données est composée des tables principales suivantes :

* `users` : informations des utilisateurs
* `todos` : gestion des tâches
* `flashcards` : cartes de révision
* `notes` : résultats académiques

Chaque table est liée par `user_id` afin d’assurer une gestion personnalisée des données.

---

## 🎯 Objectifs du projet

Ce projet vise à :

* Aider les étudiants à mieux s’organiser
* Faciliter la révision et la mémorisation
* Suivre les performances académiques
* Centraliser plusieurs outils utiles dans une seule plateforme

---

## 🔮 Améliorations futures

* Version mobile de l’application
* Système de notifications
* Statistiques avancées
* Intégration avec d’autres plateformes éducatives

---

## 👨‍💻 Auteurs

* Firas Hamdi
* Ranim Khadhraoui
* Rayen Jaidi
* Hiba Hitana


---

## 📍 Université

Projet réalisé pour les étudiants de
**ISIMM Monastir (Institut Supérieur d’Informatique et de Mathématiques de Monastir)**

---

## 📄 Licence

Projet réalisé à des fins pédagogiques.
