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
			if(options.dataSrc !== undefined){
				let data = JSON.parse(decodeURIComponent(options.dataSrc));
				this.src = data.dataSrc
			}
			else if(options.src !== undefined){
				let data = JSON.parse(decodeURIComponent(options.src));
				this.src = data
			}
			else{
				this.src = options.src
				
			}	
		}
	}
</script>

<style lang="scss">

</style>
