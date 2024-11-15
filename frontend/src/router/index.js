import { createRouter, createWebHistory } from 'vue-router'
import { toast } from 'vue3-toastify'
const HomePage = () => import('../views/home.vue')
const BookDetail = () => import('../views/book-detail.vue')
const LoginPage = () => import('../views/login.vue')
const RegisterPage = () => import('../views/register.vue')
const CartPage = () => import('../views/cart.vue')
const DocGia = () => import('../views/admin/docgia.vue')
const NhanVien = () => import('../views/admin/nhanvien.vue')
const NhaXuatBan = () => import('../views/admin/nhaxuatban.vue')
const SachAdmin = () => import('../views/admin/sach.vue')
const NotFound = () => import('../views/404.vue')
const ContactPage = () => import('../views/contact.vue')
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage,
  },
  {
    path: '/book/:id',
    name: 'BookDetail',
    component: BookDetail,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/admin',
    name: 'admin',
    children: [
      {
        path: 'docgia',
        name: 'DocGia',
        component: DocGia,
      },
      {
        path: 'nhanvien',
        name: 'NhanVien',
        component: NhanVien,
      },
      {
        path: 'nhaxuatban',
        name: 'NhaXuatBan',
        component: NhaXuatBan,
      },
      {
        path: 'sach',
        name: 'SachAdmin',
        component: SachAdmin,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  if (to.name === 'CartPage') {
    if (user) {
      next()
    } else {
      toast.error('Vui lòng đăng nhập để mượn sách')
      next({ name: 'LoginPage' })
    }
  } else if (to.path.startsWith('/admin') && user.ChucVu === 'admin') {
    next()
  } else {
    next()
  }
})

export default router
