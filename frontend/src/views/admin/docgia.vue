<template>
    <NavigationAdmin>
        <template v-slot:content>
            <h1>DocGia</h1>
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

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(docGia, index) in docGia" :key="docGia.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ `${docGia.HoLot} ${docGia.Ten}` }}</td>
                        <td>{{ docGia.Phai }}</td>
                        <td>{{ formatDate(docGia.NgaySinh) }}</td>
                        <td>{{ docGia.DienThoai }}</td>
                        <td>{{ docGia.Email }}</td>
                        <td>{{ docGia.DiaChi }}</td>
                    </tr>
                </tbody>

            </table>
        </template>
    </NavigationAdmin>
</template>

<script>
import NavigationAdmin from '../../components/NavigationAdmin.vue'
import apiServiceMuonSach from '../../service/muonsach.service'
export default {
    name: 'DocGia',
    components: {
        NavigationAdmin
    },
    data() {
        return {
            docGia: [],
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN')
        }
    },
    created() {
        apiServiceMuonSach.getDocGia().then(response => {
            this.docGia = response.data
        })
    }
}
</script>
