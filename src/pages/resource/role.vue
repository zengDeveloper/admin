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

	import {getRoleList,getRoleListByParent, saveRole} from '@/api/api'
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
				 getRoleListByParent(node.data.id).then(res => {
				 	if (res.data){
					 	for (let i in res.data){
					 		res.data[i].label = res.data[i].roleName
					 	}
					 	resolve(res.data)
					 } else {
					 	resolve(new Array)
					 }
				 })

			},
			openAddRoleWin(node,data){
				let _this = this
				_this.centerDialogVisible = true
				_this.parentData = data
				_this.currentNode = node
				console.log(_this.currentNode)

			},
			addRole(){
				this.addLoading = true
				let _this = this
				console.log(this.currentNode)
				saveRole(JSON.stringify({
					roleName:_this.addData.roleName,
					resource:"1,2,3",
					parentId:_this.parentData.id
				})).then(res => {
					 if (!_this.currentNode.childNodes) {
          					this.$set(_this.currentNode, 'childNodes', []);
        				}
					const newChild = {data:_this.addData, label: _this.addData.roleName, children: [] }
        			_this.currentNode.childNodes.push(newChild)
					_this.addLoading = false
					_this.centerDialogVisible = false
					_this.clearAddForm()
				})
			},
			clearAddForm(){
				this.addData ={}
			},
			renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.openAddRoleWin(node, data) }>增加</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      }},
		mounted: function () {
			var _this = this
			getRoleList().then(res => {
				_this.roleList = res.data
				for(var i in _this.roleList){
					_this.roleList[i].label = _this.roleList[i].roleName
				}
			})
	  }
	}
</script>