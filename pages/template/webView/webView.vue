<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			};
		},
		onShow: function() {
			let url = this.$store.state.homeNewsTarget;
			let href = '';
			if (url.indexOf('http') > -1) {
				href = url;
			} else {
				href = "https://www.icoo.tech/" + this.$store.state.homeNewsTarget;
			}
			this.url = href;
			console.log(this.url);
		}
	}
</script>

<style scoped="scoped">

</style>
