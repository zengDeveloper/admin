<template>
    <div >
    <el-row class="toolbar">
      <el-col :span ="3">
        <el-button size="mini" type="success" @click="openAddWin"><i class="fa fa-plus"/>  增加</el-button>
      </el-col>
    </el-row>
        <el-tree
            :data="resourceList"
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
  <el-form-item label="上级资源">
    <el-input v-model="parentData.resourceName" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="资源名称">
    <el-input v-model="addData.resourceName"></el-input>
  </el-form-item>
  <el-form-item label="资源类型">
    <el-radio v-model="addData.resourceType" label="button">按钮</el-radio>
  <el-radio v-model="addData.resourceType" label="menu">菜单</el-radio>
  </el-form-item>
  <el-form-item label="资源权限字符串">
    <el-input v-model="addData.resourcePermission"></el-input>
  </el-form-item>
  <el-form-item label="资源优先级">
    <el-input v-model="addData.resourcePriority"></el-input>
  </el-form-item>
  <el-form-item label="资源路径">
    <el-input v-model="addData.resourcePath"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDataMethod" :loading="addLoading">确 定</el-button>
  </span>
</el-dialog>
    </div>

</template>

<script>
    import {getResourceList, getResourceListByParent, saveResource, deleteResource} from '@/api/api'
    export default{
        data(){
            return {
                resourceList:[],
                addLoading:false,
                centerDialogVisible:false,
                parentData:{},
                resourceType:"",
                addData:{},
                currentNode:{},
            }

        },
        methods:{
            handleSelectionChange:function(){
                 this.multipleSelection = val
            },
            loadChildren:function(node,resolve){
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
            openAddWin(node,data){
        if(data){
          this.parentData = data
        }
        else{
          this.parentData = {}
        }
                this.centerDialogVisible = true

                this.currentNode = node

            },
            addDataMethod(){
                this.addLoading = true
                let _this = this
                saveResource(JSON.stringify({
                    resourceName:_this.addData.resourceName,
                    resourceType:this.addData.resourceType,
                    resourcePath:this.addData.resourcePath,
                    parentId:this.parentData.id,
                    resourcePriority:this.addData.resourcePriority,
                    resourcePermission:this.addData.resourcePermission
                })).then(res => {
                    _this.addLoading = false
                    _this.centerDialogVisible = false
                    _this.clearAddForm()
                    if (res.code == 0){
                        const newChild = {id:1000,label:_this.addData.resourceName}
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
            clearAddForm(){
                this.addData ={}
             },
            refreshTree(){
                getResourceList().then(res => {
                this.resourceList = res.data
                for(var i in this.resourceList){
                    this.resourceList[i].label = this.resourceList[i].resourceName
                }
            })
            },
      removeData(node,data){
        let params = [{id:data.id}]
        deleteResource(params).then(res => {
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
              <el-tag size="mini"  type={node.data.resourceType == "menu" ? "info":"danger"}
              style="margin-left:40px;">{node.data.resourceType == "menu" ? "菜单":"按钮"}</el-tag>
            </span>
            <span>
              <el-button style="font-size: 16px;" size="mini" type="text" on-click={ () => this.openAddWin(node, data) }>增加</el-button>
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
