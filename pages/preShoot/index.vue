<template>
	<view class="shootBox">
        <camera class="camera" flash="off" @error="error"></camera>
		<!-- <view v-show="ifNotice">
			<uni-notice-bar
				single="true" 
				text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏">
			</uni-notice-bar>
		</view> -->
		<view class="buttonBox">
			<button class="button" @click="handleShoot"></button>
		</view>
		<view class="toolBox">
			<view class="checkCamera" @tap="handleCheckCamera">
				<uni-icon type="camera" size="50" color="white"></uni-icon>
				<p class="IconWord">镜头转换</p>
			</view>
			<view class="uploadTv" @tap="handleUpload">
				<uni-icon type="upload" size="50" color="white"></uni-icon>
				<p class="IconWord">上传视频</p>
			</view>
		</view>
        <!-- <view>预览</view> -->
        <!-- <image mode="widthFix" :src="src"></image> -->
    </view>
</template>

<script>
	import uniIcon from "../components/uni-icon.vue"
	
	// import uniNoticeBar from "../components/uni-notice-bar.vue"
	
	import api from '../../api/index.js'
	
	export default {
	components: {
		uniIcon,
		// uniNoticeBar
	},
    data() {
        return {
            src:"",
			tempThumbPath: "",
			tempVideopath: "",
			ifStartRecord: false,
			time: 0,
			timeLoop: "",
			device: true,
			ctx: {},
			ifNotice: false
        }
    },
	onLoad() {
		console.log(1212121212)
		console.log(api.uploadFile)
		console.log(12121212)
		// wx.showModal({
		// 	title: 'dsahugfe'
		// })
		this.ctx = wx.createCameraContext()
	},
    methods: {
		error(err) {
			wx.showModal({
				title: JSON.stringify(err)
			})
		},
		handleCheckCamera() {
			this.device = !this.device;
			console.log("当前相机摄像头为:", this.device ? "后置" : "前置");
		},
		handleUpload() {
			console.log(8888)
			console.log(this.tempVideoPath)
			console.log(8888)
			if (this.tempVideoPath) {
				const url =  'http://129.211.60.18:3000/ivlog/api/sample'
				console.log('调用上传函数了')
				
				uni.uploadFile({
					url,
					filePath: this.tempVideoPath,
					name: 'video',
					formData:{},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					},
					fail(err) {
						console.log(err)
					}
				})
				
				// api.uploadFile(url, {
				// 	name: 'video',
				// 	video: this.tempVideoPath
				// })
				// uploadFile(url, this.tempThumbPath, 'tempThumbPath')
				// .then(r => {
				// 	console.log(r)
				// 	return uploadFile(url, this.tempVideoPath, 'tempVideoPath')
				// })
				// .then(r => {
				// 	console.log('上传成功')
				// 	console.log(r)
				// 	uni.navicatTo({
				// 		url: `pages/shoot/index?demoUrl=${r.demourl}`
				// 	})
				// })
				// .catch(e => {
				// 	console.log('上传失败')
				// 	console.log(e)
				// })	
			} else {
				console.log(this.ifNotice)
				this.ifNotice = true
			}
		},
        handleShoot() {
			new Promise((resolve,reject) => {
				wx.getSetting({
					success(res) {
						if (!res.authSetting['scope.camera']) {
							console.log(2)
							wx.authorize({
								scope: 'scope.camera',
								success() {
								  console.log('tongyile')
								  resolve()
								},
								fail(err) {
									console.log(err)
									console.log('获取摄像头权限失败')
								}
							})
						} else {
							resolve()
						}
					},
					fail(err) {
						console.log(err)
					},
					complete() {
						console.log(arguments)
					}
				})
			}).then(() => {
				if (!this.ifStartRecord) {
					console.log('点击了开始录制按钮')
					this.ifStartRecord = true
					let t1 = 0
					let timeLoop = setInterval(() => {
						t1++
						this.time = t1
						// 最长录制 5 秒
						if (t1 === 5) {
							clearInterval(this.timeLoop)
							this.stopRecord(this.ctx)
						}
					}, 1000)
					this.timeLoop = timeLoop
					
					//开始录制
					this.ctx.startRecord({
						success: (res) => {
							console.log('开始录制视频')
							console.log(res)
						},
						fail: (e) => {
							console.log('开始录制视频出错了')
							console.log(e)
						}
					})
				} else {
					this.stopRecord(this.ctx)
				}
			})
        },
		
		stopRecord(ctx) {
			console.log('点击停止录视频按钮')
			
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

<style>
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
	.shootBox {
		display: flex;
		min-width: 100%;
	}
	.camera {
		min-width: 100%;
		height: 100%;
	}
	.buttonBox {
		background-color: #fff;
		height: 24vw;
		width: 24vw;
		border-radius: 12vw;
		position: absolute;
		bottom: 30vw;
		left: 50%;
		margin-left: -12vw;
	}
	.button {
		height: 22vw;
		width: 22vw;
		border-radius: 11vw;
		background-color: red;
		margin:1vw;
		/* margin-left: -11vw; */
	}
	.toolBox {
		min-width:100%;
		position: absolute;
		bottom: 10vw;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.checkCamera {
		margin-left: 10vw;
		text-align: center;
	}
	.uploadTv {
		margin-right: 10vw;
		text-align: center;
	}
	.IconWord {
		color: white;
	}
</style>
