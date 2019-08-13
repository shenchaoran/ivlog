<template>
	<view class="container">
        <video class='video' 
            @error="videoErrorCallback" controls 
            :muted='false'
            :autoplay='true'
            :show-center-play-btn='true'
            :src="'http://localhost:1111/ivlog/api/public/' + video.video"
            :poster="'http://localhost:1111/ivlog/api/public/' + video.pic">
            <cover-view class='video-cover' @touchmove='onTouchMove'></cover-view>
        </video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				video: null,
			}
		},
		onLoad(option) {
            let {data} = option
            try {
                console.log('data:', data)
                this.video = JSON.parse(data)
                console.log('video: ', this.video)
            }
            catch(e) {
                e
            }
		},
		methods: {
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
    }
/* 
    uni-page-wrapper {
        display: flex !important;
        flex: 1 !important;
    }

    .template-container {
        width: 100%;
        height: 100%;
    } */
	
	/* template {
		display: flex;
		flex: 1;
	} */

	/* .container {
        width: 100%;
        height: 100%;
    } */
	.video {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .video-cover {
        position: absolute;
        left: 10%;
        right: 10%;
        top: 10%;
        bottom: 10%;
        background: #fff;
    }
</style>
