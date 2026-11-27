// SEARCH ENQUIRIES
async function searchEnquiries() {
    const searchText = document.getElementById("searchInput").value.trim();

    if (searchText === "") {
        alert("Please enter something to search!");
        return;
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:5000/api/enquiries/search?search=${encodeURIComponent(searchText)}`
        );

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        displayEnquiries(result.data);

        if (result.data.length === 0) {
            alert("No enquiries found!");
        }

    } catch (error) {
        console.error("Error searching enquiries:", error);
        alert("Unable to connect to backend!");
    }
}

// DISPLAY SEARCH RESULTS
function displayEnquiries(enquiries) {
    const table = document.getElementById("enquiryTable");
    table.innerHTML = "";

    enquiries.forEach(function(enquiry) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${enquiry.id}</td>
            <td>${enquiry.first_name}</td>
            <td>${enquiry.last_name}</td>
            <td>${enquiry.mobile}</td>
            <td>${enquiry.email}</td>
            <td>${enquiry.enquiry_details || ""}</td>
        `;

        table.appendChild(row);
    });
}