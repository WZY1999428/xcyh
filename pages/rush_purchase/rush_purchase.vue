<template>
	<view class="container">
		<scroll-view class="time_tabBar" scroll-y="true" @touchstart="tabStart" @touchmove="tabMove" @touchend="tabMovEnd">
			<view class="timeBox" :style="{transform:'translateX('+left+'px)'}">
				<view class="item" v-for="(item,k) in times" :class="{active:active==k}" @click="ddq_goods_list(item.ddqTime,k)">
					<text ref="time">{{item.ddqTime|setTime}}</text>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="goods-list">
			<bigPicture :goods_list="goods_list" />
		</scroll-view>
	</view>
</template>

<script>
	import bigPicture from '../../components/Big_picture.vue'
	export default {
		data() {
			return {
				times: [],
				time: null,
				active: 0,
				left: 0,
				disX: 0,
				timer: null,
				timer2: null,
				goods_list: []
			};
		},
		components: {
			bigPicture
		},
		onLoad() {
			const d = new Date();
			const time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + "00:00";
			this.ddq_goods_list(time);
		},
		filters: {
			setTime(val) {
				return val.split(" ")[1].substring(0, 5)
			}
		},
		methods: {
			ddq_goods_list(time, k) {
				const t = this;
				t.active = k;
				clearTimeout(t.timer2);
				t.timer2 = setTimeout(() => {
					uni.request({
						url: t.$store.state.host + "ddq_goods_list/ddq_goods_list",
						data: {
							roundTime: time
						},
						success(res) {
							t.goods_list = res.data.data.goodsList
							t.times = res.data.data.roundsList;
							t.setTabBar(t.times);
						},
						fail(err) {
							console.log(err)
						}
					})
				}, 500)
			},
			setTabBar(time) {
				this.time = time;
				for (let i = 0; i < this.times.length; i++) {
					if (this.times[i].ddqTime >= time) {
						this.active = i;
						break;
					}
				}
			},
			tabStart(evt) {
				this.disX = evt.changedTouches[0].pageX - this.left; //记录初始值
			},
			tabMove(evt) {
				this.left = evt.changedTouches[0].pageX - this.disX;
			},
			tabMovEnd(evt) {
				const timeBox = uni.createSelectorQuery().in(this).select('.time_tabBar');
				const item = uni.createSelectorQuery().in(this).select('.item');
				let left;
				let timeBox_width
				let item_width;
				timeBox.fields({size: true,scrollOffset: true},data => {
					left=data.scrollWidth
					timeBox_width=data.width
				}).exec();
				item.fields({size: true,scrollOffset: true},data => {
					console.log(data)
					item_width=data.width;
				}).exec();
				if (this.left > 0) {
					this.left = 0;
				}else if(left<=timeBox_width){
					this.left=-(left-(item_width+item_width/2.5))
				}
			}
		},
	}
</script>

<style lang="less">
	.container {
		height: calc(100% - 45px);
		.time_tabBar {
			position: relative;
			top: 0;
			left: 0;
			z-index: 666;
			background-color: black;
			overflow: hidden;
			.timeBox {
				min-width: 100%;
				display: flex;
				align-items: center;
				height: 60rpx;
				.item {
					min-width: 150rpx;
					flex-shrink: 0;
					height: 50rpx;
					background-color: red;
					margin-left: 5px;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.active {
					background-color: #3498db;
				}
			}
		}

		.goods-list {
			position: absolute;
			top: 80rpx;
		}
	}
</style>
