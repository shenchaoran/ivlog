<template>
	<view class="index">
		<block v-for="list in lists" :key="list.id">
			<view class="row">
				<view class="card card-list2" v-for="item in list.data" @click="goDetail(item)" :key="item.img_src">
					<!-- <image class="card-img card-list2-img" :src="item.img_src"></image> -->
                    <video id="myVideo" :src="item.video"
    				 @error="videoErrorCallback" controls :poster="item.pic"></video>
					<text class="card-num-view card-list2-num-view">{{item.img_num}}P</text>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">{{item.title}}</text>
						</view>
						<view @click.stop="share(item)" class="card-share-view"></view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex';

	export default {
		data() {
			return {
                loading: true,
                error: '',
				lists: [],
                _page: 1,
                _limit: 5,
			}
        },
        computed: mapState({
            list: state => state.video.list,
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
                _limit: this._limit
            });
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败', e);
				}
			});
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.loading = true;
			this.getList();
		},
		onReachBottom() {
			this.getList();
		},
		methods: {
            ...mapActions(['getList']),
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/video/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : 'WXSceneSession',
							type: 0,
							title: 'uni-app模版',
							summary: e.title,
							imageUrl: e.img_src,
							href: 'https://uniapp.dcloud.io',
							success: (res) => {
								console.log('success:' + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			}
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
