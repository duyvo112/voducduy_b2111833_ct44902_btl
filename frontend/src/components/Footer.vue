<template>
    <footer class="footer bg-dark text-light py-4 mt-5 z-1">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5>Thư viện sách trực tuyến số 1 Việt Nam</h5>
                    <p>Hỗ trợ khách hàng<br>1900 6750</p>
                    <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
                    <p>Email: support@thuvienso.com</p>
                </div>
                <div class="col-md-4">
                    <h5>Hướng dẫn thuê sách</h5>
                    <ul class="list-unstyled">
                        <li>Tìm kiếm sách</li>
                        <li>Đăng ký tài khoản</li>
                        <li>Thuê và trả sách</li>
                        <li>Quy định và chính sách</li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Hỗ trợ độc giả</h5>
                    <ul class="list-unstyled">
                        <li>Câu hỏi thường gặp</li>
                        <li>Hướng dẫn sử dụng</li>
                        <li>Điều khoản dịch vụ</li>
                        <li>Chính sách bảo mật</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; {{ new Date().getFullYear() }} Thư viện sách trực tuyến | Powered by Vue.js</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent",
};
</script>
