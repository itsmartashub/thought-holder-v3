<template>
	<section class="signup">
		<form class="form">
			<div class="logo">
				<i class="mdi mdi-format-strikethrough"></i> Thought<strong
					>Holder</strong
				>
			</div>
			<h1 class="mb-4">Fill up and signup!</h1>

			<div class="form-group">
				<div class="input-field">
					<i class="mdi mdi-email input-icon"></i>
					<input
						type="email"
						name="email"
						required
						placeholder="Enter your e-mail"
						class="input"
						v-model.trim="email"
						@blur="checkEmail()"
						:class="{ invalid: !validEmail }"
					/>
				</div>

				<span class="validate-alert mb-2" v-if="!validEmail"
					>Invalid e-mail.</span
				>
				<span
					class="validate-alert mb-2"
					v-if="GET_SIGNUP_SERVER_ERR !== ''"
					>{{ GET_SIGNUP_SERVER_ERR }}</span
				>
			</div>

			<div class="form-group">
				<div class="input-field">
					<i class="mdi mdi-lock-open input-icon"></i>
					<input
						type="password"
						name="password"
						required
						placeholder="Enter your password"
						class="input"
						v-model.trim="password"
						@blur="checkPassword()"
						:class="{ invalid: !validPassword }"
						autocomplete
					/>
				</div>

				<span class="validate-alert mb-2" v-if="!validPassword"
					>Password must contains at least 6 characters.</span
				>
			</div>

			<div class="form-group">
				<div class="input-field">
					<i class="mdi mdi-lock input-icon"></i>
					<input
						type="password"
						name="confirm_password"
						required
						placeholder="Confirm your brilliant password"
						class="input"
						v-model.trim="confirm_password"
						@blur="checkConfirmPassword()"
						:class="{ invalid: !validConfirmPassword }"
						autocomplete
					/>
				</div>

				<span class="validate-alert mb-2" v-if="!validConfirmPassword"
					>Password doesn't match.</span
				>
			</div>

			<span class="before-btn-txt"
				>Make sure there are at least 6 characters if you can't make 6
				packs.
				<br />
				<!-- //TODO dodati OBVIO.gif iz filma the platform -->
				Strong security is our priority,
				<!-- <a
					class="underline-blue"
					href="https://tenor.com/view/obvio-hoyo-obvious-duh-gif-16876730"
					>OBVIO</a
				>. -->
				<span class="underline-blue" @click.prevent="isObvio = !isObvio"
					>OBVIO</span
				>.
				<br />

				Completely free.
			</span>

			<button
				@click.prevent="signup()"
				class="btn btn--blue mb-4 mt-1"
				type="submit"
				:disabled="!validForm"
			>
				SIGNUP
			</button>
			<!-- <p>{{ errorMsg }}</p> -->

			<router-link :to="{ name: 'login' }">
				<p class="register-redirect">
					Already a member? <span class="underline-blue">Login</span>
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
			invalid: true,
			email: "",
			password: "",
			confirm_password: "",

			validEmail: true,
			validPassword: true,
			validConfirmPassword: true,
		}
	},

	computed: {
		...mapGetters(["GET_SIGNUP_SERVER_ERR", "GET_IS_OBVIO"]),

		validForm() {
			return (
				this.checkEmail() &&
				this.checkPassword() &&
				this.checkConfirmPassword()
			)
		},

		isObvio: {
			get() {
				return this.$store.getters["ui/GET_IS_OBVIO"]
			},
			set(newVal) {
				return this.$store.commit("ui/SET_IS_OBVIO", newVal)
			},
		},
	},

	methods: {
		checkEmail() {
			const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
		},

		signup() {
			if (
				this.checkEmail() &&
				this.checkPassword() &&
				this.checkConfirmPassword()
			) {
				const formData = {
					email: this.email,
					password: this.password,
				}

				this.$store.dispatch("SIGNUP", formData)
			} else {
				alert(err)
			}
		},
	},
}
</script>
