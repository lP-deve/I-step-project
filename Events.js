
const container = document.querySelector(".container");
const api_url = "https://694fb0888531714d9bceb453.mockapi.io/events";


async function EventsInfo() {
    try {
        const res = await fetch(api_url);
        const data = await res.json();
        console.log(data);
        EventTypes(data);

    } catch (error) {
        console.log("Error fetching events:", error);
    }
}


const EventTypes = (arr) => {
    arr.forEach(type => {
        container.innerHTML += `
          <div class="blog">
            <div class="info">
              <h1>${type.Title}</h1>
              <p>${type.text}</p>
            </div>
            <img src="imgs/${type.id}.png" alt="${type.title}">
          </div>
        `;
    });

    const dives = document.querySelectorAll(".blog");
    if (dives[1]) {
        dives[1].classList.add("reversing");
    }
}


EventsInfo();

