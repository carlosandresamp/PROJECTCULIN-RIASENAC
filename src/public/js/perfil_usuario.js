var stars = document.querySelectorAll('.star-icon');

document.addEventListener('click', function (e) {
  var classStar = e.target.classList;
  if (!classStar.contains('ativo')) {
    stars.forEach(function (star) {
      star.classList.remove('ativo');
    });
    classStar.add('ativo');
    console.log(e.target.getAttribute('data-avaliacao'));
  }
});

let selectedImage;

function previewImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = document.getElementById("profile-pic");
      img.src = e.target.result;
      selectedImage = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}


let selectedImageFile;

document.getElementById('profile-pic').onclick = function () {
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = function (event) {
    selectedImageFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById('profile-pic').src = event.target.result;
    };
    reader.readAsDataURL(selectedImageFile);
  };
  input.click();
};


async function fetchMyProfileAndFillPage() {
  const response = await fetch('/getMyProfile');
  const data = await response.json();

  if (data.login) {
    const usuario = data.usuario;

    document.getElementById('profile-pic').src = '../media/images/Uploads/' + usuario.foto;
    document.querySelector('input[name="nome"]').value = usuario.nome;
    document.querySelector('input[name="email"]').value = usuario.email;
    document.querySelector('input[name="cpf"]').value = usuario.cpf;
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  fetchMyProfileAndFillPage();
});

document.getElementById("load", function () {
  var id = getId();
  if (id) {
    var data = getDados(id);
    preencherPerfil(data);
  } else {
    alert("Você precisa estar logado para ver o seu perfil");
  }
});
document.getElementById('perfil').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData();

  formData.append('nome', document.querySelector('input[name="nome"]').value);
  formData.append('email', document.querySelector('input[name="email"]').value);
  formData.append('cpf', document.querySelector('input[name="cpf"]').value);
  formData.append('foto', selectedImageFile);

  const response = await fetch('/updateMyProfile', {
    method: 'PUT',
    body: formData
  });
  const data = await response.json();

  if (response.ok) {
    alert('Seu perfil foi atualizado com sucesso!');
    location.reload();
  } else {
    alert('Ocorreu um erro ao atualizar seu perfil. Por favor, tente novamente.');
  }
});
