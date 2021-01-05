<template>
	<view class="hot_sale">
		<s-pull-scroll ref="pullScroll" :pullDown="Refresh" upFinishText="我是有底线的···" :backTop="backTop" :pullUp="loadData" class="container">
			<big-picture :goods_list="goods_list" />
		</s-pull-scroll>
	</view>
</template>

<script>
	import bigPicture from '../../components/Big_picture.vue';
	import sPullScroll from '../../components/s-pull-scroll/index.vue'
	export default {
		data() {
			return {
				backTop: true,
				goods_list: [],
				pageId: 1
			};
		},
		onLoad() {
			this.explosive_goods_list();
		},
		methods: {
			explosive_goods_list(pullScroll) {
				const t = this;
				uni.request({
					url: `${t.$store.state.host}super_discount_goods/explosive_goods_list`,
					data: {
						pageId: t.pageId,
						pageSize: 20,
						PriceCid: 1,
						cids: ""
					},
					success(res) {
						console.log(res)
						if (res.data.code == 10006) {
							pullScroll.finish();
							return;
						}
						res.data.data.list.forEach(item => {
							t.goods_list.push(item)
						})
						pullScroll.success();
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			loadData(pullScroll) {
				this.pageId++;
				this.explosive_goods_list(pullScroll);
			},
			Refresh(pullScroll) {
				this.pageId = 1;
				this.goods_list.splice(0, this.goods_list.length)
				this.explosive_goods_list(pullScroll);
			}
		},
		components: {
			bigPicture,
			sPullScroll
		}
	}
</script>

<style lang="less">

</style>
