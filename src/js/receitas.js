async function fetchReceitaAndFillData() {

  const urlParams = new URLSearchParams(window.location.search);
  const receitaId = urlParams.get('id');


  const response = await fetch('/cadastroReceita/' + receitaId);
  const receita = await response.json();


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
