<template>
	<view class="">
		<!-- :content="modalContent"  -->
		<u-modal v-model="modelShow" :title='modalTitle' @confirm='confirm' :confirm-style="{color:'#D5101A'}">
			<view class="slot-content">
				<view class="text-center" style="padding: 30rpx; 20rpx;font-size: 24rpx; color: #4C4C4C;">
					<rich-text :nodes="modalContent"></rich-text>
				</view>
			</view>
		</u-modal>

	</view>
</template>
<!-- Modal -->

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: () => false
			},
			// 
			title: {
				type: String,
				default: () => '提示'
			}
		},
		data() {
			return {
				modelShow: false,
				modalContent: '',
				modalTitle: '',
			}
		},
		methods: {
			getData() {
				console.log(this.title)
				let roleLevel = this.$store.state.roleLevel
				// purchase team guide
				switch (this.title) {
					case 'purchase':
						this.modalTitle = '自购收益'
						this.modalContent = '您本人下单并确认收货后，您获得的佣金。'
						break;
					case 'guide':
						this.modalTitle = '导购收益'
						this.modalContent = '会员通过您导购的商品链接，购买并确认收货的佣金收益'
						break;
					case 'team':
						this.modalTitle = '店铺补贴'
						if (roleLevel === 100) {
							this.modalContent =
								`<p style='text-align:left'><b>自营店铺补贴：</b>每月1日结算您自营店铺上一个自然月确认收货的订单，按自营店铺销售额的3%计算补贴。<br>
								 <b>分销店铺补贴：</b>每月1日结算您分销店铺上一个自然月
								确认收货的订单，按分销店铺销售额的4%计算补贴。
								<br>
								 <b>代理店铺补贴：</b>每月1日结算您代理店铺上一个自然月
								确认收货的订单，按代理店铺销售额的5%计算补贴。
								<br>
								</p>
							`
						} else if (roleLevel === 130) {
							this.modalContent =
								`<p style='text-align:left'><b>自营店铺补贴：</b>每月1日结算您自营店铺上一个自然月
							确认收货的订单，按自营店铺销售额的3%计算补贴。<br>
								 <b>分销店铺补贴：</b>每月1日结算您分销店铺上一个自然月
							确认收货的订单，按分销店铺销售额的4%计算补贴。
								<br>
								</p>
							`
						} else {
							this.modalContent =
								`<p style='text-align:left'><b>自营店铺补贴：</b>每月1日结算您店铺上一个自然月确认收货
							的订单，按店铺销售额的3%计算补贴。<br>								</p>
							`
						}
						break;
					case 'myAssets':
						this.modalTitle = '我的资产'
						this.modalContent = '瑞币可随时转到余额,可提现'
						break;
					case 'totalEarning':
						this.modalTitle = '累计收益'
						this.modalContent = '您的账户使用至今所有已到账收益之和'
						break;
		
					default:
						break;
			
				}
				this.modelShow = true
			},
			confirm() {
				this.modelShow = false
				this.$emit('confirm', false)
			}
		},
		watch: {
			show: {
				handler(newValue) {
					if (newValue) {
						this.getData()
					}

				},
				immediate: true
			}
		}
	}
</script>

<style>
</style>
