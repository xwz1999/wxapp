<template>
	<view>
		<view class="null flex flex-direction justify-center align-center" v-if="isNull"
			style="width: 100vw;height: 80vh;">
			<image :src="STATIC_URL+'null04.png'" style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 24rpx;color: #AAAAAA;margin-top: 10rpx;">暂无地址</view>
		</view>
		<view class="address-box" v-else>
			<view class="item bg-white" v-for="(item,index) in siteList" :key="index" @tap="chooseAddress(item)">
				<view class="add-con">
					<view class="flex text-black" style="line-height: 80rpx;">
						<view class="name">{{item.name}}</view>
						<view class="phone">{{item.mobile}}</view>
					</view>
					<view>{{item.province+item.city+item.district+item.address}}</view>
				</view>
				<view class="flex justify-between bottom">
					<view class="flex" :class="item.isDefault?'text-red':'text-gray'"
						@tap.stop="setDefault(index,item.id)">
						<text :class="item.isDefault?'cuIcon-roundcheckfill':'cuIcon-roundcheck'"></text>
						<text>默认地址</text>
					</view>
					<view class="flex btns">
						<text @tap.stop="toAddSite(item)">编辑</text>
						<text @tap.stop="delAddress(index,item.id)">删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 200rpx;"></view>
		<view class="btn-box" style="padding: 30rpx;">
			<button class="bg-red cu-btn lg block text-white" @tap="toAddSite()">添加新地址</button>
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
				fromPage: null,
				isNull: false,
				STATIC_URL: this.STATIC_URL,
				type: 0
			};
		},
		computed: {
			...mapState(['preOrderMsg']),
			// 数组siteList排序
			sortstudents: function() {
				return this.sortByKey(this.siteList, 'isDefault')
			}

		},
		onLoad(options) {
			console.log(options)
			if (options && options.fromPage) {
				this.fromPage = options.fromPage
			}
			this.getAddresslist();
		},
		methods: {
			//数组对象排序
			sortByKey(array, key) {
				return array.sort(function(a, b) {
					let x = a[key];
					let y = b[key];
					return ((x > y) ? -1 : ((x < y) ? 1 : 0));
				})
			},
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
					this.$store.commit('updatePreOrderMsg', preOrderMsg)
					uni.navigateBack()
				});
			},
			chooseAddress(item) {
				if (this.fromPage === "goodsDetail") {
					// getCurrentPages()[getCurrentPages().length-2].setData({
					//     selectedAddress:item
					// });
					let selectedAddress = []
					// this.siteList.forEach(item => {
					// 	if (item.isDefault === 1) {
					// 		selectedAddress = item
					// 	}
					// })
					// getCurrentPages()[getCurrentPages().length - 2].setData({
					// 	selectedAddress:item
					// });
					getCurrentPages()[getCurrentPages().length - 2].$vm.selectedAddress=item
					uni.navigateBack();
					return
				} else if (this.fromPage != "confirmOrder") {
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
			delAddress(index, id) {
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
								this.siteList.splice(index, 1)
								if (this.siteList.length == 0) {
									this.isNull = true
								}
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
					console.log(this.siteList)
					if (this.siteList.length == 0) {
						this.isNull = true
					} else {
						this.isNull = false
					}
				});
			},
			toAddSite(site) {
				if (site) {
					uni.navigateTo({
						url: '/packageA/address/addSite?address=' + JSON.stringify(site)
					});
					return
				}
				uni.navigateTo({
					url: '/packageA/address/addSite'
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
