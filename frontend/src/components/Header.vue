<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link class="navbar-brand text-white" :to="{ name: 'HomePage' }">BorrowBook</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{ name: 'HomePage' }"><font-awesome-icon
                                icon="fa-solid fa-house " />Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{ name: 'ContactPage' }"><font-awesome-icon
                                icon="fa-solid fa-address-book" />Contact</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{ name: 'CartPage' }"><font-awesome-icon
                                icon="fa-solid fa-cart-shopping" />Cart</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link v-if="!isLoggedIn" class="nav-link text-white" :to="{ name: 'LoginPage' }">
                            Login
                        </router-link>
                        <div v-else class="dropdown-toggle">
                            <button class="nav-link text-white">{{ user.Ten }} <font-awesome-icon
                                    icon="fa-solid fa-caret-down" /></button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" @click="history(user._id)">Lịch sử thuê
                                    sách<font-awesome-icon icon="fa-solid fa-clock-rotate-left" /></a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" @click="logout">Logout <font-awesome-icon
                                        icon="fa-solid fa-arrow-right-from-bracket" /></a>
                            </div>
                            <div v-if="showHistoryModal" class="modal" tabindex="-1" role="dialog">
                                <div class="modal-dialog modal-xl" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Lịch sử thuê sách</h5>
                                        </div>
                                        <div class="modal-body">
                                            <table class="table w-100">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Mã đơn</th>
                                                        <th>Ngày mượn</th>
                                                        <th>Ngày trả</th>
                                                        <th>Tổng tiền</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="" v-for="(item, index) in theodoimuonsach" :key="index">
                                                        <td>{{ index + 1 }}</td>
                                                        <td>{{ item._id }}</td>
                                                        <td>{{ item.NgayMuon.split('T')[0] }}</td>
                                                        <td>{{ item.NgayTra.split('T')[0] }}</td>
                                                        <td>{{ item.TongTien.toLocaleString() }} VNĐ</td>
                                                        <td>
                                                            <button class="btn btn-primary" @click="detail(item)">Xem
                                                                chi
                                                                tiết</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                @click="showHistoryModal = false">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="showDetailModal" class="modal" tabindex="-1" role="dialog">
                                <div class="modal-dialog modal-xl" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Chi tiết đơn hàng</h5>
                                        </div>
                                        <div class="modal-body">

                                            <p>Mã đơn: {{ detailItem._id }}</p>
                                            <p>Ngày mượn: {{ detailItem.NgayMuon.split('T')[0] }}</p>
                                            <p>Ngày trả: {{ detailItem.NgayTra.split('T')[0] }}</p>
                                            <p>Tổng tiền: {{ detailItem.TongTien.toLocaleString() }} VNĐ</p>

                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Hình ảnh</th>
                                                        <th>Tên sách</th>
                                                        <th>Số lượng</th>
                                                        <th>Giá tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in detailItem.MaSach" :key="index">
                                                        <td>{{ index + 1 }}</td>
                                                        <td>
                                                            <img :src="showImg(item.ImgeUrl)" alt="Hình ảnh" width="100"
                                                                height="100">
                                                        </td>
                                                        <td>{{ item.TenSach }}</td>
                                                        <td>{{ item.SoLuong }}</td>
                                                        <td>{{ item.DonGia }} VNĐ</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                @click="showDetailModal = false">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
import { toast } from 'vue3-toastify';
import apiServiceMuonSach from '../service/muonsach.service';
export default {
    name: 'HeaderComponent',
    data() {
        return {
            isLoggedIn: this.checkLoggedIn(),
            user: JSON.parse(sessionStorage.getItem('user')),
            showHistoryModal: false,
            theodoimuonsach: [],
            showDetailModal: false,
            detailItem: {},
        }
    },
    methods: {
        checkLoggedIn() {
            return sessionStorage.getItem('user') ? true : false;
        },
        logout() {
            sessionStorage.clear();
            this.isLoggedIn = this.checkLoggedIn();
            this.$router.push({ name: 'LoginPage' });
            toast.success('Đăng xuất thành công');
        },
        history(userId) {
            apiServiceMuonSach.getTheodoimuonsach(userId).then((res) => {
                this.theodoimuonsach = res.data;
            }).catch((err) => {
                console.log(err);
            })
            this.showHistoryModal = true;
        },
        showImg(imgUrl) {
            return `http://localhost:3000` + imgUrl
        },
        detail(item) {
            this.showDetailModal = true;
            this.detailItem = item;
        },
    }
}
</script>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    display: none;
    position: absolute;
    top: 50%;
    right: 0;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.dropdown:hover .dropdown-menu {
    display: block;
}

.dropdown-item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-item:hover {
    background-color: #f1f1f1;
}

.modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>