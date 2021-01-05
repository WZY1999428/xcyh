<template>
	<view class="loading">
		<view v-for="(i,index) in 5" class="loading-item" :class="'loading-item'+index"></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	.loading {
		width: 100%;
		height: 80rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 666;
		position: relative;
		.loading-item {
			position: absolute;
			top: 30rpx;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background-color: white;
			animation: loading 4.5s infinite linear;
		}

		.loading-item0 {
			left: 0;
			animation-delay: 0.3s;
		}

		.loading-item1 {
			left: 30rpx;
			animation-delay: 0.6s;
		}

		.loading-item2 {
			left: 60rpx;
			animation-delay: 0.9s;
		}

		.loading-item3 {
			left: 90rpx;
			animation-delay: 1.2s;
		}

		.loading-item4 {
			left: 120rpx;
			animation-delay: 1.6s;
		}

		@keyframes loading {
			0% {
				opacity: 0.5;
			}

			30%,
			40%,
			60%,
			70% {
				opacity: 1;
				left: 50%;
			}

			100% {
				left: 100%;
				opacity: 0.5;
			}
		}
	}
</style>
