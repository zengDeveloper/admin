<template>
        <el-row class="content">
          <el-col :span="4">
            <el-menu
            default-active="3"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <template v-for="(menus,i) in menuss" >
                <el-submenu :index=" i + ''" >
                    <template v-for="(menu, j) in menus">
                        <template slot="title" v-if="j == 0">
                            <i class="el-icon-location"></i>
                            <span>{{menu.resourceName}}</span>
                        </template>
                        <el-menu-item v-else @click="jump(menu.resourcePath,menus[0].resourceName, menu.resourceName)" :route="menu.resourcePath" :index=" i + '-' + j" >{{menu.resourceName}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </el-col>
    <el-col :span="20">
            <div style="margin:20px;">
                <el-breadcrumb separator="/">
                    <template v-for="breadcrumbd in breadcrumbdata">
                        <el-breadcrumb-item>{{breadcrumbd}}</el-breadcrumb-item>
                  </template>
                </el-breadcrumb>
            </div>
        <router-view></router-view>
    </el-col>
</el-row>
</template>

<script>
export default {
    data(){
        return {
            menuss:JSON.parse(localStorage.getItem('menus')),
            breadcrumbdata:[]
        }
    },
    methods:{
        jump(path, parentSource, resourceName){
            let _this = this
            _this.$router.push(path)
            if( _this.breadcrumbdata.length != 0){
                _this.breadcrumbdata.splice(0, _this.breadcrumbdata.length, parentSource, resourceName)
            } else{
                _this.breadcrumbdata.push(parentSource)
                _this.breadcrumbdata.push(resourceName)
            }
        }
    }

}
</script>

<style>

</style>
