const form = document.querySelector("#register");
const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");

const API_URL = "https://api.everrest.educata.dev/auth/sign_up";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let newUser = {
    firstName: inputs[0].value,
    lastName: inputs[1].value,
    age: Number(inputs[2].value),
    email: inputs[3].value,
    password: inputs[4].value,
    address: inputs[5].value,
    phone: inputs[6].value,
    zipcode: inputs[7].value,
    avatar: inputs[8].value,
    gender: select.value,
  };

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const result = await resp.json();
    console.log(result);

    if (!resp.ok) {
       console;

    } else {

      const msg = document.querySelector(".success");
      const main = document.querySelector(".main");

      msg.classList.add("show");
      main.classList.add("dis");

      setTimeout(() => {
        msg.classList.remove("show");
        main.classList.remove("dis");
        window.location.href = "signin.html"; 
      }, 3000);
    }
  } catch (error) {
    console.error(error);
  }
});
