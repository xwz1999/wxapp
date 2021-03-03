// 用canvas生成分享图片，返回src
const createShareImg = function(options, that) {

	return new Promise(function(resolve, reject) {

		getImgsInfo([options.productImg, options.qrCode, options.bg, options.headUrl]).then(function(res) {

			//底部颜色
			let context = uni.createCanvasContext(options.canvasId, that);
			context.setFillStyle('#fff')
			context.fillRect(0, 0, 600, 1008);
			context.save();
			//产品图片
			if (res[0]) {
				context.drawImage(res[0], 0, 0, 600, 830);
			}
			
			//头像
			if (res[3]) {
				roundRect(context, 30, 918, 36, 36, 18)
				context.drawImage(res[3], 30, 918, 36, 36, 18);
				context.restore();
			}
			var name = options.memberName.length > 5 ? options.memberName.substring(0, 4) + '...' : options.memberName;
			context.setFillStyle('#333333');
			context.setFontSize(24);
			context.setTextAlign('left');
			context.fillText('我是您的专属顾问 ' + name, 80, 945);
			context.save();

			context.setFillStyle('#999999');
			context.setFontSize(22);
			context.setTextAlign('right');
			context.fillText('长按扫码进店', 550, 945);
			context.save();

			//二维码
			if (res[1]) {
				roundRect(context, 390, 720, 180, 180, 90)
				context.drawImage(res[1], 390, 720, 180, 180, 90);
				context.restore();
			}
			var shopname = options.productName.length > 7 ? options.productName.substring(0, 6) + '...' : options.productName;
			context.setFillStyle('#333');
			context.setFontSize(32);
			context.setTextAlign('left');
			context.font = 'normal bold 32px sans-serif';
			// context.setTextAlign('center');
			context.fillText('欢迎光临' + shopname, 30, 900);
			context.save();

			const result = uni.getSystemInfoSync();
			const platform = result.platform;
			let time = 0;
			if (platform === 'android') {
				// 在安卓平台，经测试发现如果海报过于复杂在转换时需要做延时，要不然样式会错乱
				time = 300;
			}
			//console.log(context);
			context.draw(false, function() {
				//console.log('222');
				setTimeout(function() {
					//将生成好的图片保存到本地
					uni.canvasToTempFilePath({
						canvasId: options.canvasId,
						fileType: 'jpg',
						success(res) {
							//console.log(res.tempFilePath, '111');
							resolve(res.tempFilePath);
						},
						fail(err) {
							console.log('canvasToTempFilePath err', err);
							reject(err);
						}
					}, that);
				}, time);
			});
		}).catch(function(err) {
			console.log('getImgsInfo err', err);
			reject(err);
		})
	})
}

/**
 * 
 * @param {CanvasContext} ctx canvas上下文
 * @param {number} x 圆角矩形选区的左上角 x坐标
 * @param {number} y 圆角矩形选区的左上角 y坐标
 * @param {number} w 圆角矩形选区的宽度
 * @param {number} h 圆角矩形选区的高度
 * @param {number} r 圆角的半径
 */
function roundRect(ctx, x, y, w, h, r) {
	// 开始绘制
	ctx.beginPath()
	// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
	// 这里是使用 fill 还是 stroke都可以，二选一即可
	ctx.setFillStyle('#f94335')
	// ctx.setStrokeStyle('transparent')
	// 左上角
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

	// border-top
	ctx.moveTo(x + r, y)
	ctx.lineTo(x + w - r, y)
	ctx.lineTo(x + w, y + r)
	// 右上角
	ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

	// border-right
	ctx.lineTo(x + w, y + h - r)
	ctx.lineTo(x + w - r, y + h)
	// 右下角
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

	// border-bottom
	ctx.lineTo(x + r, y + h)
	ctx.lineTo(x, y + h - r)
	// 左下角
	ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

	// border-left
	ctx.lineTo(x, y + r)
	ctx.lineTo(x + r, y)

	// 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
	ctx.fill()
	// ctx.stroke()
	ctx.closePath()
	// 剪切
	ctx.clip()
}



/**
 * [分割字符串]
 * @param  {[type]} str  [字符串]
 * @param  {[type]} num  [每行个数]
 * @param  {[type]} line [行数]
 * @return {[type]}      [返回字符串数组]
 */
const splitStr = (str, num, line) => {
	let result = [];
	for (let i = 0; i < line; i++) {
		result.push(str.substr(i * num, num));
	}
	if (result[line - 1].length == num) {
		result[line - 1] = result[line - 1].substr(0, num - 1) + '...';
	}
	// console.log(result);
	return result;
}

// 获取单张图片信息
const getImgInfo = (path) => {
	return new Promise((resolve, reject) => {
		if (path) {
			uni.getImageInfo({
				src: path,
				success(res) {
					// console.log(res);
					resolve(res.path);
				},
				fail(err) {
					//console.log(err);
					// reject(err);
					resolve('');
				}
			})
		} else {
			resolve('');
		}

	})
}


// 获取多张图片的信息
const getImgsInfo = (paths) => {
	// console.log(paths);
	return new Promise((resolve, reject) => {
		let promises = paths.map(item => {
			return getImgInfo(item);
		});
		Promise.all(promises).then(res => {
			// console.log(res);
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	})
}

export default {
	createShareImg
}

