<template>
	<view class="fold_up">
		<view class="sort">
			<text>综合</text>
			<text>销量</text>
			<text>价格</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			this.super_discount_goods();
		},
		methods: {
			super_discount_goods() {
				this.$store.commit('super_discount_goods', {
					pageSize: 20,
					pageId: 1,
					sort: 0,
					t:1
				})
			}
		}
	}
</script>

<style lang="less">

</style>
