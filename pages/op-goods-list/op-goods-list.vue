<template>
	<view class="op-goods-list">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" height="96%" :backTop="backTop" :pullUp="loadData" class="container">
			<view class="tabBar">
				<view class="slider" :style="{left:active}"></view>
				<text v-for="(item,k) in items" :key="k" class="tab-item" @click="selectable(k,item)">{{item.text}}</text>
			</view>
			<view class="container">
				<view class="good-item" v-for="item in goods_list" @click="$store.commit('goDetails',{id:item.id,goodsId:item.goodsId})">
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
							<!-- #ifdef MP-WEIXIN -->
							<view class="tag btn" @click.stop="$store.commit('creat_taokouling',{url:item.couponLink,text:item.dtitle})">领{{item.couponPrice}}元券</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="tag btn" @click.stop="$store.commit('get_privilege_link',item.goodsId)">领{{item.couponPrice}}元券</view>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
		</s-pull-scroll>
		<Popup v-if="showPopup" />
	</view>
</template>

<script>
	import sPullScroll from '../../components/s-pull-scroll/index.vue'
	import Popup from "../../components/Popup.vue";
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				goods_list: [],
				backTop: true,
				pageId: 1,
				active: 0,
				nineCid: 2,
				items: [{
						text: "5.9元区",
						key: 1
					},
					{
						text: "9.9元区",
						key: 2
					},
					{
						text: "19.9元区",
						key: 3
					}
				],
				pullScroll: null
			};
		},
		mounted() {
			const item = {
				text: "9.9元区",
				key: 2
			}
			this.selectable(1, item)
		},
		computed: {
			...mapState({
				showPopup:state=>state.showPopup
			}),
		},
		methods: {
			op_goods_list(p, pullScroll) {
				const t = this;
				if (p == 1) {
					t.pageId = 1;
					t.goods_list.splice(0, t.goods_list.length);
				} else {
					t.pageId++
				}
				uni.request({
					url: `${this.$store.state.host}op_goods_list/op_goods_list`,
					data: {
						pageSize: 20,
						pageId: t.pageId,
						nineCid: t.nineCid
					},
					success: (res) => {
						res.data.data.list.forEach(item => {
							t.goods_list.push(item)
						})
						pullScroll.success();
					},
					fail: (err) => {
						pullScroll.error();
					}
				})
			},
			pullDown(pullScroll) {
				this.op_goods_list(1, pullScroll);
			},
			loadData(pullScroll) {
				this.op_goods_list(2, pullScroll);
			},
			selectable(k, item) {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.tab-item').boundingClientRect(data => {
					this.active = data[k].left + 'px';
				}).exec();
				uni.setNavigationBarTitle({
					title: item.text
				})
				this.nineCid = item.key
				this.pullDown();
			}
		},
		components: {
			sPullScroll,
			Popup
		}
	}
</script>

<style lang="less" scoped>
	.op-goods-list {
		/* #ifdef MP-WEIXIN */
		height: 100vh;
		/* #endif */
		/* #ifdef H5 */
		height: calc(100% - 45px);
		/* #endif */
		position: relative;
		.tabBar {
			width: 100%;
			height: 50rpx;
			display: flex;
			align-items: center;
			background-color: white;
			padding: 0 3vw;
			background-color: #e74c3c;
			position: relative;
			z-index: 666;
			.slider,
			.tab-item {
				min-width: 130rpx;
				font-size: 25rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				color: white;
			}

			.slider {
				transition: left 0.3s;
				position: absolute;
				background-color: rgba(52, 152, 219, 0.5);
			}
		}

		.container {
			height: calc(100% - 60rpx);
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;

			.s-pull-scroll-view {
				top: 10% !important;
			}

			.good-item {
				width: 45vw;
				height: 70vw;
				margin-left: 3vw;
				margin-bottom: 2.5vw;
				border-radius: 10rpx;
				padding-bottom: 10rpx;
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
							white-space: nowrap;
							overflow: hidden;
						}

						.btn {
							min-width: 120rpx;
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
