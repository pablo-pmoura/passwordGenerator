let sliderValue = 16;
const inputElement = document.querySelector("#password");
const localStoragePasswords = JSON.parse(localStorage.getItem("passwords"));
let passwords = Array.isArray(localStoragePasswords)
  ? localStoragePasswords
  : [];

const generatePassword = () => {
  const chars =
    "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789!@#$%&*()[]";
  let password = "";

  for (let i = 0; i < sliderValue; i++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNum, randomNum + 1);
  }

  inputElement.value = password;
};

const paragrafValue = () => {
  const pValue = document.querySelector("#char-quantity");
  pValue.innerHTML = sliderValue + " Caracteres";
};

const passwordLength = () => {
  const sliderElement = document.querySelector("#password-length");
  sliderElement.addEventListener("input", function () {
    sliderValue = sliderElement.value;
    generatePassword();
    paragrafValue();
  });
};

const copyPassword = () => {
  navigator.clipboard.writeText(inputElement.value);
};

const savePassword = () => {
  let password = inputElement.value;
  const generatorContainer = document.querySelector("#generator-container");

  if (password === "") {
    const noPasswordWarning = document.createElement("p");
    noPasswordWarning.textContent = "Preencha o campo";
    generatorContainer.appendChild(noPasswordWarning);
  } else {
    passwords.push(password);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    displayPasswords();
  }
};

//password é a array

const displayPasswords = () => {
  const passwordsContainer = document.querySelector(
    "#saved-passwords-container"
  );

  passwordsContainer.innerHTML = "";
  passwords.forEach((password, index) => {
    const passwordElement = document.createElement("div");
    passwordElement.textContent = password;
    passwordElement.classList.add("saved-passwords");

    var removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      alert("botao clicado");
    });

    passwordsContainer.appendChild(passwordElement);
    passwordElement.appendChild(removeButton);
  });
};

const removeAllPasswords = () => {
  localStorage.removeItem("passwords");
  passwords = [];
  displayPasswords();
};

passwordLength();
displayPasswords();
