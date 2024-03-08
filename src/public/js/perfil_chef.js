async function fetchChefAndFillProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const chefId = urlParams.get('id');

  const response = await fetch('/getUser/' + chefId);
  const data = await response.json();
  const chef = data.usuario;
  const receitas = data.receitas;

  document.getElementById('nome').textContent = chef.nome;
  document.querySelector('.img-perfil').src = '../media/images/Uploads/' + chef.foto;

  const receitaContainer = document.getElementById('receita');
  for (let receita of receitas) {
    const receitaDiv = document.createElement('div');
    receitaDiv.id = 'receita1';

    const labelDiv = document.createElement('div');
    labelDiv.id = 'label';
    const nameLabel = document.createElement('label');
    nameLabel.id = 'names';
    nameLabel.textContent = receita.Titulo;
    labelDiv.append(nameLabel);

    const receitaImg = document.createElement('img');
    receitaImg.src = '../media/images/Uploads/' + receita.foto;
    receitaImg.id = 'receitatipo';

    receitaDiv.append(labelDiv, receitaImg);
    receitaContainer.append(receitaDiv);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  fetchChefAndFillProfile();
});
