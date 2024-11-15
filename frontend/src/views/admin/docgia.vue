<template>
    <NavigationAdmin>
        <template v-slot:content>
            <h1>Đọc Giả</h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ Tên</th>
                        <th>Giới Tính</th>
                        <th>Ngày Sinh</th>
                        <th>Số Điện Thoại</th>
                        <th>Email</th>
                        <th>Địa Chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(docGia, index) in docGia" :key="docGia._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ `${docGia.HoLot} ${docGia.Ten}` }}</td>
                        <td>{{ docGia.Phai }}</td>
                        <td>{{ formatDate(docGia.NgaySinh) }}</td>
                        <td>{{ docGia.DienThoai }}</td>
                        <td>{{ docGia.Email }}</td>
                        <td>{{ docGia.DiaChi }}</td>
                        <td>
                            <button @click="showModalTheodoimuonsach(docGia._id)"
                                class="btn btn-primary mx-1">Xem</button>
                            <button @click="showModalSuaDocGia(docGia)" class="btn btn-warning mx-1">Sửa</button>
                            <button @click="deleteDocGia(docGia._id)" class="btn btn-danger mx-1">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="modal" :class="{ 'd-block': visibleModalTheodoimuonsach }" id="modalTheodoimuonsach"
                tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Theo Dõi Mượn Sách</h5>
                        </div>
                        <div class="modal-body" v-if="theodoimuonsach.length > 0">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đơn</th>
                                        <th>Ngày mượn</th>
                                        <th>Ngày trả</th>
                                        <th>Tổng tiền</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in theodoimuonsach" :key="item._id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item._id }}</td>
                                        <td>{{ formatDate(item.NgayMuon) }}</td>
                                        <td>{{ formatDate(item.NgayTra) }}</td>
                                        <td>{{ item.TongTien.toLocaleString('vi-VN') }} VNĐ</td>
                                        <td>
                                            <button @click="showModalSach(item.MaSach)"
                                                class="btn btn-primary">Xem</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-body" v-else>
                            <p>Không có dữ liệu</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                @click="visibleModalTheodoimuonsach = false">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" :class="{ 'd-block': visibleModalSach }" id="modalSach" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Thông Tin Sách</h5>

                        </div>
                        <div class="modal-body">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh</th>
                                        <th>Tên sách</th>
                                        <th>Tác giả</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(sachItem, index) in sach" :key="sachItem._id">
                                        <td>{{ index + 1 }}</td>
                                        <td><img :src="showImg(sachItem.ImgeUrl)" alt="Ảnh sách"
                                                style="width: 100px; height: 100px;"></td>
                                        <td>{{ sachItem.TenSach }}</td>
                                        <td>{{ sachItem.TacGia }}</td>
                                        <td>{{ sachItem.SoLuong }}</td>
                                        <td>{{ sachItem.DonGia.toLocaleString() }} VNĐ</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                @click="visibleModalSach = false">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" :class="{ 'd-block': visibleModalSuaDocGia }" id="modalSuaDocGia" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Sửa Đọc Giả</h5>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="suaDocGia">
                                <div class="mb-3">
                                    <label for="hoLot" class="form-label">Họ Lót</label>
                                    <input type="text" class="form-control" id="hoLot" v-model="docGiaSelected.HoLot"
                                        required>

                                    <label for="ten" class="form-label">Tên</label>
                                    <input type="text" class="form-control" id="ten" v-model="docGiaSelected.Ten"
                                        required>

                                    <label for="phai" class="form-label">Giới Tính</label>
                                    <select class="form-control" id="phai" v-model="docGiaSelected.Phai" required>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>

                                    <label for="ngaysinh" class="form-label">Ngày Sinh</label>
                                    <input type="date" class="form-control" id="ngaysinh"
                                        v-model="docGiaSelected.NgaySinh" required>

                                    <label for="dienthoai" class="form-label">Số Điện Thoại</label>
                                    <input type="tel" class="form-control" id="dienthoai"
                                        v-model="docGiaSelected.DienThoai" pattern="[0-9]{10}" required>

                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" v-model="docGiaSelected.Email"
                                        required>

                                    <label for="diachi" class="form-label">Địa Chỉ</label>
                                    <input type="text" class="form-control" id="diachi" v-model="docGiaSelected.DiaChi"
                                        required>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary">Lưu</button>
                                    <button type="button" class="btn btn-secondary"
                                        @click="visibleModalSuaDocGia = false">Đóng</button>
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
import { toast } from 'vue3-toastify';
export default {
    name: 'DocGia',
    components: {
        NavigationAdmin
    },
    data() {
        return {
            docGia: [],
            visibleModalTheodoimuonsach: false,
            theodoimuonsach: [],
            visibleModalSach: false,
            sach: [],
            visibleModalSuaDocGia: false,
            docGiaSelected: {},
        }
    },
    methods: {
        validateForm() {
            const { DiaChi, DienThoai, Email, HoLot, NgaySinh, Phai, Ten } = this.docGiaSelected;
            if (!DiaChi || !DienThoai || !Email || !HoLot || !NgaySinh || !Phai || !Ten) {
                toast.error('Vui lòng điền đầy đủ thông tin');
                return false;
            }
            if (DienThoai.length !== 10) {
                toast.error('Số điện thoại không hợp lệ');
                return false;
            }
            if (!Email.includes('@')) {
                toast.error('Email không hợp lệ');
                return false;
            }
            return true;
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN')
        },
        showModalTheodoimuonsach(docGiaId) {
            this.visibleModalTheodoimuonsach = true;
            apiServiceMuonSach.getTheodoimuonsach(docGiaId).then(response => {
                this.theodoimuonsach = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        showModalSach(sach) {
            this.visibleModalSach = true;
            console.log(sach);
            this.sach = sach;
        },

        getAllDocGia() {
            apiServiceMuonSach.getDocGia().then(response => {
                this.docGia = response.data
            })
        },
        showImg(imgUrl) {
            return `http://localhost:3000` + imgUrl
        },
        showModalSuaDocGia(docGia) {
            this.visibleModalSuaDocGia = true;
            this.docGiaSelected = { ...docGia };
            console.log(this.docGiaSelected);
        },
        suaDocGia() {
            if (!this.validateForm()) {
                return;
            }
            apiServiceMuonSach.updateDocGia(this.docGiaSelected).then(() => {
                this.getAllDocGia();
                this.visibleModalSuaDocGia = false;
                toast.success('Cập nhật thành công');
            }).catch(error => {
                console.log(error);
            });
        },
        deleteDocGia(id) {
            apiServiceMuonSach.getTheodoimuonsach(id).then(response => {
                if (response.data.length > 0) {
                    toast.error('Đọc giả đang có mượn sách');
                    return;
                }
                if (confirm('Bạn có chắc chắn muốn xóa đọc giả này không?')) {
                    apiServiceMuonSach.deleteDocGia(id).then(() => {
                        this.getAllDocGia();
                        toast.success('Xóa thành công');
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.getAllDocGia()

    },

}
</script>

<style scoped>
.modal {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
