<template>
	<view class="screen" :style="{left:screenLeft+'%'}">
		<div class="bg" @click="$emit('showScreen',100)"></div>
		<view class="screenBox">
			<view class="title">
				商品品牌
			</view>
			<view class="tags">
				<text class="tag" v-for="(tag,index) in tags" :key="index" :class="{select:select==index}" @click="selectTag(tag,index)">{{tag}}</text>
			</view>
			<view class="title">
				价格区间(元)
			</view>
			<view class="Price">
				<input type="text" v-model="max" placeholder="最高价格">
				<text>-</text>
				<input type="text" v-model="min" placeholder="最低价格">
			</view>
			<view class="btns">
				<button class="leftBtn">重置</button>
				<button class="rightBtn">完成</button>
			</view>
			<view class="title">
				购物平台
			</view>
			<view class="tags">
				<text class="tag" v-for="(tag,index) in markets" :key="index" :class="{select:ismarket==index}" @click="selectiSmarket(tag,index)">{{tag}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				select: null,
				tag: "",
				max: "",
				min: "",
				market: "",
				ismarket: ""
			}
		},
		methods: {
			selectTag(tag, index) {
				this.select = index;
				this.tag = tag;
			},
			selectiSmarket(tag, index) {
				this.market = tag;
				this.ismarket = index;
			},
		},
		props:{
			screenLeft:Number
		}
	}
</script>

<style scoped lang="less">
	.screen {
		position: relative;
		position: absolute;
		left: 0;
		top: 6%;
		width: 100vw;
		height: calc(94vh - 70rpx);
		background-color: rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: flex-end;
		transition: all 0.25s;
		z-index: 66666;
		.select {
			color: red;
			border-color: red !important;
		}
		.bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.screenBox {
			padding: 10rpx;
			width: 70%;
			height: 100%;
			background-color: white;
			position: relative;

			.title {
				margin: 20rpx 0;
			}

			.tags {
				min-height: 250rpx;
				display: flex;
				flex-wrap: wrap;

				.tag {
					width: 150rpx;
					height: 50rpx;
					text-align: center;
					padding: 5rpx 20rpx;
					border: 1rpx solid black;
					border-radius: 30rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					font-size: 25rpx;
				}
			}

			.Price {
				display: flex;
				justify-content: center;
				align-items: center;

				input {
					width: 150rpx;
					height: 50rpx;
					font-size: 25rpx;
					text-align: center;
					border: 1px solid black;
					margin: 0 5rpx;
					border-radius: 30rpx;
				}
			}

			.btns {
				position: absolute;
				top: 94%;
				left: 0;
				width: 100%;
				display: flex;
				height: 60rpx;
				background-color: red;

				button {
					flex: 1;
					background: none;
					border-radius: 0;
					height: 100%;
					line-height: 60rpx;
				}

				.leftBtn {
					background-color: #cccccc;
					color: red;
				}
				.leftBtn:active{
					background-color: #bdbdbd;
				}

				.rightBtn {
					background-color: red;
					color: white;
				}
				.rightBtn:active{
					background-color: #d60003;
				} 
			}
		}
	}
</style>
