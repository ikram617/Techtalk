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
  var like = document.querySelector('.likes i')
  var dislike = document.querySelector('.fa-thumbs-down')
  // Fonction pour charger les commentaires
  function loadAllComments() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_comments.php', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const comments = response.detailed_comments;
        const postsContainer = document.querySelector('.posts');
        postsContainer.innerHTML = ''; // Clear current comments
        comments.forEach(comment => {
          const postLike = document.createElement('div');
          postLike.classList.add('postLike');

          const post = document.createElement('div');
          post.classList.add('AffichePost');
          post.innerHTML = `
            <div class="info">
              <p class="username">${comment.username}</p>
              <p class="userField">${comment.userField}</p>
              <p class="comment_id" style="display:none">${comment.comment_id}</p>
            </div>
            <hr style="height: 1px; border: none; background-color: black; width: 100%;">
            <div class="comment">
              <p>${comment.comment}</p>
            </div>
          `;

          const likes = document.createElement('div');
          likes.classList.add('likes');
          likes.innerHTML = `
            <i class="fa-regular fa-thumbs-up" data-liked="false"></i><span class="like-count">${comment.likes}</span>
            <i class="fa-regular fa-thumbs-down" data-liked="false"></i><span class="dislike-count">${comment.dislikes}</span>
          `;

          likes.querySelector('.fa-thumbs-up').addEventListener('click', (event) => {
            handleLikeDislike(comment.comment_id, 'like', likes, event.target);
          });

          likes.querySelector('.fa-thumbs-down').addEventListener('click', (event) => {
            handleLikeDislike(comment.comment_id, 'dislike', likes, event.target);
          });

          postLike.appendChild(post);
          postLike.appendChild(likes);
          postsContainer.appendChild(postLike);
        });
      }
    };
    xhr.send();
  }

  // Fonction pour charger les commentaires par catégorie
  function loadCommentsByCategory(categoryId) {
    console.log(`Loading comments for category ID: ${categoryId}`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `get_comments_by_category.php?category_id=${categoryId}`, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log('Response JSON:', response);
          const comments = response.detailed_comments;
          const postsContainer = document.querySelector('.posts');
          postsContainer.innerHTML = ''; // Clear current comments
          comments.forEach(comment => {
            const postLike = document.createElement('div');
            postLike.classList.add('postLike');
  
            const post = document.createElement('div');
            post.classList.add('AffichePost');
            post.innerHTML = `
              <div class="info">
                <p class="username">${comment.username}</p>
                <p class="userField">${comment.userField}</p>
                <p class="comment_id" style="display:none">${comment.comment_id}</p>
              </div>
              <hr style="height: 1px; border: none; background-color: black; width: 100%;">
              <div class="comment">
                <p>${comment.comment}</p>
              </div>
            `;
  
            const likes = document.createElement('div');
            likes.classList.add('likes');
            likes.innerHTML = `
              <i class="fa-regular fa-thumbs-up" data-liked="false"></i><span class="like-count">${comment.likes}</span>
              <i class="fa-regular fa-thumbs-down" data-liked="false"></i><span class="dislike-count">${comment.dislikes}</span>
            `;
  
            likes.querySelector('.fa-thumbs-up').addEventListener('click', (event) => {
              handleLikeDislike(comment.comment_id, 'like', likes, event.target);
            });
  
            likes.querySelector('.fa-thumbs-down').addEventListener('click', (event) => {
              handleLikeDislike(comment.comment_id, 'dislike', likes, event.target);
            });
  
            postLike.appendChild(post);
            postLike.appendChild(likes);
            postsContainer.appendChild(postLike);
          });
        } catch (e) {
          console.error('Erreur lors de l\'analyse du JSON:', e);
          console.error('Réponse JSON:', xhr.responseText);
        }
      }
    };
    xhr.send();
  }
  
  // Fonction pour gérer les likes et dislikes
  function handleLikeDislike(commentId, type, likesContainer, target) {
    console.log(`Sending data: comment_id=${commentId}, type=${type}`);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'handle_likes_dislikes.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Mettre à jour les compteurs de likes et dislikes
          const likeCount = likesContainer.querySelector('.like-count');
          const dislikeCount = likesContainer.querySelector('.dislike-count');

          if (type === 'like') {
            const thumbsUp = likesContainer.querySelector('.fa-thumbs-up');
            const thumbsDown = likesContainer.querySelector('.fa-thumbs-down');
            if (thumbsUp.dataset.liked !== 'true') {
              likeCount.textContent = parseInt(likeCount.textContent) + 1;
              if (thumbsDown.dataset.liked === 'true') {
                dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
                thumbsDown.dataset.liked = 'false';
              }
              thumbsUp.dataset.liked = 'true';
            } else {
              likeCount.textContent = parseInt(likeCount.textContent) - 1;
              thumbsUp.dataset.liked = 'false';
            }
          } else if (type === 'dislike') {
            const thumbsUp = likesContainer.querySelector('.fa-thumbs-up');
            const thumbsDown = likesContainer.querySelector('.fa-thumbs-down');
            if (thumbsDown.dataset.liked !== 'true') {
              dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
              if (thumbsUp.dataset.liked === 'true') {
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
                thumbsUp.dataset.liked = 'false';
              }
              thumbsDown.dataset.liked = 'true';
            } else {
              dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
              thumbsDown.dataset.liked = 'false';
            }
          }
        } else {
          alert(response.message);
        }
      }
    };
    xhr.send(`comment_id=${commentId}&type=${type}`);
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
/*les_categories.forEach((listItem, index) => {
  listItem.addEventListener('mouseenter', () => {
    les_categories_names[index].classList.remove('innactive');
    les_categories_names[index].classList.add('active');
  });

  listItem.addEventListener('mouseleave', () => {
    les_categories_names[index].classList.remove('active');
    les_categories_names[index].classList.add('innactive');
  });

  listItem.addEventListener('click', () => {
    // Désactiver toutes les catégories
    les_categories.forEach((item, idx) => {
      les_categories_names[idx].classList.remove('active');
      item.classList.remove('active');
    });

    // Activer la catégorie cliquée
    listItem.classList.add('active');
    les_categories_names[index].classList.add('active');
    
    const categoryId = listItem.getAttribute('data-category-id');
    const categoryText = listItem.querySelector('.Titres p').textContent.trim();
    
    console.log(`Category ID clicked: ${categoryId}`);
    
    // Charger les commentaires de la catégorie sélectionnée
    loadCommentsByCategory(categoryId);
  });
});
*/
les_categories.forEach((listItem, index) => {
  listItem.addEventListener('mouseenter', () => {
    if (!listItem.classList.contains('active')) {
      les_categories_names[index].classList.remove('innactive');
      les_categories_names[index].classList.add('active');
    }
  });

  listItem.addEventListener('mouseleave', () => {
    if (!listItem.classList.contains('active')) {
      les_categories_names[index].classList.remove('active');
      les_categories_names[index].classList.add('innactive');
    }
  });
  listItem.addEventListener('click', () => {
    les_categories.forEach((item, idx) => {
      if (!listItem.classList.contains('active')){
      item.classList.remove('active');
      les_categories_names[idx].classList.remove('active');
      les_categories_names[idx].classList.add('innactive');
    }
    else{
      les_categories_names[idx].classList.remove('active');
      les_categories_names[idx].classList.add('innactive');
      loadAllComments(); 
    }
    });
    listItem.classList.add('active');
    les_categories_names[index].classList.remove('innactive');
    les_categories_names[index].classList.add('active');

    const categoryId = listItem.getAttribute('data-category-id');
    console.log(`Loading comments for category ID: ${categoryId}`);
    loadCommentsByCategory(categoryId);
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

  document.querySelector('.help').addEventListener('click', () => {
    window.location.href = './help.html';
  });


  // search bar 
  search.addEventListener('click',function(e){
    if(e.key==='Enter')
      console.log(this.value)
    searchbarFunction()
})

var searchIcon = document.querySelector('.searchBar i')
searchIcon.addEventListener('click',()=>{
   console.log(search.value) 
   searchbarFunction()
})

  // Ajouter la gestion des likes et dislikes
  document.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('fa-thumbs-up')) {
      const postLikeContainer = event.target.closest('.postLike');
      const commentId = postLikeContainer.querySelector('.comment_id').textContent;
      handleLikeDislike(commentId, 'like', postLikeContainer.querySelector('.likes'), event.target);
    } else if (event.target.classList.contains('fa-thumbs-down')) {
      const postLikeContainer = event.target.closest('.postLike');
      const commentId = postLikeContainer.querySelector('.comment_id').textContent;
      handleLikeDislike(commentId, 'dislike', postLikeContainer.querySelector('.likes'), event.target);
    }
  });
  //change color like and dislike 
  document.querySelector('.posts').addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-thumbs-up')) {
      console.log('Thumbs up clicked');
      const currentColor = window.getComputedStyle(event.target).color;
      console.log('Current color:', currentColor);
      event.target.style.color = currentColor === 'rgb(136, 136, 136)' ? 'rgb(0, 0, 0)' : 'rgb(136, 136, 136)';
    } else if (event.target.classList.contains('fa-thumbs-down')) {
      console.log('Thumbs down clicked');
      const currentColor = window.getComputedStyle(event.target).color;
      console.log('Current color:', currentColor);
      event.target.style.color = currentColor === 'rgb(136, 136, 136)' ? 'rgb(0, 0, 0)' : 'rgb(136, 136, 136)';
    }
  });
  
  
  // Gestion du bouton de déconnexion
  var logoutB = document.querySelector('.logout button');
  logoutB.addEventListener('click', () => {
    window.location.href = './wlcmP.html';
  });
});




function searchbarFunction() {
  const searchphrase = document.querySelector('.searchBar input').value.trim().toLowerCase();
  const postsContainer = document.querySelector('.posts');
  const posts = Array.from(document.querySelectorAll('.postLike')); 

  const matchingPosts = posts.filter(post => {
    const commentText = post.querySelector('.comment p').textContent.trim().toLowerCase();
    return commentText.includes(searchphrase); 
  });

  const nonMatchingPosts = posts.filter(post => !matchingPosts.includes(post));
  postsContainer.innerHTML = ''; 
  matchingPosts.forEach(post => postsContainer.appendChild(post)); 
  nonMatchingPosts.forEach(post => postsContainer.appendChild(post)); 
}

