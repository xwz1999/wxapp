<template>
	<view class="content">
		<view class="resultBox">
			<view class="result">暂未录入改商品</view>
			<view class="text">
				扫码结果
				{{code}}
			</view>
		</view>
		
		<view class="buttonBox">
			<button class="redBtn" @click="scan">重新扫码</button>
			<button class="whiteBtn" @click="backHome">返回首页</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			code: ''
		}
	},
	onLoad(option) {
		console.log(option)
		if (option.code) {
			this.code = option.code
		}
	},
	methods: {
		scan() {
			let that = this
			uni.scanCode({
				success: function(res) {
					console.log(res)
					let code = res.result
					that.$u.post('/api/v1/goods/code/search', {code: code}).then(res => {
						console.log(res)
						if (res.code === 'FAIL') {
							return
						}
						if (res.data.code === 'FAIL') {
							uni.reLaunch({
								url: "/packageA/scan/scanFail?code=" + code
							})
						}
						uni.navigateTo({
							url: "/pages/goodsDetail/goodsDetail?id=" + res.data.data.goodsId
						})
					});
				}
			});
		},
		backHome() {
			console.log(12432)
			uni.reLaunch({
				url: '../../pages/index/index'
			})
		}
	}
}
</script>

<style>
page{
    background:#FFFFFF;
}
</style>

<style lang="scss">
.content{
	.resultBox{
		padding: 40px;
		.result{
			font-size: 48rpx;
			margin-bottom: 15px;
		}
		.text{
			font-size: 42rpx;
			border-bottom: 1px solid rgba(0,0,0,0.35);
		}
	}
	.buttonBox{
		margin-top: 50px;
		.redBtn{
			width: 80%;
			background: red;
			color: white;
			margin-bottom: 15px;
		}
		.whiteBtn{
			width: 80%;
			color: red;
			background: #FFFFFF;
			border: 1px solid red;
		}
	}
}
</style>
