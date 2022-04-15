<template>
	<view>
		<image class="topImage" :src="IMAGE_URL+'/wxapp/uni-program/icon/aku_college2.png'" mode="widthFix"></image>
		<view class="searchErea">
			<u-input v-model="searchWord" type="text" placeholder='搜一下是否有您想要的内容' placeholderStyle="font-size:24rpx;"
				@confirm='search' />
			<view class="inputRight">
				<text style="color:#D3D3D3" decode="true">&nbsp;&nbsp;｜&nbsp;&nbsp;</text>
				<u-icon name="search" color="#FF446B" @click='search'></u-icon>
			</view>
		</view>
		<scroll-view scroll-y="true" class="list" refresher-enabled="true" enable-flex="true"
			@refresherrestore="onRestore" @refresherrefresh="onRefresh" :refresher-triggered="triggered">
			<view class="item" v-for="item in akuSchoolList">
				<view class="VD">
					<video v-if='item.video_url' :src="IMAGE_URL+item.video_url" :poster="IMAGE_URL+item.cover_url"
						@play.stop="article_hit(item.id)" object-fit='fill'>
					</video>
					<image v-else :src="IMAGE_URL+item.cover_url" mode=""></image>
				</view>
				<view class="title" @click="article_nav(item)">{{item.title}}</view>
				<view class="bottom" @click="article_nav(item)">
					<text>{{item.sub_title}}</text>
					<text>{{item.number_of_hits}}人看过</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				triggered: false,
				akuSchoolList: null
			}
		},
		onLoad() {
			this._freshing = false;
			this.getAkuSchookList()
		},
		methods: {
			onRefresh() {
				if (this._freshing) return;
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
				this.getAkuSchookList()
			},
			//开始结束下拉的函数
			onRestore() {
				this.triggered = 'restore'; // 关闭动画
			},
			getAkuSchookList() {
				let params = {
					title: this.searchWord,
					page: {
						limit: 10,
						page: 1
					}
				}
				this.$u.post('/api/v2/app/aku_school/school_list', params).then(res => {
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.akuSchoolList = res.data.data.list
				})
			},
			search() {
				this.getAkuSchookList()
			},
			article_nav(item) {
				this.article_hit(item.id)
				uni.navigateTo({
					url: './article',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', item);
					}
				})
			},
			article_hit(id) {
				this.$u.post('/api/v2/app/aku_school/add_hits', {
					id
				})
			}
		}
	}
</script>

<style lang="scss">
	.topImage {
		width: 100vw;
	}

	.searchErea {
		width: 70%;
		height: 60rpx;
		margin: 20px auto;
		border-radius: 20rpx;
		box-shadow: 0 2px 4px 0px #d3d3d3;
		line-height: 60rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 24rpx;
	}

	.list {
		display: flex;
		flex-wrap: wrap;

		.item {
			width: 45%;
			margin: 16rpx;
			border-radius: 0 0 10rpx 10rpx;
			box-shadow: 0 2px 4px 0px #d3d3d3;

			.VD {
				position: relative;
				width: 100%;
				height: 0;
				padding-bottom: 56.25%;
				/*因为padding和margin等受width影响，父容器固定后，子标签可以进行填充。此处是56.25%是9/16，其他比例可以依照此法*/

				video {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					align-items: center;
					border-radius: 10rpx 10rpx 0 0;
				}

				image {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					align-items: center;
					border-radius: 10rpx 10rpx 0 0;
				}
			}

			.title {
				font-size: 24rpx;
				font-weight: 500;
				text-align: center;
				margin: 8rpx;
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				font-size: 20rpx;
				margin: 40rpx 10rpx 10rpx 10rpx;
				color: #808080;
			}
		}
	}
</style>
