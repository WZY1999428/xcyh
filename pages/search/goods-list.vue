<template>
	<view class="goods-list">
		<operation @setBg="setBg" :isScreen="isScreen" @showScreen="showScreen(0)" />
		<scroll-view scroll-y="true" class="goodsBox" @scroll="loadData">
			<template>
				<liebiao :searchGoods="searchGoods" v-if="isliebiao" />
				<tubiao :searchGoods="searchGoods" v-else />
			</template>
			<view class="scrollDown">
				<template v-if="loadcode!=10006">
					<image class="loading" src="../../static/loading.png"></image>{{loadtxt}}
				</template>
				<template v-else>
					<text>{{loadtxt}}</text>
				</template>
			</view>
		</scroll-view>
		<Popup v-if="showPopup" />
		<screen :screenLeft="screenLeft" @showScreen="showScreen" />
	</view>
</template>
<script>
	import liebiao from './liebiao.vue'
	import tubiao from './tubiao.vue'
	import operation from './operation.vue'
	import screen from './screen.vue'
	import sPullScroll from '../../components/s-pull-scroll/index.vue'
	import Popup from "../../components/Popup.vue";
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				isliebiao: true,
				isScreen: false,
				backTop: true,
				timer: null,
				screenLeft: 100
			};
		},
		computed: {
			...mapState({
				searchGoods: state => state.search.searchGoods,
				showPopup: state => state.showPopup,
				loadtxt: state => state.search.loadtxt,
				loadcode: state => state.search.loadcode
			}),
		},
		methods: {
			setBg(bool) {
				this.isliebiao = bool;
			},
			showScreen(number) {
				this.screenLeft = number;
			},
			loadData(evt) {
				// console.log(evt.detail.scrollTop)
				// console.log()
				if (evt.detail.scrollTop >= evt.detail.scrollHeight - 800) {
					clearTimeout(this.timer)
					this.timer = setTimeout(() => {
						this.$store.commit('get_dtk_search_goods', {
							t: "",
							val: ""
						})
					}, 500)
				}
			}
		},
		components: {
			liebiao,
			tubiao,
			operation,
			screen,
			sPullScroll,
			Popup
		}
	}
</script>
<style scoped lang="less">
	@keyframes loading {
		from {
			transform: rotateZ(0deg);
		}

		to {
			transform: rotateZ(360deg);
		}
	}

	.goods-list {
		width: 100%;
		/* #ifdef H5 */
		height: calc(100% - 100rpx);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 100vh;
		/* #endif */
		position: relative;

		.goodsBox {
			height: 100%;
			position: absolute;
			top: 70rpx;
			padding-bottom: calc(45px + 70rpx);
            .hide{
				visibility: hidden !important;
			}
			.show{
				visibility: visible !important;
			}
			.scrollDown {
				height: 45px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #bdc3c7;
				color: #ecf0f1;
				.loading {
					width: 35rpx;
					height: 35rpx;
					animation: 1.5s loading infinite linear;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
