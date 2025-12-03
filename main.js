// ============================================
// ÉTAT GLOBAL DE L'APPLICATION
// ============================================
let posts = []; // Array en mémoire pour stocker tous les posts
let currentEditingId = null; // ID du post en cours d'édition (null si création)

// ============================================
// RÉFÉRENCES AUX ÉLÉMENTS DOM
// ============================================
const viewList = document.getElementById('view-list'); // Conteneur de la vue liste des posts
const viewForm = document.getElementById('view-form'); // Conteneur de la vue formulaire
const postsList = document.getElementById('posts-list'); // Liste où sont affichés les posts
const emptyState = document.getElementById('empty-state'); // Message affiché quand aucun post
const postForm = document.getElementById('post-form'); // Formulaire de création/édition
const postTitleInput = document.getElementById('post-title'); // Champ input du titre
const postDescriptionInput = document.getElementById('post-description'); // Champ textarea de la description
const formTitle = document.getElementById('form-title'); // Titre du formulaire (h2)
const btnShowList = document.getElementById('btn-show-list'); // Bouton pour afficher la vue liste
const btnShowForm = document.getElementById('btn-show-form'); // Bouton pour afficher la vue formulaire
const btnGenerateDesc = document.getElementById('btn-generate-desc'); // Bouton pour générer une description
const btnCancel = document.getElementById('btn-cancel'); // Bouton d'annulation du formulaire
const genericModal = document.getElementById('generic-modal'); // Modale générique unique
const modalTitle = document.getElementById('modal-title'); // Titre de la modale
const modalMessage = document.getElementById('modal-message'); // Message de la modale
const modalActions = document.getElementById('modal-actions'); // Conteneur des boutons d'action

// ============================================
// GÉNÉRATION FAKE DE DESCRIPTION
// ============================================
/**
 * generateFakeDescription - Génère une description aléatoire depuis une liste prédéfinie
 * @returns {string} Description générée
 */
function generateFakeDescription() {
    const descriptions = [
        "Un post intéressant sur les dernières tendances technologiques.",
        "Réflexions sur le développement web moderne et les meilleures pratiques.",
        "Partage d'expérience sur la création d'interfaces utilisateur élégantes.",
        "Découverte d'un nouvel outil qui simplifie le développement frontend.",
        "Analyse des avantages et inconvénients des différentes approches de design.",
        "Conseils pratiques pour améliorer la productivité en développement.",
        "Exploration des nouvelles fonctionnalités JavaScript ES6+.",
        "Guide rapide pour créer des animations CSS fluides et performantes.",
        "Réflexions sur l'accessibilité web et son importance.",
        "Tutoriel sur la création d'applications web modernes sans framework."
    ];
    
    // Sélection aléatoire d'une description
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
}

// ============================================
// FONCTIONS CRUD
// ============================================

/**
 * createPost - Crée un nouveau post
 * @param {string} title - Titre du post (obligatoire)
 * @param {string} description - Description du post (optionnel)
 * @returns {Object} Le post créé
 */
function createPost(title, description = '') {
    const newPost = {
        id: Date.now(), // ID unique basé sur le timestamp
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toLocaleString('fr-FR')
    };
    
    posts.push(newPost);
    return newPost;
}

/**
 * readPosts - Récupère tous les posts
 * @returns {Array} Liste de tous les posts
 */
function readPosts() {
    return posts;
}

/**
 * getPostById - Récupère un post par son ID
 * @param {number} id - ID du post
 * @returns {Object|null} Le post trouvé ou null
 */
function getPostById(id) {
    return posts.find(post => post.id === id) || null;
}

/**
 * updatePost - Met à jour un post existant
 * @param {number} id - ID du post à modifier
 * @param {string} title - Nouveau titre
 * @param {string} description - Nouvelle description
 * @returns {Object|null} Le post modifié ou null si non trouvé
 */
function updatePost(id, title, description = '') {
    const post = getPostById(id);
    
    if (!post) {
        return null;
    }
    
    post.title = title.trim();
    post.description = description.trim();
    post.updatedAt = new Date().toLocaleString('fr-FR');
    
    return post;
}

/**
 * deletePost - Supprime un post
 * @param {number} id - ID du post à supprimer
 * @returns {boolean} true si supprimé, false sinon
 */
function deletePost(id) {
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) {
        return false;
    }
    
    posts.splice(index, 1);
    return true;
}

// ============================================
// MANIPULATION DU DOM
// ============================================

/**
 * renderPosts - Affiche tous les posts dans la vue liste
 */
function renderPosts() {
    // Vider la liste actuelle
    postsList.innerHTML = '';
    
    // Afficher ou masquer l'état vide
    if (posts.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Créer une carte pour chaque post
    posts.forEach(post => {
        const postCard = createPostCard(post);
        postsList.appendChild(postCard);
    });
}

/**
 * createPostCard - Crée un élément DOM pour un post
 * @param {Object} post - L'objet post
 * @returns {HTMLElement} L'élément DOM de la carte
 */
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.postId = post.id;
    
    const header = document.createElement('div');
    header.className = 'post-header';
    
    const title = document.createElement('h3');
    title.className = 'post-title';
    title.textContent = post.title;
    
    const actions = document.createElement('div');
    actions.className = 'post-actions';
    
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn-edit';
    btnEdit.textContent = '✏️ Modifier';
    btnEdit.addEventListener('click', () => editPost(post.id));
    
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-delete';
    btnDelete.textContent = '🗑️ Supprimer';
    btnDelete.addEventListener('click', () => {
        showModal('⚠️ Confirmer la suppression', `Êtes-vous sûr de vouloir supprimer le post <strong>"${post.title}"</strong> ?<br><br><span class="modal-warning">Cette action est irréversible.</span>`, 'confirm', { postId: post.id });
    });
    
    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);
    
    header.appendChild(title);
    header.appendChild(actions);
    
    const description = document.createElement('p');
    description.className = 'post-description';
    description.textContent = post.description || '';
    
    const date = document.createElement('div');
    date.className = 'post-date';
    date.textContent = `Créé le ${post.createdAt}${post.updatedAt ? ` • Modifié le ${post.updatedAt}` : ''}`;
    
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(date);
    
    return card;
}

/**
 * resetForm - Réinitialise le formulaire
 */
function resetForm() {
    postForm.reset();
    currentEditingId = null;
    formTitle.textContent = 'Nouveau post';
    postTitleInput.focus();
}

/**
 * fillForm - Remplit le formulaire avec les données d'un post pour l'édition
 * @param {Object} post - Le post à éditer
 */
function fillForm(post) {
    postTitleInput.value = post.title;
    postDescriptionInput.value = post.description || '';
    formTitle.textContent = 'Modifier le post';
    currentEditingId = post.id;
}

// ============================================
// NAVIGATION ENTRE LES VUES
// ============================================

/**
 * showListView - Affiche la vue liste
 */
function showListView() {
    viewList.classList.add('active');
    viewForm.classList.remove('active');
    btnShowList.classList.add('active');
    btnShowForm.classList.remove('active');
    renderPosts();
}

/**
 * showFormView - Affiche la vue formulaire
 */
function showFormView() {
    viewForm.classList.add('active');
    viewList.classList.remove('active');
    btnShowForm.classList.add('active');
    btnShowList.classList.remove('active');
    // Ne réinitialiser le formulaire que si on n'est pas en mode édition
    if (currentEditingId === null) {
        resetForm();
    }
}

/**
 * editPost - Édite un post existant
 * @param {number} id - ID du post à éditer
 */
function editPost(id) {
    const post = getPostById(id);
    
    if (!post) {
        alert('Post introuvable !');
        return;
    }
    
    fillForm(post);
    showFormView();
}

// ============================================
// GESTION DES ÉVÉNEMENTS
// ============================================

/**
 * handleFormSubmit - Gère la soumission du formulaire (création ou édition)
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const title = postTitleInput.value.trim();
    const description = postDescriptionInput.value.trim();
    
    // Validation : le titre est obligatoire
    if (!title) {
        showModal('Erreur', 'Le titre est obligatoire !', 'error');
        postTitleInput.focus();
        return;
    }
    
    // Création ou mise à jour selon le contexte
    if (currentEditingId) {
        // Mode édition
        const updated = updatePost(currentEditingId, title, description);
        if (updated) {
            showModal('✅ Succès', 'Post modifié avec succès !', 'success');
            renderPosts();
            showListView();
        } else {
            showModal('❌ Erreur', 'Erreur lors de la modification du post.', 'error');
        }
    } else {
        // Mode création
        createPost(title, description);
        showModal('✅ Succès', 'Post créé avec succès !', 'success');
        renderPosts();
        showListView();
    }
}

/**
 * handleGenerateDescription - Gère le clic sur le bouton de génération de description
 */
function handleGenerateDescription() {
    const generatedDesc = generateFakeDescription();
    postDescriptionInput.value = generatedDesc;
    postDescriptionInput.focus();
    
    // Petit effet visuel pour indiquer la génération
    postDescriptionInput.style.transition = 'all 0.3s ease';
    postDescriptionInput.style.transform = 'scale(1.02)';
    setTimeout(() => {
        postDescriptionInput.style.transform = 'scale(1)';
    }, 300);
}

/**
 * showModal - Affiche la modale générique avec différents contextes
 * @param {string} title - Titre de la modale
 * @param {string} message - Message à afficher
 * @param {string} type - Type de modale ('confirm', 'success', 'error')
 * @param {Object} options - Options supplémentaires (postId pour confirmation de suppression)
 */
function showModal(title, message, type = 'success', options = {}) {
    // Vérifier que la modale existe
    if (!genericModal || !modalTitle || !modalMessage || !modalActions) {
        // Fallback vers alert si la modale n'existe pas
        alert(`${title}\n${message}`);
        return;
    }
    
    // Définir le titre et le message
    modalTitle.textContent = title;
    modalMessage.innerHTML = message; // Utiliser innerHTML pour permettre le HTML dans le message
    
    // Réinitialiser les actions
    modalActions.innerHTML = '';
    
    // Configurer le style selon le type
    const modalContent = genericModal.querySelector('.modal-content');
    if (modalContent) {
        // Réinitialiser les classes
        modalContent.className = 'modal-content';
        
        // Ajouter la classe selon le type
        if (type === 'error') {
            modalContent.classList.add('modal-error');
        } else if (type === 'success') {
            modalContent.classList.add('modal-success');
        } else if (type === 'confirm') {
            modalContent.classList.add('modal-confirm');
        }
    }
    
    // Créer les boutons selon le type
    if (type === 'confirm') {
        // Modale de confirmation : 2 boutons (Annuler / Confirmer)
        const btnCancel = document.createElement('button');
        btnCancel.className = 'btn-secondary';
        btnCancel.textContent = 'Annuler';
        btnCancel.addEventListener('click', hideModal);
        
        const btnConfirm = document.createElement('button');
        btnConfirm.className = 'btn-danger';
        btnConfirm.textContent = 'Supprimer';
        btnConfirm.addEventListener('click', () => {
            if (options.postId) {
                deletePost(options.postId);
                renderPosts();
                hideModal();
                showModal('✅ Succès', 'Post supprimé avec succès !', 'success');
            }
        });
        
        modalActions.appendChild(btnCancel);
        modalActions.appendChild(btnConfirm);
        
        // Stocker l'ID du post dans un attribut data pour référence
        if (options.postId) {
            genericModal.dataset.postId = options.postId;
        }
    } else {
        // Modale de succès/erreur : 1 bouton (OK)
        const btnOk = document.createElement('button');
        btnOk.className = 'btn-primary';
        btnOk.textContent = 'OK';
        btnOk.addEventListener('click', hideModal);
        
        modalActions.appendChild(btnOk);
    }
    
    // Afficher la modale
    genericModal.classList.add('active');
}

/**
 * hideModal - Cache la modale générique
 */
function hideModal() {
    if (genericModal) {
        genericModal.classList.remove('active');
        genericModal.dataset.postId = '';
    }
}

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

/**
 * init - Initialise l'application en attachant les événements
 */
function init() {
    // Navigation
    btnShowList.addEventListener('click', showListView);
    btnShowForm.addEventListener('click', showFormView);
    
    // Formulaire
    postForm.addEventListener('submit', handleFormSubmit);
    btnGenerateDesc.addEventListener('click', handleGenerateDescription);
    btnCancel.addEventListener('click', () => {
        resetForm();
        showListView();
    });
    
    // Modale générique : fermer en cliquant sur l'overlay
    if (genericModal) {
        const overlay = genericModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', hideModal);
        }
    }
    
    // Fermer la modale avec la touche Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (genericModal && genericModal.classList.contains('active')) {
                hideModal();
            }
        }
    });
    
    // Afficher la vue liste par défaut
    showListView();
    
    // Optionnel : Ajouter quelques posts d'exemple pour la démo
    // Décommentez les lignes suivantes si vous voulez des données de test
    /*
    createPost('Premier post', 'Ceci est un exemple de post pour tester l\'application.');
    createPost('Deuxième post', 'Un autre exemple avec une description plus longue pour voir comment le rendu se comporte avec du contenu varié.');
    renderPosts();
    */
}

// Lancer l'application quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

