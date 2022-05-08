Vue.component('cart', {
    props: ['goods', 'img', 'visibility'],
    template: `
<div class="modal-basket  " v-show="visibility">
        <div class="modal_header">
            <h3 v-if="goods.length">Товары в корзине:</h3>
            <h3 v-if="!goods.length">В вашей корзине пусто!</h3>

        </div>
        <div class="items">
        <cart-item v-for="item of goods" :key="goods.id_product" :img="img" :good="item"></cart-item>
        </div>
        </div>
</div>
    `
})

Vue.component('cart-item', {
    props: ['good', 'img'],
    template: `
     <div class="goods-item-basket" >
                <img :src='img' alt=" img">
                <div class="goods-item-left">

                    <div class="desc-basket">
                        <h3 class="product-title">{{ good.product_name }} </h3>
                        <p class="product-single-price">₽{{ good.price }} </p>
                        <p class="product-quantity">Quantity:{{ good.quantity }}</p>
                    </div>
                </div>
                <div class="rigth-block">
                    <p class="product-price">₽{{good.quantity * good.price}}</p>
                    <button class="del-btn" @click="$root.remove(good)">&times;</button>
                </div>
            </div>
    `
})