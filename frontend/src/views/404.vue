<template>
    <BackgroundComponent>
        <HeaderComponent />
        <div class="container text-center fs-1">
            <h1 class="text-white">404</h1>
            <p class="text-white">Không tìm thấy trang</p>
            <router-link :to="{ name: 'HomePage' }" class="btn btn-transparent border-white text-white">Trở về trang
                chủ</router-link>
        </div>
    </BackgroundComponent>
</template>
<script>
import BackgroundComponent from '../components/Background.vue';
import HeaderComponent from '../components/Header.vue';

export default {
    name: 'NotFound',
    components: {
        BackgroundComponent,
        HeaderComponent
    }
}
</script>
