<template>
  <div>
    <el-row class="toolbar" style="background-color:#f2f2f2;">
      <el-col :span ="3">
        <el-button size="mini" type="success" style="margin-top:20px; margin-bottom:20px" @click="handleAdd"><i class="fa fa-plus"/>增加</el-button>
      </el-col>
    </el-row>

    <el-table
    ref="multipleTable"
    :data="resultList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-columntype="selection"width="55">
    </el-table-column>
    <el-table-column
        prop="realName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="联系地址">
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册日期">
      </el-table-column>

      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleChange(scope.$index, scope.row)">更换</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 删除信息弹出框 -->
  <el-dialog title="删除用户" :visible.sync="delDialogVisible" width="50%" center>
    <span>确认删除{{ del_userName }}的用户信息吗？</span>
    <span v-show="false">{{ rowInfo }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="delUser" :loading="delLoading">确 定</el-button>
    </span>
  </el-dialog> 

<!-- 编辑信息弹出框 -->
  <el-dialog title="编辑信息" :visible.sync="editDialogVisible" width="50%" center>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="姓名：">
          <el-input
            placeholder="请输入真实姓名" v-model="userName">
          </el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input
            placeholder="请输入年龄" v-model="age" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input
            placeholder="请输入联系方式" v-model="telPhone"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input
            placeholder="请输入联系地址" v-model="address" clearable>
          </el-input>
        </el-form-item>
      </el-form>
     
      <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser" :loading="editLoading">确 定</el-button>
    </span>
  </el-dialog> 

<!-- 新增用户弹出框 -->
  <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" center>
    <el-steps :active="step" finish-status="success">
      <el-step title="角色授权"></el-step>
      <el-step title="用户信息"></el-step>
      <el-step title="创建用户"></el-step>
    </el-steps>

    <div v-show="resourceTreeShow" class="dialogDiv">
      <!-- 角色选择 -->
      <el-tree
      :data="roleList"
      lazy
      :load="loadChildren"
      :expand-on-click-node="false"
      ref="resourceTree"
      show-checkbox
      >
      </el-tree>
    </div>

    <!-- 用户信息 --> 
    <div v-show="userInfoShow" class="dialogDiv">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="100px" @submit.native.prevent>
        <el-form-item label="姓名：" prop="addUserName">
          <el-input
            placeholder="请输入真实姓名" v-model="ruleForm.addUserName">
          </el-input>
        </el-form-item> 
        <el-form-item label="年龄：" prop="addAge">
          <el-input
            placeholder="请输入年龄" v-model.number="ruleForm.addAge" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="addSex">
          <el-radio-group v-model="ruleForm.addSex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话：" prop="addPhone">
          <el-input
            placeholder="请输入手机号码" v-model.number="ruleForm.addPhone" maxlength=11 clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="addAddress">
          <el-input
            placeholder="请输入联系地址" v-model="ruleForm.addAddress" clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

  <!-- 登录信息 -->
    <div v-show="authInfoShow" class="dialogDiv">
      <el-form :model="userForm" :rules="userRules" ref="userForm"  label-position="right" label-width="100px" @submit.native.prevent>
        <el-form-item label="用户名：" prop="addAuth">
          <el-input
            placeholder="请输入用户名" v-model="userForm.addAuth">
          </el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="addPwd">
          <el-input
            placeholder="请输入密码" v-model="userForm.addPwd" clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    

     <el-button @click.native.prevent="handlePreStep" v-show="preStep">
      上一步
    </el-button>
    <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">
      下一步
    </el-button>
    <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary" :loading="addLoading">
      完成
    </el-button>
  </el-dialog>


  </div>
</template>

  <script type="text/javascript">
 	import {getUserList, deleteUser, editUser, getRoleList, getRoleListByParent, checkAccount,addUser} from '@/api/api'
  	export default{
  		data(){
  			return {
  				resultList:new Array(),
          delLoading : false,
          delDialogVisible : false,
          hiddenVisible : false,
          del_userName : "",
          rowInfo : "",
          editDialogVisible : false,
          userName : "",
          age : "",
          telPhone : "",
          address : "",
          editLoading : false,
          addLoading : false,
          step: 0,
          addDialogVisible : false,
          preStep : true,
          nextStep : true,
          publish : false,
          roleList:[],
          resourceTreeShow : true,
          userInfoShow : false,
          authInfoShow : false,
          ruleForm : {
            addUserName : "",
            addAge : "",
            addPhone : "",
            addAddress : "",
            addSex : "男",
          },
          userForm : {
            addAuth : "",
            addPwd : "",
          },
          rules : {
            addUserName : [
              { required: true, message: '真实姓名不能为空', trigger: 'blur' }
            ],
            addAge : [
              { required: true, message: '年龄不能为空'},
              { type: 'number', message: '年龄必须为数字值'}
            ],
            addPhone : [
              { required: true, message: '手机号码不能为空'},
              { type: 'number', message: '手机号码必须为数字值'},
            ],
            addAddress : [
              { required: true, message: '联系地址不能为空', trigger: 'blur' }
            ],
            addSex : [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
          },
          userRules : {
            addAuth : [
              { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            addPwd : [
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ],
          }
  			}
  		},
  		mounted:function(){
  			getUserList().then(res => {
  				this.resultList = res.data
  			})
  		},
  		methods:{

        handleSelectionChange(val) {
          this.multipleSelection = val;
        },

        //删除用户资料
  			handleDelete:function(index, row){
          //用户名赋值
          this.del_userName = row.realName;
          this.rowInfo = row;
          //展示弹出框
          this.delDialogVisible = true;
          this.hiddenVisible = false;
  			},

        //编辑用户资料
        handleEdit:function(index, row){
          this.rowInfo = row;
          this.userName = row.realName;
          this.age = row.age;
          this.telPhone = row.phoneNumber;
          this.address = row.address;
          this.editDialogVisible = true;
        },

        //新增用户
        handleAdd:function(){
             this.addDialogVisible = true;
             //查询角色信息
             getRoleList().then(res => {
                this.roleList = res.data
                for(var i in this.roleList){
                    this.roleList[i].label = this.roleList[i].roleName
                }
              });
        },

        //stepNext下一步
        handleNextStep: function () {
          var _this = this;
          var resourceArray = _this.$refs.resourceTree.getCheckedNodes();
          if (resourceArray == "") {
              this.$message({
                message:'请至少选择一种角色',
                type:'error'
              })
          }else{
              if (this.step == 0) {
                setTimeout(function () {
                    _this.step++;
                    _this.goStep(_this.step);
                })

              }else{
                this.$refs['ruleForm'].validate((valid) => {
                  if (valid) {
                    setTimeout(function () {
                      _this.step++;
                      _this.goStep(_this.step);
                    })
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
              }; 
          }      
        },

        //上一步
        handlePreStep: function () {
            this.step--;
            this.goStep(this.step);
        },

        //完成创建
        handlePublish: function(){
            this.$refs['userForm'].validate((valid) => {
              if (valid) {
                //获取所有参数
                //角色id
                var resourceArray = this.$refs.resourceTree.getCheckedNodes();
                var resourceIdArray = []
                for(var i in resourceArray){
                    resourceIdArray.push(resourceArray[i].id)
                }
                var sysRole = resourceIdArray.join(',')

                //用户信息
                var realName = this.ruleForm.addUserName;
                var age = this.ruleForm.addAge;
                var sex = this.ruleForm.addSex;
                var phoneNumber = this.ruleForm.addPhone;
                var address = this.ruleForm.addAddress;

                //登录信息
                var accountName = this.userForm.addAuth;
                var accountPwd = this.userForm.addPwd;

                this.addLoading = true;

                //新增用户
                let _this = this;
                addUser(JSON.stringify({
                    sysRole : sysRole,
                    realName : realName,
                    age : age,
                    sex : sex,
                    phoneNumber : phoneNumber,
                    address : address,
                    accountName : accountName,
                    accountPwd : accountPwd

                })).then(res => {
                    if (res.code == 1) {
                        this.addLoading = false;
                        this.addDialogVisible = false;

                        this.$message({
                          message:'操作成功',
                          type:'success'
                        })
                        //刷新数据
                        getUserList().then(res => {
                            this.resultList = res.data
                        })

                    }else{
                      
                        this.addLoading = false;
                        this.addDialogVisible = false;
                        this.$message({
                          message:'操作失败',
                          type:'error'
                        })
                    };

                });

              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },

        //确认删除用户
        delUser(){
            this.delLoading = true;
            let params = [{id:this.rowInfo.id}]
            let _this = this;
            deleteUser(params).then(res => {
            if (res.code == 0 ){
              //隐藏弹出框
              this.delLoading = false;
              this.delDialogVisible = false;
              this.$message({
                message:'操作成功',
                type:'success'
              })
              //刷新数据
              getUserList().then(res => {
                  this.resultList = res.data
              })
             }
            });
        },

        //编辑用户信息
        editUser(){
            this.editLoading = true;
            let _this = this;
            editUser(JSON.stringify({
              id:_this.rowInfo.id,
              realName:_this.userName,
              phoneNumber:_this.telPhone,
              age:_this.age,
              address:_this.address
            })).then(res => {
                this.editLoading = false;
                this.editDialogVisible = false;
                getUserList().then(res => {
                  this.resultList = res.data
                })
                this.$message({
                message:'操作成功',
                type:'success'
              })
            });
        },

        goStep: function (n) {
          switch (n) {
            case 0 :
              //角色授权
              this.preview = true;
              this.preStep = false;
              this.nextStep = true;
              this.publish = false;
              this.resourceTreeShow = true;
              this.userInfoShow = false;
              this.authInfoShow = false;

              break;
            case 1 :
              this.preview = false;
              this.preStep = true;
              this.nextStep = true;
              this.publish = false;
              this.resourceTreeShow = false;
              this.userInfoShow = true;
              this.authInfoShow = false;
              break;
            case 2 :
              this.preview = false;
              this.preStep = true;
              this.nextStep = false;
              this.publish = true;
              this.resourceTreeShow = false;
              this.userInfoShow = false;
              this.authInfoShow = true;
              break;              
          }
        },

        loadChildren:function(node,resolve){
         getRoleListByParent(node.data.id).then(res => {
            if (res.data){
              for (let i in res.data){
                res.data[i].label = res.data[i].roleName
              }
              resolve(res.data)
             } else {
              resolve([])
             }
           })

        },
  		}
  	}
  </script>

  <style type="text/css">
      .dialogDiv{
        padding-top: 20px;
        padding-bottom: 20px;
      }
  </style>