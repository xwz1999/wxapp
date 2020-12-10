<template>
	<view>
		<view class="padding">
			<button class="bg-gradual-blue" @tap="chooseImage">上传图片</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res.tempFilePaths);
						let pics = res.tempFilePaths
						for (let i = 0; i < pics.length; i++) {
							this.uploadPic(pics[i]) 
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
						if(result.code=="SUCCESS"){
							console.log(result.data.data.url)
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
