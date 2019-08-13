<template>
	<div class='container'>
        <div class='left'>
            <block v-for="(item, index) in list" :key="item.id">
                <block v-if='index%2==0' class="video-item">
                    <video class='video' 
                        @error="videoErrorCallback" 
                        :src="baseUrl + item.videoName"
                        :poster="baseUrl + item.cover"
                        :muted='true'
                        :autoplay='false'
                        :controls='false'
                        :objectFit='"cover"'
                        :loop='true'
                        :show-fullscreen-btn='false'
                        :show-progress='false'
                        :show-play-btn='false'
                        :enable-progress-gesture='false'
                        @click="goDetail(item)"></video>
                </block>
            </block>
        </div>
        <div class='right'>
            <block v-for="(item, index) in list" :key="item.id">
                <block v-if='index%2==1' class="video-item">
                    <video class='video' 
                        @error="videoErrorCallback" 
                        :src="baseUrl + item.videoName"
                        :poster="baseUrl + item.cover"
                        :muted='true'
                        :autoplay='false'
                        :controls='false'
                        :objectFit='"cover"'
                        :loop='true'
                        :show-fullscreen-btn='false'
                        :show-progress='false'
                        :show-play-btn='false'
                        :enable-progress-gesture='false'
                        @click="goDetail(item)"></video>
                </block>
            </block>
        </div>
    </div>
</template>

<script>
	export default {
        name: 'video-list',
        props: {
            list: {
				type: Array,
				default: [],
            },
            action: {
                type: String,
                default: '',
            },
        },
		data() {
			return {
                baseUrl: 'http://129.211.60.18:3000/ivlog/api/public/',
                // baseUrl: 'http://10.66.146.106:1111/ivlog/api/public/',
            }
        },
        watch: {
            list: (newV, oldV) => {
                console.log(newV, oldV)
            }
        },
		methods: {
			goDetail(v) {
                let url = `/pages/video/detail?action=${this.$data.action}&data=${encodeURIComponent(JSON.stringify(v))}`
                console.log(url)
				uni.navigateTo({
					url
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
        flex-flow: row nowrap;
        width: 100%;
        height: 100%;
        background: #000;
    }
    .left,
    .right {
        flex: 1 1 50%;
        display: flex;
        flex-flow: column nowrap;
        margin: 3px;
    }
    .video {
        border-radius: 5px;
        width: 100%;
        margin: 3px 0;
    }
</style>
