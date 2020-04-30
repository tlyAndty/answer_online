import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main'
import userlogin from '../components/userlogin'
import adminlogin from '../components/adminlogin'
import register from '../components/register'
import userPage from "../components/userPage";
import questionPage from "../components/question/questionPage";
import newquestionPage from "../components/question/newquestionPage";
import userGuide from "../components/user/userGuide";
import questionListOfUser from "../components/user/questionListOfUser";
import blockedQuestionListOfUser from "../components/user/blockedQuestionListOfUser";
import answerList from "../components/user/answerList";
import blockedAnswerList from "../components/user/blockedAnswerList";
import commentList from "../components/user/commentList";
import blockedCommentList from "../components/user/blockedCommentList";
import personalInformationOfUser from "../components/user/personalInformationOfUser";
import adminGuide from "../components/admin/adminGuide";
import registerInfo from "../components/admin/registerInfo";
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
      },
    },
    {
      path: '/userlogin',
      name: 'userlogin',
      component: userlogin,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: adminlogin,
      meta:{
        keepAlive:false
      }
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
      path: '/newquestionPage',
      name: 'newquestionPage',
      component: newquestionPage,
      meta: {
        keepAlive:true
      }
    },
    {
      path: '/questionPage',
      name:'questionPage',
      component: questionPage,
      meta:{
        keepAlive:true
      },
      children: [
        {
          path: ':ques_id',
          component: questionPage,
        }
      ]
    },
    {
      path: '/userPage',
      name:'userPage',
      component: userPage,
      meta:{
        keepAlive:true
      },
      children: [
        {
          path: ':user_id',
          component: userPage,
        }
      ]
    },
    {
      path: '/userGuide',
      name:'userGuide',
      component: userGuide,
      meta:{
        keepAlive:true
      },
      //redirect:'/'
      children:[
        {
          path: ':user_id',
          component: userGuide,
        },
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
          path: ':admin_id',
          component: adminGuide,
        },
        {
          path:'/registerInfo',
          name:'registerInfo',
          component:registerInfo,
          meta:{
            keepAlive:true
          },
        },
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
