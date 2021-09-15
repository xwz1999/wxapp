<template>
	<view>
		<scroll-view class="scroll" scroll-y="true" :refresher-enabled="true" :refresher-triggered="triggered"
		 :refresher-threshold="100" refresher-background="lightgreen" @refresherrefresh="onRefresh">
			<view></view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				triggered: false
			};
		},
		methods: {
			onRefresh() {
				console.log("onRefresh======下拉刷新被触发");
				this.triggered = true;
				setTimeout(() => {
					this.triggered = false;
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.scroll {
		width: 100vw;
		height: 100vh;
	}
</style>
