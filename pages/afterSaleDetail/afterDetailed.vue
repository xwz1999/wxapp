<template>
	<view class="goods-box">
		<view class="box" v-for="item in list" :key='item.id'>
			<view class="item">
				<view class="title">
					<view class="left">
						<view class="dot" :class=""></view>
					</view>
					<view class="flex justify-between align-center" style="flex: 1;">
						<view>{{item.title}} </view>
						<view class="time-txt">{{item.ctime}} </view>
					</view>
				</view>
				<view class="line-box">
					<view class="left" style="width: 40rpx;">
						<view class="line"></view>
					</view>
					<view class="" style="padding: 20rpx 0rpx 30rpx 0;flex: 1;">
						<view class="txt">
							<view v-for="(txt,index) in item.content" :key='index'>{{txt |strFilters}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		filters: {
			strFilters(str) {
				if (str) {
					str.replace(/<.+>/g, "")
					return str.replace(/<[^>]+>/g, '');
				}
			}
		},
		methods: {
			getData(asId) {
				this.$u.post('/api/v1/order/after_sales/log', {
					asGoodsId: asId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.list = res.data.data
					this.list.map(item => {
						item.content = item.content.split("|")

					})

				});
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.asId) {
				let asid = parseInt(options.asId)
				this.getData(asid)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-box {
		background: #FFFFFF;
		min-height: 100vh;
		padding: 30rpx;
		height: auto;
	}
	.box {

		.left {
			width: 40rpx;
			display: flex;
			justify-content: center;
		}

		.dot {
			width: 16rpx;
			height: 16rpx;
			border-radius: 50%;
			background: #E5E5E5;
			z-index: 10;
			&.active{
				background: #DB2D2D;
			}
		}
		.line {
			width: 4rpx;
			height: auto;
			background: #E5E5E5;
		}
		.title {
			display: flex;
			align-items: center;
			vertical-align: middle;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			.time-txt {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}
		}

		.line-box {
			display: flex;

			.txt {
				flex: 1;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
			}
		}
	}
</style>
