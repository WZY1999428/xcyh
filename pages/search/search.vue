<template>
	<view class="container">
		<view class="header">
			<view class="search">
				<input type="text" auto-focus v-model="searchVal" placeholder="请输入您需要搜索的内容" placeholder-style="color:white;font-size:30rpx;"
				 @input="setIsHistory" @confirm="submit">
				<view class="btns">
					<image class="icon close" src="../../static/search/close.png" mode="" @click="empty"></image>
					<image class="icon" src="../../static/search/search.png" mode="" @click="submit"></image>
				</view>
			</view>
			<view class="search_suggestion" v-if="suggestion">
				<text v-for="item in suggestionList" @click="search(item.kw)">{{item.kw}}</text>
			</view>
		</view>
		<search-history  v-if="isHistory" @search="search" />
		<goodsItem  v-else />
	</view>
</template>

<script>
	import searchHistory from './history.vue';
	import goodsItem from './goods-list.vue';

	export default {
		data() {
			return {
				searchVal: "",
				isHistory: true,
				timer: null,
				suggestionList: [],
				suggestion: false
			};
		},
		methods: {
			search(val) {
				this.searchVal = val;
				this.isHistory = false;
				this.suggestion = false;
				this.$store.commit('get_dtk_search_goods', {
					val: this.searchVal,
					t: 1
				});
			},
			submit() {
				this.$store.commit('get_dtk_search_goods', {
					val: this.searchVal,
					t: 1,
					searchSort: ""
				});
				clearTimeout(this.timer);
				this.suggestion = false;
				this.isHistory = false;
			},
			setIsHistory() {
				if (this.searchVal.length == 0) {
					this.isHistory = true;
				}
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					const t = this
					uni.request({
						url: `${t.$store.state.host}list_super_goods/search_suggestion`,
						data: {
							keyWord: t.searchVal
						},
						timeout: 60000,
						success(res) {
							t.suggestionList.splice(0, t.suggestionList.length)
							res.data.forEach(item => {
								t.suggestionList.push(item)
							})
							t.suggestion = true;
						},
						fail(err) {
							console.log(err)
						}
					})
				}, 500)
			},
			empty() {
				this.suggestionList.splice(0, this.suggestionList.length)
				this.isHistory = true;
				this.searchVal = "";
			}
		},
		components: {
			searchHistory,
			goodsItem
		},
		
	}
</script>

<style lang="less">
	.container {
		/* #ifdef H5 */
		height: calc(100vh - 45px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 100vh;
		/* #endif */
		overflow: hidden;

		@keyframes fade {
			from {
				transform: translateY(-30rpx);
				opacity: 0;
			}

			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.header {
			height: 80rpx;
			background-color: #007AFF;
			padding: 10rpx 30rpx;
			line-height: 80rpx;
			position: relative;

			.search {
				height: 60rpx;
				display: flex;
				padding: 0 10rpx;
				align-items: center;
				background-color: rgba(255, 255, 255, 0.5);
				margin-bottom: 5rpx;

				input {
					height: 100%;
					flex: 1;
					color: white;
				}

				.btns {
					width: 110rpx;
					height: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.icon {
						width: 35rpx;
						height: 35rpx;
						color: white;
					}

					.close {
						width: 45rpx;
						height: 45rpx;
					}

					.icon:active {
						opacity: 0.8;
					}
				}
			}

			.search_suggestion {
				transition: all 0.3s;
				display: flex;
				flex-direction: column;
				background-color: rgba(255, 255, 255, 1);
				color: #95a5a6;

				text {
					font-size: 25rpx;
					padding: 5rpx 10rpx;
				}
			}
		}
	}
</style>
