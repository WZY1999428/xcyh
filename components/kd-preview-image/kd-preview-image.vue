<template>
	<view class="container">
		<slot></slot>
		<transition name="fade">
			<view v-if="show" class="kd-shadow" @click="shadowClick">
				<view class="show-page">
					<movable-area class="movable-area" id="movable-area" :scale-area="true">
						<movable-view class="movable-view" id="movable-view" :y="initY" :scale-value="1" direction="all" :scale="true">
							<image :src="images[index]" alt="" mode="widthFix"></image>
						</movable-view>
					</movable-area>
					<view class="kd-number">
						{{index + 1}} / {{images.length}}
					</view>
				</view>
				<scroll-view class="imgs" :scroll-x="true" :scroll-y="false" :show-scrollbar='false' :enable-flex="true">
					<view class="scroll">
						<view class="image-view" v-for="(item,i) in images" :key="i" :class="{active:index == i}" @click.stop="scrollImgClick(i)">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</transition>
	</view>
</template>

<script>
export default {
	props: {
		images : {
			type: Array,
			default(){
				return []
			}
		},
		value : {
			type: Boolean,
			default : false
		},
		current: {
			type : Number,
			default : 0
		}
	},
	watch:{
		value(val){
			this.show = val
			if(val){
				this.$nextTick(function(){
					this.imagePositionY()
				})
			}
		},
		current(val){
			this.index = val
			this.$nextTick(function(){
				this.imagePositionY()
			})
		}
	},
	mounted(){
		
	},
	data(){
		return {
			show : this.value,
			index : this.current,
			initY : 0
		}
	},
	methods:{
		shadowClick(){
			this.show = false
			this.$emit('input',false)
		},
		scrollImgClick(i){
			this.index = i
			this.imagePositionY()
		},
		//计算当前图片的Y值
		async imagePositionY(){
			let query = uni.createSelectorQuery().in(this)
			let container = query.select('#movable-area')
			let image = query.select('#movable-view')
			let data = await this.elementPosition(container)
			let info = await this.elementPosition(image)
			console.log(data,info)
			let boxHeight = data.height ? data.height : 0
			let imgHeight = info.height ? info.height : 0
			
			if(imgHeight > boxHeight){
				this.initY = 0
			}else{
				this.initY = (boxHeight - imgHeight)/2
			}
		},
		elementPosition(ele){
			return new Promise((r,j)=>{
				ele.boundingClientRect(data=>{
					if(data){
						r(data)
					}else{
						j(null)
					}
				}).exec()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$bgColor: rgba(#000000,.6);
$white : #ffffff;
$black : #000000;

.container{
	.fade-enter-active, .fade-leave-active {
		opacity: 1;
		// transform: scale(1);
	}
	.fade-enter, .fade-leave-to {
		// transform: scale(.6);
		opacity: 0;
	}
	.kd-shadow{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: $bgColor;
		z-index: 999;
		transition: all .5s;
		display: flex;
		flex-direction: column;
		.show-page{
			flex: 1;
			width: 100%;
			position: relative;
			.kd-number{
				position: absolute;
				bottom: 0;
				color: $white;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.movable-area{
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.movable-view{
				width: fit-content;
				height: fit-content;
				image{
					width: 750upx;
					object-fit: initial;
				}
			}
		}
		.imgs{
			height: 200upx;
			width: 100%;
			padding: 10upx;
			box-sizing: border-box;
			.scroll{
				height: 180upx;
				width: fit-content;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: nowrap;
				flex: 1;
			}
			.image-view{
				height: 170upx;
				width: 100upx;
				margin-right: 20upx;
				box-sizing: border-box;
				position: relative;
				flex: none;
				&::after{
					content: '';
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					background: rgba($black,.5);
				}
				&.active{
					border: 10upx solid $white;
					&::after{
						background: rgba($black,0);
					}
				}
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
