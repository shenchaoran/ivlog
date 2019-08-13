<template>
	<view class="wrapperBox">
		<view class="exampleBox">
			<camera class="camera" device-position="back" flash="off" @error="error"></camera>
			<video id="myVideo" class="videoBox" :src="demoUrl"
			@error="videoErrorCallback" controls autoplay=false loop="true" show-fullscreen-btn="false"></video>
        </view>
		<view class="buttonBox">
			<view class="progress-box">
                <progress :percent="timeStumb" activeColor="red" active stroke-width="8" active-mode="forwards"/>
            </view>
			<button type="warn" size="mini" @tap="handleShoot">拍摄</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				device: true,
				ifStartRecord: false,
				timeStumb: 0,
				timeLoop: '',
				time:'',
				ctx: {},
				demoUrl: '',
				camera: false,
			}
		},
		onLoad(option) {
			if (option) {
				this.demoUrl = option.demoUrl
			}
			this.ctx = wx.createCameraContext()
			// console.log(this.ctx.startRecord)
		},
		methods: {
			error(err) {
				console.log('相机加载出错')
			},
			videoErrorCallback(err) {
				console.log(err)
			},
			 handleShoot() {
				new Promise((resolve, reject) => {
					wx.getSetting({
						success(res) {
							console.log(res)
							if (!res.authSetting['scope.camera']) {
								uni.authorize({
									scope: 'scope.camera',
									success() {
										console.log('tongyile')
										resolve()
									},
									fail() {
										console.log('获取摄像头权限出错')
									}
								})
							} else {
								resolve()
							}
						}
					})
				}).then(() => {
					if (!this.ifStartRecord) {
						console.log('点击开始录制视频按钮')
						this.ifStartRecord = true
						let t1 = 0
						let timeLoop = setInterval(() => {
							t1++
							this.time = t1
							this.timeStumb += 5
							console.log(this.timeStumb)
							// 最长录制 20 秒
							if (t1 === 20) {
								clearInterval(timeLoop)
								this.stopRecord(this.ctx)
							}
						}, 1000)
						this.timeLoop = timeLoop
						
						//开始录制
						this.ctx.startRecord({
							success: (res) => {
								console.log('开始录制视频成功')
								console.log(res)
							},
							fail: (e) => {
								console.log('开始录制视频失败')
								console.log(e)
							}
						})
					} else {
						this.stopRecord(this.ctx)
					}
				})
			},
			stopRecord(ctx) {
				console.log('停止录视频')
				
				clearInterval(this.timeLoop)
				
				ctx.stopRecord({
					
					success: (res) => {
						console.log('结束录制视频成功')
						
						console.log(res)
						
						console.log(res.tempThumbPath)
						
						console.log(res.tempVideoPath)
						
						
						this.tempThumpath = res.tempThumbPath
						
						this.tempVideoPath = res.tempVideoPath
						
						this.camera = false
						
						this.ifStartRecord = false
						
						this.time = 0
						
						uni.navigateTo({
							url: `/pages/checkVideo/index?tempVideoPath=${this.tempVideoPath}&demoUrl=${this.demoUrl}`
						})
					},
					fail: (e) => {
						console.log('结束录制视频失败')
						console.log(e)
					}
				})
				
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
	.wrapperBox {
		display: flex;
		min-width: 100%;
		height: 100vh;
	}
	.exampleBox {
		min-width: 100%;
		height: 100vh;
	}
	.videoBox {
		min-width: 100%;
		height: 50vh;
	}
	.camera {
		min-width: 100%;
		height: 50vh;
	}
	.buttonBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		height: 20vw;
		min-width: 100%;
		bottom: 5vh;
	}
	.buttonBox button {
		width: 20vw;
		height: 10vw;
		margin-top: 1vw;
	}
	.progress-box {
		width: 60vw;
	}
</style>
