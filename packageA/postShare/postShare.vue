<template>
	<view style="width: 100%;height: 100vh;">
		<scroll-view
			style="display: flex;white-space: nowrap;height: 200rpx;width: 100%;margin-top: 20rpx;padding-left: 20rpx;margin-bottom: 20rpx;"
			scroll-x>
			<view style="display: inline-block;position: relative;" v-for="(item,index) in goodsDetail.mainPhotos"
				:key="index" @tap="selectImg(item)">
				<view v-if="item.isSelectNumber>0&&item.isSelect" class="selectNum">
					{{item.isSelectNumber}}
				</view>
				<image :class="[item.isSelect?'chooseImg':'noChooseImg']" :src="item.url"></image>
			</view>


		</scroll-view>


		<view class="canvasBg">
			<view class="weather-box flex justify-between align-center">
				<view class="flex align-center" v-if="weatherMsg">
					<view class="">
						<view style="font-size: 24rpx;color: #000;">{{text1}}</view>
						<view style="text-align: right;font-size: 24rpx;color: #000;">{{text2}}
						</view>
					</view>
				</view>
				<view class="text-right" v-if="weatherMsg">
					<view style="font-size: 24rpx;color: #000;">{{text3}}</view>
					<view style="font-size: 24rpx;color: #000;">{{lunarDate}}</view>
				</view>
			</view>
			<view class="userInfo">
				<image class="img" :src="headImg"></image>
				<view class="info">
					<u-tag v-if="goodsDetail.vendorId===1800" text="京东自营" size="mini" bgColor="#D5101A" color="#fff">
					</u-tag>
					<u-tag v-else-if="goodsDetail.vendorId===2000" text="京东POP" size="mini" bgColor="#D5101A"
						color="#fff"></u-tag>

					<text style="font-size: 28rpx;color: #000;margin-top: 10rpx;">{{userInfo.nickname}}的店铺</text>
					<text style="font-size: 20rpx;color: #666666;margin-top: 10rpx;">数字化批发零售服务平台</text>
				</view>
			</view>
			<view>
				<image class="postImg" :src="judgeCover(bigImgUrl)" mode="widthFix"></image>
			</view>

			<view class="centerImg" :style="'background-image: url('+IMAGE_URL+'/wxapp/post_bg.png)'">
				<text class="" style="font-size: 28rpx;color: #fff;">全球精品|</text>
				<text class="" style="font-size: 28rpx;color: #fff;">正品保障|</text>
				<text class="" style="font-size: 28rpx;color: #fff;">售后无忧</text>
			</view>
			<view class="priceInfo">
				<view style="display: flex; width: 100%;">
					<view style="display: flex;flex-direction: column;width: 70%;">
						<view style="display: flex;margin-top: 30rpx;">
							<text class="text-red ">￥</text>
							<text style="font-size: 36rpx;line-height: 36rpx;color: #e54d42;">{{(price)}}</text>
							<text class="text-gray "
								style="text-decoration: line-through;margin-left: 10rpx;">￥{{crossedPrice}}</text>
						</view>
						<text class=""
							style="margin-top: 10rpx;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:4; ">{{goodsName}}</text>
					</view>
					<view
						style="width: 30%;flex-direction: column;display: flex;justify-content: center;align-items: center;">


						<image :src="qrPath" style="width: 180rpx;height: 180rpx;position:relative;right: -20rpx;">
						</image>

						<text class=""
							style="font-size: 16rpx;margin: 0 auto;position:relative;top:-10rpx;left: 20rpx;">长按二维码立购</text>
					</view>
				</view>
			</view>

			<view style="display: flex;overflow: hidden;margin: 20rpx 0 ;">

				<image class="bottomImg" :src="item.url" v-for="(item,index) in bottomImages" :key="index"
					:style="{minWidth:btImgWidth + 'rpx',height:btImgWidth + 'rpx'}" mode="aspectFit"></image>

			</view>




		</view>




		<view class="bottom ">
			<button class="button " @click="saveImageToPhotosAlbum">生成海报</button>
		</view>


	</view>

	</view>
</template>




<script>
	import {
		calendar
	} from '@/utils/calendar.js'
	import XinyuCanvasDrawer from "@/uni_modules/xinyu-canvas-drawer/index.vue";
	export default {
		components: {
			XinyuCanvasDrawer
		},
		data() {
			return {
				qrPath: '',
				IMAGE_URL: this.IMAGE_URL,
				headImg: '',
				weatherMsg: null,
				lunarDate: '',
				cityName: '',
				userInfo: null,
				price: '',
				crossedPrice: '',
				goodsDetail: null,
				goodsName: '',
				code: '',
				invitationNo: '',
				posterImg: "",
				text1: '',
				text2: '',
				text3: '',
				text4: '',
				storeName: '',
				postPath: '',
				chooseImgs: [], ///选中的图片列表
				selectImages: [],
				bigImgUrl: '',
				bottomImages: [],
				btImgWidth:680
			}

		},
		async onLoad(options) {
			console.log(options)
			var goods = uni.getStorageSync("postGoods")

			if (goods) {
				this.goodsDetail = goods
				console.log(this.goodsDetail)
				this.price = this.getPriceString(this.goodsDetail.price.min.discountPrice, this.goodsDetail.price.max
					.discountPrice, )
				this.crossedPrice = this.goodsDetail.price.max
					.originalPrice.toFixed(2)
				this.goodsName = this.goodsDetail.goodsName

				this.invitationNo = uni.getStorageSync("userInfo").invitationNo
				this.code = 'https://mallh5.reecook.cn/#/goods/detail/' + this.goodsDetail.id + '/' + this
					.invitationNo + '/share'

				this.weatherMsg = uni.getStorageSync("weatherMsg");
				this.cityName = uni.getStorageSync("localCity")
				this.userInfo = uni.getStorageSync("userInfo")
				this.$set(this.weatherMsg, 'date', this.weatherMsg.date.replace(/-/g, '.'))
				// 日期转农历格式
				let cur_date = this.weatherMsg.date.split('.')
				let lunarDetail = calendar.solar2lunar(cur_date[0], cur_date[1], cur_date[2])
				this.lunarDate = lunarDetail.gzYear + "年" + lunarDetail.IMonthCn + lunarDetail.IDayCn


				this.headImg = this.IMAGE_URL + '/wxapp/ic_launcher-playstore.png'
				this.text1 = '[' + this.cityName + ']天气：' + this.weatherMsg.wea
				this.text2 = '湿度：' + this.weatherMsg.humidity + ' 温度' + this.weatherMsg.tem2 + '-' + this.weatherMsg
					.tem1 +
					'℃ 空气质量：' + this.weatherMsg.air_level

				this.text3 = this.weatherMsg.date + ' ' + this.weatherMsg.week

				this.storeName = this.userInfo.nickname + '的店铺'
				this.qrPath = "https://img.reecook.cn/qr?text=" + this.code + "&size=180&fcolor=000000&bcolor=ffffff"

				this.imgList = this.goodsDetail.mainPhotos
				this.bigImgUrl = this.goodsDetail.mainPhotos[0].url

				for (var i = 0; i < this.imgList.length; i++) {
					this.imgList[i].isSelect = false
					this.imgList[i].isSelectNumber = 0
				}
				console.log(this.imgList)

			}
		},

		methods: {
			selectImg(photo) {
				photo.isSelect = !photo.isSelect;
				if (photo.isSelect) {
					photo.isSelectNumber = this.selectImages.length + 1;
					this.selectImages.push(photo);

				} else {
					this.selectImages.splice(this.selectImages.indexOf(photo), 1)
				}

				for (var i = 0; i < this.selectImages.length; i++) {
					this.selectImages[i].isSelectNumber = this.selectImages.indexOf(this.selectImages[i]) + 1;
				}

				console.log(this.selectImages)
				console.log(photo)

				if (this.selectImages.length > 0) {
					this.bigImgUrl = this.selectImages[0].url
				}

				this.bottomImages = this.selectImages.slice(1, this.selectImages.length)
				this.btImgWidth = 690/this.bottomImages.length


			},
			saveImageToPhotosAlbum() {
				uni.navigateTo({
					url: '/packageA/postResult/postResult?bigImgUrl='
					+this.bigImgUrl+'&bottomImages='+ encodeURIComponent(JSON.stringify(this.bottomImages))
				})
			},
			judgeCover(val) {

				if (!val) {
					return
				}
				let arr = val.split('/')
				console.log(arr)
				console.log(arr[0])
				console.log(arr[1])
				if (arr[0] === 'https:') {
					return val
				} else if (arr[0] === 'http:') {
					var result = val.replace('http', 'https')
					return result
				}
				return this.IMAGE_URL + val
			},



			getPriceString(minPrice, maxPrice) {
				var returnPrice = '';
				console.log(minPrice)
				console.log(maxPrice)
				if (minPrice == maxPrice) {
					maxPrice.toString()
					returnPrice = maxPrice.toFixed(2)
				} else {
					returnPrice = minPrice.toFixed(2) + '-' + maxPrice.toFixed(2)
				}
				return returnPrice;
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100vh;
		height: 100vh;

		background: rgb(245, 245, 245);

	}

	.bottomImg {
		flex: 1
	}

	.selectNum {
		position: absolute;
		right: 20rpx;
		top: 10rpx;
		width: 45rpx;
		height: 45rpx;
		border-radius: 20rpx;
		background-color: #d5101a;
		color: #fff;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
	}

	.chooseImg {
		width: 200rpx;
		height: 200rpx;
		margin-right: 10rpx;
		border: 2rpx solid #d5101a;
	}

	.noChooseImg {
		width: 200rpx;
		height: 200rpx;
		margin-right: 10rpx;
		border: 2rpx solid #9E9E9E;
	}

	.canvas {
		position: fixed;
		left: -999999rpx;
		top: -999999rpx;
	}

	.userInfo {
		//margin: 20rpx ;
		display: flex;

		.img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 20rpx;
			margin-right: 30rpx;
		}

		.info {
			display: flex;
			flex-direction: column;
		}
	}

	.priceInfo {
		padding-left: 10rpx;
	}

	.centerImg {
		background-size: 100% 50px;
		background-repeat: no-repeat;
		margin: 0px;
		margin-bottom: 0;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.postImg {
		margin: 10rpx auto 0rpx;
		width: 600rpx;
		height: 600rpx;
		//border-radius: 10rpx;
	}


	.bottom {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;

		.button {
			height: 50px;
			background: #d64713;
			width: 90%;
			border-radius: 50rpx;
			margin: 20rpx auto;
			color: #fff;
		}
	}

	.canvasBg {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		//height: 70%;
		//height: 500rpx;
		background: #fff;
		width: 100%;
		border-radius: 10rpx;
		margin: 0rpx auto;
		padding-bottom: 200rpx;
	}

	.weather-box {
		font-size: 20rpx;
		color: #333;
		//padding: 30rpx 20rpx;
		height: 70rpx;
		padding-bottom: 15rpx;

		.tem {
			font-size: 60rpx;
			line-height: 48rpx;
			font-weight: 700;
		}
	}
</style>
