<template>
	<view class="musicWrapper">
		<audio class="musicAudio" style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author"
			:action="audioAction" controls></audio>
	</view>
</template>
<script>
	export default {
		props: {
			current: {
				type: Object,
			},
		},
		data() {
			return {
				// current: {
				// 	poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
				// 	name: '致爱丽丝',
				// 	author: '暂无',
				// 	src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
				// },
				audioAction: {
					method: 'pause'
				}
			}
		}
	}
</script>

<style scoped>
	page {
		display: flex;
		min-height: 100%;
		min-width: 100%;
		background-color: #EFEFEF;
	}
	
	template {
		display: flex;
		flex: 1;
	}
	
	.musicWrapper {
		display: flex;
		flex-direction: row;
		min-width: 100vw !important;
		height: 10vh;
	}
	.musicAudio {
		min-width: 100vw !important;
		height: 10vh;
		flex-grow: 1;
	}
</style>