<template>
	<view class="content">
		<view class="hot-search">
			<view class="title">
				<text>热门搜索</text>
				<text class="icon icon-huanyipi" @click="setHot"></text>
			</view>
			<view class="hot">
				<text class="item" v-for="(item,k) in hot[hotI]" v-if="item!==''" @click="$emit('search',item)">{{item}}</text>
			</view>
		</view>
	<!-- 	<view class="history">
			<view class="title">
				<text>搜索历史</text>
				<text class="icon icon-qingkong"></text>
			</view>
			<scroll-view class="history-box" scroll-y="true">
				<view class="history-item" @click="$emit('search','耳机')" v-for="item in 10">
					<text>耳机</text>
					<text class="icon-baseline-close-px"></text>
				</view>
			</scroll-view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hot: [],
				hotI: 0
			};
		},
		mounted() {
			this.get_top100();
		},
		methods: {
			get_top100() {
				const t = this;
				uni.request({
					url: `${this.$store.state.host}get_top100/get_top100`,
					timeout: 60000,
					success(res) {
						let arr = res.data.data.hotWords;
						for (let i = 0; i < res.data.data.hotWords.length; i++) {
							if (i % 10 == 0) {
								t.hot.push(arr.slice(i, Math.min(i + 10, res.data.data.hotWords.length)))
							}
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			setHot() {
				this.hotI++;
				if (this.hotI >= this.hot.length) {
					this.hotI = 0;
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		height: calc(100% - 80rpx);
		padding: 20rpx;
		.title,
		.history-item {
			color: #686461;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.title text {
			font-size: 35rpx;
		}

		.title {
			padding: 10rpx 0;
		}

		.history-item:active {
			background-color: rgba(245, 245, 245, 1);
		}

		.history {
			height: 70%;

			.history-item {
				margin: 15rpx 0;
			}

			.history-box {
				height: calc(100% - 50rpx);
				overflow-y: auto;
			}
		}
         .icon:active{
			 color: #95a5a6;
		 }
		.hot-search {
			height: 23%;

			.hot {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.item {
					flex-shrink: 0;
					min-width: 150rpx;
					height: 50rpx;
					margin: 0 20rpx 10rpx 0;
					padding: 0 10rpx;
					text-align: center;
					line-height: 50rpx;
					// border: 1px solid #95a5a6;
					font-size: 25rpx;
					color: #95a5a6;
				}

				.item:active {
					background-color: rgba(245, 245, 245, 1);
				}
			}
		}
	}
</style>
