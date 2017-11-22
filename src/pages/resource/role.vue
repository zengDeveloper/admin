<template>
	<div >
		<el-tree
			:data="roleList"
 			lazy
  			:load="loadChildren"
  			show-checkbox
  			:expand-on-click-node="false"
  			:render-content="renderContent" >
		</el-tree>

	<el-dialog
  title="增加角色"
  :visible.sync="centerDialogVisible"
  width="50%"
  center>
  <el-form label-position="right" label-width="100px">
  <el-form-item label="上级角色">
    <el-input v-model="parentData.roleName" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="角色名称">
    <el-input v-model="addData.roleName"></el-input>
  </el-form-item>
  <el-form-item label="资源权限">
    <el-input v-model="addData.resource"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRole" :loading="addLoading">确 定</el-button>
  </span>
</el-dialog>
	</div>

</template>

<script>

	import {getRoleList,getRoleListByParent, saveRole, deleteRole} from '@/api/api'
	export default{
		data(){
			return {
				roleList:[],
				addLoading:false,
				centerDialogVisible:false,
				parentData:{},
				addData:{},
				currentNode:{},
			}
				
		},
		methods:{
			handleSelectionChange:function(){
				 this.multipleSelection = val
			},
			loadChildren:function(node,resolve){
                console.log(node)
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
                 console.log(node)

			},
			openAddRoleWin(node,data){
				this.centerDialogVisible = true
				this.parentData = data
				this.currentNode = node

			},
			addRole(){
				this.addLoading = true
				let _this = this
				saveRole(JSON.stringify({
					roleName:_this.addData.roleName,
					resource:"1,2,3",
					parentId:_this.parentData.id
				})).then(res => {
                    _this.addLoading = false
                    _this.centerDialogVisible = false
                    _this.clearAddForm()
                    if (res.code == 0){
                        const newChild = {id:1000,label:_this.addData.roleName}
                        if(!_this.parentData.children){
                            _this.$set(_this.parentData, 'children', []);
                        }
                          _this.parentData.children.push(newChild);
                        console.log(_this.currentNode)
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                    })
                    }
                    else{

                    }
					
				})
			},
  			clearAddForm(){
  				this.addData ={}
			 },
            refreshTree(){
                getRoleList().then(res => {
                this.roleList = res.data
                for(var i in this.roleList){
                    this.roleList[i].label = this.roleList[i].roleName
                }
            })
            },
      removeData(node,data){
        console.log(node)
        let params = [{id:data.id}]
        deleteRole(params).then(res => {
         if (res.code == 0 ){
          this.$message({
            message:'操作成功',
            type:'success'
          })
         }
        })

      },
			renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 18px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 10px;" size="mini" type="text" on-click={ () => this.openAddRoleWin(node, data) }>增加</el-button>
              <el-button style="font-size: 10px;" type="text" on-click={ () => this.removeData(node, data) }>删除</el-button>
            </span>
          </span>);
      }},
		mounted: function () {
			this.refreshTree()
	  }
	}







</script>