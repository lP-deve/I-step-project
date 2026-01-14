let stories = document.querySelector('.cont')


const API_URL = `https://694d541bad0f8c8e6e20679f.mockapi.io/articles`

async function getData(){
    try{
      const response = await fetch(API_URL);
      const data = await response.json()
        console.log(data)
         myData(data)
      
    }catch(error){
        console.log(error);
    }
}
getData();

function myData(arr) {
  arr.forEach(item => {
    stories.innerHTML += `
      <div class="blogs" data-id="${item.id}">
        <img src="${item.image}" alt="img">
        <div class="text">
        <span>${item.createdAt}</span>
        <h4>${item.title}</h4>
        <p>${item.story}</p>
        </div>
      
      </div>
    `
  })

  let card = document.querySelectorAll('.blogs')

    card.forEach(cardItem => {
     cardItem.addEventListener("click", (e) => {
      const clicked = e.currentTarget.dataset.id
      console.log(clicked)
      window.location.href = `fullblog.html?id=${clicked}`
    })
  })
}





