<template>
	<div id="app">
		<Loader v-if="isLoading" />
		<Notification />

		<router-view v-if="homeDisplay"></router-view>
		<!-- <span class="bp"></span> -->
	</div>
</template>

<script>
import Notification from "@/components/Notification"
import Loader from "@/components/Loader"

export default {
	name: "app",
	components: { Notification, Loader },

	data() {
		return {
			isLoading: true,
			homeDisplay: false,
		}
	},

	methods: {
		showToggle() {
			setTimeout(() => {
				this.isLoading = false
			}, 1000)
			this.homeDisplay = true
		},
	},

	mounted() {
		this.showToggle()
	},
}
</script>
