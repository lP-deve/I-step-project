

 const form = document.getElementById('bookingForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      number: document.getElementById('number').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value
    };

    console.log("Sending data:", formData);

    try {
      
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

    
      const data = await response.json();

      console.log("Response from server:", data);

      alert("Table booked successfully!");
      form.reset();

    } catch (error) {
      console.error("POST error:", error);
    }
  });

