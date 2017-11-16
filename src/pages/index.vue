<template>
	<div>
	<v-header></v-header>
    	<v-menu></v-menu>
    </div>
</template>
<script>
import vMenu from './common/menu'
import vHeader from './common/header'
    export default{
        components:{vMenu, vHeader}
    }
</script>