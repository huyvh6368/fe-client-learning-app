import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import Register from '../pages/Register'
import Level from '../pages/Level'
import Topic from '../pages/Topic/Topic'

// public router
const publicRouter = [
    { ten: "Trang Chủ", path: '/', component: HomePage },
    { ten: "Levels", path: '/level', component: Level },
    { ten: "Topics", path: '/level/topic/:id', component: Topic },

    { ten: "Login", path: '/login', component: LoginPage, layout: null },
    { ten: "Register", path: '/register', component: Register, layout: null }
]
const privateRouter = [];
export { publicRouter, privateRouter }
