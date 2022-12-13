<template>
	<view style="width: 100%;height: 100vh;">
		<xinyu-canvas-drawer ref="poster" :width="750" :height="cavasHeight"></xinyu-canvas-drawer>
		<image :src="src" :style="{width:'750rpx'}"  v-if="src != ''" mode="widthFix"></image>
		<view style="height: 200rpx;"></view>
		<view class="bottom ">
			<button class="button " @click="saveImageToPhotosAlbum">保存到相册</button>	
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
				postPath:'',
				chooseImgs:[],///选中的图片列表
				isCanvasLoading: false,
				src: '',
				cavasHeight:1250,
				btImgWidth:680,
				bigImgUrl:'',
				bottomImages:[]
			}

		},

		async onLoad(options) {
			
			
			if(options!=null){
				if (options.bottomImages){
					this.bottomImages = JSON.parse(decodeURIComponent(options.bottomImages))
					if(this.bottomImages.length>0){
						this.btImgWidth = 680/this.bottomImages.length
					}
					this.cavasHeight = 1250+this.btImgWidth
					console.log(this.cavasHeight)
					console.log(this.bottomImages)
				}
				if(options.bigImgUrl){
					this.bigImgUrl = options.bigImgUrl
				}	
			}
			
			
			var goods = uni.getStorageSync("postGoods")
			
			if (goods) {
				this.goodsDetail = goods
				console.log(this.goodsDetail)
				this.price = this.getPriceString(this.goodsDetail.price.min.discountPrice, this.goodsDetail.price.max
					.discountPrice, )
				this.crossedPrice = this.goodsDetail.price.max
					.originalPrice.toFixed(2)
				this.goodsName = this.goodsDetail.goodsName
			}
			this.invitationNo = uni.getStorageSync("userInfo").invitationNo
			this.code = 'https://mallh5.reecook.cn/#/goods/detail/' + this.goodsDetail.id + '/' + this
				.invitationNo + '/share'
			this.qrPath = 'https://img.reecook.cn/qr?text='+this.code+'&size=180&fcolor=000000&bcolor=ffffff',
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
			this.text2 = '湿度：' + this.weatherMsg.humidity + ' 温度' + this.weatherMsg.tem2 + '-' + this.weatherMsg.tem1 +
				'℃ 空气质量：' + this.weatherMsg.air_level

			this.text3 = this.weatherMsg.date + ' ' + this.weatherMsg.week

			this.storeName = this.userInfo.nickname + '的店铺'
			
			
			let posterRef = this.$refs.poster;
			uni.showLoading({
				title: "加载中"
			});
			await posterRef.init();
			for(var i=0;i<this.bottomImages.length;i++){
				posterRef.addImage(this.bottomImages[i].url,
				 35+(i)*this.btImgWidth, 1210, this.btImgWidth,  this.btImgWidth,)
			}
			this.src = await posterRef
				.setBackgroundColor("#fff") //指定渲染图片的背景色
				.addText(this.text1, 35, 40, 24, "#000") 
				.addText(this.text2, 35, 76, 24, "#000") 
				.addText(this.text3, 520, 40, 24, "#000") 
				.addText(this.lunarDate, 550, 76, 24, "#000") 
				.addImage( this.headImg, 35, 120, 130, 130,)
				.addRect(190, 130, 90, 30, "#D5101A")
				.addText('京东自营', 194, 135, 20, "#fff")
				.addText(this.storeName,194, 175, 28, "#000") 
				.addText('数字化零售批发服务平台',194, 217, 20, "#666") 
				.addImage(this.bigImgUrl,
				 55, 260, 640, 640,)
				.addImage(this.IMAGE_URL+'/wxapp/post_bg.png',
				 30, 900, 700, 100,)
				.addText('全球精品 | 正品保障 | 售后无忧',190, 940, 28, "#fff") 
				.addText('￥',40, 1040, 30, "#e54d42") 
				.addText(this.price+' ',65, 1035, 36, "#e54d42")
				.addText('￥'+' ',75+19*(this.price.length), 1042, 26, "#aaaaaa") 
				.addText(this.crossedPrice,95+19*(this.price.length), 1042, 26, "#aaaaaa")
				.addRect(75+19*(this.price.length), 1055, 15*(this.crossedPrice.length+1), 2, "#aaaaaa")
				.addImage(this.qrPath,
				 560, 1000, 180, 180,)
				 .addText('长按二维码立购',595, 1168, 16, "#333") 
				.addText(this.goodsName,40, 1095, 32, "#333",490,true,40,)
				
				.draw();
			this.isCanvasLoading = true;
			uni.hideLoading();
			this.$forceUpdate();
			
		},

		methods: {
			
			saveImageToPhotosAlbum() {
				//console.log(this.src)
				if (!this.isCanvasLoading)
					return this.alert("稍安勿躁，图片还没有加载完哦~");
				this.$refs.poster.saveImageToPhotosAlbum(this.src).then(()=>{
					uni.showModal({
						title:'提示',
						content:'保存成功',
						showCancel:false
					})
					
				}).catch((e)=>{
					uni.showModal({
						title:'提示',
						content:"保存失败" ,
						showCancel:false
					})
					//console.log(JSON.stringify(e))
				});
			},
			judgeCover(val) {
				
				if(!val){
					return
				}
				let arr = val.split('/')
				if (arr[0] === 'https:') {
					return val
				}else if(arr[0] === 'http:'){
					var result = val.replace('http','https')
					return  result
				}
				return this.IMAGE_URL + val
			},
			
			
		
			getPriceString(minPrice, maxPrice) {
				var returnPrice = '';
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

</style>
