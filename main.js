// declare all the variables
const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".list-card");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

// Open + close cart
openShopping.addEventListener("click", () => {
    body.classList.add("active")
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

// create array of product objects info and names
let products = [
    {
        id: 1,
        name: "PRODUCT 1",
        images: "./images/jacket2.jpeg",
        price: 2000
    },
    {
        id: 2,
        name: "PRODUCT 2",
        images: "./images/jacket1.jpeg",
        price: 1500
    },
    {
        id: 3,
        name: "PRODUCT 3",
        images: "./images/jacket3.jpeg",
        price: 1000
    },
    {
        id: 4,
        name: "PRODUCT 4",
        images: "./images/jacket4.jpeg",
        price: 1800
    },
    {
        id: 5,
        name: "PRODUCT 5",
        images: "./images/jacket5.webp",
        price: 2200
    },
    {
        id: 6,
        name: "PRODUCT 6",
        images: "./images/jacket6.webp",
        price: 1200
    },
]

let listCards = [];

// list each card and create it from array values
const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement ("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src ="${value.images}">
            <div class ="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onClick="addToCard(${key})">Add To Cart</button>
        `
        list.appendChild(newDiv);
    })
}

initApp();

// function adding to card
const addToCard = (key) => {
    if (listCards[key] === undefined) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }

    reloadCard()
}
const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
            <div><img src ="${value.images}"></div>
            <div class ="cardTitle">${value.name}</div>
            <div class="cardPrice">${value.price.toLocaleString()}</div>

            <div>
                <button style="background-color: blueviolet"
                class="cardButton" onClick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class ="count">${count}</div>
                <button style="background-color: blueviolet"
                class="cardButton" onClick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `
            listCard.appendChild(newDiv);
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}

const changeQuantity = (key, quantity) => {
    if (quantity === 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }

    reloadCard()
}
