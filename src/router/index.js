import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue';
import Error404View from "../views/error/Error404View.vue";
import PasienListView from "../views/pasien/PasienListView.vue";
import PasienDetailView from "../views/pasien/PasienDetailView.vue";
import DokterListView from "../views/dokter/DokterListView.vue";
import DokterDetailView from "../views/dokter/DokterDetailView.vue";
import ResepsionisListView from "../views/resepsionis/ResepsionisListView.vue";
import ResepsionisDetailView from "../views/resepsionis/ResepsionisDetailView.vue";
import KetentuanView from "../views/KetentuanView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/pasien',
      name: 'pasien',
      component: PasienListView,
      meta: {
        title: 'Pasien list'
      }
    },
    {
      path: '/pasien/:id_pasien',
      name: 'pasien-detail',
      component: PasienDetailView,
      meta: {
        title: 'Pasien detail'
      }
    },
    {
      path: '/dokter',
      name: 'dokter',
      component: DokterListView,
      meta: {
        title: 'Dokter list'
      }
    },
    {
      path: '/dokter/:id_dokter',
      name: 'dokter-detail',
      component: DokterDetailView,
      meta: {
        title: 'Dokter detail'
      }
    },
    {
      path: '/resepsionis',
      name: 'resepsionis',
      component: ResepsionisListView,
      meta: {
        title: 'resepsionis list'
      }
    },
    {
      path: '/resepsionis/:id',
      name: 'resepsionis-detail',
      component: ResepsionisDetailView,
      meta: {
        title: 'resepsionis detail'
      }
    },
    {
      path: '/ketentuan',
      name: 'ketentuan',
      component: KetentuanView,
      meta: {
        title: 'ketentuan'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error404',
      component: Error404View,
      meta: {
        title: 'Error 404'
      }
    },
  ]
})

export default router
