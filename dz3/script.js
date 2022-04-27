'use strict'
let API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class List {
    constructor(url, container = '.products', list = list2) {
        this.container = container
        this.goods = []
        this.allProducts = []
        this.url = url
        this.list = list
        this._init()

        // this.sumAmount()
    }
    getProducts(url) {
        return fetch(`${API + url}`)
            .then(result => result.json())
            .catch(error => { console.log(error) })
    }
    handleData(data) {
        this.goods = data
        this.render()
    }
    render() {
        let block = document.querySelector(this.container)
        for (let product of this.goods) {
            let item = new this.list[this.constructor.name](product)
            this.allProducts.push(item)
            block.insertAdjacentHTML('beforeend', item.render())
        }

    }
    // sumAmount() {
    //     let sum = this.goods.reduce((accum, item) => accum += item.price, 0)
    //     alert(`Сумма товаров: ${sum} ₽`)
    // }
    //}
}

class Item {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id_product
        this.img = img
        this.title = product.product_name
        this.price = product.price
    }
    render() {
        return `
        <div class="goods-item" data-id="${this.id}">
    <img src="${this.img}" alt="img">
    <div class="desc">
        <h3>${this.title}</h3>
        <p>₽ ${this.price}</p>
        <button type = "button" class="by-btn" 
        data-id="${this.id}"
        data-name="${this.title}"
        data-price="${this.price}">Купить</button>
    </div>
</div>`
    }
}

class ProductList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container)
        this.cart = cart
        this.getProducts(url)
            .then(data => this.handleData(data))
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('by-btn')) {
                this.cart.addProduct(e.target)
            }
        })
    }
}


class ProductItem extends Item { }

class Cart extends List {
    constructor(container = '.items', url = '/getBasket.json') {
        super(url, container)

        this.getProducts(url)
            .then(data => { this.handleData(data.contents) })
    }
    addProduct(element) {
        this.getProducts(`/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id']
                    // console.log(productId)
                    // console.log(this.allProducts)
                    console.log(this.allProducts)
                    let find = this.allProducts.find(product => product.id_product === productId)
                    console.log(find)
                    if (find) {
                        find.quantity++
                        this.updateCart(find)
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        }
                        this.goods = [product]
                        this.render()
                    }
                } else {
                    alert('Доступ запрещен')
                }
            })
    }
    removeProduct(element) {
        this.getProducts(`/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id']
                    let find = this.allProducts.find(product => product.id_product === productId)
                    console.log(find)
                    if (find.quantity > 1) {
                        find.quantity--
                        this.updateCart(find)
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1)
                        document.querySelector(`.goods-item-basket[data-id="${productId}"]`).remove()
                    }
                } else {
                    alert('error')
                }
            })
    }
    updateCart(product) {
        let block = document.querySelector(`.goods-item-basket[data-id="${product.id_product}"]`)
        console.log(block)
        block.querySelector('.product-quantity').textContent = `Quantity:${product.quantity}`
        block.querySelector('.product-price').textContent = `${product.quantity * product.price}`
    }
    _init() {
        document.querySelector('.btn-basket').addEventListener('click', () => {
            document.querySelector('.modal-basket').classList.toggle('invisible')
        })
        document.querySelector(this.container).addEventListener('click', (e) => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target)
            }
        })
    }
}

class CartItem extends Item {
    constructor(product, img = 'https://via.placeholder.com/50x50') {
        super(product, img)
        this.quantity = product.quantity
    }
    render() {
        return `
        <div class="goods-item-basket" data-id="${this.id}">
    <img src="${this.img}" alt="img">
    <div class="goods-item-left">

    <div class="desc-basket">
        <h3 class="product-title">${this.title}</h3>
        <p class="product-single-price">₽${this.price} </p>
        <p class="product-quantity">Quantity:${this.quantity}</p>
    </div>
    </div>
    <div class="rigth-block">
    <p class="product-price">₽${this.quantity * this.price}</p>
    <button class ="del-btn" data-id="${this.id}">&times;</button>
    </div>
</div>`
    }
}
const list2 = {
    ProductList: ProductItem,
    Cart: CartItem
}

let cart = new Cart()
new ProductList(cart)
