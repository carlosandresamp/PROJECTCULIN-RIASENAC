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