// Crie um objeto para representar o seu menu
var menu = {
    logo: '../media/images/logo-senac-cnc-color-100.png',
    links: [
        { href: 'inicio.html', text: 'Ínicio' },
        { href: 'http://www.senac.br/', text: 'Senac', target: '_blank' },
        { href: 'chefs.html', text: 'Chefs' },
        { href: 'login.html', text: 'Login' }
    ],
    social: [
        { href: 'https://www.facebook.com/SenacBrasil', img: '../media/images/facebook.png', target:'_blank' },
        { href: 'https://www.instagram.com/senacbrasil/', img: '../media/images/instagram.png', target: '_blank' },
        { href: 'https://twitter.com/SenacBrasil', img: '../media/images/x-twitter.png', target: '_blank' },
        { href: 'https://www.linkedin.com/company/2655383', img: '../media/images/linkedin.png', target: '_blank' },
        { href: 'https://www.youtube.com/user/SenacNacional', img: '../media/images/youtube.png', target: '_blank' }
    ]
};

// Função para criar o menu
function createMenu(menu) {
    var topo = document.getElementById('topo');

    // Criação do logo
    var logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    var h1 = document.createElement('h1');
    var a = document.createElement('a');
    a.href = 'inicio.html';
    var img = document.createElement('img');
    img.width = '100';
    img.src = menu.logo;
    a.appendChild(img);
    h1.appendChild(a);
    logoDiv.appendChild(h1);
    topo.appendChild(logoDiv);

    // Criação dos links do menu
    var nav = document.createElement('nav');
    nav.className = 'nav';
    var btnMenu = document.createElement('button');
    btnMenu.className = 'btn-menu';
    btnMenu.setAttribute('aria-label', 'Abrir Menu');
    btnMenu.setAttribute('aria-haspopup', 'true');
    btnMenu.setAttribute('aria-controls', 'menu');
    btnMenu.setAttribute('aria-expanded', 'false');
    var span = document.createElement('span');
    span.className = 'hamburger';
    btnMenu.appendChild(span);
    nav.appendChild(btnMenu);
    var ul = document.createElement('ul');
    ul.className = 'menu';
    ul.id = 'menu';
    ul.role = 'menu';
    menu.links.forEach(function(link) {
        var a = document.createElement('a');
        a.href = link.href;
        if (link.target) {
            a.target = link.target;
        }
        var button = document.createElement('button');
        button.className = 'btn-menu-desktop';
        button.textContent = link.text;
        a.appendChild(button);
        ul.appendChild(a); // Adicione o <a> diretamente ao <ul>
    });
    nav.appendChild(ul);
    topo.appendChild(nav);

    // Criação dos botões sociais
    var socialDiv = document.createElement('div');
    socialDiv.className = 'social';
    menu.social.forEach(function(social) {
        var a = document.createElement('a');
        a.href = social.href;
        if (social.target) {
            a.target = social.target;
        }
        var button = document.createElement('button');
        button.className = 'btn-social';
        var img = document.createElement('img');
        img.width = '20';
        img.src = social.img;
        button.appendChild(img);
        a.appendChild(button);
        socialDiv.appendChild(a);
    });
    nav.appendChild(socialDiv);
    topo.appendChild(nav);
}

// Chame a função createMenu quando a página for carregada
window.onload = function() {
    createMenu(menu);
};



// Chame a função createMenu quando a página for carregada
window.onload = function() {
    createMenu(menu);
};
