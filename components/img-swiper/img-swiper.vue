<template>
	<view class="imgs-swiper" v-if="showImgs" @click="$emit('showImgSwiper',false)">
		<view class="imgs" :style="{marginLeft:marLeft+'px'}" @touchstart.stop="moveStart" @touchmove.stop="move"
		 @touchend.stop="moveEnd">
			<view class="img-con" v-for="item in imgs">
				<image :src="item"></image>
			</view>
		</view>
		<view class="pagination">
			<view class="pagination-item" :class="{active:active==index}" v-for="(item,index) in imgs" :key="index"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "imgs-swiper",
		data() {
			return {
				marLeft: 0,
				disX: 0,
				tiemr: null,
				active: 0,
			};
		},
		methods: {
			moveStart(evt) {
				this.disX = this.marLeft - evt.changedTouches[0].pageX;
			},
			move(evt) {
				this.marLeft = evt.changedTouches[0].pageX + this.disX;
			},
			moveEnd(evt) {
				const query = uni.createSelectorQuery().in(this);
				let maxWidth
				let imgCon
				query.selectAll('.img-con').boundingClientRect(data => {
					maxWidth = data[0].width * (data.length - 1);
					imgCon = data;
				}).exec();
				for (let i = 0; i < imgCon.length; i++) {
					if (imgCon[i].left <= imgCon[0].width / 2 && imgCon[i].left >= -imgCon[0].width / 2) {
						this.marLeft = -imgCon[0].width * i;
						this.active = i;
					} else if (imgCon[i].right >= imgCon[0].width / 2 && imgCon[i].right <= -imgCon[0].width / 2) {
						this.marLeft = -imgCon[0].width * i;
						this.active = i;
					}
				}
				if (imgCon[0].left > 0) {
					this.marLeft = 0;
				}
				if (imgCon[imgCon.length - 1].right <= imgCon[0].width / 2) {
					this.marLeft = -imgCon[0].width * (imgCon.length - 1);;
				}
			},
			moveAnime(){
				
			}
		},
		props: {
			imgs: Array,
			showImgs: {
				default: false,
				type: Boolean
			},
			activeIndex:{
				default:0,
				type:Number
			}
		},
		onShow() {
			console.log(123456)
		}
	}
</script>

<style lang="less">
	.show {
		display: block !important;
	}

	.hide {
		display: none !important;
	}

	.imgs-swiper {
		width: 100%;
		position: fixed;
		/* #ifdef H5 */
		top: 44px;
		height: calc(100% - 44px);
		/* #endif */
		z-index: 66;
		user-select: none;
		background-color: rgba(0, 0, 0, 1);

		.imgs {
			width: 100%;
			height: 100%;
			display: flex;
			.img-con {
				width: 100%;
				height: 100%;
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 100%;
					max-height: 80%;
					min-height: 30%;
				}
			}
		}

		.pagination {
			position: absolute;
			top: 95%;
			width: 100%;
			height: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.active {
				background-color: red !important;
			}

			.pagination-item {
				width: 20rpx;
				height: 20rpx;
				margin-left: 10rpx;
				border-radius: 50%;
				background-color: white;
			}
		}
	}
</style>
