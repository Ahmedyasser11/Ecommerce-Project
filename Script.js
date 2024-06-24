var users;
var currentUser;
function saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}
function getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
}
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}
function saveUsersData() {
    try {
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Users data saved to localStorage:", users);
    } catch (e) {
        console.error("Error saving users data to localStorage", e);
    }
}
if (window.location.pathname.includes('Index.html')) {    
    document.addEventListener('DOMContentLoaded', () => {
        users = JSON.parse(localStorage.getItem('users')) || [];
        var loginForm = document.getElementById('loginFormContent');
        var signupForm = document.getElementById('signupFormContent');

        function findUserByEmail(email) {
            return users.find(user => user.email === email);
        }

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            var email = document.getElementById('loginEmail').value;
            var password = document.getElementById('loginPassword').value;

            // Find user by email
            const user = findUserByEmail(email);

            if (!user) {
                alert('User not found. Please check your email.');
                return;
            }

            // Check password
            if (user.password !== password) {
                alert('Incorrect password. Please try again.');
                return;
            }

            // Successful login
            debugger
            currentUser = user;
            saveCurrentUser(currentUser);
            alert(`Welcome back, ${user.name}!`);
            window.location.href="Home.html";

            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
        });
        function validateEmail(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        function validname(name){
            var re = /^[a-zA-Z ]+$/;
            return re.test(name);
        }

        function validateSignupForm(name, email, password, confirmPassword) {
            if(!validname(name)){
                alert("Name should start with letter");
                return false;
            }
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return false;
            }

            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return false;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return false;
            }

            return true;
        }
        
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            var name = document.getElementById('UsernameSignUp').value;
            var email = document.getElementById('signupEmail').value;
            var password = document.getElementById('signupPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            if (!validateSignupForm(name, email, password, confirmPassword)) {
                return;
            }
            // Check if user already exists
            if (findUserByEmail(email)) {
                alert('User with this email already exists. Please use a different email.');
                return;
            }

            var newUser = {
                name: name,
                email: email,
                password: password,
                products: [] 
            };
            users.push(newUser);
            saveUsersData();
            alert('Signup successful');
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('signupForm').style.display = 'none';
            name = '';
            email = '';
            password = '';
            confirmPassword = '';
        });
    });
}
function signupForm(){
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
};


/*=======================================================  Home Paage   ==================================================== */

currentUser = getCurrentUser();
function updateUI() {
   if (currentUser) {
    document.getElementById('user-name').textContent = "Welcome, "+ currentUser.name;
    var totalItems = 0;
    for (var i = 0; i < currentUser.products.length; i++) {
        totalItems += currentUser.products[i].quantity; 
    }
    document.getElementById('cart').textContent = `Cart (${totalItems})`;
    } else {
        document.getElementById('user-name').textContent = '';
        document.getElementById('cart').textContent = 'Cart (0)';
    }
}
function createImageSlider(container) {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var images = document.querySelectorAll(container + ' img');
    var currentImage= 0;
    var intervalS;
    var intervalT
    updateUI();
    play();
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    var BackToTop = document.getElementById("BackToTop");
    BackToTop.addEventListener("click", scrollToTop);
    intervalT=setInterval(CheckTop,0);
    function CheckTop(){
        if (document.documentElement.scrollTop > 100) {
            BackToTop.style.display = "block";
        } else {
            BackToTop.style.display = "none";
        }
    }
    
    function showNextImage() {
        images[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.add('active');
    }

    function showPreviousImage() {
        images[currentImage].classList.remove('active');
        currentImage = (currentImage - 1 + images.length) % images.length;
        images[currentImage].classList.add('active');
    }

    function play() {
        intervalS = setInterval(showNextImage, 3000);
    }
    function eventListeners() {
        document.getElementById("next").addEventListener('click', showNextImage);
        document.getElementById("prev").addEventListener('click', showPreviousImage);
    }

    eventListeners();
}
/*============================================================== Products=======================================================*/


var products = [
    // Watches 
    { id: 1, category: "watches", name: 'Luxury Watch', price: 250, description: "A luxury watch with a sleek design.", image: 'imagesForProducts/watches/Luxury Watch.webp' },
    { id: 2, category: "watches", name: 'Digital Watch', price: 80, description: "A modern digital watch with cool design.", image: 'imagesForProducts/watches/Digital Watch.webp' },
    { id: 3, category: "watches", name: 'Classic Watch', price: 300, description: "A classic watch with timeless design.", image: 'imagesForProducts/watches/Classic Watch.jpg' },    
    { id: 4, category: "watches", name: 'Vintage Watch', price: 200, description: "A vintage watch with classic style.", image: 'imagesForProducts/watches/Vintage Watch.jpg' },
    { id: 5, category: "watches", name: 'Mechanical Watch', price: 400, description: "A mechanical watch with intricate design.", image: 'imagesForProducts/watches/Mechanical Watch.webp' },
    { id: 6, category: "watches", name: 'Sport Watch', price: 100, description: "A sport watch for outdoor activities.", image: 'imagesForProducts/watches/Sport Watch.webp' },
    { id: 7, category: "watches", name: 'Smart Watch', price: 150, description: "A smart watch with fitness tracking.", image: 'imagesForProducts/watches/Smart Watch.webp' },
    { id: 8, category: "watches", name: 'Pilot Watch', price: 600, description: "A pilot watch with aviation features.", image: 'imagesForProducts/watches/Pilot Watch.webp' },
    { id: 9, category: "watches", name: 'Chronograph Watch', price: 350, description: "A chronograph watch with multiple functions.", image: 'imagesForProducts/watches/Chronograph Watch.webp' },
    { id: 10, category: "watches", name: 'Diving Watch', price: 500, description: "A watch designed for diving.", image: 'imagesForProducts/watches/Diving Watch.webp'},
    { id: 11, category: "watches", name: 'Minimalist Watch', price: 120, description: "A minimalist watch with simple design.", image: 'imagesForProducts/watches/Minimalist Watch.webp' },
    { id: 12, category: "watches", name: 'Gold Watch', price: 750, description: "A gold watch with a luxurious feel.", image: 'imagesForProducts/watches/Gold Watch.jpg' },
    { id: 13, category: "watches", name: 'Silver Watch', price: 500, description: "A silver watch with elegance.", image: 'imagesForProducts/watches/Silver Watch.webp' },
    { id: 14, category: "watches", name: 'Ceramic Watch', price: 300, description: "A watch with a ceramic case.", image: 'imagesForProducts/watches/Ceramic Watch.webp' },
    { id: 15, category: "watches", name: 'Fashion Watch', price: 200, description: "A fashionable watch for everyday use.", image: 'imagesForProducts/watches/Fashion Watch.webp' },

    // Phones 
    { id: 16, category: "phones", name: 'S24 Ultra', price: 700, description: "A high-end smartphone with the latest features.", image: 'imagesForProducts/Phones/71qeTVe5d1L._AC_UY327_FMwebp_QL65_.webp' },
    { id: 17, category: "phones", name: 'xhoime', price: 30, description: "A basic phone with essential features.", image: 'imagesForProducts/Phones/xiomi.webp' },
    { id: 19, category: "phones", name: 'Feature Phone', price: 40, description: "A feature phone with basic functionalities.", image: 'imagesForProducts/Phones/Feature Phone.webp' },
    { id: 20, category: "phones", name: 'Android Phone', price: 500, description: "A powerful Android phone.", image: 'imagesForProducts/Phones/Android Phone.webp' },
    { id: 21, category: "phones", name: 'iPhone', price: 999, description: "The latest iPhone model.", image: 'imagesForProducts/Phones/iphone.webp' },
    { id: 22, category: "phones", name: 'Windows Phone', price: 350, description: "A phone running Windows OS.", image: 'imagesForProducts/Phones/Windows Phone.webp' },
    { id: 23, category: "phones", name: 'Satellite Phone', price: 1200, description: "A phone with satellite connectivity.", image: 'imagesForProducts/Phones/Satellite Phone.webp' },
    { id: 24, category: "phones", name: 'Rugged Phone', price: 250, description: "A rugged phone built for tough environments.", image: 'imagesForProducts/Phones/Rugged Phone.webp' },
    { id: 25, category: "phones", name: '5G Phone', price: 900, description: "A phone with 5G connectivity.", image: 'imagesForProducts/Phones/5G Phone.webp' },
    { id: 27, category: "phones", name: 'Gaming Phone', price: 1000, description: "A phone optimized for gaming.", image: 'imagesForProducts/Phones/Gaming Phone.webp' },
    { id: 28, category: "phones", name: 'Foldable Phone', price: 1500, description: "A phone with a foldable screen.", image: 'imagesForProducts/Phones/Foldable Phone.webp' },
    { id: 29, category: "phones", name: 'Dual SIM Phone', price: 600, description: "A phone with dual SIM support.", image: 'imagesForProducts/Phones/Dual SIM Phone.webp' },

    // Laptops
    { id: 30, category: "laptops", name: 'Gaming Laptop', price: 1500, description: "A high-performance laptop for gaming.", image: 'imagesForProducts/laptop/gaming laptop.webp' },
    { id: 31, category: "laptops", name: 'Business Laptop', price: 1200, description: "A laptop designed for business use.", image: 'imagesForProducts/laptop/Busins laptop.webp' },
    { id: 32, category: "laptops", name: 'Ultrabook', price: 1300, description: "A lightweight and portable ultrabook.", image: 'imagesForProducts/laptop/Ultrabook.webp' },
    { id: 33, category: "laptops", name: '2-in-1 Laptop', price: 1100, description: "A versatile 2-in-1 laptop.", image: 'imagesForProducts/laptop/2-in-1 Laptop.webp' },
    { id: 34, category: "laptops", name: 'MacBook', price: 2000, description: "The latest MacBook with advanced features.", image: 'imagesForProducts/laptop/MacBook.webp' },
    { id: 35, category: "laptops", name: 'Chromebook', price: 400, description: "A simple and affordable Chromebook.", image: 'imagesForProducts/laptop/Chromebook.webp' },
    { id: 36, category: "laptops", name: 'Workstation Laptop', price: 2500, description: "A powerful workstation laptop.", image: 'imagesForProducts/laptop/Workstation Laptop.webp' },
    { id: 37, category: "laptops", name: 'Budget Laptop', price: 300, description: "An affordable laptop for basic use.", image: 'imagesForProducts/laptop/Budget Laptop.webp' },
    { id: 39, category: "laptops", name: 'Convertible Laptop', price: 1000, description: "A laptop with a convertible design.", image: 'imagesForProducts/laptop/Convertible Laptop.webp' },
    { id: 43, category: "laptops", name: 'Fanless Laptop', price: 900, description: "A silent, fanless laptop.", image: 'imagesForProducts/laptop/Fanless Laptop.webp' },

    // Tablets
    { id: 45, category: "tablets", name: 'Android Tablet', price: 300, description: "A powerful Android tablet.", image: 'imagesForProducts/Tablet/Android Tablet.webp' },
    { id: 46, category: "tablets", name: 'iPad', price: 800, description: "The latest iPad with advanced features.", image: 'imagesForProducts/Tablet/iPad.webp' },
    { id: 47, category: "tablets", name: 'Windows Tablet', price: 600, description: "A tablet running Windows OS.", image: 'imagesForProducts/Tablet/Windows Tablet.webp' },
    { id: 48, category: "tablets", name: 'Budget Tablet', price: 150, description: "An affordable tablet for basic use.", image: 'imagesForProducts/Tablet/Budget Tablet.webp' },
    { id: 50, category: "tablets", name: 'Kids Tablet', price: 100, description: "A tablet designed for kids.", image: 'imagesForProducts/Tablet/Kids Tablet.webp' },
    { id: 51, category: "tablets", name: 'Pro Tablet', price: 1000, description: "A high-performance tablet for professionals.", image: 'imagesForProducts/Tablet/Pro Tablet.webp' },
    { id: 52, category: "tablets", name: 'Gaming Tablet', price: 700, description: "A tablet optimized for gaming.", image: 'imagesForProducts/Tablet/Gaming Tablet.webp' },
    { id: 53, category: "tablets", name: 'Mini Tablet', price: 200, description: "A compact mini tablet.", image: 'imagesForProducts/Tablet/Mini Tablet.webp' },
    { id: 54, category: "tablets", name: 'E-Reader Tablet', price: 250, description: "A tablet designed for reading.", image: 'imagesForProducts/Tablet/E-Reader Tablet.webp' },
    { id: 55, category: "tablets", name: 'Drawing Tablet', price: 350, description: "A tablet for digital drawing.", image: 'imagesForProducts/Tablet/Drawing Tablet.webp' },

    // Headphones
    { id: 60, category: "headphones", name: 'Wireless Headphones', price: 200, description: "High-quality wireless headphones.", image: 'imagesForProducts/Headphones/Wireless.webp' },
    { id: 61, category: "headphones", name: 'Noise-Canceling Headphones', price: 300, description: "Headphones with active noise cancellation.", image: 'imagesForProducts/Headphones/Noise-Canceling Headphones.webp' },
    { id: 62, category: "headphones", name: 'In-Ear Headphones', price: 100, description: "Compact in-ear headphones.", image: 'imagesForProducts/Headphones/In-Ear Headphones.webp' },
    { id: 65, category: "headphones", name: 'Gaming Headphones', price: 180, description: "Headphones optimized for gaming.", image: 'imagesForProducts/Headphones/Gaming Headphones.webp' },
    { id: 66, category: "headphones", name: 'Sports Headphones', price: 120, description: "Headphones designed for sports activities.", image: 'imagesForProducts/Headphones/Sports Headphones.webp' },
    { id: 68, category: "headphones", name: 'DJ Headphones', price: 250, description: "Headphones designed for DJs.", image: 'imagesForProducts/Headphones/DJ Headphones.webp' },
    { id: 69, category: "headphones", name: 'ANC Earbuds', price: 180, description: "Active noise-canceling earbuds.", image: 'imagesForProducts/Headphones/Noise-Canceling Headphones.webp' },
    { id: 72, category: "headphones", name: 'Kids Headphones', price: 50, description: "Safe headphones for kids.", image: 'imagesForProducts/Headphones/Kids Headphones.webp' },
    { id: 73, category: "headphones", name: 'Wireless Earbuds', price: 130, description: "Convenient wireless earbuds.", image: 'imagesForProducts/Headphones/Wireless Earbuds.webp' },

    // Cameras
    { id: 75, category: "cameras", name: 'DSLR Camera', price: 800, description: "High-quality DSLR camera.", image: 'imagesForProducts/Camers/DSLR Camera.webp' },
    { id: 76, category: "cameras", name: 'Mirrorless Camera', price: 900, description: "Compact mirrorless camera.", image: 'imagesForProducts/Camers/Mirrorless Camera.webp' },
    { id: 78, category: "cameras", name: 'Action Camera', price: 400, description: "Durable action camera for adventure.", image: 'imagesForProducts/Camers/Action Camera.webp' },
    { id: 79, category: "cameras", name: '360 Camera', price: 500, description: "Camera with 360-degree capture.", image: 'imagesForProducts/Camers/360 Camera.webp' },
    { id: 80, category: "cameras", name: 'Instant Camera', price: 200, description: "Fun instant camera for quick prints.", image: 'imagesForProducts/Camers/Instant Camera.webp' },
    { id: 84, category: "cameras", name: 'Professional Camera', price: 2000, description: "Top-of-the-line professional camera.", image: 'imagesForProducts/Camers/Professional Camera.webp' },
    { id: 86, category: "cameras", name: 'Waterproof Camera', price: 600, description: "Waterproof camera for underwater shots.", image: 'imagesForProducts/Camers/Waterproof Camera.webp' },

    // Speakers
    { id: 90, category: "speakers", name: 'Bluetooth Speaker', price: 150, description: "Portable Bluetooth speaker.", image: 'imagesForProducts/Speakers/Bluetooth Speaker.webp' },
    { id: 91, category: "speakers", name: 'Smart Speaker', price: 200, description: "Smart speaker with voice assistant.", image: 'imagesForProducts/Speakers/Smart Speaker.webp' },
    { id: 93, category: "speakers", name: 'Outdoor Speaker', price: 220, description: "Durable speaker for outdoor use.", image: 'imagesForProducts/Speakers/Outdoor Speaker.webp' },
    { id: 95, category: "speakers", name: 'Home Theater Speaker', price: 500, description: "Speaker system for home theater.", image: 'imagesForProducts/Speakers/Home Theater Speaker.webp' },
    { id: 96, category: "speakers", name: 'Waterproof Speaker', price: 250, description: "Waterproof speaker for poolside use.", image: 'imagesForProducts/Speakers/Waterproof Speaker.webp' },
    { id: 99, category: "speakers", name: 'Soundbar', price: 350, description: "Sleek soundbar for enhanced TV audio.", image: 'imagesForProducts/Speakers/Soundbar.webp' },
    { id: 100, category: "speakers", name: 'Hi-Fi Speaker', price: 450, description: "High-fidelity speaker for audiophiles.", image: 'imagesForProducts/Speakers/Hi-Fi Speaker.webp' },
    { id: 101, category: "speakers", name: 'Desk Speaker', price: 120, description: "Compact speaker for your desk.", image: 'imagesForProducts/Speakers/Desk Speaker.webp' },
    { id: 102, category: "speakers", name: 'Wireless Sound System', price: 600, description: "Comprehensive wireless sound system.", image: 'imagesForProducts/Speakers/Wireless Sound System.webp' },
    { id: 103, category: "speakers", name: 'Car Speaker', price: 280, description: "High-performance car speaker.", image: 'imagesForProducts/Speakers/Car Speaker.webp' },
    { id: 104, category: "speakers", name: 'Ceiling Speaker', price: 320, description: "Discreet ceiling-mounted speaker.", image: 'imagesForProducts/Speakers/Ceiling Speaker.webp' },

    // Drones
    { id: 106, category: "drones", name: 'Racing Drone', price: 400, description: "Fast racing drone.", image: 'imagesForProducts/Drones/Racing Drone.webp' },
    { id: 107, category: "drones", name: 'Camera Drone', price: 600, description: "Drone with high-quality camera.", image: 'imagesForProducts/Drones/Camera Drone.webp' },
    { id: 108, category: "drones", name: 'Mini Drone', price: 200, description: "Compact mini drone.", image: 'imagesForProducts/Drones/Mini Drone.webp' },
    { id: 109, category: "drones", name: 'FPV Drone', price: 350, description: "First-person view drone for immersive flying.", image: 'imagesForProducts/Drones/FPV Drone.webp' },
    { id: 112, category: "drones", name: 'Delivery Drone', price: 1500, description: "Drone optimized for deliveries.", image: 'imagesForProducts/Drones/Delivery Drone.webp' },
    { id: 113, category: "drones", name: 'Industrial Drone', price: 2000, description: "Drone for industrial use.", image: 'imagesForProducts/Drones/Industrial Drone.webp' },
    { id: 114, category: "drones", name: 'Agricultural Drone', price: 1200, description: "Drone for agricultural purposes.", image: 'imagesForProducts/Drones/Agricultural Drone.webp' },
];
function filterProducts(category) {
    renderProducts(category);
}
function renderProducts(filter) {
    var productList = document.getElementById('productList');
    productList.innerHTML = '';
    var filteredProducts;
    if (filter == 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === filter);
    }
    filteredProducts.forEach(function(product) {
        var productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.dataset.category = product.category;
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="viewProduct(${product.id})">View</button>
            <button class="add_toCart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}
function viewProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}
function addToCart(productId) {
    currentUser = getCurrentUser();
    if (!currentUser) {
        alert("Please log in to add products to your cart.");
        window.location.href="Index.html";
        return;
    }
    var product = products.find(p => p.id === productId);
    if (!product) {
        alert("Product not found.");
        return;
    }

    var existingProduct = currentUser.products.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        var newProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            category: product.category,
            quantity: 1 
        };
        currentUser.products.push(newProduct);
    }

    saveCurrentUser(currentUser);
    updateUI();
    alert(`Added ${product.name} to your cart.`);
}

function getProductIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function findProductById(id) {
    return products.find(product => product.id == id);
}

function displayProductDetails(product) {
    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('add-to-cart-btn').addEventListener('click', function() {
            addToCart(product.id);
        });
    } 
        else {
        document.querySelector('.product-details').innerHTML = '<p>Product not found.</p>';
    }
}

if (window.location.pathname.includes('product-details.html')) {
    var productId = getProductIdFromUrl();
    var product = findProductById(productId);
    displayProductDetails(product);
}

updateUI();

/*======================================================= cart ====================================================*/
document.getElementById('cart').addEventListener('click', () => {
    window.location.href = 'Cart.html';
});

// Load cart items on the cart page
if (window.location.pathname.includes('Cart.html')) {
    loadCartItems();
};

function loadCartItems() {
    currentUser =getCurrentUser();
    if (!currentUser) {
        alert("Please log in to view your cart.");
        window.location.href = 'Index.html';
        return;
    }

    var cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    currentUser.products.forEach(product => {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <div class="cart-item-quantity">
                    <button class="increase-qty">+</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="decrease-qty">-</button>
                    <button class="remove-product">Remove</button>
                </div>
            </div>`;

        cartItemsContainer.appendChild(cartItem);

        cartItem.querySelector('.remove-product').addEventListener('click', () => {
            var index = currentUser.products.indexOf(product);
            debugger
            currentUser.products.splice(index, 1);
            updateCart();
        }); 
        cartItem.querySelector('.increase-qty').addEventListener('click', () => {
            product.quantity++;
            updateCart();
        });

        cartItem.querySelector('.decrease-qty').addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                var index = currentUser.products.indexOf(product);
                currentUser.products.splice(index, 1);
            }
            updateCart();
        });
    });

    updateCartTotal();
};

function updateCart() {
    saveCurrentUser(currentUser);
    loadCartItems();
    updateUI();
};

function updateCartTotal() {
    var cartTotalElement = document.getElementById('cart-total');
    var total = 0;

    currentUser.products.forEach(product => {
        total += product.price * product.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2);
};

document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = getCurrentUser();
    if (currentUser) {
        users = JSON.parse(localStorage.getItem('users')) || [];
        var userIndex = users.findIndex(user => user.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            saveUsersData();
        }
    }
    clearCurrentUser();
    alert('You have successfully logged out.');
    window.location.href = "Index.html";
});
if (window.location.pathname.includes('Cart.html')) {
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (confirm("Do you want to checkout!") == true) {
            currentUser=getCurrentUser();
            if (currentUser) {
                debugger
                currentUser.products=[];
                saveCurrentUser(currentUser);
                loadCartItems();
                updateUI();
            }
        } 
    });
}
