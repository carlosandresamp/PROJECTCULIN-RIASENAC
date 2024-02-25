 
import {GetRecipes, SaveRecipe, DeleteRecipe, recipeList} from "./receitas.js"

function PlaceCards(){ 
  for (let recipe of recipeList){
    let card = CardFactory(recipe)
    document.getElementById('cards').appendChild(card);
  }
}

function CardFactory(recipe, ){
  let card = document.createElement('a');
  let container = document.createElement('div');
  container.className = 'card';

  let img = document.createElement('img');
  img.src = recipe.img[0];

  let chef = document.createElement('div');
  chef.className = 'chef';

  let chefImg = document.createElement('img');
  img.src = 'precisa pegar imagem do chef'

  let content = document.createElement('div');
  let h3 = document.createElement('h3');
  h3.textContent = recipe.name;

  let aChef = document.createElement('a');
  aChef.textContent = recipe.chef; 
  aChef.href = ""

  let avaliacao = document.createElement('span');
  avaliacao.textContent = recipe.rating;

  content.append(h3, aChef, avaliacao);
  chef.append(chefImg, content);
  container.append(img, chef);
  card.append(container);

  return card;
}

export default CardFactory