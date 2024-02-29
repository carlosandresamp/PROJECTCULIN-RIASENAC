var stars = document.querySelectorAll('.star-icon');
                  
document.addEventListener('click', function(e){
  var classStar = e.target.classList;
  if(!classStar.contains('ativo')){
    stars.forEach(function(star){
      star.classList.remove('ativo');
    });
    classStar.add('ativo');
    console.log(e.target.getAttribute('data-avaliacao'));
  }
});

  function previewImage(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = document.getElementById("profile-pic");
        img.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  // puxar imagem do usuario na pagina de perfil
  
  document.getElementById('profile-pic').onclick = function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function(event) {
        document.getElementById('profile-pic').src = event.target.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };


  // enviar dados de usuario para pagina de perfil

  function getId() {
    fetch('/verificalogin')
      .then(function(response) {
        return response.json(); 
      })
      .then(function(data) {
        if (data.login) { 
          return data.id; 
        } else {
          return null; 
        }
      })
      .catch(function(error) {
        console.error("Erro ao verificar o login:", error); 
      });
  }
  function getDados(id) {
    fetch('/perfil/' + id) 
      .then(function(response) {
        return response.json(); 
      })
      .then(function(data) {
        console.log("Dados do usuário recebidos:", data); 
       
      })
      .catch(function(error) {
        console.error("Erro ao obter os dados do usuário:", error); 
      });
  }
  function preencherPerfil(data) {
    document.getElementById("profile-pic").src = data.foto;
    document.getElementById("nome").innerHTML = data.nome; 
    document.getElementById("email").innerHTML = data.email;
  
  }
  document.getElementById("load", function() {
    var id = getId(); 
    if (id) { 
      var data = getDados(id); 
      preencherPerfil(data); 
    } else {
      alert("Você precisa estar logado para ver o seu perfil");
    }
  });

  
