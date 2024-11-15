<template>
    <BackgroundComponent>
        <HeaderComponent />
        <div class="container my-5 text-white z-1">
            <h1 class="text-center mb-4">Liên hệ</h1>
            <div class="row">
                <div class="col-md-6">
                    <form @submit.prevent="sendMessage">
                        <div class="mb-3">
                            <label for="name" class="form-label">Họ tên</label>
                            <input type="text" class="form-control" id="name" placeholder="Nhập họ tên">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Nhập email">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Nội dung</label>
                            <textarea class="form-control" id="message" rows="5" placeholder="Nhập nội dung"></textarea>
                        </div>
                        <button type="submit" class="btn btn-outline-light">Gửi</button>
                    </form>
                </div>
                <div class="col-md-6">
                    <h4>Thông tin liên hệ</h4>
                    <p>123 Đường số 1<br>Thành phố Cần Thơ<br>Điện thoại: 0987654321<br>Email: info@example.com</p>
                </div>
            </div>
        </div>
        <FooterComponent />
    </BackgroundComponent>
</template>
<script>
import BackgroundComponent from '../components/Background.vue'
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/Footer.vue'
export default {
    name: 'ContactPage',
    components: {
        BackgroundComponent,
        HeaderComponent,
        FooterComponent
    }
}

</script>
