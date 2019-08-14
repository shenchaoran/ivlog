<template>
  <view class='my-container'>
    <view class="person-head">
      <cmd-avatar src="https://avatar.bbs.miui.com/images/noavatar_small.gif" @click="fnInfoWin" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
      <view class="person-head-box">
        <view class="person-head-nickname">Slimmer</view>
        <view class="person-head-username">ID：slimmer9501</view>
      </view>
    </view>
    <view class="person-list">
        <VideoList class='video-list' :action='""' :list='list'></VideoList>
    </view>
  </view>
</template>

<script>
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
  import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
  import VideoList from '../../components/video-list'
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    components: {
      cmdAvatar,
      cmdCellItem,
      cmdIcon,
      VideoList,
    },
    data() {
        return {
            _page: 1,
            _limit: 10,
            action: '',
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
    methods: {
        ...mapActions(['getList']),
        ...mapMutations(['refresh', 'setLoading', 'setList', ]),
        goDetail(e) {
            uni.navigateTo({
                url: '/pages/video/detail?data=' + encodeURIComponent(JSON.stringify(e))
            })
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
                    console.log('onLoad get list')
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
      /**
       * 打开用户信息页
       */
      fnInfoWin() {
        uni.navigateTo({
          url: '/pages/user/info/info'
        })
      }
    }
  }
</script>

<style lang="scss">
html, body {
    height: 100%;
    width: 100%;
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

    .my-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;

        .person-head {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 150px;
            padding-left: 20px;
            background: linear-gradient(to right, #365fff, #36bbff);
        }

        .person-head-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 10px;
        }
    }
  

  .person-head-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  .person-head-username {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .person-list {
    line-height: 0;
    background: #000;
  }
</style>
