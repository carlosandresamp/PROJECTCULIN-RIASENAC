
let recipeList; // lista de receitas

// Base para a interação com o backend. (Sugestão apenas)
class Recipe {  //Classe de receitas, para a criação de objetos nas funções abaixo, ou para exportar para outros módulos.
  constructor (id, name, chef, ingredients, preparation, duration, category, images, videos, rating){
    this.id = id;
    this.name = name;
    this.chef = chef;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.duration = duration;
    this.category = category;// Deve ser lista
    this.images = images;// Deve ser lista
    this.videos = videos;// Deve ser lista
    this.rating = rating;
  }
}

function GetRecipes(parms){
  //Solicitar as receitas de acordo com parâmetros (todas, por chef, por nome, etc.). É possível criar uma função para cada busca separadamente.
  // e salvar na recipeList para serem carregadas nos cards ou exibidas na página ver-receitas.
  return recipeList;
}

function SaveRecipe(recipe){
  //Salva a receita, nova ou editada, se preferirem podem fazer em duas funções ao invés de uma.
}

function EditRecipe(receita){

}

function DeleteRecipe(recipeID){
  //Deleta a receita de acordo com o id fornecido
}

export default {GetRecipes, SaveRecipe, DeleteRecipe, recipeList}

