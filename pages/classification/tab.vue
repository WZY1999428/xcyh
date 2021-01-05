<template>
	<view class="tabBar">
		<view class="tabBarBox">
			<scroll-view scroll-x="true" class="scroll-tab" :scroll-left="scrollLeft">
				<view class="tab">
					<view class="tab-item" v-for="(item,k) in categoryList" :key="k" @click.stop="get_super_category(item.cname,item.subcategories,k)">
						<view class="item-cont">
							<text :class="{active:active==k}">{{item.cname}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="down" @click="isShow=!isShow">
				<image class="down-img" src="../../static/down.png"></image>
			</view>
		</view>
		<downClass :categoryList="categoryList" @hide="hide" v-if="isShow" @get_super_category="get_super_category" />
	</view>
</template>

<script>
	import downClass from './down-class.vue'
	export default {
		data() {
			return {
				active: 0,
				isShow: false,
				scrollLeft:500
			}
		},
		props: {
			categoryList: {
				type: Array
			}
		},
		components: {
			downClass
		},
		methods: {
			get_super_category(keyWords, subcategories, k) {
				this.active = k;
				let ids = [];
				subcategories.forEach(item => {
					ids.push(item.subcid)
				})
				ids = ids.join(',');
				const params = {
					keyWords: keyWords,
					ids: ids,
					type: 1
				}
				this.$store.commit('ClassifiedSearch', params)
			},
			hide(bool) {
				this.isShow = bool;
			}
		},

	}
</script>

<style scoped lang="less">
	#flex() {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.show {
		animation: downanime 0.5s;
	}

	.hide {
		animation: downanime 0.5s reverse;
	}


	@keyframes downanime {
		from {
			opacity: 0;
			transform: translateY(-30px);
		}

		to {
			opacity: 1;
			transform: translateY(30px);
		}
	}


	.tabBar {
		height: 60rpx;
		background-color: rgb(0, 122, 255);

		.tabBarBox {
			#flex();
		}

		.scroll-tab {
			max-width: calc(100% - 60rpx);

			.tab {
				display: flex;
				align-items: center;
				flex-shrink: 0;

				.tab-item {
					#flex();
					padding: 0 5rpx;
					height: 60rpx;
					min-width: 90rpx;
					flex-shrink: 0;
					color: #bdc3c7;
				}

				.active {
					color: white;
				}
			}
		}

		.down {
			width: 60rpx;
			height: 60rpx;
			#flex();

			.down-img {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
