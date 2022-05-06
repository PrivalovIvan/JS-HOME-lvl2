let API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`

let app = new Vue({
    el: '#app',
    data: {
        urlCatalog: `/catalogData.json`,
        products: [],
        filtered: [],
        img: 'https://via.placeholder.com/200x150',
        imgBasket: 'https://via.placeholder.com/100x50',
        userSearch: '',
        showBasket: false,
        goods: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => { console.log(error) })
        },
        filter(value) {
            const regexp = new RegExp(value, 'i')
            this.filtered = this.products.filter(product => regexp.test(product.product_name))
        },
        render() {
            let block = document.querySelector('.items')
            console.log(block)
            for (let product of this.goods) {
                this.products.push(item)
                block.insertAdjacentHTML('beforeend', this.renderHtml(product))
            }
        },
        addProduct(item) {
            let productId = item.id_product
            let find = this.goods.find(product => product.id_product === productId)

            if (find) {
                find.quantity++
            } else {
                const prod = Object.assign({ quantity: 1 }, item)
                this.goods.push(prod)
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                item.quantity--
            } else {
                this.goods.splice(this.goods.indexOf(item), 1)
            }
        }
    },
    mounted() {
        this.getJson(`${API}/getBasket.json`)
            .then(data => {
                for (let item of data.contents) {
                    this.goods.push(item)
                }
            })
        this.getJson(`${API + this.urlCatalog}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el)
                    this.filtered.push(el)
                }
            })

    }

})

let show = new Vue({
    el: '#myform',
    data: {
        showForm: true
    }
})
