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
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
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
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
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
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed()"
    >
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 自定义校验规则
    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      //验证邮箱的正则
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机号
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
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
      addDialogVisible: false, //控制对话框的显示与隐藏
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      }, //添加用户表单的数据对象
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名。',
            trggier: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3-10字符之间。',
            trggier: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码。',
            trggier: 'blur',
          },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6-15字符之间。',
            trggier: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱。',
            trggier: 'blur',
          },
          {
            validator: checkEmail,
            trggier: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码。',
            trggier: 'blur',
          },
          {
            validator: checkMobile,
            trggier: 'blur',
          },
        ],
      }, //添加用户表单的验证规则对象
      editFormRules: {
        email: [
          {
            required: true,
            message: '请输入邮箱。',
            trggier: 'blur',
          },
          {
            validator: checkEmail,
            trggier: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码。',
            trggier: 'blur',
          },
          {
            validator: checkMobile,
            trggier: 'blur',
          },
        ],
      }, //修改用户表单校验规则
      editDialogVisible: false, //修改用户对话框的显示与隐藏
      editForm: {}, //根据id查询到的用户信息
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
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid) // true or false
        if (!valid) return // 如果校验不通过
        // 校验通过则发起添加用户请求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功')
        this.addDialogVisible = false //隐藏添加用户的对话框
        this.getUserList() //重新获取用户列表数据
      })
    },
    async showEditDialog(user) {
      //展示编辑用户的对话框
      // console.log(id)

      // 正常来讲应该是通过id发请求查询 此处之间用传入的scope.row模拟
      console.log(user)
      this.editForm = user

      // const {data:res} = await this.$http.get('/users/'+id)
      // if(res.meta.status !== 200 ) return this.$message.error('查询用户信息失败')// 请求失败
      // this.editForm = res.data
      // 接口完成后取消注释
      this.editDialogVisible = true
    },
    //根据id删除删除用户
    async removeUserById(id) {
      console.log(id)
      //弹框询问是否删除数据
      const confirmResult = await this.$confirm(
        '是否要真的删除这样用户呢？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err) //点取消会有错误 因此要捕获然后直接reurn出去
      //如果用户确认删除则返回字符串confirm 取消返回字符串cancel
      // console.log(confirmResult)
      //通过判断返回字符串来确认用户点击的是哪个按钮
      if (confirmResult != 'confirm') {
        return this.$message.info('已取消删除用户操作')
      }
      // 发起删除用户请求
      // 后端接口写完后取消注释
      // const { data: res } = await this.$http.delete('/users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.err('删除用户失败')
      // }
      this.$message.success('删除用户成功：)')
      console.log('已经删除用户')
      this.getUserList() // 重新获取用户列表
    },
  },
}
</script>

<style lang="less" scope>
</style>
