<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="name" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="number" v-model="mobile" maxlength="11" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<picker mode="region" @change="chooseAddress">
				<view class="item">
					<view class="left">所在地区</view>
					<view class="flex-sub">{{address?address:'请选择省市区'}}</view>
				</view>
			</picker>

			<view class="item address" style="height: auto;">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="detail" placeholder-class="line" placeholder="街道、楼牌等" />
				</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<!-- <view class="tag">
				<view class="left">标签</view>
				<view class="right">
					<text class="tags">家</text>
					<text class="tags">公司</text>
					<text class="tags">学校</text>
					<view class="tags plus"><u-icon size="22" name="plus"></u-icon></view>
				</view>
			</view> -->
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<u-switch v-model="isDefault" active-color="red" inactive-color="#F5F5F5"></u-switch>
			</view>
		</view>
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red text-white cu-btn lg block" @tap="addAddress">保存</button>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" @confirm="chooseAddress"/>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			isDefault:false,
			name:"",
			mobile:"",
			address:"",
			detail:"",
			addressList:[],
			addressId:null
		};
	},
	onLoad(options) {
		if(options.address){
			let site = JSON.parse(options.address)
			this.name = site.name
			this.mobile = site.mobile
			this.addressList = [site.province,site.city,site.district]
			this.address = this.addressList.join(" ")
			this.detail = site.address
			this.isDefault = site.isDefault==1?true:false
			this.addressId = site.id
		}
	},
	methods: {
		showRegionPicker() {
			this.show = true;
		},
		chooseAddress(e){
			console.log(e)
			this.addressList = e.detail.value
			this.address = this.addressList.join(" ")
		},
		addAddress(){
			if(!this.name){
				this.$u.toast("请填写收货人姓名");
				return
			}
			if(!this.mobile){
				this.$u.toast("请填写手机号");
				return
			}
			if(!this.address){
				this.$u.toast("请选择省市区");
				return
			}
			if(!this.detail){
				this.$u.toast("请填写详细地址");
				return
			}
			let sendData = {
				Name:this.name,
				Mobile:this.mobile,
				Province:this.addressList[0],
				City:this.addressList[1],
				District:this.addressList[2],
				Address:this.detail,
				IsDefault:this.isDefault?1:0,
				UserID:uni.getStorageSync("userInfo").id
			}
			let url
			if(this.addressId){
				sendData.AddrID = this.addressId
				url = "/api/v1/users/address/update"
			}else{
				url = "/api/v1/users/address/add"
			}
			this.$u.post(url,sendData).then(res => {
				console.log(res.data);
				if (res.data.code == "FAIL") {
					this.$u.toast(res.data.msg);
					return
				}
				uni.showToast({
					title:"保存成功",
					success: (res) => {
						setTimeout(function(){
							let pages = getCurrentPages();
							let prevPage = pages[pages.length - 2];  //刷新上一个页面
							prevPage.onLoad()
							uni.navigateBack()
						},1000)					
					}
				})
			});
		},
	}
};
</script>

<style lang="scss">
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 45rpx;
			padding: 30rpx 0;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
				flex: 1;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 20rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>
