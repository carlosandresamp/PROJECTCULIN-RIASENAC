// Arquivo: validacao_senhas.js

window.onload = function () {
    // Selecione os campos de senha, confirmação de senha, CPF e e-mail
    const senhaInput = document.querySelector('input[type="password"][placeholder="Crie uma senha"]');
    const confirmarSenhaInput = document.querySelector('input[type="password"][placeholder="Confirme a senha"]');
    const cpfInput = document.querySelector('input[placeholder="CPF"]');
    const emailInput = document.querySelector('input[type="email"]');

    // Adicione um ouvinte de evento de submit ao formulário
    document.querySelector('form').addEventListener('submit', function (event) {
        // Verifique se as senhas são diferentes
        if (senhaInput.value !== confirmarSenhaInput.value) {
            // Impede o envio do formulário
            event.preventDefault();
            // Limpa os valores dos campos de senha e confirmação de senha
            senhaInput.value = '';
            confirmarSenhaInput.value = '';
            // Informa ao usuário que as senhas não correspondem
            alert('As senhas não correspondem. Por favor, insira novamente.');
        }

        // Verifique se o CPF tem 11 dígitos
        if (cpfInput.value.length !== 11) {
            // Impede o envio do formulário
            event.preventDefault();
            // Limpa o valor do campo de CPF
            cpfInput.value = '';
            // Informa ao usuário que o CPF deve ter 11 dígitos
            alert('O CPF deve conter 11 dígitos. Por favor, insira novamente.');
        }

        // Verifique se o e-mail é do tipo @gmail.com
        if (!emailInput.value.endsWith('@gmail.com')) {
            // Impede o envio do formulário
            event.preventDefault();
            // Limpa o valor do campo de e-mail
            emailInput.value = '';
            // Informa ao usuário que o e-mail deve ser do tipo @gmail.com
            alert('Por favor, insira um e-mail válido do tipo @gmail.com.');
        }
    });
}