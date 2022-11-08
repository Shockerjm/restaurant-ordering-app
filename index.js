import { menuArray } from './data.js'
const order = []

document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        handleAddItemClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveItemClick(e.target.dataset.remove)
    } else if(e.target.id === 'complete-order') {
        document.getElementById('payment-modal').style.display = 'inline'
    }
})

function handleAddItemClick(itemId) {      
    menuArray[itemId].itemInCart = true
    order.push(menuArray[itemId])
    
    render()
}

function handleRemoveItemClick(itemId) {
    const foundItemIndex = order.findIndex(({ id }) => id == itemId)
    order.splice(foundItemIndex, 1)
    
    checkRemoveVisible(itemId)
    render()
}

function checkRemoveVisible(itemId) {    
    if (order.find(({ id }) => id == itemId)){
        
    } else {
        menuArray[itemId].itemInCart = false
    }
}

function totalPrice() {
    const total = order.reduce((current, obj) => {
        let price = parseInt(obj.price)
        if (!isNaN(price)) {
            return current + price
        }
        return current
    }, 0)
    
    return total
}

function getContent() {
    let contentHtml = ''
    
    menuArray.forEach((item) => {
        contentHtml += `
            <div class="menu-item-container">
                <div>
                    <img src="${item.image}" alt="${item.alt}"/>               
                </div>
                <div class="item">
                    <h2>${item.name}</h2>
                    <p class="ingredients">${item.ingredients}</p>
                    <p>$${item.price}</p>
                </div>
                <div>
                    <button id="removeBtn-${item.id}" class="${item.itemInCart === false ? "hidden" : ""} remove btn" data-remove=${item.id}>-</button>
                    <button id="addBtn-${item.id}" class="btn" data-add=${item.id}>+</button>
                </div>
            </div>
        `
    })
    return contentHtml
}

function getOrder() {
    let orderHtml = `
        <div class="order-container">
            <span class="order-title"><h3>Your Order</h3></span>
    `
    
    order.forEach((item) => {
        orderHtml += `
                <div class="order-list">
                    <p class="order-item">${item.name} <span class="remove-txt" data-remove=${item.id}>remove</span></p>
                    <p class="order-item"><span class="order-price">$${item.price}</span></p>
                </div>
        `
    })
    orderHtml +=`
            <div class="order-list total-price">
                <h3>Total Price:</h3>
                <span class="order-price">$${totalPrice()}</span>
            </div>
            <button id="complete-order" class="complete-order-btn">Complete Order</button>
        </div>
    `
    return orderHtml
}

function render() {
    const root = document.getElementById('root')
    root.innerHTML = getContent() 
    if (order.length !== 0) {
        root.innerHTML += getOrder()
    }
}

render()