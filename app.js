const navItems = document.querySelector("#navItems");
const burgerCheckbox = document.querySelector("#burger");

burgerCheckbox.addEventListener("change", () => {
  if (burgerCheckbox.checked) {
    navItems.classList.add("active");
  } else {
    navItems.classList.remove("active");
  }
});
