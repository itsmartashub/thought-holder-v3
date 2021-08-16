<template>
	<div class="obvio">
		<figure>
			<img
				src="@/assets/obvio.gif"
				alt="obvio-gif-from-the-movie-the-platform"
			/>
			<figcaption @click="closeObvio()"><span>&#10006;</span></figcaption>
		</figure>
	</div>
</template>
<script>
export default {
	name: "obvio",

	methods: {
		closeObvio() {
			return this.$store.commit("ui/SET_IS_OBVIO", false)
		},
	},
}
</script>
