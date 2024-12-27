window.addEventListener('load',(e)=>{
 
    var postBD = document.createElement('div')
    postBD.classList.add('AffichePost')
   postBD.innerHTML=`
    
    <div class="info">
      <p class="username">ikram kebir</p>
      <p class="userField">Artificial Intelligence</p>
    </div>
    <hr style="height: 1px; border: none; background-color: black; width: 100%;">
    <div class="comment">
      <p>${Textarea.value}</p>
    </div>

   `

})


document.addEventListener('DOMContentLoaded', () => {

    const newpostAddB = document.querySelector('.AddButton');
    const newpostBackB = document.querySelector('.BackButton');
    const Textarea = document.querySelector('.newPost textarea');
  var les_categories = document.querySelectorAll('.CategoriesNames li')
 var  les_categories_names = document.querySelectorAll('.Titres')
  var search = document.querySelector('.searchBar input') 
   var addPost = document.querySelector('.addPost')
  var newPost = document.querySelector('.newPost')
  var searchIcon = document.querySelector('.searchBar i')
  // Partie Nom de Categorie
  
    // Afficher/masquer le formulaire d'ajout de commentaire
    addPost.addEventListener('click', () => {
        console.log('clicked ')
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
        // ajouter le commentaire au deb du page 
       var post = document.createElement('div')
        post.classList.add('AffichePost')
       post.innerHTML=`
        
        <div class="info">
          <p class="username">ikram kebir</p>
          <p class="userField">Artificial Intelligence</p>
        </div>
        <hr style="height: 1px; border: none; background-color: black; width: 100%;">
        <div class="comment">
          <p>${Textarea.value}</p>
        </div>

       `
       const postsContainer = document.querySelector('.posts');
       postsContainer.insertBefore(post, postsContainer.firstChild);
        // Envoie AJAX pour ajouter le commentaire dans la base de données
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'add_comment.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  les_categories.forEach((listItem, index) => {
      listItem.addEventListener('mouseenter', () => {
      
          les_categories_names[index].classList.remove('innactive');
          les_categories_names[index].classList.add('active');
  les_categories_names[index].addEventListener('click',()=>{
    
          })   
      });
  
        // Envoie du commentaire via POST
        xhr.send('comment=' + encodeURIComponent(comment));
      listItem.addEventListener('mouseleave', () => {
        
          les_categories_names[index].classList.remove('active');
          les_categories_names[index].classList.add('innactive');
      });
  });
  
        // Lorsque la réponse est reçue
        xhr.onload = function () {
          if (xhr.status === 200) {
            // Si l'ajout est réussi, ajouter le commentaire dans la page localement
            const commentSection = document.querySelector('.commentsSection');
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
              <p><strong>Vous:</strong> ${comment}</p>
              <div class="reaction">
                <button class="likeBtn"><i class="fa-solid fa-thumbs-up"></i></button>
                <button class="dislikeBtn"><i class="fa-solid fa-thumbs-down"></i></button>
              </div>
            `;
            commentSection.appendChild(newComment);
  
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
  
    // Charger et afficher tous les commentaires
    function loadAllComments() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'get_comments.php', true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          const comments = JSON.parse(xhr.responseText);
          const commentSection = document.querySelector('.commentsSection');
          commentSection.innerHTML = '';
          comments.forEach(comment => {
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
              <p><strong>${comment.username}:</strong> ${comment.comment}</p>
              <div class="reaction">
                <button class="likeBtn"><i class="fa-solid fa-thumbs-up"></i></button>
                <button class="dislikeBtn"><i class="fa-solid fa-thumbs-down"></i></button>
              </div>
            `;
            commentSection.appendChild(newComment);
          });
        }
      };
      xhr.send();
    }
  
    // Charger les commentaires au chargement de la page
    loadAllComments();
  // Search bar 
  
  search.addEventListener('keyup',function(e){
      if(e.key==='Enter')
        console.log(this.value)
  })
  
    // Partie Nom de Categorie
    

  searchIcon.addEventListener('click',()=>{
     console.log(search.value) 
  })
  // add a new poster 
  
    les_categories.forEach((listItem, index) => {
      listItem.addEventListener('mouseenter', () => {
        les_categories_names[index].classList.remove('innactive');
        les_categories_names[index].classList.add('active');
        les_categories_names[index].addEventListener('click', () => {
          // Action lorsque l'on clique sur la catégorie
        });
      });
 
  addPost.addEventListener('click',()=>{
    newPost.classList.remove('innactive')
    newPost.classList.add('active')
    addPost.classList.remove('active')
    addPost.classList.add('innactive')
    
  })
  
      listItem.addEventListener('mouseleave', () => {
        les_categories_names[index].classList.remove('active');
        les_categories_names[index].classList.add('innactive');
      });
    });
  
    // Barre de recherche
    //const search = document.querySelector('.searchBar input');
    search.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        console.log(this.value);
      }
    });
  newpostBackB.addEventListener('click',()=>{
      newPost.classList.remove('active')
      newPost.classList.add('innactive')
      addPost.classList.remove('innactive')
      addPost.classList.add('active')
      Textarea.value=''
  })
  newpostAddB.addEventListener('click',()=>{
      if(Textarea.value!==''){
      newPost.classList.remove('active')
      newPost.classList.add('innactive')
      addPost.classList.remove('innactive')
      addPost.classList.add('active')
      Textarea.value=''
  }
  })
    searchIcon.addEventListener('click', () => {
      console.log(search.value);
    });
  
  });
  //help
  document.querySelector('.help').addEventListener('click',()=>{
      window.location.href='./help.html'
  })

