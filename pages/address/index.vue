<template>
	<view>
		<view class="address-box">
			<view class="item bg-white" v-for="(item,index) in siteList" :key="index" @tap="chooseAddress(item)">
				<view class="add-con">
					<view class="flex text-black" style="line-height: 80rpx;">
						<view class="name">{{item.name}}</view>
						<view class="phone">{{item.mobile}}</view>
					</view>
					<view>{{item.province+item.city+item.district+item.address}}</view>
				</view>
				<view class="flex justify-between bottom">
					<view class="flex" :class="item.isDefault?'text-red':'text-gray'" @tap.stop="setDefault(index,item.id)">
						<text :class="item.isDefault?'cuIcon-roundcheckfill':'cuIcon-roundcheck'"></text>
						<text>默认地址</text>
					</view>
					<view class="flex btns">
						<text @tap.stop="toAddSite(item)">编辑</text>
						<text @tap.stop="delAddress(item.id)">删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 200rpx;"></view>
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red text-white" @tap="toAddSite()">添加新地址</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				siteList: [],
				fromPage:null
			};
		},
		computed: {
			...mapState(['preOrderMsg'])
		},
		onLoad(options) {
			console.log(options)
			if(options.fromPage){
				this.fromPage = options.fromPage
			}
			this.getAddresslist();
		},
		methods: {
			//更新预览订单的地址信息
			upDateOrder(id) {
				this.$u.post('/api/v1/order_preview/addr/update', {
					userId: uni.getStorageSync("userInfo").id,
					orderId: this.preOrderMsg.id,
					addressId: id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let preOrderMsg = res.data.data
					this.$store.commit('updatePreOrderMsg',preOrderMsg)
					uni.navigateBack()
				});
			},
			chooseAddress(item) {
				if(this.fromPage!="confirmOrder"){
					return
				}
				this.upDateOrder(item.id)
			},
			setDefault(index, id) {
				uni.showModal({
					title: '提示',
					content: '确认将该地址设为默认吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/users/address/default/update', {
								UserID: uni.getStorageSync("userInfo").id,
								AddrID: id
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								// this.getAddresslist()
								for (let i = 0; i < this.siteList.length; i++) {
									this.siteList[i].isDefault = 0
								}
								this.siteList[index].isDefault = 1
								uni.showToast({
									title: "设置成功"
								})

							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			delAddress(id) {
				uni.showModal({
					title: '提示',
					content: '确认要删除该地址吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.$u.post('/api/v1/users/address/remove', {
								UserID: uni.getStorageSync("userInfo").id,
								AddrID: id
							}).then(res => {
								console.log(res.data);
								if (res.data.code == "FAIL") {
									this.$u.toast(res.data.msg);
									return
								}
								this.getAddresslist()
								uni.showToast({
									title: "删除成功"
								})

							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getAddresslist() {
				this.$u.post('/api/v1/users/address/list', {
					UserID: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.siteList = res.data.data
				});
			},
			toAddSite(site) {
				if (site) {
					uni.navigateTo({
						url: '/pages/address/addSite?address=' + JSON.stringify(site)
					});
					return
				}
				uni.navigateTo({
					url: '/pages/address/addSite'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		margin-bottom: 20rpx;

		.add-con {
			padding: 20rpx;
			border-bottom: 1rpx solid #f1f1f1;

			.name {
				font-size: 36rpx;
				font-weight: 900;
			}

			.phone {
				font-weight: 700;
				margin-left: 30rpx;
			}
		}
	}

	.bottom {
		line-height: 60rpx;
		padding: 0 20rpx;

		.btns {
			text {
				padding: 0 15rpx;
			}
		}
	}

	.btn-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
