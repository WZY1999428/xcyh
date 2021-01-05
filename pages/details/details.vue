<template>
	<scroll-view scroll-y="true" class="container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(imgs,i) in swiperImg" :key="i">
				<image :src="imgs" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="titleBox">
			<view class="prive">
				<view class="left">
					<view class="originalPrice">￥<text>{{goodsInfo.originalPrice}}</text></view>
					<view class="actualPrice">￥券后
						<template v-if="goodsInfo.actualPrice==undefined">0</template>
						<template v-else>{{goodsInfo.actualPrice}}</template>
					</view>
				</view>
				<view class="surplus"></view>
			</view>
			<view class="dtitle">
				<text>{{goodsInfo.title}}</text>
			</view>
			<view class="shop">
				<view class="shopName">
					<image :src="goodsInfo.shopLogo" mode=""></image>
					<template v-if="goodsInfo.shopName!==undefined">
						{{goodsInfo.shopName}}
					</template>
				</view>
			</view>
		</view>
		<view class="comment-container">
			<view class="title">
				<text>商品评价({{commentCount}})</text>
				<navigator url="../comment/comment" v-if="commentCount>3">查看更多</navigator>
			</view>
			<view class="commentlist">
				<view class="user-comment" v-for="(item,i) in comments" :key="i">
					<view class="headPicUrl">
						<view>
							<image :src="item.headPicUrl"></image>
							<text class="userNick">{{item.userNick}}</text>
						</view>
						<text class="commentDate">{{item.commentDate}}</text>
					</view>
					<view class="comment">{{item.commentContent}}</view>
					<view class="goods-imgs" v-if="item.images">
						<image v-for="(imgs,index) in item.images" :key="index" :src="imgs" @click="showImgSwiper(true,item.images,index)"></image>
					</view>
				</view>
				<view class="commentNull" v-if="comments==''">
					<text>抱 歉 未 获 取 相 关 评 论</text>
				</view>
			</view>
		</view>
		<goods-details :goodsImgs="goodsImgs" />
		<view class="footer">
			<view class="share" @click="taokouling(goodsInfo.couponLink)">
				<image src="../../static/font/fx.png" mode=""></image>分享
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<!-- 淘口令 -->
			<view class="Coupon" @click="$store.commit('creat_taokouling',{
				url:goodsInfo.couponLink,
				text:goodsInfo.dtitle})">
				<image src="../../static/font/quan.png" mode=""></image>领券
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="Coupon" @click="$store.commit('get_privilege_link',goodsInfo.goodsId)">
				<image src="../../static/font/quan.png" mode=""></image>领券
			</view>
			<!-- #endif -->
			<view class="feedback">
				<image src="../../static/font/fk.png" mode=""></image>反馈
			</view>
		</view>
		<img-swiper :imgs="imgs" :showImgs="showImgs" :activeIndex="activeIndex" @showImgSwiper="showImgSwiper" />
		<Popup v-if="showPopup" />
	</scroll-view>
</template>

<script>
	import imgSwiper from '../../components/img-swiper/img-swiper.vue'
	import goodsDetails from './goods_details.vue';
	import Popup from "../../components/Popup.vue";
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				swiperImg: [],
				goodsInfo: "",
				active: 0,
				goodsImgs: [],
				comments: [],
				commentCount: 0,
				couponPrice: "",
				imgs: [],
				showImgs: false,
				activeIndex: 0
			};
		},
		computed: {
			...mapState({
				host: state => state.home.host,
				showPopup: state => state.showPopup,
			}),
		},
		onLoad(options) {
			this.get_goods_details(options)
			this.get_comment_list(options)
		},
		methods: {
			get_goods_details(options) {
				const t = this
				let id = options.id;
				if (id == -1) {
					id = "";
				}
				uni.request({
					url: `${t.host}get_goods_details/get_goods_details`,
					data: {
						id: id,
						goodsId: options.goodsId
					},
					success: (res) => {
						if (res.data.data.detailPics != "") {
							t.goodsImgs = JSON.parse(res.data.data.detailPics);
						}
						t.couponPrice = res.data.data.couponPrice
						t.swiperImg = res.data.data.imgs.split(',');
						t.goodsInfo = res.data.data;
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			get_comment_list(options) {
				const t = this;
				uni.request({
					url: `${t.$store.state.host}get_goods_list/get-comment-list`,
					data: {
						id: options.id,
						goodsId: options.goodsId
					},
					success: (res) => {
						if (res.data.data.commentList != undefined) {
							t.comments = res.data.data.commentList.splice(0, 3);
						}
						t.commentCount = res.data.data.commentCount
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			showImgSwiper(bool, imgs, index) {
				this.showImgs = bool;
				this.imgs = imgs;
				this.activeIndex = index;
			}
		},
		components: {
			goodsDetails,
			imgSwiper,
			Popup
		}
	}
</script>

<style lang="less" scoped>
	.container {
		position: relative;
		background-color: #ecf0f1;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 100vh;
		/* #endif */
		overflow: hidden;

		swiper {
			height: 45vw;

			image {
				width: 100%;
			}
		}

		.titleBox {
			padding: 10rpx;
			background-color: white;
			box-shadow: 0 0 1px #2C405A;
			margin-bottom: 10rpx;

			.shop {
				margin-top: 20rpx;

				.shopName {
					display: flex;
					align-items: center;
					font-size: 25rpx;
					font-weight: 1000;

					image {
						width: 50rpx;
						height: 50rpx;
						margin-right: 10rpx;
						border-radius: 4rpx;
					}
				}
			}

			.prive {
				display: flex;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.originalPrice {
						color: red;
						font-size: 25rpx;
						margin-right: 10rpx;

						text {
							font-size: 45rpx;
						}
					}

					.actualPrice {
						color: white;
						background-color: red;
						padding: 2.5rpx 15rpx;
						font-size: 28rpx;
					}
				}
			}

			.surplus {
				font-size: 26rpx;
				color: #95a5a6;
			}

			.dtitle {
				text {
					font-weight: 800;
					padding: 0 10rpx;
					font-size: 25rpx;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin: 5rpx 0;
				}
			}
		}

		.comment-container {
			background-color: white;
			margin-bottom: 10rpx;

			.title {
				display: flex;
				justify-content: space-between;
				padding: 10rpx;
				box-shadow: 0 0 1rpx #3B4144;
				font-size: 28rpx;
			}

			.comment {
				font-size: 25rpx;
				padding: 10rpx;
			}

			.commentlist {
				.user-comment {
					.headPicUrl {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 10rpx;

						view {
							display: flex;
							align-items: center;

							image {
								width: 60rpx;
								height: 60rpx;
								border-radius: 50%;
								margin-right: 10rpx;
							}

							.userNick {
								font-size: 26rpx;
								color: #e74c3c;
							}
						}

						.commentDate {
							font-size: 25rpx;
							color: #95a5a6;
						}

					}

					.goods-imgs {
						image {
							margin-left: 10rpx;
							width: 100rpx;
							height: 100rpx;
						}
					}
				}

				.commentNull {
					width: 100%;
					line-height: 80rpx;
					text-align: center;
					color: #95a5a6;
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 80rpx;
			display: flex;
			padding: 0 30rpx;
			width: 100%;
			background-color: #d8dee2;

			view {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}

			.share {
				color: #e74c3c;
				background-color: white;
			}

			.Coupon {
				background-color: #fccd0e;
				color: white;
			}

			.feedback {
				background-color: #e74c3c;
				color: white;
			}
		}
	}
</style>
