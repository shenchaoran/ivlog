<template>
	<view class="index">
        <VideoList :list='list'></VideoList>
        <!-- <block v-for="item in list" :key='item.id'>
            <text>{{item.id}}</text>
        </block> -->
	</view>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import VideoList from '../../components/video-list'

	export default {
        name: 'home',
        components: {
            VideoList
        },
		data() {
			return {
                _page: 1,
                _limit: 5,
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
            loading: (newV, oldV) => {
                if(newV === false)
                    uni.stopPullDownRefresh();
            },
            error: (newV, oldV) => {
                if(newV) {
                    uni.showToast({
                        title: '加载失败',
                        icon: 'none',
                    });
                }
                uni.stopPullDownRefresh();
            },
        },
		onLoad() {
            console.log(this.data, this._page, this._limit)
			this.getList({
                _page: this._page, 
                _limit: this._limit,
            });
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.loading = true;
            this._page++
			this.getList({
                _page: this._page, 
                _limit: this._limit,
            });
		},
		onReachBottom() {
			
		},
		methods: {
            ...mapActions(['getList']),
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/video/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			},
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}
	
	page {
		display: flex;
		min-height: 100%;
		background-color: #EFEFEF;
	}
	
	template {
		display: flex;
		flex: 1;
	}
</style>
