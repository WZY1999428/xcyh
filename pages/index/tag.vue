<template>
	<view class="tag">
		<navigator url="../hot_sale/hot_sale" class="tag-item">
			<view class="icon">
				<image src="../../static/tag/HOT.png" mode=""></image>
			</view>
			<text class="txt">热销</text>
		</navigator>
		<navigator url="../classification/classification" class="tag-item">
			<view class="icon">
				<image src="../../static/tag/classification.png" mode=""></image>
			</view>
			<text class="txt">分类</text>
		</navigator>
		<navigator url="../rush_purchase/rush_purchase" class="tag-item">
			<view class="icon">
				<image src="../../static/tag/qian.png" mode=""></image>
			</view>
			<text class="txt">淘抢购</text>
		</navigator>
		<navigator class="tag-item" url="../op-goods-list/op-goods-list">
			<view class="icon">
				<image src="../../static/tag/9.9.png" mode=""></image>
			</view>
			<text class="txt">9.9</text>
		</navigator>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.tag {
		min-height: 10%;
		padding: 20rpx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin: 5px 0;
		background-color: white;

		.tag-item {
			display: flex;
			flex-direction: column;
             align-items: center;
			.icon {
				width: 80rpx;
				height: 80rpx;
				border-radius: 30%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: white;
				font-size: 40rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.txt {
				text-align: center;
				font-size: 25rpx;
				color: #34495e;
			}
		}
	}
</style>
