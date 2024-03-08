async function createCard(usuario) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardzin';
    if (usuario.foto === undefined || usuario.foto === null || usuario.foto === "") {
        cardDiv.style.backgroundImage = 'url("../media/images/chefpadrao.png")';
    } else {
        cardDiv.style.backgroundImage = 'url("' + '../media/images/Uploads/' + usuario.foto + '")';
    }

    const chefName = document.createElement('button');
    chefName.className = "nick";
    chefName.textContent = usuario.nome;

    cardDiv.addEventListener('click', () => {
        window.location.href = './perfil-do-chef.html?id=' + usuario._id;
    });

    cardDiv.append(chefName)
    return cardDiv;
}


async function fetchChefsAndCreateCards() {
    const response = await fetch('/getAllUsers');
    const usuario = await response.json();

    for (let chef of usuario) {
        document.getElementById('cardsContainer').appendChild(await createCard(chef));

        console.log(chef._id)
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchChefsAndCreateCards();
});

