// Initialize Supabase client
const supabaseUrl = 'https://ritieslzfvjxgpfayzzg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdGllc2x6ZnZqeGdwZmF5enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTYwNzUsImV4cCI6MjA0MDA5MjA3NX0.2FWU35eUL470Jx6FsKEaM9IXcWJSLpnRgTSI56YgXsY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('donationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission to server

    // Create an object to store the form data
    const donation = {
        Name: document.getElementById('name').value,
        Address: document.getElementById('address').value,
        Area: document.getElementById('area').value,
        AvailableTime: document.getElementById('availableTime').value,
        ContactNumber: document.getElementById('contactNumber').value,
        AltName: document.getElementById('altContactName').value,
        AltNumber: document.getElementById('altContactNumber').value,
        Status: 'Pending Collection' // Default status
    };

    try {
        // Send the form data to the server
        const response = await fetch('/api/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donation)
        });

        if (!response.ok) throw new Error('Failed to schedule the collection.');

        // Display the toast message
        showToast(`Thank you ${donation.Name}, your donation has been scheduled.`);

        // Reset the form after submission
        this.reset();

    } catch (error) {
        console.error('Error scheduling the collection:', error.message);
        showToast('An error occurred while scheduling the collection. Please try again later.');
    }
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.classList.add('fade-out');
        toast.addEventListener('transitionend', function() {
            toast.remove();
        });
    }, 3000);
}
