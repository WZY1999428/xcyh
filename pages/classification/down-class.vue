<template>
	<view class="down-class">
		<view class="item"  v-for="(item,k) in categoryList" @click.stop="get_super_category(item.cname,item.subcategories,k)" :key="k">
			<image :src="item.cpic"></image>
			<text>{{item.cname}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			categoryList: {
				type:Array
			}
		},
		methods:{
			get_super_category(cname,item,k){
				this.$emit('get_super_category',cname,item,k);
				this.$emit('hide',false);
			}
		}
	}
</script>

<style scoped lang="less">
	.down-class {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		position: relative;
		background-color: #3498db;
        z-index:666;
		.item {
			width: 25vw;
			margin: 20rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				width: 55rpx;
				height: 55rpx;
			}

			text {
				color: white;
				font-size: 25rpx;
			}
		}

		.mask {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
</style>
