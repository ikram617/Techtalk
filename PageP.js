// Partie Nom de Categorie

les_categories = document.querySelectorAll('.CategoriesNames li')
les_categories_names = document.querySelectorAll('.Titres')



les_categories.forEach((listItem, index) => {
    listItem.addEventListener('mouseenter', () => {
    
        les_categories_names[index].classList.remove('innactive');
        les_categories_names[index].classList.add('active');
les_categories_names[index].addEventListener('click',()=>{
  
        })   
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

var searchIcon = document.querySelector('.searchBar i')
searchIcon.addEventListener('click',()=>{
   console.log(search.value) 
})
// add a new poster 

var addPost = document.querySelector('.addPost')
var newPost = document.querySelector('.newPost')
addPost.addEventListener('click',()=>{
  newPost.classList.remove('innactive')
  newPost.classList.add('active')
  addPost.classList.remove('active')
  addPost.classList.add('innactive')
  
})

var newpostAddB = document.querySelector('.AddButton')
var newpostBackB = document.querySelector('.BackButton')
const Textarea = document.querySelector('.newPost textarea')

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


//help
document.querySelector('.help').addEventListener('click',()=>{
    window.location.href='./help.html'
})