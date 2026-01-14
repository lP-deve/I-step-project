const form = document.getElementById('bookingForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    number: document.getElementById('number').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value
  };

  try {
    const response = await fetch(
      'https://694fb0888531714d9bceb453.mockapi.io/bookings', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save booking');
    }

    const data = await response.json();
    console.log('Saved on MockAPI:', data);

    alert('Table booked successfully!');
    form.reset();

  } catch (error) {
    console.error('POST error:', error);
    alert('Something went wrong!');
  }
});
