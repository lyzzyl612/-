import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'
import index from '@/views/index'
import contact from '@/views/contactUs'
import LegalNotice from '@/views/LegalNotice'
import OfflineTryon from '@/views/OfflineTryon'
import fashionShow from '@/views/fashionShow'
import brandStory from '@/views/brandStory'
import checkoutOn from '@/views/checkoutOn'
import checkoutOff from '@/views/checkoutOff'
import online from '@/components/checkout/online'
import goodsList from '@/views/goodsList'
import Personal  from "@/views/pagePpersonal.vue"
import login  from "@/views/log_reg.vue"
import aboutus  from "@/views/aboutus.vue"



import Order  from "@/components/personalPage/myOrder.vue"
import Security  from "@/components/personalPage/Security.vue"
import newLoginPwd  from "@/components/personalPage/newLoginPwd.vue"
import newPayPwd  from "@/components/personalPage/newPayPwd.vue"
import phoneBind  from "@/components/personalPage/phoneBind.vue"
import validEmail  from "@/components/personalPage/validEmail.vue"
import LpwdChangeSucceed  from "@/components/personalPage/LpwdChangeSucceed.vue"
import PpwdChangeSucceed  from "@/components/personalPage/PpwdChangeSucceed.vue"
import phoneBindSucceed  from "@/components/personalPage/phoneBindSucceed.vue"
import emailValidSucceed  from "@/components/personalPage/emaiValidSucceed.vue"
import pagePersonalInformation from '@/components/personalPage/pagePersonalInformation'
import afterSales from '@/components/personalPage/afterSales'
import orderLIstall from '@/components/personalPage/orderLIstall'

import pageMyCollect from '@/components/personalPage/pageMyCollect'
import pageMyAddress from '@/components/personalPage/pageMyAddress'
import pageMyReview from '@/components/personalPage/pageMyReview'




Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:"/Personal"
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: '/',
      //redirect:'/index',
      component: home,
      children:[
        {
          path: 'index',  //首页
          name: 'index',
          component: index
        },
        {
          path: 'contact',  //联系我们
          name: 'contact',
          component: contact
        },
        {
          path: 'aboutus',  //关于我们
          name: 'aboutus',
          component: aboutus
        },

        {
          path: 'LegalNotice',  //法律声明
          name: 'LegalNotice',
          component: LegalNotice
        },
        {
          path: 'OfflineTryon',  //线下试戴说明
          name: 'OfflineTryon',
          component: OfflineTryon
        },
        /*{
         path: 'sunMam',  //太阳镜男士
         name: 'sunMam',
         component: sunMam
         },
         {
         path: 'sunWomam',  //太阳镜女士
         name: 'sunWomam',
         component: sunWomam
         },*/
        {
          path: 'goodsList',  //太阳镜所有
          name: 'goodsList',
          component: goodsList
        },
        {
          path: 'fashionShow',  //潮流街拍
          name: 'fashionShow',
          component: fashionShow
        },
        {
          path: 'brandStory',  //品牌故事
          name: 'brandStory',
          component: brandStory
        },
        {
          path: 'checkoutOn',  //线上支付页面
          name: 'checkoutOn',
          component: checkoutOn
        },
        {
          path: 'checkoutOff',  //线下支付页面
          name: 'checkoutOff',
          component: checkoutOff
        },
        //个人中心
        {
          path: 'Personal',
          name: 'Personal',
          component: Personal,
          children:[
            {
              path: 'Personal',
              name: 'Order',
              //alias:'/Personal/Order',
              component: Order
            },
            {
              path: 'Order',
              name: 'Order',
              //alias:'/Personal/Order',
              component: Order,
            },

            {
              path: 'Security',
              name: 'Security',
              component: Security
            },
            {
              path: 'newLoginPwd',
              name: 'newLoginPwd',
              component: newLoginPwd
            },
            {
              path: 'newPayPwd',
              name: 'newPayPwd',
              component: newPayPwd
            },
            {
              path: 'phoneBind',
              name: 'phoneBind',
              component: phoneBind
            },
            {
              path: 'validEmail',
              name: 'validEmail',
              component: validEmail
            } ,
            {
              path: 'LpwdChangeSucceed',
              name: 'LpwdChangeSucceed',
              component: LpwdChangeSucceed
            },
            {
              path: 'PpwdChangeSucceed',
              name: 'PpwdChangeSucceed',
              component: PpwdChangeSucceed
            },
            {
              path: 'phoneBindSucceed',
              name: 'phoneBindSucceed',
              component: phoneBindSucceed
            },
            {
              path:'pageMyCollect',
              name:'pageMyCollect',
              component:pageMyCollect
            },
            {
              path:'pageMyAddress',
              name:'pageMyAddress',
              component:pageMyAddress
            },
            {
              path:'pageMyReview',
              name:'pageMyReview',
              component:pageMyReview
            },
            {
              path:'emailValidSucceed',
              name:'emailValidSucceed',
              component:emailValidSucceed
            },
            {
              path:'pagePersonalInformation',
              name: pagePersonalInformation,
              component: pagePersonalInformation
            },
            {
              path:'afterSales',
              name: 'afterSales',
              component: afterSales
            },
            {
              path:'orderLIstall',
              name: 'orderLIstall',
              component: orderLIstall
            }

          ]
        }
      ]
    }
  ]
})
