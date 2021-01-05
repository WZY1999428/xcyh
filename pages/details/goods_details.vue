<template>
	<scroll-view scroll-y="true" class="goods_details">
		<view class="dtitle">商品详情</view>
		<view class="goodsImgs">
			<image v-for="item in goodsImgs" :src="item.img" mode="widthFix"></image>
		</view>
		<view class="goods-null" v-if="goodsImgs==''">
			<text>抱歉未能获取相关图片</text>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			goodsImgs: {
				type: Array||String
			}
		}
	}
</script>

<style scoped lang="less">
	.goods_details {
		background-color: white;
		width: 100%;
		padding-bottom: 100rpx;
        .goodsImgs{
			display: flex;
			flex-direction: column;
		}
		image {
			width: 100%;
		}

		.dtitle {
			padding: 10rpx 5rpx;
			border-bottom: 1px solid #b9b9b9;
		}
		.goods-null{
			text-align: center;
			line-height: 180rpx;
			text{
				color: #95a5a6;
			}
		}
	}
</style>
