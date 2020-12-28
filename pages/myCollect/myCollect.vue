<template>
	<view>
		<view class="null flex flex-direction justify-center align-center" v-if="isNull" style="height: 80vh;">
			<image src="/static/null05.png" style="width: 300rpx;" mode="widthFix"></image>
			<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无收藏</view>
		</view>
		<view class="goods" v-else>
			<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.goods.id" class="goods-item bg-white flex justify-between" v-for="(item,index) in goods" :key="index">
				<view class="goods-pic">
					<u-lazy-load threshold="-100" :image="IMAGE_URL+item.goods.mainPhotoUrl" :index="index" height="200" border-radius="10" loading-img="/static/null05.png" error-img="/static/null05.png" img-mode="aspectFill"></u-lazy-load>
				</view>
				<view class="goods-con flex-sub flex flex-direction justify-between clear">
					<view class="">
						<view class="goods-name two-line">{{item.goods.goodsName}}</view>
						<view class="des text-hidden">{{item.goods.description}}</view>
					</view>
					<view class="flex justify-between align-end">
						<view class="goods-rice text-red ">￥{{item.goods.discountPrice}}</view>
						<button class="cu-btn line-red round" hover-stop-propagation @tap.stop="delGoods(index,item.goods.id)" style="height: 60rpx;">删除</button>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:[],
				IMAGE_URL:this.IMAGE_URL,
				isNull:false
			};
		},
		onLoad() {
			this.getCollections()
		},
		methods:{
			getCollections(){
				this.$u.post('/api/v1/goods/favorite/list',{
					userID:uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goods = res.data.data
					if(this.goods.length==0){
						this.isNull = true
					}
				});
			},
			delGoods(index,id){
				this.$u.post('/api/v1/goods/favorites/cancel',{
					userID:uni.getStorageSync("userInfo").id,
					goodsId:id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goods.splice(index,1)
					uni.showToast({
						title:"删除成功"
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		padding: 20rpx;
		border-bottom: 1rpx solid #f1f1f1;
		&:last-child{
			margin-bottom: 200rpx;
		}
		.goods-pic{
			width: 200rpx;
			height: 200rpx;
			margin-right: 20rpx;
			border-radius: 10rpx;
		}
		.des{
			font-size: 24rpx;
			color: #AAAAAA;
			line-height: 50rpx;
		}
	}
	
</style>
