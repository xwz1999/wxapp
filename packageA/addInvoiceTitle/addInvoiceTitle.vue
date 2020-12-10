<template>
	<view>
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
				</view>
				<view class="item flex">
					<view class="span">公司税号<text class="text-red">*</text></view>
					<input class="flex-sub" type="text" value="" placeholder="请填写纳税人识别号" />
				</view>
				<view class="item flex">
					<view class="span">注册地址</view>
					<input class="flex-sub" type="text" value="" placeholder="请填写公司注册地址" />
				</view>
				<view class="item flex">
					<view class="span">注册电话</view>
					<input class="flex-sub" type="text" value="" placeholder="请填写公司注册电话" />
				</view>
				<view class="item flex">
					<view class="span">开户银行</view>
					<input class="flex-sub" type="text" value="" placeholder="请填写公司开户银行" />
				</view>
				<view class="item flex">
					<view class="span">银行账号</view>
					<input class="flex-sub" type="text" value="" placeholder="请填写银行账号" />
				</view>
			</template>

			<template v-if="value==list[1].name">
				<view class="item flex">
					<view class="span">抬头名称<text class="text-red">*</text></view>
					<input class="flex-sub" type="text" value="" placeholder="请填写抬头名称" />
				</view>
			</template>

		</view>
		<view class="box bg-white">
			<view class="flex justify-between align-center" style="padding: 30rpx;">
				<view>
					<view style="font-size: 32rpx;color: #333;">设备默认抬头</view>
					<view style="font-size: 24rpx;color: #666;">每次开票会默认填写该抬头信息</view>
				</view>
				<u-switch v-model="isDefault" active-color="red" inactive-color="#F5F5F5"></u-switch>
			</view>
		</view>
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red text-white" @tap="save">保存</button>
		</view>
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
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin-top: 20rpx;

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
		}
	}

	.btn-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
