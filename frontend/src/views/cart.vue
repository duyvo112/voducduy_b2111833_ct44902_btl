<template>
    <BackgroundComponent>
        <HeaderComponent />
        <h1 class="text-white z-1">Cart</h1>
        <div v-if="cart.length > 0" class="table-wrapper z-1">
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
                        <td>{{ book.DonGia.toLocaleString() }} VNĐ</td>
                        <td>{{ book.SoLuong }}</td>
                        <td>{{ (book.DonGia * book.SoLuong).toLocaleString() }} VNĐ</td>
                        <td><button @click="deleteBook(index)" class="btn btn-danger">Xóa</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="z-1">
            <h3 class="text-white text-center">Không có sách trong giỏ hàng, Mua tại <router-link
                    :to="{ name: 'HomePage' }">
                    đây</router-link></h3>
        </div>
        <div v-if="cart.length > 0" class="container text-white z-1">
            <div class="row">
                <div class="col-md-6">

                </div>
                <div class="col-md-6">
                    <div class="thanhtoan d-flex flex-column align-items-end">
                        <span class="mt-2 me-2">Ngày mượn: </span>
                        <input type="date" class="form-control w-75 me-2 text-muted" v-model="form.NgayMuon">
                        <span class="mt-2 me-2">Ngày trả: </span>
                        <input type="date" class="form-control w-75 me-2" v-model="form.NgayTra">
                        <span class="mt-2 me-2">Tổng tiền: </span>
                        <h3>{{ totalPrice.toLocaleString() }} VNĐ</h3>
                        <button @click="thanhToan" class="btn btn-primary mb-3">Xác nhận mượn sách</button>
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent class="mt-auto" />
    </BackgroundComponent>
</template>

<script>
import BackgroundComponent from '../components/Background.vue'
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/Footer.vue'
import apiServiceMuonSach from '../service/muonsach.service'
import { toast } from 'vue3-toastify'
export default {
    name: 'CartPage',
    components: {
        BackgroundComponent,
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            form: {
                MaDocGia: JSON.parse(sessionStorage.getItem('user'))._id,
                NgayMuon: new Date().toISOString().split('T')[0],
                NgayTra: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
                TongTien: 0,
            },
            cart: JSON.parse(sessionStorage.getItem('cart')) || [],
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
            this.form.TongTien = this.totalPrice;
            this.form.MaSach = this.cart.map(book => ({ MaSach: book._id, SoLuong: book.SoLuong, TenSach: book.TenSach, ImgeUrl: book.ImgUrl, DonGia: book.DonGia, TacGia: book.TacGia }));
            console.log(this.form.MaSach.map(book => book.SoLuong));
            apiServiceMuonSach.muonSach(this.form).then(res => {
                console.log(res);
                sessionStorage.removeItem('cart');
                this.cart = [];
                toast.success("Mượn sách thành công");
            }).catch(() => {
                toast.error("Sách đã hết");
            });
        },
    },
    computed: {
        totalPrice() {
            return this.cart.reduce((total, book) => total + book.DonGia * book.SoLuong, 0);
        }
    },
}
</script>
<style scoped>
.table-wrapper {
    max-height: 400px;
    overflow-y: auto;
}
</style>