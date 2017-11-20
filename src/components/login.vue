<template>
  <div class="login-box" id="app" >  
 <el-row>  
    <el-col :span="8">
        <el-input id="name" name="username"  v-model="username" placeholder="请输入帐号">  
            <template slot="prepend">账户</template>
        </el-input>   
    </el-col>  
 </el-row>  
 <el-row>  
    <el-col :span="8">  
        <el-input id="password" name="password" v-model="password" type="password" placeholder="请输入密码">  
            <template slot="prepend">密码</template>  
        </el-input>  
    </el-col>  
 </el-row>  
 <el-row>  
    <el-col :span="8">  
        <el-button @click="check" type="primary">登录</el-button>
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
      var that = this
      console.log(this.username)
      this.$http.post('/shirospring/loginWeb',{
        username:this.username,
        password:this.password
      }).then(function(res){
        if (0 == res.data.code) {
          localStorage.setItem('menus',JSON.stringify(res.data.data))
          console.log(JSON.stringify(localStorage.getItem('menus')))
          that.$router.push({
            path:'/'
          })
        }
        else{
          that.$alert(res.data.code + ":" +res.data.msg,'错误信息',{})
        }
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


</style>
