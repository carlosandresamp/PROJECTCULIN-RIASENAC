var menu = {
  logo: "../media/images/logo-senac-cnc-color-100.png",
  links: [
    { href: "inicio.html", text: "Ínicio" },
    { href: "http://www.senac.br/", text: "Senac", target: "_blank" },
    { href: "chefs.html", text: "Chefs" },
    { href: "login.html", text: "Login" },
  ],
  social: [
    {
      href: "https://www.facebook.com/SenacBrasil",
      img: "../media/images/facebook.png",
      target: "_blank",
    },
    {
      href: "https://www.instagram.com/senacbrasil/",
      img: "../media/images/instagram.png",
      target: "_blank",
    },
    {
      href: "https://twitter.com/SenacBrasil",
      img: "../media/images/x-twitter.png",
      target: "_blank",
    },
    {
      href: "https://www.linkedin.com/company/2655383",
      img: "../media/images/linkedin.png",
      target: "_blank",
    },
    {
      href: "https://www.youtube.com/user/SenacNacional",
      img: "../media/images/youtube.png",
      target: "_blank",
    },
  ],
};

function btnTopoFactory(hreff, textt, idd) {
  let a = document.createElement("a");
  let btn = document.createElement("button");
  btn.textContent = textt;
  btn.className = "btn-menu-desktop";
  a.appendChild(btn);
  a.href = hreff;
  a.id = idd;
  console.log(textt);
  return a;
}

let btnInicio = btnTopoFactory("inicio.html", "Início", "btn-inicio");
let btnSenac = btnTopoFactory("http://www.senac.br/", "SENAC", "btn-senac");
let btnChef = btnTopoFactory("chefs.html", "Chefs", "btn-chefs");
let btnLogin = btnTopoFactory("login.html", "Login", "btn-login");
let btnMyPerfil = btnTopoFactory("my-perfil.html", "Perfil", "btn-my-perfil");
let btnlogout = btnTopoFactory("inicio.html", "logout", "btn-logout");
let btnadicionar = btnTopoFactory(
  "dashboard.html",
  "dashboard",
  "btn-adicionar"
);

fetch("/verificalogin")
  .then((resposta) => resposta.json())
  .then((dados) => {
    if (dados.login) {
      console.log(dados.login);
      btnLogin.style.display = "none";
      btnMyPerfil.style.display = "block";
      btnlogout.style.display = "block";
      btnadicionar.style.display = "block";
    } else {
      btnLogin.style.display = "block";
      btnMyPerfil.style.display = "none";
      btnlogout.style.display = "none";
      btnadicionar.style.display = "none";
    }
  })
  .catch((erro) => console.error("Erro na requisição: " + erro));

// Criar função que faz encerrar a sessão do usuário
function logout() {
  fetch("/logout")
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.success) {
        window.location.href = "inicio.html";
        alert("deslogado com sucesso!");
      } else {
        alert("Erro ao fazer logout: " + dados.message);
      }
    })
    .catch((erro) => console.error("Erro na requisição: " + erro));
}
btnlogout.addEventListener("click", logout);

// Função para criar o menu
function createMenu(menu) {
  var topo = document.getElementById("topo");

  // Criação do logo
  var logoDiv = document.createElement("div");
  logoDiv.className = "logo";
  var h1 = document.createElement("h1");
  var a = document.createElement("a");
  a.href = "inicio.html";
  var img = document.createElement("img");
  img.width = "100";
  img.src = menu.logo;
  a.appendChild(img);
  h1.appendChild(a);
  logoDiv.appendChild(h1);
  topo.appendChild(logoDiv);

  // Criação dos links do menu
  var nav = document.createElement("nav");
  nav.classList.add("nav", "center")
  var btnMenu = document.createElement("button");
  btnMenu.className = "btn-menu";
  btnMenu.setAttribute("aria-label", "Abrir Menu");
  btnMenu.setAttribute("aria-haspopup", "true");
  btnMenu.setAttribute("aria-controls", "menu");
  btnMenu.setAttribute("aria-expanded", "false");
  var span = document.createElement("span");
  span.className = "hamburger";
  btnMenu.appendChild(span);
  nav.appendChild(btnMenu);
  var ul = document.createElement("ul");
  ul.className = "menu";
  ul.id = "menu";
  ul.role = "menu";

  ul.append(
    btnInicio,
    btnSenac,
    btnChef,
    btnLogin,
    btnMyPerfil,
    btnlogout,
    btnadicionar
  );
  nav.appendChild(ul);

  // Criação dos botões sociais
  var socialDiv = document.createElement("div");
  socialDiv.className = "social";
  menu.social.forEach(function (social) {
    var a = document.createElement("a");
    a.href = social.href;
    if (social.target) {
      a.target = social.target;
    }
    var button = document.createElement("button");
    button.className = "btn-social";
    var img = document.createElement("img");
    img.width = "20";
    img.src = social.img;
    button.appendChild(img);
    a.appendChild(button);
    socialDiv.appendChild(a);
  });
  topo.appendChild(nav);
  topo.appendChild(socialDiv);
}

// Chame a função createMenu quando a página for carregada
window.onload = function () {
  createMenu(menu);
};

// Chame a função createMenu quando a página for carregada
window.onload = function () {
  createMenu(menu);
};






// Criar as categorias

var categorias = ["Almoço", "Lanches", "Bolos", "Vitaminas", "Bebidas", "Aperitivos", "Sobremesas", "Jantar", "Sopas", "Saladas", "Carnes"];

var divCategoria = document.querySelector('.category');

for (var i = 0; i < categorias.length; i++) {
    var a = document.createElement('a');
    a.href = "#";

    // Cria um novo elemento 'button'
    var button = document.createElement('button');
    button.className = "btn-category";
    button.textContent = categorias[i];

    a.appendChild(button);

    divCategoria.appendChild(a);
}