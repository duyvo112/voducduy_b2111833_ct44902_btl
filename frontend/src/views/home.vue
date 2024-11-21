<template>
    <BackgroundComponent>
        <HeaderComponent />
        <div class="container z-1">
            <div class="container z-1">
                <header class="hero text-white text-center">
                    <div class="container p-3">
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner h-25">
                                <div class="carousel-item active">
                                    <img src="../assets/img/Blue Welcome to School Library Banner.png" class="w-100"
                                        style=" object-fit: contain; height: 500px;" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="../assets/img/Beige Green Illustration Happy Children's Day Banner.png"
                                        class="w-100" style=" object-fit: contain; height: 500px;" alt="...">
                                </div>

                            </div>
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </header>
            </div>
            <h1 class="text-white mb-4">Danh sách sách</h1>
            <div class="d-flex justify-content-between mb-4">
                <div>
                    <label for="sort-select" class="text-white me-2">Sắp xếp theo:</label>
                    <select id="sort-select" class="form-select" v-model="sortBy" @change="sortBooks">
                        <option value="TenSach">Tên sách</option>
                        <option value="TacGia">Tác giả</option>
                        <option value="NamXuatBan">Năm xuất bản</option>
                        <option value="DonGia">Đơn giá</option>
                    </select>
                </div>
                <div class="d-flex w-50 align-items-end">
                    <input type="text" class="form-control me-2 w-100" style="height: 40px;" v-model="searchTerm"
                        placeholder="Tìm kiếm sách...">
                    <button class="btn btn-transparent border-white text-white btn-borrow w-25" style="height: 40px;"
                        @click="searchBooks">Tìm
                        kiếm</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 mb-4" v-for="(book, index) in paginatedBooks" :key="book.id">
                    <div class="card bg-transparent text-white border-white h-100">
                        <router-link :to="`/book/${book._id}`" class="text-decoration-none text-white h-100">
                            <img :src="imgUrl(book.ImgUrl)" class="card-img-top h-img" alt="Book Cover">
                            <div class="card-body">
                                <h5 class="card-title overflow-hidden text-truncate-2">{{ book.TenSach }}</h5>
                                <div class="detail h-100">
                                    <p class="card-text">{{ book.TacGia }}</p>
                                    <p class="card-text text-white-50">{{ book.NamXuatBan }}</p>
                                    <p class="card-text text-end fs-5 text-danger fw-bold">{{
                                        book.DonGia.toLocaleString() }}
                                        VNĐ</p>
                                </div>
                            </div>
                        </router-link>
                        <div class="card-footer bg-transparent ">
                            <div class="d-flex justify-content-between">
                                <span class="mt-1">Số lượng: </span>
                                <input type="number" class="form-control w-25" v-model="soLuong[index]">
                                <button class="btn btn-transparent border-white text-white btn-borrow"
                                    @click="borrowBook(book, index)">
                                    Mượn sách
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation" class="d-flex justify-content-center mt-4">
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                    </li>
                    <li class="page-item" v-for="page in totalPages" :key="page"
                        :class="{ active: currentPage === page }">
                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        <FooterComponent />
    </BackgroundComponent>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import BackgroundComponent from '../components/Background.vue'
import apiServiceMuonSach from '../service/muonsach.service'
import FooterComponent from '../components/Footer.vue'
import { toast } from 'vue3-toastify'
export default {
    name: 'HomePage',
    components: {
        HeaderComponent,
        BackgroundComponent,
        FooterComponent
    },
    data() {
        return {
            books: [],
            soLuong: [],
            user: JSON.parse(sessionStorage.getItem('user')),
            currentPage: 1,
            perPage: 8,
            paginatedBooks: [],
            sortBy: 'TenSach',
            searchTerm: '',
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.books.length / this.perPage);
        },
    },
    methods: {
        borrowBook(book, index) {
            if (this.user) {
                const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                if (this.soLuong[index] <= 0) {
                    toast.error('Số lượng không hợp lệ');
                    return;
                }
                const existingBook = cart.find(item => item.TenSach === book.TenSach);
                console.log("existingBook", !!existingBook);
                console.log("book", book);
                if (existingBook) {
                    existingBook.SoLuong += this.soLuong[index];
                } else if (this.soLuong[index] <= 0 || book.SoQuyen < this.soLuong[index]) {
                    if (book.SoQuyen < this.soLuong[index]) {
                        toast.error(`Số lượng sách không đủ`);
                    } else {
                        toast.error('Số lượng không hợp lệ');
                    }
                } else {
                    toast.success(`Đã thêm ${book.TenSach} vào giỏ hàng`);
                    cart.push({ ...book, SoLuong: this.soLuong[index] });
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    console.log("cart", cart);

                }
                if (book.SoQuyen < existingBook.SoLuong) {
                    toast.error(`Số lượng sách không đủ`);
                    existingBook.SoLuong -= this.soLuong[index];
                    return;
                }
                sessionStorage.setItem('cart', JSON.stringify(cart));
                toast.success(`Đã thêm ${book.TenSach} vào giỏ hàng`);
            } else {
                toast.error('Vui lòng đăng nhập để mượn sách');
                this.$router.push({ name: 'LoginPage' });
            }
        },
        getAllSach() {
            apiServiceMuonSach.getAllSach().then(res => {
                this.books = res.data
                console.log(this.books)
                this.soLuong = Array(this.books.length).fill(1)
            })
        },
        imgUrl(imgUrl) {
            return "http://localhost:3000" + imgUrl
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.paginateBooks();
            }
        },
        paginateBooks() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            this.paginatedBooks = this.searchTerm.trim() === '' ? this.books.slice(startIndex, endIndex) : this.paginatedBooks.slice(startIndex, endIndex);
        },
        sortBooks() {
            this.books.sort((a, b) => {
                if (a[this.sortBy] < b[this.sortBy]) return -1;
                if (a[this.sortBy] > b[this.sortBy]) return 1;
                return 0;
            });
            this.paginateBooks();
        },
        searchBooks() {
            if (this.searchTerm.trim() === '') {
                this.paginateBooks();
            } else {
                const searchTerm = this.searchTerm.toLowerCase();
                this.paginatedBooks = this.books.filter(book =>
                    book.TenSach.toLowerCase().includes(searchTerm) ||
                    book.TacGia.toLowerCase().includes(searchTerm)
                );
                if (this.paginatedBooks.length === 0) {
                    toast.error('Không tìm thấy sách');
                }
            }
        },
    },
    watch: {
        books() {
            this.currentPage = 1;
            this.paginateBooks();
        },
    },
    created() {
        this.getAllSach()
    }
}
</script>
<style scoped>
.bg-transparent {
    background-color: rgba(0, 0, 0, 0.5) !important;
}

.btn-borrow:hover {
    background-color: white;
    color: black !important;
}

.h-img {
    height: 300px;
    object-fit: cover;
}

.text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>