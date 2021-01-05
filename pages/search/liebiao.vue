<template>
	<view class="liebieo">
		<view class="goods-item" v-for="(item,index) in searchGoods" @click="$store.commit('goDetails',{id:item.id,goodsId:item.goodsId})">
			<image class="goodsImg" :src="item.mainPic"></image>
			<view class="content">
				<view class="title">
					<text class="tag" v-if="item.shopType==1">天猫</text>
					<text class="tag" v-else>淘宝</text>
					{{item.title}}
				</view>
				<view class="shop">
					<text>{{item.shopName}}</text>
					<text>月销{{item.monthSales}}</text>
				</view>
				<view class="Coupon">
					<text v-if="item.couponPrice!=0">券后{{item.actualPrice}}</text>
					<text v-else>￥{{item.actualPrice}}</text>
					<!-- #ifdef H5 -->
					<text class="btns" @click.stop="$store.commit('get_privilege_link',item.goodsId)" v-if="item.couponPrice!=0">领{{item.couponPrice}}元券</text>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<text class="btns" @click.stop="$store.commit('creat_taokouling',{url:item.couponLink,text:item.dtitle})" v-if="item.couponPrice!=0">领{{item.couponPrice}}元券</text>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			searchGoods: Array
		}
	}
</script>

<style scoped lang="less">
	.goods-item {
		padding: 10rpx;
		border-bottom: 1px solid #d4d4d4;
		display: flex;
		align-items: center;
		// margin-bottom: 10rpx;
		animation: fade 0.5s;

		.goodsImg {
			flex-shrink: 0;
			width: 30vw;
			height: 30vw;
		}

		.content {
			height: 30vw;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10rpx;
			padding: 0 10rpx;

			.title {
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;

				.tag {
					padding: 0 12rpx;
					color: white;
					background-color: red;
					margin-right: 5rpx;
				}
			}

			.shop,
			.Coupon {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.btns {
					text-align: center;
					min-width: 200rpx;
					border-radius: 30rpx;
					border: 1px solid red;
					padding: 5rpx 30rpx;
				}
			}

			.shop text {
				color: #3F536E;
			}

			.Coupon text {
				color: red;
				font-weight: 800;
			}
		}
	}
</style>
