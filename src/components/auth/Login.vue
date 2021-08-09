<template>
	<section class="login">
		<form class="form">
			<div class="logo">
				<i class="mdi mdi-format-strikethrough"></i> Thought<strong
					>Holder</strong
				>
			</div>
			<h1 class="mb-4">Fill up and login!</h1>

			<div class="form-group">
				<label for="email" class="label">Email</label>
				<div class="input-field">
					<i class="mdi mdi-email input-icon"></i>
					<input
						type="email"
						v-model="email"
						name="email"
						required
						placeholder="Enter your e-mail"
						class="input"
					/>
				</div>

				<!-- <span class="validate-alert" v-if="error">The email is incorrect.</span> -->
			</div>

			<div class="form-group">
				<label for="password" class="label">Password</label>
				<div class="input-field">
					<i class="mdi mdi-lock input-icon"></i>
					<input
						type="password"
						v-model="password"
						name="password"
						required
						placeholder="Enter your brilliant password"
						class="input"
						autocomplete
					/>
				</div>
			</div>

			<span class="before-btn-txt"
				>We don't hold your beer but we can hold your brilliant
				thoughts! <br />
				Completely free.</span
			>

			<button @click.prevent="login()" class="btn btn--blue mb-4 mt-1">
				LOGIN
			</button>

			<span
				class="validate-alert mb-3"
				v-if="GET_LOGIN_SERVER_ERR !== ''"
				>{{ GET_LOGIN_SERVER_ERR }}</span
			>

			<router-link :to="{ name: 'signup' }">
				<p class="register-redirect">
					New to ThoughtHolder?
					<span class="underline-blue">Create an account</span>
				</p>
			</router-link>
		</form>
	</section>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "login",

	data() {
		return {
			email: "",
			password: "",
			error: false,
		}
	},

	computed: mapGetters(["GET_LOGIN_SERVER_ERR"]),

	methods: {
		login() {
			if (this.email != "" && this.password != "") {
				this.$store.dispatch("LOGIN", {
					email: this.email,
					password: this.password,
				})
			}
		},
	},
}
</script>
