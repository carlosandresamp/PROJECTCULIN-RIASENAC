// Função para criar um card
function createCard() {
    // Criar o elemento de âncora wrapper
    const anchorElement = document.createElement('a');
    anchorElement.href = './ver-receitas.html';
  
    // Criar o contêiner div do card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    
  
    // Criar o elemento de imagem
    const imageElement = document.createElement('img');
    imageElement.src = '../media/images/colherada.webp';
  
    // Anexar a imagem ao card
    cardDiv.appendChild(imageElement);
  
    // Criar o contêiner div do chef
    const chefDiv = document.createElement('div');
    chefDiv.className = 'chef';
  
    // Criar o elemento de imagem do chef
    const chefImageElement = document.createElement('img');
    chefImageElement.src = '../media/images/chef.png';
  
    // Anexar a imagem do chef ao contêiner do chef
    chefDiv.appendChild(chefImageElement);
  
    // Criar o contêiner div dos detalhes do chef
    const chefDetailsDiv = document.createElement('div');
  
    // Criar o elemento h3 do título da receita
    const recipeTitleElement = document.createElement('h3');
    recipeTitleElement.textContent = 'Lasanha de Frango';
    chefDetailsDiv.appendChild(recipeTitleElement);
  
    // Criar o elemento i do byline do chef
    const chefBylineElement = document.createElement('i');
    chefBylineElement.textContent = 'Por: Jãozin da Cozinha';
    chefDetailsDiv.appendChild(chefBylineElement);
  
    // Criar o elemento span da classificação
    const ratingSpan = document.createElement('span');
    ratingSpan.textContent = '🧡 7.777';
    chefDetailsDiv.appendChild(ratingSpan);
  
    // Anexar os detalhes do chef ao contêiner do chef
    chefDiv.appendChild(chefDetailsDiv);
  
    // Anexar o contêiner do chef ao card
    cardDiv.appendChild(chefDiv);
  
    // Adicionar um evento de clique ao card
    cardDiv.addEventListener('click', () => {
      // Redirecionar para a página da receita quando o card é clicado
      window.location.href = './ver-receitas.html';
    });
  
    // Retornar o card
    return cardDiv;
  }
  
  // Criar 10 cards e anexá-los ao elemento pai desejado no DOM
  // Por exemplo:
  for (let i = 0; i < 10; i++) {
    document.getElementById('cards').appendChild(createCard());
  }