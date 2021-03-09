<template>
	<view class="u-wrap">
		<view class="search-box bg-white">
			<view class="search-con flex justify-between">
				<text class="cuIcon-search"></text>
				<input class="flex-sub" type="text" v-model="keyword" confirm-type="search" placeholder="请输入想要搜索的内容" @confirm="toSearch()" />
			</view>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in cateList" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :data-current="index" @tap.stop="swichMenu(index,item.id)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="right-box">
				<view class="item-container">
					<image v-if="topPic" :src="IMAGE_URL+topPic" mode="widthFix"></image>
					<view class="null flex flex-direction justify-center align-center" v-if="subCateList.length==0" style="height: 600rpx;">
						<image :src="IMAGE_URL + '/null05.png'"  style="width: 250rpx;" mode="widthFix"></image>
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无内容</view>
					</view>
					<view class="flex flex-wrap" v-else style="padding: 15rpx;">
						<view class="thumb-box" v-for="(item1, index1) in subCateList" :key="index1" @tap="toSearch(item1.id)">
							<view class="item-menu-image">
								<u-lazy-load threshold="-100" border-radius="60" :image="IMAGE_URL+item1.logoUrl" :index="index" height="120" :error-img="IMAGE_URL + '/null05.png'"  :loading-img="IMAGE_URL + '/null05.png'"  mg-mode="aspectFill"></u-lazy-load>
							</view>
							<view class="item-menu-name">{{item1.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				IMAGE_URL: this.IMAGE_URL,
				cateList: [],
				subCateList: [],
				parentId: null,
				keyword: "",
				topPic:""
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.index) {
				this.current = options.index
			}
			this.getCateList()
		},
		methods: {
			// 一级分类列表
			getCateList() {
				this.$u.post('/api/v1/goods/categories/first').then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.cateList = res.data.data
					this.parentId = this.cateList[this.current].id
					this.topPic = this.cateList[this.current].logoUrl
					console.log(this.parentId,this.topPic)
					this.getSubCateList()
				})
			},
			//获取子分类列表
			getSubCateList() {
				this.$u.post('/api/v1/goods/categories/children', {
					ParentId: this.parentId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.subCateList = res.data.data
				});
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			toSearch(id) {
				// 传了id则是点击分类进入搜索页,没有传则是搜索关键字进入搜索页
				if (id) {
					uni.navigateTo({
						url: "/pages/search/search?cate_id=" + id
					})
				} else {
					uni.navigateTo({
						url: "/pages/search/search?keyword=" + this.keyword,
						success: () => {
							this.keyword = ""
						}
					})
				}
			},
			// 点击左边的栏目切换
			async swichMenu(index, id) {
				if (index == this.current) return;
				this.current = index;
				this.topPic = this.cateList[index].logoUrl
				this.parentId = id
				this.getSubCateList()
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
		color: #C92219;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 6rpx solid #C92219;
		height: 50rpx;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
		width: 550rpx;
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
		margin-top: 10rpx;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 15rpx 0;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.search-box {
		height: 100rpx;
		padding: 15rpx 20rpx;
	}

	.search-con {
		background-color: #F9F9FB;
		border-radius: 35rpx;
		line-height: 70rpx;
		padding: 0 20rpx;

		input {
			height: 70rpx;
			padding-left: 20rpx;
		}
	}
</style>
