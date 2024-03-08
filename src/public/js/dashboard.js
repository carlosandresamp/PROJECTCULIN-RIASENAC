async function fetchUserDataAndFillDashboard() {
  const response = await fetch('/getMyProfile');
  const data = await response.json();

  if (data.login) {
    document.getElementById('nome').textContent = data.usuario.nome;
    document.getElementById('perfilfoto').src = '../media/images/Uploads/' + data.usuario.foto;
  } else {
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  fetchUserDataAndFillDashboard();
});
