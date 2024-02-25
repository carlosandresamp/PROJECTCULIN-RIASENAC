function previewImage(event) {
  const preview = document.getElementById("preview-image");
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
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

function previewVideo(event) {
  const preview = document.getElementById("preview-video");
  const url = event.target.value;
  const videoId = url.split("v=")[1];

  if (url && videoId) {
    const iframe = document.createElement("iframe");

    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = "320";
    iframe.height = "240";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    const existingIframe = preview.querySelector("iframe");
    if (existingIframe) {
      preview.removeChild(existingIframe);
    }

    preview.appendChild(iframe);
  } else {
    preview.innerHTML = "";
  }
}
document
  .querySelector(".btn-submit")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const Titulo = document.querySelector("#recipe-name").value;
    const ingredientes = document.querySelector("#ingredients").value;
    const modoDePreparo = document.querySelector("#directions").value;
    const tempo = document.querySelector("#prep-time").value;
    const foto = document.querySelector("#recipe-image").files[0];
    const video = document.querySelector("#video").value;
    let categorias = [];
    if (document.querySelector("#breakfast").checked) {
      categorias.push("Café da Manhã");
    }
    if (document.querySelector("#lunch").checked) {
      categorias.push("Almoço");
    }
    if (document.querySelector("#dinner").checked) {
      categorias.push("Jantar");
    }
    if (document.querySelector("#snack").checked) {
      categorias.push("Sobremesa");
    }
    
    const categoriasString = categorias.join(", ");
    const formData = new FormData();
    formData.append("Titulo", Titulo);
    formData.append("ingredientes", ingredientes);
    formData.append("modoDePreparo", modoDePreparo);
    formData.append("tempo", tempo);
    formData.append("foto", foto);
    formData.append("categoria", categoriasString); 
    formData.append("video", video); 
    const loginResponse = await fetch("/verificalogin");
    const loginData = await loginResponse.json();
    const userId = loginData.id; 
    console.log(userId);
    const response = await fetch("/cadastroReceita", {
      method: "POST",
      headers: {
        userid: userId, 
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = "../pages/inicio.html";
    } else {
      alert(`Erro: ${data.message}`);
    }
  });



const form = document.getElementById("addReceitasForm");
form.addEventListener("submit", adicionarReceita);
