document.addEventListener('DOMContentLoaded', async function() {
    const { data: donations, error } = await supabase
        .from('Collections')
        .select('*');

    if (error) {
        console.error('Error fetching collections:', error);
        return;
    }

    let tbody = document.querySelector('#collectionsTable tbody');
    tbody.innerHTML = ''; // Clear any existing rows

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
                statusSelect.addEventListener('change', async function() {
                    const { error } = await supabase
                        .from('Collections')
                        .update({ status: this.value })
                        .match({ id: donation.id });

                    if (error) {
                        console.error('Error updating status:', error);
                    }
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
async function clearCollected() {
    const { data: donations, error } = await supabase
        .from('Collections')
        .select('*');

    if (error) {
        console.error('Error fetching collections:', error);
        return;
    }

    const collectedDonations = donations.filter(donation => donation.status === 'Collected');
    const idsToDelete = collectedDonations.map(donation => donation.id);

    if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
            .from('Collections')
            .delete()
            .in('id', idsToDelete);

        if (deleteError) {
            console.error('Error deleting collected donations:', deleteError);
        } else {
            window.location.reload(); // Refresh the page to reflect changes
        }
    }
}

document.getElementById('clearCollectedBtn').addEventListener('click', clearCollected);
