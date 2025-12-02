# 📝 Posts Manager

Mini-application de gestion de posts en HTML/CSS/JavaScript vanilla (sans framework ni librairie externe).

## 🎯 Description

Application web simple permettant de créer, visualiser, modifier et supprimer des posts. L'interface utilise un design moderne avec des effets glassmorphism et un thème pastel.

## 📸 Aperçu

![Aperçu de l'application Posts Manager](img/Capture%20d'écran%202025-12-02%20181850.png)

## ✨ Fonctionnalités

- **Liste des posts** : Affichage de tous les posts créés avec titre, description et date
- **Création de post** : Formulaire pour ajouter un nouveau post (titre obligatoire, description optionnelle)
- **Édition de post** : Modification d'un post existant
- **Suppression de post** : Suppression avec confirmation via une modale élégante
- **Génération de description** : Bouton pour générer automatiquement une description (fonction interne, pas d'API)
- **Navigation fluide** : Basculement entre la vue liste et la vue formulaire
- **Modales interactives** : 
  - Modale de confirmation pour la suppression (avec avertissement)
  - Modale de succès/erreur pour les actions (création, modification, suppression)
  - Fermeture avec la touche `Escape` ou en cliquant sur l'overlay
- **Interface utilisateur** : Design glassmorphism avec effets de transparence et blur

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
2. Une modale de confirmation apparaît avec le titre du post
3. Cliquez sur "Supprimer" pour confirmer ou "Annuler" pour annuler
4. Un message de succès confirme la suppression

### Interactions clavier

- **Escape** : Ferme les modales ouvertes (confirmation de suppression, succès/erreur)

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

### Navigateurs compatibles

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ⚠️ Nécessite le support de `backdrop-filter` pour les effets glassmorphism complets

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

#### Modales
- `showDeleteModal(postId, postTitle)` : Affiche la modale de confirmation de suppression
- `hideDeleteModal()` : Cache la modale de suppression
- `showSuccessModal(title, message, type)` : Affiche une modale de succès ou d'erreur
- `hideSuccessModal()` : Cache la modale de succès/erreur
- `handleModalConfirm()` : Gère la confirmation de suppression

#### Utilitaires
- `generateFakeDescription()` : Génère une description aléatoire depuis une liste prédéfinie
- `resetForm()` : Réinitialise le formulaire
- `fillForm(post)` : Remplit le formulaire avec les données d'un post

## 🎨 Design

- **Thème pastel** : Couleurs douces (rose, bleu, violet) avec dégradé de fond
- **Glassmorphism** : 
  - Effets de transparence (`rgba`) avec `backdrop-filter: blur()` et `saturate()`
  - Bordures semi-transparentes avec ombres portées et ombres internes (`inset`)
  - Appliqué sur les cartes, conteneurs, formulaires, boutons et modales
  - Effet de verre dépoli moderne et élégant
- **Modales** : 
  - Design uniforme avec fond glassmorphism
  - Couleurs de titre différenciées (vert pour succès, rouge pour erreur/suppression)
  - Animations d'apparition (`slideUp`) et overlay avec blur
  - Fermeture intuitive (clic sur overlay ou touche Escape)
- **Responsive** : Adaptation mobile et desktop avec media queries
- **Animations** : Transitions fluides entre les vues (`fadeIn`) et interactions (hover, focus)
- **Accessibilité** : Labels, navigation au clavier, focus visible

## 📝 Notes techniques

### Persistance et données
- **Stockage** : Les données sont stockées uniquement en mémoire JavaScript (perdues au rechargement de la page)
- **Structure** : Chaque post contient un ID unique (timestamp), titre, description, date de création et date de modification optionnelle

### Validation
- **Titre** : Obligatoire (validation côté client avec message d'erreur dans une modale)
- **Description** : Optionnelle, peut être générée automatiquement

### Génération de description
- **Fonction interne** : Utilise une liste prédéfinie de 10 phrases aléatoires (pas d'appel API)
- **Effet visuel** : Animation légère lors de la génération

### Modales
- **Types** : Confirmation de suppression, succès, erreur
- **Gestion d'état** : Stockage de l'ID du post à supprimer dans `dataset`
- **Fermeture** : Support de la touche `Escape` et clic sur l'overlay
- **Design uniforme** : Toutes les modales partagent le même style de base (fond, bordures, ombres)

### Code
- **Documentation** : JSDoc pour toutes les fonctions avec paramètres et types de retour
- **Commentaires** : Chaque constante DOM a une description courte
- **Organisation** : Code modulaire avec sections clairement définies (CRUD, DOM, Navigation, Événements)

## 🔮 Améliorations possibles

1. **Persistance locale** : Utiliser `localStorage` pour sauvegarder les posts entre les sessions
2. **Recherche/Filtrage** : Ajouter une barre de recherche pour filtrer les posts
3. **Catégories/Tags** : Permettre d'ajouter des catégories ou tags aux posts
4. **Tri** : Trier les posts par date (plus récent/premier) ou par titre
5. **Export/Import** : Exporter les posts en JSON ou les importer
6. **Mode sombre** : Ajouter un thème sombre en plus du thème clair
7. **Pagination** : Paginer l'affichage si beaucoup de posts
8. **Prévisualisation** : Aperçu du post avant sauvegarde
9. **Statistiques** : Afficher le nombre total de posts dans l'en-tête
10. **Édition en ligne** : Permettre l'édition directe dans la liste des posts
11. **Copier/Coller** : Copier le contenu d'un post
12. **Duplication** : Dupliquer un post existant
13. **Historique** : Conserver l'historique des modifications
14. **Recherche avancée** : Recherche dans le titre et la description
15. **Filtres** : Filtrer par date de création/modification

## 📄 Licence

Ce projet est un exercice d'apprentissage dans le cadre du RUSH IA.

## 👤 Auteur

Projet créé dans le cadre du RUSH IA - Jour 01
