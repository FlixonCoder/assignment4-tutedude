const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const links = document.getElementById("sidebar-links");
const submit =document.getElementById("bookBtn")

// Functions
function isEmail(email) {
    var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regex.test(email);
}

function isPhoneNumber(phone) {
    var regex = /^\d{10}$/; // Assuming a 10-digit phone number
    return regex.test(phone);
}

function isName(name) {
    var regex = /^[A-Z][a-zA-z ]{1,29}$/;
    return regex.test(name)
}

links.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

burger.onclick = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
};

sidebar.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

// Email Sending functionality
function sendMail(name, email) {
    const params = {
        name: name,
        email: email
    }
    const serviceId = "service_s5ipl1l";
    const templateId = "template_4hg9x5z";
    try {
        emailjs.send(serviceId,templateId,params)
        alert("Email sent successfully")
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

submit.onclick = () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const phoneNumber = document.getElementById("phone").value;
    const confirmationMsg = document.getElementById("confirmationMessage");
    var emptyFields = ""
    var errorMsg = ""
    var alertMsg = ""

    // Validating Email
    if (!email) {
        emptyFields += "Email\n"
    } else {
        if (!isEmail(email)) {
            errorMsg += "Email\n"
        }
    }

    // Validating Name
    if (!name) {
        emptyFields += "Full Name\n"
    } else {
        if (!isName(name)) {
            errorMsg += "Name\n"
        }
    }

    // Validating Phone Number
    if (!phoneNumber) {
        emptyFields += "Phone Number\n"
    } else {
        if (!isPhoneNumber(phoneNumber)) {
            errorMsg += "Phone Number\n"
        }
    }

    // Structuring the alert messages
    if (!emptyFields) {
        alertMsg += "All field are filled\n"
    } else {
        alertMsg += `Empty Fields:\n${emptyFields}\n`
    }
    if (!errorMsg) {
        alertMsg += "No errors Found\n"
    } else {
        alertMsg += `Errors:\n${errorMsg}\n`
    }
    if (emptyFields != "" || errorMsg != "") {
        alert(alertMsg)
    }

    // Final mail sending function
    if (emptyFields == "" && errorMsg == "") {
        sendMail(name, email)
        confirmationMsg.innerHTML = "<p>Thank you For Booking the Service We will get back to you soon!</p>"
    }

}