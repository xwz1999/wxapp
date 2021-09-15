<template>
	<view>
		<view class="top-box flex justify-between align-center bg-white" @tap="chooseImage">
			<view class="">头像</view>
			<view class="flex align-center right">
				<view class="avatar">
					<u-lazy-load threshold="-100" :image="IMAGE_URL+info.headImgUrl" :index="index" height="120" border-radius="60" :loading-img="IMAGE_URL + '/null05.png'"  :error-img="IMAGE_URL + '/null05.png'"  img-mode="aspectFill"></u-lazy-load>
				</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="bg-white">
			<view class="item bg-white flex justify-between align-center" @tap="toChangeInfo('nickname',info.nickname)">
				<view class="">昵称</view>
				<view class="flex right">
					<view class="">{{info.nickname}}</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="item bg-white flex justify-between align-center">
				<view class="">用户ID</view>
				<view class="flex right">
					<view class="">{{identifier}}</view>
			
				</view>
			</view>
			<picker mode="selector" :range="sex" :value="defaultSex" @change="chooseSex">
				<view class="item bg-white flex justify-between align-center">
					<view class="">性别</view>
					<view class="flex right">
						<view class="">{{info.gender==1?"男":info.gender==2?"女":"未知"}}</view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</picker>
			<picker mode="date" @change="chooseDate">
				<view class="item bg-white flex justify-between align-center">
					<view class="">生日</view>
					<view class="flex right">
						<view class="">{{info.birthday}}</view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</picker>
			<view class="item bg-white flex justify-between align-center" @tap="toRealname">
				<view class="">实名认证</view>
				<view class="flex right">
					<view class="">{{info.realInfoStatus?"已认证":"未认证"}}</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="item bg-white flex justify-between align-center" @tap="toChangeInfo('mobile',info.phone)">
				<view class="">手机号</view>
				<view class="flex right">
					<view class="">{{info.phone}}</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="item bg-white flex justify-between align-center" @tap="toChangeInfo('wechatNo',info.wechatNo)">
				<view class="">微信号</view>
				<view class="flex right">
					<view class="">{{info.wechatNo}}</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				info: {},
				identifier:null,
				sex:["男","女"],
				defaultSex:0
			};
		},
		onShow() {
			this.info = uni.getStorageSync("userInfo")
			this.identifier = uni.getStorageSync("userId")
			// this.$u.post('/api/v1/users/profile/me', {userId:this.identifier}).then(res=>{
			// 	console.log(res)
			// })
			console.log(this.info)
			this.info.birthday = this.info.birthday.split(" ")[0]
			if(this.info.gender==1){
				this.defaultSex = 0
			}else if(this.info.gender==2){
				this.defaultSex = 1
			}
		},
		methods: {
			//选择性别
			chooseSex(e){
				let index = e.detail.value
				let gender
				if(index==0){
					gender = 1
				}else if(index==1){
					gender = 2
				}
				this.$u.post('/api/v1/users/profile/gender/update', {
					userID: uni.getStorageSync("userInfo").id,
					gender: gender
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					// uni.showToast({
					// 	title: "性别已更新"
					// })
					this.info.gender = gender
					//头像更新成功，本地头像也更新
					uni.setStorageSync("userInfo", this.info)
				});
			},
			//选择生日
			chooseDate(e) {
				let date = e.detail.value
				this.$u.post('/api/v1/users/profile/birthday/update', {
					userID: uni.getStorageSync("userInfo").id,
					birthday: date.split("-").join("")
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					// uni.showToast({
					// 	title: "生日已更新"
					// })
					this.info.birthday = date
					//头像更新成功，本地头像也更新
					uni.setStorageSync("userInfo", this.info)
				});
			},
			//跳转修改信息
			toChangeInfo(type, con) {
				uni.navigateTo({
					url: "/packageA/myInfo/updateContent?content=" + con + "&type=" + type
				})
			},
			toRealname(){
				uni.navigateTo({
					url:"/packageA/realname/realname"
				})
			},
			//选择图片
			chooseImage() {
				uni.showActionSheet({
					itemList: ["拍照", "从手机相册选择"],
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						let index = res.tapIndex
						let type = []
						index == 0 ? type = ["camera"] : type = ["album"]
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: type,
							success: (res) => {
								console.log(res.tempFilePaths);
								let url = res.tempFilePaths[0]
								this.uploadPic(url)
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			//上传头像图片
			uploadPic(url) {
				uni.uploadFile({
					url: this.BASE_URL + '/api/v1/files/photo/upload',
					filePath: url,
					name: 'photo',
					success: (res) => {
						let result = JSON.parse(res.data)
						console.log(result)
						if (result.code == "SUCCESS") {
							console.log(result.data.data.url)
							let url = result.data.data.url
							this.updateAvatar(url)
						} else {
							this.$u.toast(result.msg);
						}
					}
				});
			},
			//更新头像
			updateAvatar(url) {
				this.$u.post('/api/v1/users/profile/head_pic/update', {
					userID: uni.getStorageSync("userInfo").id,
					headUrl: url
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					// uni.showToast({
					// 	title: "头像已更新"
					// })
					this.info.headImgUrl = url
					//头像更新成功，本地头像也更新
					uni.setStorageSync("userInfo", this.info)
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		font-size: 30rpx;
	}
	.top-box {
		padding: 0 20rpx;
		margin: 20rpx 0;
		height: 160rpx;
		color: #333333;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
	}

	.item {
		color: #333333;
		padding: 0 20rpx;
		height: 100rpx;
		border-bottom: 1rpx solid #f1f1f1;

	}

	.right {
		color: #aaaaaa;
		line-height: 40rpx;

		.cuIcon-right {
			margin-left: 10rpx;
		}
	}
</style>
