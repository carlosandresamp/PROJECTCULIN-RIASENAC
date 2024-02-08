document.getElementById('recipe-form').addEventListener('input', function(e) {
    if (e.target.id == 'image-link') {
        document.getElementById('image-preview').src = e.target.value;
    } else if (e.target.id == 'video-link') {
        let videoId = e.target.value.split('v=')[1];
        if (videoId) {
            document.getElementById('video-preview').src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            document.getElementById('video-preview').src = '';
        }
    }

    if (e.target.id == 'recipe-name' || e.target.id == 'ingredients' || e.target.id == 'preparation' || e.target.id == 'preparation-time') {
        let form = document.getElementById('recipe-form');
        form.classList.remove('invalid');
        form.classList.add('valid');
    }
});

document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!document.getElementById('recipe-name').value.trim()) {
        alert('O nome da receita é obrigatório.');
        return;
    }

    if (!document.getElementById('ingredients').value.trim()) {
        alert('Os ingredientes são obrigatórios.');
        return;
    }

    if (!document.getElementById('preparation').value.trim()) {
        alert('O modo de preparo é obrigatório.');
        return;
    }

    if (!document.getElementById('preparation-time').value.trim()) {
        alert('O tempo de preparo é obrigatório.');
        return;
    }

    if (document.getElementById('image-preview').src.startsWith('data:image')) {
        alert('A foto é obrigatória ou o link inserido não é válido.');
        return;
    }

    // Here you can add the code to save the recipe
    console.log('Recipe saved:', {
        name: document.getElementById('recipe-name').value,
        ingredients: document.getElementById('ingredients').value,
        preparation: document.getElementById('preparation').value,
        preparationTime: document.getElementById('preparation-time').value,
        image: document.getElementById('image-link').value,
        video: document.getElementById('video-link').value
    });

    let form = document.getElementById('recipe-form');
    form.classList.remove('valid');
    form.classList.add('invalid');
});

document.getElementById('choose-image').addEventListener('click', function() {
    document.getElementById('image-upload').click();
});

document.getElementById('image-upload').addEventListener('change', function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
        let img = new Image();
        img.onload = function() {
            if (img.width > 1280 || img.height > 720) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = 500;
                canvas.height = 300;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                document.getElementById('image-preview').src = canvas.toDataURL();
            } else {
                document.getElementById('image-preview').src = event.target.result;
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});