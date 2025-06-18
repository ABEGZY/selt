// Sample product data
const products = [
    {
        id: 1,
        name: "Smartphone XYZ",
        category: "electronics",
        price: 299.99,
        image: "https://via.placeholder.com/180x150?text=Smartphone+XYZ"
    },
    {
        id: 2,
        name: "Running Shoes",
        category: "fashion",
        price: 79.99,
        image: "https://via.placeholder.com/180x150?text=Running+Shoes"
    },
    {
        id: 3,
        name: "Coffee Maker",
        category: "home",
        price: 49.99,
        image: "https://via.placeholder.com/180x150?text=Coffee+Maker"
    },
    {
        id: 4,
        name: "Lipstick Set",
        category: "beauty",
        price: 19.99,
        image: "https://via.placeholder.com/180x150?text=Lipstick+Set"
    },
    {
        id: 5,
        name: "Basketball",
        category: "sports",
        price: 29.99,
        image: "https://via.placeholder.com/180x150?text=Basketball"
    },
    {
        id: 6,
        name: "Laptop ABC",
        category: "electronics",
        price: 899.99,
        image: "https://via.placeholder.com/180x150?text=Laptop+ABC"
    }
];

// Render products to the grid
function renderProducts(filterCategory = null, searchTerm = "") {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";

    const filtered = products.filter(p => {
        const matchesCategory = filterCategory ? p.category === filterCategory : true;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        grid.appendChild(card);
    });
}

// Cart management
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveCart(cart);
    alert("Product added to cart!");
}

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function startSlider() {
    return setInterval(nextSlide, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    // Initial render
    renderProducts();

    // Search bar event
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value;
        const activeCategory = document.querySelector(".category-btn.active");
        const category = activeCategory ? activeCategory.dataset.category : null;
        renderProducts(category, searchTerm);
    });

    // Category buttons event
    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.dataset.category;
            const searchTerm = searchBar.value;
            renderProducts(category, searchTerm);
        });
    });

    // Add to cart event delegation
    const productGrid = document.getElementById("product-grid");
    productGrid.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart-btn")) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    // Slider buttons
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetSliderInterval();
    });
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetSliderInterval();
    });

    // Start slider
    let sliderInterval = startSlider();

    function resetSliderInterval() {
        clearInterval(sliderInterval);
        sliderInterval = startSlider();
    }

    // Form validation for sign in/up
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = signupForm.email.value.trim();
            const password = signupForm.password.value.trim();
            if (!validateEmail(email)) {
                alert("Please enter a valid email.");
                return;
            }
            if (password.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
            }
            alert("Sign up successful (demo).");
            signupForm.reset();
        });
    }

    const signinForm = document.getElementById("signin-form");
    if (signinForm) {
        signinForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = signinForm.email.value.trim();
            const password = signinForm.password.value.trim();
            if (!validateEmail(email)) {
                alert("Please enter a valid email.");
                return;
            }
            if (password.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
            }
            alert("Sign in successful (demo).");
            signinForm.reset();
        });
    }
});

function validateEmail(email) {
    const re = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
    return re.test(email);
}
