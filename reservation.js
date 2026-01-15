const API_URL = 'https://694fb0888531714d9bceb453.mockapi.io/bookings';
const table = document.querySelector('#Table');
const text = document.querySelectorAll(".success");
const main = document.querySelector(".main")

async function loadBookings() {
  try {
    const res = await fetch(API_URL);
    const bookings = await res.json();

    table.innerHTML = ""
    bookings.forEach(item => {

      table.innerHTML += `
        <tr>
          <td><input type="text" value="${item.name}"></td>
          <td><input type="number" value="${item.number}"></td>
          <td><input type="date" value="${item.date}"></td>
          <td><input type="time" value="${item.time}"></td>
          <td><input type="text" value="${item.text}"></td>
          <td>
           <div> <button onclick="saveBooking('${item.id}', this)">Save</button>
            <button onclick="deleteBooking('${item.id}')">Delete</button></div>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    console.error('Error loading bookings:', err);
  }
}

async function saveBooking(id, btn) {
  const tr = btn.closest('tr');
  const inputs = tr.querySelectorAll('input');

  const bookingData = {
    name: inputs[0].value,
    number: Number(inputs[1].value),
    date: inputs[2].value,
    time: inputs[3].value,
    text: inputs[4].value
  };

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    if (!res.ok) throw new Error('Failed to update booking');

    succesMSG(text[0])
    loadBookings();
  } catch (err) {
    console.error(err);
    alert('Error updating booking: ' + err.message);
  }
}

async function deleteBooking(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (res.ok) {
          succesMSG(text[1])
    } else {
      throw new Error('Failed to delete booking');
    }

    loadBookings();
  } catch (error) {
    console.error(error);
  }
}

loadBookings();


function succesMSG(msg){

  msg.classList.add("show");
  main.classList.add("dis")
  setTimeout(() => {
    msg.classList.remove("show");
    main.classList.remove("dis")
  }, 3000);

}
