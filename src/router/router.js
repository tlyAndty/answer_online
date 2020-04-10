import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main'
import login from '../components/login'
import loginSuccess from '../components/loginSuccess'
import register from '../components/register'
import userGuide from "../components/user/userGuide";
import questionListOfUser from "../components/user/questionListOfUser";
import blockedQuestionListOfUser from "../components/user/blockedQuestionListOfUser";
import answerList from "../components/user/answerList";
import blockedAnswerList from "../components/user/blockedAnswerList";
import commentList from "../components/user/commentList";
import blockedCommentList from "../components/user/blockedCommentList";
import personalInformationOfUser from "../components/user/personalInformationOfUser";
import adminGuide from "../components/admin/adminGuide";
import questionListOfAdmin from "../components/admin/questionListOfAdmin";
import blockedQuestionListOfAdmin from "../components/admin/blockedQuestionListOfAdmin";
import userList from "../components/admin/userList";
import blacklistedUserList from "../components/admin/blacklistedUserList";
import registrationAudit from "../components/admin/registrationAudit";
import personalInformationOfAdmin from "../components/admin/personalInformationOfAdmin";

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name:'main',
      component: main
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/loginSuccess',
      name: 'loginSuccess',
      component: loginSuccess
    },
    {
      path: '/register',
      name:'register',
      component: register
    },
    {
      path: '/userGuide',
      name:'userGuide',
      component: userGuide,
      //redirect:'/main',
      children:[
        {
          path:'/questionListOfUser',
          name:'questionListOfUser',
          component:questionListOfUser
        },
        {
          path:'/blockedQuestionListOfUser',
          name:'blockedQuestionListOfUser',
          component:blockedQuestionListOfUser
        },
        {
          path:'/answerList',
          name:'answerList',
          component:answerList
        },
        {
          path:'/blockedAnswerList',
          name:'blockedAnswerList',
          component:blockedAnswerList
        },
        {
          path:'/commentList',
          name:'commentList',
          component:commentList
        },
        {
          path:'/blockedCommentList',
          name:'blockedCommentList',
          component:blockedCommentList
        },
        {
          path:'/personalInformationOfUser',
          name:'personalInformationOfUser',
          component:personalInformationOfUser
        }
      ]
    },
    {
      path: '/adminGuide',
      name: 'adminGuide',
      component: adminGuide,
      children:[
        {
          path:'/questionListOfAdmin',
          name:'questionListOfAdmin',
          component:questionListOfAdmin
        },
        {
          path:'/blockedQuestionListOfAdmin',
          name:'blockedQuestionListOfAdmin',
          component:blockedQuestionListOfAdmin
        },
        {
          path:'/userList',
          name:'userList',
          component:userList
        },
        {
          path:'/blacklistedUserList',
          name:'blacklistedUserList',
          component:blacklistedUserList
        },
        {
          path:'/registrationAudit',
          name:'registrationAudit',
          component:registrationAudit
        },
        {
          path:'/personalInformationOfAdmin',
          name:'personalInformationOfAdmin',
          component:personalInformationOfAdmin
        },
      ]
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
