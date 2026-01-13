const li1 = document.querySelector('.li1');
const li2 = document.querySelector('.li2');
const li3 = document.querySelector('.li3');
const li4 = document.querySelector('.li4');
const menu = document.querySelector('.menu');

let path = "menu1.html?type=";
li1.addEventListener("click", () => window.location.href = `${path}food`);
li2.addEventListener("click", () => window.location.href = `${path}lunch`);
li3.addEventListener("click", () => window.location.href = `${path}dinner`);
li4.addEventListener("click", () => window.location.href = `${path}drink`);
menu.addEventListener("click", () => window.location.href = "menu.html");

const params = new URLSearchParams(window.location.search);
const type = params.get('type')?.toLowerCase();

const API_URL = "https://694d541bad0f8c8e6e20679f.mockapi.io/menu";

let currentTypeItems = [];

const container = document.querySelector(".menu-items");
const cont = document.querySelector(".cont"); 
const filterDiv = document.querySelector(".filters");

async function getMenu() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch menu data");
        const data = await res.json();

        currentTypeItems = data.filter(item => item.type?.toLowerCase() === type);

        renderMenu(currentTypeItems);
        cont.style.display = "none"; 

    } catch (error) {
        console.error("Error fetching menu:", error);
        container.innerHTML = "<p>Failed to load menu. Please try again later.</p>";
    }
}

function renderMenu(items) {
    container.innerHTML = "";
    cont.style.display = "none"; 

    if (items.length === 0) {
        cont.innerHTML = `<h2>Sorry, nothing found</h2>`;
        let img = document.createElement("img");
        img.src = "imgs/sad-face.png";
        img.alt = "Sad face";
        img.style.width = "200px"; 
        img.style.height = "200px";
        cont.appendChild(img);
        cont.style.display = "flex";
        return;
    }

    
    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <h3>${item.name}</h3>
            <div class="items">
                <div><img src="${item.image}" alt="${item.name}"></div>
                <div>
                    <p><span>Flavour:</span> ${item.flavor}</p>
                    <p><span>Calories:</span> ${item.calories}</p>
                    <p><span>Size:</span> ${item.size}</p>
                    <p><span>Price:</span> ${item.price}</p>
                </div>
            </div>
            <p class="ingredients"><span>Ingredients:</span> ${item.ingredients}</p>
        `;
        container.appendChild(div);
    });
}

document.querySelector("#toggle-filters").addEventListener("click", () => {
    filterDiv.style.display = filterDiv.style.display === "none" ? "block" : "none";
});

document.querySelector("#apply-filters").addEventListener("click", () => {
    const minPrice = parseFloat(document.querySelector("#price1").value) || 0;
    const maxPrice = parseFloat(document.querySelector("#price2").value) || Infinity;
    const calSort = document.querySelector("#sortbycall").value;
    const searchQuery = document.querySelector("#search").value.toLowerCase();

    let filteredItems = currentTypeItems.filter(item => {
        const price = parseFloat(item.price) || 0;
        const matchesPrice = price >= minPrice && price <= maxPrice;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        return matchesPrice && matchesSearch;
    });

    if (calSort === "asc") {
        filteredItems.sort((a, b) => (parseFloat(a.calories) || 0) - (parseFloat(b.calories) || 0));
    } else if (calSort === "desc") {
        filteredItems.sort((a, b) => (parseFloat(b.calories) || 0) - (parseFloat(a.calories) || 0));
    }

    renderMenu(filteredItems);
    filterDiv.style.display = "none";
});

document.querySelector("#remove-filters").addEventListener("click", () => {
    document.querySelector("#price1").value = "";
    document.querySelector("#price2").value = "";
    document.querySelector("#sortbycall").value = "";
    document.querySelector("#search").value = "";

    renderMenu(currentTypeItems);
    filterDiv.style.display = "none";
});


getMenu();
