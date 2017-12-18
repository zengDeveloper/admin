<template>
  <div class="background" >
  <div class="login-box" >
    <el-row>
      <el-col style="margin-bottom:20px" :offset="2" :span="20">
          <span class="login-title">登录管理系统</span>
      </el-col>
    </el-row>
 <el-row>
    <el-col :offset="4" :span="16">
        <el-input id="name" name="username"  v-model="username" placeholder="请输入帐号">
            <template slot="prepend">账户</template>
        </el-input>
    </el-col>
 </el-row>
 <div style="height:10px;"/>
 <el-row>
    <el-col :offset="4"  :span="16">
        <el-input id="password" name="password" v-model="password" type="password" placeholder="请输入密码">
            <template slot="prepend">密码</template>
        </el-input>
    </el-col>
 </el-row>
 <el-row>
    <el-col style="margin-top:10px;" :offset="2" :span="8">
        <el-button style="margin-left:0;" @click="check" type="primary">登录</el-button>
    </el-col>
 </el-row>
</div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username:"",
      password:"",

    }
  },
  methods:{
    check:function(){
      console.log(this.username)
      this.$http.post('/shirospring/loginWeb',{
        username:this.username,
        password:this.password
      }).then((res) =>{
        if (0 == res.data.code) {
          localStorage.setItem('menus',JSON.stringify(res.data.data))
          this.$router.push({
            path:'/'
          })
        }
        else{
          this.$alert(res.data.code + ":" +res.data.msg,'错误信息',{})
        }
      })
    }
  }
}
</script>

<style>

.login-title{
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgba(255,255,255,0.8);
  font-size: 30px;

}

.login-box{
  background: rgba(0,0,0,0.15);
  width: 30%;
  text-align: center;
  margin-left: 30%;
  margin-top: 14%;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom:  10px;
}
body{
  margin: 0;
}
span,body,div{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.background{
  background-image:url(../assets/3121.jpg);
  height: 100%;
  overflow: hidden;
  width: 100%;
  position: absolute;
 }
 #app{
   height: 100%;
 }


</style>
