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
 /* function loadAllComments() {
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
        comments.classList.add('comment')
      }
    };
    xhr.send();
  }   */

  // Fonction pour charger les commentaires par catégorie
  function loadCommentsByCategory(categoryId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `get_comments_by_category.php?category_id=${categoryId}`, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const comments = JSON.parse(xhr.responseText);
          const postsContainer = document.querySelector('.posts');
          postsContainer.innerHTML = ''; // Clear current comments
          comments.forEach(comment => {
            const post = document.createElement('div');
            post.classList.add('AffichePost');
            post.innerHTML = `
              <div class="info">
                <p class="username">${comment.username}</p>
                <p class="userField">${comment.userField}</p>
              </div>
              <hr style="height: 1px; border: none; background-color: black; width: 100%;">
              <div class="comment">
                <p>${comment.comment}</p>
              </div>
            `;
            postsContainer.appendChild(post);
          });
        } catch (e) {
          console.error('Erreur lors de l\'analyse du JSON:', e);
          console.error('Réponse JSON:', xhr.responseText);
        }
      }
    };
    xhr.send();
  }

  // Afficher/masquer le formulaire d'ajout de commentaire
  addPost.addEventListener('click', () => {
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
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'add_comment.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            // Recharger les commentaires après ajout
            loadAllComments();

            // Réinitialiser le champ de texte et fermer le formulaire
            Textarea.value = '';
            newPost.classList.remove('active');
            newPost.classList.add('innactive');
            addPost.classList.remove('innactive');
            addPost.classList.add('active');
          } else {
            alert('Erreur lors de l\'ajout du commentaire');
          }
        }
      };
      xhr.send(`comment=${encodeURIComponent(comment)}`);
    }
  });

  loadAllComments(); // Charger les commentaires au chargement de la page

  // Ajouter des écouteurs d'événement pour chaque catégorie
  les_categories.forEach((listItem, index) => {
    listItem.addEventListener('mouseenter', () => {
      les_categories_names[index].classList.remove('innactive');
      les_categories_names[index].classList.add('active');
      listItem.addEventListener('click', () => {
        const categoryId = listItem.getAttribute('data-category-id');
        loadCommentsByCategory(categoryId);
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



var like = document.querySelector('.fa-thumbs-up')
var dislike = document.querySelector('.fa-thumbs-down')

like.addEventListener('click',()=>{
  if(like.style.color='#000'){
    like.style.color='#888'
  }
  else{
    like.style.color='#000'
  }
})
dislike.addEventListener('click',()=>{
  if(dislike.style.color='#000'){
    dislike.style.color='#888'
  }
  else{
    dislike.style.color='#000'
  }
})
