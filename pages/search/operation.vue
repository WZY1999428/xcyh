<template>
	<view class="operation">
		<view class="select" :class="{active:active==1}" @click.capture="showDown">
			综合 <image class="icon" :src="static+zhIcon" mode=""></image>
		</view>
		<view class="select" :class="{active:active==2}" @click="Discount">
			销量<image class="icon" :src="static+font" mode=""></image>
		</view>
		<view class="select" :class="{active:active==3}" @click="setPicre">
			价格 <image class="icon" :src="static+picreIcon" mode=""></image>
		</view>
		<view class="right">
			<image class="icon" src="../../static/search/tubiao.png" v-if="isLiebiao" @click="setBg(false)" mode=""></image>
			<image class="icon" src="../../static/search/liebiao.png" v-else @click="setBg(true)" mode=""></image>
			<view class="select" @click="showScreen">
				筛选
				<image class="sx" src="../../static/search/sx.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				isMenu: "none !important",
				option: "综合",
				selectVal: 1,
				isLiebiao: true,
				static: "../../static/search/",
				font: "shenxu.png",
				picreIcon: "shenxu.png",
				zhIcon:"redzh.png",
			}
		},
		props: {
			isScreen: Boolean
		},
		methods: {
			showDown() {
				this.picreIcon = this.static + "shenxu.png"
				this.font = this.static + "shenxu.png"
				this.active = 1;
				if (this.zhIcon == this.static + "zhcx.png") {
					this.zhIcon = this.static + "redzh.png"
				} else {
					this.zhIcon = this.static + "zhcx.png"
				}
				this.$store.commit('get_dtk_search_goods', {
					val: this.$store.state.search.searchVal,
					t: 1,
					searchSort: ""
				});
			},
			select(index, str) {
				this.selectVal = index;
				this.option = str;
				this.isMenu = "none !important";
			},
			setBg(bool) {
				this.$emit('setBg', this.isLiebiao = !this.isLiebiao)
			},
			showScreen() {
				this.$emit('showScreen', !this.isScreen)
			},
			Discount() {
				this.picreIcon = this.static + "shenxu.png"
				this.zhIcon = this.static + "zhcx.png"
				this.active = 2;
				let sort = ""
				if (this.font == this.static + "shenxu.png" || this.font == this.static + "redsx.png") {
					this.font = this.static + "redjx.png"
					sort = "2";
				} else {
					this.font = this.static + "redsx.png"
					sort = "3";
				}
				this.$store.commit('get_dtk_search_goods', {
					val: this.$store.state.search.searchVal,
					t: 1,
					searchSort: sort
				});
			},
			setPicre() {
				this.active = 3;
				this.font = this.static + "shenxu.png";
				this.zhIcon = this.static + "zhcx.png"
				let sort = ""
				console.log(this.static + "redsx.png")
				if (this.picreIcon == this.static + "shenxu.png" || this.picreIcon == this.static + "redsx.png") {
					this.picreIcon = this.static + "redjx.png"
					sort = "5";
				} else {
					this.picreIcon = this.static + "redsx.png"
					sort = "6";
				}
				this.$store.commit('get_dtk_search_goods', {
					val: this.$store.state.search.searchVal,
					t: 1,
					searchSort: sort
				});
			}
		},
	}
</script>

<style scoped lang="less">
	.operation {
		width: 100%;
		height: 6%;
		display: flex;
		position: absolute;
		position: relative;
		z-index: 66;
		background-color: white;

		.active {
			color: #e74c3c;
		}

		.active2 {
			color: #e74c3c !important;
		}

		.icon {
			width: 25rpx;
			height: 25rpx;
			margin-left: 5rpx;
		}

		.select {
			height: 100%;
			min-width: 15vw;
			position: relative;
			display: flex;
			align-items: center;
			padding: 0 20rpx;

			.Mask {
				width: 100vw;
				height: 100vh;
				position: absolute;
				top: 100%;
				left: 0;
				display: flex;
				flex-direction: column;
				background-color: rgba(0, 0, 0, 0.2);
				animation: fade 0.2s;

				.menu {
					padding: 10rpx;
					background-color: white;

					text {
						color: #2c3e50;
						margin: 10rpx 0;
						display: flex;
						align-items: flex-start;
					}
				}
			}
		}

		.select::after {
			position: absolute;
			right: 0;
			content: "";
			height: 40%;
			top: 30%;
			width: 1px;
			background-color: #95a5a6;
		}

		.select:active {
			color: #859299;
		}

		.right {
			position: absolute;
			height: 100%;
			right: 10rpx;
			display: flex;
			min-width: 150rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 10rpx;

			.icon {
				width: 40rpx;
				height: 40rpx;
			}

			.sx {
				width: 35rpx;
				height: 35rpx;
			}

			text {
				font-size: 25rpx;
				line-height: 75rpx;
			}
		}
	}
</style>
