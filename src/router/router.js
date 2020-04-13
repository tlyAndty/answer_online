import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main'
import login from '../components/login'
import loginSuccess from '../components/loginSuccess'
import register from '../components/register'
import question from "../components/question";
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
      component: main,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/loginSuccess',
      name: 'loginSuccess',
      component: loginSuccess
    },
    {
      path: '/register',
      name:'register',
      component: register,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/question',
      name:'question',
      component: question,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/userGuide',
      name:'userGuide',
      component: userGuide,
      meta:{
        keepAlive:true
      },
      //redirect:'/main',
      children:[
        {
          path:'/questionListOfUser',
          name:'questionListOfUser',
          component:questionListOfUser,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/blockedQuestionListOfUser',
          name:'blockedQuestionListOfUser',
          component:blockedQuestionListOfUser,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/answerList',
          name:'answerList',
          component:answerList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/blockedAnswerList',
          name:'blockedAnswerList',
          component:blockedAnswerList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/commentList',
          name:'commentList',
          component:commentList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/blockedCommentList',
          name:'blockedCommentList',
          component:blockedCommentList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/personalInformationOfUser',
          name:'personalInformationOfUser',
          component:personalInformationOfUser,
          meta:{
            keepAlive:true
          },
        }
      ]
    },
    {
      path: '/adminGuide',
      name: 'adminGuide',
      component: adminGuide,
      meta:{
        keepAlive:true
      },
      children:[
        {
          path:'/questionListOfAdmin',
          name:'questionListOfAdmin',
          component:questionListOfAdmin,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/blockedQuestionListOfAdmin',
          name:'blockedQuestionListOfAdmin',
          component:blockedQuestionListOfAdmin,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/userList',
          name:'userList',
          component:userList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/blacklistedUserList',
          name:'blacklistedUserList',
          component:blacklistedUserList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/registrationAudit',
          name:'registrationAudit',
          component:registrationAudit,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/personalInformationOfAdmin',
          name:'personalInformationOfAdmin',
          component:personalInformationOfAdmin,
          meta:{
            keepAlive:true
          },
        },
      ]
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
