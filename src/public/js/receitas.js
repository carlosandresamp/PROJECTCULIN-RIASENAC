async function fetchReceitaAndFillData() {

  const urlParams = new URLSearchParams(window.location.search);
  const receitaId = urlParams.get('id');


  const response = await fetch('/getReceita/' + receitaId);
  const receita = await response.json();

  console.log(receita.foto)

  document.getElementById('titulo').textContent = receita.Titulo;


  const ingredientesDiv = document.querySelector('.Igredientes');
  const ingredientes = receita.ingredientes.split(', ');
  for (let ingrediente of ingredientes) {
    const label = document.createElement('label');
    label.textContent = '🔸 ' + ingrediente;
    ingredientesDiv.appendChild(label);
  }

  document.getElementById('modo').textContent = 'Modo de preparo (' + receita.tempo + 'min)';
  document.getElementById('preparo').textContent = receita.modoDePreparo;


  const sliderWrapper = document.getElementById('slider-wrapper');

  const imageSlide = document.createElement('div');
  imageSlide.className = 'slide';
  const imageElement = document.createElement('img');
  imageElement.className = 'foto_receita';
  imageElement.src = '../media/images/Uploads/' + receita.foto;
  imageSlide.appendChild(imageElement);
  sliderWrapper.appendChild(imageSlide);



  const videoSlide = document.createElement('div');
  videoSlide.className = 'slide';
  const iframeElement = document.createElement('iframe');
  iframeElement.width = '100%';
  iframeElement.height = '100%';
  iframeElement.src = receita.video;
  iframeElement.frameborder = '0';
  iframeElement.allowfullscreen = true;
  videoSlide.appendChild(iframeElement);
  sliderWrapper.appendChild(videoSlide);
}

document.addEventListener('DOMContentLoaded', fetchReceitaAndFillData);



window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('but').addEventListener('click', (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    window.location.href = `../pages/editar-receitas.html?id=${id}`;
  });
});


// botão editar receita aparecer apenas quando logado 



  $(document).ready(function() {
    // Verifique o login quando a página carregar
    $.get('/verificalogin', function(data) {
      if (data.login) {
        // Usuário logado, mostre o botão
        $('#but').show();
      } else {
        // Usuário não logado, oculte o botão
        $('#but').hide();
      }
    });
  });
