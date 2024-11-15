<template>
    <NavigationAdmin>
        <template v-slot:content>
            <h1>Sách</h1>
            <div class="table-wrapper">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh</th>
                            <th>Tên Sách</th>
                            <th>Đơn giá</th>
                            <th>Số quyển</th>
                            <th>Tác Giả</th>
                            <th>Năm XB</th>
                            <th>Nhà Xuất Bản</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(sach, index) in sach" :key="sach._id">
                            <td>{{ index + 1 }}</td>
                            <td><img :src="imgUrl(sach.ImgUrl)" :alt="'Ảnh sách: ' + sach.TenSach"
                                    style="width: 100px; height: 100px;">
                            </td>
                            <td>{{ sach.TenSach }}</td>
                            <td>{{ sach.DonGia }}</td>
                            <td>{{ sach.SoQuyen }}</td>
                            <td>{{ sach.TacGia }}</td>
                            <td>{{ sach.NamXuatBan }}</td>
                            <td>{{ nhaXuatBan.find(nxb => nxb._id === sach.MaNXB).TenNXB }}
                                <br>
                                {{ nhaXuatBan.find(nxb => nxb._id === sach.MaNXB).DiaChi }}
                            </td>
                            <td>
                                <button class="btn btn-primary" @click="hienThiFormSua(sach)">Sửa</button>
                                <button @click="xoaSach(sach._id)" class="btn btn-danger">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button @click="showFormThem = true">Thêm mới</button>
            <div class="modal" :class="{ 'd-block': showFormThem }">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Thêm Sách</h5>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="themSach">
                                <label for="TenSach">Tên Sách</label>
                                <input type="text" class="form-control" id="TenSach" v-model="sachAdd.TenSach">
                                <label for="ImgUrl">Ảnh</label>
                                <input type="file" class="form-control" id="ImgUrl" @change="UploadImg">
                                <label for="DonGia">Đơn giá</label>
                                <input type="number" class="form-control" id="DonGia" v-model="sachAdd.DonGia">
                                <label for="SoQuyen">Số quyển</label>
                                <input type="number" class="form-control" id="SoQuyen" v-model="sachAdd.SoQuyen">
                                <label for="MaNXB">Nhà Xuất Bản</label>
                                <select class="form-control" id="MaNXB" v-model="sachAdd.MaNXB">
                                    <option value="" selected disabled>Chọn NXB</option>
                                    <option v-for="nxb in nhaXuatBan" :key="nxb._id" :value="nxb._id">{{ nxb.TenNXB }}
                                    </option>
                                </select>
                                <label for="TacGia">Tác Giả</label>
                                <input type="text" class="form-control" id="TacGia" v-model="sachAdd.TacGia">
                                <label for="NamXuatBan">Năm XB</label>
                                <input type="number" class="form-control" id="NamXuatBan" v-model="sachAdd.NamXuatBan">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button @click="showFormThem = false" class="btn btn-secondary">Đóng</button>
                            <button @click="themSach" class="btn btn-primary">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" :class="{ 'd-block': showFormSua }">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Sửa Sách</h5>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="suaSach">
                                <label for="TenSach">Tên Sách</label>
                                <input type="text" class="form-control" id="TenSach" v-model="sachSua.TenSach">
                                <label for="ImgUrl">Ảnh</label>
                                <input type="file" class="form-control" id="ImgUrl" @change="UploadImg">
                                <label for="DonGia">Đơn giá</label>
                                <input type="number" class="form-control" id="DonGia" v-model="sachSua.DonGia">
                                <label for="SoQuyen">Số quyển</label>
                                <input type="number" class="form-control" id="SoQuyen" v-model="sachSua.SoQuyen">
                                <label for="MaNXB">Nhà Xuất Bản</label>
                                <select class="form-control" id="MaNXB" v-model="sachSua.MaNXB">
                                    <option value="" selected disabled>Chọn NXB</option>
                                    <option v-for="nxb in nhaXuatBan" :key="nxb._id" :value="nxb._id">{{ nxb.TenNXB }}
                                    </option>
                                </select>
                                <label for="TacGia">Tác Giả</label>
                                <input type="text" class="form-control" id="TacGia" v-model="sachSua.TacGia">
                                <label for="NamXuatBan">Năm XB</label>
                                <input type="number" class="form-control" id="NamXuatBan" v-model="sachSua.NamXuatBan">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button @click="showFormSua = false" class="btn btn-secondary">Đóng</button>
                            <button @click="suaSach" class="btn btn-primary">Lưu</button>
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
    name: 'SachAdmin',
    components: {
        NavigationAdmin
    },
    data() {
        return {
            sach: [],
            nhaXuatBan: [],
            showFormThem: false,
            showFormSua: false,
            sachAdd: {
                TenSach: '',
                DonGia: 0,
                SoQuyen: 0,
                MaNXB: '',
                TacGia: '',
                NamXuatBan: 0,
                ImgUrl: ''
            },
            sachSua: {

                TenSach: '',
                DonGia: 0,
                SoQuyen: 0,
                MaNXB: '',
                TacGia: '',
                NamXuatBan: 0,
                ImgUrl: ''
            }
        }
    },
    methods: {
        validateForm(form) {
            const { TenSach, DonGia, SoQuyen, MaNXB, TacGia, NamXuatBan } = form;
            if (!TenSach || !DonGia || !SoQuyen || !MaNXB || !TacGia || !NamXuatBan) {
                toast.error('Vui lòng điền đầy đủ thông tin');
                return false;
            }
            if (DonGia < 0) {
                toast.error('Giá không hợp lệ');
                return false;
            }
            if (SoQuyen < 0) {
                toast.error('Số quyển không hợp lệ');
                return false;
            }
            if (NamXuatBan < 0) {
                toast.error('Năm xuất bản không hợp lệ');
                return false;
            }

            return true;
        },
        getAllSach() {
            apiServiceMuonSach.getAllSach().then(res => {
                this.sach = res.data
            })
        },
        xoaSach(id) {
            if (confirm('Bạn có chắc chắn muốn xóa sách này không?')) {
                apiServiceMuonSach.deleteSach(id).then(() => {
                    this.getAllSach();
                    toast.success('Xóa thành công');
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        getNhaXuatBan() {
            apiServiceMuonSach.getNhaXuatBan().then(res => {
                this.nhaXuatBan = res.data
                console.log("Nhà xuất bản", this.nhaXuatBan.find(nxb => nxb._id === '6726205c3e694b0c4fcf662b').TenNXB)
            })
        },
        imgUrl(imgUrl) {
            return "http://localhost:3000" + imgUrl
        },
        themSach() {
            if (!this.validateForm(this.sachAdd)) {
                return;
            }
            apiServiceMuonSach
                .addSach(this.sachAdd)
                .then((res) => {
                    toast.success('Thêm sách thành công')
                    console.log(res)
                    this.showFormThem = false
                    this.getAllSach()
                }).catch(err => {
                    console.error(err)
                    toast.error('Thêm sách không thành công')
                })
        },
        UploadImg(e) {
            const img = e.target.files[0]
            const fd = new FormData()
            fd.append('image', img)
            apiServiceMuonSach.uploadImg(fd).then(res => {
                this.sachAdd.ImgUrl = res.data.path
                this.sachSua.ImgUrl = res.data.path
                console.log(this.sachAdd.ImgUrl)
            }).catch(err => {
                console.error(err)
                console.log(err.response)
                toast.error('Upload ảnh không thành công')
            })
        },
        suaSach() {
            if (!this.validateForm(this.sachSua)) {
                return;
            }
            apiServiceMuonSach.updateSach(this.sachSua._id, this.sachSua)
                .then(() => {
                    toast.success('Sửa sách thành công')
                    this.showFormSua = false
                    this.getAllSach()
                }).catch(err => {
                    console.error(err)
                    toast.error('Sửa sách không thành công')
                })
        },
        hienThiFormSua(sach) {
            this.sachSua = { ...sach }
            this.showFormSua = true
        },
    },
    created() {
        this.getAllSach()
        this.getNhaXuatBan()
    },
}
</script>
<style scoped>
.modal {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
}

.table-wrapper {
    max-height: 400px;
    overflow-y: auto;
}
</style>
