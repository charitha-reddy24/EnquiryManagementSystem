const form = document.getElementById("enquiryForm");

// FIRST NAME - ONLY LETTERS AND SPACES
document.getElementById("first_name").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, "");
});

// LAST NAME - ONLY LETTERS AND SPACES
document.getElementById("last_name").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, "");
});

// MOBILE - ONLY 10 DIGITS
document.getElementById("mobile").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
});

// EMAIL INPUT RESTRICTION
document.getElementById("email").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, "");
});

// SUBMIT ENQUIRY
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const enquiryDetails = document.getElementById("enquiry_details").value.trim();

    if (!firstName || !lastName || !mobile || !email || !enquiryDetails) {
        alert("All fields are required!");
        return;
    }

    if (!/^[a-zA-Z ]+$/.test(firstName) || !/^[a-zA-Z ]+$/.test(lastName)) {
        alert("Names should contain only letters!");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Mobile number must contain exactly 10 digits!");
        return;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/api/enquiries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                mobile: mobile,
                email: email,
                enquiry_details: enquiryDetails
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        alert(result.message);
        form.reset();

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to the backend!");
    }
});