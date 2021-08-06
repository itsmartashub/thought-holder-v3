<template>
	<div id="app">
		<Loader v-if="isLoading" />
		<Notification />
		<transition name="fadey" mode="out-in">
			<router-view v-if="homeDisplay"></router-view>
		</transition>
		<span class="bp"></span>
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
		// this.isLoading = false
		// this.IS_LOADING = false;
	},
}
</script>
