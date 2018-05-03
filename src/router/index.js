import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'

//登录
import LogIn from '@/view/login/LogIn'
import PaySuccess from '@/view/common/PaySuccess'
//主页
import Home from '@/view/home/Home'
//消息中心
import MessageCenter from '@/view/message/MessageCenter'
import CenterDiscuss from '@/view/message/children/CenterDiscuss'
import CenterPraise from '@/view/message/children/CenterPraise'
import SystemMsg from '@/view/message/children/SystemMsg'
//发布
import Publish from '@/view/publish/Publish'
import Publishvideo from '@/view/publish/children/PublishVideo'
import PublishProduct from '@/view/publish/children/PublishProduct'
import PublishCircle from '@/view/publish/children/PublishCircle'
import PublishCircleArticle from '@/view/publish/children/children/PublishCircleArticle'
import PublishCirclePic from '@/view/publish/children/children/PublishCirclePic'
import PublishCircleVideo from '@/view/publish/children/children/PublishCircleVideo'
//内容管理
import PosterManage from '@/view/content/PosterManage'
import PosterManageList from '@/view/content/posterchildren/PosterManageList'
import PosterManageEdit from '@/view/content/posterchildren/PosterManageEdit'
import VideoManage from '@/view/content/VideoManage'
import VideoManageList from '@/view/content/videochildren/VideoManageList'
import VideoManageEdit from '@/view/content/videochildren/VideoManageEdit'
import CircleManage from '@/view/content/CircleManage'
import CircleManageList from '@/view/content/circlechildren/CircleManageList'
import CircleManageVideo from '@/view/content/circlechildren/CircleVideo'
import CircleManagePic from '@/view/content/circlechildren/CirclePic'
import CircleManageActicle from '@/view/content/circlechildren/CircleArticle'
//产品管理
import ProductManage from '@/view/product/ProductManage'
import ProductManageList from '@/view/product/children/ProductManageList'
import ProductManageEdit from '@/view/product/children/ProductManageEdit'
//商家管理
import MerchantInfo from '@/view/merchant/MerchantInfo'
import HomePageEdit from '@/view/merchant/HomePageEdit'
import Trends from '@/view/merchant/Trends'
import TrendsBody from '@/view/merchant/children/TrendsBody'
import TrendsPublishNew from '@/view/merchant/children/TrendsPublishNew'          //发布上新
import TrendUpdateNew from '@/view/merchant/children/TrendUpdateNew'              //编辑上新
import TrendsPublishArticle from '@/view/merchant/children/TrendsPublishArticle'
//数据统计
import Data from '@/view/data/Data'
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
import DataCircleWhole from '@/view/data/children/circlechildren/DataCircleWhole'
import DataCircleSingle from '@/view/data/children/circlechildren/DataCircleSingle'
//交易管理
import LeaveWordManage from '@/view/deal/LeaveWordManage'
import AnswerManage from '@/view/deal/AnswerManage'
import SeekManage from '@/view/deal/SeekManage'
import ServeManage from '@/view/deal/ServeManage'
//钱包
import Purse from '@/view/purse/Purse'
import PurseBody from '@/view/purse/children/PurseBody'
import Recharge from '@/view/purse/children/Recharge'
import PursePoster from '@/view/purse/children/children/PursePoster'
import PurseSeek from '@/view/purse/children/children/PurseSeek'

import Account from '@/view/account/Account'

Vue.use(Router)

export default new Router({
  // 'mode': 'history',
  routes: [
    { path: '/login', component: LogIn},
    { path: '/paysuccess', component: PaySuccess},
    {
      path: '/',
      // name: 'HelloWorld',
      component: HelloWorld,
      children: [
      	{path: '/',component: Home},//主页
      	{path: '/messagecenter',component: MessageCenter},//消息中心页
      	{path: '/centerpraise',component: CenterPraise},//消息中心赞详情页
      	{path: '/centerdiscuss',component: CenterDiscuss},//消息中心评论页
      	{path: '/systemmsg',component: SystemMsg},//消息中心系统消息
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
      	{path: '/posterManage',component: PosterManage,
          children: [
            { path: '', component: PosterManageList},
            { path: 'edit', component: PosterManageEdit}
          ]
        },
      	{path: '/videoManage',component: VideoManage,
          children: [
            { path: '', component: VideoManageList},
            { path: 'edit', component: VideoManageEdit}
          ]
        },
      	{path: '/circleManage',component: CircleManage,
          children: [
            { path: '', component: CircleManageList},
            { path: 'video', component: CircleManageVideo},
            { path: 'image', component: CircleManagePic},
            { path: 'article', component: CircleManageActicle},
          ]
        },
      	{path: '/productManage',component: ProductManage,
          children: [
            {path: '', component: ProductManageList},
            {path: 'edit',component: ProductManageEdit}
          ]
        },
        {"path": '/merchantinfo', component: MerchantInfo},
        {"path": '/homepageedit', component: HomePageEdit},
        {"path": '/trends', component: Trends,
          children: [
            { path: '', component: TrendsBody},
            { path: 'publishnew', component: TrendsPublishNew},
            { path: 'updatenew', component: TrendUpdateNew},
            { path: 'publisharticle', component: TrendsPublishArticle},
          ]
        },
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
            {path: 'circle',component:DataCircle,
              children: [
                { path: '', component: DataCircleWhole},
                { path: 'single', component: DataCircleSingle}
              ]
            },
          ]
        },
        {path: '/analyse',component:Single},                              //单个产品的数据分析
        {path: '/leaveWordManage',component: LeaveWordManage},
      	{path: '/answerManage',component: AnswerManage},
      	{path: '/seekManage',component: SeekManage},
      	{path: '/serveManage',component: ServeManage},
      	{path: '/purse',component: Purse,
          children: [//我的钱包二级菜单
            {path: '/',component: PurseBody},
            {path: 'recharge',component: Recharge},
            {path: 'purseposter',component: PursePoster},
            {path: '/purse/purseseek',component: PurseSeek},
          ]
        },
        { path: '/account',component: Account}
      ]
    }
  ]
})
