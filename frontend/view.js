// GET ALL ENQUIRIES
async function loadEnquiries() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/enquiries");
        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        displayEnquiries(result.data);

    } catch (error) {
        console.error("Error loading enquiries:", error);
        alert("Unable to connect to backend!");
    }
}

// DISPLAY ENQUIRIES
function displayEnquiries(enquiries) {
    const table = document.getElementById("enquiryTable");
    table.innerHTML = "";

    enquiries.forEach(function(enquiry) {
        const row = document.createElement("tr");

        const submittedAt = enquiry.created_at
            ? new Date(enquiry.created_at).toLocaleDateString("en-IN")
            : "Not available";

        row.innerHTML = `
            <td>${enquiry.id}</td>
            <td>${enquiry.first_name}</td>
            <td>${enquiry.last_name}</td>
            <td>${enquiry.mobile}</td>
            <td>${enquiry.email}</td>
            <td>${enquiry.enquiry_details || ""}</td>
            <td>${submittedAt}</td>
            <td>
                <button onclick="editEnquiry(${enquiry.id})">Edit</button>
                <button onclick="deleteEnquiry(${enquiry.id})">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });
}

// EDIT ENQUIRY
async function editEnquiry(id) {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/enquiries");
        const result = await response.json();

        const enquiry = result.data.find(item => item.id === id);

        if (!enquiry) {
            alert("Enquiry not found!");
            return;
        }

        localStorage.setItem("editEnquiry", JSON.stringify(enquiry));
        window.location.href = "edit.html";

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to load enquiry!");
    }
}

// DELETE ENQUIRY
async function deleteEnquiry(id) {
    if (!confirm("Are you sure you want to delete this enquiry?")) {
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/enquiries/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        alert(result.message);
        loadEnquiries();

    } catch (error) {
        console.error("Error deleting enquiry:", error);
        alert("Unable to delete enquiry!");
    }
}

// LOAD WHEN PAGE OPENS
loadEnquiries();