// declare all the variables
const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
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

// array of product info and names
let products = [
    {
        id: 1,
        name: "PRODUCT 1",
        images: "1.PNG",
        price: 2000
    },
    {
        id: 2,
        name: "PRODUCT 2",
        images: "2.PNG",
        price: 1500
    },
    {
        id: 3,
        name: "PRODUCT 3",
        images: "3.PNG",
        price: 1000
    },
    {
        id: 4,
        name: "PRODUCT 4",
        images: "4.PNG",
        price: 1800
    },
    {
        id: 5,
        name: "PRODUCT 5",
        images: "5.PNG",
        price: 2200
    },
    {
        id: 6,
        name: "PRODUCT 6",
        images: "6.PNG",
        price: 1200
    },
]

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement ("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src ="img/${value.images}">
            <div class ="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onClick="addToCard(${key})"Add To Card</button>
        `
        list.appendChild(newDiv);
    })
}

initApp();
