<template>
	<view class="list-container">
        <VideoList class='video-list' :action='action' :list='list'></VideoList>
        <view class='load-more'>
			<uni-load-more
                :style='"display:" + showLoadMore'
                :status="'loading'" color="#ffffff" />
        </view>
	</view>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import VideoList from '../../components/video-list'
    import uniLoadMore from "@/components/uni-load-more/uni-load-more"

	export default {
        name: 'home',
        components: {
            VideoList,
            uniLoadMore,
        },
		data() {
			return {
                _page: 1,
                _limit: 10,
                loadMore: 'more',
                showLoadMore: 'none',
                action: '',
                loadMoreText: {
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多数据了"
                }
			}
        },
        computed: mapState({
            list: state => {
                return state.video.list
            },
            loading: state => state.video.loading,
            error: state => state.video.error,
        }),
        watch: {
            loading: function(newV, oldV) {
                if(newV === false) {
                    uni.stopPullDownRefresh();
                }
                this.loadMore = 'more'
                this.showLoadMore = 'none'
            },
            error: function(newV, oldV) {
                if(newV) {
                    uni.showToast({
                        title: '加载失败',
                        icon: 'none',
                    });
                }
                uni.stopPullDownRefresh();
                this.loadMore = 'more'
                this.showLoadMore = 'none'
            },
        },
		onLoad(option) {
            let {data, action} = option
            this.$data.action = action
            try {
                console.log('data:', data)
                try {
                    data = JSON.parse(decodeURIComponent(data))
                }
                catch(e) {
                    e
                }
                if(action == 'chooseModel') {
                    data = data.map(v => {
                        return {
                            id: 1,
                            author: "chestershen",
                            videoName: v,
                            cover: v.replace('.mp4', '.jpg'),
                            up: 15
                        }
                    })
                    // this.list = data
                    this.setList(data)
                }
                else {
                    this.getList({
                        _page: this.$data._page, 
                        _limit: this.$data._limit,
                    });
                }
            }
            catch(e) {
                e
            }


            // this.setLoading()
            console.log(this.$data._page, this.$data._limit)

            // uni.navigateTo({
            //     url: `/pages/video/list?action=chooseModel&data=${encodeURIComponent(JSON.stringify(videoNameList))}`
            // })
			
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
            this.refresh();
            this.$data._page = 0
            this.setLoading()
			this.getList({
                _page: this.$data._page, 
                _limit: this.$data._limit,
            });
		},
		onReachBottom() {
            console.log('onReachBottom')
            this.loadMore = 'loading'
            this.showLoadMore = 'flex'
            this.$data._page++
            this.setLoading()
            this.getList({
                _page: this.$data._page,
                _limit: this.$data._limit,
            })
		},
		methods: {
            ...mapActions(['getList']),
            ...mapMutations(['refresh', 'setLoading', 'setList', ]),
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/video/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			},
		}
	}
</script>

<style>
    html{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
	page,
	view {
		display: flex;
	}
	
	page {
		display: flex;
		min-height: 100%;
		background-color: #000000;
	}
	
	template {
		display: flex;
		flex: 1;
	}

	.list-container {
        width: 100%;
        height: 100%;
        background: #000000;
    }

    .video-list {
        width: 100%;
        height: 100%;
    }

    .load-more {
        position: fixed;
        bottom: 50px;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        z-index: 100;
    }

    .load-more-body {
        display: none;
    }
</style>
