<template lang="html">
    <el-row class="container">
        <!-- 头部的导航栏 -->
        <el-menu theme="dark" :default-active="indexPath" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
            <div class="el_logo">
                <div class="logo"></div>
            </div>
            <el-menu-item index="/operationData" :route="{path: '/operationData'}">运营数据</el-menu-item>
            <el-menu-item index="/userManager" :route="{path: '/userManager'}">用户管理</el-menu-item>
            <el-menu-item index="/operationSupport" :route="{path: '/operationSupport'}">运营支撑</el-menu-item>
            <el-menu-item index="/systemManagement" :route="{path: '/activityManagement'}">活动专区</el-menu-item>
            <el-menu-item index="/systemSetting" :route="{path: '/systemManagement'}">系统管理</el-menu-item>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img :src="sysUserAvatar" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <!-- 面包屑dom结构 -->
            <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/operationSupportOne/userQuery'}">运营支撑</el-breadcrumb-item>
                <el-breadcrumb-item>运营支撑一</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/operationSupportOne/userQuery' }">用户查询</el-breadcrumb-item>
            </el-breadcrumb> -->
        </el-menu>
        <!-- 个人信息展示组件 -->
		<oneUserContent></oneUserContent>
        <!-- 左侧的导航栏 -->
        <!--  -->
        <el-col :span="24" class="content-all-wrapper">
            <transition name="el-fade-in-linear" mode="out-in" >
                <router-view  class="nav-view">

                </router-view>
            </transition>
        </el-col>
    </el-row>

</template>

<script>
import oneUserContent from './../rootGlobal/oneUserContent.vue'; // 个人信息内容弹窗
import store from '../../vuex/store';
export default {
     data() {
      return {
        sysUserName: '',
        sysUserAvatar: 'http://imgtu.5011.net/uploads/content/20170410/2880121491810236.jpg',
        indexPath: '', // 页面刷新时，直接页面路由的跳转，设置默认打开的页面 
        indexPathArr: ['/operationData', '/operationSupport', '/anchorManager', '/systemManagement', '/systemSetting'], // 设置home上面导航栏的默认路由集合
        // routes:"",
      };
    },
    components: {
		oneUserContent,
	},
    mounted:function(){
        var _this = this;
        _this.$nextTick(function(){
            // 进行页面刷新时，得到地址栏的路径，进行配置默认展示为相应地址栏的的路由页面，将上面的导航栏的设置默认选中
            var strPath = location.href;
            var index = strPath.indexOf('#/');
            strPath = strPath.substring(index+1,strPath.length);
            for(var i=0; i<_this.indexPathArr.length; i++) {
                if(strPath.indexOf(_this.indexPathArr[i])!=-1) {
                    // 设置当前地址栏截取的地址为选中状态，存在为包含的关系，这里设置是顶部的位置地址栏进行设置
                    _this.indexPath = _this.indexPathArr[i];
                    break;
                }
            }
        })
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('user');
                this.$router.push({
                                path: '/login'
                            });
                //这个不能动
                location.reload();
            }).catch(() => {

            });
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    }
}
</script>

<style lang="css">
.userinfo {
    height: 60px;
    text-align: right;
    padding-right: 35px;
    float: right !important;
}
.userinfo-inner {
    cursor: pointer;
    color:#fff;
}
.userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
}
/* 设置logo宽度自适应，和下面的左边导航栏进行匹配,宽度设置为13% */
.el_logo{
    width: 13%; 
    height: 60px;
    min-width: 150px;
    display: block;
    float: left;
}
.logo {
    display: block;
    float: left;
    width: 58px;
    height: 28px;
    background-image: url(http://dianliaotools.oss-cn-shenzhen.aliyuncs.com/common/dianliao-logo.png) ;
    background-size: cover;
    margin:15px 10px 0 80px;
}
.nav-view {
    /*height: 100%;*/
    width: 100%;
    /* min-width: 1080px; */
}
/* .nav-head {
    min-width: 1080px;
} */
.container　{
    /* min-width: 1080px; */
    min-height: 660px;
}
/* 设置面包屑的样式 */
/* .el-breadcrumb__item{
    height: 60px !important; 
    background-color: #f1f7ff !important; 
    float: left !important; 
    line-height: 60px !important;
}
.el-breadcrumb__item:nth-of-type(1){
    margin-left: 200px;
    padding-left: 40px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.el-breadcrumb__item:nth-last-of-type(1){
    padding-right: 40px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
} */
@media screen and (min-height: 660px) {
    .left_active {
        width: 13%;
        min-width: 150px;
        /* min-height: 660px; */
        height: 100% ;
        background-color: #eef1f6;
        float: left;
    }
}
.left_active {
    width: 13%;
    min-width: 150px;
    /* min-height: 944px; */
    /* min-height: 914px; */
    height: 100% ;
    background-color: #324157;
    float: left;
}
.content-all-wrapper {
    /*margin-top: 2px;*/
    height: 100%;
    /* min-width: 1200px; */
}
.content-container {
    display: inline-block;
    overflow-y: scroll;
    padding: 20px;
}
.content-wrapper {
    width: 87% !important;
    height: 100%;
    background-color: #fff;
    float: left;
}
/*  */
.el-menu-item-group__title{
    padding-top: 0 !important;
}
.el-submenu__title{
    height: 40px !important;
    line-height: 40px !important;
}
/* 设置为相应左边导航选中的item高度以及行高，对应为三级路由的行高进行设置 */
.el-submenu .el-menu-item{
    height: 40px !important;
    line-height: 40px !important;
}
/* 设置为相应左边导航选中的item高度以及行高，对应为二级路由的行高进行设置 */
/* el-menu */
.left_active .el-menu-item{
    height: 40px !important;
    line-height: 40px !important;
}
</style>
