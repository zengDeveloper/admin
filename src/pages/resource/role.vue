<template>
	<div >
    <el-row class="toolbar">
      <el-col :span ="3">
        <el-button size="mini" type="success" @click="openAddRoleWin"><i class="fa fa-plus"/>  增加</el-button>
      </el-col>
    </el-row>
		<el-tree
			:data="roleList"
 			lazy
  			:load="loadChildren"
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
    <span>
    <el-input type="textarea" v-model="showResourceList" :disabled="true"></el-input>
    <el-button @click="updateResource">修改资源权限</el-button>
    </span>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRole" :loading="addLoading">确 定</el-button>
  </span>
<el-dialog
      width="50%"
      title="修改资源权限"
      :visible.sync="innerVisible"
      append-to-body>
       <el-tree
            :data="resourceList"
            lazy
            show-checkbox
            ref="resourceTree"
			@check-change="r"
            :load="loadResourceChildren"
            :expand-on-click-node="false">
        </el-tree>
        <span slot="footer" class="dialog-footer">
    <el-button @click="innerVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmResource" :loading="addResourceLoading">确 定</el-button>
  </span>
    </el-dialog>

</el-dialog>
	</div>

</template>

<script>

	import {getRoleList,getRoleListByParent, saveRole, deleteRole, getResourceList,getResourceListByParent} from '@/api/api'
	export default{
		data(){
			return {
				roleList:[],
				addLoading:false,
				centerDialogVisible:false,
                addResourceLoading:false,
				parentData:{},
				addData:{},
				currentNode:{},
                innerVisible:false,
                resourceList:[],
                showResourceList:'',
			}

		},
		methods:{
			r:function(data,data1,data2){
				console.log(data)
				console.log(data1)
				console.log(data2)
			},
            confirmResource:function(){
                var resourceArray = this.$refs.resourceTree.getCheckedNodes()
                var resourceIdArray = []
                var showResourceList = []
                for(var i in resourceArray){
                    resourceIdArray.push(resourceArray[i].id)
					if(resourceArray[i].parentId){
						resourceIdArray.push(resourceArray[i].parentId)
					}
                    showResourceList.push(resourceArray[i].resourceName)
                }
                this.showResourceList = showResourceList.join(',')
                this.addData.resource = resourceIdArray.join(',')
                this.innerVisible = false;
            },
            loadResourceChildren:function(node,resolve){
                if(node.data.id){
                     getResourceListByParent(node.data.id).then(res => {
                        if (res.data){
                            for (let i in res.data){
                                res.data[i].label = res.data[i].resourceName
                            }
                            resolve(res.data)
                         } else {
                            resolve([])
                         }
                     })
                 }
            },
            updateResource :function(){
                this.innerVisible = true;
                this.refreshResourceTree();

            },
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
					 	resolve([])
					 }
				 })

			},
			openAddRoleWin(node,data){
        if(data){
          this.parentData = data
        }
        else{
          this.parentData = {}
        }
				this.centerDialogVisible = true

				this.currentNode = node

			},
			addRole(){
				this.addLoading = true
				let _this = this
				saveRole(JSON.stringify({
					roleName:_this.addData.roleName,
					resource:_this.addData.resource,
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
                        this.refreshTree()
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                    })
                    }
                    else{

                    }

				})
			},
            refreshResourceTree(){
                getResourceList().then(res => {
                this.resourceList = res.data
                for(var i in this.resourceList){
                    this.resourceList[i].label = this.resourceList[i].resourceName
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
        let params = [{id:data.id}]
        deleteRole(params).then(res => {
         if (res.code == 0 ){
          this.$message({
            message:'操作成功',
            type:'success'
          })
          this.refreshTree()
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
              <el-button style="font-size: 16px;" size="mini" type="text" on-click={ () => this.openAddRoleWin(node, data) }>增加</el-button>
              <el-button style="font-size: 16px;" type="text" on-click={ () => this.removeData(node, data) }>删除</el-button>
            </span>
          </span>);
      }},
		mounted: function () {
			this.refreshTree()
	  }
	}

</script>

<style type="text/css">
  .toolbar{
    margin: 10px;
  }
</style>
