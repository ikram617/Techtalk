
document.addEventListener('DOMContentLoaded', () => {
  const newpostAddB = document.querySelector('.AddButton');
  const newpostBackB = document.querySelector('.BackButton');
  const Textarea = document.querySelector('.newPost textarea');
  var les_categories = document.querySelectorAll('.CategoriesNames li');
  var les_categories_names = document.querySelectorAll('.Titres');
  var search = document.querySelector('.searchBar input');
  var addPost = document.querySelector('.addPost');
  var newPost = document.querySelector('.newPost');
  var searchIcon = document.querySelector('.searchBar i');
  
  // Fonction pour charger les commentaires
  function loadAllComments() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_comments.php', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const comments = JSON.parse(xhr.responseText);
        const postsContainer = document.querySelector('.posts');
        postsContainer.innerHTML = ''; // Clear current comments
        comments.forEach(comment => {
          const post = document.createElement('div');
          post.classList.add('AffichePost');
          post.innerHTML = `
            <div class="info">
              <p class="username">${comment.username}</p>
              <p class="userField">${comment.field}</p>
            </div>
            <hr style="height: 1px; border: none; background-color: black; width: 100%;">
            <div class="comment">
              <p>${comment.comment}</p>
            </div>
          `;
          postsContainer.appendChild(post);
        });
      }
    };
    xhr.send();
  }
  
  // Afficher/masquer le formulaire d'ajout de commentaire
  addPost.addEventListener('click', () => {
    console.log('clicked ');
    newPost.classList.remove('innactive');
    newPost.classList.add('active');
    addPost.classList.remove('active');
    addPost.classList.add('innactive');
  });

  newpostBackB.addEventListener('click', () => {
    newPost.classList.remove('active');
    newPost.classList.add('innactive');
    addPost.classList.remove('innactive');
    addPost.classList.add('active');
    Textarea.value = '';
  });

  newpostAddB.addEventListener('click', () => {
    if (Textarea.value !== '') {
      const comment = Textarea.value;
      console.log(comment); // Afficher le commentaire dans la console
      // ajouter le commentaire au début de la page 
      var post = document.createElement('div');
      post.classList.add('AffichePost');
      post.innerHTML = `
        <div class="info">
          <p class="username">${username}</p>
          <p class="userField">${userField}</p>
        </div>
        <hr style="height: 1px; border: none; background-color: black; width: 100%;">
        <div class="comment">
          <p>${Textarea.value}</p>
        </div>
      `;
      const postsContainer = document.querySelector('.posts');
      postsContainer.insertBefore(post, postsContainer.firstChild);
      // Envoie AJAX pour ajouter le commentaire dans la base de données
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'add_comment.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(`comment=${encodeURIComponent(comment)}&username=${encodeURIComponent(username)}&userField=${encodeURIComponent(userField)}`);
      xhr.onload = function () {
        if (xhr.status === 200) {
          loadAllComments(); // Recharger les commentaires après ajout
          // Réinitialiser le champ de texte et fermer le formulaire
          Textarea.value = '';
          newPost.classList.remove('active');
          newPost.classList.add('innactive');
          addPost.classList.remove('innactive');
          addPost.classList.add('active');
        } else {
          alert('Erreur lors de l\'ajout du commentaire');
        }
      };
    }
  });

  loadAllComments(); // Charger les commentaires au chargement de la page

// Search bar
  search.addEventListener('keyup', function(e) {
    if(e.key === 'Enter') {
      console.log(this.value);
    }
  });

  searchIcon.addEventListener('click', () => {
    console.log(search.value);
  });

  les_categories.forEach((listItem, index) => {
    listItem.addEventListener('mouseenter', () => {
      les_categories_names[index].classList.remove('innactive');
      les_categories_names[index].classList.add('active');
      les_categories_names[index].addEventListener('click', () => {
        // Action lorsque l'on clique sur la catégorie
      });
    });

    listItem.addEventListener('mouseleave', () => {
      les_categories_names[index].classList.remove('active');
      les_categories_names[index].classList.add('innactive');
    });
  });

  newpostBackB.addEventListener('click', () => {
    newPost.classList.remove('active');
    newPost.classList.add('innactive');
    addPost.classList.remove('innactive');
    addPost.classList.add('active');
    Textarea.value = '';
  });

  newpostAddB.addEventListener('click', () => {
    if (Textarea.value !== '') {
      newPost.classList.remove('active');
      newPost.classList.add('innactive');
      addPost.classList.remove('innactive');
      addPost.classList.add('active');
      Textarea.value = '';
    }
  });
});

document.querySelector('.help').addEventListener('click', () => {
  window.location.href = './help.html';
});