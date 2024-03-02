// declare all the variables
const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".list-card");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

// Open + close cart
// When the shopping cart icon is clicked, the shopping cart is opened
openShopping.addEventListener("click", () => {
    body.classList.add("active")
})

// When the close button inside the shopping cart is clicked, the cart is closed
closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

// create array of product objects info and names
let products = [
    // Each product object represents a different jacket 
    {
        id: 1,
        name: "HAPPY JACKET",
        images: "./images/jacket2.jpeg",
        price: 2000
    },
    {
        id: 2,
        name: "GROOVY JACKET",
        images: "./images/jacket1.jpeg",
        price: 1500
    },
    {
        id: 3,
        name: "VINTAGE SQUARE JACKET",
        images: "./images/jacket3.jpeg",
        price: 1000
    },
    {
        id: 4,
        name: "DESERT JACKET",
        images: "./images/jacket4.jpeg",
        price: 1800
    },
    {
        id: 5,
        name: "SUNSET JACKET",
        images: "./images/jacket5.webp",
        price: 2200
    },
    {
        id: 6,
        name: "OCEAN HAPPY JACKET",
        images: "./images/jacket6.webp",
        price: 1200
    },
]

let listCards = [];

// list each card and create it from array values
// This function initializes the application by creating cards for each product 
const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement ("div");
        newDiv.classList.add("item");
        // Creating HTML structure for each product card
        newDiv.innerHTML = `
            <img src ="${value.images}">
            <div class ="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onClick="addToCard(${key})">Add To Cart</button>
        `
        list.appendChild(newDiv); // Add the newly created card to the list
    })
}

initApp();

// function adding to card
// This function adds a product to the shopping cart
const addToCard = (key) => {
    if (listCards[key] === undefined) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }

    reloadCard() // Reloads the shopping cart display
}

// This function reloads the shopping cart display
const reloadCard = () => {
    listCard.innerHTML = "";
    let totalCount = 0; // Initialize total count of products
    let totalPrice = 0; // Initialize total price

    listCards.forEach((value, key) => {
        if (value != null) {
            // Calculate the total price by multiplying the product price by its quantity
            totalPrice += value.price * value.quantity;
            // Update the total count of products
            totalCount += value.quantity;

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
            <div><img src ="${value.images}"></div>
            <div class ="cardTitle">${value.name}</div>
            <div class="cardPrice">${(value.price * value.quantity).toLocaleString()}</div>

            <div>
                <button style="background-color: #006d77" class="cardButton decrement" data-key="${key}">-</button>
                <div class="count">${value.quantity}</div>
                <button style="background-color: #006d77" class="cardButton increment" data-key="${key}">+</button>
            </div>
            `
            listCard.appendChild(newDiv);
        }
    });

    // Update the total price and quantity displayed in the cart
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = totalCount;
}


// change the quantity of a product in the shopping cart 
const changeQuantity = (key, quantityChange) => {
    let currentQuantity = listCards[key].quantity;

    // Update the quantity by adding the change in quantity
    listCards[key].quantity += quantityChange;

    // If the new quantity is 0 or less, remove the item from the list
    if (listCards[key].quantity <= 0) {
        delete listCards[key];
    }

    reloadCard(); // Reload the shopping cart display
}


// Listen for click events on the document and delegate them to the appropriate handlers
document.addEventListener('click', function(event) {
    // If the clicked element is a decrement button
    if (event.target.classList.contains('decrement')) {
        const key = event.target.dataset.key;
        changeQuantity(key, -1); // Decrease the quantity by 1
    }
    // If the clicked element is an increment button
    else if (event.target.classList.contains('increment')) {
        const key = event.target.dataset.key;
        changeQuantity(key, 1); // Increase the quantity by 1
    }
});

