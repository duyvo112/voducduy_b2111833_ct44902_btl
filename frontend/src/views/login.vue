<template>
    <BackgroundComponent>
        <HeaderComponent />
        <div class="container text-white w-25 mt-70 border border-white rounded-3 ">
            <h2 class="text-center mb-5">Login</h2>
            <form id="loginForm" @submit.prevent="login" method="POST">
                <div class="mb-3">
                    <input type="email" class="form-control" id="Email" placeholder="Email" v-model="form.Email"
                        required />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" id="Password" placeholder="Password"
                        v-model="form.Password" required />
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
            <div class="mt-3 text-center ">
                <small>Don't have an account?
                    <router-link :to="{ name: 'RegisterPage' }" class="text-white">Register here</router-link></small>
            </div>

        </div>
    </BackgroundComponent>
</template>
<script>
import { toast } from 'vue3-toastify';
import HeaderComponent from '../components/Header.vue'
import BackgroundComponent from '../components/Background.vue'
import apiServiceMuonSach from '../service/muonsach.service'
export default {
    name: 'LoginPage',
    components: {
        HeaderComponent,
        BackgroundComponent
    },
    data() {
        return {
            form: {
                Email: '',
                Password: ''
            }

        }
    },
    methods: {
        login() {
            apiServiceMuonSach
                .nhanVienLogin(this.form)
                .then(response => {
                    sessionStorage.setItem('user', JSON.stringify(response.data))
                    toast.success('Login successful');
                    this.$router.push({ name: 'DocGia' })
                })
                .catch(() => {
                    apiServiceMuonSach
                        .docGiaLogin(this.form)
                        .then(response => {
                            sessionStorage.setItem('user', JSON.stringify(response.data))
                            sessionStorage.setItem('cart', JSON.stringify([]))
                            toast.success('Login successful')
                            this.$router.push({ name: 'HomePage' })
                        })
                        .catch(error => {
                            toast.error('Login failed', error)
                        })
                })
        }
    }
}
</script>
<style scoped>
.mt-70 {
    margin-top: 70px;
}
</style>
