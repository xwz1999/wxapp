<template>
	<view class="">
			<u-modal v-model="modelShow" :content="modalContent" :title='modalTitle' @confirm='confirm' :confirm-style="{color:'#D5101A'}">
				
			</u-modal>
			
	</view>
</template>
<!-- Modal -->

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:() => false
			},
			// 
			title:{
				type:String,
				default:() => '提示'
			}
		},
		data(){
			return {
				modelShow:false,
				modalContent:'',
				modalTitle:''
			}
		},
		methods:{
			getData(){
				console.log(this.title)
				// purchase team guide
				switch (this.title) {
					case 'purchase':
						this.modalTitle = '自购收益'
						this.modalContent = '您本人下单收货后,您获得的佣金'
						break;
					case 'guide':
						this.modalTitle = '导购收益'
						this.modalContent = '瑞币可随时转到余额,可提现'
						break;
					case 'team':
						this.modalTitle = '店铺补贴'
						this.modalContent = '瑞币可随时转到余额,可提现'
						break;
					case 'myAssets':
						this.modalTitle = '我的资产'
						this.modalContent = '瑞币可随时转到余额,可提现'
						break;
						// myAssets
					default:
						break;
				}
				this.modelShow = true
			},
			confirm(){
				this.modelShow = false
				this.$emit('confirm',false)
			}
		},
		watch:{
			show: {
				handler(newValue) {
					if(newValue){
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
