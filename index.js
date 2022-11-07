import { menuArray } from './data.js'
const order = []

document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        handleAddItemClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveItemClick(e.target.dataset.remove)
    }
})

function handleAddItemClick(itemId) {      
    menuArray[itemId].itemInCart = true
    order.push(menuArray[itemId])
    
    totalPrice()
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
    
    render()
}

function getContent() {
    let contentHtml = ''
    
    menuArray.forEach((item) => {
        contentHtml += `
            <div class="menu-item-container">
                <div>
                    <img src="${item.image}" />               
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

function render() {
    document.getElementById('root').innerHTML = getContent() 
}

render()