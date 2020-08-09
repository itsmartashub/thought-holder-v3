<template>
	<div id="app">
		<Loader />
		<Notification />
		<router-view></router-view>
		<span class="bp"></span>
	</div>
</template>

<script>
import Notification from '@/components/Notification'
import Loader from '@/components/Loader'

export default {
	name: 'app',
	components: { Notification, Loader },

	// created() {
	// 	this.$store.dispatch('FETCH_TAGS')
	// }
	mounted() {
		this.$store.commit('ui/SET_LOADING', false)
	}
}
</script>