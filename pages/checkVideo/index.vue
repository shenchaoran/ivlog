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
                <!-- <audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" :action="audioAction" controls></audio> -->
				<test 
				:src="current.src" 
				:poster="current.poster" 
				:name="current.musicFileName" 
				:author="current.desc" 
				loop="true" 
				:play.sync="audioPlay" 
				@handleSelectMusic="handleSelectMusic" 
				:musicId.sync="current.id"></test>
            </view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "../components/uni-icon.vue"
	
	// import luchAudio from "../components/luch-audio.vue"
	
	import test from "../components/test.vue"
	
	import { uploadFile } from '../../utils.js'
	
	import api from '../../api/index.js'
	
	export default {
		components: {
			uniIcon,
			// luchAudio,
			test
		},
		data() {
			return {
				audioPlay: true,
				demoUrl:'',
				// tempThumbPath: '',
				tempVideoPath: '',
				music: '',
				ifMusicListShow: false,
				ifMusicListHide: false,
				currents:[],
				musicId: '',
				duration: 0,
			}
		},
		
		onLoad: function (option) {
			if (option) {
				console.log(option)
				this.tempVideoPath = option.tempVideoPath
				this.demoUrl = option.demoUrl
				this.duration = option.duration
			}
			api.getMusicList('musics').then(res => {
				res.data.data.forEach(item => {
					item.src = `http://129.211.60.18:3000/ivlog/api/public/${item.type}/${item.musicFileName}`
					console.log(item.src)
				})
				this.currents = res.data.data
			}).catch(err => {
				console.log(err)
			})
		},
		
		methods: {
			handleChooseMusic() {
			  this.ifMusicListShow = true
			  this.ifMusicListHide = false
			},
			handleSelectMusic(id) {
				console.log(id)
				this.musicId = id
				this.ifMusicListShow = false
				this.ifMusicListHide = true
			},
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
				console.log(9876)
				uni.navigateBack({
					url:`pages/shoot/index?demoUrl=${this.demoUrl}`
				})
			},
			
			handleUploadShoot() {
				if (this.tempVideoPath) {
					const url =  'http://129.211.60.18:3000/ivlog/api/videos'
					console.log('调用上传函数了')
					
					uni.uploadFile({
						url,
						filePath: this.tempVideoPath,
						name: 'video',
						formData:{
							openid: 'oxLxH47TuWWQlPyR9Jz1MLVdq3Ek',
							desc: '',
							avatar: 'gyuefgwyuefwgyuefwgyufewgyuew',
							startTime: 0,
							duration: this.duration,
							musicId: this.musicId
						},
						success: (uploadFileRes) => {
							console.log('上传成功')
							console.log(uploadFileRes)
							uni.navigateTo({
								url: 'pages/my/index'
							})
							
						},
						fail(err) {
							console.log('出错了')
							console.log(err)
						}
					})
				} else {
					console.log(this.ifNotice)
					this.ifNotice = true
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
