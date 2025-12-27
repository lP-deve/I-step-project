let li1 = document.querySelector('.li1');
let li2 = document.querySelector('.li2');
let li3 = document.querySelector('.li3');
let li4 = document.querySelector('.li4');
let menu = document.querySelector('.menu')
const params = new URLSearchParams(window.location.search);
const type = params.get('type');


const API_URL = `https://694d541bad0f8c8e6e20679f.mockapi.io/menu`;

async function getMenu() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);

    
    const filtered = data.filter(item => item.type === type);

    const container = document.querySelector('.menu-items');
    container.innerHTML = '';
      filtered.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('menu-item');
      div.innerHTML = `
        <h3>${item.name}</h3>
    
      <div class="items">
        <div><img src="${item.image}"></div>
         <div>  <p><span>Flavour:</span> ${item.flavor}</p>
        <p><span>Calories:</span> ${item.calories}</p>
        <p><span>Size:</span> ${item.size}</p>
        <p><span>Price:</span> ${item.price}</p>
        </div>

        </div>
     <p class="ingredients"><span>Ingredients:</span> ${item.ingredients}</p>
      `;
      container.appendChild(div);
    });

  } catch (error) {
    console.log(error);
  }
}

getMenu();

li1.addEventListener("click", () => {
  window.location.href = `menu1.html?type=food`;
});
li2.addEventListener("click", () => {
  window.location.href = `menu1.html?type=lunch`;
});
li3.addEventListener("click", () => {
  window.location.href = `menu1.html?type=dinner`;
});     
li4.addEventListener("click", () => {
  window.location.href = `menu1.html?type=drink`;
}); 
menu.addEventListener('click', ()=>{
  window.location.href = "menu.html"
})
