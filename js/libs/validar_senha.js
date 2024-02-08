window.onload = function () {
  // Selecione os campos de senha, confirmação de senha, CPF e e-mail
  const senhaInput = document.querySelector(
    'input[type="password"][placeholder="Crie uma senha"]'
  );
  const confirmarSenhaInput = document.querySelector(
    'input[type="password"][placeholder="Confirme a senha"]'
  );
  const cpfInput = document.querySelector('input[placeholder="CPF"]');
  const emailInput = document.querySelector('input[type="email"]');

  // Adicione um ouvinte de evento de submit ao formulário
  document.querySelector("form").addEventListener("submit", function (event) {
    if (senhaInput.value !== confirmarSenhaInput.value) {
      event.preventDefault();
      senhaInput.value = "";
      confirmarSenhaInput.value = "";
      alert("As senhas não correspondem. Por favor, insira novamente.");
    }
    // Verifique se o CPF tem 11 dígitos
    if (cpfInput.value.length !== 11) {
      event.preventDefault();
      cpfInput.value = "";
      alert("O CPF deve conter 11 dígitos. Por favor, insira novamente.");
    }
    // Verifique se o e-mail é do tipo @gmail.com
    if (!emailInput.value.endsWith("@gmail.com")) {
      event.preventDefault();
      emailInput.value = "";
      alert("Por favor, insira um e-mail válido do tipo @gmail.com.");
    }
  });
};
