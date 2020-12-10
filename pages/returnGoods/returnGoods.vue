<template>
	<view>
		<view class="box bg-white">
			<view class="text-black" style="margin-bottom: 10rpx;">您选择的商品:</view>
			<view class="goods-box flex">
				<view class="goods-pic bg-img" :style="'background-image: url('+ IMAGE_URL+ returnGoods.mainPhotoUrl+');'"></view>
				<view class="goods-con flex-sub clear flex flex-direction justify-between">
					<view class="flex flex-direction <align-start></align-start>">
						<view class="goods-name two-line text-black">{{returnGoods.goodsName}}</view>
						<view class="des">{{returnGoods.skuName}}</view>
					</view>
					<view class="text-red">￥{{returnGoods.actualAmount}}</view>
				</view>
			</view>
		</view>

		<!-- 仅退款 -->
		<view class="box bg-white" v-if="type==0">
			<view class="">
				<view class="flex justify-between" style="line-height: 40rpx;">
					<view class="text-black">退回瑞币</view>
					<view class="text-red">119.00</view>
				</view>
				<view class="flex justify-between coin">
					<view class="">实付款返还到瑞币账户</view>
					<view class="">瑞币数量可修改，最多119.00</view>
				</view>
			</view>
			<view class="flex reason-con">
				<view class="text-black">退款原因</view>
				<input type="text" class="flex-sub text-right" value="" placeholder="请填写退款原因200字以内" />
			</view>
		</view>

		<!-- 退货退款 -->
		<view class="box bg-white" v-if="type==1">
			<view class="flex justify-between reason-con" style="border-top: 0;" @tap="showModel">
				<view class="text-black">退款原因<text class="text-red">*</text></view>
				<view class="flex">{{checkedReason.content?checkedReason.content:'选择原因'}}<text class="cuIcon-right" style="color: #DDDDDD;"></text></view>
			</view>
			<view class="flex justify-between reason-con" v-if="checkedReason.content=='其他'">
				<view class="text-black">退货原因</view>
				<input type="text" v-model="reasonTxt" class="flex-sub text-right" value="" placeholder="请填写退货原因200字以内" />
			</view>
		</view>

		<!-- 上传凭证 -->
		<view class="box bg-white">
			<view class="text-black" style="padding-bottom: 10rpx;">上传凭证</view>
			<view class="image-box flex flex-wrap">
				<view class="image-item bg-img" v-for="(item,index) in images" :key="index" :style="'background-image: url('+IMAGE_URL+item+');'">
					<text class="cuIcon-roundclosefill" @tap="delImage(index)"></text>
				</view>
				<view v-if="images.length<maxLength" class="flex flex-direction justify-center align-center upload" @tap="chooseImage">
					<text class="cuIcon-pic" style="font-size: 48rpx;"></text>
					<view class="">上传图片</view>
					<view class="">(最多{{maxLength}}张)</view>
				</view>
			</view>
		</view>

		<u-popup v-model="isShow" mode="bottom" border-radius="20">
			<view class="reason-model">
				<view class="item flex justify-between align-center" v-for="(item,index) in reasons" :key="index" @tap="chooseReason(index)">
					<text>{{item.content}}</text>
					<text class="check" :class="currentIndex==index?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"></text>
				</view>
			</view>
			<view class="text-center" style="line-height: 100rpx;" @tap="closeModel">确定</view>
		</u-popup>

		<view class="" style="height: 100rpx;"></view>
		<view class="bottom-btn text-white text-center" @tap="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				isShow: false,
				reasons: [],
				currentIndex: -1,
				checkedReason: {},
				images: [],
				reasonTxt: "",
				type: "",
				maxLength:5
			};
		},
		computed: {
			returnGoods() {
				return this.$store.state.returnGoodsMsg
			}
		},
		onLoad(options) {
			this.type = options.type
			uni.setNavigationBarTitle({
				title: this.type == 0 ? "退款申请" : this.type == 1 ? "退货申请" : ""
			})
			this.getReasons()
		},
		methods: {
			getReasons() {
				this.$u.post('/api/v1/order/get_after_sales/resson').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.reasons = res.data.data
					this.reasons.push({
						id: 0,
						content: "其他"
					})
				});
			},
			showModel() {
				this.isShow = true
			},
			closeModel() {
				this.checkedReason = this.reasons[this.currentIndex]
				this.isShow = false
			},
			chooseReason(i) {
				this.currentIndex = i
			},
			//删除图片
			delImage(i) {
				uni.showModal({
					title: '提示',
					content: '确认要删除该图片吗',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.images.splice(i, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			chooseImage() {
				uni.chooseImage({
					count: this.maxLength, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						console.log(res.tempFilePaths);
						let pics = res.tempFilePaths
						for (let i = 0; i < pics.length; i++) {
							this.uploadPic(pics[i])
						}
					}
				});
			},
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
							if (this.images.length < this.maxLength) {
								this.images.push(result.data.data.url)
							} else {
								this.$u.toast("最多上传"+this.maxLength+"张图片");
							}
						}
					}
				});
			},
			submit() {
				console.log(this.type)
				if (this.type==1&&!this.checkedReason) {
					this.$u.toast("请选择退款原因");
					return
				}
				if (this.images.length == 0) {
					this.$u.toast("请上传凭证");
					return
				}
				let sendData = {
					orderGoodsIds: [this.returnGoods.goodsDetailId],
					reasonContent: this.reasonTxt,
					reasonImg: this.images.join(",")
				}
				if(this.checkedReason.id){
					sendData.reasonId = this.checkedReason.id
				}
				this.$u.post('/api/v1/order/return', sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.navigateTo({
						url: "/pages/afterSaleDetail/afterSaleDetail?orderGoodsId="+this.returnGoods.goodsDetailId
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		border-radius: 10rpx;
		margin: 30rpx;
		padding: 25rpx;

		.goods-pic {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}

		.des {
			background-color: #F1F1F1;
			line-height: 40rpx;
			border-radius: 8rpx;
			padding: 0 15rpx;
			color: #AAAAAA;
			font-size: 24rpx;
			margin-top: 10rpx;
		}

		.coin {
			font-size: 24rpx;
			color: #AAAAAA;
			padding: 10rpx 0 15rpx;

		}

		.reason-con {
			line-height: 80rpx;
			border-top: 1rpx solid #f1f1f1;

			input {
				margin-left: 50rpx;
				height: 80rpx;
			}
		}

		.image-box {
			&>view {
				width: 145rpx;
				height: 145rpx;
				border-radius: 10rpx;
				margin: 10rpx 0;
				margin-right: 20rpx;
				font-size: 20rpx;
				color: #AAAAAA;

				&:nth-child(4n) {
					margin-right: 0;
				}
			}

			.upload {
				border: 1rpx solid #DDDDDD;
				box-sizing: border-box;
			}

			.image-item {
				position: relative;

				.cuIcon-roundclosefill {
					font-size: 32rpx;
					position: absolute;
					right: 5rpx;
					top: 5rpx;
					color: rgba(0, 0, 0, 0.6);
				}
			}
		}

	}

	.reason-model {
		padding: 30rpx;

		.item {
			line-height: 80rpx;
			border-bottom: 1rpx solid #F1F1F1;
		}

		.check {
			font-size: 34rpx;
		}
	}

	.bottom-btn {
		position: fixed;
		width: 100%;
		bottom: 0;
		line-height: 100rpx;
		background-color: #C92219;
	}
</style>
