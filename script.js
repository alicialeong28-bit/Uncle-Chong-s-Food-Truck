console.log("SCRIPT LOADED");

function increase(id) {

    let qty = document.getElementById(id);

    qty.value = parseInt(qty.value) + 1;

}

function decrease(id) {

    let qty = document.getElementById(id);

    if (parseInt(qty.value) > 1) {

        qty.value = parseInt(qty.value) - 1;

    }

}

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let table = document.getElementById("cartItems");

    let total = 0;

    table.innerHTML = "";

    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;

        total += subtotal;

        table.innerHTML += `

        <tr>

            <td>${item.food}</td>

            <td>${item.price.toFixed(2)}</td>

            <td>${item.quantity}</td>

            <td>${subtotal.toFixed(2)}</td>

            <td>

                <button onclick="removeItem(${index})">

                    Remove

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("totalPrice").innerHTML =
        "Total: RM" + total.toFixed(2);

}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

function clearCart(){

    localStorage.removeItem("cart");

    displayCart();

}

function addToCart(foodName, price, quantityID) {

    let quantity = parseInt(document.getElementById(quantityID).value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        food: foodName,
        price: price,
        quantity: quantity
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}

// Display total on checkout page
function displayCheckoutTotal() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    document.getElementById("checkoutTotal").innerHTML =
        "Total: RM" + total.toFixed(2);

}

function saveCustomer() {

    let customer = {

        name: document.getElementById("customerName").value,

        studentID: document.getElementById("studentID").value,

        date: document.getElementById("pickupDate").value,

        time: document.getElementById("pickupTime").value,

        remarks: document.getElementById("remarks").value

    };

    localStorage.setItem("customer", JSON.stringify(customer));

}


    // Display total on payment page
function displayPaymentTotal() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    document.getElementById("paymentTotal").innerHTML =
        "Total: RM" + total.toFixed(2);

}

function placeOrder() {

    let paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    localStorage.setItem("orderTotal", total);
    localStorage.setItem("paymentMethod", paymentMethod.value);
    localStorage.setItem("orderNumber", generateOrderNumber());

let customer = JSON.parse(localStorage.getItem("customer"));

localStorage.setItem("customer", JSON.stringify(customer));
    window.location.href = "success.html";

    setTimeout(() => {
        localStorage.removeItem("cart");
    }, 500);
}

function showSuccess() {

    let orderNumber = localStorage.getItem("orderNumber");
    let payment = localStorage.getItem("paymentMethod");
    let customer = JSON.parse(localStorage.getItem("customer"));
    let total = localStorage.getItem("orderTotal");

    document.getElementById("orderNumber").innerHTML =
        "Order Number: " + orderNumber;

    document.getElementById("paymentMethod").innerHTML =
        "Payment Method: " + payment;

    document.getElementById("customerName").innerHTML =
        "Customer: " + customer.name;

    document.getElementById("orderTotal").innerHTML =
        "Total: RM " + parseFloat(total).toFixed(2);
}
function generateOrderNumber() {

    let current = localStorage.getItem("orderCount");

    if (!current) {
        current = 1;
    } else {
        current = parseInt(current) + 1;
    }

    if (current > 100) {
        current = 1;
    }

    localStorage.setItem("orderCount", current);

    return current;
}


function showQR() {

    let qrSection = document.getElementById("qrSection");

    let tng = document.getElementById("tng");
    let duitnow = document.getElementById("duitnow");

    if (tng.checked || duitnow.checked) {
        qrSection.style.display = "block";
    } else {
        qrSection.style.display = "none";
    }

}