// Handle form submission
document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let area = document.getElementById('area').value;
    let availableTime = document.getElementById('time').value;
    let contactNumber = document.getElementById('contactNumber').value;
    let altContactName = document.getElementById('altContactName').value;
    let altContactNumber = document.getElementById('altContactNumber').value;

    let donation = {
        name,
        address,
        area,
        availableTime,
        contactNumber,
        altContactName,
        altContactNumber,
        status: "Pending Collection"
    };

    // Send donation data to the server
    fetch('/api/collections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donation)
    })
    .then(response => response.text())
    .then(data => {
        // Show toast message
        showToast(`Thank you ${name}, your donation has been scheduled.`);
        // Clear the form
        document.getElementById('donationForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Function to display toast messages
function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Handle password prompt for viewing collections
function promptPassword() {
    let password = prompt("Please enter the password to view collections:");
    if (password === "$Collect$") {
        window.location.href = "collections.html";
    } else {
        alert("You are not authorized to view this page.");
    }
}

document.getElementById('boxImage').addEventListener('click', function() {
    let password = prompt("Please enter the password to view collections:");
    if (password === "$Collect$") {
        window.location.href = "collections.html";
    } else {
        alert("You are not authorized to view this page.");
    }
});
