<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:null
			};
		},
			
		onLoad(options){
			this.src = options.src
			console.log(this.src)
		}
	}
</script>

<style lang="scss">

</style>
