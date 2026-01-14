const first = document.querySelector('#first');
const second = document.querySelector('#second');
const third = document.querySelector('#third');
const fourth = document.querySelector('#fourth');

const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const btn4 = document.querySelector('.btn4');

const API_URL = `https://694d541bad0f8c8e6e20679f.mockapi.io/menu`;

async function getMenu() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    renderCategory(first, data, 'food');
    renderCategory(second, data, 'lunch');
    renderCategory(third, data, 'dinner');
    renderCategory(fourth, data, 'drink');

  } catch (error) {
    console.log(error);
  }
}

function renderCategory(container, data, type) {
  const items = data.filter(item => item.type === type).slice(0, 3);

  items.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('food');

    div.innerHTML = `
      <div class="align">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h6>${item.name}</h6>
          <p>${item.ingredients}</p>
        </div>
      </div>
      <span>${item.price}</span>
    `;

    container.insertBefore(div, container.querySelector('button'));
  });
}

getMenu();


btn1.addEventListener("click", () => {
  window.location.href = `menu1.html?type=food`;
});
btn2.addEventListener("click", () => {
  window.location.href = `menu1.html?type=lunch`;
});
btn3.addEventListener("click", () => {
  window.location.href = `menu1.html?type=dinner`;
});
btn4.addEventListener("click", () => {
  window.location.href = `menu1.html?type=drink`;
});
