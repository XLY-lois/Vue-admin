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
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
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
              path: 'users',
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
              path: 'roles',
            },
            {
              id: 203,
              authName: '权限列表',
              path: 'rights',
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
              path: 'goodlist',
            },
            {
              id: 303,
              authName: '分类参数',
              path: 'classifyparam',
            },
            {
              id: 304,
              authName: '商品分类',
              path: 'goodsclassify',
            },
          ],
        },
        {
          id: 401,
          authName: '订单管理',
          path: null,
          children: [],
        },
        {
          id: 501,
          authName: '数据统计',
          path: null,
          children: [],
        },
      ],
      iconsObj: {
        101: 'el-icon-s-custom',
        201: 'el-icon-s-check',
        301: 'el-icon-s-cooperation',
        401: 'el-icon-s-order',
        501: 'el-icon-s-marketing'
      },
      isCollapse: false, //菜单是否折叠
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
    toggleCollapse() { //点击按钮折叠与展开左侧菜单
      this.isCollapse = !this.isCollapse
    }
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
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #EAEDF1;
}
.toggle-button {
  background-color: #4A5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer; //鼠标放上去变小手
}
</style>
