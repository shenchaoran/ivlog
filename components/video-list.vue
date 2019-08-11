<template>
	<div class='container'>
        <view class="video-item" v-for="item in list" @click="goDetail(item)" :key="item.id">
            <!-- <image class="card-img card-list2-img" :src="item.img_src"></image> -->
            <!-- <text>{{item.id}}</text> -->
            <video class='video' :src="item.video"
                @error="videoErrorCallback" controls :poster="item.pic"></video>
            <!-- <text class="card-num-view card-list2-num-view">{{item.img_num}}</text> -->
            <!-- <view class="card-bottm row">
                <view class="car-title-view row">
                    <text class="card-title card-list2-title">{{item.title}}</text>
                </view>
                <view @click.stop="share(item)" class="card-share-view"></view>
            </view> -->
        </view>
    </div>
</template>

<script>
	export default {
        name: 'video-list',
        props: {
            list: {
				type: Array,
				default: []
            }
        },
		data() {
			return {}
        },
        watch: {
            list: (newV, oldV) => {
                console.log(newV, oldV)
            }
        },
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/video/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
            },
            videoErrorCallback() {

            },
		}
	}
</script>

<style>
	.container {
        display: flex;
        flex-flow: column wrap;
        width: 100%;
        height: 100%;
    }
    .video-item {
        width: 50%;
    }
    .video {
        width: 100%;
    }
</style>
