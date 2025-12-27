const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const API_URL = `https://694d541bad0f8c8e6e20679f.mockapi.io/articles/${id}`

async function getBlog() {
  const res = await fetch(API_URL)
  const data = await res.json()

  document.getElementById("title").textContent = data.title
  document.getElementById("story").textContent = data.story
  document.getElementById("image").src = data.image
  document.querySelector(".bigger").textContent = data.info
  document.querySelector(".time").innerHTML = ` Created at: ${data.createdAt}`
}

getBlog();

document.getElementById("backBtn").addEventListener("click", () => {
  window.history.back()
})