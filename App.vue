<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//邀请码 状态管理
			if (uni.getStorageSync("userInfo").invitationNo) {
				this.$store.commit('setinvitationNo', uni.getStorageSync("userInfo").invitationNo);
			}
			if( uni.getStorageSync("userInfo").roleLevel){
				this.$store.commit('setRoleLevel', uni.getStorageSync("userInfo").roleLevel);
			}
			// uni.getSystemInfo({
			// 	success: function(e) {
			// 		// #ifndef MP
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		if (e.platform == 'android') {
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 50;
			// 		} else {
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 45;
			// 		};
			// 		// #endif
			// 		// #ifdef MP-WEIXIN
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		let custom = wx.getMenuButtonBoundingClientRect();
			// 		Vue.prototype.Custom = custom;
			// 		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// 		// #endif       
			// 		// #ifdef MP-ALIPAY
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// 		// #endif
			// 	}
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "uview-ui/index.scss";
	@import "common/iconfont.css";


	page {
		background-color: #F5F5F5;
		font-size: 30rpx;
	}

	/* 全局公共样式类 */
	.text-hidden {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.two-line {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.clear {
		overflow: hidden;
	}

	.bg-img {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		background-color: #F5F5F5;
	}

	image {
		display: block;
		height: auto;
		// background-color: #ffffff;
	}
</style>
