<template>
    <div class="container-fluid p-0 d-flex flex-column min-vh-100">
        <div class="header m-0 align-content-center h3" style="border-bottom: 1px solid #23282c">
            <h1>Quản Lý Thư Viện - Admin</h1>
        </div>
        <div class="row flex-grow-1">
            <nav class="col-md-2 p-0 sidebar text-white bg-secondary d-flex flex-column">
                <div class="position-sticky flex-grow-1 d-flex flex-column">
                    <ul class="nav flex-column flex-grow-1">
                        <li class="nav-item">
                            <router-link :to="{ name: 'DocGia' }" class="text-decoration-none"><a
                                    class="nav-link btn btn-primary text-white"><font-awesome-icon
                                        icon="fa-solid fa-user" /> Đọc
                                    giả</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'SachAdmin' }" class="text-decoration-none"><a
                                    class="nav-link btn btn-primary text-white"><font-awesome-icon
                                        icon="fa-solid fa-clipboard-list" />
                                    Sách</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'NhaXuatBan' }" class="text-decoration-none"><a
                                    class="nav-link btn btn-primary text-white"><font-awesome-icon
                                        icon="fa-solid fa-list" /> Nhà Xuất Bản</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'NhanVien' }" class="text-decoration-none"><a
                                    class="nav-link btn btn-primary text-white"><font-awesome-icon
                                        icon="fa-solid fa-list" /> Nhân
                                    Viên</a></router-link>
                        </li>
                        <div class="border-top">
                            <li class="nav-item">
                                <div @click="logout" class="text-decoration-none"><a
                                        class="nav-link btn btn-primary text-white"><font-awesome-icon
                                            class="fa-flip-horizontal" icon="fa-solid fa-right-from-bracket" />
                                        Logout</a></div>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
            <div class="col-md-10 p-0">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavigationSide",
    methods: {
        logout() {
            sessionStorage.removeItem('user')
            this.$router.push({ name: 'LoginPage' })
        }
    }
};
</script>

<style scoped>
.sidebar {
    background-color: #3a4149;
}
</style>