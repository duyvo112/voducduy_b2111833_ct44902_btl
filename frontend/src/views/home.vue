<template>
    <BackgroundComponent>
        <HeaderComponent />
        <div class="container">
            <h1 class="text-white mb-4">Danh sách sách</h1>
            <div class="row">
                <div class="col-md-3 mb-4" v-for="(book, index) in books" :key="book.id">
                    <div class="card bg-transparent text-white border-white">
                        <router-link :to="`/book/${book._id}`" class="text-decoration-none text-white">
                            <img :src="imgUrl(book.ImgUrl)" class="card-img-top h-img" alt="Book Cover">
                            <div class="card-body">
                                <h5 class="card-title">{{ book.TenSach }}</h5>
                                <p class="card-text">{{ book.TacGia }}</p>
                                <p class="card-text text-white-50">{{ book.NamXuatBan }}</p>
                                <p class="card-text text-end fs-5">{{ book.DonGia.toLocaleString() }} VNĐ</p>

                            </div>
                        </router-link>
                        <div class="card-footer bg-transparent">
                            <div class="d-flex justify-content-between">
                                <span class="mt-1">Số lượng: </span>
                                <input type="number" class="form-control w-25" v-model="soLuong[index]">
                                <button class="btn btn-transparent border-white text-white btn-borrow"
                                    @click="borrowBook(book, index)">
                                    Mượn sách
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BackgroundComponent>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import BackgroundComponent from '../components/Background.vue'
import apiServiceMuonSach from '../service/muonsach.service'
export default {
    name: 'HomePage',
    components: {
        HeaderComponent,
        BackgroundComponent
    },
    data() {
        return {
            books: [],
            soLuong: []
        }
    },
    methods: {
        borrowBook(book, index) {
            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            cart.push({ ...book, SoLuong: this.soLuong[index] });
            sessionStorage.setItem('cart', JSON.stringify(cart));
        },
        getAllSach() {
            apiServiceMuonSach.getAllSach().then(res => {
                this.books = res.data
                console.log(this.books)
                this.soLuong = Array(this.books.length).fill(1)
            })
        },
        imgUrl(imgUrl) {
            return "http://localhost:3000" + imgUrl
        }
    },
    created() {
        this.getAllSach()
    }
}
</script>
<style scoped>
.bg-transparent {
    background-color: rgba(0, 0, 0, 0.5) !important;
}

.btn-borrow:hover {
    background-color: white;
    color: black !important;
}

.h-img {
    height: 300px;
    object-fit: cover;
}
</style>