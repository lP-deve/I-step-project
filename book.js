const form = document.getElementById('bookingForm');



form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    number: document.getElementById('number').value.trim(),
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    text: document.getElementById('textArea').value,

  }

  try {
    const response = await fetch('https://694fb0888531714d9bceb453.mockapi.io/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error('Failed to save booking');

    const data = await response.json();
    console.log(data);

    const msg = document.querySelector(".success");
    const main = document.querySelector(".main")
  
        msg.classList.add("show");
        main.classList.add("dis")
        setTimeout(() => {
            msg.classList.remove("show");
              main.classList.remove("dis")
        }, 3000);


    form.reset();

} catch (error) {
    console.error(error);
    alert('Something went wrong!');
}

});

