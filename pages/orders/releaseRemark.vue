<template>
	<view class="">
		<view class="card-box">
			<view class="head-box flex align-center">
				<view class="lf bg-img" :style="'background-image: url('+IMAGE_URL+pageData.mainPhotoUrl+');'"></view>
				<view class="rg">
					<view class="title">
						<text>{{pageData.goodsName}}</text>
					</view>
					<view class="pic">
						<text>型号规格 {{pageData.skuName}}</text>
					</view>
				</view>
			</view>
			<view class="content">
				<textarea v-model="value" border placeholder="宝贝满足你的期待吗？说说你的使用心得，和大家分享吧" />
				</view>
			<view>
				<view class="grid col-3 grid-square">
					<view class="image-item bg-img" v-for="(item,index) in images" :key="index" :style="'background-image: url('+IMAGE_URL+item.path+');'">
						<view class="del-icon">
							<text class="cuIcon-roundclosefill" @tap="delImage(index)"></text>
						</view>
					</view>
					<view  @tap="chooseImage" class="upload" v-if="images.length<maxLength">
						<view class="" style="padding-top: 40rpx;">上传图片</view>
						<view class="">(最多{{maxLength}}张)</view>
						<view class="">
							<text class="cuIcon-pic" style="font-size: 48rpx;"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-box" @click="submit">
			<view class="btn">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				pageData: null,
				value:null,
				maxLength:6,
				images:[],
				goodsDetailId:null
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.data));
			this.pageData = data
			this.goodsDetailId = parseInt(data.goodsDetailId)
			console.log(data)
		},
		methods: {
			submit(){
				if(this.content ==='' ){
					this.$u.toast('请填写内容');
					return
				}
				let resData = {
					userId: uni.getStorageSync("userInfo").id,
					goodsDetailId:this.goodsDetailId,
					content:this.value,
					images:this.images
				}
				this.$u.post('/api/v1/order/evaluation/createOrderEvaluationOne', resData).then(res => {
					console.log(res.data);
					if (res.data.code == "FAIL") {
						this.$u.toast(res.data.msg);
						return
					}
					uni.navigateBack({
						delta: 1
					});
					uni.$emit("releaseSuccess", {
						msg: '评论成功'
					});
				
				});
			},
			chooseImage(){
				uni.chooseImage({
					count: this.maxLength-this.images.length, 
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						console.log(res)
						console.log(res.tempFilePaths);
						let pics = res.tempFilePaths
						for (let i = 0; i < pics.length; i++) {
							this.uploadPic(pics[i])
						}
					}
				});
			},
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
								this.images.push({
									path:result.data.data.url,
									width:null,
									height:null
								})
							} else {
								this.$u.toast("最多上传"+this.maxLength+"张图片");
							}
						}
					}
				});
			},
		}
	}
</script>


<style lang="scss" scoped>
	.btn-box{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: #C92219;
	}
	.card-box {
		margin: 30rpx;
		padding: 20rpx;
		background: #FFFFFF;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		font-size: 24rpx;
		border-radius: 16rpx;
		.head-box {
			margin-bottom: 46rpx;

			.lf {
				width: 112rpx;
				height: 112rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.rg {
				.title {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.pic {
					font-size: 26rpx;
				}
			}
		}

		.content {
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 112rpx;
		}
		.upload {
			border: 1rpx solid #DDDDDD;
			box-sizing: border-box;
			text-align: center;
		}
		.image-item {
			width: 100%;
			height: 100%;
			position: relative;
			.del-icon{
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				.cuIcon-roundclosefill{
					font-size: 32rpx;
					color: rgba(0, 0, 0, 0.6);
				}
			}
			 
		}
	}
</style>
