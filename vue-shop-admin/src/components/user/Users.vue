<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="10">
        <el-col :span="7">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userlist" style="width: 100%" border="">
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="rolename" label="角色"> </el-table-column>
        <el-table-column prop="rolename" label="状态"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取用户列表请求的参数
      queryInfo: {
        query: '',
        page: 1,
        pagesize: 2,
      },
      userlist: [
        {
          username: '许水水',
          email: 'lalalal@163.com',
          mobile: 12345679,
          rolename: '超高级管理员',
        },
        {
          username: '小乖',
          email: 'lalalal@163.com',
          mobile: 12345679,
          rolename: '超高级管理员',
        },
      ],
      total: 0,
    }
  },
  created() {
    //接口写完之后取消注释
    // this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/users', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200)
        return this.$message.console.error('获取用户列表失败')
      this.userlist = res.data.users
      this.total = res.data.tatal
      console.log(res)
    },
  },
}
</script>

<style lang="less" scope>
</style>
