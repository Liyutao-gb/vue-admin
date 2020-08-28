<template>
  <div class="app-container">
    banner列表

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="图片名称" width="160" />

      <el-table-column prop="linkUrl" label="链接地址" width="120" />      

      <el-table-column prop="sort" label="排序" width="85" />

      <el-table-column prop="gmtCreate" label="添加时间" width="180"/>

      <el-table-column prop="gmtModified" label="修改时间" width="180"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"/>
      <!-- v-on:current-change -->

  </div>
</template>
<script>
//引入调用teacher.js文件
import banner from '@/api/edu/banner'

export default {
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:6,//每页记录数
          total:0//总记录数
        }
    },
    created() {
        this.getList()
    },
    methods:{
        getList(page=1) {
            this.page = page
            banner.getPageBanner(this.page,this.limit)
                .then(response =>{
                  console.log(response.data.total)
                    this.list = response.data.items
                    this.total = response.data.total
                }) 
        },
        removeDataById(id) {
            this.$confirm('此操作将永久删除图片记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                banner.removeBanner(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                })
            })
        }
 
    }
}
</script>
