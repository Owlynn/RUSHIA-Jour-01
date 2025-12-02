# 📝 Posts Manager

Mini-application de gestion de posts en HTML/CSS/JavaScript vanilla (sans framework ni librairie externe).

## 🎯 Description

Application web simple permettant de créer, visualiser, modifier et supprimer des posts. L'interface utilise un design moderne avec des effets glassmorphism et un thème pastel.

## ✨ Fonctionnalités

- **Liste des posts** : Affichage de tous les posts créés avec titre, description et date
- **Création de post** : Formulaire pour ajouter un nouveau post (titre obligatoire, description optionnelle)
- **Édition de post** : Modification d'un post existant
- **Suppression de post** : Suppression avec confirmation
- **Génération de description** : Bouton pour générer automatiquement une description (fonction interne, pas d'API)
- **Navigation fluide** : Basculement entre la vue liste et la vue formulaire

## 🚀 Utilisation

1. Ouvrez le fichier `index.html` dans un navigateur web moderne
2. L'application se charge automatiquement
3. Utilisez les boutons de navigation pour basculer entre les vues

### Créer un post

1. Cliquez sur "Nouveau post"
2. Remplissez le titre (obligatoire)
3. Optionnellement, remplissez la description ou cliquez sur "✨ Proposer une description"
4. Cliquez sur "Enregistrer"

### Modifier un post

1. Dans la liste des posts, cliquez sur "✏️ Modifier"
2. Modifiez le titre et/ou la description
3. Cliquez sur "Enregistrer"

### Supprimer un post

1. Dans la liste des posts, cliquez sur "🗑️ Supprimer"
2. Confirmez la suppression

## 📁 Structure des fichiers

```
RUSHIA-Jour-01/
├── index.html      # Structure HTML de l'application
├── styles.css      # Styles CSS avec thème pastel et glassmorphism
├── main.js         # Logique JavaScript (CRUD, DOM, navigation)
└── README.md       # Documentation du projet
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles avec effets glassmorphism, animations, responsive design
- **JavaScript (ES6+)** : Logique applicative en vanilla JS
- **Aucune dépendance externe** : Application 100% vanilla

## 🏗️ Architecture

### État global

- `posts` : Array contenant tous les posts en mémoire
- `currentEditingId` : ID du post en cours d'édition (null si création)

### Structure d'un post

```javascript
{
    id: number,              // ID unique (timestamp)
    title: string,           // Titre du post
    description: string,     // Description (peut être vide)
    createdAt: string,       // Date de création formatée
    updatedAt?: string       // Date de modification (si édité)
}
```

### Fonctions principales

#### CRUD
- `createPost(title, description)` : Crée un nouveau post
- `readPosts()` : Récupère tous les posts
- `getPostById(id)` : Récupère un post par son ID
- `updatePost(id, title, description)` : Met à jour un post
- `deletePost(id)` : Supprime un post

#### DOM & Navigation
- `renderPosts()` : Affiche tous les posts dans la vue liste
- `createPostCard(post)` : Crée l'élément DOM d'une carte de post
- `showListView()` : Affiche la vue liste
- `showFormView()` : Affiche la vue formulaire
- `editPost(id)` : Lance l'édition d'un post

#### Utilitaires
- `generateFakeDescription()` : Génère une description aléatoire depuis une liste prédéfinie
- `resetForm()` : Réinitialise le formulaire
- `fillForm(post)` : Remplit le formulaire avec les données d'un post

## 🎨 Design

- **Thème pastel** : Couleurs douces (rose, bleu, violet)
- **Glassmorphism** : Effets de transparence et blur sur les cartes et conteneurs
- **Responsive** : Adaptation mobile et desktop
- **Animations** : Transitions fluides entre les vues
- **Accessibilité** : Labels, attributs ARIA, navigation au clavier

## 📝 Notes techniques

- **Persistance** : Les données sont stockées uniquement en mémoire JavaScript (perdues au rechargement de la page)
- **Validation** : Le titre est obligatoire, la description est optionnelle
- **Génération de description** : Fonction interne utilisant une liste prédéfinie de phrases (pas d'appel API)

## 🔮 Améliorations possibles

1. **Persistance locale** : Utiliser `localStorage` pour sauvegarder les posts entre les sessions
2. **Recherche/Filtrage** : Ajouter une barre de recherche pour filtrer les posts
3. **Catégories/Tags** : Permettre d'ajouter des catégories ou tags aux posts
4. **Tri** : Trier les posts par date (plus récent/premier) ou par titre
5. **Validation améliorée** : Messages d'erreur plus élégants (toast notifications)
6. **Export/Import** : Exporter les posts en JSON ou les importer
7. **Mode sombre** : Ajouter un thème sombre en plus du thème clair
8. **Pagination** : Paginer l'affichage si beaucoup de posts
9. **Prévisualisation** : Aperçu du post avant sauvegarde
10. **Statistiques** : Afficher le nombre total de posts dans l'en-tête

## 📄 Licence

Ce projet est un exercice d'apprentissage dans le cadre du RUSH IA.

## 👤 Auteur

Projet créé dans le cadre du RUSH IA - Jour 01
