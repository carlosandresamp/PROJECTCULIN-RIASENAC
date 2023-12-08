document.addEventListener('DOMContentLoaded', function() {
    const followBtns = document.querySelectorAll('.follow-btn');
    const likeBtns = document.querySelectorAll('.like-btn');
    const favoritBtns = document.querySelectorAll('.favorit-btn');

    followBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert("Agora você está seguindo o chef!");
        });
    });

    likeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert("Obrigado por curtir o chef!");
        });
    });

    favoritBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert("Obrigado por favoritar o chef!");
        });
    });
});