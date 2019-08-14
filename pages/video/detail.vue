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
                <!-- <view class='btn chooseBtn' v-if='action== "chooseModel"'>
                    <uni-icon class='icon' @tap='onChoose' :type="'checkbox-filled'" :color="'#fff'" size="40" />
                </view> -->
                <view class='btn icon-item'>
                    <uni-icon class='icon' @tap='like' :type="'star-filled'" :color="'#fff'" size="25" />
                    <text class='text'>{{parseInt(Math.random() * 1000)}}</text>
                </view>
                <view class='btn choose-btn'>
                    <uni-icon class='icon' @tap='onChoose' :type="'checkbox-filled'" :color="'#fff'" size="25" />
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
                console.log('choose video: ', this.video)
                uni.navigateTo({
					url: '/pages/shoot/index?data=' + encodeURIComponent(JSON.stringify(this.video))
				})
            },
            like() {

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
                position: fixed;
                left: 50%;
                right: 20px;
                top: 50px;
                bottom: 50px;

                // float: right;
                display: flex;
                flex-flow: column;
                justify-content: flex-end;
                align-items: flex-end;
                
                .btn {
                    right: 5px;
                    margin-bottom: 40px;
                    &.choose-btn {
                        bottom: 5px;
                    }
                }

                .icon-item {
                    display: inline-flex;
                    // width: 187upx;
                    // height: 187upx;
                    color: #fff;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    .text {
                        font-size: 15px;
                    }
                }
            }
        }
    }
</style>
