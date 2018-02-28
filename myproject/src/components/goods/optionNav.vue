<template>
  <div id="optionNav">

    <!--男女-->
    <el-select v-model="value1" name="sex" id="sex" class="isOption" placeholder="性别">
      <el-option v-for="item in sex"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <!--框架类型-->
    <el-select v-model="value2" name="frame" id="frame" class="isOption" placeholder="框架类型">
      <el-option v-for="item in frame"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <!--材质-->
    <el-select v-model="value3" name="material" id="material" class="isOption" placeholder="材质">
      <el-option v-for="item in material"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <!--颜色-->
    <el-select v-model="value4" name="color" id="color" class="isOption" placeholder="颜色">
      <el-option v-for="item in color"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <!--品牌-->
    <el-select v-model="value5" name="brand" id="brand" class="isOption" placeholder="品牌">
      <el-option v-for="item in brand"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <!--价格-->
    <el-select v-model="value6" name="price" id="price" class="isOption" placeholder="价格">
      <el-option v-for="item in price"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <!--是否支持线下试戴-->
    <el-select v-model="value7" name="offline_try" id="offline_try" class="isOption" placeholder="是否支持线下试戴">
      <el-option v-for="item in offline_try"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

  </div>
</template>


<script type="es6">
  export default {
    data() {
      return {
//          性别
        sex: [
          {
            value: 'male',
            label: '男士'
          },
          {
            value: 'female',
            label: '女士'
          }
        ],
//        框架
        frame: [
          {
            value: 'fullFrame',
            label: '全框'
          },
          {
            value: 'halfRimless',
            label: '半框'
          },
        ],
//        材料
        material: [{
            value: 'slab',
            label: '板材'
          },
          {
            value: 'metal',
            label: '金属'
          },
          {
            value: 'pc',
            label: 'PC'
          },
          {
            value: 'tr',
            label: 'TR'
          },
        ],
//        颜色
        color:[
          {
            value: 'black',
            label: '黑'
          },
          {
            value: 'white',
            label: '白'
          },
          {
            value: 'blue',
            label: '蓝'
          },
          {
            value: 'red',
            label: '红'
          },
          {
            value: 'yellow',
            label: '黄'
          },
          {
            value: 'green',
            label: '绿'
          },
        ],
//          品牌
        brand:[
          {
            value: 'prsr',
            label: 'prsr'
          },
          {
            value: 'gucci',
            label: 'Gucci'
          },
          {
            value: 'nikon',
            label: 'Nikon'
          },
          {
            value: 'bolon',
            label: 'Bolon'
          },
          {
            value: 'loho',
            label: 'Loho'
          },
          {
            value: 'essilor',
            label: 'Essilor'
          },
        ],
//          价格
        price:[
          {
            value: '100-200',
            label: '100到200'
          },
          {
            value: '200-400',
            label: '200到400'
          },
          {
            value: '400-600',
            label: '400到600'
          },
          {
            value: '600-800',
            label: '600到800'
          },
          {
            value: '800',
            label: '800以上'
          },
        ],
//          是否支持线下试戴
        offline_try:[
          {
            value: '1',
            label: '支持'
          },
          {
            value: '0',
            label: '不支持'
          },
        ],
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
      }
    }
  }
</script>


<style lang="less">
  @import '../../assets/css/common.less';

  /*公共样式*/
  html,body{
    margin:0;
    padding:0;
    font-size:@mainfontsize;
    color:@fontblack;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
  }
  /*选项导航条*/
  #optionNav{
    width: 100%;
    height: 50px;
    background-color: @bggrey;
    text-align: center;
  }
  /*各个选项公共样式*/
  .isOption{
    width: 12%;
    line-height: 50px;
    height: 20px;
  }
</style>
