window.addEventListener("load", function () {
  // Selecione os campos de senha, confirmação de senha, CPF e e-mail
  const senhaInput = document.querySelector(
    'input[type="password"][placeholder="Crie uma senha"]'
  );
  const confirmarSenhaInput = document.querySelector(
    'input[type="password"][placeholder="Confirme a senha"]'
  );
  const cpfInput = document.querySelector('input[placeholder="CPF"]');
  const emailInput = document.querySelector('input[type="email"]');

  // Função para enviar dados
  function enviarDados() {
    const nome = document.querySelector(".Nome input").value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const confirmarsenha = confirmarSenhaInput.value;
    const cpf = cpfInput.value;

    const data = { nome, email, senha, confirmarsenha, cpf };

    fetch("/RegistrarUsuarioController", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Conta cadastrada com sucesso!");
        window.location.href = "../pages/login.html";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Adicione um ouvinte de evento de submit ao formulário
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (senhaInput.value !== confirmarSenhaInput.value) {
      senhaInput.value = "";
      confirmarSenhaInput.value = "";
      alert("As senhas não correspondem. Por favor, insira novamente.");
      return;
    }

    if (cpfInput.value.length !== 11) {
      cpfInput.value = "";
      alert("O CPF deve conter 11 dígitos. Por favor, insira novamente.");
      return;
    }

    if (!emailInput.value.endsWith("@gmail.com")) {
      emailInput.value = "";
      alert("Por favor, insira um e-mail válido do tipo @gmail.com.");
      return;
    }

    // Se todas as validações passarem, envie os dados
    enviarDados();
  });
});

window.addEventListener("load", function () {
  // Selecione os campos de e-mail e senha
  const emailInput = document.querySelector(
    'input[type="email"][placeholder="Digite seu e-mail"]'
  );
  const passwordInput = document.querySelector(
    'input[type="password"][id="password"]'
  );

  // Função para enviar dados
  function enviarDados() {
    const email = emailInput.value;
    const senha = passwordInput.value;

    const data = { email, senha };

    fetch("/LoginUsuarioController", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login realizado com sucesso!");
          window.location.href = "../pages/inicio.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao fazer login. Por favor, tente novamente.");
      });
  }

  // Adicione um ouvinte de evento ao formulário para enviar os dados quando o formulário for enviado
  document
    .querySelector(".formLogin")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o comportamento padrão do formulário
      enviarDados(); // Chama a função para enviar os dados
    });
});
