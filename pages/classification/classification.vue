<template>
	<view class="classification">
		<tab :categoryList="categoryList"></tab>
		<goods />
	</view>
</template>

<script>
	import tab from './tab.vue'
	import goods from './goods.vue'
	export default {
		data() {
			return {
				categoryList: [],
				goodList: []
			}
		},
		mounted() {
			this.get_super_category();
		},
		methods: {
			get_super_category() {
				const t = this;
				uni.request({
					url: t.$store.state.host + "get_super_category/get_super_category",
					success(res) {
						t.categoryList = res.data.data;
						const params = {
							keyWords: t.categoryList[0].cname,
							ids: t.categoryList[0].cid,
							type: 1
						}
						t.$store.commit('ClassifiedSearch',params)
					}
				})
			}
		},
		components: {
			tab,
			goods
		},
	}
</script>

<style lang="less">
	.classification {
		overflow: hidden;
		/* #ifdef H5 */
		height: calc(100vh - 45px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 100vh;
		/* #endif */
	}
</style>
