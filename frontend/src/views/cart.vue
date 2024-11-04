<template>
    <BackgroundComponent>
        <HeaderComponent />
        <h1 class="text-white">Cart</h1>
        <div class="table-wrapper">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh</th>
                        <th>Tên sách</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in cart" :key="book._id">
                        <td>{{ index + 1 }}</td>
                        <td><img :src="imgUrl(book.ImgUrl)" class="card-img-top"
                                style="width: 100px; height: 100px; object-fit: cover;" alt="Book Cover"></td>
                        <td>{{ book.TenSach }}</td>
                        <td>{{ book.DonGia }}</td>
                        <td>{{ book.SoLuong }}</td>
                        <td>{{ book.DonGia * book.SoLuong }}</td>
                        <td><button @click="deleteBook(index)" class="btn btn-danger">Xóa</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="container d-flex justify-content-end text-white">
                <span class="mt-2 me-2">Ngày mượn: </span>
                <input type="date" class="form-control w-25 me-2" v-model="ngayMuon">
                <button @click="thanhToan" class="btn btn-primary w-25">Thanh toán</button>
            </div>
        </div>
    </BackgroundComponent>
</template>

<script>
import BackgroundComponent from '../components/Background.vue'
import HeaderComponent from '../components/Header.vue'
export default {
    name: 'CartPage',
    components: {
        BackgroundComponent,
        HeaderComponent
    },
    data() {
        return {
            cart: JSON.parse(sessionStorage.getItem('cart')) || [],
            ngayMuon: new Date().toISOString().split('T')[0]
        }
    },
    methods: {
        imgUrl(imgUrl) {
            return "http://localhost:3000" + imgUrl
        },
        deleteBook(index) {
            this.cart.splice(index, 1)
            sessionStorage.setItem('cart', JSON.stringify(this.cart))
        },
        thanhToan() {
            console.log(this.ngayMuon);
        }
    }
}
</script>
<style scoped>
.table-wrapper {
    max-height: 500px;
    overflow-y: auto;
}
</style>