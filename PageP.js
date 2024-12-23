// Partie Nom de Categorie

les_categories = document.querySelectorAll('.CategoriesNames img')

les_categories.forEach(element => {
    element.addEventListener('mouseenter', function() {
    console.log("La souris est sur l'élément.");
});

element.addEventListener('mouseleave', function()  {
    console.log("La souris a quitté l'élément.");
});
});


