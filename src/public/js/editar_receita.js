function previewImage(event) {
    const preview = document.getElementById('preview-image');
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 320;
        canvas.height = 240;
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        preview.src = canvas.toDataURL();
      };
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }

//   function previewVideo(event) {
//     const preview = document.getElementById('preview-video');
//     const url = event.target.value;
//     const videoId = url.split('v=')[1];
  
//     if (url && videoId) {
//       const iframe = document.createElement('iframe');
  
//       iframe.src = `https://www.youtube.com/embed/${videoId}`;
//       iframe.width = '320';
//       iframe.height = '240';
//       iframe.frameBorder = '0';
//       iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
//       iframe.allowFullscreen = true;
  
//       const existingIframe = preview.querySelector('iframe');
//       if (existingIframe) {
//         preview.removeChild(existingIframe);
//       }
  
//       preview.appendChild(iframe);
//     } else {
//       preview.innerHTML = '';
//     }
//   }

// document.getElementById('recipe-name').textContent = receita.Titulo;




async function fetchReceitaAndFillData() {
  const urlParams = new URLSearchParams(window.location.search);
  const receitaId = urlParams.get('id');

  const response = await fetch('/getReceita/' + receitaId);
  const receita = await response.json();

  document.getElementById('recipe-name').value = receita.Titulo;
  document.getElementById('ingredients').value = receita.ingredientes;
  document.getElementById('directions').value = receita.modoDePreparo;
  document.getElementById('prep-time').value = receita.tempo;

 
  document.getElementById('breakfast').checked = receita.categorias.includes('Café da Manhã');
  document.getElementById('lunch').checked = receita.categorias.includes('Almoço');
  document.getElementById('dinner').checked = receita.categorias.includes('Jantar');
  document.getElementById('snack').checked = receita.categorias.includes('Sobremesa');


  document.getElementById('preview-image').innerHTML = `<img src="../media/images/Uploads/${receita.foto}" alt="Foto da Receita">`;
  document.getElementById('preview-video').innerHTML = `<iframe src="${receita.video}" width="320" height="240" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

document.addEventListener('DOMContentLoaded', fetchReceitaAndFillData);

function previewImage(event) {
  const preview = document.getElementById('preview-image');
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = this.width;
      canvas.height = this.height;

      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

      // Convert to grayscale
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
      ctx.putImageData(imageData, 0, 0);

      preview.innerHTML = `<img src="${canvas.toDataURL()}" alt="Preview da Imagem">`;
    };
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
  }
}
// function previewVideo(event) {
//   const preview = document.getElementById('preview-video');
//   const url = event.target.value;
//   const videoId = url.split('v=')[1];

//   if (url && videoId) {
//     preview.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" width="320" height="240" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//   } else {
//     preview.innerHTML = '';
//   }
// }


document.querySelector('.btn-submit').addEventListener('click', async function (event) {
  event.preventDefault();

  const categorias = [];
  if (document.getElementById('breakfast').checked) categorias.push('Café da Manhã');
  if (document.getElementById('lunch').checked) categorias.push('Almoço');
  if (document.getElementById('dinner').checked) categorias.push('Jantar');
  if (document.getElementById('snack').checked) categorias.push('Sobremesa');

  const foto = document.getElementById('recipe-image').files[0];

  const urlParams = new URLSearchParams(window.location.search);
  const receitaId = urlParams.get('id');

  const formData = new FormData();
  formData.append('id', receitaId);
  formData.append('Titulo', document.getElementById('recipe-name').value);
  formData.append('ingredientes', document.getElementById('ingredients').value);
  formData.append('modoDePreparo', document.getElementById('directions').value);
  formData.append('tempo', document.getElementById('prep-time').value);
  formData.append('categorias', JSON.stringify(categorias));
  if (foto) {
    formData.append('foto', foto);
  }

  const response = await fetch('/update', {
    method: 'PUT',
    body: formData,
  });

  if (response.ok) {
    alert('Receita atualizada com sucesso!');
  } else {
    alert('Erro ao atualizar a receita.');
  }
});