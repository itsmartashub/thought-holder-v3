<template>
	<section class="login">
		
		<form class="form">
			<div class="logo">
				<i class="mdi mdi-format-strikethrough"></i> Thoughts<strong>Holder</strong> 
			</div>
			<h1 class="mb-4">Fill up and login! </h1>

			<div class="form-group">
				<label for="email" class="label">Email</label>
				<div class="input-field">
					<i class="mdi mdi-email input-icon"></i>
					<input type="email" v-model="email" name="email" required placeholder="Enter your e-mail" class="input">
				</div>

				<!-- <span class="validate-alert" v-if="error">The email is incorrect.</span> -->
			</div>

			<div class="form-group">
				<label for="password" class="label">Password</label>
				<div class="input-field">
					<i class="mdi mdi-lock input-icon"></i>
					<input type="password" v-model="password" name="password" required placeholder="Enter your password" class="input">
				</div>
				<!-- <i class="fas fa-eye input-icon-append"></i> -->
				<!-- <i class="fas fa-eye-slash input-icon-append"></i> -->

				<!-- <span class="validate-alert" v-if="error">Password is incorrect.</span> -->
			</div>

			<button @click.prevent="login()" class="btn btn--blue mb-4 mt-1">LOGIN</button>

			<!-- <span class="validate-alert mb-3" v-if="error">The e-mail or the password are incorrect.</span> -->
			<span class="validate-alert mb-3" v-if="GET_LOGIN_SERVER_ERR !== ''">{{ GET_LOGIN_SERVER_ERR }}</span>
			
			<router-link :to="{ name: 'signup' }">
				<p class="register-redirect">You don't have account yet? <span>Signup</span></p>
			</router-link>
		</form>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'login',

	data() {
		return {
			email: '',
			password: '',
			error: false
		}
	},

	computed: mapGetters(['GET_LOGIN_SERVER_ERR']),

	methods: {
		login() {
			// console.log('logiiin')
			if(this.email != '' && this.password != ''){
				
					this.$store.dispatch('LOGIN', {
						email: this.email,
						password: this.password
					})
				// .then(() => {
				// 	this.$store.commit('SET_NOTIFICATION', {
				// 		display: true,
				// 		text: 'ULOGOVAN',
				// 		alertClass: 'success'
				// 	})
				// })
				// .catch(err => {
				// 	this.$store.commit('SET_NOTIFICATION', {
				// 		display: true,
				// 		text: err,
				// 		alertClass: 'success'
				// 	})
				// })

			}
		}
	}
}
</script>