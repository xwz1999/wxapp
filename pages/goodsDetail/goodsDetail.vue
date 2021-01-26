<template>
	<view>
		<swiper :indicator-dots="false" :autoplay="false" :duration="300" style="height: 100vh;" :current="containerIndex">
			<!-- 商品 -->
			<swiper-item>
				<view class="" style="position: relative;">
					<view class="back" @tap="back">
						<text class="cuIcon-home" v-if="type=='share'"></text>
						<text class="cuIcon-back" v-else></text>
					</view>
					<!-- 	<view class="isLoading bg-white flex flex-direction justify-center align-center" style="height: 100vh;width: 100vw;"v-if="showLoading">
						<image src="/static/loading-white.gif" mode="widthFix" style="width:500upx"></image>
					</view> -->
					<view class="">
						<scroll-view scroll-y="true" style="height: 100vh;">
							<view>
								<view style="position: relative;" class="goodsDetail-swiper">
									<u-swiper :list="swiperList" mode="number" @click="handClick()" indicator-pos="bottomRight" :height='750'></u-swiper>
									<!-- 	<swiper class="swiper-box screen-swiper" :current="current" :circular="true" :autoplay="true" interval="3000"
									 duration="500" @change="swiperChange">
										<swiper-item v-for="(item,index) in goodsDetail.mainPhotos" :key="index">
											<image :src="IMAGE_URL+item.url" mode="aspectFill"></image>
										</swiper-item>
									</swiper> -->
									<!-- 		<view class="dots-box"><text style="font-size: 32rpx;">{{current+1}}</text>/{{goodsDetail.mainPhotos.length}}</view> -->
								</view>
								<view class="banner-con bg-img" :style="'background-image: url('+STATIC_URL+'goods-bg.png);'">
									<view class="pic-con">
										<view class="flex quan-top">
											<view class="quan">20元优惠券</view>
											<view class="price">
												￥{{goodsDetail.price.min.originalPrice}}
												<template v-if="goodsDetail.price.min.originalPrice!=goodsDetail.price.max.originalPrice">
													~￥{{goodsDetail.price.max.originalPrice}}
												</template>
											</view>
										</view>

										<view class="price-box text-white" style="font-size: 28rpx;">
											<text style="color: #FFD380;font-size: 28rpx;">券后价</text>
											<text>￥</text>
											<text style="font-size: 48rpx;">
												{{goodsDetail.price.min.discountPrice}}
												<template v-if="goodsDetail.price.min.discountPrice!=goodsDetail.price.max.discountPrice">
													~{{goodsDetail.price.max.discountPrice}}
												</template>
											</text>
											<template v-if="roleLevel!=500" class="">
												<text style="padding: 0 10rpx;">/</text>
												<text>
													赚{{goodsDetail.price.min.commission}}
													<template v-if="goodsDetail.price.min.commission!=goodsDetail.price.max.commission">
														~{{goodsDetail.price.max.commission}}
													</template>
												</text>
											</template>
										</view>
									</view>
								</view>
								<view class="goods-msg-box bg-white" style="margin-bottom: 25rpx;padding-top: 20rpx;">
									<view class="flex goods-name-box justify-between align-start">
										<view class="goods-name flex-sub">{{goodsDetail.goodsName}}</view>
										<button v-if="roleLevel!=500" class="text-center share-btn" type="default" open-type="share">
											<text class="cuIcon-share" style="margin-right: 5rpx;"></text>分享
										</button>
									</view>
									<view class="tip" style="padding: 0 20rpx;color: #CCCCCC;line-height: 50rpx;font-size: 28rpx;">{{goodsDetail.description}}</view>
									<view class="flex justify-between text-center goods-tips" @tap="tipModel(true)">
										<view class="flex">
											<text class="cuIcon-roundcheck text-red"></text>全球精品
										</view>
										<view class="flex">
											<text class="cuIcon-roundcheck text-red"></text>正品保障
										</view>
										<view class="flex">
											<text class="cuIcon-roundcheck text-red"></text>一件包邮
										</view>
										<view class="flex">
											<text class="cuIcon-roundcheck text-red"></text>售后无忧
										</view>
									</view>
								</view>
								<view class="box bg-white">
									<view class="item flex justify-between">
										<view class="span">领券</view>
										<view class="text-hidden flex-sub txt">暂无优惠券</view>
									</view>
									<view class="item flex justify-between" @tap="specModel(true)">
										<view class="span">规格</view>
										<view class="text-hidden flex-sub txt">{{checkedSku}}</view>
										<text class="cuIcon-right"></text>
									</view>
								</view>
								<view class="box bg-white" v-if="goodsDetail.isFerme">
									<view class="item flex justify-between align-center">
										<view class="span">进口税</view>
										<view class="text-hidden flex-sub txt flex align-center justify-start">
											<view class="tab_ferme">包税</view> 预计￥{{goodsDetail.price.max.ferme}}由瑞库客
										</view>
									</view>
								</view>
								<!-- 
								 is_import 是否进口商品
								 storehouse 进口商品仓库 0=无 1=国内仓 2=海外直邮 3=保税仓-->
								<view class="box bg-white" v-if="goodsDetail.isImport && goodsDetail.storehouse">
									<view class="item flex justify-between">
										<view class="span">送至</view>
										<view class="text-hidden flex-sub txt">
											<picker mode="region" @change="chooseAddress">
												<block v-if="addressList.length < 1"><text style="color: #CC1B4F;">请选择</text>收货地址</block>
												<block v-else>{{address}}</block>
											</picker>
										</view>
										<text class="cuIcon-right"></text>
									</view>
									<view class="item flex justify-between">
										<view class="span"></view>
										<view class="text-hidden flex-sub txt " style="padding-right: 88rpx;">
											<view class="flex align-start justify-between goods_box" style="margin: 16rpx 0;">
												<view class="goods_icon">
													<image :src="`${IMAGE_URL}/recook-weapp/goodsIcon/just.png`" mode="widthFix"></image>
													<text>正品保障</text>
												</view>
												<view class="goods_hr">
												</view>
												<view class="goods_icon" v-if="goodsDetail.storehouse === 1">
													<image v-if="addressList.length > 1" :src="`${IMAGE_URL}/recook-weapp/goodsIcon/details_active.png`" mode="widthFix"></image>
													<image v-else :src="`${IMAGE_URL}/recook-weapp/goodsIcon/details.png`" mode="widthFix"></image>
													<text>国内仓</text>
												</view>
												<view class="goods_icon" v-else-if="goodsDetail.storehouse === 2">
													<image v-if="addressList.length > 1" :src="`${IMAGE_URL}/recook-weapp/goodsIcon/aircraft_active.png`" mode="widthFix"></image>
													<image v-else :src="`${IMAGE_URL}/recook-weapp/goodsIcon/aircraft.png`" mode="widthFix"></image>
													<text>海外直邮</text>
												</view>
												<view class="goods_icon" v-else-if="goodsDetail.storehouse === 3">
													<image v-if="addressList.length > 1" :src="`${IMAGE_URL}/recook-weapp/goodsIcon/bonded_active.png`" mode="widthFix"></image>
													<image v-else :src="`${IMAGE_URL}/recook-weapp/goodsIcon/bonded.png`" mode="widthFix"></image>
													<text>保税仓</text>
												</view>
												<view class="goods_hr">
												</view>
												<view class="goods_icon">
													<block v-if="addressList.length > 1">
														<image :src="`${IMAGE_URL}/recook-weapp/goodsIcon/location_active.png`" mode="widthFix"></image>
														<text>{{addressList[addressList.length-1]}}</text>
													</block>
													<block v-else>
															<image :src="`${IMAGE_URL}/recook-weapp/goodsIcon/location.png`" mode="widthFix"></image>
													</block>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="box bg-white">
									<view class="item flex justify-between" @tap="parameterModel(true)">
										<view class="span">参数</view>
										<view class="text-hidden flex-sub txt">品牌 工艺...</view>
										<text class="cuIcon-right"></text>
									</view>
									<view class="item flex justify-between">
										<view class="span">服务</view>
										<view class="text-hidden flex-sub txt">

											<block v-if="goodsDetail.storehouse===1">
												<view>
													不支持7天无理由退换货
												</view>
											</block>
											<block v-else-if="goodsDetail.storehouse===3||goodsDetail.storehouse===2">
												<view>
													跨境商品不支持开发票
												</view>
												<view>
													不支持7天无理由退换货
												</view>
											</block>
											<block v-else>
												<view>
													正品保证 | 售后无忧
												</view>
											</block>
										</view>
									</view>
								</view>

								<view class="box bg-white">
									<view class="item flex justify-between" @tap="toGoodsComments">
										<view class="txt flex text-black" style="font-size: 28rpx;">用户评价<text style="color: #AAAAAA;">({{goodsDetail.evaluations.total}})</text></view>
										<view class="flex text-red">查看全部<text class="cuIcon-right"></text></view>
									</view>
									<view class="goods-comments" v-if="goodsDetail.evaluations.children.length!=0">
										<scroll-view scroll-x="true">
											<view class="flex">
												<view class="comment-item" v-for="(item,index) in goodsDetail.evaluations.children" :key="index">
													<view class="item-top flex">
														<view class="comment-avatar">
															<u-lazy-load threshold="-100" :image="IMAGE_URL+item.headImgUrl" :index="index" error-img="/static/null05.png"
															 border-radius="25" height="50"></u-lazy-load>

														</view>
														<view class="nickname text-hidden">{{item.nickname}}</view>
													</view>
													<view class="two-line content">{{item.content}}</view>
												</view>
											</view>
										</scroll-view>
									</view>
								</view>


								<!-- 店铺信息 -->
								<view class="box bg-white" style="padding-top: 0;">
									<navigator :url="'/pages/search/search?brandId='+goodsDetail.brand.id" hover-class="none" class="shop-box flex justify-between">
										<view class="shop-logo">
											<u-lazy-load threshold="-100" :image="IMAGE_URL+goodsDetail.brand.logoUrl" :index="index" error-img="/static/null05.png"
											 border-radius="10" height="150"></u-lazy-load>
										</view>
										<view class="shop-con flex-sub">
											<view class="shop-name">{{goodsDetail.brand.name}}</view>
											<view class="shop-count">全部商品：{{goodsDetail.brand.goodsCount}}</view>
										</view>

										<view class="shop-right flex flex-direction justify-center">
											<view class="flex" style="line-height: 50rpx;">
												<view class="text-gray">进入品牌</view>
												<text class="cuIcon-right"></text>
											</view>
										</view>
									</navigator>

									<!-- 店铺商品推荐 -->
									<view class="recommend">
										<view class="text-black" style="line-height: 80rpx;font-size: 28rpx;">为你推荐</view>
										<scroll-view scroll-x="true">
											<view class="rec-con flex">
												<view class="rec-item" v-for="(item,index) in goodsDetail.recommends" :key="index">
													<navigator class="item-image" :url="'/pages/goodsDetail/goodsDetail?id='+item.goodsId" open-type="redirect">
														<u-lazy-load threshold="-100" :image="IMAGE_URL+item.mainPhotoUrl" :index="index" error-img="/static/null05.png"
														 border-radius="10" height="200"></u-lazy-load>
													</navigator>
													<view class="item-name two-line">{{item.goodsName}}</view>
													<view class="text-black">￥{{item.price}}</view>
												</view>
											</view>
										</scroll-view>
									</view>
								</view>
								<!-- 商品详情 -->
								<view class="box bg-white">
									<view class="goods-detail">
										<view class="text-black" style="line-height: 80rpx;font-size: 28rpx;padding: 0 20rpx;">图文详情</view>
										<view class="video" v-if="goodsDetail.video">
											<video :src="IMAGE_URL+goodsDetail.video.url" style="width: 100%;display: block;" controls></video>
										</view>
										<view class="detail-pics">
											<u-lazy-load threshold="-100" :image="IMAGE_URL+item.url" v-for="(item,index) in pictures" :key="index"
											 :index="index" loading-img="/static/null05.png" error-img="/static/null05.png"></u-lazy-load>
										</view>
									</view>
								</view>
								<!-- 底部导航 -->
								<view class="" style="height: 100rpx;"></view>
								<view class="detail-bottom bg-white shadow flex justify-between align-center">
									<view class="flex text-center flex-sub justify-around">
										<navigator url="../../packageA/goodsCart/index" style="width: 100rpx;text-align: center;">
											<text class="cuIcon-cart" style="font-size: 48rpx;"></text>
											<view style="font-size: 20rpx;">购物车</view>
										</navigator>
										<template v-if="goodsDetail.isFavorite">
											<view class="text-red" @tap="setFavorite" style="width: 100rpx;text-align: center;">
												<text class="cuIcon-likefill" style="font-size: 48rpx;"></text>
												<view style="font-size: 20rpx;">已收藏</view>
											</view>
										</template>
										<template v-else>
											<view @tap="setFavorite" style="width: 100rpx;text-align: center;">
												<text class="cuIcon-like" style="font-size: 48rpx;"></text>
												<view style="font-size: 20rpx;">收藏</view>
											</view>
										</template>
									</view>
									<view class="buy-btns flex text-white text-center">
										<template v-if="goodsDetail.inventory==0">
											<view class="flex-sub cannot-buy">该商品已售罄</view>
										</template>
										<template v-else>
											<button class="btn-item left-btn" open-type="share">
												<view>导购</view>
												<view v-if="roleLevel!=500" style="font-size: 20rpx;">赚￥{{goodsDetail.price.min.commission}}
													<template v-if="goodsDetail.price.min.commission!=goodsDetail.price.max.commission">
														~{{goodsDetail.price.max.commission}}
													</template>
												</view>
											</button>
											<button class="btn-item right-btn" @tap="specModel(true)">
												<view>领券购买</view>
												<view v-if="roleLevel!=500" style="font-size: 20rpx;">省￥{{goodsDetail.price.min.commission}}
													<template v-if="goodsDetail.price.min.commission!=goodsDetail.price.max.commission">
														~{{goodsDetail.price.max.commission}}
													</template>
												</view>
											</button>
										</template>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</swiper-item>
			<!-- 发现 -->
			<swiper-item>
				<view class="flex flex-direction" style="position: relative;height: 100vh;">
					<u-navbar :custom-back="back" title="发现" :is-fixed="false" :background="{background:'#fff'}"></u-navbar>
					<view class="flex-sub">
						<dynamics :goodsId="id"></dynamics>
					</view>
					<navigator :url="'../makeDynamic/makeDynamic?goodsId='+id" v-if="showBtn" class="release-btn bg-red shadow">我要发布</navigator>
				</view>
			</swiper-item>
		</swiper>


		<!-- 服务说明介绍弹框 -->
		<u-popup v-model="showTip" mode="bottom" border-radius="20" :closeable="true">
			<view class="text-center text-black" style="line-height: 100rpx;font-size: 32rpx;font-weight: 900;">服务保障</view>
			<view class="tip-box">
				<view class="tip-item">
					<view class="flex item-top">
						<text class="cuIcon-roundcheck text-red"></text>
						<view class="">正品保证</view>
					</view>
					<view class="txt">本商品由海外认证的供应商或品牌商直供货源，保证100%正品</view>
				</view>
				<view class="tip-item">
					<view class="flex item-top">
						<text class="cuIcon-roundcheck text-red"></text>
						<view class="">发货&售后</view>
					</view>
					<view class="txt">由平台认证供应商或者品牌商直接发货，也可直接在瑞库客门店提货；由认证供应商或者品牌商提供售后服务</view>
				</view>
				<view class="tip-item">
					<view class="flex item-top">
						<text class="cuIcon-roundcheck text-red"></text>
						<view class="">售后无忧</view>
					</view>
					<view class="txt">瑞库客购无忧，售后更无忧，您的售后，由瑞库客平台客服全力护航</view>
				</view>
				<view class="tip-item">
					<view class="flex item-top">
						<text class="cuIcon-roundcheck text-red"></text>
						<view class="">支持七天无理由退换货</view>
					</view>
					<view class="txt">该商品支持七天无理由退货(未使用)</view>
				</view>
			</view>
			<view class="tip-btn text-center text-white">
				<view @tap="tipModel(false)">完成</view>
			</view>
		</u-popup>
		<!-- 规格弹框 -->
		<u-popup v-model="parameterShow" mode="bottom" border-radius="20">
			<view class="text-center text-black" style="line-height: 100rpx;font-size: 32rpx;font-weight: 900;">产品参数</view>
			<view class="parameter-box" style="height: 40vh;">
				<view class="parameter-list">
					<view class="lf">
						<text>品牌</text>
					</view>
					<view class="rg">
						<text>{{goodsDetail.brand.name}}</text>
					</view>
				</view>
				<view class="parameter-list">
					<view class="lf">
						<text>条形码</text>
					</view>
					<view class="rg">
						<view class="" v-for="(item,index) in goodsDetail.sku" :key='index'><text style="padding-right: 16rpx;">{{item.name}}
							</text> <text>{{item.code}}</text></view>

					</view>
				</view>
			</view>
			<view class="tip-btn text-center text-white">
				<view @tap="parameterModel(false)">完成</view>
			</view>

		</u-popup>

		<!-- 规格弹框 -->
		<u-popup v-model="showSpecs" mode="bottom" border-radius="20" :closeable="true">
			<view class="spec-box">
				<view class="spec-top flex">
					<view class="goods-pic">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+checkedSkuMsg.picUrl" :index="index" height="200" border-radius="10"
						 loading-img="/static/null05.png" error-img="/static/null05.png" img-mode="aspectFill"></u-lazy-load>
					</view>
					<view class="goods-msg flex-sub">
						<view class="text-black">
							<text>￥<text style="font-size: 36rpx;font-weight: 700;">{{checkedSkuMsg.discountPrice}}</text></text>
							<text style="padding:0 5rpx;">/</text>
							<text class="text-red" style="font-size: 24rpx;">赚{{checkedSkuMsg.commission}}</text>
						</view>
						<view style="font-size: 24rpx;color: #AAAAAA;margin: 10rpx 0;">库存 {{checkedSkuMsg.inventory}}件</view>
						<view style="font-size: 24rpx;">已选择:{{checkedSku}}</view>
					</view>
				</view>
				<view class="spec-con">
					<view v-for="(attr,index1) in goodsDetail.attributes" :key="index1">
						<view class="spec-title text-black">{{attr.name}}</view>
						<view class="flex flex-wrap">
							<view class="spec-item" v-for="(item,index2) in attr.children" :key="index2" :class="[item.isShow?'':'noneActive',subIndex[index1]==index2?'spec-checked':'']"
							 @tap="chooseAttr(index1,index2,item.id,item.value)">{{item.value}}</view>
						</view>
					</view>
				</view>
				<view class="goods-num-box flex align-center justify-between">
					<view class="">数量</view>
					<u-number-box v-model="buyNum" :min="1" :input-width="72" :size="24" @change="changeNum"></u-number-box>
				</view>
			</view>
			<view class="spec-btn-box flex justify-center text-white text-center">
				<template v-if="goodsDetail.inventory==0">
					<view class="flex-sub cannot-buy">该商品已售罄</view>
				</template>
				<template v-else>
					<view class="flex-sub" style="margin-right: 3rpx;" @tap="addcart">加入购物车</view>
					<view class="flex-sub buy-now" @tap="createOrder">立即购买</view>
				</template>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import dynamics from 'components/dynamics.vue'
	export default {
		data() {
			return {
				parameterShow: false,
				swiperImgList: [],
				roleLevel: 500,
				STATIC_URL: this.STATIC_URL,
				IMAGE_URL: this.IMAGE_URL,
				showLoading: true,
				showTip: false,
				showSpecs: false,
				id: null,
				current: 0,
				goodsDetail: null,
				pictures: [],
				buyNum: 1, //购买数量
				selectArr: [], //存放被选中的值
				selectName: [], //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
				checkedSkuMsg: {}, //选中的规格的全部信息
				checkedSku: "", //选中的规格的名称拼接
				sku_id: 0,
				type: null,
				containerIndex: 0,
				dynamics: [], //动态列表,
				showBtn: false, //是否显示发布按钮
				addressList: [],
				address: null
			}
		},
		components: {
			dynamics
		},
		onLoad(options) {
			if (options.q !== undefined) {
				let url = decodeURIComponent(options.q)
				options.id = url.split("/")[6];
			}
			if (uni.getStorageSync("userInfo").roleLevel) {
				this.roleLevel = uni.getStorageSync("userInfo").roleLevel
			}
			if (options.type) {
				this.type = options.type
			}
			if (uni.getStorageSync("auth")) {
				this.showBtn = true
			}
			this.id = parseInt(options.id)
			console.log(this.id + '-------')
			this.getGoodsDetail()
		},
		computed: {
			swiperList() {
				let arr = []
				this.swiperImgList.map(item => {
					arr.push(this.IMAGE_URL + item.url)
				})
				return arr
			}
		},
		mounted() {
			console.log(uni.getStorageSync("userInfo").id)
		},
		methods: {
			parameterModel(bool) {
				this.parameterShow = bool
			},
			getUrlKey(url, name) { //获取url 参数
				return decodeURIComponent(
					(new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
			},
			toGoodsComments() {
				uni.navigateTo({
					url: "../goodsComments/goodsComments?id=" + this.id
				})
			},
			back() {
				if (this.type == "share") {
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					uni.navigateBack()
				}
			},
			changeNum() {
				// if(this.buyNum>this.skuStoreCount){
				// 	this.$u.toast(res.data.msg);
				// }
				return
			},
			//点击收藏
			setFavorite() {
				this.goodsDetail.isFavorite = !this.goodsDetail.isFavorite
				console.log(this.goodsDetail.isFavorite)
				let reqUrl = ""
				if (this.goodsDetail.isFavorite) {
					reqUrl = "/api/v1/goods/favorites/add"
				} else {
					reqUrl = "/api/v1/goods/favorites/cancel"
				}
				this.$u.post(reqUrl, {
					userID: uni.getStorageSync("userInfo").id,
					goodsID: this.id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
				})
			},
			swiperChange(e) {
				// console.log(e)
				this.current = e.detail.current
			},
			tipModel(flag) {
				this.showTip = flag
			},
			specModel(flag) {
				this.showSpecs = flag
			},
			// 获取商品详情信息
			getGoodsDetail() {
				this.$u.post('/api/v1/goods/detail/summary', {
					userID: uni.getStorageSync("userInfo").id,
					GoodsID: this.id
				}).then(res => {
					console.log(res.data);
					this.showLoading = false
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goodsDetail = res.data.data
					// 规格只有一个 默认选中
					if (this.goodsDetail.attributes.length === 1 && this.goodsDetail.attributes[0].children.length === 1) {
						this.selectName[0] = this.goodsDetail.attributes[0].children[0].name
						this.selectArr[0] = this.goodsDetail.attributes[0].children[0].id
						this.subIndex[0] = 0
					}
					console.log(res.data.data)
					this.swiperImgList = res.data.data.mainPhotos

					//获取商品详情图片列表
					this.getPictures()
					//初始化商品sku信息
					this.initData()
				})
			},

			//初始化商品规格sku信息
			initData() {
				// console.log(this.goodsDetail)
				this.checkedSkuMsg = this.goodsDetail.sku[0]
				this.skuPrice = this.goodsDetail.sku[0].discountPrice || ''
				this.skuPhoto = this.IMAGE_URL + this.goodsDetail.sku[0].picUrl
				this.skuStoreCount = this.goodsDetail.sku[0].inventory
				this.checkedSku = "请选择规格"

				if (this.goodsDetail.sku.length === 1) {
					this.checkedSku = this.goodsDetail.sku[0].name
					this.sku_id = this.goodsDetail.sku[0].id
					console.log(this.sku_id)
				}
				for (let i in this.goodsDetail.sku) {
					this.shopItemInfo[this.goodsDetail.sku[i].combineId.split(",").reverse().join(",")] = this.goodsDetail.sku[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
				}
				console.log(this.shopItemInfo)
				this.checkItem();
			},

			//获取商品详情图片
			getPictures() {
				this.$u.post('/api/v1/goods/detail/photo', {
					GoodsID: this.id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.pictures = res.data.data.list
				});
			},


			//添加购物车
			addcart() {
				console.log(this.sku_id)
				if (!this.sku_id) {
					this.$u.toast("请选择商品规格")
					return
				}

				this.$u.post('/api/v1/goods/shopping_trolley/add', {
					UserID: uni.getStorageSync("userInfo").id,
					GoodsID: this.id,
					SkuID: this.sku_id,
					Quantity: this.buyNum
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.showToast({
						title: "已加入购物车"
					})
					this.specModel(false)
				})

			},
			//创建预购单
			createOrder() {
				console.log(this.checkedSku)
				if (!this.sku_id) {
					this.$u.toast("请选择商品规格")
					return
				}
				let sendData = {
					UserID: uni.getStorageSync("userInfo").id,
					SkuID: this.sku_id,
					SkuName: this.selectName.join('+'),
					Quantity: this.buyNum
				}
				if (this.parentId) {
					sendData.ParentID = this.parentId
				}
				// 此时创建普通订单预览
				this.$u.post('/api/v1/order_preview/create', sendData).then(res => {
					console.log(res);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					let preViewMsg = res.data.data
					preViewMsg.isImport = this.goodsDetail.isImport
					this.$store.commit('updatePreOrderMsg', preViewMsg);
					console.log(res.data.data)
					// return
					uni.navigateTo({
						url: "/pages/confirmOrder/confirmOrder"
					})
					this.specModel(false)
				});
			},

			//选择规格
			chooseAttr(i1, i2, id, name) {
				if (this.selectArr[i1] != id) {
					this.selectName[i1] = name
					this.selectArr[i1] = id
					this.subIndex[i1] = i2
				} else {
					this.selectName[i1] = ""
					this.selectArr[i1] = ""
					this.subIndex[i1] = -1 //去掉选中的颜色
				}

				// console.log(this.selectArr,this.subIndex,this.selectName)
				this.checkedSku = this.selectName.join(",")
				this.checkItem();
			},
			checkItem() {
				let option = this.goodsDetail.attributes
				let result = [] //定义数组储存被选中的值
				for (let i in option) {
					result[i] = this.selectArr[i] ? this.selectArr[i] : '';
				}
				// console.log(result)
				for (let i in option) {
					let last = result[i]; //把选中的值存放到字符串last去
					for (let k in option[i].children) {
						result[i] = option[i].children[k].id; //赋值，存在直接覆盖，不存在往里面添加id
						option[i].children[k].isShow = this.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
					}
					result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时被覆盖
				}
				// console.log(result)

				if (this.shopItemInfo[result]) {
					this.checkedSkuMsg = this.shopItemInfo[result]
					this.sku_id = this.shopItemInfo[result].id
				} else {
					this.sku_id = 0
				}
				this.$forceUpdate(); //重绘
			},
			isMay(result) {
				for (var i in result) {
					if (result[i] == '') {
						return true; //如果数组里有为空的值，那直接返回true
					}
				}
				// console.log(this.shopItemInfo[result])
				return this.shopItemInfo[result].inventory == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
			},
			chooseAddress(e) {
				console.log(e)
				this.addressList = e.detail.value
				this.address = this.addressList.join("-")
				console.log(this.addressList)
			},
			//下载发圈素材图片
			downloadPic(pics) {
				console.log(pics)
				for (let i = 0; i < pics.length; i++) {
					this.downloadSave(this.IMAGE_URL + pics[i].url)
				}
			},
			downloadSave(url) {
				console.log(url)
				uni.downloadFile({
					url: url, //网络路径不支持
					success: (res) => {
						if (res.statusCode === 200) {
							console.log(res.tempFilePath)
							console.log('下载成功');
							let localPicUrl = res.tempFilePath
							uni.saveImageToPhotosAlbum({
								filePath: localPicUrl,
								success: function() {
									console.log('save success');
								},
								fail: (err) => {
									this.$u.toast(err);
								}
							});
						}
					},
					fail: (err) => {
						this.$u.toast(err);
					}
				});
			},
			//复制文字
			copyWords(words) {
				uni.setClipboardData({
					data: words,
					success: (res) => {
						console.log("success")
					}
				})
			},
			// 点击打开大图
			handClick(val) {
				console.log(this.swiperList[val])
				wx.previewImage({
				  current: this.swiperList[val], // 当前显示图片的http链接
				  urls: this.swiperList // 需要预览的图片http链接列表
				})
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "我在买" + this.goodsDetail.goodsName + ",快来看看吧！",
				path: '/pages/goodsDetail/goodsDetail?id=' + this.id + "&type=share",
				imageUrl: this.IMAGE_URL + this.goodsDetail.mainPhotos[0].url
			}
		}
	}
</script>

<style lang="scss">
	.parameter-box {
		.parameter-list {
			display: flex;
			margin-bottom: 30rpx;

			.lf {
				color: #121212;
				padding-left: 100rpx;
				width: 250rpx;
			}

			.rg {
				color: #bebebe;
			}
		}

	}

	.goods_box {
		.goods_icon {
			text-align: center;
			width: 96rpx;

			image {
				width: 52rpx;
				margin: 0 auto;
			}
		}


	}

	// 轮播图指示器位置
	.goodsDetail-swiper {
		.u-swiper-indicator {
			bottom: 100rpx !important;
		}
	}

	.tab_ferme {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 64rpx;
		height: 28rpx;
		background: #FFE5ED;
		border-radius: 15rpx;
		margin-right: 20rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #CC1B4F;
	}

	.back {
		position: absolute;
		top: 80rpx;
		left: 30rpx;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 50%;
		font-size: 40rpx;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.swiper-box {
		height: 750rpx;
		position: relative;
	}

	.dots-box {
		position: absolute;
		right: 20rpx;
		top: 600rpx;
		line-height: 40rpx;
		color: #fff;
		font-size: 24rpx;
		border-radius: 30rpx;
		background-color: rgba(0, 0, 0, 0.3);
		width: 80rpx;
		text-align: center;
	}

	.banner-con {
		position: relative;
		margin-top: -80rpx;
		height: 212rpx;
		background-color: transparent;

		.pic-con {
			position: absolute;
			bottom: 20rpx;
			left: 20rpx;

			.quan-top {
				line-height: 46rpx;
				margin-bottom: 20rpx;

				.quan {
					border-radius: 25rpx;
					padding: 0 20rpx;
					margin-right: 20rpx;
					overflow: hidden;
					background-image: linear-gradient(to right, #e9ce87, #ca9d59);
					color: #FFFFFF;
				}
			}


			.price {
				text-decoration: line-through;
				font-size: 32rpx;
				color: rgba(255, 255, 255, 0.5);
			}
		}
	}


	.goods-msg-box {
		.goods-name {
			color: #000;
			font-size: 32rpx;
			line-height: 45rpx;
			padding: 0 20rpx;
			font-weight: 700;
		}

		.share-btn {
			background-color: #eee;
			color: #aaa;
			white-space: nowrap;
			border-radius: 0;
			font-size: 28rpx;
			border-bottom-left-radius: 25rpx;
			border-top-left-radius: 25rpx;
			line-height: 50rpx;
		}

		.goods-tips {
			padding: 30rpx 20rpx 20rpx;
			color: #333;
			line-height: 50rpx;
		}

	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;

		.buy-btns {
			height: 80rpx;
			width: 520rpx;

			.btn-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 1;
				border-radius: 0;
				color: #FFFFFF;
				line-height: normal;
				font-size: 30rpx;

				&::after {
					content: none;
				}

				&.left-btn {
					background-image: linear-gradient(to right, #787978, #5d5e5d);
					border-top-left-radius: 40rpx;
					border-bottom-left-radius: 40rpx;
					margin-right: 2rpx;
				}

				&.right-btn {
					background-image: linear-gradient(to right, #c6193d, #ff3456);
					border-top-right-radius: 40rpx;
					border-bottom-right-radius: 40rpx;
				}
			}
		}
	}

	.tip-box {
		padding: 0 30rpx 20rpx;

		.tip-item {
			margin-bottom: 20rpx;

			.item-top {
				line-height: 60rpx;
				font-size: 32rpx;
				color: #000000;

				.cuIcon-roundcheck {
					width: 50rpx;
					font-size: 36rpx;
					color: red;
				}
			}

			.txt {
				padding-left: 50rpx;
				color: #666666;
				font-size: 28rpx;
			}
		}

	}

	.tip-btn {
		padding: 15rpx 30rpx;
		box-shadow: 0 0 10rpx 1rpx #f1f1f1;

		view {
			line-height: 80rpx;
			border-radius: 40rpx;
			background-image: linear-gradient(to right, #FF311D, #D5101A);
		}

	}

	.spec-box {
		padding: 30rpx;

		.spec-top {
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #f1f1f1;

			.goods-pic {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
		}

		.spec-con {
			.spec-title {
				line-height: 80rpx;
			}

			.spec-item {
				border: 2rpx solid transparent;
				background-color: #f1f1f1;
				color: #000;
				border-radius: 8rpx;
				margin: 10rpx 0;
				margin-right: 20rpx;
				padding: 0 25rpx;
				font-size: 26rpx;
				line-height: 50rpx;
			}

			.spec-checked {
				background-color: rgba(201, 34, 25, 0.05);
				color: red;
				border: 2rpx solid red;
			}

			.noneActive {
				background-color: #f9f9f9;
				color: #ddd;
				border: 2rpx solid transparent;
				pointer-events: none;
			}
		}

		.goods-num-box {
			height: 100rpx;
			margin-top: 50rpx;
		}
	}

	.spec-btn-box {
		padding: 20rpx 30rpx;
		font-size: 32rpx;

		view {
			height: 80rpx;
			line-height: 80rpx;

			&:first-child {
				border-top-left-radius: 40rpx;
				border-bottom-left-radius: 40rpx;
				background-image: linear-gradient(to right, #787978, #5d5e5d);
			}

			&:last-child {
				border-top-right-radius: 40rpx;
				border-bottom-right-radius: 40rpx;
				background-image: linear-gradient(to right, #c6193d, #ff3456);
			}
		}
	}

	.cannot-buy {
		border-radius: 40rpx;
		background-color: #f1f1f1;
		line-height: 80rpx;
		color: #AAAAAA;
	}

	.box {
		margin-top: 20rpx;
		padding: 15rpx 0;

		.cuIcon-right {
			font-size: 32rpx;
			color: #DDDDDD;
		}

		.item {
			padding: 0 20rpx;
			line-height: 60rpx;
			font-size: 26rpx;
			color: #AAAAAA;

			.span {
				width: 96rpx;
			}

			.txt {
				color: #333333;
			}
		}

		.goods-comments {
			padding: 0 20rpx;

			.comment-item {
				margin-right: 20rpx;
				border-radius: 10rpx;
				background-color: #f7f7f7;
				padding: 15rpx;

				&:last-child {
					margin-right: 0;
				}

				.item-top {
					line-height: 50rpx;

					.comment-avatar {
						width: 50rpx;
						height: 50rpx;
						margin-right: 15rpx;
					}

					.nickname {
						font-size: 28rpx;
					}
				}

				.content {
					width: 300rpx;
					font-size: 24rpx;
					margin: 10rpx 0;
				}
			}
		}

		.shop-box {
			padding: 20rpx;
			border-bottom: 1rpx solid #f1f1f1;

			.shop-logo {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.shop-name {
				font-size: 30rpx;
				color: #333333;
			}

			.shop-count {
				font-size: 24rpx;
				color: #AAAAAA;
				margin-top: 15rpx;
			}
		}

		.recommend {
			padding: 0 20rpx;

			.rec-item {
				margin-right: 20rpx;
				width: 200rpx;

				&:last-child {
					margin-right: 0;
				}

				.item-image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}

				.item-name {
					color: #AAAAAA;
					font-size: 24rpx;
					line-height: 35rpx;
					margin-top: 10rpx;
					height: 70rpx;
				}
			}
		}
	}

	.release-btn {
		position: absolute;
		bottom: 80rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 50rpx;
		line-height: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
	}

	button {
		font-weight: normal;
	}

	button::after {
		content: none;
		border-radius: 0;
	}
</style>
