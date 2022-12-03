<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: 'App',
})

</script>

<template>
	<div id="container">
		<router-view></router-view>
	</div>
</template>

<style>
#container {
	width: 100%;
	max-width: 500px;
	margin: 0 auto;
}
</style>