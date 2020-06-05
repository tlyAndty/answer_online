import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main'
import userlogin from '../components/userlogin'
import adminlogin from '../components/adminlogin'
import register from '../components/register'
import userPage from "../components/userPage";
import reportPage from "../components/reportPage";
import questionPage from "../components/question/questionPage";
import newquestionPage from "../components/question/newquestionPage";
import userGuide from "../components/user/userGuide";
import questionListOfUser from "../components/user/questionListOfUser";
//import blockedQuestionListOfUser from "../components/user/blockedQuestionListOfUser";
import questionInfo from "../components/user/questionInfo";
import answerList from "../components/user/answerList";
import replyedAnswerList from "../components/user/replyedAnswerList";
import answerInfo from "../components/user/answerInfo";
//import blockedAnswerList from "../components/user/blockedAnswerList";
import commentList from "../components/user/commentList";
import replyedCommentList from "../components/user/replyedCommentList";
import commentInfo from "../components/user/commentInfo";
//import blockedCommentList from "../components/user/blockedCommentList";
import reportedQuestionList from "../components/user/reportedQuestionList";
//import reportedAnswerList from "../components/user/reportedAnswerList";
//import reportedCommentList from "../components/user/reportedCommentList";
import reportQuestionList from "../components/user/reportQuestionList";
//import reportAnswerList from "../components/user/reportAnswerList";
//import reportCommentList from "../components/user/reportCommentList";
//import processedReportQuestionList from "../components/user/processedReportQuestionList";
//import processedReportAnswerList from "../components/user/processedReportAnswerList";
//import processedReportCommentList from "../components/user/processedReportCommentList";
import personalInformationOfUser from "../components/user/personalInformationOfUser";
import collectionList from "../components/user/collectionList";
import adminGuide from "../components/admin/adminGuide";
import registerInfo from "../components/admin/registerInfo";
import questionListOfAdmin from "../components/admin/questionListOfAdmin";
import blockedQuestionListOfAdmin from "../components/admin/blockedQuestionListOfAdmin";
import userList from "../components/admin/userList";
import blacklistedUserList from "../components/admin/blacklistedUserList";
import registrationAudit from "../components/admin/registrationAudit";
import personalInformationOfAdmin from "../components/admin/personalInformationOfAdmin";
import answerListOfAdmin from "../components/admin/answerListOfAdmin";
import blockedAnswerListOfAdmin from "../components/admin/blockedAnswerListOfAdmin";
import commentListOfAdmin from "../components/admin/commentListOfAdmin";
import blockedCommentListOfAdmin from "../components/admin/blockedCommentListOfAdmin";
import reportUser from "../components/admin/reportUser";
import reportQuestion from "../components/admin/reportQuestion";
import reportAnswer from "../components/admin/reportAnswer";
import reportComment from "../components/admin/reportComment";
import processedReportQuestion from "../components/admin/processedReportQuestion";
import processedReportAnswer from "../components/admin/processedReportAnswer";
import processedReportComment from "../components/admin/processedReportComment";

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
        keepAlive:false,
        //keepAlive1:true
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
      path: '/reportPage',
      name: 'reportPage',
      component: reportPage,
      meta: {
        keepAlive:true
      }
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
        /*{
          path:'/blockedQuestionListOfUser',
          name:'blockedQuestionListOfUser',
          component:blockedQuestionListOfUser,
          meta:{
            keepAlive:true
          },
        },*/
        {
          path:'/questionInfo',
          name:'questionInfo',
          component:questionInfo,
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
          path:'/replyedAnswerList',
          name:'replyedAnswerList',
          component:replyedAnswerList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/answerInfo',
          name:'answerInfo',
          component:answerInfo,
          meta:{
            keepAlive:true
          },
        },
        /*{
          path:'/blockedAnswerList',
          name:'blockedAnswerList',
          component:blockedAnswerList,
          meta:{
            keepAlive:true
          },
        },*/
        {
          path:'/commentList',
          name:'commentList',
          component:commentList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/replyedCommentList',
          name:'replyedCommentList',
          component:replyedCommentList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/commentInfo',
          name:'commentInfo',
          component:commentInfo,
          meta:{
            keepAlive:true
          },
        },
        /*{
          path:'/blockedCommentList',
          name:'blockedCommentList',
          component:blockedCommentList,
          meta:{
            keepAlive:true
          },
        },*/
        {
          path:'/reportedQuestionList',
          name:'reportedQuestionList',
          component:reportedQuestionList,
          meta:{
            keepAlive:true
          },
        },
        /*{
          path:'/reportedAnswerList',
          name:'reportedAnswerList',
          component:reportedAnswerList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/reportedCommentList',
          name:'reportedCommentList',
          component:reportedCommentList,
          meta:{
            keepAlive:true
          },
        },*/
        {
          path:'/reportQuestionList',
          name:'reportQuestionList',
          component:reportQuestionList,
          meta:{
            keepAlive:true
          },
        },
        /*{
          path:'/reportAnswerList',
          name:'reportAnswerList',
          component:reportAnswerList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/reportCommentList',
          name:'reportCommentList',
          component:reportCommentList,
          meta:{
            keepAlive:true
          },
        },*/
        /*{
          path:'/processedReportQuestionList',
          name:'processedReportQuestionList',
          component:processedReportQuestionList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/processedReportAnswerList',
          name:'processedReportAnswerList',
          component:processedReportAnswerList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/processedReportCommentList',
          name:'processedReportCommentList',
          component:processedReportCommentList,
          meta:{
            keepAlive:true
          },
        },*/
        {
          path:'/collectionList',
          name:'collectionList',
          component:collectionList,
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
          path:'/answerListOfAdmin',
          name:'answerListOfAdmin',
          component:answerListOfAdmin,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/blockedAnswerListOfAdmin',
          name:'blockedAnswerListOfAdmin',
          component:blockedAnswerListOfAdmin,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/commentListOfAdmin',
          name:'commentListOfAdmin',
          component:commentListOfAdmin,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/blockedCommentListOfAdmin',
          name:'blockedCommentListOfAdmin',
          component:blockedCommentListOfAdmin,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/reportUser',
          name:'reportUser',
          component:reportUser,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/reportQuestion',
          name:'reportQuestion',
          component:reportQuestion,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/reportAnswer',
          name:'reportAnswer',
          component:reportAnswer,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/reportComment',
          name:'reportComment',
          component:reportComment,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/processedReportQuestion',
          name:'processedReportQuestion',
          component:processedReportQuestion,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/processedReportAnswer',
          name:'processedReportAnswer',
          component:processedReportAnswer,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'/processedReportComment',
          name:'processedReportComment',
          component:processedReportComment,
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
