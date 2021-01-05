const search = { //搜索模块
	state: {
		host: "https://www.xcyh.cc/api/",
		searchGoods: [], //搜索商品列表
		searchPageId: 1,
		searchVal: "",
		loading: false,
		loadtxt: "加载商品中 · · ·",
		loadcode: 0
	},
	mutations: {
		get_dtk_search_goods(state, params) { //大淘客搜索
			state.loading = true;
			if (params.t == 1) {
				state.searchPageId = 1;
				state.searchGoods.splice(0, state.searchGoods.length);
			};
			if (params.val !== "") {
				state.searchVal = params.val;
			} else {
				state.searchPageId++
			}
			uni.request({
				url: `${state.host}get_dtk_search_goods/get-dtk-search-goods`,
				data: {
					type: 0,
					pageId: state.searchPageId,
					pageSize: 20,
					keyWords: state.searchVal,
					sort: params.searchSort
				},
				success: (res) => {
					console.log(res.data)
					const data = res.data
					if (data.code == 10006) {
						state.loadcode = 0;
						state.loadtxt = data.msg;
						state.loadcode = data.code;
					} else {
						res.data.data.list.forEach(item => {
							state.searchGoods.push(item)
						})
						state.loading = false;
					}
				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
	},
}
export default search;
