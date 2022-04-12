class ProductList {
    constructor(container = '.products', amount = '.amount') {
        this.container = document.querySelector(container)
        this.amount = document.querySelector(amount)
        this.goods = []
        this.productsObject = []

        this.fetchGoods()
        this.render()
        this.basketAmount()

    }
    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ]
    }
    render() {
        for (const product of this.goods) {
            const productObject = new ProductItem(product)

            this.productsObject.push(productObject)
            this.container.insertAdjacentHTML('beforeend', productObject.getHtmlString())
        }
    }
    // basketAmount() {
    //     let sumAmount = 0
    //     for (let elem of this.goods) {
    //         sumAmount += elem.price
    //     }
    //     document.querySelector('.amountCount').insertAdjacentHTML('beforeend', sumAmount)
    // }
    basketAmount() {
        let sum = 0
        for (let elem of this.goods) {
            sum += elem.price
        }
        const sumAmount = new AmountGoods(sum)
        this.amount.insertAdjacentHTML('beforeend', sumAmount.getHtmlAmount())
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    getHtmlString() {
        return `
        <div class="goods-item" data-id="${this.id}">
    <img src="${this.img}" alt="img">
    <div class="desc">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="by-btn">Купить</button>
    </div>
</div>`
    }
}

class AmountGoods {
    constructor(sum) {
        this.sum = sum
    }
    getHtmlAmount() {
        return `<h2>Суммарная стоимость всех товаров: ${this.sum} </h2>`
    }
}
new ProductList()
