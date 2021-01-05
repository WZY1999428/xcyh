const Classification = { //搜索模块
	state: {
		host: "https://www.xcyh.cc/api/",
		ClassificationList: [],
		keyWords: "",
		ids: "",
		timer: null,
		pageId: 1,
		loading: false,
		loadTxt: "加载中···"
	},
	mutations: {
		ClassifiedSearch(state, params) { //大淘客搜索
			state.loading = true
			state.loadTxt = "加载中···";
			if (params.keyWords != undefined) {
				console.log(params.keyWords)
				state.keyWords = params.keyWords;
				state.ids = params.ids;
			}
			clearTimeout(state.timer);
			state.timer = setTimeout(() => {
				if (params.type == 1) {
					state.ClassificationList.splice(0, state.ClassificationList.length);
					state.pageId = 1;
				} else {
					state.pageId++;
				}
				console.log(state.pageId)
				uni.request({
					url: state.host + "get_dtk_search_goods/get-dtk-search-goods",
					data: {
						pageSize: 50,
						pageId: state.pageId,
						keyWords: state.keyWords,
						cids: state.ids
					},
					success(res) {
						if (res.data.code == 10006) {
							state.loadTxt = "已经加载完了";
							return;
						}
						res.data.data.list.forEach(item => {
							state.ClassificationList.push(item)
						})
						state.loading = false;
					},
					fail(err) {
						console.log(err)
					}
				})
			}, 500)
		}
	},
}
export default Classification;
