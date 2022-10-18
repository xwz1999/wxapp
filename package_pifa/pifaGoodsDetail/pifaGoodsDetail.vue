<template>
	<view>
		<swiper :indicator-dots="false" :autoplay="false" :duration="300" style="height: 100vh;"
			:current="containerIndex">
			<!-- 商品 -->
			<swiper-item>
				<view class="" style="position: relative;">
					<view class="back" @tap="back">
						<text class="cuIcon-home" v-if="type=='share'"></text>
						<text class="cuIcon-back" v-else></text>
					</view>

					<view class="kefu" @tap="startChat">
						<u-icon name="server-fill" style=""></u-icon>
						<text style="color: #fff;font-size: 20rpx;">客服</text>
					</view>

					<view class="">
						<scroll-view scroll-y="true" style="height: 100vh;">
							<view>
								<view style="position: relative;" class="goodsDetail-swiper">
									<u-swiper :list="swiperList" mode="number" @click="handClick"
										indicator-pos="bottomRight" :height='750'></u-swiper>
								</view>
								<view class="banner-con bg-img"
									:style="'background-image: url('+IMAGE_URL+'/wxapp/uni-program/pifa_price_bg.png)'">
									<view class="pic-con">
										<view class="quan-top">
											<view>
												<text
													style="color: #ffffff;font-size: 28rpx;padding-top: 5rpx;">批发价</text>
												<text
													style="color: #ffffff;font-size: 28rpx;padding-top: 5rpx;">￥</text>
												<text style="font-size: 48rpx;color: #ffffff">
													{{price}}
												</text>
											</view>

											<view style="margin-left: 280rpx;">
												<text
													style="color: #fff;font-size: 28rpx;padding-top: 2rpx;">{{min}}件起批</text>
											</view>

										</view>

										<view class="price-box" style="font-size: 28rpx;padding-left: 20rpx;"
											:style="'background-image: url('+IMAGE_URL+'/wxapp/uni-program/goods_price_detail_bg.png);background-size: 100% 100%;'">
											<text
												style="color: #ffffff;font-size: 24rpx;">预估利润{{commission}}（官方指导价¥{{originPrice}}-批发价¥{{price}}</text>
										</view>
									</view>
								</view>


								<view class="box bg-white">
									<view class="item flex justify-between" @tap="specModel(true)">
										<view class="span">规格</view>
										<view class="text-hidden flex-sub txt">{{checkedSku}}</view>
										<text class="cuIcon-right"></text>
									</view>
									<!-- 	<picker class="" :value="selectedRegion" :range="regionPicker" mode="multiSelector"
										@columnchange="columnchange" @change="selectedRegionChange"> -->
									<view v-if="needStock" class="item flex justify-between"
										@click="defaultAddressMakeFun">
										<view class="span">地址</view>
										<view v-if="selectedAddress" class="text-hidden flex-sub txt">
											<!-- {{selectedAddress.province}}-{{selectedAddress.city}}-{{selectedAddress.district}} -->
											{{selectedAddress.province}}-{{selectedAddress.city}}-{{selectedAddress.district}}
											<text v-if="jcookStockState==null" style="margin-left: 5px;"></text>
											<text v-else-if="jcookStockState===1" style="margin-left: 5px;">有货</text>
											<text v-else style="margin-left: 5px;">无货</text>
										</view>
										<view v-else class="text-hidden flex-sub txt">请填写默认地址</view>
										<text class="cuIcon-right"></text>
									</view>

								</view>

								<view class="box bg-white" v-if="goodsDetail.isImport && goodsDetail.storehouse">
									<view class="item flex justify-between">
										<view class="span">送至</view>
										<view class="text-hidden flex-sub txt">
											<picker mode="region" @change="chooseAddress">
												<block v-if="addressList.length < 1"><text
														style="color: #CC1B4F;">请选择</text>收货地址</block>
												<block v-else>{{address}}</block>
											</picker>
										</view>
										<text class="cuIcon-right"></text>
									</view>
									<view class="item flex justify-between">
										<view class="span"></view>
										<view class="text-hidden flex-sub txt " style="padding-right: 60rpx;">
											<view class="flex align-start justify-between goods_box"
												style="margin: 16rpx 0;">
												<view class="goods_icon">
													<image :src="`${IMAGE_URL}/recook-weapp/goodsIcon/just.png`"
														mode="widthFix"></image>
												</view>
												<view class="goods_icon" v-if="goodsDetail.storehouse === 1">
													<image v-if="addressList.length > 1"
														:src="`${IMAGE_URL}/recook-weapp/goodsIcon/details_active.png`"
														mode="widthFix"></image>
													<image v-else
														:src="`${IMAGE_URL}/recook-weapp/goodsIcon/details.png`"
														mode="widthFix"></image>

												</view>
												<view class="goods_icon" v-else-if="goodsDetail.storehouse === 2">
													<image v-if="addressList.length > 1"
														:src="`${IMAGE_URL}/recook-weapp/goodsIcon/aircraft_active.png`"
														mode="widthFix"></image>
													<image v-else
														:src="`${IMAGE_URL}/recook-weapp/goodsIcon/aircraft.png`"
														mode="widthFix"></image>

												</view>
												<view class="goods_icon" v-else-if="goodsDetail.storehouse === 3">
													<image v-if="addressList.length > 1"
														:src="`${IMAGE_URL}/wxapp/goodsIcon/bonded_active.png`"
														mode="widthFix"></image>
													<image v-else :src="`${IMAGE_URL}/wxapp/goodsIcon/bonded.png`"
														mode="widthFix"></image>

												</view>

												<view class="goods_icon">
													<block v-if="addressList.length > 1">
														<image :src="`${IMAGE_URL}/wxapp/goodsIcon/location_active.png`"
															mode="widthFix"></image>

													</block>
													<block v-else>
														<image :src="`${IMAGE_URL}/wxapp/goodsIcon/location.png`"
															mode="widthFix"></image>
													</block>
												</view>
											</view>
											<view class="flex justify-between align-center goods_box">
												<view class="goods_icon">
													<text>正品保障</text>
												</view>
												<view class="goods_icon_hr">

												</view>
												<view class="goods_icon">

													<text v-if="goodsDetail.storehouse === 1">国内仓</text>
													<text v-if="goodsDetail.storehouse === 2">海外直邮</text>
													<text v-if="goodsDetail.storehouse ===3">保税仓</text>
												</view>
												<view class="goods_icon_hr">

												</view>
												<view class="goods_icon">
													<text
														v-if="addressList.length > 1">{{addressList[addressList.length-1]}}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="box bg-white">
									<view class="item flex justify-between" @tap="parameterModel(true)">
										<view class="span">参数</view>
										<view class="text-hidden flex-sub txt">品牌｜起批量｜规格｜条形码</view>
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


								<!-- 商品详情 -->
								<view class="box bg-white">
									<view class="goods-detail">
										<view class="text-black"
											style="line-height: 80rpx;font-size: 28rpx;padding: 0 20rpx;">图文详情</view>
										<view class="video" v-if="goodsDetail.video">
											<video :src="goodsDetail.video.url" style="width: 100%;display: block;"
												controls></video>
										</view>
										<view class="detail-pics  brandFirstImg" v-if="brandFirstImg">
											<u-lazy-load threshold="-100" :image="brandFirstImg" :index="index"
												:loading-img="IMAGE_URL + '/wxapp/null05.png'"
												:error-img="IMAGE_URL + '/wxapp/null05.png'"></u-lazy-load>
										</view>
										<view class="">
										</view>
										<view class="detail-pics">
											<u-lazy-load threshold="-100"
												:image="(item.url).substr(0,4)==='http'?item.url:(IMAGE_URL+item.url)"
												v-for="(item,index) in pictures" :key="index" :index="index"
												:loading-img="IMAGE_URL + '/wxapp/null05.png'"
												:error-img="IMAGE_URL + '/wxapp/null05.png'"></u-lazy-load>
										</view>
										<view class="detail-pics brandLastImg" v-if="brandLastImg">
											<u-lazy-load threshold="-100" :image="brandLastImg" :index="index"
												:loading-img="IMAGE_URL + '/wxapp/null05.png'"
												:error-img="IMAGE_URL + '/wxapp/null05.png'"></u-lazy-load>
										</view>
									</view>
								</view>
								<!-- 底部导航 -->
								<view class="" style="height: 100rpx;"></view>
								<view class="detail-bottom bg-white shadow flex justify-between align-center">
									<view class="flex text-center flex-sub justify-around">
										<view @tap="gotoCart()" style="width: 100rpx;text-align: center;">
											<!-- 	<image :src="IMAGE_URL+'/wxapp/uni-program/wholesale_car.png'"
												mode="widthFix" style="width: 48rpx;height:48rpx;"></image> -->
											<text class="cuIcon-cartfill" style="font-size: 48rpx;"></text>
											<!-- <text class="cuIcon-badge"
												v-if="shoppingTrolleyCount>0">{{shoppingTrolleyCount}}</text> -->
											<view style="font-size: 20rpx;">进货单</view>
										</view>
										<view @tap="backHome()" style="width: 100rpx;text-align: center;">
											<text class="cuIcon-home" style="font-size: 48rpx;"></text>
											<view style="font-size: 20rpx;">批发首页</view>
										</view>
									</view>
									<view class="buy-btns flex text-white text-center">
										<template v-if="goodsDetail.inventory==0">
											<view class="flex-sub cannot-buy">该商品已售罄</view>
										</template>
										<template v-else>

											<button v-if="isLogin" class="btn-item left-btn" @tap="toBuy">
												<view>加入进货单</view>
											</button>
											<button v-else class="btn-item left-btn" @tap="goLogin">
												<view>加入进货单</view>
											</button>
											<button v-if="isLogin" class="btn-item right-btn" @tap="toBuy">
												<view>批发购买</view>
											</button>
											<button v-else class="btn-item right-btn" @tap="goLogin">
												<view>批发购买</view>
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
			<!-- 		<swiper-item>
				<view class="flex flex-direction" style="position: relative;height: 100vh;">
					<u-navbar :custom-back="back" title="发现" :is-fixed="false" :background="{background:'#fff'}">
					</u-navbar>
					<view class="flex-sub">
						<dynamics :goodsId="id"></dynamics>
					</view>
					<navigator :url="'../makeDynamic/makeDynamic?goodsId='+id" v-if="showBtn"
						class="release-btn bg-red shadow">我要发布</navigator>
				</view>
			</swiper-item> -->
		</swiper>


		<!-- 服务说明介绍弹框 -->
		<!-- 	<u-popup v-model="showTip" mode="bottom" border-radius="20" :closeable="true">
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
	 -->
		<!-- 规格弹框 -->
		<u-popup v-model="parameterShow" mode="bottom" border-radius="20">
			<view class="text-center text-black" style="line-height: 100rpx;font-size: 32rpx;font-weight: 900;">产品参数
			</view>
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
						<text>起批量</text>
					</view>
					<view class="rg">
						<text>{{min}}</text>
					</view>
				</view>
				<view class="parameter-list">
					<view class="lf">
						<text>规格/条形码</text>
					</view>
					<view class="rg">
						<view class="" v-for="(item,index) in goodsDetail.sku" :key='index'><text
								style="padding-right: 16rpx;">{{item.name}}
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
						<u-lazy-load threshold="-100"
							:image="judgeCover(checkedSkuMsg!=null?checkedSkuMsg.picUrl:goodsDetail.mainPhotos[0].url)"
							:index="index" height="200" border-radius="10"
							:loading-img="IMAGE_URL + '/wxapp/null05.png'" :error-img="IMAGE_URL + '/wxapp/null05.png'"
							img-mode="aspectFill"></u-lazy-load>
					</view>


					<view class="goods-msg flex-sub">
						<view class="text-black">
							<text style="font-size: 36rpx;font-weight: 700;">{{goodsDetail.goodsName}}</text>
						</view>
						<view style="height: 5rpx;"></view>
						<view style="font-size: 25rpx;color: #666;margin: 10rpx 0;">
							{{checkedSkuMsg!=null?checkedSkuMsg.min:goodsDetail.price.min.min}}件起批 本品按箱批发 一箱=
							{{checkedSkuMsg!=null?checkedSkuMsg.limit:goodsDetail.price.min.limit}}件
						</view>
						<view style="height: 5rpx;"></view>
						<text style="font-size: 32rpx;color: #D5101A;font-weight: bold;">批发价 ¥{{price}}</text>
					</view>
				</view>
				<view class="spec-con" style="min-height: 500rpx;">
					<view v-for="(sku,index1) in goodsDetail.sku" :key="index1">
						<view class="flex" style="display: flex;align-items: center;margin: 18rpx 0;">
							<text :class="sku.skuChecked?'cuIcon-roundcheckfill text-red':'cuIcon-round text-gray'"
								@tap="checkSku(index1)"></text>
							<view style="width: 20rpx;"></view>

							<view
								style="width: 100%; display: flex;align-items: center;flex-direction: row;background-color: #f6f6f6;padding: 20rpx;border-radius: 5rpx;justify-content: space-between;">
								<view style="display: flex;flex-direction: column;">
									<text style="color: #666666;font-size: 24rpx;">规格：{{sku.name}}</text>

									<text
										style="color: #D5101A;font-size: 28rpx;font-weight: bold;margin-top: 10rpx;">批发价:¥{{sku.sale_price}}
										<text
											style="color: #999999;font-size: 20rpx;text-decoration: line-through;font-weight: normal;padding-left: 20rpx;">
											零售价: ¥{{sku.discountPrice}}
										</text>
									</text>
								</view>
								<view>
									<u-number-box v-model="sku.selectNum" disabled-input=true :min="sku.min"
										:step="sku.limit" :input-width="72" :size="24" bg-color=#fff
										@change="changeNum(sku.selectNum,sku.skuChecked)">
									</u-number-box>
								</view>

							</view>


						</view>
					</view>
				</view>

				<view class="goods-num-box flex align-center justify-between" v-if="checkedSkuMsg!=null">
					<view style="color: #666666;font-size: 24rpx;">已选{{checkedSkuMsg.selectNum}}件</view>
					<view style="color: #111111;font-size: 24rpx;">商品金额：
						<text style="color: #D5101A;font-size: 32rpx;font-weight: bold;">
							¥{{(checkedSkuMsg.selectNum * checkedSkuMsg.sale_price).toFixed(2)}}
						</text>
					</view>
				</view>
				<view class="goods-num-box flex align-center justify-between" v-else>
					<view class=""> </view>
					<view class=""> </view>
				</view>
			</view>
			<view class="spec-btn-box flex justify-center text-white text-center">
				<template v-if="goodsDetail.inventory==0">
					<view class="flex-sub cannot-buy">该商品已售罄</view>
				</template>
				<template v-else>
					<view class="flex-sub" style="margin-right: 3rpx;" @tap="addcart">加入进货单</view>
					<view class="flex-sub buy-now" @tap="createOrder">立即购买</view>
					<!-- <view class="flex-sub buy-now" @tap="$u.throttle(createOrder,1000)">立即购买</view> -->
				</template>
			</view>
		</u-popup>

		<!-- 分享弹出框 -->
		<u-popup v-model="isShow" mode="bottom" border-radius="15">
			<view class="share-box flex justify-between">
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" open-type="share">
						<image class="share-icon" :src="IMAGE_URL + '/wxapp/mine/wx.png'" mode="widthFix"></image>
						<view class="txt">微信好友</view>
					</button>
				</view>
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" @tap="copyLink">
						<image class="share-icon" :src="IMAGE_URL+'/wxapp/uni-program/share_link.png'" mode="widthFix">
						</image>
						<view class="txt">复制链接</view>
					</button>
				</view>
				<view class="flex-sub flex justify-center">
					<button class="flex flex-direction justify-center align-center" @tap="postShare">
						<image class="share-icon" :src="IMAGE_URL + '/wxapp/mine/post.png'" mode="widthFix"></image>
						<view class="txt">二维码海报</view>
					</button>
				</view>
			</view>
			<view class="cancle" @tap="hideModel">取消</view>
		</u-popup>
		<!-- 地址弹出框 -->
		<u-popup v-model="defaultAddressMake" mode="bottom" border-radius="15">
			<view class="top">
				<view class="item">
					<view class="left">收货人</view>
					<input type="text" v-model="defalutAddressMakeForm.name" placeholder-class="line"
						placeholder="请填写收货人姓名" />
				</view>
				<view class="item">
					<view class="left">手机号码</view>
					<input type="number" v-model="defalutAddressMakeForm.mobile" maxlength="11" placeholder-class="line"
						placeholder="请填写收货人手机号" />
				</view>
				<picker mode="region" @change="chooseDefaultAddress">
					<view class="item">
						<view class="left">所在地区</view>
						<view class="flex-sub">
							{{defalutAddressMakeForm.address?defalutAddressMakeForm.address:'请选择省市区'}}
						</view>
					</view>
				</picker>

				<view class="item address" style="height: auto;">
					<view class="left">详细地址</view>
					<textarea type="text" v-model="defalutAddressMakeForm.detail" placeholder-class="line"
						placeholder="街道、楼牌等" />
				</view>
			</view>
			<view class="btn-box" style="padding: 30rpx;">
				<button class="bg-red text-white cu-btn lg block" @tap="addDefaultAddress">保存</button>
			</view>
			<u-picker mode="region" ref="uPicker" v-model="show" @confirm="chooseDefaultAddress" />
		</u-popup>
	</view>
</template>

<script>
	import dynamics from 'components/dynamics.vue'
	export default {
		data() {
			return {
				workGroupWid: "2021042017495732a907d876a3d41d580bb50d7b6a1ccf1",
				isLogin: false,
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
				checkedSkuMsg: null, //选中的规格的全部信息
				checkedSku: "", //选中的规格的名称拼接
				sku_id: 0,
				type: null,
				containerIndex: 0,
				dynamics: [], //动态列表,
				showBtn: false, //是否显示发布按钮
				addressList: [],
				address: null,
				selectedAddress: null,
				brandFirstImg: '', //图文详情第一张图片
				brandLastImg: '', //图文详情最后一张图片
				// region_select: false, //选择地址
				// region: uni.getStorageSync("region"),
				// regionPicker: [],
				// regionPickerIndex: [0, 0, 0],
				// selectedRegion: null,
				jcookStockState: null,
				defaultAddressMake: false,
				defalutAddressMakeForm: {
					name: "",
					mobile: "",
					address: "",
					detail: "",
				},
				shoppingTrolleyCount: 0,
				miniSku: {},
				commission: '',
				originPrice: '',
				price: '',
				min: 0,
				needStock: true,
			}
		},
		components: {
			dynamics
		},
		onShow() {
			if (this.needStock && this.sku_id != 0&&!this.selectedAddress) {
				console.log('获取地址后刷新')
				this.jcookStockCheck()
			}
		}, 
		onLoad(options) {
			// var num = uni.getStorageSync('num');
			// console.log('数量',num)

			console.log('goodsDetail页面参数：', options);
			var pages = getCurrentPages();
			// 上一页面栈
			var prevPage = pages[pages.length - 2];
			//{{selectedAddress.province}}-{{selectedAddress.city}}-{{selectedAddress.district}}
			if (prevPage) {
				const params = prevPage.options

				// this.selectedAddress.province=params.province
				// this.selectedAddress.city=params.city
				// this.selectedAddress.district=params.district
				console.log(prevPage.options, );

			}
			// 上一页面跳转携带的参数

			if (uni.getStorageSync("auth").token) {
				this.isLogin = true
			} else {
				this.isLogin = false
			}

			if (undefined != options.invite && options.invite) {
				this.invite = options.invite
				this.$store.commit('setinvite', options.invite);
				uni.setStorageSync("invite", options.invite)
			}
			if (options.q !== undefined) {
				let url = decodeURIComponent(options.q)
				console.log(url);
				options.id = url.split("/")[6];
				console.log(url.split("/")[6]);
				console.log(url.split("/")[7]);
				console.log(url.split("/")[8]);
				if (url.split("/")[7] != undefined) {
					this.$store.commit('setinvite', url.split("/")[7]);
				}
				if (url.split("/")[8] != undefined) {
					this.type = url.split("/")[8];
				}
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
			this.getGoodsDetail()
		},
		computed: {
			swiperList() {
				let arr = []
				this.swiperImgList.map(item => {
					arr.push((item.url).substr(0, 4) === 'http' ? item.url : (this.IMAGE_URL + item.url))
				})
				return arr
			}
		},
		mounted() {
			// this.getRegions()
			console.log(uni.getStorageSync("userInfo").id)
		},
		methods: {



			backHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},

			gotoCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},

			changeNum(num, select) {
				console.log(num)
				if (this.checkedSkuMsg != null && select) {
					this.checkedSkuMsg.selectNum = num
					this.$forceUpdate()
				}

			},

			checkSku(index) {
				for (let i = 0; i < this.goodsDetail.sku.length; i++) {
					if (index != i) {
						this.goodsDetail.sku[i].skuChecked = false
					} else {
						this.goodsDetail.sku[index].skuChecked = !this.goodsDetail.sku[index].skuChecked;
					}
				}
				if (this.goodsDetail.sku[index].skuChecked) {
					this.checkedSkuMsg = this.goodsDetail.sku[index];
					this.checkedSku = this.goodsDetail.sku[index].name
					this.sku_id = this.checkedSkuMsg.id
				} else {
					this.checkedSkuMsg = null;
					this.checkedSku = "请选择规格"
					this.sku_id = 0
				}
				if (this.needStock && this.sku_id != 0) {
					this.jcookStockCheck()
				}

				this.$forceUpdate()
			},
			startChat() {
				console.log(this.miniSku)
				console.log(this.miniSku.code)
				console.log(this.miniSku.goodsId)
				console.log(this.miniSku.name)
				console.log((this.miniSku.discountPrice))
				console.log(this.miniSku.picUrl)
				if (!uni.getStorageSync("auth").token) {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
						currPage = pages[pages.length - 1];
					}
					console.log(currPage)
					let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
				} else {
					// 增加商品信息参数
					uni.navigateTo({
						url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid +
							'&type=workGroup&aid=&title=联系客服' +
							'&goods=1' +
							'&goods_categoryCode=' + this.miniSku.code +
							'&goods_content=' + uni.getStorageSync("userInfo").id +
							'&goods_id=' + this.miniSku.goodsId +
							'&goods_imageUrl=' + this.miniSku.picUrl +
							'&goods_price=' + (this.miniSku.sale_price) +
							'&goods_title=' + this.goodsDetail.goodsName +
							'&history=0' +
							'&lang=cn'
					});
				}


			},
			//判断图片
			judgeCover(val) {
				if (!val) {
					return
				}
				let arr = val.split('/')
				if (arr[0] === 'http:' || arr[0] === 'https:') {
					return val
				}
				return this.IMAGE_URL + val
			},


			chooseDefaultAddress(e) {
				console.log(e)
				this.defalutAddressMakeForm.address = e.detail.value
			},
			addDefaultAddress() {
				if (!this.defalutAddressMakeForm.name) {
					this.$u.toast("请填写收货人姓名");
					return
				}
				if (!this.defalutAddressMakeForm.mobile) {
					this.$u.toast("请填写手机号");
					return
				}
				if (!this.defalutAddressMakeForm.address) {
					this.$u.toast("请选择省市区");
					return
				}
				if (!this.defalutAddressMakeForm.detail) {
					this.$u.toast("请填写详细地址");
					return
				}
				let sendData = {
					Name: this.defalutAddressMakeForm.name,
					Mobile: this.defalutAddressMakeForm.mobile,
					Province: this.defalutAddressMakeForm.address[0],
					City: this.defalutAddressMakeForm.address[1],
					District: this.defalutAddressMakeForm.address[2],
					Address: this.defalutAddressMakeForm.detail,
					IsDefault: 1,
					UserID: uni.getStorageSync("userInfo").id
				}
				this.$u.post("/api/v1/users/address/add", sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.selectedAddress = res.data.data
					uni.showToast({
						title: "保存成功",
						success: (res) => {
							this.defaultAddressMake = false
						}
					})
				});
			},
			defaultAddressMakeFun() {
				if (uni.getStorageSync("auth").token) {
					// if (this.selectedAddress) {
					// 	return
					// 	} 
					uni.navigateTo({
						url: '/packageA/address/index?fromPage=goodsDetail'
					})
					//this.defaultAddressMake = true
				} else {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
						currPage = pages[pages.length - 1];
					}
					console.log(currPage)
					let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
					console.log(url)
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
					return false;
				}
			},

			jcookStockCheck() {
				if (this.sku_id != '' && !this.selectedAddress) {
					// this.$u.toast('未选择地址');
					return
				}
				let address = this.selectedAddress
				let param = {
					sku_id: this.sku_id,
					address: address.province + address.city + address.district,
					quantity: 1
				}
				this.$u.post("/api/v2/app/jcook/stock", param).then(res => {
					console.log(res)
					if (res.data.msg === '该商品不需要调用') {
						this.jcookStockState = 1
					} else {
						this.jcookStockState = res.data.data.stock_state
					}
				})
			},
			hideModel() {
				this.isShow = false
			},
			// 复制链接
			copyLink() {
				const that = this
				let url = `${this.H5_BASE_URL}/#/user/appRegister/${this.$store.state.invitationNo}`
				uni.setClipboardData({
					data: url,
					success: function() {
						console.log('success');
						that.hideModel()
					}
				});
			},
			// 分享海报
			postShare() {
				uni.navigateTo({
					url: '/packageA/postShare/postShare'
				})
			},
			parameterModel(bool) {
				this.parameterShow = bool
			},
			getUrlKey(url, name) { //获取url 参数
				return decodeURIComponent(
					(new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(
						/\+/g,
						'%20')) || null;
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
				// this.showTip = false
			},
			toBuy() {
				this.specModel(true)
				if (!uni.getStorageSync("auth").token) {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
						currPage = pages[pages.length - 1];
					}
					console.log(currPage)
					let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
				}

			},
			specModel(flag) {
				if (this.needStock) {
					if (!this.selectedAddress) {

						this.defaultAddressMakeFun()
						this.$u.toast("请先选择地址");
					} else {
						this.showSpecs = flag
					}
				} else {
					this.showSpecs = flag
				}

			},
			// 获取商品详情信息
			getGoodsDetail() {

				this.$u.post('/api/v1/goods/detail/summary_new', {
					userID: uni.getStorageSync("userInfo").id,
					GoodsID: this.id,
					is_sale: this.$store.state.isPifa
				}).then(res => {
					this.showLoading = false
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.goodsDetail = res.data.data

					console.log(this.goodsDetail);

					this.shoppingTrolleyCount = res.data.data.shoppingTrolleyCount
					// 商样图片  根据type判断放在什么位置
					if (res.data.data.notice.type === 1) {
						this.brandFirstImg = res.data.data.notice.img
						this.brandLastImg = ''
					} else if (res.data.data.notice.type === 2) {
						this.brandFirstImg = ''
						this.brandLastImg = res.data.data.notice.img
					} else {
						this.brandFirstImg = res.data.data.notice.img
						this.brandLastImg = res.data.data.notice.img
					}
					// 规格只有一个 默认选中
					if (this.goodsDetail.attributes.length === 1 && this.goodsDetail.attributes[0].children
						.length === 1) {
						this.selectName[0] = this.goodsDetail.attributes[0].children[0].name
						this.selectArr[0] = this.goodsDetail.attributes[0].children[0].id
						this.subIndex[0] = 0
					}
					if (this.goodsDetail.attributes.length > 1) {
						let arr = []
						if (this.goodsDetail.attributes[0].children[0].id < this.goodsDetail.attributes[1]
							.children[0].id) {
							this.goodsDetail.attributes.forEach((item) => {
								arr.unshift(item)
							})
							this.$set(this.goodsDetail, 'attributes', arr)
						}
					}

					this.swiperImgList = res.data.data.mainPhotos

					//获取商品详情图片列表
					this.getPictures()
					//初始化商品sku信息
					if (!uni.getStorageSync("userInfo").id) {
						this.initData()
					} else {
						this.$u.post('/api/v1/users/address/list', {
							UserID: uni.getStorageSync("userInfo").id
						}).then(res => {
							if (res.data.code == "FAIL") {
								this.$u.toast(res.data.msg);
								return
							}
							res.data.data.forEach(item => {
								if (item.isDefault === 1) {
									this.selectedAddress = item
								}
							})
							this.initData()
						});

					}
				})
			},

			//初始化商品规格sku信息
			initData() {
				//this.checkedSkuMsg = this.goodsDetail.sku[0]
				this.skuPrice = this.goodsDetail.sku[0].discountPrice || ''
				this.skuPhoto = this.IMAGE_URL + this.goodsDetail.sku[0].picUrl
				this.skuStoreCount = this.goodsDetail.sku[0].inventory
				this.checkedSku = "请选择规格"
				this.miniSku = this.goodsDetail.sku[0]

				var minPrice = this.goodsDetail.price.min.sale_price
				var maxPrice = this.goodsDetail.price.max.sale_price

				var minOriginPrice = this.goodsDetail.price.min.discountPrice
				var maxOriginPrice = this.goodsDetail.price.max.discountPrice

				var maxCommission = this.goodsDetail.price.max.discountPrice - this.goodsDetail.price.max.sale_price
				var minCommission = this.goodsDetail.price.min.discountPrice - this.goodsDetail.price.min.sale_price


				this.min = this.miniSku.min
				this.goodsDetail.sku.forEach(item => {
					if (this.min < item.min) {
						this.min = item.min
					}
				})

				if (this.goodsDetail.sku.length != 0) {
					for (let i = 0; i < this.goodsDetail.sku.length; i++) {
						this.goodsDetail.sku[i].skuChecked = false
						this.goodsDetail.sku[i].selectNum = this.goodsDetail.sku[i].min
					}
				}

				if (maxPrice == minPrice) {
					this.price = maxPrice.toFixed(2)
				} else {
					this.price = minPrice.toFixed(2) + "-" + maxPrice.toFixed(2)
				}

				if (minOriginPrice == maxOriginPrice) {
					this.originPrice = maxOriginPrice.toFixed(2)
				} else {
					this.originPrice = minOriginPrice.toFixed(2) + "-" + maxOriginPrice.toFixed(2)
				}

				if (minCommission == maxCommission) {
					this.commission = maxCommission.toFixed(2)
				} else {
					this.commission = minCommission.toFixed(2) + "-" + maxCommission.toFixed(2)
				}


				// if (this.goodsDetail.sku.length === 1) {
				// 	this.checkedSku = this.goodsDetail.sku[0].name
				// 	this.sku_id = this.goodsDetail.sku[0].id
				// 	console.log(this.sku_id)
				// }
				for (let i in this.goodsDetail.sku) {

					this.shopItemInfo[this.goodsDetail.sku[i].combineId.split(",").reverse().join(",")] = this
						.goodsDetail
						.sku[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
					if ((this.goodsDetail.sku[i].discountPrice - this.goodsDetail.sku[i].commission) < (this.miniSku
							.discountPrice - this.miniSku.commission)) {
						this.miniSku = this.goodsDetail.sku[i]
					}
				}

				if (this.goodsDetail.vendorId == 1800 || this.goodsDetail.vendorId == 2000 || this.goodsDetail.vendorId ==
					3000) {
					this.needStock = true
				}
				console.log(this.miniSku)

			},



			//获取商品详情图片
			getPictures() {
				this.$u.post('/api/v1/goods/detail/photo', {
					GoodsID: this.id
				}).then(res => {

					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.pictures = res.data.data.list
				});

			},


			//添加购物车 判断是否登录
			addcart() {

				if (uni.getStorageSync("auth").token) {
					console.log(this.sku_id)
					console.log(this.checkedSkuMsg)
					if (this.checkedSkuMsg == null) {
						this.$u.toast("请选择商品规格")
						return
					}
					this.$u.post('/api/v2/app/shop_cart/add', {
						user_id: uni.getStorageSync("userInfo").id,
						sku_list: [{
							sku_id: this.sku_id,
							quantity: this.checkedSkuMsg.selectNum
						}]
					}).then(res => {
						console.log(res.data);
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						uni.showToast({
							title: "已加入购物车"
						})
						this.shoppingTrolleyCount += this.buyNum
						this.specModel(false)
					})
				} else {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
						currPage = pages[pages.length - 1];
					}
					console.log(currPage)
					let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
					console.log(url)
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
					return false;
				}

			},
			//创建预购单 判断是否登录
			createOrder() {
				let roleLevel = this.$store.state.userBrief.level
				let isOffline = this.$store.state.userBrief.is_offline
				let isEnterprise = this.$store.state.userBrief.is_enterprise
				if(!((roleLevel==2&&isOffline)||(roleLevel==10))){
					uni.showModal({
						title: '提示',
						content: '批发下单需开通VIP店铺',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.redirectTo({
									url: "/pages/vip/vipBuy"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				if (!this.sku_id) {
					
					this.$u.toast("请选择商品规格")
					return
				} else {
					if (this.needStock) { //需要判断是否有货的商品类型
						if(this.jcookStockState != 1){
							this.$u.toast("当前无货")
							return
						}
					} 
				}
				
				var skuList = [{
					"sku_id": this.sku_id,
					"quantity": this.checkedSkuMsg.selectNum
				}]
				let sendData = {
					user_id: uni.getStorageSync("userInfo").id,
					sku_list:skuList,
					channel:0
				}
				if (uni.getStorageSync("auth").token) {
					if (this.parentId) {
						sendData.ParentID = this.parentId
					}

					if (uni.getStorageSync("invite")) {
						sendData.invite = uni.getStorageSync("invite")
					}
					// 此时创建普通订单预览
					console.log(sendData);
					this.$u.post('/api/v2/app/order/preview', sendData).then(res => {
						if (res.data.code == "FAIL") {
							this.$u.toast(res.data.msg);
							return
						}
						let preViewMsg = res.data.data
						
						this.$store.commit('updatePreOrderMsg', preViewMsg);

						console.log("updatePreOrderMsg", res.data.data)
						
						uni.navigateTo({
							url: "/package_pifa/pifaConfirmOrder/pifaConfirmOrder"
						})
						this.specModel(false)
					});
				} else {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
						currPage = pages[pages.length - 1];
					}
					console.log(currPage)
					let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
					console.log(url)
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
					return false;
				}

			},
			isMay(result) {
				// console.log('shopItemInfo', this.shopItemInfo)
				// console.log('result', result)

				//匹配选中的数据的库存，若不为空返回true反之返回false
				for (var i in result) {
					if (result[i] == '') {
						return true; //如果数组里有为空的值，那直接返回true
					}
				}
				//console.log(this.shopItemInfo[result])
				if (!this.shopItemInfo[result]) {
					return false
				}
				return this.shopItemInfo[result].inventory == 0 ? false : true;
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
					this.downloadSave(pics[i].url)
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

			handClick(val) {
				console.log(val)
				wx.previewImage({
					current: this.swiperList[val], // 当前显示图片的http链接
					urls: this.swiperList // 需要预览的图片http链接列表
				})
			},

			goLogin() {
				if (!uni.getStorageSync("auth").token) {
					this.$u.toast("游客无法使用该功能，请登录");
					let pages = getCurrentPages();
					let currPage = null;
					if (pages.length) {
						currPage = pages[pages.length - 1];
					}
					console.log(currPage)
					let url = '/' + currPage.route + '?id=' + currPage.options.id + '&type=share'
					this.$store.commit('setUrl', url)
					setTimeout(() => {
						uni.navigateTo({
							url: "../login/login"
						})
					}, 1000)
				}
			}
		},
		onShareAppMessage(res) {
			let shareObj = {
				title: "我在买" + this.goodsDetail.goodsName + ",快来看看吧！",
				path: '/pages/goodsDetail/goodsDetail?id=' + this.id + "&type=share&invite=" + this.$store.state
					.invitationNo,
				imageUrl: this.goodsDetail.mainPhotos[0].url
			}
			// if (res.from === 'button') { // 来自页面内分享按钮
			// 	console.log(this.$store.state.invitationNo)
			// 	if (this.roleLevel == 500) {
			// 		shareObj = {
			// 			title: uni.getStorageSync('userInfo').nickname + "正在邀请您加入瑞库客，0成本带您玩转副业",
			// 			path: '/pages/login/login?type=share&invite=' + this.$store.state.invitationNo,
			// 			imageUrl: this.IMAGE_URL + '/wxapp/invite.jpg'
			// 		}
			// 	}
			// } else {
			// 	if (!this.isLogin) {
			// 		shareObj = {
			// 			title: "阿库网络公司正在邀请您加入瑞库客，0成本带您玩转副业",
			// 			path: '/pages/index/index?invite=' + this.$store.state.invitationNo,
			// 			imageUrl: this.IMAGE_URL + '/wxapp/invite.jpg'
			// 		}
			// 	}
			// }
			console.log(shareObj)
			return shareObj
		}
	}
</script>

<style lang="scss">
	.cuIcon-badge {
		position: absolute;
		top: 0;
		left: 80rpx;
		border-radius: 50rpx;
		color: #ffffff;
		background-color: #f71b1b;
		display: inline-block;
		font-size: 24rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 0 10rpx;
		text-align: center;
		white-space: nowrap;
		border: 2rpx solid #f56c6c;

	}


	.parameter-box {
		.parameter-list {
			display: flex;
			margin-bottom: 30rpx;

			.lf {
				color: #121212;
				padding-left: 50rpx;
				width: 220rpx;
			}

			.rg {
				color: #bebebe;
			}
		}

	}

	.goods_box {
		.goods_icon {
			text-align: center;
			color: #CCCCCC;
			width: 120rpx;

			image {
				width: 52rpx;
				margin: 0 auto;
			}
		}

		.goods_icon_hr {
			flex: 1;
			height: 1rpx;
			border-bottom: 1rpx dashed #CCCCCC;

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


	.kefu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 150rpx;
		right: 30rpx;
		width: 100rpx;
		height: 100rpx;
		line-height: 40rpx;
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

		margin-top: -40rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		height: 160rpx;
		background-color: transparent;

		.pic-con {
			position: absolute;
			top: 30rpx;
			left: 30rpx;

			.quan-top {
				line-height: 46rpx;
				margin-bottom: 20rpx;
				width: 100%;
				justify-items: end;
				// justify-content: space-between;
				display: flex;

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

	.title {
		display: contents;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3
	}


	.goods-msg-box {
		.goods-name {
			color: #000;
			font-size: 32rpx;
			line-height: 45rpx;
			padding: 0 20rpx;
			font-weight: 700;

			image {
				width: 48rpx;
				height: 32rpx;
				margin-right: 10rpx;
				display: inline-block;
				vertical-align: text-bottom;
			}
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


	.share-box {
		padding: 50rpx 0;

		.share-icon {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-bottom: 10rpx;
		}

		.txt {
			font-size: 26rpx;
		}

		button {
			border: 0;
			padding: 0;
			background-color: #FFFFFF;
			line-height: normal;
		}

		button::after {
			content: none;
		}
	}

	.cancle {
		border-top: 1rpx solid #f1f1f1;
		line-height: 90rpx;
		text-align: center;
	}

	.feeContainer {
		background: #FFFFFF;
		margin-bottom: 10px;

		.fc1 {
			display: flex;
			justify-content: space-between;
			height: 44px;
			margin: 0 8px;
			align-items: center;

			.discountPrice {
				color: #D5101A;

				.dp1 {
					font-size: 14px;
					margin-right: 4px;
				}

				.dp2 {
					font-size: 16px;
				}

				.dp3 {
					font-size: 28px;
				}
			}

			.saledTotal {
				color: #700000;
			}
		}

		.fc2 {
			display: flex;
			align-items: center;
			height: 38px;
			margin: 0 8px;

			.fct {
				font-size: 12px;
				line-height: 12px;
				color: #D5101A;
				border: 1px solid #D5101A;
				padding: 3px;
				margin-right: 16px;
			}

			.fcp {
				font-size: 16px;
				text-decoration: line-through;
				color: #999999;
			}
		}
	}


	/// addsite copy!!!!
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;

		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 45rpx;
			padding: 30rpx 0;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;

			.left {
				width: 180rpx;
			}

			input {
				text-align: left;
				flex: 1;
			}
		}

		.address {
			padding: 20rpx 0;

			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 20rpx auto;
				padding: 20rpx;
			}
		}

		.site-clipboard {
			padding-right: 40rpx;

			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}

			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;

				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
