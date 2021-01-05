<template>
	<view class="tubiao">
		<view class="goods-item" v-for="item in  searchGoods" @click="$store.commit('goDetails',{id:item.id,goodsId:item.goodsId})">
			<view class="image">
				<image :src="item.mainPic"
				 mode=""></image>
				<text class="tag" v-if="item.shopType==1">天猫</text>
				<text class="tag" v-else>淘宝</text>
			</view>
			<view class="content">
				<view class="title">
					{{item.title}}
				</view>
				<view class="sales">
					<text>{{item.shopName}}</text>
					<text>月销{{item.monthSales}}</text>
				</view>
				<view class="Coupon">
					<text v-if="item.couponPrice!=0">券后{{item.actualPrice}}</text>
					<text v-else>￥{{item.actualPrice}}</text>
					<!-- #ifdef H5 -->
					<text class="button" @click.stop="$store.commit('get_privilege_link',item.goodsId)" v-if="item.couponPrice!=0">领{{item.couponPrice}}元券</text>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<text class="button" @click.stop="$store.commit('creat_taokouling',{url:item.couponLink,text:item.dtitle})" v-if="item.couponPrice!=0">领{{item.couponPrice}}元券</text>
					<!-- #endif -->
					<!-- <button v-if="item.couponPrice!=0"  @click.stop="$store.commit('get_privilege_link',item.goodsId)">领{{item.couponPrice}}元券</button> -->
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
			searchGoods:Array
		}
	}
</script>

<style scoped lang="less">
	.tubiao {
		display: flex;
		flex-wrap: wrap;
		.goods-item {
			flex-shrink: 0;
			width: 50vw;
			height: 75vw;
			padding: 10rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
            border: 1px solid;
			animation: fade 0.5s;
			.image {
				width: 45vw;
				height: 45vw;
				position: relative;

				.tag {
					position: absolute;
					left: 0;
					bottom: 0;
					background: red;
					font-size: 20rpx;
					color: white;
					padding:5rpx 10rpx;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}

			.content {
				width: 45vw;
				text,
				.title,
				button {
					font-size: 25rpx;
					margin: 10rpx 0;
				}

				.title {
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.sales {
					display: flex;
					justify-content: space-between;

					text {
						max-width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #b1b1b1;
					}
				}

				.Coupon {
					display: flex;
                    justify-content: space-between;
					align-items: center;
					text,.button{
						color: red;
					}
					.button {
						height: 45rpx;
						font-size: 25rpx;
                        background: none;
						border-radius: 30rpx;
						padding: 0 20rpx;
						line-height: 45rpx;
						border: 1px solid red;
					}
				}
			}
		}
		.goods-item:nth-child(1n) {
			border-color: transparent #b8b8b8 #b8b8b8 transparent;
		}

		.goods-item:nth-child(2n) {
			border-color: transparent transparent #b8b8b8 transparent;
		}
	}
</style>
