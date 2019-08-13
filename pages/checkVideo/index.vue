<template>
	<view class="wrapper">
		<view class="videoWrapper" @tap="handleTap">
		    <video id="myVideo" class="videoPlay" :src="tempVideoPath" controls="false"
		        @error="videoErrorCallback" ></video>
		</view>
		<view class="iconWrapper">
			<view class="resetShoot" @tap="handleResetShoot">
				<view class="image-content">
				    <uni-icon type="clear" size="60" color="#dd6572"></uni-icon>
				</view>
				<p class="iconFont">重新拍摄</p>
			</view>
			<view class="uploadShoot" @tap="handleUploadShoot">
				<view class="image-content">
				    <uni-icon type="checkbox-filled" size="60" color="#dd6572"></uni-icon>
				</view>
				<p class="iconFont">上传</p>
			</view>
			<view class="chooseMusic" @tap="handleChooseMusic">
				<view class="image-content">
				    <uni-icon type="spinner" size="60" color="#dd6572"></uni-icon>
				</view>
				<p class="iconFont">选择音乐</p>
			</view>
		</view>
		<!-- <luch-audio src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3" :play.sync="audioPlay"></luch-audio> -->
		<view :class="{musicList: true, musicListTransShow:ifMusicListShow, musicListTransHide: ifMusicListHide}">
			<view class="musicWrapper" v-for="current in currents">
				<!-- <test :play="audioPlay" :src="current.src"></test> -->
                <!-- <audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" :action="audioAction" controls></audio> -->
				<test :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" loop="true" :play.sync="current.audioPlay"></test>
            </view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "../components/uni-icon.vue"
	
	// import luchAudio from "../components/luch-audio.vue"
	
	import test from "../components/test.vue"
	
	import { uploadFile } from '../../utils.js'
	
	export default {
		components: {
			uniIcon,
			// luchAudio,
			test
		},
		data() {
			return {
				// audioPlay: true,
				tempThumbPath: '',
				tempVideoPath: '',
				music: '',
				ifMusicListShow: false,
				ifMusicListHide: false,
				currents:[
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
					{
						poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
						name: '致爱丽丝',
						author: '暂无',
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						audioPlay: true,
					},
				]
			}
		},
		
		onLoad: function (option) {
			if (option) {
				console.log(option)
				this.tempThumbPath = option.tempThumbPath
				this.tempVideoPath = option.tempVideoPath
			}
		},
		
		methods: {
			handleTap() {
				if (this.ifMusicListShow) {
					this.ifMusicListHide = true
				}
			},
			videoErrorCallback(err) {
				console.log(err)
			},
			imageError(err) {
				console.log(err)
			},
			handleResetShoot() {
				uni.navigateTo({
					url:'/pages/shoot/index'
				})
				console.log(1)
			},
			handleUploadShoot() {
				// uploadFile(url, this.tempThumbPath, 'tempThumbPath')
				// .then(r => {
				// 	console.log(r)
				// 	return uploadFile(url, this.tempVideoPath, 'tempVideoPath')
				// })
				// .then(r => {
				// 	console.log('上传成功')
				// 	console.log(r)
				// })
				// .catch(e => {
				// 	console.log('上传失败')
				// 	console.log(e)
				// })
				console.log(2)
			},
			handleChooseMusic() {
				console.log(3)
				this.ifMusicListShow = true
				this.ifMusicListHide = false
				// uni.navigateTo({
				// 	url:'/pages/shoot/index'
				// })
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
		overflow: hidden;
	}
	
	template {
		display: flex;
		flex: 1;
	}
	
	.videoWrapper {
		min-width: 100vw;
		height: 100vh;
	}
	
	.videoPlay {
		min-width: 100%;
		height: 100%;
	}
	.iconWrapper {
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100vw;
		height: 20vw;
		bottom: 30vw;
	}
	.resetShoot {
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.uploadShoot {
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.chooseMusic {
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.image-content {
		height: 100%;
		text-align: center;
	}
	.iconFont {
		color: white;
		font-size: 4vw;
	}
	.musicList {
		height: 72vh;
		min-width: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		z-index: 3;
		background-color: #fff;
		overflow-y: scroll;
	}
	
	.musicListTransShow {
		animation: musicListShow 2s;
		top: 30vh;
	}
	
	.musicListTransHide {
		animation: musicListHide 2s;
		top: 100vh;
	}
	
	.musicComponent {
		height: 12vh;
		min-width: 100%;
	}
	
	.musicAudio {
		min-width: 100vw;
		height: 12vh;
	}
	
	.musicWrapper {
		width: 100vw;
		height: 12vh;
		margin-bottom: 1vw;
	}
	
	@keyframes musicListShow
	{
		from {top: 100vh;}
		to {top: 30vh;}
	}
	
	@keyframes musicListHide
	{
		from {top: 30vh;}
		to {top: 100vh;}
	}
</style>
