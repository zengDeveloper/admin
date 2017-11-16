<template>
<div>
	<el-row :span="24" class="top_bar">
		<el-col :span="6" class="div_system_name">
			<span class="system_name">后台管理系统</span>
		</el-col>
		<el-col :span="2" class="div_top_icon" :offset="8">
			<i class="el-icon-message top_icon"></i>
		</el-col>
		<el-col :span="2" class="div_top_icon">
			<i class="el-icon-bell top_icon"></i>
		</el-col>
		<el-col :span="2" class="div_top_icon">
			<i class="el-icon-more top_icon"></i>
		</el-col>
		<el-col :span="4" class="div_top_icon">
			<span class="username"><i class="fa fa-male"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jack</span>
		</el-col>

	</el-row>
</div>
</template>
<script>
  export default {
   
  }
</script>
<style>
.top_bar{
	background-color: #3c8dbc;
	height: 50px;
}
.username{
	font-size: 1rem;
	line-height: 50px;
}
.system_name{
	line-height: 50px;
	color: #fff;
	font-weight: 700;
}
.top_icon{
	line-height: 50px;
}

.div_system_name{
	text-align: center;
	height: 50px;
	background-color: #367fa9;
}
.div_top_icon{
	text-align: center;
}
.div_top_icon:hover{
	cursor: pointer;
	background-color: #367fa9;
}

body{
	margin: 0;
}
</style>