import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import Register from '../pages/Register'
import Level from '../pages/Level'
import Topic from '../pages/Topic/Topic'
import Question from '../pages/Question'

import MyProfile from '../components/ViewProfile'
import Rankings from '../pages/Rankings'

import SoftwareManual from '../pages/HuongDan'
import RankPage from '../pages/Rank'
import RegistedLevel from '../pages/RegistedLevel'
import RegistedTopic from '../pages/RegistedTopic'
// public router
const publicRouter = [
    { ten: "Trang Chủ", path: '/', component: HomePage },
    { ten: "Levels", path: '/level', component: Level },
    { ten: "Topics", path: '/level/topic/:id', component: Topic },
    { ten: "Questions", path: '/level/topic/questions/:id', component: Question },
    { ten: "HuongDanSuDung", path: '/huong-dan', component: SoftwareManual },
    { ten: "RankInApp", path: '/rank-in-app', component: RankPage },
    { ten: "RegistedLevel", path: '/my_level', component: RegistedLevel },
    { ten: "RegistedTopic", path: '/my_topic', component: RegistedTopic },

    { ten: "Rank", path: '/rankings', component: Rankings },
    { ten: "profile", path: '/my_profile', component: MyProfile },
    { ten: "Login", path: '/login', component: LoginPage, layout: null },
    { ten: "Register", path: '/register', component: Register, layout: null }
]
const privateRouter = [];
export { publicRouter, privateRouter }
