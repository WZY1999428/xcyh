<template>
	<view class="index">
		<s-pull-scroll ref="pullScroll" :pullDown="Refresh" :backTop="backTop" :pullUp="loadData" class="container">
			<navigator class="search" url="../search/search">
				<text class="icon-search"></text>
				<text class="hotkey">请输入您要搜索的内容</text>
			</navigator>
			<view class="header">
				<mySwiper></mySwiper>
			</view>
			<tag />
			<view class="rexiao">
				<view class="title">
					<view>
						<image class="icon" src="../../static/font/zk.png" mode=""></image>折上折
					</view>
					<navigator url="../fold_up/fold_up">更多</navigator>
				</view>
				<scroll-view scroll-x="true">
					<view class="scroll">
						<view class="rx-item" v-for="(item,key) in foldList" :key="key" @click="$store.commit('goDetails',{id:item.id,goodsId:item.goodsId})">
							<image :src="item.mainPic" mode=""></image>
							<text class="content">{{item.title}}</text>
							<view class="tags">
								<view class="tag tag1">券后{{item.actualPrice}}元</view>
								<!-- #ifdef MP-WEIXIN -->
								<view class="tag tag2" @click.stop="$store.commit('creat_taokouling',{url:item.couponLink,text:item.dtitle})">领{{item.couponPrice}}元券</view>
								<!-- #endif -->
								<!-- #ifdef H5 -->
								<view class="tag tag2" @click.stop="$store.commit('get_privilege_link',item.goodsId)">领{{item.couponPrice}}元券</view>
								<!-- #endif -->
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="selected">
				<view class="title">
					<view>
						<image class="icon" src="../../static/font/jxyp.png" mode=""></image>每日精选
					</view>
					<view @click="setIconType">
						<image class="icon" :src="iconType"></image>
						<text></text>
						{{text}}
					</view>
				</view>
				<liebiao :goodsList="goodsList"  v-if="isliebiao"></liebiao>
				<tubiao  :goodsList="goodsList" v-else></tubiao>
			</view>
		</s-pull-scroll>
		<Popup v-if="showPopup" />
	</view>
</template>

<script>
	import tag from './tag.vue'
	import liebiao from './liebiao.vue'
	import tubiao from './tubiao.vue'
	import sPullScroll from '../../components/s-pull-scroll/index.vue';
	import mySwiper from './swiper.vue';
	import Popup from "../../components/Popup.vue";
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				iconType: "../../static/tag/redlb.png",
				isliebiao: false,
				text: "列表",
				triggered: false,
				timer: null,
				backTop: true
			}
		},
		computed: {
			...mapState({
				goodsList:state=>state.home.goodsList,
				foldList:state=>state.home.foldList,
				showPopup:state=>state.showPopup
			}),
		},
		methods: {
			setIconType() {
				this.isliebiao = !this.isliebiao
				if (this.isliebiao == true) {
					this.iconType = "../../static/tag/leimu.png"
					this.text = "图标"
				} else {
					this.iconType = "../../static/tag/redlb.png"
					this.text = "列表"
				}
			},
			Refresh(pullScroll) {
				this.$store.commit('get_ranking_list', {
					t: "Refresh",
					fun: pullScroll
				});
				this.$store.commit('super_discount_goods', {
					pageSize: 10,
					pageId: 1,
					sort: 0,
					t: 1
				})
			},
			loadData(pullScroll) {
				this.$store.commit('get_ranking_list', {
					t: "pullScroll",
					fun: pullScroll
				});
			},
		},
		onLoad() {
			this.Refresh();
		},
		components: {
			tag,
			liebiao,
			tubiao,
			sPullScroll,
			mySwiper,
			Popup
		}
	}
</script>

<style lang="less" scoped>
	.index {
		height: 100vh;
		position: relative;

		.top {
			position: absolute;
			right: 10px;
			top: 80%;
			z-index: 66;
		}

		#title() {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx;
			font-size: 25rpx;
			border-bottom: 1px solid #cacaca;
			height: 80rpx;
		}

		.search {
			width: 90vw;
			position: absolute;
			top: 20rpx;
			left: 5vw;
			height: 70rpx;
			z-index: 33;
			display: flex;
			align-items: center;
			background-color: rgba(245, 245, 245, 0.5);

			.icon-search {
				margin: 0 30rpx;
				color: #ffffff;
			}

			.hotkey {
				flex: 1;
				color: #ffffff;
			}
		}

		.container {
			height: 100%;
			background-color: #d5d5d5;
			overflow-y: auto;

			.rexiao {
				background-color: white;

				.title {
					#title();
					color: red;

					view {
						display: flex;
						align-items: center;

						.icon {
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;
						}
					}
				}

				.scroll {
					height: 100%;
					padding: 10rpx;
					display: flex;
					background-color: white;

					.rx-item {
						margin-right: 10rpx;
						flex-shrink: 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 25vw;
						height: calc(100% - 80rpx);
						overflow: hidden;

						image {
							width: 25vw;
							height: 25vw;
							border: 1px solid #e8e8e8;
							margin: 5rpx 0;
						}

						.content {
							width: 100%;
							height: 70rpx;
							font-size: 25rpx;
							color: #474747;
							word-break: break-all;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.tags {
							.tag {
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
								font-size: 25rpx;
								color: red;
								text-align: center;
								margin: 5rpx 0;
							}

							.tag2 {
								border: 1px solid red;
								border-radius: 30rpx;
								width: 180rpx;
								padding: 5rpx 0;
							}
						}
					}
				}
			}

			.selected {
				margin-top: 5rpx;
				background-color: white;

				.title {
					#title();
					color: red;

					text,
					view {
						font-size: 25rpx;
						display: flex;
						align-items: center;
						color: red;
					}

					view {
						color: red;
					}

					.icon {
						margin-right: 5rpx;
						width: 40rpx;
						height: 40rpx;
						position: relative;
						color: red;
					}
				}
			}
		}
	}
</style>
