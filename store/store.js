import Vuex from 'vuex';
import Vue from 'vue';
import home from './modules/home.js'
import search from './modules/search.js'
import Classification from './modules/Classification.js'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		couponLink: "",
		host: "https://www.xcyh.cc/api/",
		showPopup: false,
		timer:null
	},
	mutations: {
		receive(state, url) {
			uni.navigateTo({
				url: "/pages/couponLink/couponLink"
			})
			state.couponLink = url;
		},
		goDetails(state, params) {
			console.log(params)
			uni.navigateTo({
				url: "../details/details?id=" + params.id + "&goodsId=" + params.goodsId
			})
		},
		get_privilege_link(state, goodsId) {
			uni.request({
				url: `${state.host}get_privilege_link/get_privilege_link`, //高效转链	
				data: {
					id: goodsId
				},
				success(res) {
					uni.navigateTo({
						url: "/pages/couponLink/couponLink"
					})
					state.couponLink = res.data.data.couponClickUrl
					console.log(res)
				},
				fail(err) {
					console.log(err)
				}
			})
		},
		creat_taokouling(state, params) { //淘口令
		console.log(params)
			uni.request({
				url: `${state.host}get_goods_list/creat-taokouling`,
				data: {
					text: params.text,
					url: params.url
				}
			}).then(res => {
				res.forEach(item => {
					if (item !== null) {
						uni.setClipboardData({
							data: item.data.data.longTpwd,
							success:function(){
								state.showPopup = true;
								uni.hideToast();
								clearTimeout(state.timer)
								state.timer=setTimeout(()=>{
									state.showPopup = false;
								},1500)
							}
						})
					}
				})
			}).catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
		home,
		search,
		Classification
	}
})
export default store;
