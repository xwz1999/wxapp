<template>
	<view class="apply_box">
		<div class="diaTitle">请填写以下信息</div>
		<view class="list">
			<view class="li">
				<view class="lf">
					<text>姓名</text>
				</view>
				<view class="rg">
					<input class="uni-input" v-model="fromData.name" focus placeholder="输入姓名" />
				</view>
			</view>
			<view class="li">
				<view class="lf">
					<text>手机号</text>
				</view>
				<view class="rg">
					<input class="uni-input" maxlength="11" type="number" v-model="fromData.Phone" placeholder="输入手机号" />
				</view>
			</view>
			<view class="li">
				<view class="lf">
					<text>微信号</text>
				</view>
				<view class="rg">
					<input class="uni-input" v-model="fromData.wechat" placeholder="输入微信号" />
				</view>
			</view>
			<view class="li">
				<view class="lf">
					<text>社群粉丝数量</text>
				</view>
				<view class="rg">
					<input class="uni-input" v-model="fromData.socialFansNum" type="number" placeholder="输入社群粉丝数量" />
				</view>
			</view>
			<view class="li">
				<view class="lf">
					<text>曾做过的平台</text>
				</view>
				<view class="rg">
					<input class="uni-input" v-model="fromData.platformBefore" placeholder="例如：云集、返利网" />
				</view>
			</view>
			<view class="li">
				<view class="lf">
					<text>月最高销售额</text>
				</view>
				<view class="rg">
					<input class="uni-input" v-model="fromData.highestSocialRecord" type="digit" placeholder="输入销售额" />
				</view>
				<text>万</text>
			</view>
			<view class="li">
				<view class="lf">
					<text>所在地区</text>
				</view>
				<view class="rg flex justify-between align-center">
					<picker mode="region" @change="chooseAddress" style="flex: 1;">
						<text style="color: #757575;" v-if="!address">收货地址</text>
						<text v-else>{{address}}</text>
					</picker>
					<text class="cuIcon-right  text-gray"></text>
				</view>

			</view>
		</view>
		
		<!-- https://h5.reecook.cn/app/autoopen.html -->
		<view class="mybotton sub" v-if="subBool" @click="sub">提交</view>
		<view v-else class="mybotton">提交</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				fromData:{
					name:null,
					Phone: null,
					wechat: null,
					province: null,
					city: null,
					zone: null,
					socialFansNum:null,
					platformBefore: null,
					highestSocialRecord:null,
					introCode: 'UEU1P3P9'
				},
				address: null,
				subBool:false,
			};
		},
		computed:{
			comSubBool (){
				 let arr;
				if ((arr = Object.keys(this.fromData).filter(v=>!this.fromData[v])).length<=0) {
					this.subBool = true
				}else{
				  this.subBool = false
				}
			}
		},
		
		methods: {
			sub() {
				this.$u.post('/api/v1/diamond_register/inform', {
					name:this.fromData.name,
					Phone: this.fromData.Phone,
					wechat: this.fromData.wechat,
					province: this.fromData.province,
					city: this.fromData.city,
					zone: this.fromData.zone,
					socialFansNum:parseInt(this.fromData.socialFansNum),
					platformBefore: this.fromData.platformBefore,
					highestSocialRecord:parseInt(this.fromData.highestSocialRecord),
					introCode: this.fromData.introCode
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.navigateTo({
						url: "./success"
					})
				})
			},
			chooseAddress(e) {
				console.log(e)
				this.fromData.province = e.detail.value[0]
				this.fromData.city= e.detail.value[1]
				this.fromData.zone= e.detail.value[2]
				this.address =e.detail.value.join(' ')
				console.log(this.address)
			}
		},
		onLoad(options) {
			this.introCode = options.code
			console.log(options)
		}
	}
</script>

<style scoped lang="scss">
	.list {
		.li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #f8f8f8;
			padding: 20rpx 0rpx;

			.lf {
				width: 220rpx;
				font-size: 32rpx;
				color: #000;
			}

			.rg {
				flex: 1;
			}
		}
	}

	.apply_box {
		width: 750rpx;
		height: 100vh;
		background: #FFFFFF;
		padding: 20rpx 40rpx;
	}

	.mybotton {
		background: grey;
		text-align: center;
		color: #fff;
		line-height: 90rpx;
		border-radius: 8rpx;
		font-size: 36rpx;
		margin-top: 80rpx;
		-webkit-box-shadow: 2rpx 4rpx 6rpx #dedede;
		box-shadow: 2rpx 4rpx 6rpx #dedede;

		&.sub {
			background: #d5101a;
			-webkit-box-shadow: 2rpx 4rpx 6rpx #f1b1b4;
			box-shadow: 2rpx 4rpx 6rpx #f1b1b4;
		}
	}

	.diaTitle {
		font-size: 36rpx;
		border-left: 6rpx solid #da2e38;
		padding-left: 20rpx;
		font-weight: 700;
		margin-bottom: 20rpx;
	}
</style>
