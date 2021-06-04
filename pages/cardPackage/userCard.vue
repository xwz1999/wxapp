<template>
	<view class="">
		<view class="img">
			<image v-if="status" :src="IMAGE_URL + '/shop/img_recharge_success.png'" mode="widthFix" style="width: 136rpx;"></image>
			<image v-else :src="IMAGE_URL + '/shop/img_recharge_error.png'" mode="widthFix" style="width: 136rpx;"></image>
		</view>
		<view class="txt">
			<view class="text-center" v-if="status">
				恭喜您使用成功
			</view>
			<view class="text-center" v-else>
				<view class="">
					使用失败！
				</view>
				<view class="">
					您已使用了一张权益卡，请勿重复使用
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				status:false
			}
		},
		methods:{
				getData(id){
					let sendData = {
						cardId:id
					}
					this.$u.post('/api/v2/app/user/welfare/use', sendData).then(res => {
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							this.status = false
							return
						}
						this.status = true
					})
				},
				giveCard(id,giveId){
					let sendData = {
						cardId:id,
						giveUserId:giveId
					}
					this.$u.post('/api/v2/app/user/welfare/give', sendData).then(res => {
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							this.status = false
							return
						}
						this.status = true
					})
				}
		},
		onLoad(option) {
			if(option.giveUserId){
				let id = parseInt(option.cardId)
				let giveId = parseInt(option.giveUserId)
				this.giveCard(id,giveId)
			}else if(option.cardId){
				let id = parseInt(option.cardId)
				this.getData(id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img{
		width: 136rpx;
		margin: 148rpx auto 20rpx;
	}
	.txt{
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
</style>
