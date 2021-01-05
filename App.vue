<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	@import url("./static/font/iconfont.css");
	view,
	checkbox,
	radio,
	text,
	scroll-view,
	image,
	button,
	web-view{
		margin: 0;
		padding: 0;
		font-size: 30rpx;
		box-sizing: border-box;
		line-height: normal;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
