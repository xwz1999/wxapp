<template>
	<view>
		<view class="flex flex-direction" style="height: 100vh;width:100vw;background-color: white;padding: 32rpx;">
			<view style="display: flex;flex-direction: column;">
				<text style="color: #333333;font-size: 32rpx;font-weight: bold;">税费计算公式</text>
				<view style="height: 30rpx;"></view>
				<text v-if="type==1"
					style="color: #333333;font-size: 28rpx;">{{'提现金额*综合税率\n货物类综合税率=13%(含增值税、增值税附加税、个人所得税\n服务类综合税率=7%(含增值税、增值税附加税、个人所得税)'}}</text>
				<text v-if="type==2"
					style="color: #333333;font-size: 28rpx;">{{"结算金额/（1+增值税税率）*（增值税税率-6%）*（1+12%）"}}</text>
				<text v-if="type==3" style="color: #333333;font-size: 28rpx;">{{'结算金额/（1+增值税税率）*增值税税率*（1+12%）'}}</text>

				<view style="height: 30rpx;"></view>
				<text style="color: #333333;font-size: 32rpx;font-weight: bold;">1.增值税</text>
				<view style="height: 20rpx;"></view>
				<view class="table-box">
					<view class="table-box-row">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;font-weight: bold;">类型</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;font-weight: bold;">税率</text>
						</view>
					</view>
					<view class="table-box-row" style="background-color: white;">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">货物</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">13%</text>
						</view>
					</view>
					<view class="table-box-row">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">服务</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">6%</text>
						</view>
					</view>
				</view>

				<view style="height: 30rpx;"></view>
				<text style="color: #333333;font-size: 32rpx;font-weight: bold;">2.增值税附加税(增值税*12%)</text>
				<view style="height: 20rpx;"></view>
				<view class="table-box">
					<view class="table-box-row">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;font-weight: bold;">类型</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;font-weight: bold;">税率</text>
						</view>
					</view>
					<view class="table-box-row" style="background-color: white;">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">城市维护建设税</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">7%</text>
						</view>
					</view>
					<view class="table-box-row">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">地方教育附加税</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">2%</text>
						</view>
					</view>
					<view class="table-box-row" style="background-color: white;">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">教育费附加</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">3%</text>
						</view>
					</view>
					<view class="table-box-row">
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">小计</text>
						</view>
						<view class="table-box-item">
							<text style="color: #333333;font-size: 28rpx;">12%</text>
						</view>
					</view>
				</view>
				<view style="height: 30rpx;"></view>
				<view v-if="type==1">
					<text style="color: #333333;font-size: 32rpx;font-weight: bold;">3.个人所得税的综合税率</text>
					<view style="height: 20rpx;"></view>
					<text style="color: #333333;font-size: 28rpx;">综合税率：1%</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
			}

		},
		created() {

			let tax = this.$store.state.userBrief.tax
			if (tax == '一般纳税人') {
				this.type = 2
			} else {
				if (tax == '') {
					this.type = 1
				} else {
					this.type = 3
				}
			}
			console.log(this.type)
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.table-box {
		border: 4rpx solid #e8e8e8;
		width: 343*2rpx;
	}

	.table-box-row {
		width: 343*2rpx;
		background-color: #f9f9f9;
		height: 96rpx;
		display: flex;
		flex-direction: row;
	}

	.table-box-item {
		width: 171*2rpx;
		border-right: 4rpx solid #e8e8e8;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
