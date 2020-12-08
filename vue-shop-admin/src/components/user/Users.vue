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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="getUserList()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userlist" style="width: 100%" border="">
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="rolename" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
          <!-- 添加了slot-scope属性就能通过scope.row获取当前行的数据 -->
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="50%"
     >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取用户列表请求的参数
      queryInfo: {
        query: '',
        //当前页数
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [
        {
          username: '许水水',
          id: 1,
          email: 'lalalal@163.com',
          mobile: 12345679,
          rolename: '超高级管理员',
          mg_state: true,
        },
        {
          username: '小乖',
          id: 2,
          email: 'lalalal@163.com',
          mobile: 12345679,
          rolename: '超高级管理员',
          mg_state: false,
        },
      ],
      total: 2,
      addDialogVisible: false,//控制对话框的显示与隐藏
    }
  },
  created() {
    //接口写完之后取消注释
    // this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/system/users.do', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200)
        return this.$message.console.error('获取用户列表失败')
      this.userlist = res.data.users
      this.total = res.data.tatal
      console.log(res)
    },
    handleSizeChange(currentSize) {
      //每页显示的条数的监听事件
      console.log(`每页 ${currentSize} 条`)
      //拿到每页显示的条数之后要在保存到data相应的位置中
      this.queryInfo.pagesize = currentSize
      //重新发起请求获取数据
      // this.getUserList()
    },
    handleCurrentChange(currentPage) {
      //监听当前页码值
      console.log(`当前页: ${currentPage}`)
      this.queryInfo.pagenum = currentPage
      // this.getUserList()
    },
    //监听状态开关的改变
    async userStateChanged(userInfo) {
      //发起put请求修改用户状态
      const res = await this.$http.put(
        `/system/users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败:(')
      }
      this.$message.success('更新用户状态成功:)')
    },
  },
}
</script>

<style lang="less" scope>
</style>
