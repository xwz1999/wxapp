<template>
	<view class="">
		<view class="flex justify-between align-start bg-white" style="margin: 25rpx;padding: 20rpx;">
			<textarea v-if="!isNew" class="flex-sub textarea" v-model="content" />
			
			<input v-if="isNew" type="nickname" class="weui-input" placeholder="请输入昵称" v-model="content" />
			
			<text class="cuIcon-roundclosefill" @tap="clearContent"></text>
		</view>
		<view style="margin: 0 25rpx;">
			<button class="bg-red cu-btn text-white lg block" @tap="update">确认</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:"",
				content:"",
				userInfo:{},
				isNew:false,
			}
		},
		onLoad(options) {
			this.type= options.type
			this.content = options.content
			this.userInfo = uni.getStorageSync("userInfo")
			let that = this
			uni.getSystemInfo({
				complete() {
					
				},
				success(res) {	
					console.log(res.hostSDKVersion)
					
					if(res.hostSDKVersion>='2.21.2'){
						that.isNew = true
					}
				},
				fail() {
					
				}
			})
		},
		methods:{
			clearContent(){
				this.content = ""
			},
			update(){
				console.log("上传更新")
				let reqUrl = ""
				let sendData = {
					userID: uni.getStorageSync("userInfo").id
				}
				switch (this.type){
					case "nickname":
						reqUrl = "/api/v1/users/profile/nickname/update"
						sendData.nickname = this.content
						break;
					case "mobile":
						reqUrl = "/api/v1/users/profile/phone/update"
						sendData.phone = this.content
						break;
					case "wechatNo":
						reqUrl = "/api/v1/users/profile/wechat-no/update"
						sendData.wechatNo = this.content
						break;
					case "remark":
						reqUrl = "/api/v1/users/profile/invite/remark-name/update"
						sendData.remarkName = this.content
						sendData.userID = this.$store.state.userInfo.userId
						break;	
					default:
						break;
				}
				this.$u.post(reqUrl, sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					 //修改备注之后在店铺 团队 推荐 奖励 更新数据
					uni.$emit("userInfoEidt", {
						msg: '用户修改',
					});
					if(this.type=="remark"){
						this.$store.state.userInfo.remarkName = this.content
						uni.navigateBack()
						return
					}
					switch (this.type){
						case "nickname":
							this.userInfo.nickname = this.content
							// uni.showToast({
							// 	title:"昵称已更新"
							// })
							break;
						case "mobile":
							this.userInfo.phone = this.content
							// uni.showToast({
							// 	title:"手机号已更新"
							// })
							break;
						case "wechatNo":
							this.userInfo.wechatNo = this.content
							// uni.showToast({
							// 	title:"微信号已更新"
							// })
							break;
						default:
							break;
					}
					uni.setStorageSync("userInfo",this.userInfo)
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];  //上一个页面
					prevPage.onLoad()
					
					uni.navigateBack()
					// setTimeout(function(){
					// 	uni.navigateBack()
					// 	let pages = getCurrentPages();
					// 	let prevPage = pages[pages.length - 2];  //上一个页面
					// 	prevPage.onLoad()
					// },1500)
				});
			}
		}
	}
</script>

<style>
	.textarea{
		line-height: 40rpx;
	}
	.cuIcon-roundclosefill{
		color: rgba(0,0,0,0.5);
		margin-left: 20rpx;
		font-size: 36rpx;
	}
</style>
