  <template>
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
</template>

  <script type="text/javascript">
 	import {getUserList} from '@/api/api'
  	export default{
  		data(){
  			return {
  				resultList:new Array()
  			}
  		},
  		mounted:function(){
  			getUserList().then(res => {
  				this.resultList = res.data
  			})
  		},
  		methods:{
  			handleEdit:function(){
  				console.log("handleEdit");

  			},

  			handleDelete:function(){
  				console.log("handleDelete");
  			}
  		}
  	}
  </script>