import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'
import Home from '@/view/home/Home'                           //主页
import MessageCenter from '@/view/message/MessageCenter'      //消息中心
import Publish from '@/view/publish/Publish'                  //发布
import Publishvideo from '@/view/publish/children/PublishVideo'
import PublishProduct from '@/view/publish/children/PublishProduct'
import PublishCircle from '@/view/publish/children/PublishCircle'
import PublishCircleArticle from '@/view/publish/children/children/PublishCircleArticle'
import PublishCirclePic from '@/view/publish/children/children/PublishCirclePic'
import PublishCircleVideo from '@/view/publish/children/children/PublishCircleVideo'
import PosterManage from '@/view/content/PosterManage'        //内容管理
import VideoManage from '@/view/content/VideoManage'
import CircleManage from '@/view/content/CircleManage'
import ProductManage from '@/view/product/ProductManage'      //产品管理

import Data from '@/view/data/Data'                           //数据统计
import DataProfiling from '@/view/data/children/DataProfiling'

import DataPoster from '@/view/data/children/DataPoster'
import DataPosterSingle from '@/view/data/children/posterchildren/DataPosterSingle'
import DataPosterWhole from '@/view/data/children/posterchildren/DataPosterWhole'

import DataVideo from '@/view/data/children/Datavideo'
import DataVideoWhole from '@/view/data/children/videochildren/DataVideoWhole'
import DataVideoSingle from '@/view/data/children/videochildren/DataVideoSingle'

import DataProduct from '@/view/data/children/DataProduct'
import DataProductWhole from '@/view/data/children/productchildren/DataProductWhole'
import DataProductSingle from '@/view/data/children/productchildren/DataProductSingle'
import Single from '@/view/data/children/productchildren/children/Single'

import DataCircle from '@/view/data/children/DataCircle'

import LeaveWordManage from '@/view/deal/LeaveWordManage'      //内容管理
import AnswerManage from '@/view/deal/AnswerManage'
import SeekManage from '@/view/deal/SeekManage'
import ServeManage from '@/view/deal/ServeManage'

import Purse from '@/view/purse/Purse'                          //钱包
import PurseBody from '@/view/purse/children/PurseBody'
import PursePoster from '@/view/purse/children/children/PursePoster'
import PurseSeek from '@/view/purse/children/children/PurseSeek'

import Account from '@/view/account/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: HelloWorld,
      children: [
      	{path: '/',component: Home},//主页
      	{path: '/messagecenter',component: MessageCenter},//消息中心页
      	{path: '/publish',component: Publish,
          children: [
            { path: '', component: Publishvideo},
            { path: 'product', component: PublishProduct},
            { path: 'circle', component: PublishCircle,
              children: [
                {path: '',component: PublishCircleArticle},
                {path: 'pic',component: PublishCirclePic},
                {path: 'video',component: PublishCircleVideo},
              ]
            },
          ]
        },
      	{path: '/posterManage',component: PosterManage},
      	{path: '/videoManage',component: VideoManage},
      	{path: '/circleManage',component: CircleManage},
      	{path: '/productManage',component: ProductManage},
      	{
      	  path: '/data',component: Data,
          children: [//数据统计的二级菜单
            {path: '/',component:DataProfiling },
            {path: 'poster',component:DataPoster,
              children: [//数据统计的三级菜单
                {path: '/',component:DataPosterWhole },
                {path: 'single',component:DataPosterSingle }
              ]
            },
            {
              path: 'video',component:DataVideo,
              children: [//数据统计的三级菜单
                {path: '/',component:DataVideoWhole },
                {path: 'single',component:DataVideoSingle }
              ]
            },
            {
              path: 'product',component:DataProduct,
              children: [//数据统计的三级菜单
                {path: '/',component:DataProductWhole },
                {path: 'single',component:DataProductSingle }
              ]
            },
            {path: 'circle',component:DataCircle},
          ]
        },
        {path: '/analyse',component:Single},
        {path: '/leaveWordManage',component: LeaveWordManage},
      	{path: '/answerManage',component: AnswerManage},
      	{path: '/seekManage',component: SeekManage},
      	{path: '/serveManage',component: ServeManage},
      	{path: '/purse',component: Purse,
          children: [//我的钱包二级菜单
            {path: '/',component: PurseBody},
            {path: 'purseposter',component: PursePoster},
            {path: '/purse/purseseek',component: PurseSeek},
          ]
        },
        { path: '/account',component: Account}
      ]
    }
  ]
})
