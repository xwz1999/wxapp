<template>
	<view class="box">
		<canvas class="progress" canvas-id="progress"></canvas>
	</view>
</template>

<script>
	export default {
		props:{
			colorStart:{
				type:String,
				default:() => '#E0AE5C',
			},
			colorEnd:{
				type:String,
				default:() => '#ECD5A7',
			}
		},
		data() {
			return {};
		},
		mounted() {
			let r = this.convert_length(80)
			this.Progressbar(40, 100, r, this.colorStart, this.colorEnd);	
		},
		methods: {
			Progressbar(remain, total, r, colorStart, colorEnd) {
				const setLineWidth = this.convert_length(10)
				const context = wx.createContext();
				// 打底灰色曲线
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r, 0, 2 * Math.PI);
				context.setLineWidth(setLineWidth);
				context.setStrokeStyle('#FFFFFF');
				context.stroke();
				//绘制打底曲线的边线
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r - (setLineWidth / 2), 0, 2 * Math.PI);
				context.setLineWidth(this.convert_length(2));
				context.setStrokeStyle(colorStart);
				context.stroke();
				//绘制打底曲线的边线
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r + (setLineWidth / 2), 0, 2 * Math.PI);
				context.setLineWidth(this.convert_length(2));
				context.setStrokeStyle(colorStart);
				context.stroke();

				// 圆弧角度
				const deg = ((remain / total).toFixed(2)) * 2 * Math.PI;
				// 画渐变曲线
				const grd = context.createLinearGradient(0, 50, 50, 0);
				grd.addColorStop('0', colorStart);
				grd.addColorStop('1.0', colorEnd);
				context.setStrokeStyle(grd);
				context.lineCap = 'round';
				context.setLineWidth(setLineWidth);
				context.beginPath();
				context.arc(this.convert_length(120), this.convert_length(120), r, -0.5 * Math.PI, -0.5 * Math.PI + deg);
				context.stroke();
				
				wx.drawCanvas({
					canvasId: 'progress',
					actions: context.getActions()
				});
			},
			// 辅助函数，用于转换小程序中的rpx
			convert_length(length) {
				return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
			}
		},
	};
</script>

<style lang="scss">
	.box {
		width: 100%;

		.progress {
			// display: inline-block;
			width: 240rpx;
			margin: 0 auto;
			height: 240rpx;
		}
	}
</style>
