const form = document.querySelector("#login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const API_URL = "https://api.everrest.educata.dev/auth/sign_in";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let newUser = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    let result = await resp.json();

    if (!resp.ok) {
      console.log(result.error);

    } else {
      const msg = document.querySelector(".success");
      const main = document.querySelector(".main");

      
      msg.classList.add("show");
      main.classList.add("dis");

     
      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        console.log("Token:", localStorage.getItem("token"));
      }


      setTimeout(() => {
        msg.classList.remove("show");
        main.classList.remove("dis");
        window.location.href = "book.html";
      }, 3000);
    }
  } catch (error) {
    console.error(error);
  }
});
