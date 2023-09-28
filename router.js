import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/components/LoginPage.vue";
import About from "@/components/About.vue"
import TicketList from "@/components/TicketList.vue";
import Main from "@/components/Main.vue";

const routes = [
    { path: '/login', component: LoginPage, name: 'login' },
    { path: '/about', component: About, name: 'about' },
    { path: '/',
        component: Main,
        name: 'main',
        children: [
            { path: '/', component: TicketList, name: 'tickets', props: true },
        ]}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
