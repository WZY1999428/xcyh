<template>
	<view class="goods">
		<view class="goods-item" v-for="(item,i) in goodsList" :key="i" @click="$store.commit('goDetails',{id:item.id,goodsId:item.goodsId})">
			<image :src="item.mainPic" mode=""></image>
			<view class="content">
				<view class="title">
					<text class="tag" v-if="item.shopType==0">淘宝</text>
					<text class="tag" v-else>天猫</text>
					{{item.title}}
				</view>
				<view class="sales">
					<text>{{item.shopName}}</text>
					<text>月销{{item.monthSales}}件</text>
				</view>
				<view class="Coupon">
					<text>券后{{item.actualPrice}}</text>
					<!-- #ifdef MP-WEIXIN -->
					<button @click.stop="$store.commit('creat_taokouling',{url:item.couponLink,text:item.dtitle})">领{{item.couponPrice}}元券</button>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<button @click.stop="$store.commit('get_privilege_link',item.goodsId)">领{{item.couponPrice}}元券</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			goodsList:Array
		}
	}
</script>

<style scoped lang="less">
	.goods {
		.goods-item {
			display: flex;
			padding: 10rpx;
			border-bottom: 1px solid #a9bac2;

			image {
				flex-shrink: 0;
				width: 25vw;
				height: 25vw;
			}

			.content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 0 10rpx;

				.title {
					font-size: 25rpx;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin: 5rpx 0;

					.tag {
						font-size: 25rpx;
						min-width: 60rpx;
						flex-shrink: 0;
						color: white;
						border-radius: 30rpx;
						background-color: red;
						padding: 0rpx 10rpx;
						margin-right: 10rpx;
					}
				}

				.sales {
					display: flex;
					justify-content: space-between;
					color: #989898;

					text {
						font-size: 25rpx;
					}
				}

				.Coupon {
					display: flex;
					justify-content: space-between;

					button,
					text {
						color: red;
						font-size: 25rpx;
					}

					button {
						background: none;
						height: 40rpx;
						padding: 10rpx 20rpx;
						border: 1px solid red;
						line-height: 20rpx;
						border-radius: 30rpx;
					}
				}
			}
		}

	}
</style>
