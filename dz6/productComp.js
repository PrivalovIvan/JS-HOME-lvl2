Vue.component('products',{
    props: ['products', 'img'],
    template:` <div class="products">
                <product  v-for="item of products" 
                :key='item.id_product'
                 :img='img'
                 :product='item'></product>
                </div>`
})

Vue.component('product', {
    props: ['product', 'img'],
    template:`   <div class="goods-item">
                    <img :src="img" alt="product">
                    <div class="desc">
                        <h3>{{ product.product_name }}</h3>
                        <p>₽{{ product.price }}</p>
                        <button type="button" class="by-btn" @click="$parent.$emit('add-product',product)">Купить</button>
                    </div>
                </div> 
                    `
})