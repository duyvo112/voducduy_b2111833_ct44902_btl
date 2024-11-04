<template>
    <NavigationAdmin>
        <template v-slot:content>
            <h1>NhanVien</h1>
            <div class="container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ Tên Nhân Viên</th>
                            <th>Số Điện Thoại</th>
                            <th>Email</th>
                            <th>Chức Vụ</th>
                            <th>Địa Chỉ</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(nhanVien, index) in nhanVien" :key="nhanVien.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ nhanVien.HoTenNV }}</td>
                            <td>{{ nhanVien.SoDienThoai }}</td>
                            <td>{{ nhanVien.Email }}</td>
                            <td>{{ nhanVien.ChucVu }}</td>
                            <td>{{ nhanVien.DiaChi }}</td>
                            <td>
                                <button @click="showFormSua(nhanVien)" class="btn btn-primary">Sửa</button>
                                <button @click="deleteNhanVien(nhanVien._id)" class="btn btn-danger ms-2">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button @click="showFormThem = true">Thêm mới</button>

                <div class="modal" :class="{ 'd-block': showFormThem }">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Thêm Nhân Viên</h5>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="themNhanVien">
                                    <div class="form-group">
                                        <label for="HoTenNV">Họ Tên Nhân Viên</label>
                                        <input type="text" class="form-control" id="HoTenNV"
                                            v-model="nhanvienAdd.HoTenNV">
                                        <label for="SoDienThoai">Số Điện Thoại</label>
                                        <input type="text" class="form-control" id="SoDienThoai"
                                            v-model="nhanvienAdd.SoDienThoai">
                                        <label for="Email">Email</label>
                                        <input type="text" class="form-control" id="Email" v-model="nhanvienAdd.Email">
                                        <label for="Password">Mật Khẩu</label>
                                        <input type="password" class="form-control" id="Password"
                                            v-model="nhanvienAdd.Password">
                                        <label for="ChucVu">Chức Vụ</label>
                                        <input type="text" class="form-control" id="ChucVu"
                                            v-model="nhanvienAdd.ChucVu">
                                        <label for="DiaChi">Địa Chỉ</label>
                                        <input type="text" class="form-control" id="DiaChi"
                                            v-model="nhanvienAdd.DiaChi">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            @click="showFormThem = false">Đóng</button>
                                        <button type="submit" class="btn btn-primary">Lưu</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="modal" :class="{ 'd-block': isFormSuaVisible }">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Sửa Nhân Viên</h5>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="suaNhanVien">
                                    <div class="form-group">
                                        <label for="HoTenNV">Họ Tên Nhân Viên</label>
                                        <input type="text" class="form-control" id="HoTenNV"
                                            v-model="nhanvienSua.HoTenNV">
                                        <label for="SoDienThoai">Số Điện Thoại</label>
                                        <input type="text" class="form-control" id="SoDienThoai"
                                            v-model="nhanvienSua.SoDienThoai">
                                        <label for="Email">Email</label>
                                        <input type="text" class="form-control" id="Email" v-model="nhanvienSua.Email">

                                        <label for="ChucVu">Chức Vụ</label>
                                        <input type="text" class="form-control" id="ChucVu"
                                            v-model="nhanvienSua.ChucVu">
                                        <label for="DiaChi">Địa Chỉ</label>
                                        <input type="text" class="form-control" id="DiaChi"
                                            v-model="nhanvienSua.DiaChi">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            @click="isFormSuaVisible = false">Đóng</button>
                                        <button type="submit" class="btn btn-primary">Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </template>
    </NavigationAdmin>
</template>

<script>
import NavigationAdmin from '../../components/NavigationAdmin.vue'
import apiServiceMuonSach from '../../service/muonsach.service'
import { toast } from 'vue3-toastify'
export default {
    name: 'NhanVien',
    components: {
        NavigationAdmin
    },
    data() {
        return {
            nhanVien: [],
            showFormThem: false,
            isFormSuaVisible: false,
            nhanvienAdd: {
                HoTenNV: '',
                SoDienThoai: '',
                Email: '',
                Password: '',
                ChucVu: '',
                DiaChi: ''
            },
            nhanvienSua: {
                HoTenNV: '',
                SoDienThoai: '',
                Email: '',
                Password: '',
                ChucVu: '',
                DiaChi: ''
            }
        }
    },
    methods: {
        themNhanVien() {
            apiServiceMuonSach
                .addNhanVien(this.nhanvienAdd)
                .then(() => {
                    toast.success('Thêm ' + this.nhanvienAdd.HoTenNV + ' thành công')
                    this.showFormThem = false
                    this.getAllNhanVien()
                })
                .catch((error) => {
                    console.log("Thêm nhân viên thất bại", error)
                })
        },
        getAllNhanVien() {
            apiServiceMuonSach
                .getNhanVien()
                .then((response) => {
                    this.nhanVien = response.data
                })
                .catch((error) => {
                    console.log("Lấy nhân viên thất bại", error)
                })
        },
        showFormSua(nhanVien) {
            this.nhanvienSua = { ...nhanVien }
            this.isFormSuaVisible = true
        },
        deleteNhanVien(id) {
            apiServiceMuonSach
                .deleteNhanVien(id)
                .then(() => {
                    toast.success('Xóa nhân viên thành công')
                    this.getAllNhanVien()
                })
        },
        suaNhanVien() {
            apiServiceMuonSach
                .updateNhanVien(this.nhanvienSua._id, this.nhanvienSua)
                .then(() => {
                    toast.success('Sửa thông tin nhân viên thành công')
                    this.isFormSuaVisible = false
                    this.getAllNhanVien()
                })
                .catch((error) => {
                    console.log("Sửa thông tin nhân viên thất bại", error)
                })
        }
    },
    created() {
        this.getAllNhanVien()
    },
}
</script>
<style scoped>
.modal {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
