<template>
  <div class="login-box" id="app" >  
 <el-row>  
    <el-col :span="8">  
        <el-input id="name"  v-model="username" placeholder="请输入帐号">  
            <template slot="prepend">账户</template>
        </el-input>   
    </el-col>  
 </el-row>  
 <el-row>  
    <el-col :span="8">  
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">  
            <template slot="prepend">密码</template>  
        </el-input>  
    </el-col>  
 </el-row>  
 <el-row>  
    <el-col :span="8">  
        <el-button id="login" v-on:click="check" style="width:100%" type="primary">登录</el-button>  
    </el-col>  
 </el-row>  
</div>   

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username:"",
      password:""
    }
  },
  methods:{
    check:function(){
      this.$http.post('/shirospring/login',{
        username:this.username,
        password:this.password
      }).then(function(res){
        alert(JSON.stringify(res))
      })
    }
  }
}
</script>

<style>
.login-box{
  margin-left: 30%;
  margin-top: 20%;
}
.el-col{
  margin-top: 10px;
}

</style>
