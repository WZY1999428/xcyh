<template>
	<view class="Big_picture">
		<view class="container">
			<view class="good-item" v-if="goods_list.length>0" v-for="item in goods_list" @click="$store.commit('goDetails',{id:item.id,goodsId:item.goodsId})">
				<image class="good-img" :src="item.mainPic" mode=""></image>
				<view class="content">
					<view class="title">
						{{item.title}}
					</view>
					<view class="shopInfo">
						<text class="shopTxt">{{item.shopName}}</text>
						<text class="shopTxt">月销{{item.monthSales}}</text>
					</view>
					<view class="btns">
						<view class="tag">券后{{item.actualPrice}}元</view>
						<view class="tag btn" @click.stop="$store.commit('get_privilege_link',item.goodsId)">领券{{item.couponPrice}}元券</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sPullScroll from './s-pull-scroll/index.vue';
	export default {
		data() {
			return {

			};
		},
		methods: {

		},
		props: {
			goods_list: {
				type: Array | Object
			}
		}
	}
</script>

<style lang="less" scoped>
	.Big_picture {
		height: calc(100% - 45px);

		.container {
			height: calc(100% - 60rpx);
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;

			.good-item {
				width: 45vw;
				height: 70vw;
				margin-left: 3vw;
				margin-bottom: 2.5vw;
				border-radius: 10rpx;
				overflow: hidden;
				box-shadow: 0 0 2px #2C405A;
				animation: anima 0.5s;

				.good-img {
					width: 45vw;
					height: 45vw;
				}

				.content {
					padding: 0 5rpx;

					.title {
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						font-size: 28rpx;
					}

					.shopInfo {
						display: flex;
						margin: 10rpx 0;

						.shopTxt {
							width: 50%;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							color: #bdc3c7;
							font-size: 25rpx;
						}

						.shopTxt:last-child {
							text-align: right;
						}
					}

					.btns {
						display: flex;
						justify-content: space-between;

						.tag {
							color: red;
							font-size: 25rpx;
							padding: 5rpx 15rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.btn {
							border: 1px solid red;
							border-radius: 30rpx;
						}
					}
				}
			}
		}

		@keyframes anima {
			from {
				opacity: 0;
				transform: translateY(30px);
			}

			to {
				opacity: 1;
				transform: translateY(0px);
			}
		}
	}
</style>
