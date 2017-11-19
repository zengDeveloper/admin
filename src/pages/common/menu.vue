<template>
        <el-row>
          <el-col :span="6">
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
                        <el-menu-item v-else @click="$router.push(menu.resourcePath)" :route="menu.resourcePath" :index=" i + '-' + j" >{{menu.resourcePath}}{{menu.resourceName}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </el-col>
    <el-col :span="18">
        <router-view></router-view>
    </el-col>
</el-row>
</template>

<script>
export default {
    data(){
        return {
            menuss:JSON.parse(localStorage.getItem('menus'))
        }
    }
    
}
</script>