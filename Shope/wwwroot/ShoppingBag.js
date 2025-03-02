﻿
const Basket = addEventListener("load", async () => {
    DrawBacket()

   
    
})
let price = 0;


const DrawBacket = async () => {

    document.querySelector("tbody").innerHTML = ''
    price = 0

    document.getElementById("totalAmount").textContent = price + ' ₪'

    let products = JSON.parse(sessionStorage.getItem("basket"))



    document.getElementById("itemCount").innerText=products.length
    

    for (let i = 0; i < products.length; i++) 
        await showProductBasket(products[i])
   
}

const showProductBasket = async (product) => {
    const inbasket = await fetch(`api/product/${product}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

        query: {
            id: product
        }


    });
    shopingBag = await inbasket.json();
   console.log(shopingBag)
    showOneProduct(shopingBag);
 
}
const showOneProduct = (product) => {
    price += product.price;
    let url = `./Images/${product.image}`

    console.log(url)
    console.log(product.image)
    console.log(product)

    let tmp = document.getElementById("temp-row");
    let cloneProduct = tmp.content.cloneNode(true)

    cloneProduct.querySelector(".image").style.backgroundImage = `url(${url})`
    //cloneProduct.querySelector(".descriptionColumn").innerText = product.description
    cloneProduct.querySelector(".itemName").innerText = product.productName

    //cloneProduct.querySelector(".availabilityColumn").innerText = "true"
    cloneProduct.querySelector(".availabilityColumn").innerText = "true"

    cloneProduct.querySelector(".price").innerText = product.price + ' ₪'
    cloneProduct.querySelector(".expandoHeight").addEventListener('click', () => { deleteproduct(product) })
    document.getElementById("totalAmount").textContent = price + ' ₪'

    document.querySelector("tbody").appendChild(cloneProduct)

}

const detials = () => {
    let UserId = JSON.parse(sessionStorage.getItem("userId"))
    let orderItems1 = JSON.parse(sessionStorage.getItem("basket"))
    const OrderItems = []
    orderItems1.map(t => {
        let object = { productId:t ,qantity: 1 }

        OrderItems.push(object)
    })

    let OrderSum = price;
    let OrderDate = "2025-01-13"
   /* OrderDate=OrderDate.toLocaleDateString()*/
    return ({
        OrderDate,OrderSum, UserId, OrderItems, 
    })
}

const placeOrder = async () => {
    if (price != 0) {
        if (sessionStorage.getItem("userId")) {
            let alldetials = detials()
            const orderss = await fetch('api/Order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(alldetials)

            });
            ordderJson = await orderss.json();
            console.log(ordderJson)
            if (orderss.ok) {
               
                alert(`הזמנה ${ordderJson.orderId}  בוצעה בהצלחה `)

                sessionStorage.setItem("basket", JSON.stringify([]))
                window.location.href = "Products.html"

            }
        }
        else {

            alert("אינך רשום")
            window.location.href = "user.html"
        }


    }
    else {
        alert("הסל ריק")
        window.location.href = "Products.html";
    }
 
    }
    

const deleteproduct = async (product) => {
    const cartString = JSON.parse(sessionStorage.getItem("basket")) || [];
    console.log(cartString)
    //let basket = cartString ? cartString) : [];
    const current = cartString.indexOf(product.id)
    console.log(current)
    cartString.splice(current, 1)
    sessionStorage.setItem("basket", JSON.stringify(cartString));
    DrawBacket()
}

    


