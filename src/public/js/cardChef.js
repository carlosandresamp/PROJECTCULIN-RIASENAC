async function createCard(usuario) {

    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardzin';
    if (usuario.foto === undefined || usuario.foto === null || usuario.foto === "") {
        cardDiv.style.backgroundImage = "../media/images/chefpadrao.png"
    } else {
        cardDiv.style.backgroundImage = usuario.foto;
    }


    const chefName = document.createElement('button');
    chefName.className("nick");
    chefName.textContent = usuario.chef;


    cardDiv.addEventListener('click', () => {
        window.location.href = './chefs.html?id=' + usuario._id;
    });

    cardDiv.append(chefName)
    return cardDiv;
}

async function fetchChefsAndCreateCards() {
    const response = await fetch('/getAllUsers');
    const usuario = await response.json();

    for (let chef of usuario) {
        document.getElementById('fundop').appendChild(await createCard(chef));
        console.log(chef._id)
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchChefsAndCreateCards();
});

