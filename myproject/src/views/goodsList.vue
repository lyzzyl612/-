<template>
    <div>
      <div>
        <PopularScience :popularScienceObj="popularScienceObj[0]"></PopularScience>
      </div>
      <div>
        <optionNav></optionNav>
      </div>
      <div>
        <goodsModule></goodsModule>
      </div>
    </div>
</template>

<script type="es6">
  import PopularScience from '../components/goods/PopularScience'
  import optionNav from '../components/goods/optionNav.vue'
  import goodsModule from '../components/goods/goodsModule.vue'
    export default{
        name: '',
        data: function(){
          return {
            popularScienceObj:[
              {theme:'太阳镜',
                Des1:'太阳镜，也称遮阳镜，作遮阳之用。人在阳光下通常要靠调节瞳孔大小来调节光通量，当光线强度超过人眼调节能力，就会对人眼造成伤害。',
                Des2:'所以在户外活动场所，特别是在夏天，需要采用遮阳镜来遮挡阳光，以减轻眼睛调节造成的疲劳或强光刺激造成的伤害。',
                Des3:'当眼睛接收到过多光线时，它会自然地收缩虹膜。一旦虹膜收缩到极限状态时，接着人们就需要眯眼。如果光线仍然过多时，例如雪反射出来的太阳光，将会对视网膜产生损伤。优质太阳镜能滤去多达97%的入眼光线以避免伤害。',
                pImg:'/src/assets/images/goods/sunWoman.jpg'
              }
            ]
          }
        },
      components:{
        PopularScience:PopularScience,
        optionNav:optionNav,
        goodsModule:goodsModule
      }
    }

</script>

<style scoped lang="less">

</style>
