window.addEventListener("load", function () {

  const senhaInput = document.querySelector("input[name='senha']");
  const confirmarSenhaInput = document.querySelector(
    "input[name='confirmarsenha']"
  );
  const cpfInput = document.querySelector("input[name='cpf']");
  const emailInput = document.querySelector("input[name='email']");

  // Função para enviar dados
  function enviarDados() {
    const nome = document.querySelector("input[name='nome']").value;
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
});

// Função para enviar dados
function enviarDados() {
  const nome = document.querySelector("input[name='nome']").value;
  const email = document.querySelector("input[name='email']").value;
  const senha = document.querySelector("input[name='senha']").value;
  const confirmarsenha = document.querySelector(
    "input[name='confirmarsenha']"
  ).value;
  const cpf = document.querySelector("input[name='cpf']").value;

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

window.addEventListener("load", function () {

  document
    .querySelector("#integracao")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let senhaInput = document.querySelector("input[name='senha']");
      let confirmarSenhaInput = document.querySelector(
        "input[name='confirmarsenha']"
      );
      let cpfInput = document.querySelector("input[name='cpf']");
      let emailInput = document.querySelector("input[name='email']");

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


      enviarDados();
    });
});

window.addEventListener("load", function () {

  const emailInput = document.querySelector("input[type='email']");
  const passwordInput = document.querySelector("input[id='password']");

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




  document
    .querySelector("#formLogin")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      enviarDados();
    });
});
