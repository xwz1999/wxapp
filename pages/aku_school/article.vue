<template>
	<view class="article_container">
		<view class="title">
			{{article.title}}
		</view>
		<view class="info">
			<span class='info1'>{{article.sub_title}}</span>
			<span class='info2' v-if='article'>{{article.create_d_time.substr(0,10)}}</span>
			<span class='info2'>已学习{{article.number_of_hits}}</span>
		</view>
		<video v-if='article.video_url' :src="IMAGE_URL+article.video_url">
		</video>
		<rich-text v-if="article.text_body" :nodes="article.text_body"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMAGE_URL: this.IMAGE_URL,
				article: null,
			}
		},
		onLoad(options) {
			let that = this
			this.getOpenerEventChannel().on('acceptDataFromOpenerPage', function(article) {
				const CONTENT = article.text_body.replace(
					/\<img/gi,
					'<img style="width:100%;height:auto" '
				);
				article.text_body = CONTENT
				that.article = article
			});
		},
		methods: {}
	}
</script>

<style lang="scss">
	.article_container {
		padding: 20px 5px;

		.title {
			font-size: 20px;
			font-weight: 500;
			margin-bottom: 10px;
		}
		video{
			width: 100%;
		}
		.info {
			font-size: 12px;
			margin-bottom: 20px;
			.info1 {
				color: #333333;
			}

			.info2 {
				color: #999999;
				margin-left: 20px;
			}
		}
	}
</style>
