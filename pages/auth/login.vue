<template>
	<view class="login-box">
		<view class="login-logo"></view>
		<view class="login-line"></view>
		<view class="login-content">
			<view class="login-title">申请获取以下权限：</view>
			<view class="login-description">获得你的公开信息（昵称、头像等）</view>
		</view>
		<button class="login-btn" @click="login">授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			login() {
				uni.login({
					provider: 'weixin',
					success: function (res) {
						console.log('uni.login.success: ',res);
						uni.request({
							url: 'http://129.211.60.18:3000/ivlog/api/login',
							data: {
								code: res.code
							},
							method: 'POST',
							success: function(info) {
								console.log('login info: ', info);
								try {
									uni.setStorageSync('openid', info.data.data.openid);
									uni.setStorageSync('session_key', info.data.data.session_key);
								} catch (e) {}
							},
							fail: function (res) {
								console.log('uni.login.request.fail: ',res);
							}
						});
					},
					fail: function (res) {
						console.log('uni.login.fail: ',res);
					}
				});
			}

		}
	}
</script>

<style>
	.login-box{
		position: fixed;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
		align-items: center;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
		height: 80%;
		overflow: hidden;
		padding: 0 100rpx;
		border: 1px solid #b2b2b2;
		border-radius: 50rpx;
	}
	.login-logo{
		width: 230rpx;
		height: 230rpx;
		background: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTM0Ny43MyAzNTMuMDI0Yy0xNi40ODggMC0yOS43NzggMTMuMzktMjkuNzc4IDI5Ljc3N3MxMy4yOSAyOS44NzcgMjkuNzc3IDI5Ljg3NyAyOS43NzctMTMuMzkgMjkuNzc3LTI5Ljc3Ny0xMy4yOS0yOS44NzctMjkuNzc3LTI5Ljg3N3pNNTc3Ljc1IDUxMS44Yy0xMy42OSAwLTI0Ljg4MSAxMS4wOTEtMjQuODgxIDI0Ljg4IDAgMTMuNjkgMTEuMDkxIDI0Ljg4MSAyNC44OCAyNC44ODEgMTMuNjkgMCAyNC44ODEtMTEuMTkxIDI0Ljg4MS0yNC44OHMtMTEuMTkxLTI0Ljg4LTI0Ljg4LTI0Ljg4em0tNzYuODQtOTkuMTIyYzE2LjQ4NyAwIDI5Ljc3Ni0xMy4zOSAyOS43NzYtMjkuNzc3cy0xMy4zOS0yOS43NzctMjkuNzc3LTI5Ljc3N2MtMTYuNDg3IDAtMjkuNzc2IDEzLjM5LTI5Ljc3NiAyOS43NzdzMTMuMjkgMjkuNzc3IDI5Ljc3NiAyOS43Nzd6TTY5OC40NTQgNTExLjZjLTEzLjY5IDAtMjQuODggMTEuMDkyLTI0Ljg4IDI0Ljg4IDAgMTMuNjkgMTEuMDkgMjQuODgxIDI0Ljg4IDI0Ljg4MSAxMy42OSAwIDI0Ljg4LTExLjA5IDI0Ljg4LTI0Ljg4LS4xLTEzLjY5LTExLjE5LTI0Ljg4LTI0Ljg4LTI0Ljg4eiIgZmlsbD0iIzAwQzgwMCIvPjxwYXRoIGQ9Ik01MTEuNjAxLjhDMjI5LjEyMS44LjAwMSAyMjkuODIuMDAxIDUxMi40UzIyOS4wMiAxMDI0IDUxMS42IDEwMjRzNTExLjYtMjI5LjAyMSA1MTEuNi01MTEuNlM3OTQuMTgxLjggNTExLjYwMS44em0tOTAuMjMgNjM0LjUwNGMtMjcuMzc4IDAtNDkuMzYtNS41OTYtNzYuODQtMTAuOTkybC03Ni42NCAzOC40NyAyMS44ODMtNjUuOTQ4Yy01NC45NTctMzguMzctODcuNzMxLTg3LjgzMi04Ny43MzEtMTQ4LjA4NSAwLTEwNC4zMTggOTguNzIzLTE4Ni41NTQgMjE5LjMyOS0xODYuNTU0IDEwNy44MTUgMCAyMDIuMzQyIDY1LjY0OSAyMjEuMzI3IDE1My45OC02Ljk5NS0uOC0xMy45OS0xLjMtMjEuMDg0LTEuMy0xMDQuMTE5IDAtMTg2LjQ1NCA3Ny43NC0xODYuNDU0IDE3My41NjUgMCAxNS45ODggMi40OTggMzEuMjc2IDYuNzk1IDQ1Ljk2NC02Ljc5NS42LTEzLjY5LjktMjAuNTg0Ljl6bTMyMy41NDggNzYuODRsMTYuNDg3IDU0Ljc1Ny02MC4xNTMtMzIuODc0Yy0yMS44ODMgNS40OTUtNDMuOTY2IDEwLjk5MS02NS44NDkgMTAuOTkxLTEwNC4zMTggMC0xODYuNTU0LTcxLjM0NC0xODYuNTU0LTE1OS4xNzYgMC04Ny42MzEgODIuMTM2LTE1OS4xNzUgMTg2LjU1NC0xNTkuMTc1IDk4LjUyMyAwIDE4Ni4yNTUgNzEuNDQ0IDE4Ni4yNTUgMTU5LjE3NS4xIDQ5LjQ2Mi0zMi43NzUgOTMuMjI3LTc2Ljc0IDEyNi4zMDJ6IiBmaWxsPSIjMDBDODAwIi8+PC9zdmc+);
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
	.login-line{
		width: 600rpx;
		height: 1rpx;
		background: #b2b2b2;
	}
	.login-content{
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
		align-items: flex-start;
		width: 600rpx;
		height: 100rpx;
	}
	.login-title{
		margin: 0;
		color: #353535;
		font-size: 30rpx;
	}
	.login-description{
		color: #888;
		font-size: 30rpx;
	}
	.login-btn{
		background: rgba(9,197,7,1);
		color: #fff;
		border-radius: 100rpx;
		font-size: 36rpx;
		width: 600rpx;
		margin: 0;
	}
	/*按钮点击效果*/
	.login-btn.button-hover{
		background: rgba(9,197,7,0.8);
	}
</style>
