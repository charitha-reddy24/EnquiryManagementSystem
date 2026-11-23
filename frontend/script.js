const form = document.querySelector("form");
let editingId = null;
// INPUT RESTRICTIONS
// FIRST NAME - ONLY LETTERS AND SPACES
document.getElementById("first_name").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, "");
});
// LAST NAME - ONLY LETTERS AND SPACES
document.getElementById("last_name").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, "");
});
// MOBILE - ONLY NUMBERS, MAXIMUM 10 DIGITS
document.getElementById("mobile").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
});
// EMAIL - ONLY LETTERS, NUMBERS, @ AND .
document.getElementById("email").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z0-9@.]/g, "");
});
// CREATE AND UPDATE ENQUIRY
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    // VALIDATION
    if (firstName === "" || lastName === "" || mobile === "" || email === "") {
        alert("All fields are required!");
        return;
    }
    if (!/^[a-zA-Z ]+$/.test(firstName)) {
        alert("First name should contain only letters!");
        return;
    }
    if (!/^[a-zA-Z ]+$/.test(lastName)) {
        alert("Last name should contain only letters!");
        return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Mobile number must contain exactly 10 digits!");
        return;
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }
    try {
        let url = "http://127.0.0.1:5000/api/enquiries";
        let method = "POST";
        if (editingId !== null) {
            url = `http://127.0.0.1:5000/api/enquiries/${editingId}`;
            method = "PUT";
        }
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                mobile: mobile,
                email: email
            })
        });
        const result = await response.json();
        if (!response.ok) {
            alert(result.message);
            return;
        }
        alert(result.message);
        form.reset();
        editingId = null;
        document.querySelector("button[type='submit']").textContent = "Submit Enquiry";
        loadEnquiries();
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});
// GET ALL ENQUIRIES
async function loadEnquiries() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/enquiries");
        const result = await response.json();
        displayEnquiries(result.data);
    } catch (error) {
        console.error("Error loading enquiries:", error);
    }
}
// DISPLAY ENQUIRIES IN TABLE
function displayEnquiries(enquiries) {
    const table = document.getElementById("enquiryTable");
    table.innerHTML = "";
    enquiries.forEach(function(enquiry) {
        const row = `
            <tr>
                <td>${enquiry.id}</td>
                <td>${enquiry.first_name}</td>
                <td>${enquiry.last_name}</td>
                <td>${enquiry.mobile}</td>
                <td>${enquiry.email}</td>
                <td>
                    <button onclick="editEnquiry(${enquiry.id}, '${enquiry.first_name}', '${enquiry.last_name}', '${enquiry.mobile}', '${enquiry.email}')">
                        Edit
                    </button>
                    <button onclick="deleteEnquiry(${enquiry.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}
// EDIT ENQUIRY
function editEnquiry(id, firstName, lastName, mobile, email) {
    editingId = id;
    document.getElementById("first_name").value = firstName;
    document.getElementById("last_name").value = lastName;
    document.getElementById("mobile").value = mobile;
    document.getElementById("email").value = email;
    document.querySelector("button[type='submit']").textContent = "Update Enquiry";
}
// DELETE ENQUIRY
async function deleteEnquiry(id) {
    const confirmDelete = confirm("Are you sure you want to delete this enquiry?");
    if (!confirmDelete) {
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
        alert("Something went wrong!");
    }
}
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
        alert("Something went wrong!");
    }
}
// SHOW ALL ENQUIRIES
function showAllEnquiries() {
    document.getElementById("searchInput").value = "";
    loadEnquiries();
}
// LOAD ENQUIRIES WHEN PAGE OPENS
loadEnquiries();