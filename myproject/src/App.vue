                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
<template>
  <div id="app">

    <!--<li><router-link to="/Personal">123</router-link></li>-->
    <router-view></router-view>
    <!--<login></login>-->
  </div>
</template>

<script>
//  import MyOrder from "./components/views/MyOrder.vue"
//  import myOrder  from "./components/personalPage/myOrder.vue"
//  import newLoginPwd  from "./components/personalPage/newLoginPwd.vue"
//  import LpwdChangeSucceed  from "./components/personalPage/LpwdChangeSucceed.vue"
//  import newPayPwd  from "./components/personalPage/newPayPwd.vue"
//  import phoneBind  from "./components/personalPage/phoneBind.vue"
//  import validEmail  from "./components/personalPage/validEmail.vue"
//  import personHome  from "./components/personHome/pagePpersonal.vue"
//  import step  from "./components/personal/orderListall_head.vue"
//  import emailChange  from "./components/personal/emailChange.vue"
//   import login  from "./components/view/log_reg"



  export default {
    name: 'app',
    data: function () {
      return {}
    },
    components: {
//      login:login
//      myOrder: myOrder,
//      newLoginPwd: newLoginPwd,
//      LpwdChangeSucceed: LpwdChangeSucceed,
//      newPayPwd: newPayPwd,
//      phoneBind: phoneBind,
//      validEmail: validEmail,
//      personHome: personHome,
//      step: step
//      emailChange: emailChange,
//      MyOrder:MyOrder
    }

  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;

  }
  a{
    text-decoration: none;
    color: #333333;
  }
  #app {
    color: #565656;
    letter-spacing: 0.1em;
  }
  .swiper-pagination-bullet{
    margin:0 24px !important;
    width: 3px;
    height: 19px;
    border-radius:0;
    vertical-align: middle;
    background-color: rgb(0, 0, 0);
  }
  .swiper-pagination-bullet-active {
    background-color: rgb(33, 33, 33);
    height: 32px;
  }
  .swiper-pagination{
    bottom: 100px !important;
  }

</style>
