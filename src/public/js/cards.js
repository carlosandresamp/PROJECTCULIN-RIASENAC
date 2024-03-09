async function createCard(receita) {

  const anchorElement = document.createElement('a');
  anchorElement.href = './ver-receitas.html';

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';

  const imageElement = document.createElement('img');
  imageElement.src = '../media/images/Uploads/' + receita.foto;

  cardDiv.appendChild(imageElement);


  const chefDiv = document.createElement('div');
  chefDiv.className = 'chef';

  const chefImageElement = document.createElement('img');
  chefImageElement.src = '../media/images/Uploads/' + receita.user.foto;


  chefDiv.appendChild(chefImageElement);


  const chefDetailsDiv = document.createElement('div');


  const recipeTitleElement = document.createElement('h3');
  recipeTitleElement.textContent = receita.Titulo; 
  chefDetailsDiv.appendChild(recipeTitleElement);


  const chefBylineElement = document.createElement('i');
  chefBylineElement.textContent = 'Por: ' + receita.user.nome; 
  chefDetailsDiv.appendChild(chefBylineElement);



  const ratingSpan = document.createElement('span');
  ratingSpan.textContent = '🧡 ' + receita.likes; 
  chefDetailsDiv.appendChild(ratingSpan);

  chefDiv.appendChild(chefDetailsDiv);


  cardDiv.appendChild(chefDiv);


  cardDiv.addEventListener('click', () => {

    window.location.href = './ver-receitas.html?id=' + receita._id; 
  });

  return cardDiv;
}


async function fetchReceitasAndCreateCards() {
  const response = await fetch('/getReceita');
  const receitas = await response.json();

  for (let receita of receitas) {
    document.getElementById('cards').appendChild(await createCard(receita));
  }
}

document.addEventListener('DOMContentLoaded', (event) => {

  fetchReceitasAndCreateCards();
});
