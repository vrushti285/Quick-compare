/* ============================================================
   QUICKCOMPARE - UNIFIED JAVASCRIPT (NON-HTML MODIFY VERSION)
===============================================================*/


/* ==============================
   PRODUCT DATABASE
=================================*/
const productData = {
    water: {
        name: "Water Bottle (1L)",
        description: "Pure packaged drinking water.",
        ingredients: "Water",
        veg: "Vegetarian",
        category: "Daily Essentials",
        prices: { zepto: 18, blinkit: 20, instamart: 22 },
        image: "images/water.png"
    },
    milk: {
        name: "Milk Packet",
        description: "Fresh toned milk.",
        ingredients: "Milk",
        veg: "Vegetarian",
        category: "Daily Essentials",
        prices: { zepto: 25, blinkit: 26, instamart: 27 },
        image: "images/milk.png"
    },
    bread: {
        name: "Bread",
        description: "Soft fresh loaf.",
        ingredients: "Wheat, Yeast",
        veg: "Vegetarian",
        category: "Daily Essentials",
        prices: { zepto: 38, blinkit: 40, instamart: 42 },
        image: "images/bread.png"
    },
    biscuit: {
        name: "Biscuits",
        description: "Crispy tea-time snacks.",
        ingredients: "Wheat, Sugar",
        veg: "Vegetarian",
        category: "Snacks",
        prices: { zepto: 28, blinkit: 30, instamart: 32 },
        image: "images/biscuit.png"
    },
    chips: {
        name: "Chips",
        description: "Crunchy salted chips.",
        ingredients: "Potato, Salt, Oil",
        veg: "Vegetarian",
        category: "Snacks",
        prices: { zepto: 20, blinkit: 22, instamart: 24 },
        image: "images/chips.png"
    },
    chocolate: {
        name: "Chocolate Bar",
        description: "Delicious creamy chocolate.",
        ingredients: "Cocoa, Milk, Sugar",
        veg: "Vegetarian",
        category: "Snacks",
        prices: { zepto: 40, blinkit: 42, instamart: 45 },
        image: "images/chocolate.png"
    },
    rice: {
        name: "Rice (1kg)",
        description: "Premium quality rice.",
        ingredients: "Rice grains",
        veg: "Vegetarian",
        category: "Daily Essentials",
        prices: { zepto: 60, blinkit: 62, instamart: 65 },
        image: "images/rice.png"
    },
    oil: {
        name: "Cooking Oil (1L)",
        description: "Refined sunflower oil.",
        ingredients: "Sunflower Oil",
        veg: "Vegetarian",
        category: "Daily Essentials",
        prices: { zepto: 120, blinkit: 125, instamart: 130 },
        image: "images/oil.png"
    },
    noodles: {
        name: "Instant Noodles",
        description: "Ready in 2 minutes.",
        ingredients: "Wheat, Spices",
        veg: "Vegetarian",
        category: "Snacks",
        prices: { zepto: 15, blinkit: 17, instamart: 18 },
        image: "images/noodles.png"
    },
    cola: {
        name: "Soft Drink (500ml)",
        description: "Refreshing cold drink.",
        ingredients: "Carbonated Water, Sugar",
        veg: "Vegetarian",
        category: "Snacks",
        prices: { zepto: 35, blinkit: 36, instamart: 38 },
        image: "images/cola.png"
    }
};



/* ============================================================
   HOME PAGE - PRODUCT LIST RENDERING
===============================================================*/

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("productGrid")) {
        activateCategoryButtons();
        renderProducts("All");
    }
});

/* Update category title dynamically */
function updateCategoryTitle(category) {
    const title = document.querySelector(".section-header h3");
    if (!title) return;

    if (category === "All") {
        title.innerText = "All Products";
    } else {
        title.innerText = category;
    }
}

/* Activate category buttons */
function activateCategoryButtons() {
    const buttons = document.querySelectorAll(".category-row span");

    buttons.forEach(btn => {
        btn.onclick = function () {
            buttons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const category = this.innerText.trim();
            const searchValue = document.getElementById("searchInput").value.toLowerCase();

            updateCategoryTitle(category);
            renderProducts(category, searchValue);
        };
    });
}

/* MAIN PRODUCT RENDER FUNCTION */
function renderProducts(category = "All", search = "") {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    let products = Object.keys(productData);

    // Filter by category
    if (category !== "All") {
        products = products.filter(key => productData[key].category === category);
    }

    // Filter by search
    if (search !== "") {
        products = products.filter(key =>
            productData[key].name.toLowerCase().includes(search)
        );
    }

    // No result message
    document.getElementById("noResult").style.display =
        products.length === 0 ? "block" : "none";

    // Render cards
    products.forEach(key => {
        const p = productData[key];

        const card = document.createElement("div");
        card.className = "product-card";
        card.onclick = () => openProduct(key);

        card.innerHTML = `
            ${p.prices.zepto === Math.min(...Object.values(p.prices))
                ? `<span class='deal-badge'>Best Deal</span>` : ""}
            <img src="${p.image}">
            <p class="name">${p.name}</p>
            <p class="qty">${p.description}</p>
        `;

        grid.appendChild(card);
    });
}



/* SEARCH FUNCTION */
function filterProducts() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const activeCategory = document.querySelector(".category-row .active").innerText.trim();

    renderProducts(activeCategory, search);
}



/* ============================================================
   PRODUCT PAGE
===============================================================*/
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("productName")) return;

    const key = localStorage.getItem("selectedProduct");
    const p = productData[key];

    document.querySelector(".product-image-box img").src = p.image;
    document.getElementById("productName").innerText = p.name;
    document.getElementById("productDescription").innerText = p.description;
    document.getElementById("productIngredients").innerText = p.ingredients;
    document.getElementById("productVeg").innerText = p.veg;

    document.getElementById("zeptoPrice").innerText = "₹" + p.prices.zepto;
    document.getElementById("blinkitPrice").innerText = "₹" + p.prices.blinkit;
    document.getElementById("instamartPrice").innerText = "₹" + p.prices.instamart;

    const lowest = Math.min(...Object.values(p.prices));
    if (lowest === p.prices.zepto) {
        document.getElementById("zeptoBadge").style.display = "inline-block";
    }
});


function openProduct(key) {
    localStorage.setItem("selectedProduct", key);
    window.location.href = "product.html";
}

function goBack() {
    window.history.back();
}



/* ============================================================
   CART SYSTEM
===============================================================*/

function addToCart(platform) {
    const key = localStorage.getItem("selectedProduct");
    const p = productData[key];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.name === p.name && item.platform === platform);

    if (exists) {
        exists.qty += 1;
    } else {
        cart.push({
            name: p.name,
            platform,
            price: p.prices[platform.toLowerCase()],
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
}

if (document.getElementById("cartItems")) renderCart();


function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cartItems");

    if (cart.length === 0) {
        document.getElementById("emptyCart").style.display = "block";
        document.querySelector(".bill-summary").style.display = "none";
        return;
    }

    container.innerHTML = "";
    document.getElementById("emptyCart").style.display = "none";

    let subtotal = 0;

    cart.forEach((item, i) => {
        subtotal += item.price * item.qty;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <div class="item-info">
                <strong>${item.name}</strong>
                <span class="item-platform">Platform: ${item.platform}</span>
            </div>

            <div class="qty-controls">
                <button onclick="changeQty(${i}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${i}, 1)">+</button>
            </div>

            <strong>₹${item.price * item.qty}</strong>
        `;

        container.appendChild(row);
    });

    const tax = Math.round(subtotal * 0.05);
    document.getElementById("subtotal").innerText = "₹" + subtotal;
    document.getElementById("tax").innerText = "₹" + tax;
    document.getElementById("total").innerText = "₹" + (subtotal + tax + 20);
}


function changeQty(index, diff) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].qty += diff;
    if (cart[index].qty <= 0) cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


document.querySelector(".pay-btn")?.addEventListener("click", () => {
    alert("Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.href = "home.html";
});



/* ============================================================
   LOGIN / SIGNUP PAGE
===============================================================*/

function toggleView() {
    const login = document.getElementById("loginBlock");
    const signup = document.getElementById("signupBlock");
    const btn = document.getElementById("toggleLink");

    if (login.style.display === "none") {
        login.style.display = "block";
        signup.style.display = "none";
        btn.innerText = "Create Account";
    } else {
        login.style.display = "none";
        signup.style.display = "block";
        btn.innerText = "Login Instead";
    }
}

function togglePass(id) {
    const inp = document.getElementById(id);
    inp.type = inp.type === "password" ? "text" : "password";
}
