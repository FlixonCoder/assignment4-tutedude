const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const links = document.getElementById("sidebar-links");
const submit =document.getElementById("bookBtn")
const removeBtn = document.getElementsByClassName("remove-btn")
const addBtn = document.getElementsByClassName("add-btn")

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


// Cart functionality
let cart = [];
let services = {
    service1: {
        name: "Dry Cleaning",
        price: 200.00
    },
    service2: {
        name: "Wash & Fold",
        price: 100
    },
    service3: {
        name: "Ironing",
        price: 30
    },
    service4: {
        name: "Stain Removal",
        price: 500
    },
    service5: {
        name: "Leather & Suede Cleaning",
        price: 999
    },
    service6: {
        name: "Wedding Dress Cleaning",
        price: 2800
    }
}

const serviceList = document.getElementById("services-list");
const cartBody = document.querySelector(".cart .styled-table tbody");
const cartFooter = document.querySelector(".cart .styled-table tfoot td strong");

for (const key in services) {
    const service = services[key];
    const div = document.createElement('div');
    div.classList.add('service-item')
    div.innerHTML = `
      <span>${service.name} - <span class="pricing">₹${service.price}</span></span>
    `;
    const button = document.createElement('button')
    button.classList.add('btn', 'add-btn');
    button.textContent = "Add to cart"

    button.onclick = () => {
        if (button.classList.contains('add-btn')){
            addToCart(service)
            button.classList.remove('add-btn')
            button.classList.add('remove-btn')
            button.textContent = "Remove item"
        } else {
            removeFromCart(service)
            button.classList.remove('remove-btn')
            button.classList.add('add-btn')
            button.textContent = "Add to Cart"
        }
    }
    div.appendChild(button)
    serviceList.appendChild(div);
}

function addToCart(service) {
    cart.push(service);
    console.log(cart)
    updateCart()
}
function removeFromCart(service) {
    const index = cart.findIndex(item => item.name === service.name);
    if (index > -1) cart.splice(index, 1);
    console.log(cart);
    updateCart()
}

// Cart modifications

function updateCart() {
  cartBody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="3" style="text-align:center;">No items added</td>`;
    cartBody.appendChild(emptyRow);
    cartFooter.textContent = "₹0.00";
    return;
  }

  cart.forEach((service, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${service.name}</td>
      <td>₹${service.price.toFixed(2)}</td>
    `;
    cartBody.appendChild(row);
    total += service.price;
  });
  const totalPrice = document.getElementById('total-price')
  totalPrice.textContent = `₹${total.toFixed(2)}`;
}

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

    //Validating the cart
    if (cart.length === 0) {
        emptyFields += "The cart is empty\n"
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
