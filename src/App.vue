<template>
	<div>
		<Notification />
		<router-view></router-view>
	</div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
	name: 'app',
	components: { Notification },

	// created() {
	// 	this.$store.dispatch('FETCH_TAGS')
	// }
}
</script>