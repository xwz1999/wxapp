<template>
	<view>
		<view class="top-msg text-center">身份认证仅限一次，请确保认证身份是本人</view>
		<view class="bg-white">
			<view class="item flex">
				<view class="">真实姓名</view>
				<input class="flex-sub" v-model="name" :disabled="disabled" maxlength="30" type="text" value="" placeholder="请输入真实姓名" />
			</view>
			<view class="item flex">
				<view class="">身份证号</view>
				<input class="flex-sub" v-model="cardNo" :disabled="disabled" type="text" value="" placeholder="请输入身份证号" />
			</view>
		</view>
		<button style="margin: 30rpx;background-color: #ddd !important;" disabled v-if="disabled">确认提交</button>
		<button class="text-white bg-red" style="margin: 30rpx;" v-else @tap="toResults">确认提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				cardNo: "",
				disabled:false,
				userInfo:{}
			};
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
			if(this.userInfo.realInfoStatus){
				this.name = this.userInfo.realName
				this.cardNo = this.userInfo.idCard
				this.disabled = true
			}
		},
		methods: {
			toResults() {
				if (!this.name) {
					this.$u.toast("请输入真实姓名");
					return
				}
				if (!this.cardNo) {
					this.$u.toast("请输入身份证号");
					return
				}
				if (this.name.length < 2) {
					this.$u.toast("名字至少两个字符");
					return
				}
				if (this.cardNo.length != 18) {
					this.$u.toast("身份证号必须是18位");
					return
				}
				this.$u.post('/api/v1/users/profile/real_info', {
					userID: uni.getStorageSync("userInfo").id,
					realName: this.name,
					idNum: this.cardNo
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL" && res.data.msg != "认证失败") {
						this.$u.toast(res.data.msg);
						return
					}
					let status
					if (res.data.code == "FAIL") {
						status = 0
					} else {
						status = 1
						this.userInfo.realInfoStatus = true
						this.userInfo.realName = this.name
						this.userInfo.idCard = this.cardNo
						uni.setStorageSync("userInfo", this.userInfo)
					}
					uni.redirectTo({
						url: "/pages/results/results?status=" + status
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	.top-msg {
		line-height: 80rpx;
		background-color: #FFF5E1;
		color: #E9A213;
		padding: 0 30rpx;
	}
	.item {
		line-height: 120rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #f1f1f1;

		view {
			width: 150rpx;
			color: #000;
		}

		input {
			height: 120rpx;
		}

		&:last-child {
			border: 0;
		}
	}
</style>
