const home = {//首页模块
	state: {
		host: "https://www.xcyh.cc/api/",
		pageid: 1,
		goodsList: [], //每日精选列表
		loading: true,
		foldList: [], //折上折商品列表 
	},
	mutations: {
		get_ranking_list(state, params) { //商品列表
			state.loading = true;
			if (params.val == "Refresh") {
				state.pageid = 1;
				state.goodsList.splice(0, state.goodsList.length);
			} else {
				state.pageid++;
			}
			uni.request({
				url: `${state.host}get_goods_list/get-goods-list`,
				method: "GET",
				timeout: 60000,
				data: {
					pageid: state.pageid,
					pageSize: 20
				},
				success(res) {
					if (res.data.code == 10006) {
						params.fun.finish();
						return;
					}
					res.data.data.list.forEach(item => {
						state.goodsList.push(item);
					})
					params.fun.success();
					state.loading = false;
				},
				fail(err) {
					console.log(err)
				}
			})
		},
		super_discount_goods(state, params) { //折上折
			if (params.t == 1) {
				state.foldList.splice(0, state.foldList.length)
			}
			uni.request({
				url: `${state.host}super_discount_goods/super_discount_goods`,
				data: {
					pageSize: params.pageSize,
					pageId: params.pageId,
					sort: params.sort
				},
				timeout: 600000,
				success: (res) => {
					res.data.data.list.forEach(item => {
						state.foldList.push(item)
					})
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
	},
}
export default home;
