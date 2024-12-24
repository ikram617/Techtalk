// Partie Nom de Categorie

les_categories = document.querySelectorAll('.CategoriesNames li')
les_categories_names = document.querySelectorAll('.Titres')



les_categories.forEach((listItem, index) => {
    listItem.addEventListener('mouseenter', () => {
    
        les_categories_names[index].classList.remove('innactive');
        les_categories_names[index].classList.add('active');
    });

    listItem.addEventListener('mouseleave', () => {
      
        les_categories_names[index].classList.remove('active');
        les_categories_names[index].classList.add('innactive');
    });
});




// Search bar 
var search = document.querySelector('.searchBar input')
search.addEventListener('keyup',function(e){
    if(e.key==='Enter')
      console.log(this.value)
})