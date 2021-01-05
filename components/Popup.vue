<template>
	<view class="Popup">
		<view class="popup-text">
			<text>淘口令已复制打开手机淘宝即可领取优惠券</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.Popup {
		width: 60vw;
		min-height: 30vw;
		position: fixed;
		left: calc(50% - 30vw);
		top: calc(50% - 15vw);
		z-index: 666666;
		display: flex;
		align-items: center;
		justify-content: center;
        animation: show 0.25s;
		.popup-text {
			width: 100%;
			height: 100%;
			background-color: #ecf0f1;
			padding: 20rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 10rpx #000000;
			text {
				font-size: 25rpx;
				text-align: center;
			}
		}
	}

	@keyframes show {
		0% {
			opacity: 0;
			transform: scale(0);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
