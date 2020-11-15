<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="..\assets\logo.png" alt="" width="50px" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout()">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单
      menuList: [
        {
          id: 101,
          authName: '用户管理',
          path: null,
          children: [
            {
              id: 102,
              authName: '用户列表',
              path: null,
            },
          ],
        },
        {
          id: 201,
          authName: '权限管理',
          path: null,
          children: [
            {
              id: 202,
              authName: '角色列表',
              path: null,
            },
            {
              id: 203,
              authName: '权限列表',
              path: null,
            },
          ],
        },
        {
          id: 301,
          authName: '商品管理',
          path: null,
          children: [
            {
              id: 302,
              authName: '商品列表',
              path: null,
            },
            {
              id: 303,
              authName: '分类参数',
              path: null,
            },
            {
              id: 304,
              authName: '商品分类',
              path: null,
            },
          ],
        },
      ],
    }
  },
  created() {
    // this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取所有菜单
    async getMenuList() {
      const res = await this.$http.get('/system/menus').then(function (res) {
        return res
      })
      if (res.data.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center; ///内容居中
  color: #ffffff;
  font-size: 20px;
  div {
    display: flex; // 纵向居中对齐
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #EAEDF1;
}
</style>
