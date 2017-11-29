<template>
  <div>
     <el-table
    ref="multipleTable"
    :data="resultList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
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
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="删除用户" :visible.sync="delDialogVisible" width="50%" center>
    <span>确认删除{{ del_userName }}的用户信息吗？</span>
    <span v-show="false">{{ rowInfo }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="delUser" :loading="delLoading">确 定</el-button>
    </span>
  </el-dialog> 

  </div>
</template>

  <script type="text/javascript">
 	import {getUserList, deleteUser} from '@/api/api'
  	export default{
  		data(){
  			return {
  				resultList:new Array(),
          delLoading : false,
          delDialogVisible : false,
          hiddenVisible : false,
          del_userName : "",
          rowInfo : ""
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

        //编辑用户资料
  			handleEdit:function(){
  				console.log("handleEdit");

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
              //刷新数据
              this.multipleTable.

              this.$message({
                message:'操作成功',
                type:'success'
              })
             }
            });

        }
  		}
  	}
  </script>