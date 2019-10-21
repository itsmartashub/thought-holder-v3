<template>
	<section class="signup">
		
		<form class="form">
			<div class="header__logo ">
					<i class="fab fa-think-peaks"></i> Though<strong>Holder</strong> 
			</div>
			<h1 class="mb-4">Fill up and signup! </h1>

			<div class="input-group">
				<i class="mdi mdi-email input-icon"></i>
				<input
					type="email"
					name="email" 
					required
					placeholder="Enter your e-mail"
					class="input"
					v-model.trim="email"
					@blur="checkEmail()"
					:class="{invalid: !validEmail}"
				/>
				<!-- <label for="email" class="label">Email</label> -->

				<span class="validate-alert mb-2" v-if="!validEmail">Invalid e-mail.</span>
				<span class="validate-alert mb-2" v-if="GET_SIGNUP_SERVER_ERR !== ''">{{ GET_SIGNUP_SERVER_ERR }}</span>
			</div>

			<div class="input-group">
				<i class="mdi mdi-lock-open input-icon"></i>
				<input
					type="password"
					name="password"
					required
					placeholder="Enter your password"
					class="input"
					v-model.trim="password"
					@blur="checkPassword()"
					:class="{invalid: !validPassword}"
				/>
				<!-- <label for="password" class="label">Password</label> -->

				<span class="validate-alert mb-2" v-if="!validPassword">Password must contains at least 6 characters.</span>
			</div>

			<div class="input-group">
				<i class="mdi mdi-lock input-icon"></i>
				<input
					type="password"
					name="confirm_password"
					required placeholder="Confirm your password"
					class="input"
					v-model.trim="confirm_password"
					@blur="checkConfirmPassword()"
					:class="{invalid: !validConfirmPassword}"
					
				/>
				<!-- <label for="confirm_password" class="label">Confrim password</label> -->

				<span class="validate-alert mb-2" v-if="!validConfirmPassword">Password doesn't match.</span>
			</div>

			<button @click.prevent="signup()" class="btn btn--blue mb-4 mt-1" type="submit" :disabled="!validForm">Signup</button>

			<p>{{ email }}</p>
			<p>{{ password }}</p>
			<p>{{ confirm_password }}</p>
			<!-- <p>{{ errorMsg }}</p> -->
			
			<router-link :to="{ name: 'login' }">
				<p class="register-redirect">Already a member? <span>Login</span></p>
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
			invalid: true,
			email: '',
			password: '',
			confirm_password: '',

			validEmail: true,
			validPassword: true,
			validConfirmPassword: true,
		}
	},

	computed: {
		...mapGetters(['GET_SIGNUP_SERVER_ERR']),

		validForm () {
			return this.checkEmail() && this.checkPassword() && this.checkConfirmPassword()
		}
	},

	methods: {

		checkEmail() {
			const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (regEx.test(this.email)) {
				this.validEmail = true
				return true
			} else {
				this.validEmail = false
				return false
			}
		},

		checkPassword() {
			const regEx = /(?=.{6,})/

			if (regEx.test(this.password)) {
				this.validPassword = true
				return true
			} else {
				this.validPassword = false
				return false
			}
		},

		checkConfirmPassword() {
			if (this.password === this.confirm_password) {
				this.validConfirmPassword = true
				return true
			} else {
				this.validConfirmPassword = false
				return false
			}
			// return this.password === this.confirm_password || errorMsg == "Password doesn't match!"
		},

		signup() {
			if(this.checkEmail() && this.checkPassword() && this.checkConfirmPassword()) {
				console.log('signup');
				const formData = {
					email: this.email,
					password: this.password
				}
				
				this.$store.dispatch('SIGNUP', formData)

			} else {
				console.log('errors');
				alert(err)
				// this.username = '',
				// this.email = '',
				// this.password = '',
				// this.confirm_password = '',
				// this.validUsername = false,
				// this.validEmail = false,
				// this.validPassword = false,
				// this.validConfirmPassword = false
			}
		}
	}
}
</script>