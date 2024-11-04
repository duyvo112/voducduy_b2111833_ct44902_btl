<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{ name: 'HomePage' }">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{ name: 'CartPage' }">Cart</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!isLoggedIn" class="nav-link text-white" :to="{ name: 'LoginPage' }">
                            Login</router-link>

                        <button v-else class="nav-link text-white" @click="logout">{{ user.Ten }} Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { toast } from 'vue3-toastify';
export default {
    name: 'HeaderComponent',
    data() {
        return {
            isLoggedIn: this.checkLoggedIn(),
            user: JSON.parse(sessionStorage.getItem('user'))
        }
    },
    methods: {
        checkLoggedIn() {
            return sessionStorage.getItem('user') ? true : false;
        },
        logout() {
            sessionStorage.clear();
            this.isLoggedIn = this.checkLoggedIn();
            toast.success('Đăng xuất thành công');
        }
    }
}
</script>