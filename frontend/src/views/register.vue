<template>
    <BackgroundComponent>
        <HeaderComponent />
        <div class="register-container container w-25 mt-70 text-white border border-white rounded-3 p-5">
            <h2 class="text-center mb-5">Đăng ký</h2>
            <form id="registerForm" @submit.prevent="register" method="POST">
                <div class="mb-3">
                    <label for="HoLot" class="form-label">Họ Lót</label>
                    <input type="text" class="form-control" id="HoLot" v-model="form.HoLot" required />
                </div>
                <div class="mb-3">
                    <label for="Ten" class="form-label">Tên</label>
                    <input type="text" class="form-control" id="Ten" v-model="form.Ten" required />
                </div>
                <div class="mb-3">
                    <label for="NgaySinh" class="form-label">Ngày sinh</label>
                    <input type="date" class="form-control" id="NgaySinh" v-model="form.NgaySinh" required />
                </div>
                <div class="mb-3">
                    <label for="DiaChi" class="form-label">Địa chỉ</label>
                    <input type="text" class="form-control" id="DiaChi" v-model="form.DiaChi" required />
                </div>
                <div class="mb-3">
                    <label for="Phai" class="form-label">Giới tính</label>
                    <select name="Phai" id="Phai" class="form-control" v-model="form.Phai" required>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="DienThoai" class="form-label">Điện thoại</label>
                    <input type="text" class="form-control" id="DienThoai" v-model="form.DienThoai" required />
                </div>
                <div class="mb-3">
                    <label for="MatKhau" class="form-label">Mật khẩu</label>
                    <input type="password" class="form-control" id="MatKhau" v-model="form.Password" required />
                </div>
                <div class="mb-3">
                    <label for="Email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="Email" v-model="form.Email" required />
                </div>

                <button type="submit" class="btn btn-primary">Đăng ký</button>
                <div class="mt-3 text-center">
                    <small>Đã có tài khoản?
                        <router-link :to="{ name: 'LoginPage' }" class="text-white">Đăng nhập tại
                            đây</router-link></small>
                </div>
            </form>
        </div>
    </BackgroundComponent>
</template>
<script>
import BackgroundComponent from '../components/Background.vue'
import HeaderComponent from '../components/Header.vue'
import apiServiceMuonSach from '../service/muonsach.service'
import { toast } from 'vue3-toastify';
export default {
    name: 'RegisterPage',
    components: {
        BackgroundComponent,
        HeaderComponent
    },
    data() {
        return {
            form: {
                HoLot: '',
                Ten: '',
                NgaySinh: '',
                DiaChi: '',
                Phai: '',
                DienThoai: '',
                Password: '',
                Email: ''
            }
        }
    },
    methods: {
        register() {
            apiServiceMuonSach.registerDocGia(this.form)
                .then(() => {
                    toast.success("Đăng ký thành công");
                    this.$router.push({ name: 'LoginPage' });
                }).catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
