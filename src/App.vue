<template>
	<div id="app">
		<Loader v-if="isLoading" />
		<Notification />

		<transition name="bounce" mode="in-out">
			<Obvio v-if="isObvio" />
		</transition>

		<router-view v-if="homeDisplay"></router-view>
		<!-- <span class="bp"></span> -->
	</div>
</template>

<script>
import Notification from "@/components/Notification"
import Loader from "@/components/Loader"
import Obvio from "@/components/Obvio"

export default {
	name: "app",
	components: { Notification, Loader, Obvio },

	data() {
		return {
			isLoading: true,
			homeDisplay: false,
		}
	},

	computed: {
		isObvio() {
			return this.$store.getters["ui/GET_IS_OBVIO"]
		},
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
