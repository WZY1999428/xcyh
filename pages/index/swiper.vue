<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(item,i) in swiperItem" :key="i" @click.stop="$store.commit('receive',item.url)">
			<image :src="item.img" mode="widthFix"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				swiperItem: [{
						img: "https://img.alicdn.com/imgextra/i2/O1CN01Y1t63i27LkR5VdNkg_!!6000000007781-0-tps-800-450.jpg",
						url: "https://s.click.taobao.com/V3jYksu"
					},
					{
						img: "https://gw.alicdn.com/tfs/TB13BYl4Nv1gK0jSZFFXXb0sXXa-800-450.jpg",
						url: "https://s.click.taobao.com/2sTYksu"
					},
					{
						img: "https://img.alicdn.com/imgextra/i4/O1CN018r2Tec1EphTH9SO5G_!!6000000000401-0-tps-800-450.jpg",
						url: "https://s.click.taobao.com/P82Zksu"
					},
					{
						img: "https://gw.alicdn.com/imgextra/i2/O1CN01oLhCXa21jD1uKQMg8_!!6000000007020-0-tps-800-450.jpg",
						url: "https://s.click.taobao.com/w3Srosu"
					}
				],
			}
		},
		mounted() {
			// this.catalogue();
		},
		methods: {
			// catalogue() {
			// 	const t = this;
			// 	uni.request({
			// 		url: t.$store.state.home.host + "get_goods_list/live_goods_list",
			// 		method: "GET",
			// 		timeout: 60000,
			// 		success(res) {
			// 			t.swiperItem = res.data.data.list.splice(0, 5);
			// 		},
			// 		fail(err) {
			// 			console.log(err)
			// 		}
			// 	})
			// }
		},
	}
</script>

<style scoped lang="less">
	swiper {
		height: 400rpx;

		.swiper-item {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
