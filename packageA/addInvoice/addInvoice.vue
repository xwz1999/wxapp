<template>
	<view>
		<view class="" style="line-height: 80rpx;padding: 0 30rpx;">发票详情</view>
		<view class="box bg-white">
			<view class="item flex">
				<view class="span">抬头类型</view>
				<view class="flex flex-sub align-center">
					<u-radio-group v-model="value" @change="radioGroupChange" active-color="red">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name">{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>

			<template v-if="value==list[0].name">
				<view class="item flex">
					<view class="span">公司名称<text class="text-red">*</text></view>
					<input class="flex-sub" type="text" value="" placeholder="请填写公司名称" />
					<text class="cuIcon-sort" @tap="showCompanyModel(true)"></text>
				</view>
				<view class="item flex">
					<view class="span">公司税号<text class="text-red">*</text></view>
					<input class="flex-sub" type="text" value="" placeholder="请填写纳税人识别号" />
				</view>
				<view class="item flex">
					<view class="span">更多内容</view>
					<input class="flex-sub" type="text" value="" placeholder="填写备注地址等(非必填)" />
				</view>
			</template>

			<template v-if="value==list[1].name">
				<view class="item flex">
					<view class="span">抬头名称<text class="text-red">*</text></view>
					<input class="flex-sub" type="text" value="" placeholder="请填写抬头名称" />
					<text class="cuIcon-sort"></text>
				</view>
			</template>
		</view>
		<view class="item bg-white flex justify-between" style="margin-top: 20rpx;">
			<view class="span">总金额</view>
			<view class=""><text class="text-red" style="font-size: 40rpx;margin-right: 10rpx;">219</text>元</view>
		</view>
		<view class="" style="line-height: 80rpx;padding: 0 30rpx;">接收方式</view>
		<view class="box bg-white">
			<view class="item flex">
				<view class="span">手机号码<text class="text-red">*</text></view>
				<input class="flex-sub" type="text" value="" placeholder="用于向您发送开票成功通知" />
			</view>
			<view class="item flex">
				<view class="span">电子邮箱<text class="text-red">*</text></view>
				<input class="flex-sub" type="text" value="" placeholder="用于向您发送电子发票" />
			</view>
		</view>
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red text-white" @tap="showSureModel(true)">提交</button>
		</view>


		<u-popup v-model="isShowCompany" mode="bottom" border-radius="20" height="750">
			<view class="model-box">
				<view class="model-title">常用发票抬头</view>
				<view class="">
					<view class="model-item flex justify-between" v-for="(item,index) in 4" :key="index">
						<view class="">xxxxxxx有限公司</view>
						<view v-if="index==1" style="color: #FA6400;">默认抬头</view>
					</view>
				</view>
			</view>
			<view class="padding" style="position: absolute;bottom: 0;width: 100%;">
				<button class="bg-red text-white" @tap="toAddInvoiceTitle">添加常用发票抬头</button>
			</view>
		</u-popup>
		
		<u-popup v-model="isSure" mode="bottom" border-radius="20" height="750">
			<view class="model-box">
				<view class="model-title text-center">开具电子发票</view>
				<view class="">
					<view class="model-item flex justify-between">
						<view class="span">发票类型</view>
						<view>电子发票</view>
					</view>
					<view class="model-item flex justify-between">
						<view class="span">发票抬头</view>
						<view>阿库</view>
					</view>
					<view class="model-item flex justify-between">
						<view class="span">开票金额</view>
						<view style="color: #FA6400;"><text class="text-red">219</text>元</view>
					</view>
				</view>
				<view style="font-size: 24rpx;line-height: 80rpx;color: #aaa;padding: 0 30rpx;">请确认信息无误，确认提交后将在24小时内为您开具发票</view>
			</view>
			<view class="padding" style="position: absolute;bottom: 0;width: 100%;">
				<button class="bg-red text-white" @tap="submit">确认提交</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDefault: false,
				list: [{
						name: '企业单位'
					},
					{
						name: '个人/非企业单位'
					}
				],
				value: '',
				isShowCompany:false,
				isSure:false
			};
		},
		onLoad() {
			this.value = this.list[0].name
		},
		methods: {
			chooseType(i) {
				this.currentIndex = i
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(e);
			},
			toAddInvoiceTitle(){
				uni.navigateTo({
					url:"../addInvoiceTitle/addInvoiceTitle"
				})
			},
			showCompanyModel(flag){
				this.isShowCompany = flag
			},
			showSureModel(flag){
				this.isSure = flag
			},
			submit(){
				uni.redirectTo({
					url:"../addInvoiceSuccess/addInvoiceSuccess"
				})
			}
		}
	}
</script>

<style lang="scss">
	.item {
		padding: 0 30rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border: 0;
		}

		.check {
			font-size: 36rpx;
			margin-right: 5rpx;
		}

		.span {
			width: 160rpx;
			font-size: 32rpx;
			color: #333;
		}

		input {
			height: 100rpx;
		}

		.cuIcon-sort {
			font-size: 44rpx;
			padding: 0 10rpx;
		}
	}

	.btn-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
	
	.model-title{
		line-height: 100rpx;
		font-size: 32rpx;
		color: #333;
		padding: 0 30rpx;
		font-weight: 900;
	}
	.model-item{
		line-height: 80rpx;
		border-bottom: 1rpx solid #F1F1F1;
		padding: 0 30rpx;
		.span{
			font-size: 32rpx;
			color: #999999;
		}
		&:first-child{
			border-top: 1rpx solid #F1F1F1;
		}
	}
</style>
