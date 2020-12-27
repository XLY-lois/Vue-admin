<template>
  <div class="login_container">
    <el-container>
      <!-- header部分 -->
      <el-header class="login_header"> </el-header>
      <!-- main主体部分 -->
      <el-main>
                <div class="login_box">
          <div class="avatar_box">
            <!-- 头像 -->
            <img src="../assets/logo.png" alt="" />
          </div>
          <!-- 登录表单 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                prefix-icon="el-icon-lock"
                type="password"
              ></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="login()">登录</el-button>
              <el-button type="info" @click="resetLoinForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

      </el-main>
      <!-- footer部分 -->
      <el-footer class="login_footer"></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'lois0912',
        password: '123456',
      }, //登录表单的数据绑定对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '长度在 5 到 10 个字符',
            trigger: 'blur',
          },
        ],
        //验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      }, //表单的验证规则对象
    }
  },
  methods: {
    resetLoinForm() {
      //重置表单
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        //回调函数中的参数1是校验结果
        // console.log(valid)
        if (!valid) return //为false直接return不发起请求
        const res = await this.$http
          .post('/system/login.do', this.loginForm)
          .then(function (res) {
            return res
          })
        // .catch(function (error) {
        //   console.log(error);
        // });

        console.log(res)
        if (res.data.code !== 200) return this.$message.error('登录失败QAQ')
        this.$message.success('登录成功:)')

        window.sessionStorage.setItem('token', res.data.token) // 由于后端暂时没有给我token 先直接用data中的值代替token
        // window.sessionStorage.setItem("token", res.data); //18
        this.$router.push('/home') //登录后跳转到home
      })
    },
    // login() {
    //   this.$http
    //     .post("/system/login.do", {
    //       username: this.loginForm.username,
    //       password: this.loginForm.password,
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });

    //     //2

    // },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(224, 205, 207);
  height: 100%;
}
.el-main {
  overflow: hidden;
  height: 635px;
}
.el-header {
  padding: 0;
  margin: 0;
}
.login_header {
  width: 100%;
  height: 80px;
  background-color: rgb(185, 113, 143);
}
.login_footer {
  width: 100%;
  height: 80px;
  background-color: rgb(185, 113, 143);
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  left: 50%;
  top: 300px;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
