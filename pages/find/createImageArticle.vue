<template>
	<view>
		<view class="addImageArticle">
			<view class="textArea">
				<u-input u-model="value" type="textarea" height="400" placeholder="有什么想法就和大家说说吧!" maxlength="200"
					@input="textIn">
				</u-input>
				<text>{{textCurLength}}/{{textMaxLength}}</text>
			</view>
			<u-upload ref="uUpload" :action="BASE_URL+upload_url" :auto-upload="true" @on-Success="success"
				@on-remove="remove" name="photo"></u-upload>
		</view>
		<view class="addPastGoods" @click="show=true">
			<view class="left">
			<image :src="IMAGE_URL + '/uni-program/icon/upload_cart.png'" mode=""></image><text>{{goodsInfo?goodsInfo.goodsName:'添加关联产品'}}</text>		
			</view>
			<image src="../../static/next.png" mode=""></image>
		</view>
		<button class="bg-red cu-btn text-white lg block" style="margin: 25rpx;" @click="create" :disabled="!text||!goodsInfo||!uploadPicLists">发布</button>
		<u-popup class="pop" v-model="show" mode="bottom" @close="closePop" safe-area-inset-bottom="true" border-radius="10" height="60vh">
			<view class="title">最近购买的商品</view>
			<view v-if="isNull" class="null flex flex-direction justify-center align-center" >
				<image :src="IMAGE_URL + '/null05.png'" style="width: 300rpx;" mode="widthFix"></image>
				<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无商品</view>
			</view>
			<scroll-view v-else class="flex-sub" scroll-y="true" style="height: 60vh;" @scrolltolower="getGoodsList">
				<view class="goods-box">
					<!-- 单行排列方式 -->
					<goods-list v-if="isBlock" situation=1 @setGoodsInfo="setGoodsInfo" :goodsList="goodsList"></goods-list>
					<!-- 缩略图排列方式 -->
					<large-image-list v-else :goodsList="goodsList"></large-image-list>
				</view>
				<u-loadmore :status="loadStatus" margin-bottom="40" />
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	import largeImageList from '@/components/largeImageList.vue'
	export default {

		data() {
			return {
				text:null,
				BASE_URL: this.BASE_URL,
				IMAGE_URL: this.IMAGE_URL,
				upload_url: '/api/v1/files/photo/upload',
				textMaxLength: 200,
				textCurLength: 0,
				uploadPicLists: [],
				show: false,
				goodsList: [],
				page:1,
				stopLoad: false,
				loadStatus: "loadmore", //触底加载状态,
				isBlock:true,
				isNull:false,
				goodsInfo:null
			}
		},
		components:{
			largeImageList
		},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			success(data, index, lists, name) {
				this.uploadPicLists = lists
			},
			remove(index, lists, name) {
				this.uploadPicLists = lists
			},
			textIn(value) {
				this.textCurLength = value.length
				this.text = value
			},
			getGoodsList() {
			if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
			let data = {
					limit:20,
					page:this.page
			}
				this.$u.post('/api/v1/live/order/history', data).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let goodsList = res.data.data.list
					// console.log(goodsList)
				this.page++
					if (goodsList==null || goodsList.length == 0) {
						this.loadStatus = "nomore"
						this.stopLoad = true
						if(this.page==1){
							this.isNull = true
						}
						return
					}
					//为了防止第一页商品数量不够时scrollview不能触底导致底部一直显示正在加载
					if (goodsList.length < 5) {
						this.loadStatus = "nomore"
					}
					for (let i = 0; i < goodsList.length; i++) {
						goodsList[i].totalSalesVolume = goodsList[i].salesVolume
						goodsList[i].price = goodsList[i].discountPrice
						goodsList[i].primePrice = goodsList[i].originalPrice
						goodsList[i].goodsId = goodsList[i].id
					}
					this.goodsList.push(...goodsList)
				});
			},
			closePop(){
				this.page=1
			},
			setGoodsInfo(item){
				this.goodsInfo = item
				this.show = false
			},
			create(){
				let userId = uni.getStorageSync("userInfo").id
				let goodsId =this.goodsInfo.id
				let text = this.text
				let images =[]
				this.uploadPicLists.forEach((item)=>{
					let picInfo ={path:item.response.data.data.url}
					images.push(picInfo)
				})
				let data={
					userId,goodsId,text,images
				}
				console.log(data)
				this.$u.post('/api/v1/moment_copy/create', data).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.$u.toast(res.data.msg)
					setTimeout(()=>{
					uni.navigateBack({})
					},1000)
					})
			}
		}
	}
</script>

<style lang="scss">
	.addImageArticle {
		background: #fff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;

		.textArea {
			position: relative;
		}

		text {
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			color: #c0c4cc;
		}
	}
	.addPastGoods{
		display: flex;
		justify-content: space-between;
		align-items: center;
		    padding: 20rpx 40rpx;
		    background: #fff;
		.left{
			display: flex;
			align-items: center;
			image{
				width: 32rpx;
				height: 32rpx;
				flex-shrink: 0;
			}
			text{
				margin:0 16rpx;
			}
		}
		image{
			width: 10rpx;
			height: 20rpx;
			flex-shrink: 0;
		}
	}
	.pop{
		.title{
			    text-align: center;
			    margin: 40rpx;
			    font-size: 32rpx;
		}
	}
</style>
