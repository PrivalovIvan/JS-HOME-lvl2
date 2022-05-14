Vue.component('filter-comp',{
    props: ['search','filter'],
    template: `
                 <div class="cart">
                    <form action="#" class="search-form" @submit.prevent="filter(search)">
                        <input type="text" class="serch-field" v-model="search">
                        <i class="fas fa-search"> </i>
                    </form>
                </div>`
})