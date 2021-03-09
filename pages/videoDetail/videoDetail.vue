<template>
	<view>
		<video class="video" :src="videoDetail.mediaUrl" loop autoplay enable-play-gesture :controls="false"
		 enable-progress-gesture></video>
		<view class="top-box">
			<u-navbar :is-fixed="false" :is-back="false" background="transparent" :border-bottom="false"></u-navbar>
			<view class="flex justify-between text-white align-center top-con">
				<view class="flex align-center top-left round">
					<view class="avatar">
						<u-lazy-load threshold="-100" :image="IMAGE_URL+videoDetail.headImgUrl" :index="index" height="70" border-radius="35"
						 :error-img="IMAGE_URL + '/null05.png'"  @click="toUserHomePage(videoDetail.userId)"></u-lazy-load>
					</view>
					<view class="user-info">
						<view style="font-size: 26rpx;">{{videoDetail.nickname}}</view>
						<view style="font-size: 20rpx;">点赞数 {{videoDetail.praise}}</view>
					</view>
					<view class="btn round bg-red shadow" @tap="addFollow">+关注</view>
				</view>
				<text class="cuIcon-close" style="font-size: 48rpx;" @tap="back"></text>
			</view>
		</view>
		<view class="goods-box flex justify-between text-white">
			<navigator :url="'../goodsDetail/goodsDetail?id='+videoDetail.goods.id" class="goods-left bg-white">
				<view class="goods-pic">
					<u-lazy-load threshold="-100" :image="IMAGE_URL+videoDetail.goods.mainPhotoURL" :index="index" height="180"
					 :error-img="IMAGE_URL + '/null05.png'" ></u-lazy-load>
					<view class="name text-hidden">{{videoDetail.goods.name}}</view>
				</view>
				<view class="text-center text-red price">￥{{videoDetail.goods.price | toFixed(2)}}</view>
			</navigator>
			<view class="flex-sub goods-content clear">
				<view class="">{{videoDetail.content}}<text class="text-orange" v-if="videoDetail.topicName">#{{videoDetail.topicName}}</text></view>
			</view>
			<view class="flex flex-direction justify-around text-white btns-con">
				<!-- 视频转发功能，接口需要改动（最好详情接口把所有数据返回，要么前端将数据全部带出去，接收者进入页面是加判断是否有参数接收，有则修改vuex状态管理中视频详情的值） -->
				<!-- <button class="btn-item" open-type="share"><text class="cuIcon-forwardfill"></text></button> -->
				<button class="btn-item" @tap="showCommentsModel"><text class="cuIcon-commentfill"></text></button>
				<button class="btn-item" @tap="setPraiseVideo"><text class="cuIcon-likefill" :class="videoDetail.isPraise?'red':''"></text></button>
			</view>
		</view>

		<u-popup v-model="isShow" mode="bottom" border-radius="20" closeable>
			<view class="comments-box flex flex-direction">
				<view class="comment-top flex">
					<view class="">评论</view>
					<text class="comment-count">（{{comments_count}}）</text>
				</view>
				<scroll-view class="comment-con flex-sub" style="height: 0;" scroll-y="true" @scrolltolower="getComments">
					<view class="flex flex-direction justify-center align-center null" v-if="isNull">
						<image :src="IMAGE_URL + '/null05.png'"  style="width: 240rpx;margin-top: 120rpx;" mode="widthFix"></image>
						<view style="font-size: 28rpx;color: #AAAAAA;margin-top: 10rpx;">暂无评论</view>
					</view>
					<view class="comment-center" v-else>
						<view class="comment-item flex justify-between align-start" v-for="(item,index) in comments" :key="index">
							<view class="comment-avatar">
								<u-lazy-load threshold="-100" border-radius="25" :image="IMAGE_URL+item.headImgUrl" :index="index" height="50"
								 :error-img="IMAGE_URL + '/null05.png'" ></u-lazy-load>
							</view>
							<view class="item-center flex-sub clear">
								<view class="name">{{item.nickname}}</view>
								<view class="content">{{item.content}}</view>
								<view class="time">{{item.createdAt}}</view>
							</view>
							<view class="flex flex-direction text-center">
								<text class="item-right cuIcon-likefill" :class="item.isPraise?'red':''" @tap="setPraiseComment(index,item.id)"></text>
								<view style="font-size: 18rpx;color: #AAAAAA;">{{item.praise}}</view>
							</view>
						</view>
						<u-loadmore :status="loadStatus" margin-top="10" margin-bottom="20" />
					</view>
				</scroll-view>
				<view class="comment-bottom flex justify-between align-center bg-white shadow">
					<input class="flex-sub" type="text" v-model="content" placeholder="随便说两句~" />
					<view class="send bg-red round text-white text-center" @tap="addComment">评论</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				IMAGE_URL: this.IMAGE_URL,
				isShow: false,
				comments: [],
				page: 1,
				comments_count: 0,
				isNull: false,
				stopLoad: false,
				content: "",
				loadStatus: 'loadmore'
			};
		},
		computed: {
			videoDetail() {
				return this.$store.state.videoDetail
			}
		},
		onLoad() {
			this.getComments()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			showCommentsModel() {
				this.isShow = true
			},
			toUserHomePage(id) {
				// 这边由于视频列表没有判断是否关注的字段,所以暂时先没有跳转
				return
				uni.navigateTo({
					url: "../userHomePage/userHomePage?userId=" + id
				})
			},
			//获取动态评论列表
			getComments() {
				if (this.stopLoad) {
					return
				}
				this.loadStatus = "loading"
				let sendData = {
					trendId: this.videoDetail.trendId,
					parentId: 0,
					page: this.page,
					limit: 15
				}
				this.page++
				this.$u.post('/api/v1/live/user/trend/comment/list', sendData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					this.comments_count = res.data.data.count
					let list = res.data.data.list
					if (list.length == 0) {
						this.stopLoad = true
						this.loadStatus = "nomore"
						if (this.page == 2) {
							this.isNull = true
						}
						return
					}
					if(list.length<15){
						this.stopLoad = true
						this.loadStatus = "nomore"
					}
					this.comments.push(...list)
				});
			},
			//发表评论
			addComment() {
				if (!this.content) {
					this.$u.toast("请输入评论内容");
					return
				}
				this.$u.post('/api/v1/live/user/trend/comment/add', {
					trendId: this.videoDetail.trendId,
					parentId: 0,
					content: this.content
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.showToast({
						title: "评论成功"
					})
					// this.comments.unshift({
					// 	headImgUrl:uni.getStorageSync('userInfo').headImgUrl,
					// 	nickname:uni.getStorageSync('userInfo').nickname,
					// 	content:this.content,
					// 	createdAt:"刚刚"
					// })
					this.content = ""
					this.page = 1
					this.stopLoad = this.isNull = false
					this.comments = []
					this.getComments()
				});
			},
			//视频动态点赞
			setPraiseVideo() {
				let reqUrl = ""
				if (this.videoDetail.isPraise) {
					this.videoDetail.isPraise = 0
					reqUrl = "/api/v1/live/user/trend/praise/cancel"
				} else {
					this.videoDetail.isPraise = 1
					reqUrl = "/api/v1/live/user/trend/praise/add"
				}
				this.$u.post(reqUrl, {
					trendId: this.videoDetail.trendId
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					if (this.videoDetail.isPraise) {
						this.$u.toast("感谢点赞~");
					} else {
						this.$u.toast("给我点个赞吧T-T");
					}
				});
			},
			//评论点赞
			setPraiseComment(index, id) {
				let reqUrl = ""
				if (this.comments[index].isPraise) {
					this.comments[index].isPraise = 0
					this.comments[index].praise--
					reqUrl = "/api/v1/live/user/trend/comment/praise/cancel"
				} else {
					this.comments[index].isPraise = 1
					this.comments[index].praise++
					reqUrl = "/api/v1/live/user/trend/comment/praise/add"
				}
				this.$u.post(reqUrl, {
					commentId: id
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
				});
			},
			//添加关注
			addFollow() {
				this.$u.post('/api/v1/live/user/follow/add', {
					followUserId: this.videoDetail.userId
				}).then(res => {
					console.log(res.data);
					// if (res.data.code == "FAIL") {
					// 	this.$u.toast(res.data.msg);
					// 	return
					// }
					// 由于列表接口没有状态值判断是否关注,所以这边每次进来都是显示未关注状态,
					// 点击关注会请求关注接口,这边的接口是已关注的再关注回返回关注失败,为了体验好一点,这边固定提示关注成功
					this.$u.toast("关注成功");
				});
			}
		}
	}
</script>

<style lang="scss">
	.video {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.top-box {
		position: fixed;
		width: 100%;
		top: 0;
		background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));

		.top-con {
			padding: 0 30rpx;

			.top-left {
				padding: 10rpx;
				overflow: hidden;
				background-color: rgba(0, 0, 0, 0.3);

				.avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.user-info {
					margin: 0 15rpx;
					line-height: 35rpx;
				}

				.avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.user-info {
					margin: 0 15rpx;
					line-height: 35rpx;
				}
			}

			.btn {
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 20rpx;
				text-align: center;
				font-size: 26rpx;
			}
		}
	}



	.goods-box {
		padding: 50rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1));

		.goods-left {
			border-radius: 10rpx;
			overflow: hidden;

			.goods-pic {
				width: 180rpx;
				height: 180rpx;
				position: relative;

				.name {
					position: absolute;
					bottom: 0;
					width: 100%;
					background-color: rgba(0, 0, 0, 0.4);
					font-size: 26rpx;
					color: #FFFFFF;
					padding: 0 15rpx;
					box-sizing: border-box;
					line-height: 40rpx;
				}

				.price {
					line-height: 40rpx;
				}

			}
		}

		.goods-content {
			margin: 0 15rpx;
			margin-right: 30rpx;
			line-height: 40rpx;
			word-break: normal;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			-webkit-box-orient: vertical;
			box-sizing: border-box;
		}

		.btns-con {
			text {
				font-size: 44rpx;
				color: #FFFFFF;
			}

			.btn-item {
				background-color: transparent;
				border: 0;
				padding: 0;
				margin: 0;
				line-height: normal;

				&::after {
					content: none;
				}
			}
		}
	}

	.red {
		color: red !important;
	}

	.comments-box {
		height: 800rpx;

		.comment-top {
			line-height: 60rpx;
			font-weight: 700;
			padding: 20rpx 30rpx;
			padding-bottom: 0;
			font-size: 32rpx;

			.comment-count {
				color: #AAAAAA;
				font-size: 26rpx;
				font-weight: normal;
			}
		}

		.comment-center {
			padding: 0 30rpx;

			.comment-item {
				padding: 10rpx 0;

				.comment-avatar {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.item-center {
					margin: 0 15rpx;

					.name {
						line-height: 50rpx;
						font-weight: 700;
						font-size: 28rpx;
					}

					.content {
						font-size: 26rpx;
						margin-bottom: 10rpx;
					}

					.time {
						font-size: 22rpx;
						color: #888888;
					}
				}

				.item-right {
					color: #DDDDDD;
				}
			}
		}


		.comment-bottom {
			padding: 0 30rpx;
			height: 90rpx;
			box-shadow: 0 0 10rpx 1rpx rgba(0, 0, 0, 0.1);

			input {
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				background-color: #f5f5f5;
				padding: 0 20rpx;
			}

			.send {
				height: 60rpx;
				line-height: 60rpx;
				margin-left: 20rpx;
				width: 125rpx;
			}
		}
	}
</style>
