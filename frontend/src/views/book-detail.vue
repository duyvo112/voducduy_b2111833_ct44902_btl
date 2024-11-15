<template>
    <BackgroundComponent>
        <HeaderComponent />
        <div class="container text-white">
            <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider-color: #fff;">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name: 'HomePage' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item active text-white" aria-current="page">{{ book.TenSach }}</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-4">
                    <img :src="imgUrl(book.ImgUrl)" class="img-fluid w-100 h-100" alt="Book Cover">
                </div>
                <div class="col-md-8">
                    <h3>{{ book.TenSach }}</h3>
                    <p>Tác giả: {{ book.TacGia }}</p>
                    <p>Năm xuất bản: {{ book.NamXuatBan }}</p>
                    <p>Đơn giá: {{ book.DonGia }} VNĐ</p>
                    <div class="borrow d-flex  align-items-center">
                        <input type="number" class="form-control w-25 me-2" v-model="soLuong" placeholder="Số lượng">
                        <button class="btn btn-outline-light" @click="addToCart">Mượn sách</button>
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent />
    </BackgroundComponent>
</template>
<script>
import muonsachService from '@/service/muonsach.service';
import BackgroundComponent from '../components/Background.vue'
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/Footer.vue'
import { toast } from 'vue3-toastify';
export default {
    name: 'BookDetail',
    components: {
        BackgroundComponent,
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            book: {},
            soLuong: 1
        }
    },
    created() {
        this.getBookDetail();
    },
    methods: {
        getBookDetail() {
            const id = this.$route.params.id;
            muonsachService.getSachById(id).then(response => {
                console.log(response.data);
                this.book = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        imgUrl(url) {
            return `http://localhost:3000` + url;
        },
        addToCart() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user) {
                const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                const existingBook = cart.find(item => item._id === this.book._id);

                if (this.soLuong <= 0 || this.book.SoQuyen < this.soLuong) {
                    if (this.book.SoQuyen < this.soLuong) {
                        toast.error(`Số lượng sách không đủ`);
                    } else {
                        toast.error('Số lượng không hợp lệ');
                    }
                } else if (existingBook) {
                    if (this.book.SoQuyen < existingBook.SoLuong + this.soLuong) {
                        toast.error(`Số lượng sách không đủ`);
                    } else {
                        existingBook.SoLuong += this.soLuong;
                        sessionStorage.setItem('cart', JSON.stringify(cart));
                        toast.success(`Đã thêm ${this.book.TenSach} vào giỏ hàng`);
                    }
                } else {
                    const bookToAdd = {
                        _id: this.book._id,
                        TenSach: this.book.TenSach,
                        DonGia: this.book.DonGia,
                        SoQuyen: this.book.SoQuyen,
                        NamXuatBan: this.book.NamXuatBan,
                        MaNXB: this.book.MaNXB,
                        TacGia: this.book.TacGia,
                        ImgUrl: this.book.ImgUrl,
                        SoLuong: this.soLuong
                    };
                    cart.push(bookToAdd);
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    toast.success(`Đã thêm ${this.book.TenSach} vào giỏ hàng`);
                }
            } else {
                toast.error('Vui lòng đăng nhập để mượn sách');
                this.$router.push({ name: 'LoginPage' });
            }
        }
    }

}
</script>