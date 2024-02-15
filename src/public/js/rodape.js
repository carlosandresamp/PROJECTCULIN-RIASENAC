// Criação dos elementos HTML
const footer = document.createElement("div");
footer.className = "footer";

const logoRodapier = document.createElement("h1");
logoRodapier.className = "logo-rodapier";

const logoLink = document.createElement("a");
logoLink.href = "index.html";

const logoImage = document.createElement("img");
logoImage.width = "100";
logoImage.src = "../media/images/logo-branca.png";
logoImage.alt = "";

const copyright = document.createElement("span");
copyright.className = "copyright";
copyright.textContent = "© Todos os Direitos Reservados - 2017.";

const socialRodapier = document.createElement("div");
socialRodapier.className = "social-rodapier";

// Função para criar botões sociais
function createSocialButton(href, imgSrc) {
  const socialButton = document.createElement("button");
  socialButton.className = "btn-social-rodapier";

  const socialLink = document.createElement("a");
  socialLink.href = href;
  socialLink.target = "_blank";

  const socialImage = document.createElement("img");
  socialImage.width = "20";
  socialImage.src = imgSrc;
  socialImage.alt = "";

  socialLink.appendChild(socialImage);
  socialButton.appendChild(socialLink);

  return socialButton;
}

// Criação dos botões sociais
const facebookButton = createSocialButton(
  "https://www.facebook.com/SenacBrasil",
  "../media/images/facebook-rodapier.png"
);
const instagramButton = createSocialButton(
  "https://www.instagram.com/senacbrasil/",
  "../media/images/instagram-rodapier.png"
);
const twitterButton = createSocialButton(
  "https://twitter.com/SenacBrasil",
  "../media/images/x-twitter-rodapier.png"
);
const linkedinButton = createSocialButton(
  "https://www.linkedin.com/company/2655383",
  "../media/images/linkedin-rodapier.png"
);
const youtubeButton = createSocialButton(
  "https://www.youtube.com/user/SenacNacional",
  "../media/images/youtube-rodapier.png"
);

// Adição dos elementos criados ao DOM
logoLink.appendChild(logoImage);
logoRodapier.appendChild(logoLink);

footer.appendChild(logoRodapier);
footer.appendChild(copyright);

socialRodapier.appendChild(facebookButton);
socialRodapier.appendChild(instagramButton);
socialRodapier.appendChild(twitterButton);
socialRodapier.appendChild(linkedinButton);
socialRodapier.appendChild(youtubeButton);

footer.appendChild(socialRodapier);

// Adição do footer ao final do body
document.body.appendChild(footer);
