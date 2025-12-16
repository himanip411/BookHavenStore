/* ============================
   TOAST NOTIFICATION
============================= */
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-msg");
    const toastIcon = document.getElementById("toast-icon");

    const icons = {
        success: "✔️",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
    };

    toastMsg.innerText = message;
    toastIcon.innerText = icons[type] || "";

    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hide");
    }, 2500);
}



/* ============================
   GLOBAL: CART ICON
============================= */
const cartIcon = document.querySelector(".cart-icon");



/* ============================
   ADD TO CART (HOME PAGE)
============================= */
document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        let card = this.closest(".book-card");

        let name = card.querySelector(".book-name").innerText;
        let price = card.querySelector(".book-price").innerText.replace("$", "").trim();
        let img = card.querySelector(".book-cover").src;

        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        cart.push({ name, price, img });
        sessionStorage.setItem("cart", JSON.stringify(cart));

        showToast(`${name} added to cart!`, "success");
    });
});



/* ============================
   VIEW CART BUTTON (GALLERY PAGE)
============================= */
const viewCartBtn = document.querySelector(".view-cart-btn");

if (viewCartBtn) {
    viewCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cartIcon.click(); // Opens the modal
    });
}



/* ============================
   ADD TO CART (GALLERY PAGE)
============================= */
document.querySelectorAll(".gallery-add-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        let row = this.closest(".gallery-row-item");

        let name = row.querySelector(".gallery-desc-col h3").innerText;
        let desc = row.querySelector(".gallery-desc-col p").innerText;
        let img = row.querySelector(".gallery-img-col img").src;

        let price = ""; // optional

        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        cart.push({ name, desc, price, img });
        sessionStorage.setItem("cart", JSON.stringify(cart));

        showToast(`${name} added to cart!`, "success");
    });
});



/* ============================
   OPEN CART MODAL
============================= */
const cartModal = document.getElementById("cartModal");
const cartItemsDiv = document.getElementById("cartItems");
const clearCartBtn = document.getElementById("clearCartBtn");

cartIcon.addEventListener("click", () => {

    cartModal.style.display = "block";

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item-card">

                <div class="cart-item-left">
                    <img src="${item.img}" class="cart-book-img">
                </div>

                <div class="cart-item-middle">
                    <h3 class="cart-book-title">${item.name}</h3>

                    ${item.desc ? `<p class="cart-book-desc">${item.desc}</p>` : ""}

                    ${item.price && item.price !== "" 
                        ? `<p class="cart-book-price">$${item.price}</p>` 
                        : ""}
                </div>

                <button class="remove-btn" data-index="${index}">×</button>
            </div>
        `;
    });

    /* REMOVE ITEM */
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", function () {

            let index = this.dataset.index;

            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            let removedItem = cart[index].name;

            cart.splice(index, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));

            showToast(`${removedItem} removed!`, "warning");

            cartIcon.click(); // refresh list
        });
    });
});



/* ============================
   CLEAR CART
============================= */
clearCartBtn.addEventListener("click", () => {
    sessionStorage.removeItem("cart");
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";

    showToast("Cart cleared!", "error");
});



/* ============================
   CLOSE CART MODAL
============================= */
document.getElementById("closeCartBtn").addEventListener("click", () => {
    cartModal.style.display = "none";
});



// ============================
//  NEWSLETTER SUBSCRIBE
// ============================

document.querySelector(".newsletter-btn")?.addEventListener("click", function () {
    const input = document.querySelector(".newsletter-input");
    const email = input.value.trim().toLowerCase();

    if (!email || !email.includes("@")) {
        showToast("Please enter a valid email.", "error");
        return;
    }

    // Get existing list
    let list = JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];

    // Check duplicate email
    const exists = list.some(item => item.email === email);

    if (exists) {
        showToast("You are already subscribed!", "warning");
        return;
    }

    // Add new subscriber
    list.push({
        email: email,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("newsletterSubscribers", JSON.stringify(list));

    showToast("Subscribed successfully!", "success");
    input.value = "";
});

// ============================
//  SOCIAL ICON LINKS
// ============================
document.querySelectorAll(".social-icons img").forEach(icon => {
    icon.style.cursor = "pointer";

    icon.addEventListener("click", () => {
        const alt = icon.alt.toLowerCase();

        const links = {
            "facebook": "https://facebook.com",
            "instagram": "https://instagram.com",
            "twitter-x": "https://twitter.com",
            "linkedin": "https://linkedin.com",
            "youtube": "https://youtube.com"
        };

        let url = links[alt] || "https://google.com";

        window.open(url, "_blank");
    });
});

