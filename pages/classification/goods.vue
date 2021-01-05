<template>
	<scroll-view scroll-y="true" class="goods" @scroll="loadData">
		<view class="goods-item" v-for="(item,k) in ClassificationList" :key="k" @click="goDetails({id:item.id,goodsId:item.goodsId})">
			<image :src="item.mainPic" mode=""></image>
			<view class="content">
				<view class="flex title">{{item.dtitle}}</view>
				<view class="flex shop">
					<view class="discounts"><del>{{item.originalPrice}}</del><text>（{{ parseInt(item.discounts*100)}}折）</text></view>
					<view class="sale"><text>月销 {{item.monthSales}}</text></view>
				</view>
				<view class="flex priceBox">
					<view class="price">券后 {{item.actualPrice}} 元</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="Coupon" @click.stop="creat_taokouling({url:item.couponLink,text:item.dtitle})">领{{item.couponPrice}}元券</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="Coupon" @click.stop="$store.commit('get_privilege_link',item.goodsId)">领{{item.couponPrice}}元券</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="loading" v-if="loading">
			<image src="../../static/loading2.png" v-if="loadTxt!='已经加载完了'"></image>
			<text>{{loadTxt}}</text>
		</view>
		<Popup v-if="showPopup" />
	</scroll-view>
</template>

<script>
	import Popup from "../../components/Popup.vue";
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			loadData(evt) {
				const scrollTop = evt.target.scrollTop;
				const scrollHeight = evt.target.scrollHeight;
				if (scrollTop > scrollHeight - 880) {
					const params = {
						keyWords: "",
						ids: "",
						type: 2
					}
					this.$store.commit('ClassifiedSearch', {
						params
					})
				}
			},
			creat_taokouling(obj) {
				console.table(obj)
				this.$store.commit("creat_taokouling", obj)
			},
			goDetails(obj) {
				this.$store.commit("goDetails", obj)
			}
		},
		computed: {
			...mapState({
				showPopup: state => state.showPopup,
				ClassificationList: state => state.Classification.ClassificationList,
				loading:state => state.Classification.loading,
				loadTxt:state => state.Classification.loadTxt
			}),
		},
		components: {
			Popup
		}
	}
</script>

<style scoped lang="less">
	.goods {
		width: 100%;
		height: calc(100% - 60rpx);

		.goods-item {
			display: flex;
			padding: 5rpx;
			box-shadow: 0 0 1px #d4d4d4;

			image {
				flex-shrink: 0;
				width: 25vw;
				height: 25vw;
			}

			.content {
				width: calc(100% - 25vw);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 5rpx 10rpx;

				.title {
					font-size: 25rpx;
				}

				.flex {
					display: flex;
					justify-content: space-between;
				}

				.shop {
					color: #bdc3c7;

					.discounts,
					.sale,
					text {
						font-size: 23rpx;
					}
				}

				.priceBox {
					color: #e74c3c;
				}

				.Coupon {
					border: 1px solid #e74c3c;
					min-width: 120rpx;
					text-align: center;
					border-radius: 30rpx;
					padding: 5rpx 30rpx;
					font-size: 26rpx;
				}
			}
		}

		.loading {
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #dddddd;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 15rpx;
				animation: 1.5s loading linear infinite;
			}

			text {
				color: white;
			}

			@keyframes loading {
				to {
					transform: rotateZ(0deg);
				}

				from {
					transform: rotateZ(-360deg);
				}
			}
		}
	}
</style>
