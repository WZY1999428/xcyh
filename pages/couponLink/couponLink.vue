<template>
	<view class="container">
		<web-view :webview-styles="webviewStyles" :src="couponLink" ></web-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
			};
		},
		computed: {
			...mapState({
				couponLink:state=>state.couponLink,
			}),
		},
	}
</script>

<style lang="less">
</style>
