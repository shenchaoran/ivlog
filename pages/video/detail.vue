<template>
	<view class="container">
        <video class='video' 
            @error="videoErrorCallback" controls 
            :muted='false'
            :autoplay='true'
            :show-center-play-btn='true'
            :src="baseUrl + video.videoName"
            :poster="baseUrl + video.cover">
            <cover-view class='video-cover' @touchmove='onTouchMove'>
                <view class='right-side'>
                    <view class='btn chooseBtn' v-if='action== "chooseModel"'>
                        <uni-icon class='icon' @tap='onChoose' :type="'checkbox-filled'" :color="'#007aff'" size="40" />
                    </view>
                    <view class='btn '>
                        <uni-icon class='icon' @tap='onChoose' :type="'paperplane'" :color="'#007aff'" size="40" />
                    </view>
                </view>
            </cover-view>
        </video>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
        components: {uniIcon},
		data() {
			return {
                baseUrl: 'http://129.211.60.18:3000/ivlog/api/public/',
                // baseUrl: 'http://10.66.146.106:1111/ivlog/api/public/',
                video: null,
                action: 'chooseModel',
			}
		},
		onLoad(option) {
            let {action, data} = option
            try {
                console.log('data:', data)
                data = JSON.parse(decodeURIComponent(data))
                console.log('video: ', data.videoName)
                this.video = data
                this.action = action
            }
            catch(e) {
                e
            }
		},
		methods: {
            onChoose() {
                console.log('choose')
                // uni.navigateTo({
				// 	url: '/pages/video/detail?data=' + encodeURIComponent(JSON.stringify(e))
				// })
            },
			videoErrorCallback(e) {
                console.log('videoError: ', e)
            },
            onPageScroll(e) {
                console.log('onPageScroll')
            },
            onTouchMove(e) {
                console.log('onTouchMove', e)
            },
		}
	}
</script>

<style lang="scss">
    // @font-face {
    //     font-family: 'iconfont';
    //     src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype');
    // }
    
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
        height: 100%;
        overflow: hidden;
		background-color: #000000;
	}
	
	template {
		display: flex;
		flex: 1;
	}

	.container {
        width: 100%;
        /* height: 100%; */
        background: #000000;
        flex: 1;
        position: relative;
        .video {
            width: 100%;
            height: 100%;
            position: relative;
            .video-cover {
                position: absolute;
                left: 50px;
                right: 50px;
                top: 50px;
                bottom: 50px;

                .right-side {
                    .btn {
                        &.chooseBtn {
                            position: absolute;
                            right: 5px;
                            bottom: 5px;
                            color: rgb(255, 0, 0);
                        }
                    }
                }
            }
        }
    }
</style>
