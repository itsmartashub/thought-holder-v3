<template>
	<div class="notification" :class="GET_NOTIFY.className" v-if="showHide">
		<div class="position-wrapper">
			<i class="fas fa-bell"></i> <p>{{ GET_NOTIFY.text }} </p><i class="far fa-times-circle" @click="showHide = false"></i>
		</div>
	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ui')
// import { mapGetters } from 'vuex'


export default {
	name: 'notification',
	// computed: {
	// 	...mapGetters({
	// 			GET_NOTIFY: 'ui/GET_NOTIFICATION'
	// 		}),

	// 	showHide: {
	// 		get () {
	// 			return this.GET_NOTIFY.display
	// 		},
	// 		set (value) {
	// 			this.$store.commit('ui/SET_NOTIFICATION', { // ui.js/mutations
	// 				display: value
	// 			})
	// 		}
	// 	}
	// },

	data() {
		return {
			showAlert: false
		}
	},

	computed: {
		...mapGetters({
			GET_NOTIFY: 'GET_NOTIFICATION'
		}),

		showHide: {
			get () {
				return this.GET_NOTIFY.display
			},
			set (value) {
				this.$store.dispatch('ui/ACT_NOTIFICATION', { display: value })
			}
		},

		alert() {
			if(this.showHide = true) {
				setTimeout(() => {
					return false
				}, 2000);
				// this.showAlert = false
			}
		}
	},


}
</script>