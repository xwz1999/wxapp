<template>
	<view class="box">
		<canvas class="progress" canvas-id="progress"></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad: function() {
			this.Progressbar(120, 136, 50);
		},
		methods: {
			Progressbar(remain, total, r,colorStart,colorEnd) {
				const context = wx.createContext();
				// 打底灰色曲线
				context.beginPath();
				context.arc(this.convert_length(200), this.convert_length(200), r, 0, 2 * Math.PI);
				context.setLineWidth(12);
				context.setStrokeStyle('#CCCCCC');
				context.stroke();
				// 圆弧角度
				const deg = ((remain/total).toFixed(2))*2*Math.PI;     
				// 画渐变曲线
				context.beginPath();
				// 由于外层大小是400，所以圆弧圆心坐标是200,200
				context.arc(0, this.convert_length(200), r, 0, deg);
				context.translate(0, this.convert_length(200));
				// arc原点默认为3点钟方向，需要调整到12点
				context.rotate(-90 * Math.PI / 180);
				const grd = context.createLinearGradient(0, 0, 100, 90);
				grd.addColorStop(1, '#FFFFFF');
				grd.addColorStop(0, '#000000');
				context.setLineWidth(12);
				context.lineCap='round';
				context.setStrokeStyle(grd);
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
	.box{
		.progress {
			display: inline-block;
			width: 400rpx;
			height: 400rpx;
		}
	}
	
</style>
