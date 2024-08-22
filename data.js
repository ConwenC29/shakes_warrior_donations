document.addEventListener('DOMContentLoaded', function() {
    let donations = JSON.parse(localStorage.getItem('donations')) || [];
    let tbody = document.querySelector('#collectionsTable tbody');

    donations.forEach((donation, index) => {
        let row = document.createElement('tr');

        for (let key in donation) {
            let cell = document.createElement('td');

            if (key === 'address') {
                let addressLink = document.createElement('a');
                addressLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(donation[key])}`;
                addressLink.target = '_blank';
                addressLink.textContent = donation[key];
                cell.appendChild(addressLink);
            } else if (key === 'status') {
                let statusSelect = document.createElement('select');
                let statuses = ["Pending Collection", "Collected"];
                statuses.forEach(status => {
                    let option = document.createElement('option');
                    option.value = status;
                    option.textContent = status;
                    if (status === donation[key]) option.selected = true;
                    statusSelect.appendChild(option);
                });
                cell.appendChild(statusSelect);
            } else {
                cell.textContent = donation[key];
            }
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    });
});

// Function to clear collected donations
function clearCollected() {
    let donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations = donations.filter(donation => donation.status !== "Collected");
    localStorage.setItem('donations', JSON.stringify(donations));
    window.location.reload();
}

document.getElementById('clearCollectedBtn').addEventListener('click', function() {
    // Get the table body
    const tableBody = document.querySelector('#collectionGrid tbody');

    // Iterate through the rows in reverse order
    for (let i = tableBody.rows.length - 1; i >= 0; i--) {
        const row = tableBody.rows[i];
        
        // Get the status cell and check its value
        const statusCell = row.cells[7]; // Assuming 'Status' is the 8th column (index 7)
        const statusValue = statusCell.querySelector('select').value;

        if (statusValue === 'Collected') {
            // Remove the row if status is 'Collected'
            tableBody.deleteRow(i);
        }
    }

    // Optionally, you could save the updated table data back to localStorage or another storage method
});
