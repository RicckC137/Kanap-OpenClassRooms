function orderValidation() {
    const orderId = document.getElementById("orderId");
    orderId.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    // localStorage.clear();
}

orderValidation();