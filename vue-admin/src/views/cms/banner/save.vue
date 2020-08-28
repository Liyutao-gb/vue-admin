<template>
  <div class="app-container">
    添加图片
     <el-form label-width="120px">
      <el-form-item label="图片名称">
        <el-input v-model="Banner.title"/>
      </el-form-item>
      <el-form-item label="图片排序">
        <el-input-number v-model="Banner.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="图片链接地址">
        <el-input v-model="Banner.linkUrl"/>
      </el-form-item>

      <!--图片头像 -->
      <el-form-item label="背景图片">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="Banner.imageUrl"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">点击上传
          </el-button>

          <image-cropper
              v-show="imagecropperShow"
              :key="imagecropperKey"
              :width="1920"
              :height="460"
              :url="BASE_API+'/eduoss/fileoss'"
              field="file"
              @close="close"
              @crop-upload-success="cropSuccess"/>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import bannerApi from '@/api/edu/Banner'
//头像上传的两个组件
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      Banner:{
        title: '',
        linkUrl:'',
        sort:0
      },

      //上传弹框组件是否显示
      imagecropperShow:false,
      imagecropperKey:0,//上传组件key值
      BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  //多次跳转到同一个页面created()只会执行一次,点击update,再点save数据不会清空
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    //上传成功后调用的方法
    cropSuccess(data) {
      this.imagecropperShow=false
      //上传之后接口返回图片地址
      this.Banner.imageUrl = data.url
      this.imagecropperKey = this.imagecropperKey+1
    },
    close() { //关闭上传弹框
        this.imagecropperShow=false
        //上传组件初始化(否则不能二次更换头像)
        this.imagecropperKey = this.imagecropperKey+1
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getInfo(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.Banner = {}
      }
    },
    //根图片id查询的方法
    getInfo(id) {
      bannerApi.getBannerInfo(id)
        .then(response => {
          this.Banner = response.data.item
        })
    },
    saveOrUpdate() {
      if(!this.Banner.id) {
        this.saveBanner()
      } else {
        this.updateBanner()
      }
    },
    //修图片的方法
    updateBanner() {
      bannerApi.updateBannerInfo(this.Banner)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/banner/list'})
        })
    },
    //添图片的方法
    saveBanner() {
      bannerApi.addBanner(this.Banner)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/banner/list'})
        })
    }

  }
}
</script>
