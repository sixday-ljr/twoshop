<template>
	<view class="">
		<citySelect @back_city="back_city"></citySelect>
	</view>
</template>

<script>
	import citySelect from '../../../components/linzq-citySelect/linzq-citySelect.vue'
	export default{
		components:{citySelect},
		data(){
			return{
				
			}
		},
		methods:{
			back_city(e) {
				console.log(e.cityName)
				 uni.setStorageSync('cityName',e.cityName );
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
</style>
