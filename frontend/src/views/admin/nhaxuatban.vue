<template>
    <NavigationAdmin>
        <template v-slot:content>
            <h1>Nhà Xuất Bản</h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên NXB</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(nhaXuatBan, index) in nhaXuatBan" :key="nhaXuatBan.maNXB">
                        <td>{{ index + 1 }}</td>
                        <td>{{ nhaXuatBan.TenNXB }}</td>
                        <td>{{ nhaXuatBan.DiaChi }}</td>
                        <td>
                            <button @click="showFormSua(nhaXuatBan)" class="btn btn-primary ">Sửa</button>
                            <button @click="deleteNhaXuatBan(nhaXuatBan._id)" class="btn btn-danger ms-2">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="showFormThem = true">Thêm mới</button>
            <div class="modal" :class="{ 'd-block': showFormThem }">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Thêm Nhà Xuất Bản</h5>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="addNhaXuatBan">
                                <div class="form-group">
                                    <label for="TenNXB">Tên NXB</label>
                                    <input type="text" class="form-control" id="TenNXB" v-model="nhaXuatBanAdd.TenNXB"
                                        required>
                                </div>
                                <div class="form-group">
                                    <label for="DiaChi">Địa chỉ</label>
                                    <input type="text" class="form-control" id="DiaChi" v-model="nhaXuatBanAdd.DiaChi"
                                        required>
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
                            <h5 class="modal-title">Sửa Nhà Xuất Bản</h5>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="updateNhaXuatBan">
                                <div class="form-group">
                                    <label for="TenNXB">Tên NXB</label>
                                    <input type="text" class="form-control" id="TenNXB" v-model="nhaXuatBanEdit.TenNXB"
                                        required>
                                </div>
                                <div class="form-group">
                                    <label for="DiaChi">Địa chỉ</label>
                                    <input type="text" class="form-control" id="DiaChi" v-model="nhaXuatBanEdit.DiaChi"
                                        required>
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
        </template>
    </NavigationAdmin>
</template>

<script>
import NavigationAdmin from '../../components/NavigationAdmin.vue'
import apiServiceMuonSach from '../../service/muonsach.service'
import { toast } from 'vue3-toastify'
export default {
    name: 'NhaXuatBan',
    components: {
        NavigationAdmin
    },
    data() {
        return {
            nhaXuatBan: [],
            nhaXuatBanAdd: {
                TenNXB: '',
                DiaChi: ''
            },
            nhaXuatBanEdit: {
                TenNXB: '',
                DiaChi: ''
            },
            showFormThem: false,
            isFormSuaVisible: false,
        }
    },
    methods: {
        showFormSua(nhaXuatBan) {
            this.nhaXuatBanEdit = { ...nhaXuatBan }
            this.isFormSuaVisible = true
        },
        getNhaXuatBan() {
            apiServiceMuonSach.getNhaXuatBan().then(response => {
                this.nhaXuatBan = response.data
            })
        },
        addNhaXuatBan() {
            apiServiceMuonSach
                .addNhaXuatBan(this.nhaXuatBanAdd)
                .then(response => {
                    this.nhaXuatBan.push(response.data)
                    this.showFormThem = false
                    this.getNhaXuatBan()
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteNhaXuatBan(maNXB) {
            apiServiceMuonSach.deleteNhaXuatBan(maNXB).then(() => {
                toast.success('Xóa nhà xuất bản thành công')
                this.getNhaXuatBan()
            }).catch(error => {
                console.log(error)
            })
        },
        updateNhaXuatBan() {
            apiServiceMuonSach
                .updateNhaXuatBan(this.nhaXuatBanEdit._id, this.nhaXuatBanEdit)
                .then(() => {
                    this.isFormSuaVisible = false;
                    this.getNhaXuatBan();
                    toast.success('Sửa nhà xuất bản thành công')
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.getNhaXuatBan()
    }
}
</script>

<style scoped>
.modal {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
